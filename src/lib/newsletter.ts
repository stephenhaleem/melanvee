const KLAVIYO_PUBLIC_KEY = "U3UEq8";
const KLAVIYO_LISTS: Record<"homepage" | "popup", string> = {
  homepage: "XQSGhF",
  popup: "WEMkLX",
};

export async function subscribeToNewsletter(
  email: string,
  source: "homepage" | "popup" = "homepage",
): Promise<{ ok: boolean; duplicate: boolean }> {
  try {
    const res = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_PUBLIC_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.api+json",
          revision: "2024-10-15",
        },
        body: JSON.stringify({
          data: {
            type: "subscription",
            attributes: {
              custom_source: `melanvee_${source}`,
              profile: {
                data: {
                  type: "profile",
                  attributes: {
                    email: email.trim().toLowerCase(),
                  },
                },
              },
            },
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: KLAVIYO_LISTS[source],
                },
              },
            },
          },
        }),
      },
    );

    // 202 = accepted, 409 = already subscribed
    if (res.status === 202) return { ok: true, duplicate: false };
    if (res.status === 409) return { ok: true, duplicate: true };

    const body = await res.json().catch(() => null);
    console.error("[klaviyo] Unexpected response:", res.status, body);
    return { ok: false, duplicate: false };
  } catch (err) {
    console.error("[klaviyo] Fetch error:", err);
    return { ok: false, duplicate: false };
  }
}
