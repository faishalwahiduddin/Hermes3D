import type { AgentAvatarProfile } from "@/lib/avatars/profile";

/**
 * Local portrait + voxel palette map for the camo hermes-agent fleet.
 * Photos live under `public/agent-portraits/` (sourced from ops/system assets).
 */
export type HermesPortraitEntry = {
  portraitPath: string;
  thumbPath: string;
  accentColor: string;
  profile: Omit<AgentAvatarProfile, "version" | "seed"> & {
    version?: 1;
    seed?: string;
  };
};

const portrait = (id: string) => `/agent-portraits/${id}.png`;
const thumb = (id: string) => `/agent-portraits/thumbs/${id}.png`;

const base = (
  id: string,
  accentColor: string,
  profile: HermesPortraitEntry["profile"],
): HermesPortraitEntry => ({
  portraitPath: portrait(id === "default" ? "default" : id),
  thumbPath: thumb(id === "default" ? "default" : id),
  accentColor,
  profile: {
    version: 1,
    seed: id,
    ...profile,
  },
});

export const HERMES_AGENT_PORTRAIT_MAP: Record<string, HermesPortraitEntry> = {
  default: base("default", "#64748b", {
    body: { skinTone: "#b7794e" },
    hair: { style: "short", color: "#151515" },
    clothing: {
      topStyle: "jacket",
      topColor: "#2d3748",
      bottomStyle: "pants",
      bottomColor: "#64748b",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
  // Some gateways expose the root profile as "main"
  main: base("default", "#64748b", {
    body: { skinTone: "#b7794e" },
    hair: { style: "short", color: "#151515" },
    clothing: {
      topStyle: "jacket",
      topColor: "#2d3748",
      bottomStyle: "pants",
      bottomColor: "#64748b",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
  bagas: base("bagas", "#1e3a8a", {
    body: { skinTone: "#d8a06e" },
    hair: { style: "short", color: "#151515" },
    clothing: {
      topStyle: "hoodie",
      topColor: "#2d3748",
      bottomStyle: "pants",
      bottomColor: "#64748b",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: true, headset: false, hatStyle: "none", backpack: false },
  }),
  indira: base("indira", "#8b5cf6", {
    body: { skinTone: "#d8a06e" },
    hair: { style: "parted", color: "#151515" },
    clothing: {
      topStyle: "tee",
      topColor: "#2d3748",
      bottomStyle: "pants",
      bottomColor: "#64748b",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
  melati: base("melati", "#34d399", {
    body: { skinTone: "#d8a06e" },
    hair: { style: "bun", color: "#151515" },
    clothing: {
      topStyle: "tee",
      topColor: "#34d399",
      bottomStyle: "pants",
      bottomColor: "#f5f5f4",
      shoesColor: "#7c4a2d",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
  rizki: base("rizki", "#f59e0b", {
    body: { skinTone: "#d8a06e" },
    hair: { style: "spiky", color: "#151515" },
    clothing: {
      topStyle: "jacket",
      topColor: "#f59e0b",
      bottomStyle: "pants",
      bottomColor: "#64748b",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
  wulan: base("wulan", "#f5f5f4", {
    body: { skinTone: "#f4c58a" },
    hair: { style: "parted", color: "#151515" },
    clothing: {
      topStyle: "tee",
      topColor: "#f5f5f4",
      bottomStyle: "pants",
      bottomColor: "#64748b",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
  kirana: base("kirana", "#f43f5e", {
    body: { skinTone: "#d8a06e" },
    hair: { style: "parted", color: "#151515" },
    clothing: {
      topStyle: "tee",
      topColor: "#f43f5e",
      bottomStyle: "pants",
      bottomColor: "#2d3748",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
  dimas: base("dimas", "#7090ff", {
    body: { skinTone: "#b7794e" },
    hair: { style: "short", color: "#151515" },
    clothing: {
      topStyle: "jacket",
      topColor: "#2d3748",
      bottomStyle: "pants",
      bottomColor: "#64748b",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
  nita: base("nita", "#f59e0b", {
    body: { skinTone: "#f4c58a" },
    hair: { style: "parted", color: "#151515" },
    clothing: {
      topStyle: "tee",
      topColor: "#f59e0b",
      bottomStyle: "pants",
      bottomColor: "#64748b",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: true },
  }),
  // Closest voxel stand-in for lavender hijab: violet beanie + violet top.
  rani: base("rani", "#8b5cf6", {
    body: { skinTone: "#d8a06e" },
    hair: { style: "bun", color: "#8b5cf6" },
    clothing: {
      topStyle: "tee",
      topColor: "#8b5cf6",
      bottomStyle: "pants",
      bottomColor: "#f5f5f4",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: false, headset: false, hatStyle: "beanie", backpack: false },
  }),
  bayu: base("bayu", "#34d399", {
    body: { skinTone: "#b7794e" },
    hair: { style: "short", color: "#151515" },
    clothing: {
      topStyle: "jacket",
      topColor: "#34d399",
      bottomStyle: "pants",
      bottomColor: "#2d3748",
      shoesColor: "#7c4a2d",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
  citra: base("citra", "#34d399", {
    body: { skinTone: "#d8a06e" },
    hair: { style: "bun", color: "#151515" },
    clothing: {
      topStyle: "tee",
      topColor: "#34d399",
      bottomStyle: "shorts",
      bottomColor: "#64748b",
      shoesColor: "#e5e7eb",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
  ilham: base("ilham", "#2d3748", {
    body: { skinTone: "#b7794e" },
    hair: { style: "spiky", color: "#151515" },
    clothing: {
      topStyle: "tee",
      topColor: "#2d3748",
      bottomStyle: "pants",
      bottomColor: "#64748b",
      shoesColor: "#1a1a1a",
    },
    accessories: { glasses: false, headset: false, hatStyle: "none", backpack: false },
  }),
};

export const resolveHermesPortraitEntry = (
  agentId: string,
): HermesPortraitEntry | null => {
  const key = agentId.trim().toLowerCase();
  if (!key) return null;
  return HERMES_AGENT_PORTRAIT_MAP[key] ?? null;
};

export const resolveHermesPortraitUrl = (agentId: string): string | null =>
  resolveHermesPortraitEntry(agentId)?.portraitPath ?? null;

export const resolveHermesPortraitThumbUrl = (agentId: string): string | null =>
  resolveHermesPortraitEntry(agentId)?.thumbPath ?? null;

export const resolveHermesAccentColor = (agentId: string): string | null =>
  resolveHermesPortraitEntry(agentId)?.accentColor ?? null;

export const buildHermesAvatarProfile = (agentId: string): AgentAvatarProfile | null => {
  const entry = resolveHermesPortraitEntry(agentId);
  if (!entry) return null;
  const seed = agentId.trim() || "agent";
  return {
    version: 1,
    seed,
    body: entry.profile.body,
    hair: entry.profile.hair,
    clothing: entry.profile.clothing,
    accessories: entry.profile.accessories,
  };
};
