// Test script to verify ShellCycle matching algorithm
import { matchRestaurantsToLab } from './lib/matching.js';
import { seedRestaurants } from './data/seedRestaurants.js';

console.log('='.repeat(60));
console.log('SHELLCYCLE MATCHING ALGORITHM TEST');
console.log('='.repeat(60));

// Test 1: Lab looking for shrimp shells
console.log('\n🧪 TEST 1: Lab needs 20kg/week of SHRIMP shells');
console.log('-'.repeat(60));

const labRequest1 = {
  shellTypeNeeded: 'shrimp',
  weeklyKgNeeded: 20,
  radiusKm: 10,
  frequency: 'weekly',
  purpose: 'Chitosan extraction for biodegradable packaging'
};

const result1 = matchRestaurantsToLab(labRequest1, seedRestaurants);

console.log(`\n✅ BEST MATCH:`);
if (result1.bestMatch) {
  console.log(`   Name: ${result1.bestMatch.name}`);
  console.log(`   Shell Type: ${result1.bestMatch.shellType}`);
  console.log(`   Weekly Supply: ${result1.bestMatch.weeklyKg} kg`);
  console.log(`   Storage: ${result1.bestMatch.storage}`);
  console.log(`   Pickup Window: ${result1.bestMatch.pickupWindow}`);
  console.log(`   Location: ${result1.bestMatch.location}`);
} else {
  console.log('   No matches found');
}

if (result1.otherMatches.length > 0) {
  console.log(`\n📋 OTHER MATCHES (${result1.otherMatches.length}):`);
  result1.otherMatches.forEach((r, idx) => {
    console.log(`   ${idx + 1}. ${r.name} - ${r.weeklyKg}kg/week ${r.shellType} (${r.storage})`);
  });
}

// Test 2: Lab looking for crab shells
console.log('\n\n🧪 TEST 2: Lab needs 15kg/week of CRAB shells');
console.log('-'.repeat(60));

const labRequest2 = {
  shellTypeNeeded: 'crab',
  weeklyKgNeeded: 15,
  radiusKm: 15,
  frequency: 'weekly',
  purpose: 'Microplastic filtration research'
};

const result2 = matchRestaurantsToLab(labRequest2, seedRestaurants);

console.log(`\n✅ BEST MATCH:`);
if (result2.bestMatch) {
  console.log(`   Name: ${result2.bestMatch.name}`);
  console.log(`   Shell Type: ${result2.bestMatch.shellType}`);
  console.log(`   Weekly Supply: ${result2.bestMatch.weeklyKg} kg`);
  console.log(`   Storage: ${result2.bestMatch.storage}`);
  console.log(`   Pickup Window: ${result2.bestMatch.pickupWindow}`);
  console.log(`   Location: ${result2.bestMatch.location}`);
}

if (result2.otherMatches.length > 0) {
  console.log(`\n📋 OTHER MATCHES (${result2.otherMatches.length}):`);
  result2.otherMatches.forEach((r, idx) => {
    console.log(`   ${idx + 1}. ${r.name} - ${r.weeklyKg}kg/week ${r.shellType} (${r.storage})`);
  });
}

// Test 3: Mixed shells
console.log('\n\n🧪 TEST 3: Lab needs 18kg/week of LOBSTER shells');
console.log('-'.repeat(60));

const labRequest3 = {
  shellTypeNeeded: 'lobster',
  weeklyKgNeeded: 18,
  radiusKm: 20,
  frequency: 'biweekly',
  purpose: 'Biomaterial polymer science'
};

const result3 = matchRestaurantsToLab(labRequest3, seedRestaurants);

console.log(`\n✅ BEST MATCH:`);
if (result3.bestMatch) {
  console.log(`   Name: ${result3.bestMatch.name}`);
  console.log(`   Shell Type: ${result3.bestMatch.shellType}`);
  console.log(`   Weekly Supply: ${result3.bestMatch.weeklyKg} kg`);
  console.log(`   Storage: ${result3.bestMatch.storage}`);
} else {
  console.log('   No matches found');
}

if (result3.otherMatches.length > 0) {
  console.log(`\n📋 OTHER MATCHES (${result3.otherMatches.length}):`);
  result3.otherMatches.forEach((r, idx) => {
    console.log(`   ${idx + 1}. ${r.name} - ${r.weeklyKg}kg/week ${r.shellType} (${r.storage})`);
  });
}

// Test 4: Show all seed restaurants
console.log('\n\n📊 ALL SEED RESTAURANTS IN DATABASE:');
console.log('='.repeat(60));
seedRestaurants.forEach((r, idx) => {
  console.log(`\n${idx + 1}. ${r.name}`);
  console.log(`   Shell Type: ${r.shellType}`);
  console.log(`   Weekly Supply: ${r.weeklyKg} kg`);
  console.log(`   Storage: ${r.storage}`);
  console.log(`   Pickup: ${r.pickupWindow}`);
  console.log(`   Location: ${r.location}`);
});

console.log('\n' + '='.repeat(60));
console.log('✅ ALL TESTS COMPLETE');
console.log('='.repeat(60));
