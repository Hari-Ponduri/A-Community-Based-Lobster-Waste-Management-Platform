"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRestaurants } from "@/lib/RestaurantContext";
import { LabRequest, Restaurant, ShellType, AiMatchAdvice } from "@/lib/types";
import { matchRestaurantsToLab, MatchResult } from "@/lib/matching";

export default function LabPage() {
  const { restaurants } = useRestaurants();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [aiAdvice, setAiAdvice] = useState<AiMatchAdvice | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Form state
  const [shellTypeNeeded, setShellTypeNeeded] = useState<ShellType>("shrimp");
  const [weeklyKgNeeded, setWeeklyKgNeeded] = useState("");
  const [radiusKm, setRadiusKm] = useState("");
  const [frequency, setFrequency] = useState<"weekly" | "biweekly">("weekly");
  const [purpose, setPurpose] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAiError(null);

    // Basic validation
    if (!weeklyKgNeeded || !radiusKm) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Create lab request
    const labRequest: LabRequest = {
      shellTypeNeeded,
      weeklyKgNeeded: parseFloat(weeklyKgNeeded),
      radiusKm: parseInt(radiusKm),
      frequency,
      purpose: purpose || undefined,
    };

    // Run deterministic matching
    const result = matchRestaurantsToLab(labRequest, restaurants);
    setMatchResult(result);

    // Call AI Match Advisor
    if (result.bestMatch) {
      setAiLoading(true);
      try {
        const candidates = [
          result.bestMatch,
          ...result.otherMatches.slice(0, 2),
        ];

        const response = await fetch("/api/ai-match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            labRequest,
            candidates,
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setAiAdvice(data.advice);
      } catch (error) {
        console.error("AI advisor error:", error);
        setAiError(
          "AI advisor temporarily unavailable; using basic match only."
        );
      } finally {
        setAiLoading(false);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Lab Matching
          </h1>
          <p className="text-gray-600">
            Find restaurants that can supply the crustacean shells you need.
          </p>
        </div>

        {/* Lab Request Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 space-y-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            Your Requirements
          </h2>

          {/* Shell Type Needed */}
          <div>
            <label
              htmlFor="shellTypeNeeded"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Shell Type Needed *
            </label>
            <select
              id="shellTypeNeeded"
              value={shellTypeNeeded}
              onChange={(e) => setShellTypeNeeded(e.target.value as ShellType)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="shrimp">Shrimp</option>
              <option value="crab">Crab</option>
              <option value="lobster">Lobster</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          {/* Weekly Quantity Needed */}
          <div>
            <label
              htmlFor="weeklyKgNeeded"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Weekly Quantity Needed (kg) *
            </label>
            <input
              type="number"
              id="weeklyKgNeeded"
              value={weeklyKgNeeded}
              onChange={(e) => setWeeklyKgNeeded(e.target.value)}
              required
              min="0"
              step="0.1"
              placeholder="e.g., 20"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Pickup Radius */}
          <div>
            <label
              htmlFor="radiusKm"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Pickup Radius (km) *
            </label>
            <input
              type="number"
              id="radiusKm"
              value={radiusKm}
              onChange={(e) => setRadiusKm(e.target.value)}
              required
              min="1"
              max="100"
              placeholder="e.g., 10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Frequency */}
          <div>
            <label
              htmlFor="frequency"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Pickup Frequency *
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) =>
                setFrequency(e.target.value as "weekly" | "biweekly")
              }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label
              htmlFor="purpose"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Application / Purpose (Optional)
            </label>
            <textarea
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows={3}
              placeholder="e.g., Chitosan extraction for biodegradable packaging research"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Finding Matches..." : "Find Matches"}
          </button>
        </form>

        {/* Match Results */}
        {matchResult && (
          <div className="space-y-6">
            {matchResult.bestMatch ? (
              <>
                {/* Best Match */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Best Match
                  </h2>
                  <RestaurantCard restaurant={matchResult.bestMatch} isBest />
                </div>

                {/* Other Matches */}
                {matchResult.otherMatches.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      Other Possible Matches
                    </h2>
                    <div className="space-y-4">
                      {matchResult.otherMatches.map((restaurant) => (
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Match Advisor */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-md p-8 border-2 border-purple-200">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    AI Match Advisor
                  </h2>

                  {aiLoading && (
                    <div className="text-gray-600">
                      Analyzing matches and generating recommendations...
                    </div>
                  )}

                  {aiError && (
                    <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                      {aiError}
                    </div>
                  )}

                  {aiAdvice && !aiLoading && (
                    <div className="space-y-4">
                      {/* Summary */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Recommendation
                        </h3>
                        <p className="text-gray-700">{aiAdvice.summary}</p>
                      </div>

                      {/* Logistics Notes */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          Logistics Notes
                        </h3>
                        <p className="text-gray-700 text-sm">
                          {aiAdvice.logisticsNotes}
                        </p>
                      </div>

                      {/* Risk Factors */}
                      {aiAdvice.riskFactors.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2">
                            Risk Factors to Consider
                          </h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            {aiAdvice.riskFactors.map((risk, idx) => (
                              <li key={idx}>{risk}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No Matches Found
                </h2>
                <p className="text-gray-600">
                  We couldn&apos;t find any restaurants matching your
                  requirements. Try adjusting your shell type or quantity
                  needs.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function RestaurantCard({
  restaurant,
  isBest = false,
}: {
  restaurant: Restaurant;
  isBest?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${
        isBest ? "border-4 border-green-500" : "border border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {restaurant.name}
          </h3>
          {isBest && (
            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
              Top Match
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-semibold text-gray-700">Shell Type:</span>
          <div className="text-gray-600 capitalize">{restaurant.shellType}</div>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Weekly Supply:</span>
          <div className="text-gray-600">{restaurant.weeklyKg} kg</div>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Storage:</span>
          <div className="text-gray-600 capitalize">
            {restaurant.storage.replace("_", " ")}
          </div>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Pickup Window:</span>
          <div className="text-gray-600">{restaurant.pickupWindow}</div>
        </div>
        <div className="col-span-2">
          <span className="font-semibold text-gray-700">Location:</span>
          <div className="text-gray-600">{restaurant.location}</div>
        </div>
      </div>
    </div>
  );
}
