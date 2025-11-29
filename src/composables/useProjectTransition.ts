import { ref, watch } from "vue";
import { projectId } from "./useRouteObserver";

export const ROUTE_TRANSITION_DURATION = 400;

export const isTransitioning = ref(false);

export const useProjectTransition = () => {
  watch(
    projectId,
    (newProjectId, oldProjectId, onInvalidate) => {
      if (newProjectId !== null && newProjectId !== oldProjectId) {
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
