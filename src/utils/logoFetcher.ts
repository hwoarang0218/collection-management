const LOGO_APIS = {
  clearbit: "https://logo.clearbit.com",
  favicon: "https://icon.horse/icon",
  duckduckgo: "https://icons.duckduckgo.com/ip3",
  gravatar: "https://gravatar.com/avatar",
};

const FALLBACK_LOGOS = {
  Nike: "/images/brands/nike.png",
  Adidas: "/images/brands/adidas.png",
  Puma: "/images/brands/puma.png",
};

const tryFetchLogo = async (
  url: string,
  options?: RequestInit
): Promise<string | null> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) return null;

    // Handle JSON responses (like Brandfetch)
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      return data.icon || data.logo || data.image || null;
    }

    return response.url;
  } catch {
    return null;
  }
};

export const getBrandLogo = async (brandName: string): Promise<string> => {
  const fallbackLogo =
    FALLBACK_LOGOS[brandName as keyof typeof FALLBACK_LOGOS] ||
    "/images/brands/default.png";

  const attempts = [
    // Try Clearbit
    () => tryFetchLogo(`${LOGO_APIS.clearbit}/${brandName.toLowerCase()}.com`),

    // Try DuckDuckGo
    () => tryFetchLogo(`${LOGO_APIS.duckduckgo}/${brandName.toLowerCase()}`),

    // Try Favicon from icon.horse
    () => tryFetchLogo(`${LOGO_APIS.favicon}/${brandName.toLowerCase()}.com`),

    // Try Gravatar (using brand name as hash)
    () =>
      tryFetchLogo(
        `${LOGO_APIS.gravatar}/${brandName.toLowerCase()}?d=identicon&s=200`
      ),
  ];

  // Try each method sequentially until we get a logo
  for (const attempt of attempts) {
    const logo = await attempt();
    if (logo) return logo;
  }

  return fallbackLogo;
};
