export async function prerender(data: any) {
  console.log("DATA", data);

  return {
    html: "",
    links: ["/de/test", "/test"],
    head: {
      lang: data.url.includes("/de") ? "de" : "en",
    },
  };
}
