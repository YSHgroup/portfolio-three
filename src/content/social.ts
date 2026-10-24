export const social = [
  { url: "mailto:david.dev100@outlook.com", name: "mail" },
  { url: "https://github.com/yshgroup", name: "github" },
  { url: "https://www.reddit.com/u/David-dev100", name: "reddit" },
  { url: "https://open.spotify.com/user/3143hany3yzwitzlsdbaiiuprooa", name: "spotify" },
  //{ url: "https://www.instagram.com/davidchan/", name: "instagram" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "reddit" | "spotify" }[];
