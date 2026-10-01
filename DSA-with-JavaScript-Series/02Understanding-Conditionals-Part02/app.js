/**
 * Understanding Conditionals | DSA with JavaScript Part 02
 * Complete runnable reference: if-else, slabs, currency greedy check, ternaries, and switch edge cases.
 */

// 1. Voter Eligibility
function checkVoterEligibility(age) {
  if (isNaN(age) || age < 0) return "Please Enter Correct Input!!";
  return age >= 18
    ? "You are Eligible for Vote!"
    : "You are not Eligible for Vote!";
}
console.log("Voter check (20):", checkVoterEligibility(20));

// 2. Shop Discount
function calculateDiscount(amount) {
  let dis = 0;
  if (amount > 0 && amount <= 5000) dis = 0;
  else if (amount > 5000 && amount <= 7000) dis = 5;
  else if (amount > 7000 && amount <= 9000) dis = 10;
  else if (amount > 9000) dis = 20;

  return amount - Math.floor((dis * amount) / 100);
}
console.log("Final bill for ₹8000:", calculateDiscount(8000)); // ₹7200

// 3. Electricity Bill (Slab-based)
function calculateElectricityBill(unit) {
  let bill = 0;
  let remaining = unit;

  if (remaining > 400) {
    bill += (remaining - 400) * 13;
    remaining = 400;
  }
  if (remaining > 200 && remaining <= 400) {
    bill += (remaining - 200) * 8;
    remaining = 200;
  }
  if (remaining > 100 && remaining <= 200) {
    bill += (remaining - 100) * 6;
    remaining = 100;
  }
  bill += remaining * 4;

  return bill;
}
console.log("Electricity Bill for 700 units: ₹", calculateElectricityBill(700)); // ₹6500

// 4. Currency Denomination Counter
function countCurrency(amount) {
  let notes = [500, 200, 100, 50, 20, 10, 5, 2, 1];
  let breakdown = {};

  for (let note of notes) {
    if (amount >= note) {
      breakdown[`${note} Notes`] = Math.floor(amount / note);
      amount %= note;
    }
  }
  return breakdown;
}
console.log("Denomination for ₹1888:", countCurrency(1888));

// 5. Nested Ternary
let marks = 85;
let grade = marks >= 90 ? "A+" : marks >= 80 ? "A" : marks >= 70 ? "B" : "Fail";
console.log("Grade:", grade);

// 6. Switch Float Precision Pitfall
let num = 0.1 + 0.2;
switch (num) {
  case 0.3:
    console.log("Matched 0.3");
    break;
  default:
    console.log("Switch Float Precision Bug: num is", num); // 0.30000000000000004
}
