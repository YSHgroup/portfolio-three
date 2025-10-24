import videoGamedo from "../../../assets/videos/gamedo.mp4";

//import avatars from "../../../assets/images/projects/gamedo/avatar-creator.png";
//import games from "../../../assets/images/projects/gamedo/games.png";
//import brand from "../../../assets/images/projects/gamedo/brand-design.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Gamedo",
  tags: ["three", "node", "kubernetes", "redis", "postgresql"],
  video: videoGamedo,
  videoBorder: true,
  description:
    "Gamedo is a platform for fast, round-based multiplayer games. It brings together matchmaking, customizable 3D avatars, and account integration with ranked rewards.<br/><br/>The project started as a technical experiment and grew into a scalable system for testing new game ideas.",
  components: [],
  /**  components: [
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        image: games,
        alt: "Platform",
        component: {
          type: "list",
          props: {
            headline: "Platform & Games",
            items: [
              "Classic round-based games like Tic Tac Toe",
              "Quiz titles including Flag Quiz, Trivia, and Emoji Math",
              "A 3D mini-game focused on cube counting",
              "Real-time matchmaking powered by Redis + WebSockets",
              "Ranked rewards using an ELO system",
              "Persistent accounts with progress tracking",
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
        alt: "Avatars",
        component: {
          type: "text",
          props: {
            title: "3D Avatar Customization",
            text: "Players can shape their own look through a modular avatar system.<br/>It’s built to balance flexibility and performance, so new options can be added without slowing the experience down.",
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
            text: "I also created the Gamedo brand identity.<br/>The visual style is clean and playful, giving the platform a distinct character alongside its technical foundation.",
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
          "Organizing a monorepo with shared packages for games, services, and UI components",
          "Building reliable matchmaking with Redis, Lua Scripts and WebSockets",
          "Designing a ranking and reward system based on ELO",
          "Developing a modular 3D avatar creator",
          "Combining different genres, from quizzes to 3D mini-games",
          "Optimizing performance for browser-based multiplayer gameplay",
        ],
      },
    },
  ], */
} as const satisfies ProjectContent;
