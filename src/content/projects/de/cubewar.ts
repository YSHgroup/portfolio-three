import videoCubeWar from "../../../assets/videos/cubewar.mp4";

import engine from "../../../assets/images/projects/cubewar/engine.png";
import maps from "../../../assets/images/projects/cubewar/maps.png";
import party from "../../../assets/images/projects/cubewar/party.png";

import type { ProjectContent } from "../../types";

export default {
  title: "CubeWar",
  tags: ["three", "node", "websockets", "kubernetes", "redis"],
  video: videoCubeWar,
  videoBorder: false,
  live: "https://cubewar.io",
  description:
    "CubeWar ist ein browserbasiertes Multiplayer-Spiel, in dem Spieler in schnellen, strategischen Kämpfen gegeneinander antreten.<br/><br/>Ich habe den gesamten Stack selbst entwickelt, inklusive der Spiel-Engine, des Client-Timeline-Systems und des Echtzeit-Netzwerks mit Redis-basiertem Matchmaking für flüssiges Gameplay.",
  components: [
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: engine,
        alt: "Features",
        component: {
          type: "list",
          props: {
            title: "Features",
            items: [
              "Game-Engine, die alle Regeln und Spielmechaniken verwaltet",
              "Client-Engine mit Timeline-System für flüssige, synchronisierte Animationen",
              "Anpassung der Animationsgeschwindigkeit zur Synchronisation mit dem Server",
              "Unterstützt mehrere Spielmodi: Free-for-All, 1v1, 2v2",
              "Party-System für 1-4 Spieler",
            ],
          },
        },
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "left",
        border: true,
        src: maps,
        alt: "Spielkarten & Themen",
        component: {
          type: "list",
          props: {
            title: "Flexible Spielkarten",
            items: [
              "32x32 Raster mit Höhenangaben auf der Y-Achse",
              "Individuelle Spielkarten mit flexiblem Layout",
              "Verschiedene Themen wie <i>Strand</i> oder <i>Canyon</i>",
              "Zufällig generierte Felder können Waffen, Buffs oder Fallen enthalten",
            ],
          },
        },
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: party,
        alt: "Party System",
        component: {
          type: "text",
          props: {
            title: "Party-System",
            text: "Spieler können sich in 1-4er-Partys zusammenschließen, um Matches gemeinsam zu bestreiten oder gegen andere Teams anzutreten. Das System stellt sicher, dass alle Partymitglieder in dieselbe Spielsession kommen, wodurch koordiniertes Gameplay natürlich und spaßig wirkt.",
          },
        },
      },
    },
    {
      type: "text",
      props: {
        title: "Architektur & Entwicklung",
        text: `
          CubeWar basiert auf einer Microservice-Monorepo mit separaten Services für Spiel-Logik, Matchmaking und Benutzerverwaltung. Gemeinsame Pakete ermöglichen modulare und skalierbare Features für Spiele, Services und UI-Komponenten.<br/><br/>
          Die Engine umfasst ein Client-Server-Timeline-System für flüssige Animationen, flexible Spielkartenlayouts, mehrere Spielmodi und ein Party-System. Ich habe zudem alle 3D-Modelle, Icons und UI-Elemente erstellt und hatte so die volle Kontrolle über technische und visuelle Aspekte des Projekts.<br/><br/>
          Insgesamt zeigt das Projekt Full-Stack-Entwicklung, Echtzeit-Multiplayer-Netzwerke und eine skalierbare Architektur.
        `,
      },
    },
    {
      type: "list",
      props: {
        title: "Learnings",
        size: "md",
        items: [
          "Monorepo mit gemeinsamen Paketen für Engines, Services und UI-Komponenten strukturieren",
          "Matchmaking mit Redis, Lua-Skripten und WebSockets umsetzen",
          "Synchronisierte Client-Server-Timeline für synchronisierte Animationen entwickeln",
          "Alle Spiel-Assets erstellen: 3D-Elemente, Icons, UI-Komponenten",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
