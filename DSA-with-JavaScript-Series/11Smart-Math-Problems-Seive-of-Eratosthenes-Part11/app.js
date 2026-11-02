/**
 * Smart Math Problems | DSA with JavaScript Part 11
 * Runnable implementations: Subtraction vs Modulo GCD, Factor Sorting, Sieve of Eratosthenes, and Pow(x, n).
 */

// ==========================================
// 1. GCD / HCF IMPLEMENTATIONS
// ==========================================
console.log("=== 1. GCD / HCF ===");

// Modulo-based Euclidean algorithm
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}
console.log("GCD(32, 20):", gcd(32, 20)); // 4
console.log("GCD(16, 14):", gcd(16, 14)); // 2

// Iterative Euclidean algorithm: O(log(min(a, b))) time, O(1) space
function gcdIterative(a, b) {
  while (b !== 0) {
    let rem = a % b;
    a = b;
    b = rem;
  }
  return a;
}
console.log("Iterative GCD(105, 30):", gcdIterative(105, 30)); // 15

// ==========================================
// 2. FACTORS OF N IN O(SQRT(N))
// ==========================================
console.log("\n=== 2. All Factors in Ascending Order ===");

function printFactorsSorted(n) {
  let factors = [];

  // Pass 1: Divisors <= sqrt(n)
  for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
    if (n % i === 0) {
      factors.push(i);
    }
  }

  // Pass 2: Divisors > sqrt(n) (reverse order)
  for (let i = Math.floor(Math.sqrt(n)); i >= 1; i--) {
    if (n % i === 0) {
      let complement = Math.floor(n / i);
      if (complement !== i) {
        factors.push(complement);
      }
    }
  }

  return factors;
}
console.log("Factors of 30:", printFactorsSorted(30)); // [1, 2, 3, 5, 6, 10, 15, 30]
console.log("Factors of 36:", printFactorsSorted(36)); // [1, 2, 3, 4, 6, 9, 12, 18, 36]

// ==========================================
// 3. SIEVE OF ERATOSTHENES
// ==========================================
console.log("\n=== 3. Sieve of Eratosthenes ===");

function getPrimesUpToN(n) {
  let isPrime = new Array(n + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  let primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}
console.log("Primes up to 50:\n", getPrimesUpToN(50));

// ==========================================
// 4. FAST POWER: POW(X, N)
// ==========================================
console.log("\n=== 4. Binary Exponentiation Pow(x, n) ===");

function myPow(x, n) {
  function helper(base, exp) {
    if (exp === 0) return 1.0;
    let half = helper(base, Math.floor(exp / 2));
    if (exp % 2 === 0) {
      return half * half;
    } else {
      return half * half * base;
    }
  }

  let absN = Math.abs(n);
  let res = helper(x, absN);
  return n < 0 ? 1 / res : res;
}

console.log("2^10:", myPow(2, 10)); // 1024
console.log("2^-3:", myPow(2, -3)); // 0.125
console.log("5^0:", myPow(5, 0)); // 1
console.log("(-2)^3:", myPow(-2, 3)); // -8
