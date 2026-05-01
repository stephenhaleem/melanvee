const SHOPIFY_DOMAIN = "m-e-l-a-n-v-e-e.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = "17020e1b4e93b3ca085e35baa2389925";
const API_VERSION = "2024-01";

const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

export async function shopifyFetch<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${json.errors[0]?.message}`);
  }

  return json.data as T;
}

export type ShopifyImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyPriceRange = {
  minVariantPrice: { amount: string; currencyCode: string };
  maxVariantPrice: { amount: string; currencyCode: string };
};

export type ShopifyProductOption = {
  name: string;
  values: string[];
};

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
  selectedOptions: { name: string; value: string }[];
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  productType: string;
  priceRange: ShopifyPriceRange;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
  options: ShopifyProductOption[];
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    product: {
      id: string;
      title: string;
      handle: string;
      images: { edges: { node: ShopifyImage }[] };
    };
    selectedOptions: { name: string; value: string }[];
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
  lines: { edges: { node: ShopifyCartLine }[] };
};

const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    tags
    productType
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 10) {
      edges { node { url altText width height } }
    }
    options { name values }
    variants(first: 30) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product {
                id
                title
                handle
                images(first: 10) {
                  edges { node { url altText width height } }
                }
              }
              selectedOptions { name value }
            }
          }
        }
      }
    }
  }
`;

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first, sortKey: CREATED_AT) {
        edges { node { ...ProductFragment } }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>(query, { first });

  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFragment
      }
    }
  `;

  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(query, { handle });
  return data.product;
}

export async function getCollectionProducts(handle: string, first = 20): Promise<ShopifyProduct[]> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first) {
          edges { node { ...ProductFragment } }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    collection: { products: { edges: { node: ShopifyProduct }[] } } | null;
  }>(query, { handle, first });

  return data.collection?.products.edges.map((e) => e.node) ?? [];
}

export async function createCart(
  lines?: { merchandiseId: string; quantity: number }[],
): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation CreateCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart;
      userErrors: { field: string; message: string }[];
    };
  }>(query, { lines: lines ?? [] });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFragment }
    }
  `;

  const data = await shopifyFetch<{ cart: ShopifyCart | null }>(query, { cartId });
  return data.cart;
}

export async function addCartLines(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCart;
      userErrors: { field: string; message: string }[];
    };
  }>(query, { cartId, lines });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCart;
      userErrors: { field: string; message: string }[];
    };
  }>(query, { cartId, lines });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const query = `
    ${CART_FRAGMENT}
    mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCart;
      userErrors: { field: string; message: string }[];
    };
  }>(query, { cartId, lineIds });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
}

export async function setCartReturnUrl(cartId: string): Promise<void> {
  const query = `
    mutation SetCartAttributes($cartId: ID!, $attributes: [AttributeInput!]!) {
      cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
        cart { id }
        userErrors { field message }
      }
    }
  `;

  try {
    await shopifyFetch(query, {
      cartId,
      attributes: [{ key: "_return_url", value: "https://melanvee.com" }],
    });
  } catch (err) {
    // Non-fatal — the return_to query param on checkoutUrl is the primary mechanism
    console.warn("[shopify] Could not set cart return URL attribute:", err);
  }
}

export function parsePrice(amount: string): number {
  return parseFloat(amount);
}

export function getProductImage(product: ShopifyProduct): string {
  return product.images.edges[0]?.node.url ?? "";
}

export function getVariants(product: ShopifyProduct): ShopifyVariant[] {
  return product.variants.edges.map((e) => e.node);
}
export function findVariant(
  product: ShopifyProduct,
  selectedOptions: Record<string, string>,
): ShopifyVariant | undefined {
  return getVariants(product).find((v) =>
    v.selectedOptions.every((o) => selectedOptions[o.name] === o.value),
  );
}

export function getStartingPrice(product: ShopifyProduct): number {
  return parsePrice(product.priceRange.minVariantPrice.amount);
}
