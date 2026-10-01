# 🚦 Understanding Conditionals | DSA with JavaScript Part 02

Master decision-making structures in JavaScript: `if-else` branching, cumulative slab calculations, ternary operators, and `switch` statements with edge cases.

---

## 📌 Core Concepts Overview

Conditional statements control code execution based on boolean conditions (`true` or `false`).

- **`if / else if / else`:** Best for range checks (`x > 10 && x <= 20`) and complex boolean logic.
- **Ternary Operator (`? :`):** Compact shorthand for inline value assignments based on a binary condition.
- **`switch` Statement:** Best for testing a single variable against multiple discrete, exact values using strict equality (`===`).

---

## 1. Real-World Decision Problems

### 🔹 Problem 1: Valid Voter (Input Validation & Branching)

Check whether the user entered a valid number and determine if they are eligible to vote ($\ge 18$).

```javascript
let age = Number(prompt("Enter Your Age!"));

if (isNaN(age) || age < 0) {
  console.log("Please Enter Correct Input!!");
} else if (age >= 18) {
  console.log("You are Eligible for Vote!");
} else {
  console.log("You are not Eligible for Vote!");
}
```

---

### 🔹 Problem 2: Shop Discount (Range Checking)

Calculate the final payable amount based on tiered spending thresholds:

- Up to ₹5,000: **0% discount**
- ₹5,001 to ₹7,000: **5% discount**
- ₹7,001 to ₹9,000: **10% discount**
- Above ₹9,000: **20% discount**

```javascript
let amount = Number(prompt("Enter Your Amount!"));
let dis = 0;

if (amount > 0 && amount <= 5000) {
  dis = 0;
} else if (amount > 5000 && amount <= 7000) {
  dis = 5;
} else if (amount > 7000 && amount <= 9000) {
  dis = 10;
} else if (amount > 9000) {
  dis = 20;
}

let discountAmount = Math.floor((dis * amount) / 100);
let finalAmount = amount - discountAmount;
console.log(`Final Payable Amount: ₹${finalAmount}`);
```

---

### 🔹 Problem 3: Bijli Bill (Slab-Based Reverse Waterfall)

Electricity boards charge by slabs, not a flat multiplier. For example:

- **First 100 units:** ₹4 / unit
- **101 to 200 units:** ₹6 / unit
- **201 to 400 units:** ₹8 / unit
- **Above 400 units:** ₹13 / unit

Solving from the highest bracket downwards handles each incremental slab cleanly:

```javascript
let unit = Number(prompt("Enter Your Electricity Bill Unit!")); // Example: 700 units
let bill = 0;

if (unit > 400) {
  bill += (unit - 400) * 13; // (700 - 400) * 13 = 3900
  unit = 400;
}
if (unit > 200 && unit <= 400) {
  bill += (unit - 200) * 8; // (400 - 200) * 8 = 1600
  unit = 200;
}
if (unit > 100 && unit <= 200) {
  bill += (unit - 100) * 6; // (200 - 100) * 6 = 600
  unit = 100;
}
bill += unit * 4; // 100 * 4 = 400

console.log(`Total Electricity Bill: ₹${bill}`); // ₹6500
```

---

### 🔹 Problem 4: INR Currency Denomination (Greedy Breakdown)

Break an amount into the minimum number of currency notes using division (`Math.floor`) and remainder (`%`):

```javascript
let amount = Number(prompt("Enter Your Amount!!")); // Example: 1888

if (amount >= 500) {
  console.log("500 Notes: " + Math.floor(amount / 500));
  amount = amount % 500;
}
if (amount >= 200) {
  console.log("200 Notes: " + Math.floor(amount / 200));
  amount = amount % 200;
}
if (amount >= 100) {
  console.log("100 Notes: " + Math.floor(amount / 100));
  amount = amount % 100;
}
if (amount >= 50) {
  console.log("50 Notes: " + Math.floor(amount / 50));
  amount = amount % 50;
}
if (amount >= 20) {
  console.log("20 Notes: " + Math.floor(amount / 20));
  amount = amount % 20;
}
if (amount >= 10) {
  console.log("10 Notes: " + Math.floor(amount / 10));
  amount = amount % 10;
}
if (amount >= 5) {
  console.log("5 Notes: " + Math.floor(amount / 5));
  amount = amount % 5;
}
if (amount >= 2) {
  console.log("2 Notes: " + Math.floor(amount / 2));
  amount = amount % 2;
}
if (amount === 1) {
  console.log("1 Notes: 1");
}
```

---

## 2. Ternary Operator (`? :`)

The ternary operator takes three operands: `condition ? expressionIfTrue : expressionIfFalse`. It returns a value directly.

### Basic Ternary

```javascript
let score = 75;
let result = score >= 40 ? "Pass" : "Fail";
console.log(result); // "Pass"
```

### Nested Ternary Operator

Chain ternary expressions to handle multiple tiers without writing full `if-else` blocks:

```javascript
let marks = 85;

let grade =
  marks >= 90
    ? "A+"
    : marks >= 80
      ? "A"
      : marks >= 70
        ? "B"
        : marks >= 60
          ? "C"
          : "Fail";

console.log(`Grade: ${grade}`); // "A"
```

> **Clean Code Tip:** Use nested ternaries only when assigning values across simple scalar conditions. If side effects or multi-line statements are needed, prefer `if-else`.

---

## 3. The `switch` Statement

The `switch` statement evaluates an expression and matches it against multiple `case` clauses using **strict equality (`===`)**.

### Multi-Case Grouping (One Action for Multiple Cases)

Omit the `break` statement across adjacent cases to share logic across multiple values:

```javascript
let day = "Saturday";

switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log("Weekday: Time to grind DSA!");
    break;

  case "Saturday":
  case "Sunday":
    console.log("Weekend: Relax and review code!");
    break;

  default:
    console.log("Invalid day entered.");
}
```

---

## 4. Why `switch` Fails on Floating-Point Values (Precision Issue)

JavaScript numbers use IEEE 754 double-precision floating-point format. Decimal fractions cannot always be represented exactly in binary, leading to minute rounding artifacts:

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004 (Not 0.3!)
```

Because `switch` matches cases with **strict equality (`===`)**, float mismatches will silently trigger the `default` case:

```javascript
let total = 0.1 + 0.2; // 0.30000000000000004

switch (total) {
  case 0.3:
    console.log("Matched 0.3!");
    break;
  default:
    console.log("Failed to match! Value was:", total);
}
// Output: "Failed to match! Value was: 0.30000000000000004"
```

### The Correct Fix for Floats

Do not use `switch` for raw float comparisons. Instead, use an epsilon check ($\epsilon = 10^{-5}$ or `Number.EPSILON`) inside an `if` block:

```javascript
let val1 = 0.1 + 0.2;
let target = 0.3;

if (Math.abs(val1 - target) < Number.EPSILON) {
  console.log("Matched accurately with epsilon tolerance!");
}
```
