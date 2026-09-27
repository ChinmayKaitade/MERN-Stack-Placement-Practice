/**
 * Master the Basics | DSA with JavaScript | Part 01
 * Complete runnable reference: Variables, Hoisting, Pre/Post Analogy, Puzzles, and Math
 */

// ==========================================
// 1. FUNDAMENTALS & TYPE COERCION
// ==========================================
console.log("--- 1. Fundamentals & Coercion ---");

// Que.1: Sum of two integers
function sumOfTwoIntegers(a, b) {
  return a + b;
}
console.log("Que.1 (Sum):", sumOfTwoIntegers(10, 20)); // 30

// String and number relations (Coercion)
console.log("Number + String:", 10 + "20"); // "1020" (Glued)
console.log("String - Number:", "20" - 5); // 15     (Math)
console.log("String * Number:", "10" * "2"); // 20     (Math)

// Que.2: Sum and message
function sumAndMessage(num1, num2) {
  let total = num1 + num2;
  console.log(`The sum of ${num1} and ${num2} is: ${total}`);
}
sumAndMessage(15, 25);

// Que.3: Accept and print the answer (Explicit parsing)
function acceptAndPrint(input1, input2) {
  let n1 = Number(input1);
  let n2 = Number(input2);
  let result = n1 + n2;
  console.log("Que.3 (Parsed sum):", result);
}
acceptAndPrint("40", "60");

// ==========================================
// 2. SWAPPING TWO VARIABLES (3 METHODS)
// ==========================================
console.log("\n--- 2. Swapping Methods ---");

// Method 1: Using Temporary Variable
let x1 = 5,
  y1 = 10;
let temp = x1;
x1 = y1;
y1 = temp;
console.log("Method 1 (Temp variable):", { x: x1, y: y1 });

// Method 2: Arithmetic (+ and -) without extra memory
let x2 = 5,
  y2 = 10;
x2 = x2 + y2; // 15
y2 = x2 - y2; // 5
x2 = x2 - y2; // 10
console.log("Method 2 (Arithmetic):", { x: x2, y: y2 });

// Method 3: ES6 Destructuring (Cleanest)
let x3 = 5,
  y3 = 10;
[x3, y3] = [y3, x3];
console.log("Method 3 (Destructuring):", { x: x3, y: y3 });

// Bonus Method 4: Bitwise XOR
let x4 = 5,
  y4 = 10;
x4 = x4 ^ y4;
y4 = x4 ^ y4;
x4 = x4 ^ y4;
console.log("Method 4 (Bitwise XOR):", { x: x4, y: y4 });

// ==========================================
// 3. DHABA VS DOMINO'S: PRE & POST DEMO
// ==========================================
console.log("\n--- 3. Pre & Post Demos ---");

// Post-increment (Dhaba): Pehle khao (use), baad mein bill (change)
let dhabaInc = 10;
console.log("Dhaba post++ use:", dhabaInc++); // 10
console.log("Dhaba post++ after:", dhabaInc); // 11

// Pre-increment (Domino's): Pehle bill (change), phir pizza (use)
let dominosInc = 10;
console.log("Domino's ++pre change & use:", ++dominosInc); // 11
console.log("Domino's ++pre after:", dominosInc); // 11

// Post-decrement (Dhaba): Pehle use, baad mein minus
let dhabaDec = 10;
console.log("Dhaba post-- use:", dhabaDec--); // 10
console.log("Dhaba post-- after:", dhabaDec); // 9

// Pre-decrement (Domino's): Pehle minus, phir use
let dominosDec = 10;
console.log("Domino's --pre change & use:", --dominosDec); // 9
console.log("Domino's --pre after:", dominosDec); // 9

// ==========================================
// 4. OPERATOR TRICKY QUESTIONS
// ==========================================
console.log("\n--- 4. Operator Puzzles ---");

// Puzzle 1
let p1_i = 11;
p1_i = p1_i++ + ++p1_i; // 11 + 13
console.log("Puzzle 1 result:", p1_i); // 24

// Puzzle 2
let p2_a = 11,
  p2_b = 22;
let p2_c = p2_a + p2_b + p2_a++ + p2_b++ + ++p2_a + ++p2_b;
console.log(`Puzzle 2 -> a: ${p2_a}, b: ${p2_b}, c: ${p2_c}`); // a=13, b=24, c=103

// Puzzle 3
let p3_b = true;
p3_b++; // true converts to 1, then increments to 2
console.log("Puzzle 3 result:", p3_b); // 2

// ==========================================
// 5. MATH FUNCTIONS & REAL-WORLD PROBLEMS
// ==========================================
console.log("\n--- 5. Math Problems ---");

// Que.5: Calculate area and perimeter of rectangle
function rectangleMetrics(length, breadth) {
  let area = length * breadth;
  let perimeter = 2 * (length + breadth);
  return { area, perimeter };
}
console.log("Que.5 (Rectangle l=10, b=5):", rectangleMetrics(10, 5));

// Que.6: Generate random OTP
function generateOTP(digits = 4) {
  let min = Math.pow(10, digits - 1);
  let max = Math.pow(10, digits) - 1;
  return Math.floor(min + Math.random() * (max - min + 1));
}
console.log("Que.6 (4-digit OTP):", generateOTP(4));
console.log("Que.6 (6-digit OTP):", generateOTP(6));

// Que.7: Area of triangle by Heron's formula: sqrt(s * (s - a) * (s - b) * (s - c))
function triangleAreaHeron(a, b, c) {
  let s = (a + b + c) / 2;
  let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  return Number(area.toFixed(2));
}
console.log("Que.7 (Triangle a=7, b=8, c=9):", triangleAreaHeron(7, 8, 9));

// Que.8: Circumference of circle: 2 * pi * r
function circumferenceOfCircle(radius) {
  let circumference = 2 * Math.PI * radius;
  return Number(circumference.toFixed(2));
}
console.log("Que.8 (Circle r=7):", circumferenceOfCircle(7));
