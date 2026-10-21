# ⏱️ Time and Space Complexity | DSA with JavaScript Part 08

Complexity analysis evaluates how an algorithm's execution time and memory consumption scale as the input size ($N$) grows arbitrarily large. It provides a mathematical framework to compare algorithms independently of hardware, operating systems, or CPU clock speeds.

---

## 1. What is Complexity Analysis?

When benchmarking code, wall-clock time (`performance.now()` or `Date.now()`) fails as a universal metric because it depends heavily on:

- Machine hardware (CPU generation, RAM speed, architecture)
- Concurrent OS background processes
- JavaScript engine optimizations (V8 JIT compilation, Garbage Collection cycles)

Complexity analysis abstracts away physical execution time by **counting the total number of fundamental operations executed** relative to input size $N$.

---

## 2. Asymptotic Notations: Mathematical Representation

Asymptotic notation characterizes an algorithm's limiting behavior when $N \to \infty$.

| Notation                 | Formal Name            | Meaning                                                                                   | Use Case                        |
| ------------------------ | ---------------------- | ----------------------------------------------------------------------------------------- | ------------------------------- |
| **$O$ (Big-O)**          | Asymptotic Upper Bound | Maximum operations (Worst-case limit: $f(N) \le c \cdot g(N)$)                            | **Universal industry standard** |
| **$\Omega$ (Big-Omega)** | Asymptotic Lower Bound | Minimum operations (Best-case limit: $f(N) \ge c \cdot g(N)$)                             | Theoretical minimum runtimes    |
| **$\Theta$ (Big-Theta)** | Asymptotic Tight Bound | Exact growth rate (Bounded above and below: $c_1 \cdot g(N) \le f(N) \le c_2 \cdot g(N)$) | Precise characterization        |

> In technical interviews and algorithmic challenges, **Big-O** is universally used to describe worst-case guarantees.

---

## 3. Asymptotic Growth Rates & Hierarchy

From most optimal to least scalable:

$$O(1) < O(\log N) < O(\sqrt{N}) < O(N) < O(N \log N) < O(N^2) < O(N^3) < O(2^N) < O(N!)$$

```
Operations (y-axis)
  ▲
  │                                     /  O(N!)
  │                                    /
  │                                   │   O(2^N)
  │                                   │
  │                                  /   O(N^2)
  │                                 /
  │                                /    O(N log N)
  │                              /
  │                             /      O(N)
  │                           /
  │───────────────────────────       O(log N)
  │═══════════════════════════       O(1)
  └────────────────────────────────────────► Input Size N (x-axis)

```

### Growth Rate Comparison Table

| Complexity        | Common Name  | $N = 10$              | $N = 100$                 | $N = 10^5$             | Typical Examples                                     |
| ----------------- | ------------ | --------------------- | ------------------------- | ---------------------- | ---------------------------------------------------- |
| **$O(1)$**        | Constant     | 1 op                  | 1 op                      | 1 op                   | Hash map lookup, array index read, basic math        |
| **$O(\log N)$**   | Logarithmic  | $\approx 3$ ops       | $\approx 7$ ops           | $\approx 17$ ops       | Binary search, GCD Euclidean algorithm               |
| **$O(N)$**        | Linear       | 10 ops                | 100 ops                   | $10^5$ ops             | Single loop, linear search, two-pointer pass         |
| **$O(N \log N)$** | Linearithmic | 33 ops                | 664 ops                   | $1.7 \times 10^6$ ops  | Merge sort, Quick sort (average), built-in `.sort()` |
| **$O(N^2)$**      | Quadratic    | 100 ops               | $10^4$ ops                | $10^{10}$ ops (TLE 🛑) | Nested loops, Bubble sort, Matrix multiplication     |
| **$O(2^N)$**      | Exponential  | 1,024 ops             | $1.26 \times 10^{30}$ ops | Uncomputable           | Generating subsets, recursive Fibonacci              |
| **$O(N!)$**       | Factorial    | $3.6 \times 10^6$ ops | Uncomputable              | Uncomputable           | Generating all permutations, Traveling Salesperson   |

---

## 4. Generating the Complexity Equation

To derive the Big-O expression from raw code, use three formal rules:

### Rule 1: Sum Rule (Sequential Steps)

If step A takes $T_1(N)$ and sequential step B takes $T_2(N)$, total time is $T_1(N) + T_2(N)$.

```javascript
function sequentialSteps(arr) {
  // Step 1: O(N)
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }

  // Step 2: O(N^2)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}
// Equation: T(N) = N + N^2 --> O(N^2)
```

### Rule 2: Product Rule (Nested Steps)

If an outer loop runs $c_1 \cdot N$ times and an inner loop runs $c_2 \cdot M$ times for every outer cycle, multiply the terms: $O(N \times M)$.

```javascript
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    // Executes N * M times
  }
}
```

### Rule 3: Drop Constants & Non-Dominant Terms

As $N \to \infty$, constants and lower-order terms become negligible:

- $T(N) = 5N^3 + 24N^2 + 100N + 5000 \implies O(N^3)$
- $T(N) = 10^6 \implies O(1)$
- $T(N) = 3N + 2 \log N \implies O(N)$

---

## 5. TLE (Time Limit Exceeded) & The $10^8$ Operations Rule

Modern judge systems (LeetCode, HackerRank, Codeforces) allocate roughly **1.0 to 2.0 seconds** per test case.

> ⚡ **The Golden Rule:** A CPU executes approximately **$10^8$ basic operations per second**.
> If an algorithm executes $> 10^8$ operations within the given constraints, it triggers a **Time Limit Exceeded (TLE)** error.

### Constraint to Target Complexity Cheatsheet

| Input Constraint ($N$)    | Maximum Allowed Time Complexity | Expected Strategy / Pattern                    |
| ------------------------- | ------------------------------- | ---------------------------------------------- |
| $N \le 10$ to $12$        | $O(N!)$ or $O(N^2 \cdot 2^N)$   | Pure Recursion, Permutations                   |
| $N \le 20$ to $25$        | $O(2^N)$                        | Backtracking, Bitmask DP, Subsets              |
| $N \le 100$               | $O(N^4)$ or $O(N^3)$            | Floyd-Warshall, 3-nested loops, Matrix DP      |
| $N \le 1,000$             | $O(N^2)$                        | Dynamic Programming, Nested iterations         |
| $N \le 10^5$ to $10^6$    | **$O(N \log N)$ or $O(N)$**     | Two Pointers, Sliding Window, Hashing, Sorting |
| $N \le 10^9$ to $10^{18}$ | **$O(\log N)$ or $O(1)$**       | Binary Search, Math formulas, Bitwise tricks   |

---

## 6. Space Complexity & Memory Allocation

Space complexity calculates the total memory required relative to $N$.

$$\text{Total Space} = \text{Auxiliary Space (Extra memory allocated)} + \text{Input Space}$$

In algorithmic interviews, focus is primarily placed on **Auxiliary Space**.

```
Memory Types in JavaScript:
1. Heap Allocation: Dynamic objects, arrays, hash sets (`new Array(N)`, `{}`)
2. Call Stack Frame: Memory reserved by recursive function invocations

```

### Stack Memory Example (Recursion Depth)

Every recursive call pushes a new execution context onto the call stack. A recursion depth of $N$ consumes $O(N)$ auxiliary stack space:

```javascript
function recurse(n) {
  if (n <= 0) return;
  recurse(n - 1); // Pushes N stack frames before resolving
}
// Space Complexity: O(N) auxiliary stack memory
```

---

## 7. Practice Problems & Analysis

### Question 1: Dependent Nested Loop

```javascript
function pattern(n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      count++;
    }
  }
  return count;
}
```

- **Step-by-step arithmetic:**
- When $i = 0$, inner loop executes $1$ time.
- When $i = 1$, inner loop executes $2$ times.
- When $i = N - 1$, inner loop executes $N$ times.
- Total operations: $\sum_{k=1}^N k = \frac{N(N + 1)}{2} = \frac{N^2}{2} + \frac{N}{2}$.

- **Time Complexity:** $O(N^2)$
- **Space Complexity:** $O(1)$

---

### Question 2: Divide and Conquer / Logarithmic Loop

```javascript
function divide(n) {
  let steps = 0;
  while (n > 1) {
    n = Math.floor(n / 2);
    steps++;
  }
  return steps;
}
```

- **Step-by-step derivation:**
- At step $k$, the value of $n$ is $\frac{N}{2^k}$.
- The loop terminates when $\frac{N}{2^k} \le 1 \implies 2^k \ge N \implies k = \log_2 N$.

- **Time Complexity:** $O(\log N)$
- **Space Complexity:** $O(1)$

---

### Question 3: Matrix / Polynomial Independent Steps

```javascript
function matrixOperation(matrix) {
  let rows = matrix.length;
  let cols = matrix[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      console.log(matrix[r][c]);
    }
  }
}
```

- **Analysis:** Two variables represent two distinct dimensions. If matrix is $R \times C$:
- **Time Complexity:** $O(R \times C)$
- **Space Complexity:** $O(1)$

---

### Question 4: Recursive Tree Splitting (Fibonacci)

```javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

- **Analysis:**
- Each call branches into two sub-calls.
- Binary recursion tree grows to maximum depth $N$.
- Total nodes in tree $\approx 2^0 + 2^1 + 2^2 + \dots + 2^N = 2^{N+1} - 1$.

- **Time Complexity:** $O(2^N)$
- **Space Complexity:** $O(N)$ (Maximum height of the recursive call stack)
