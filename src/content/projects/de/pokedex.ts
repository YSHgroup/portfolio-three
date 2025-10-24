import videoPokedex from "../../../assets/videos/pokedex.mp4";

import mobile from "../../../assets/images/projects/pokedex/mobile.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Pokédex",
  tags: ["javascript", "html", "css"],
  live: "https://pokedex.david-hckh.com/",
  source: "https://github.com/davidhckh/pokedex",
  video: videoPokedex,
  videoBorder: true,
  description:
    "Eines meiner ersten Webprojekte, um Kernkonzepte der Webentwicklung zu üben. Der Pokédex ist Open Source, damit andere Entwickler auf dieselbe Weise lernen können wie ich.<br/><br/>Er interagiert außerdem mit einer öffentlichen API, um zusätzliche Erfahrung zu sammeln.",
  components: [
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: mobile,
        alt: "Pokédex App",
        component: {
          type: "list",
          props: {
            title: "Features",
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
        title: "Learnings",
        size: "md",
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
  ],
} as const satisfies ProjectContent;
