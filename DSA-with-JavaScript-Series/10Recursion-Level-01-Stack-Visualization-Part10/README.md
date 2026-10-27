# 🔄 Recursion: Level 1 Stack Visualization | DSA with JavaScript Part 10

Recursion is a programming pattern where a function calls itself to solve smaller subproblems of the original problem. Understanding recursion requires visualizing how JavaScript allocates and pops frames on the **Call Stack**.

---

## 📌 The Core Anatomy of Recursion

Every recursive function requires two essential ingredients:

1. **Base Case:** The termination condition that stops recursion. Without it, the function calls itself indefinitely, causing a `RangeError: Maximum call stack size exceeded` (**Stack Overflow**).
2. **Recursive Call (Work Towards Base Case):** Calling the function with a modified argument (e.g., `n - 1`) so that each step moves closer to the base case.

---

## 1. How the Call Stack Works (Function Call Chain)

Before recursive functions, look at how regular chained function calls behave:

```javascript
function greet() {
  console.log("Good Morning Pineapple");
  enjoy();
}

function enjoy() {
  console.log("Enjoy ho raha hai guys....");
  temp();
}

function temp() {
  console.log("Kuch kar rahe ho...");
}

greet();
```

### 🧱 Call Stack Frame Visualization (LIFO — Last In, First Out)

```
Step 1: greet() called        Step 2: enjoy() called        Step 3: temp() called
|                  |          |                  |          |  temp() frame    | <- Top of stack (Active)
|                  |          |  enjoy() frame   |          |  enjoy() frame   |
|  greet() frame   |          |  greet() frame   |          |  greet() frame   |
|__Global Context__|          |__Global Context__|          |__Global Context__|

Step 4: temp() returns        Step 5: enjoy() returns       Step 6: greet() returns
|                  |          |                  |          |                  |
|  enjoy() frame   |          |  greet() frame   |          |                  |
|  greet() frame   |          |  greet() frame   |          |                  |
|__Global Context__|          |__Global Context__|          |__Global Context__|

```

---

## 2. The Infinite Call Trap: Why `temp(n--)` Crashes

Look at this common bug:

```javascript
function temp(n) {
  if (n == 0) return;
  console.log("Hello World!");
  temp(n--); // ❌ BUG: Post-decrement operator
}
temp(5);
```

### ⚠️ Why this causes Stack Overflow:

- **Post-decrement (`n--`) follows the Dhaba Rule:** Pehle use karo (pass original value), baad mein change karo.
- `temp(n--)` passes the current value of `n` (`5`) into the next function call **before** decrementing.
- The next call receives `5` again: `temp(5) -> temp(5) -> temp(5) -> ...`
- The base case `n == 0` is never reached.

### ✅ The Fix:

Use `temp(n - 1)` or prefix decrement `temp(--n)` so the decremented value is passed:

```javascript
temp(n - 1);
```

---

## 3. Print 1 to N vs N to 1 (Head vs Tail Recursion)

The order of execution relative to the recursive call determines whether work happens on the way **up the stack** (forward) or on the way **down the stack** (unwinding/backtracking).

### 🔹 Print 1 to N (Work during Unwinding)

```javascript
function print1ToN(n) {
  if (n === 0) return;

  print1ToN(n - 1); // 1. Go all the way to base case first
  console.log(n); // 2. Print when returning (unwinding)
}
print1ToN(5); // Output: 1, 2, 3, 4, 5
```

### 🔹 Print N to 1 (Work before Recursive Call)

```javascript
function printNToOne(n) {
  if (n === 0) return;

  console.log(n); // 1. Print current number first
  printNToOne(n - 1); // 2. Then proceed to smaller subproblem
}
printNToOne(5); // Output: 5, 4, 3, 2, 1
```

---

## 4. Mathematical Recursion

### 🔹 Sum of First N Natural Numbers

Recurrence relation: $S(N) = N + S(N - 1)$ with base case $S(1) = 1$.

```javascript
function sum(n) {
  if (n === 1) return 1;
  return n + sum(n - 1);
}

console.log(sum(5)); // 15
```

#### Stack Unwinding for `sum(3)`:

```
sum(3) = 3 + sum(2)
              2 + sum(1)
                    1 (Base case reached)
              2 + 1 = 3
sum(3) = 3 + 3 = 6

```

---

### 🔹 Factorial of N ($N!$)

Recurrence relation: $F(N) = N \times F(N - 1)$ with base case $F(1) = 1$.

```javascript
function fact(n) {
  if (n === 1 || n === 0) return 1;
  return n * fact(n - 1);
}

console.log(fact(5)); // 120
```

---

## 5. Fibonacci Series (3 Approaches)

The Fibonacci series: $0, 1, 1, 2, 3, 5, 8, 13, 21, 34 \dots$

Recurrence formula: $F(N) = F(N - 1) + F(N - 2)$ where $F(0) = 0$ and $F(1) = 1$.

---

### 🔹 Approach 1: Iterative Series Printing ($O(N)$ Time, $O(1)$ Space)

Maintain two pointers `first` and `second`, and compute `third = first + second`.

```javascript
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
```

---

### 🔹 Approach 2: Linear Tail-Recursive Series Printing ($O(N)$ Time, $O(N)$ Stack Space)

Pass the running accumulator state (`first` and `second`) forward through parameters:

```javascript
function fiboNTerms(n, first, second) {
  if (n === 0) return;

  let third = first + second;
  process.stdout.write(third + " ");

  fiboNTerms(n - 1, second, third);
}

function printFiboRecursiveSeries(n) {
  if (n <= 0) return;
  if (n === 1) {
    console.log(0);
    return;
  }
  process.stdout.write(0 + " " + 1 + " ");
  fiboNTerms(n - 2, 0, 1);
  console.log();
}

printFiboRecursiveSeries(10); // 0 1 1 2 3 5 8 13 21 34
```

---

### 🔹 Approach 3: Multiple Recursive Calls — $N^{\text{th}}$ Fibonacci Term ($O(2^N)$ Time, $O(N)$ Space)

Find the single $N^{\text{th}}$ term using the mathematical recurrence directly:

```javascript
function fibo(n) {
  if (n === 0 || n === 1) return n;
  return fibo(n - 1) + fibo(n - 2);
}

console.log(fibo(7)); // 13
```

#### 🌳 Binary Recursion Tree for `fibo(4)`:

```
                      fibo(4)
                    /         \
            fibo(3)             fibo(2)
           /       \           /       \
       fibo(2)   fibo(1)   fibo(1)   fibo(0)
      /       \
  fibo(1)   fibo(0)

Total calls: 9
Notice duplicate work: fibo(2) and fibo(1) are recomputed multiple times!

```
