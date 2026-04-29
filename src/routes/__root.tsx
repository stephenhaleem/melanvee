import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MELANVÉE — Textured Wigs for Women of Colour" },
      { name: "description", content: "Half wigs and U-part wigs in true 4A–4C textures. Made for women of colour." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "MELANVÉE — Textured Wigs for Women of Colour" },
      { name: "twitter:title", content: "MELANVÉE — Textured Wigs for Women of Colour" },
      { property: "og:description", content: "Half wigs and U-part wigs in true 4A–4C textures. Made for women of colour." },
      { name: "twitter:description", content: "Half wigs and U-part wigs in true 4A–4C textures. Made for women of colour." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/283a254c-1d60-4dd9-8997-e7e91c21331d/id-preview-c61b9be1--484288f3-63ae-4ff9-97de-e5f3ad3f200f.lovable.app-1777140610959.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/283a254c-1d60-4dd9-8997-e7e91c21331d/id-preview-c61b9be1--484288f3-63ae-4ff9-97de-e5f3ad3f200f.lovable.app-1777140610959.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
