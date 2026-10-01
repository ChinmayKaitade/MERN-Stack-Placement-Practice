/**
 * Master Loops & Iterations | DSA with JavaScript Part 03
 * Fully commented runnable reference file for for, while, and do-while algorithms.
 */

// ==========================================
// 1. FOR LOOP EXAMPLES
// ==========================================

// 1. Sum of first N natural numbers
function sumOfNatural(n) {
  if (n <= 0) return 0; // Base guard
  let sum = 0; // Accumulator

  for (let i = 1; i <= n; i++) {
    sum += i; // Add current integer i to sum
  }
  return sum;
}
console.log("Sum of first 10 numbers:", sumOfNatural(10)); // 55

// 2. Factorial of N
function factorial(n) {
  let fact = 1; // Multiplicative accumulator

  for (let i = 1; i <= n; i++) {
    fact *= i; // Multiply running total by i
  }
  return fact;
}
console.log("Factorial of 5:", factorial(5)); // 120

// 3. Factors of a number (Optimized O(N/2))
function printFactors(n) {
  let factors = [];

  // Check up to half of n
  for (let i = 1; i <= Math.floor(n / 2); i++) {
    if (n % i === 0) factors.push(i);
  }
  factors.push(n); // Append the number itself
  return factors;
}
console.log("Factors of 28:", printFactors(28)); // [1, 2, 4, 7, 14, 28]

// 4. Prime Check (Optimized O(sqrt(N)))
function isPrime(n) {
  if (n <= 1) return false; // 0, 1 and negatives cannot be prime
  if (n === 2) return true; // 2 is prime
  if (n % 2 === 0) return false; // All other evens are composite

  // Step by 2 (i += 2) to test only odd divisors up to sqrt(n)
  for (let i = 3; i <= Math.floor(Math.sqrt(n)); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
console.log("Is 29 Prime?:", isPrime(29)); // true
console.log("Is 35 Prime?:", isPrime(35)); // false

// ==========================================
// 2. WHILE LOOP (DIGIT EXTRACTION)
// ==========================================

// 5. Sum of Digits
function sumOfDigits(n) {
  let sum = 0;
  while (n > 0) {
    sum += n % 10; // Add the last digit
    n = Math.floor(n / 10); // Remove the last digit
  }
  return sum;
}
console.log("Sum of digits (9876):", sumOfDigits(9876)); // 30

// 6. Reverse a Number
function reverseNumber(n) {
  let rev = 0;
  while (n > 0) {
    let rem = n % 10; // Extract last digit
    rev = rev * 10 + rem; // Shift reversed number left by 10 and add rem
    n = Math.floor(n / 10); // Truncate last digit
  }
  return rev;
}
console.log("Reversed (12345):", reverseNumber(12345)); // 54321

// 7. Strong Number Check
function isStrongNumber(n) {
  let copy = n; // Keep original for final equality check
  let sum = 0;

  while (n > 0) {
    let rem = n % 10; // Extract digit

    // Compute factorial of this digit
    let fact = 1;
    for (let i = 1; i <= rem; i++) {
      fact *= i;
    }

    sum += fact;
    n = Math.floor(n / 10);
  }

  return copy === sum;
}
console.log("Is 145 Strong?:", isStrongNumber(145)); // true
console.log("Is 123 Strong?:", isStrongNumber(123)); // false

// ==========================================
// 3. DO-WHILE & CALCULATOR UTILITY
// ==========================================

// 8. Sasta Calculator Function
function sastaCalculator(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Cannot divide by zero";
    default:
      return "Invalid operator";
  }
}
console.log("Calculator 10 * 5:", sastaCalculator(10, 5, "*")); // 50
