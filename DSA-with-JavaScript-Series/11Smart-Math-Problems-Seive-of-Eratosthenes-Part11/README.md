# 🧮 Smart Math Problems | DSA with JavaScript Part 11

Optimize mathematical algorithms for technical interviews: Euclidean GCD/HCF, Fibonacci worst-case steps, factor extraction in $O(\sqrt{N})$, prime generation using Sieve of Eratosthenes, and Binary Exponentiation.

---

## 📌 Summary of Core Algorithms

| Problem                | Brute Force                                             | Optimized Approach                           | Optimized Time        | Auxiliary Space                                |
| ---------------------- | ------------------------------------------------------- | -------------------------------------------- | --------------------- | ---------------------------------------------- |
| **GCD / HCF**          | Loop from $\min(a, b)$ down to $1$ ($O(\min(a,b))$)     | Euclidean Algorithm using modulo (`a % b`)   | $O(\log(\min(a, b)))$ | $O(\log(\min(a, b)))$ stack / $O(1)$ iterative |
| **All Factors of $N$** | Iterate $1 \to N$ ($O(N)$)                              | Check divisor pairs up to $\sqrt{N}$         | $O(\sqrt{N})$         | $O(1)$                                         |
| **Primes up to $N$**   | Individual prime check for all numbers ($O(N\sqrt{N})$) | **Sieve of Eratosthenes**                    | $O(N \log(\log N))$   | $O(N)$                                         |
| **$\text{Pow}(x, n)$** | Repeated multiplication ($O(N)$)                        | **Binary Exponentiation** (Divide & Conquer) | $O(\log N)$           | $O(\log N)$ stack / $O(1)$ iterative           |

---

## 1. Greatest Common Divisor (GCD / HCF)

The **Greatest Common Divisor (GCD)** or **Highest Common Factor (HCF)** of two integers is the largest positive integer that divides both without a remainder.

### 🔹 Method 1: Subtraction-Based Euclidean Algorithm

Euclid proved that $\gcd(a, b) = \gcd(a - b, b)$ for $a > b$.

```javascript
// Iterative Subtraction
function gcdSubtract(a, b) {
  while (a !== b) {
    if (a > b) a = a - b;
    else b = b - a;
  }
  return a;
}

console.log(gcdSubtract(32, 20)); // 4
```

> ⚠️ **Limitation:** When one number is vastly larger than the other (e.g., $a = 10^9, b = 1$), subtraction reduces to repeated decrements by $1$, resulting in $O(\max(a, b))$ worst-case time.

---

### 🔹 Method 2: Standard Modulo-Based Euclidean Algorithm

Instead of subtracting $b$ repeatedly from $a$, compute the remainder directly using modulo: $\gcd(a, b) = \gcd(b, a \pmod b)$.

```javascript
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

console.log(gcd(16, 14)); // 2
```

- **Time Complexity:** $O(\log(\min(a, b)))$
- **Space Complexity:** $O(\log(\min(a, b)))$ recursive call stack frames

---

### 🔹 Lamé's Theorem & The Fibonacci Worst-Case

Gabriel Lamé proved that the Euclidean algorithm takes the **maximum number of steps** when applied to two consecutive Fibonacci numbers:

$$\gcd(F_{k+1}, F_k)$$

Look at the division steps for consecutive Fibonacci numbers $233$ and $144$:

```
233 % 144 = 89
144 % 89  = 55
89  % 55  = 34
55  % 34  = 21
34  % 21  = 13
21  % 13  = 8
13  % 8   = 5
8   % 5   = 3
5   % 3   = 2
3   % 2   = 1
2   % 1   = 0  --> GCD = 1 (11 steps)

```

Every step leaves a remainder that is the preceding Fibonacci number. This proves that the number of steps never exceeds $5 \times (\text{number of digits in } \min(a, b))$.

---

## 2. Optimized Divisor Extraction ($O(\sqrt{N})$)

Every divisor $i$ of $N$ has a complementary pair $\frac{N}{i}$ such that:

$$i \times \frac{N}{i} = N$$

If $i > \sqrt{N}$, then $\frac{N}{i} < \sqrt{N}$, meaning its partner divisor has already been visited. Thus, only check up to $\lfloor \sqrt{N} \rfloor$.

### 🔹 Print All Factors (Unsorted Pairs)

```javascript
let n = 100;
for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
  if (n % i === 0) {
    process.stdout.write(i + " ");
    // Avoid printing duplicate for perfect squares (e.g., 10 * 10 = 100)
    if (Math.floor(n / i) !== i) {
      process.stdout.write(Math.floor(n / i) + " ");
    }
  }
}
console.log();
// Output: 1 100 2 50 4 25 5 20 10
```

---

### 🔹 Print All Factors in Strictly Ascending Order ($O(\sqrt{N})$ Time, $O(1)$ Space)

Run two passes without storing elements in an array:

1. **Pass 1:** From $1 \to \lfloor \sqrt{N} \rfloor$, print every divisor $i$.
2. **Pass 2:** From $\lfloor \sqrt{N} \rfloor$ down to $1$, print the complementary divisor $\frac{N}{i}$ (skipping perfect squares).

```javascript
let n = 30;

// First half: divisors <= sqrt(n)
for (let i = 1; i <= Math.floor(Math.sqrt(n)); i++) {
  if (n % i === 0) {
    process.stdout.write(i + " ");
  }
}

// Second half: complementary divisors > sqrt(n) in reverse
for (let i = Math.floor(Math.sqrt(n)); i >= 1; i--) {
  if (n % i === 0) {
    if (Math.floor(n / i) !== i) {
      process.stdout.write(Math.floor(n / i) + " ");
    }
  }
}
console.log();
// Output for 30: 1 2 3 5 6 10 15 30
```

---

## 3. Sieve of Eratosthenes (Prime Generation)

To find all prime numbers up to $N$, maintain a boolean array `isPrime` initialized to `true`. Mark off multiples of each discovered prime.

### ⚡ Critical Optimizations

1. **Outer loop limit:** Run the outer loop only up to $\sqrt{N}$. Any composite number $\le N$ must have a prime factor $\le \sqrt{N}$.
2. **Inner loop start (`j = i * i`):** Multiples of $i$ smaller than $i \times i$ (such as $2i, 3i, \dots, (i - 1)i$) have already been marked false by earlier primes ($2, 3, \dots$).

```javascript
function sieveOfEratosthenes(n) {
  let isPrime = new Array(n + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (isPrime[i]) {
      // Start marking composite numbers from i * i
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  // Print all primes
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) {
      process.stdout.write(i + " ");
    }
  }
  console.log();
}

sieveOfEratosthenes(100);
// 2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97
```

- **Time Complexity:** $O(N \log(\log N))$ (nearly linear)
- **Space Complexity:** $O(N)$

---

## 4. Binary Exponentiation: Fast Power (`Pow(x, n)`) — LeetCode 50

Computing $x^n$ iteratively takes $O(n)$ time, which triggers TLE when $n = 2^{31} - 1$.

Binary exponentiation applies Divide & Conquer to solve in $O(\log n)$:

$$x^n = \begin{cases} (x^2)^{n/2} & \text{if } n \text{ is even} \\ x \times (x^2)^{(n-1)/2} & \text{if } n \text{ is odd} \end{cases}$$

### Edge Cases

- $n = 0 \implies 1$
- $n < 0 \implies \frac{1}{x^{-n}}$

```javascript
function myPow(x, n) {
  function powerHelper(base, exp) {
    if (exp === 0) return 1.0;

    let half = powerHelper(base, Math.floor(exp / 2));

    if (exp % 2 === 0) {
      return half * half;
    } else {
      return half * half * base;
    }
  }

  let absN = Math.abs(n);
  let result = powerHelper(x, absN);

  return n < 0 ? 1 / result : result;
}

console.log(myPow(2.0, 10)); // 1024
console.log(myPow(2.0, -2)); // 0.25
```

- **Time Complexity:** $O(\log \vert{}n\vert{})$
- **Space Complexity:** $O(\log \vert{}n\vert{})$ call stack memory
