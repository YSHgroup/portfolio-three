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
    "CubeWar is a browser-based multiplayer game where players control cube avatars in fast-paced strategic battles.<br/><br/>I built the full stack myself, including the game engine, the client-side timeline system, and real-time networking with Redis-based matchmaking for smooth, high-concurrency gameplay.",
  components: [
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        src: engine,
        alt: "Core & Client Engine",
        /**        component: {
          type: "list",
          props: {
            headline: "Features",
            items: [
              "Game engine handling all rules and mechanics",
              "Client engine with a timeline system for smooth, synced animations",
              "Timescale adjustments to stay in sync with the server",
              "Supports multiple gamemodes: Free-for-All, 1v1, 2v2",
              "Party system for 1-4 players",
            ],
          },
        }, */
      },
    },
    {
      type: "imageText",
      props: {
        imagePosition: "left",
        border: false,
        src: maps,
        alt: "Maps & Themes",
        /**        component: {
          type: "list",
          props: {
            headline: "Flexible Maps",
            items: [
              "32x32 grid system with elevation on the Y-axis",
              "Custom maps with flexible layouts",
              "Various themes like beach or canyon",
              "Randomized tiles that can include weapons, buffs, or traps",
            ],
          },
        }, */
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
            title: "Party System",
            text: "Players can team up in parties of 1-4 to tackle matches together or compete against other teams. The system makes sure everyone in a party joins the same game session, so coordinated gameplay feels natural and fun.",
          },
        },
      },
    },
    {
      type: "text",
      props: {
        title: "Architecture & Development",
        text: `
          CubeWar runs on a microservice-based monorepo, with separate services for game logic, matchmaking, and user management. Shared packages make it easy to build modular, scalable features for games, services, and UI components.<br/><br/>
          The engine includes a client-server timeline for smooth animations, flexible map layouts, multiple gamemodes, and a party system. I also handled all 3D models, icons, and UI elements, giving me full control over both the technical and visual sides of the project.<br/><br/>
          Overall, this project highlights full-stack development, real-time multiplayer networking, and a scalable architecture.
        `,
      },
    },
  ],
  /**  components: [
   

    {
      type: "list",
      props: {
        headline: "Learnings",
        width: "md",
        items: [
          "Organizing a monorepo with shared packages for engines, services, and UI components",
          "Building reliable matchmaking with Redis, Lua Scripts and WebSockets",
          "Developing a synchronized client-server timeline for smooth animations",
          "Creating multiple gamemodes and a party system for teamwork",
          "Producing all game assets: 3D elements, icons, UI components",
          "Optimizing performance for fast-paced browser battles",
        ],
      },
    },
  ], */
} as const satisfies ProjectContent;
