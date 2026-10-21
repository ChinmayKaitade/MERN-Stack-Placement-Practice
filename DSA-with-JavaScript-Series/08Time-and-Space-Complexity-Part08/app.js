/**
 * Time and Space Complexity | DSA with JavaScript Part 08
 * Benchmarking runtime characteristics across different asymptotic orders.
 */

// 1. O(1) Constant Time
function getFirstElement(arr) {
  return arr[0]; // Exactly 1 operation regardless of arr.length
}

// 2. O(log N) Binary Search Simulation
function logarithmicCount(n) {
  let ops = 0;
  let val = n;
  while (val > 1) {
    val = Math.floor(val / 2);
    ops++;
  }
  return ops;
}

// 3. O(N) Linear Time Loop
function linearScan(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// 4. O(N^2) Quadratic Time Dependent Loop
function quadraticTriangle(n) {
  let ops = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      ops++;
    }
  }
  return ops;
}

// 5. Demonstrating Growth Rates
console.log("=== Growth Demonstrations ===");
const testValues = [16, 64, 256, 1024];

console.log("N \t O(log2 N) \t O(N) \t O(N^2 Triangle)");
for (let n of testValues) {
  const logOps = logarithmicCount(n);
  const linOps = n;
  const quadOps = quadraticTriangle(n);
  console.log(`${n} \t ${logOps} \t\t ${linOps} \t ${quadOps}`);
}

// 6. Empirical TLE Benchmark
function measureExecutionTime(label, fn) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${label} executed in ${(end - start).toFixed(4)} ms`);
}

console.log("\n=== Benchmarking Operations against 10^8 Barrier ===");
measureExecutionTime("10^7 Operations (Linear)", () => {
  let count = 0;
  for (let i = 0; i < 1e7; i++) {
    count++;
  }
});

measureExecutionTime("10^8 Operations (Boundary)", () => {
  let count = 0;
  for (let i = 0; i < 1e8; i++) {
    count++;
  }
});
