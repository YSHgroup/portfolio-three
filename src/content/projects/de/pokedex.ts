//import thumbnailPokedex from "../../../assets/images/thumbnails/pokedex.png";
import videoPokedex from "../../../assets/videos/pokedex.mp4";

//import mobile from "../../../assets/images/projects/pokedex/mobile.png";

import type { ProjectContent } from "../../types";

export const pokedex = {
  title: "Pokédex",
  //thumbnail: thumbnailPokedex,
  live: "https://pokedex.david-hckh.com/",
  source: "https://github.com/davidhckh/pokedex",
  video: videoPokedex,
  description:
    "Eines meiner ersten Webprojekte, um <b>Kernkonzepte der Webentwicklung zu üben</b>. Der Pokédex ist <b>Open Source</b>, damit andere Entwickler auf dieselbe Weise lernen können wie ich.<br/><br/>Er interagiert außerdem mit einer öffentlichen API, wodurch zusätzliche Erfahrung im asynchronen Datenabruf entsteht.",
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
              "Lazy Loading von Pokémon-Einträgen und Bildern beim Scrollen",
              "Erweiterbare Detailansicht für jedes Pokémon",
              "Vollständige mobile Unterstützung mit responsive Layout",
              "Open Source – für Entwickler, die den Aufbau nachvollziehen möchten",
              "Interagiert mit einer öffentlichen API, um Pokémon-Daten dynamisch zu laden",
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
          "Praktische Erfahrung mit DOM-Manipulation und Event Handling",
          "Implementierung von Lazy Loading zur Performance-Optimierung",
          "State-Management für erweiterbare Detailansichten",
          "Aufbau von responsiven, mobile-first Layouts",
          "Arbeiten mit APIs: Abrufen und Verarbeiten asynchroner Daten",
          "Learning by doing: meine eigenen Fähigkeiten verbessern und gleichzeitig eine Ressource für andere schaffen, um daraus zu lernen",
        ],
      },
    },
  ], */
} as const satisfies ProjectContent;
