import { Restaurant } from "@/lib/types";

// Hard-coded seed restaurants for demo purposes
export const seedRestaurants: Restaurant[] = [
  {
    id: "seed-1",
    name: "Bag O' Crab - Downtown",
    shellType: "crab",
    weeklyKg: 15,
    storage: "frozen",
    pickupWindow: "6-9 PM",
    location: "Downtown District",
  },
  {
    id: "seed-2",
    name: "Red Lobster - Waterfront",
    shellType: "lobster",
    weeklyKg: 8,
    storage: "frozen",
    pickupWindow: "10-11 PM",
    location: "Waterfront",
  },
  {
    id: "seed-3",
    name: "Shrimp Shack - Central",
    shellType: "shrimp",
    weeklyKg: 25,
    storage: "refrigerated",
    pickupWindow: "7-10 PM",
    location: "Central District",
  },
  {
    id: "seed-4",
    name: "Ocean's Bounty - Midtown",
    shellType: "mixed",
    weeklyKg: 20,
    storage: "frozen",
    pickupWindow: "8-10 PM",
    location: "Midtown",
  },
  {
    id: "seed-5",
    name: "The Crab Pot - Harbor",
    shellType: "crab",
    weeklyKg: 12,
    storage: "frozen",
    pickupWindow: "9-11 PM",
    location: "Harbor District",
  },
  {
    id: "seed-6",
    name: "Prawn Palace - East Side",
    shellType: "shrimp",
    weeklyKg: 18,
    storage: "refrigerated",
    pickupWindow: "6-8 PM",
    location: "East Side",
  },
];
