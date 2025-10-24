import videoPokedex from "../../../assets/videos/pokedex.mp4";

//import mobile from "../../../assets/images/projects/pokedex/mobile.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Pokédex",
  tags: ["javascript", "html", "css"],
  live: "https://pokedex.david-hckh.com/",
  source: "https://github.com/davidhckh/pokedex",
  video: videoPokedex,
  videoBorder: true,
  description:
    "One of my first web projects to practice core web development concepts. The Pokédex is open source so other developers can learn the same way I did.<br/><br/>It also interacts with a public API, to get more experience with asynchronous data fetching.",
  components: [],
  /**  components: [
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        image: mobile,
        alt: "Pokédex App",
        component: {
          type: "list",
          props: {
            headline: "Features",
            items: [
              "Lazy loading of Pokémon entries and images on scroll",
              "Expandable detail view for each Pokémon",
              "Full mobile support with responsive layout",
              "Open source – for developers to study and learn from",
              "Interacts with a public API to fetch Pokémon data dynamically",
            ],
          },
        },
      },
    },
    {
      type: "list",
      props: {
        headline: "Learnings",
        width: "md",
        items: [
          "Hands-on experience with DOM manipulation and event handling",
          "Implementing lazy loading for performance optimization",
          "Managing component state for expandable detail views",
          "Building responsive, mobile-first layouts",
          "Working with APIs: fetching and handling asynchronous data",
          "Learning by doing: improving my own skills while creating a resource for others to learn from",
        ],
      },
    },
  ], */
} as const satisfies ProjectContent;
