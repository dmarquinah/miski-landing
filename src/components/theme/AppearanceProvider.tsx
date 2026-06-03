"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  applyAppearance,
  DEFAULT_APPEARANCE,
  normalizeAppearance,
  STORAGE_KEY,
  type Appearance,
} from "./appearance";

/* ------------------------------------------------------------------ *
 * External store: the persisted appearance lives in localStorage and on
 * the DOM. We expose it via useSyncExternalStore so React reads it without
 * a setState-in-effect, and SSR/first paint use the defaults (matching the
 * prerendered <html> attributes; the no-flash head script reconciles the
 * persisted value before paint).
 * ------------------------------------------------------------------ */

let snapshot: Appearance = DEFAULT_APPEARANCE;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): Appearance {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return normalizeAppearance(JSON.parse(raw));
  } catch {
    /* ignore */
  }
  return DEFAULT_APPEARANCE;
}

function getSnapshot(): Appearance {
  // Read once on the client; thereafter return a stable reference so
  // useSyncExternalStore doesn't loop. Updates flow through setAppearance/storage.
  if (!hydrated) {
    snapshot = readStorage();
    hydrated = true;
  }
  return snapshot;
}

function getServerSnapshot(): Appearance {
  return DEFAULT_APPEARANCE;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      snapshot = readStorage();
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function commit(next: Appearance): void {
  snapshot = next;
  hydrated = true;
  applyAppearance(next, document.documentElement);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable (private mode) — DOM still updates */
  }
  listeners.forEach((l) => l());
}

type AppearanceContextValue = {
  appearance: Appearance;
  setAppearance: <K extends keyof Appearance>(key: K, value: Appearance[K]) => void;
};

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const appearance = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setAppearance = useCallback<AppearanceContextValue["setAppearance"]>((key, value) => {
    commit({ ...snapshot, [key]: value });
  }, []);

  return (
    <AppearanceContext.Provider value={{ appearance, setAppearance }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance(): AppearanceContextValue {
  const ctx = useContext(AppearanceContext);
  if (!ctx) throw new Error("useAppearance must be used within an AppearanceProvider");
  return ctx;
}
