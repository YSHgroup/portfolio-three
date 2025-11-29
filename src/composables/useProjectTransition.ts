import { ref, watch } from "vue";
import { projectId } from "./useRouteObserver";
import { isProjectRoute } from "./useRouteObserver";

export const ROUTE_TRANSITION_DURATION = 800;

export const isTransitioning = ref(false);

let isInitialized = typeof window !== "undefined" && !isProjectRoute(window.location.pathname) ? true : false;

export const useProjectTransition = () => {
  watch(
    projectId,
    (newProjectId, oldProjectId, onInvalidate) => {
      // Skip transition on initial load
      if (!isInitialized) {
        isInitialized = true;
        return;
      }

      // Transition when navigating TO a project or FROM a project back to home
      const navigatingToProject = newProjectId !== null && newProjectId !== oldProjectId;
      const navigatingFromProject = oldProjectId !== null && newProjectId === null;

      if (navigatingToProject || navigatingFromProject) {
        isTransitioning.value = true;

        const timeout = setTimeout(() => {
          isTransitioning.value = false;
        }, ROUTE_TRANSITION_DURATION);

        onInvalidate(() => {
          clearTimeout(timeout);
        });
      }
    },
    { immediate: false },
  );

  return {
    isTransitioning,
  };
};
