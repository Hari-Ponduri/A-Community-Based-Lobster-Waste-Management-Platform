"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Restaurant } from "./types";
import { seedRestaurants } from "@/data/seedRestaurants";

type RestaurantContextType = {
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined
);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(seedRestaurants);

  const addRestaurant = (restaurant: Restaurant) => {
    setRestaurants((prev) => [...prev, restaurant]);
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, addRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurants() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurants must be used within RestaurantProvider");
  }
  return context;
}
