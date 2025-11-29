import { ref, onMounted, onUnmounted, watch } from "vue";

// Global reactive refs for projectId and path
export const projectId = ref<string | null>(null);
export const recentProjectId = ref<string | null>(null);
export const path = ref<string>(typeof window !== "undefined" ? window.location.pathname : "/");

// Shared state and listeners to avoid multiple interceptors
let listeners: Set<() => void> = new Set();
let isHistoryIntercepted = false;
let originalPushState: typeof history.pushState;
let originalReplaceState: typeof history.replaceState;

const updateAllListeners = () => {
  listeners.forEach((listener) => listener());
};

const interceptHistory = () => {
  if (typeof window === "undefined" || isHistoryIntercepted) return;

  originalPushState = history.pushState;
  originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(history, args);
    updateAllListeners();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(history, args);
    updateAllListeners();
  };

  isHistoryIntercepted = true;
};

const restoreHistory = () => {
  if (typeof window === "undefined" || !isHistoryIntercepted) return;

  if (originalPushState) {
    history.pushState = originalPushState;
  }
  if (originalReplaceState) {
    history.replaceState = originalReplaceState;
  }

  isHistoryIntercepted = false;
};

export const useRouteObserver = () => {
  // Local refs to compute and mirror the global ones for reactivity
  const localPath = ref(typeof window !== "undefined" ? window.location.pathname : "/");
  const localProjectId = ref<string | null>(null);

  const updatePath = () => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      localPath.value = currentPath;
      path.value = currentPath; // Keep global path ref up to date
    }
  };

  const handlePopState = () => {
    updatePath();
  };

  // Extract and keep projectId in sync
  watch(
    localPath,
    (newPath) => {
      const projectMatch = newPath.match(/^\/project\/([^/]+)$/);
      const projId = projectMatch ? (projectMatch[1] as string) : null;
      localProjectId.value = projId;
      projectId.value = projId;
      if (typeof projId === "string") {
        recentProjectId.value = projId;
      }
    },
    { immediate: true },
  );

  onMounted(() => {
    if (typeof window !== "undefined") {
      // Initialize values immediately on mount
      updatePath();

      listeners.add(updatePath);
      window.addEventListener("popstate", handlePopState);
      interceptHistory();
    }
  });

  onUnmounted(() => {
    if (typeof window !== "undefined") {
      listeners.delete(updatePath);
      window.removeEventListener("popstate", handlePopState);

      if (listeners.size === 0) {
        restoreHistory();
      }
    }
  });
};
