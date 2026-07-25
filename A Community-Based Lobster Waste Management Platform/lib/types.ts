// Core type definitions for ShellCycle MVP

export type ShellType = "shrimp" | "crab" | "lobster" | "mixed";

export type StorageMethod = "frozen" | "refrigerated" | "room_temp";

export type Restaurant = {
  id: string;
  name: string;
  shellType: ShellType;
  weeklyKg: number;
  storage: StorageMethod;
  pickupWindow: string;
  location: string;
};

export type LabRequest = {
  shellTypeNeeded: ShellType;
  weeklyKgNeeded: number;
  radiusKm: number;
  frequency: "weekly" | "biweekly";
  purpose?: string;
};

export type AiMatchAdvice = {
  recommendedRestaurantIds: string[];
  summary: string;
  logisticsNotes: string;
  riskFactors: string[];
};
