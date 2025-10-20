import gsap from "gsap";
import { BREAKPOINTS } from "../../utils/sizes";

export const createMatchMedia = (
  setup: (context: gsap.Context, conditions: { mobile: boolean; desktop: boolean }) => void | (() => void),
): gsap.MatchMedia => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      mobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
      desktop: `(min-width: ${BREAKPOINTS.md}px)`,
    },
    (context) => {
      const { conditions } = context;
      const cleanup = setup(context, conditions as { mobile: boolean; desktop: boolean });
      return cleanup;
    },
  );

  return mm;
};
