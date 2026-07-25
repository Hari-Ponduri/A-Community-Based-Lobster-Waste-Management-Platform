import { Restaurant, LabRequest } from "./types";

export type MatchResult = {
  bestMatch: Restaurant | null;
  otherMatches: Restaurant[];
};

type ScoredRestaurant = {
  restaurant: Restaurant;
  score: number;
};

/**
 * Matches restaurants to a lab's requirements using a scoring algorithm.
 *
 * Filtering criteria:
 * - Shell type compatibility (exact match or "mixed")
 * - Volume sufficiency (restaurant supplies >= 50% of lab's needs)
 *
 * Scoring (per restaurant):
 * - +50 points for exact shell type match
 * - +20 points for frozen storage
 * - +0 to 20 points based on quantity closeness to lab needs
 */
export function matchRestaurantsToLab(
  lab: LabRequest,
  restaurants: Restaurant[]
): MatchResult {
  // Filter by shell type compatibility
  const typeCompatible = restaurants.filter(
    (r) => r.shellType === lab.shellTypeNeeded || r.shellType === "mixed"
  );

  // Filter by volume sufficiency (at least 50% of lab's needs)
  const volumeSufficient = typeCompatible.filter(
    (r) => r.weeklyKg >= lab.weeklyKgNeeded * 0.5
  );

  // Score each restaurant
  const scored: ScoredRestaurant[] = volumeSufficient.map((restaurant) => ({
    restaurant,
    score: calculateScore(restaurant, lab),
  }));

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Extract results
  const bestMatch = scored.length > 0 ? scored[0].restaurant : null;
  const otherMatches = scored.slice(1, 4).map((s) => s.restaurant);

  return { bestMatch, otherMatches };
}

function calculateScore(restaurant: Restaurant, lab: LabRequest): number {
  let score = 0;

  // Exact shell type match: +50 points
  if (restaurant.shellType === lab.shellTypeNeeded) {
    score += 50;
  }

  // Frozen storage: +20 points
  if (restaurant.storage === "frozen") {
    score += 20;
  }

  // Quantity closeness: +0 to 20 points
  // Calculate absolute difference and subtract from 20, clamped at 0
  const quantityDiff = Math.abs(restaurant.weeklyKg - lab.weeklyKgNeeded);
  const quantityScore = Math.max(0, 20 - quantityDiff);
  score += quantityScore;

  return score;
}
