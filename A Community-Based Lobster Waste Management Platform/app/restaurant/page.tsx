"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRestaurants } from "@/lib/RestaurantContext";
import { Restaurant, ShellType, StorageMethod } from "@/lib/types";

export default function RestaurantPage() {
  const { addRestaurant } = useRestaurants();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRestaurant, setSubmittedRestaurant] =
    useState<Restaurant | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [shellType, setShellType] = useState<ShellType>("shrimp");
  const [weeklyKg, setWeeklyKg] = useState("");
  const [storage, setStorage] = useState<StorageMethod>("frozen");
  const [pickupWindow, setPickupWindow] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!name || !weeklyKg || !pickupWindow || !location) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Create restaurant object
    const restaurant: Restaurant = {
      id: `user-${Date.now()}`,
      name,
      shellType,
      weeklyKg: parseFloat(weeklyKg),
      storage,
      pickupWindow,
      location,
    };

    // Add to global state
    addRestaurant(restaurant);

    // Show success
    setSubmittedRestaurant(restaurant);
    setIsSubmitting(false);
  };

  if (submittedRestaurant) {
    return (
      <main className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-green-500">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Registration Successful!
              </h2>
              <p className="text-gray-600">
                Thanks, you&apos;re now supplying ~
                {submittedRestaurant.weeklyKg} kg/week of{" "}
                {submittedRestaurant.shellType} shells.
              </p>
            </div>

            {/* Restaurant Summary */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div>
                <span className="font-semibold">Restaurant:</span>{" "}
                {submittedRestaurant.name}
              </div>
              <div>
                <span className="font-semibold">Shell Type:</span>{" "}
                {submittedRestaurant.shellType}
              </div>
              <div>
                <span className="font-semibold">Weekly Supply:</span>{" "}
                {submittedRestaurant.weeklyKg} kg
              </div>
              <div>
                <span className="font-semibold">Storage:</span>{" "}
                {submittedRestaurant.storage}
              </div>
              <div>
                <span className="font-semibold">Pickup Window:</span>{" "}
                {submittedRestaurant.pickupWindow}
              </div>
              <div>
                <span className="font-semibold">Location:</span>{" "}
                {submittedRestaurant.location}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Link
                href="/"
                className="flex-1 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-center"
              >
                Back to Home
              </Link>
              <button
                onClick={() => {
                  setSubmittedRestaurant(null);
                  setName("");
                  setWeeklyKg("");
                  setPickupWindow("");
                  setLocation("");
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register Another
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Restaurant Registration
          </h1>
          <p className="text-gray-600">
            Register your crustacean shell waste stream to connect with
            research labs.
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8 space-y-6"
        >
          {/* Restaurant Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Restaurant Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g., Joe's Seafood Shack"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Shell Type */}
          <div>
            <label
              htmlFor="shellType"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Shell Type *
            </label>
            <select
              id="shellType"
              value={shellType}
              onChange={(e) => setShellType(e.target.value as ShellType)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="shrimp">Shrimp</option>
              <option value="crab">Crab</option>
              <option value="lobster">Lobster</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          {/* Weekly Quantity */}
          <div>
            <label
              htmlFor="weeklyKg"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Estimated Quantity per Week (kg) *
            </label>
            <input
              type="number"
              id="weeklyKg"
              value={weeklyKg}
              onChange={(e) => setWeeklyKg(e.target.value)}
              required
              min="0"
              step="0.1"
              placeholder="e.g., 15"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Storage Method */}
          <div>
            <label
              htmlFor="storage"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Storage Method *
            </label>
            <select
              id="storage"
              value={storage}
              onChange={(e) => setStorage(e.target.value as StorageMethod)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="frozen">Frozen</option>
              <option value="refrigerated">Refrigerated</option>
              <option value="room_temp">Room Temperature</option>
            </select>
          </div>

          {/* Pickup Window */}
          <div>
            <label
              htmlFor="pickupWindow"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Pickup Window *
            </label>
            <input
              type="text"
              id="pickupWindow"
              value={pickupWindow}
              onChange={(e) => setPickupWindow(e.target.value)}
              required
              placeholder="e.g., 6-9 PM"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="e.g., Downtown District"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Register Restaurant"}
          </button>
        </form>
      </div>
    </main>
  );
}
