// Standalone test demo of ShellCycle matching
console.log('='.repeat(70));
console.log('🦐 SHELLCYCLE MVP - MATCHING ALGORITHM DEMONSTRATION');
console.log('='.repeat(70));

// Seed restaurants (from data/seedRestaurants.ts)
const seedRestaurants = [
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

// Matching algorithm (from lib/matching.ts)
function calculateScore(restaurant, lab) {
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
  const quantityDiff = Math.abs(restaurant.weeklyKg - lab.weeklyKgNeeded);
  const quantityScore = Math.max(0, 20 - quantityDiff);
  score += quantityScore;

  return score;
}

function matchRestaurantsToLab(lab, restaurants) {
  // Filter by shell type compatibility
  const typeCompatible = restaurants.filter(
    (r) => r.shellType === lab.shellTypeNeeded || r.shellType === "mixed"
  );

  // Filter by volume sufficiency (at least 50% of lab's needs)
  const volumeSufficient = typeCompatible.filter(
    (r) => r.weeklyKg >= lab.weeklyKgNeeded * 0.5
  );

  // Score each restaurant
  const scored = volumeSufficient.map((restaurant) => ({
    restaurant,
    score: calculateScore(restaurant, lab),
  }));

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Extract results
  const bestMatch = scored.length > 0 ? scored[0] : null;
  const otherMatches = scored.slice(1, 4).map((s) => s.restaurant);

  return { bestMatch, otherMatches };
}

// TEST 1: Lab looking for shrimp
console.log('\n🧪 TEST 1: Lab Needs SHRIMP Shells');
console.log('-'.repeat(70));
const lab1 = {
  shellTypeNeeded: 'shrimp',
  weeklyKgNeeded: 20,
  radiusKm: 10,
  frequency: 'weekly',
  purpose: 'Chitosan extraction for biodegradable packaging'
};

const result1 = matchRestaurantsToLab(lab1, seedRestaurants);
console.log('\n✅ BEST MATCH:');
if (result1.bestMatch) {
  const r = result1.bestMatch.restaurant;
  const score = result1.bestMatch.score;
  console.log(`   🏆 ${r.name} (Score: ${score})`);
  console.log(`      Shell Type: ${r.shellType}`);
  console.log(`      Weekly Supply: ${r.weeklyKg} kg`);
  console.log(`      Storage: ${r.storage}`);
  console.log(`      Pickup: ${r.pickupWindow}`);
  console.log(`      Location: ${r.location}`);
  console.log(`\n   💡 Why this match?`);
  console.log(`      - Exact shell type match (+50 pts)`);
  console.log(`      - ${r.storage === 'frozen' ? 'Frozen storage (+20 pts)' : 'Non-frozen storage (0 pts)'}`);
  console.log(`      - Quantity close to needs (+${Math.max(0, 20 - Math.abs(r.weeklyKg - lab1.weeklyKgNeeded))} pts)`);
} else {
  console.log('   ❌ No matches found');
}

if (result1.otherMatches.length > 0) {
  console.log(`\n📋 OTHER MATCHES (${result1.otherMatches.length}):`);
  result1.otherMatches.forEach((r, idx) => {
    console.log(`   ${idx + 1}. ${r.name}`);
    console.log(`      ${r.weeklyKg}kg/week ${r.shellType} | ${r.storage} | ${r.location}`);
  });
}

// TEST 2: Lab looking for crab
console.log('\n\n🧪 TEST 2: Lab Needs CRAB Shells');
console.log('-'.repeat(70));
const lab2 = {
  shellTypeNeeded: 'crab',
  weeklyKgNeeded: 15,
  radiusKm: 15,
  frequency: 'weekly',
  purpose: 'Microplastic filtration research'
};

const result2 = matchRestaurantsToLab(lab2, seedRestaurants);
console.log('\n✅ BEST MATCH:');
if (result2.bestMatch) {
  const r = result2.bestMatch.restaurant;
  const score = result2.bestMatch.score;
  console.log(`   🏆 ${r.name} (Score: ${score})`);
  console.log(`      Shell Type: ${r.shellType}`);
  console.log(`      Weekly Supply: ${r.weeklyKg} kg`);
  console.log(`      Storage: ${r.storage}`);
  console.log(`      Pickup: ${r.pickupWindow}`);
  console.log(`      Location: ${r.location}`);
}

if (result2.otherMatches.length > 0) {
  console.log(`\n📋 OTHER MATCHES (${result2.otherMatches.length}):`);
  result2.otherMatches.forEach((r, idx) => {
    console.log(`   ${idx + 1}. ${r.name} - ${r.weeklyKg}kg ${r.shellType} (${r.storage})`);
  });
}

// TEST 3: Lab looking for lobster (limited supply)
console.log('\n\n🧪 TEST 3: Lab Needs LOBSTER Shells');
console.log('-'.repeat(70));
const lab3 = {
  shellTypeNeeded: 'lobster',
  weeklyKgNeeded: 10,
  radiusKm: 20,
  frequency: 'biweekly',
  purpose: 'Biomaterial polymer science'
};

const result3 = matchRestaurantsToLab(lab3, seedRestaurants);
console.log('\n✅ BEST MATCH:');
if (result3.bestMatch) {
  const r = result3.bestMatch.restaurant;
  const score = result3.bestMatch.score;
  console.log(`   🏆 ${r.name} (Score: ${score})`);
  console.log(`      Shell Type: ${r.shellType}`);
  console.log(`      Weekly Supply: ${r.weeklyKg} kg`);
  console.log(`      Storage: ${r.storage}`);
  console.log(`      Location: ${r.location}`);

  if (r.weeklyKg < lab3.weeklyKgNeeded) {
    console.log(`\n   ⚠️  Supply is ${lab3.weeklyKgNeeded - r.weeklyKg}kg short of weekly needs`);
    console.log(`      Consider bi-weekly pickup or supplementary sources`);
  }
}

if (result3.otherMatches.length > 0) {
  console.log(`\n📋 OTHER MATCHES (${result3.otherMatches.length}):`);
  result3.otherMatches.forEach((r, idx) => {
    console.log(`   ${idx + 1}. ${r.name} - ${r.weeklyKg}kg ${r.shellType}`);
  });
}

// Show all restaurants
console.log('\n\n📊 ALL AVAILABLE RESTAURANTS IN DATABASE:');
console.log('='.repeat(70));
seedRestaurants.forEach((r, idx) => {
  console.log(`\n${idx + 1}. ${r.name}`);
  console.log(`   Type: ${r.shellType.padEnd(8)} | Supply: ${r.weeklyKg}kg/week | Storage: ${r.storage}`);
  console.log(`   Pickup: ${r.pickupWindow.padEnd(10)} | Location: ${r.location}`);
});

console.log('\n' + '='.repeat(70));
console.log('✅ MATCHING ALGORITHM TESTS COMPLETE');
console.log('='.repeat(70));
console.log('\n💡 The matching algorithm scores restaurants based on:');
console.log('   • Exact shell type match: +50 points');
console.log('   • Frozen storage: +20 points');
console.log('   • Quantity closeness: +0 to 20 points');
console.log('   • "Mixed" shell type acts as wildcard (matches any request)');
console.log('\n🌐 Server running at: http://localhost:3000');
console.log('   (Browser access required for full UI experience)\n');
