# 🔁 Master Loops & Iterations | DSA with JavaScript Part 03

Master repetitive execution logic, loop control flow, and digit-extraction algorithms essential for problem solving in JavaScript.

---

## 📌 Loop Types at a Glance

| Loop | When to Use | Key Trait |
| --- | --- | --- |
| **`for`** | Known number of iterations (ranges, arrays) | Initialization, condition, and update are grouped together |
| **`while`** | Unknown iterations, condition-driven (digit extraction, two-pointer) | Checks condition **first** (entry-controlled) |
| **`do-while`** | Menu-driven CLI, prompts, interactive games | Runs code body **at least once** before checking condition (exit-controlled) |

---

## 1. For Loop Problems

### 🔹 Problem 1: Sum of $N$ Natural Numbers

Formula alternative: $\frac{n \times (n + 1)}{2}$. Using an iterative approach builds mental models for accumulators.

```javascript
let n = Number(prompt("Kaha Tak Add Karwaaoge ?"));

// Input validation: ensure user didn't cancel or type nonsense
if (isNaN(n) || n <= 0) {
  console.log("Number should be positive and greater than 0!");
} else {
  let sum = 0; // Accumulator variable to hold running total

  // Loop from 1 up to n (inclusive)
  for (let i = 1; i <= n; i++) {
    sum += i; // Add each number to sum (sum = sum + i)
  }
  console.log(`Sum of first ${n} natural numbers is: ${sum}`);
}

```

---

### 🔹 Problem 2: Factorial of a Number ($N!$)

Multiplies descending positive integers: $N! = N \times (N-1) \times \dots \times 1$.

```javascript
let n = Number(prompt("Konse Number Ka Factorial Karwaaoge ?"));

if (isNaN(n) || n < 0) {
  console.log("Invalid input! Enter a non-negative number.");
} else {
  let fact = 1; // Start with 1 because 0 in multiplication makes everything 0

  // Multiply fact by every number from 1 up to n
  for (let i = 1; i <= n; i++) {
    fact *= i; // fact = fact * i
  }
  console.log(`Factorial of ${n} is ${fact}`);
}

```

---

### 🔹 Problem 3: Factors of a Number

Find all integers that divide $N$ without a remainder.

> **Optimization:** Instead of iterating all the way to $N$, check up to $\lfloor N / 2 \rfloor$. The only factor greater than $N / 2$ is $N$ itself.

```javascript
let n = Number(prompt("Konse Number Ke Factors Chahiye ?"));

if (isNaN(n) || n <= 0) {
  console.log("Number should be positive and greater than 0!");
} else {
  console.log(`Factors of ${n}:`);
  
  // Optimization: Check only up to n / 2 because no factor can exist between (n / 2) and n
  for (let i = 1; i <= Math.floor(n / 2); i++) {
    // If remainder is 0, i divides n completely
    if (n % i === 0) {
      console.log(i);
    }
  }
  console.log(n); // N is always a factor of itself
}

```

---

### 🔹 Problem 4: Prime Number Check ($O(\sqrt{N})$)

A prime number is greater than $1$ and has only two distinct divisors: $1$ and itself.

> **Optimization:** Check divisors only up to $\lfloor \sqrt{N} \rfloor$. If no factor exists below or at $\sqrt{N}$, none exists above it.

```javascript
function isPrime(n) {
  // 0 and 1 are neither prime nor composite; negatives cannot be prime
  if (n <= 1) return false;

  // 2 is the only even prime number
  if (n === 2) return true;

  // Any even number greater than 2 is immediately NOT prime
  if (n % 2 === 0) return false;

  // Check odd divisors only up to sqrt(n). Step by 2 (i += 2) to skip evens
  for (let i = 3; i <= Math.floor(Math.sqrt(n)); i += 2) {
    if (n % i === 0) return false; // Found a factor, so not prime
  }

  return true; // No factors found -> definitely prime
}

let n = Number(prompt("Koi Number Enter Karo ?"));
console.log(n > 0 ? (isPrime(n) ? `${n} is Prime` : `${n} is Not Prime`) : "Invalid input");

```

---

## 2. While Loop Problems (Digit Extraction Pattern)

For operations on individual digits of an integer:

1. `n % 10` gives the **last digit**.
2. `Math.floor(n / 10)` **removes the last digit**.

---

### 🔹 Problem 5: Sum of Digits

Example: $1234 \to 1 + 2 + 3 + 4 = 10$.

```javascript
let n = 1234;
let sum = 0; // Holds total sum of digits

while (n > 0) {
  let rem = n % 10;        // Step 1: Extract last digit (e.g., 1234 % 10 = 4)
  sum += rem;              // Step 2: Add digit to total
  n = Math.floor(n / 10);  // Step 3: Chop off last digit (e.g., 1234 / 10 -> 123)
}

console.log("Sum of digits:", sum); // 10

```

---

### 🔹 Problem 6: Reverse of a Number

Example: $1234 \to 4321$. Use `rev = rev * 10 + rem` to shift digits left.

```javascript
let n = 1234;
let rev = 0; // Holds the reversed number

while (n > 0) {
  let rem = n % 10;        // Extract last digit
  rev = rev * 10 + rem;    // Shift existing reversed digits one place left, then append rem
  n = Math.floor(n / 10);  // Remove last digit
}

console.log("Reversed number:", rev); // 4321

```

---

### 🔹 Problem 7: Strong Number (Krishnamurthy Number)

A number is **Strong** if the sum of the factorials of its digits equals the original number.

Example: $145 = 1! + 4! + 5! = 1 + 24 + 120 = 145$.

```javascript
let n = 145;
let copy = n; // Preserve original value for comparison because 'n' will become 0
let sumOfFactorials = 0;

while (n > 0) {
  let rem = n % 10; // Extract single digit

  // Calculate factorial of this single digit (rem!)
  let fact = 1;
  for (let i = 1; i <= rem; i++) {
    fact *= i;
  }

  sumOfFactorials += fact; // Add factorial to running sum
  n = Math.floor(n / 10);  // Remove processed digit
}

// Compare original number against the sum of factorials
if (copy === sumOfFactorials) {
  console.log(`${copy} is a Strong Number!`);
} else {
  console.log(`${copy} is NOT a Strong Number!`);
}

```

---

## 3. Do-While Loop Problems

The `do-while` loop guarantees **at least one execution** of the block before evaluating the boolean condition.

---

### 🔹 Problem 8: Repeat Hello

Ask the user if they want to repeat printing greetings.

```javascript
let choice;

do {
  console.log("Hello, Coder!");
  // Prompt user after greeting has been printed once
  choice = prompt("Dobara Hello chahiye? Type 'yes' or 'no':");
} while (choice && choice.toLowerCase() === "yes"); // Check condition at exit

```

---

### 🔹 Problem 9: Guess the Number Game

Generate a random integer between $1$ and $100$. Provide high/low feedback until the user guesses correctly.

```javascript
// Generate secret target integer between 1 and 100
let random = Math.floor(Math.random() * 100) + 1;
let guess;

do {
  guess = Number(prompt("Guess a number between 1 and 100:"));

  // Check for non-numeric or out-of-range guesses
  if (isNaN(guess) || guess < 1 || guess > 100) {
    console.log("Please enter a valid number between 1 and 100!");
    continue; // Skip the rest and jump directly to condition check
  }

  // Provide directional feedback
  if (guess > random) {
    console.log("Too High! Try again.");
  } else if (guess < random) {
    console.log("Too Low! Try again.");
  } else {
    console.log(`Congrats! 🥳🎉 You guessed it: ${guess}`);
  }
} while (guess !== random); // Keep looping until the guess matches the secret target

```

---

### 🔹 Problem 10: Sasta Calculator

Keep performing arithmetic operations (`+`, `-`, `*`, `/`) until the user decides to exit.

```javascript
let keepRunning;

do {
  let num1 = Number(prompt("Enter First Number:"));
  let num2 = Number(prompt("Enter Second Number:"));
  let op = prompt("Choose operation (+, -, *, /):");

  // Validate number inputs
  if (isNaN(num1) || isNaN(num2)) {
    console.log("Invalid numbers entered!");
  } else {
    switch (op) {
      case "+":
        console.log(`Result: ${num1 + num2}`);
        break;
      case "-":
        console.log(`Result: ${num1 - num2}`);
        break;
      case "*":
        console.log(`Result: ${num1 * num2}`);
        break;
      case "/":
        // Guard against zero division
        console.log(num2 !== 0 ? `Result: ${num1 / num2}` : "Division by zero not allowed!");
        break;
      default:
        console.log("Invalid operator chosen!");
    }
  }

  // Check if user wants another calculation
  keepRunning = prompt("Aur calculate karna hai? ('yes' to continue):");
} while (keepRunning && keepRunning.toLowerCase() === "yes");

```


