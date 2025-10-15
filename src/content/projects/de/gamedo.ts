//import thumbnailGamedo from "../../../assets/images/thumbnails/gamedo.png";
import videoGamedo from "../../../assets/videos/gamedo.mp4";

//import avatars from "../../../assets/images/projects/gamedo/avatar-creator.png";
//import games from "../../../assets/images/projects/gamedo/games.png";
//import brand from "../../../assets/images/projects/gamedo/brand-design.png";

import type { ProjectContent } from "../../types";

export const gamedo = {
  title: "Gamedo",
  //thumbnail: thumbnailGamedo,
  video: videoGamedo,
  description:
    "Gamedo ist eine Plattform für <b>schnelle, rundenbasierte Multiplayer-Spiele</b>. Sie verbindet Matchmaking, anpassbare 3D-Avatare und Account-Integration mit einem <b>Rangsystem auf ELO-Basis</b>.<br/><br/>Das Projekt begann als <b>technisches Experiment</b> und entwickelte sich zu einem skalierbaren System, um neue Spielideen auszuprobieren.",
  components: [],
  /**  components: [
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        image: games,
        alt: "Plattform",
        component: {
          type: "list",
          props: {
            headline: "Plattform & Spiele",
            items: [
              "Klassische rundenbasierte Spiele wie Tic Tac Toe",
              "Quiz-Spiele wie Flag Quiz, Trivia und Emoji Math",
              "Ein 3D-Minispiel, bei dem Würfel gezählt werden müssen",
              "Echtzeit-Matchmaking mit Redis + WebSockets",
              "Rangbelohnungen auf Basis eines ELO-Systems",
              "Account-System mit dauerhaftem Spielfortschritt",
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
        image: avatars,
        alt: "Avatare",
        component: {
          type: "text",
          props: {
            title: "3D-Avatar Editor",
            text: "Spieler können ihr Aussehen über ein modulares Avatar-System individuell gestalten.<br/>Der Fokus lag auf Performance und Flexibilität, sodass neue Optionen leicht ergänzt werden können, ohne die Performance zu beeinträchtigen.",
          },
        },
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        image: brand,
        alt: "Brand Design",
        component: {
          type: "text",
          props: {
            title: "Brand Design",
            text: "Neben der technischen Entwicklung habe ich auch das Marken-Design von Gamedo entworfen.<br/>Der Look ist schlicht und verspielt zugleich und gibt der Plattform ein klares, wiedererkennbares Profil.",
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
          "Strukturierung einer Monorepo mit geteilten Paketen für Spiele, Services und UI",
          "Umsetzung von stabilem Matchmaking mit Redis und WebSockets",
          "Entwicklung eines Rang- und Belohnungssystems auf ELO-Basis",
          "Aufbau eines modularen 3D-Avatar Editors",
          "Integration unterschiedlicher Spieltypen, von Quiz bis 3D-Minispiele",
          "Performance-Optimierung für Multiplayer-Spiele im Browser",
        ],
      },
    },
  ], */
} as const satisfies ProjectContent;
