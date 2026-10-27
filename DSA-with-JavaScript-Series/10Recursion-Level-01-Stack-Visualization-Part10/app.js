/**
 * Recursion: Level 1 Stack Visualization | DSA with JavaScript Part 10
 * Complete runnable reference: Call Stack simulation, Traversal orders, Factorial, Sum, and Fibonacci variants.
 */

// 1. Function Call Chain (Call Stack Simulation)
function greet() {
  console.log("1. Good Morning Pineapple");
  enjoy();
}
function enjoy() {
  console.log("2. Enjoy ho raha hai guys....");
  temp();
}
function temp() {
  console.log("3. Kuch kar rahe ho...");
}

console.log("=== Call Stack Chain Execution ===");
greet();

// 2. Print N to 1 (Pre-order / Downward execution)
console.log("\n=== Print N to 1 ===");
function printNToOne(n) {
  if (n === 0) return;
  process.stdout.write(n + " ");
  printNToOne(n - 1);
}
printNToOne(5); // 5 4 3 2 1
console.log();

// 3. Print 1 to N (Post-order / Unwinding execution)
console.log("\n=== Print 1 to N ===");
function printOneToN(n) {
  if (n === 0) return;
  printOneToN(n - 1);
  process.stdout.write(n + " ");
}
printOneToN(5); // 1 2 3 4 5
console.log();

// 4. Sum of first N numbers: O(N) Time, O(N) Stack Space
console.log("\n=== Sum of N Numbers ===");
function sum(n) {
  if (n === 1) return 1;
  return n + sum(n - 1);
}
console.log("Sum(5):", sum(5)); // 15

// 5. Factorial of N: O(N) Time, O(N) Stack Space
console.log("\n=== Factorial ===");
function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
console.log("Fact(5):", fact(5)); // 120

// 6. Fibonacci: Iterative Series Printing: O(N) Time, O(1) Space
console.log("\n=== Fibonacci: Iterative Series ===");
function printFiboIterative(n) {
  if (n <= 0) return;
  if (n === 1) {
    console.log(0);
    return;
  }
  let first = 0,
    second = 1;
  process.stdout.write(first + " " + second + " ");
  for (let i = 1; i <= n - 2; i++) {
    let third = first + second;
    first = second;
    second = third;
    process.stdout.write(third + " ");
  }
  console.log();
}
printFiboIterative(10); // 0 1 1 2 3 5 8 13 21 34

// 7. Fibonacci: Tail-Recursive Series Printing: O(N) Time, O(N) Stack Space
console.log("\n=== Fibonacci: Recursive Series ===");
function fiboNTerms(n, first, second) {
  if (n === 0) return;
  let third = first + second;
  process.stdout.write(third + " ");
  fiboNTerms(n - 1, second, third);
}
process.stdout.write(0 + " " + 1 + " ");
fiboNTerms(8, 0, 1);
console.log();

// 8. Fibonacci: Nth Term Tree Recursion: O(2^N) Time, O(N) Stack Space
console.log("\n=== Fibonacci: Nth Term ===");
function fibo(n) {
  if (n === 0 || n === 1) return n;
  return fibo(n - 1) + fibo(n - 2);
}
console.log("7th Fibonacci term:", fibo(7)); // 13
