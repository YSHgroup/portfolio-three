export async function prerender(data: any) {
  return {
    html: "",
    links: ["/de/test", "/test"],
    head: {
      lang: data.url.startsWith("/de") ? "de" : "en",
    },
  };
}
