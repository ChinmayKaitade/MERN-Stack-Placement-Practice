# 📘 Master the Basics: Notes & Concepts | DSA with JavaScript (Part 01)

A beginner-friendly guide to core JavaScript fundamentals for DSA, interview problem solving, and writing bug-free code.

---

## 1. Variables & Scope: `var` vs `let` vs `const`

Think of a variable as a labeled storage box in memory. JavaScript gives you three keywords to create these boxes: `var`, `let`, and `const`.

### 📊 Quick Comparison

| Feature                   | `var`                              | `let`                           | `const`                         |
| ------------------------- | ---------------------------------- | ------------------------------- | ------------------------------- |
| **Scope**                 | Function scope (leaks out of `{}`) | Block scope `{}` (stays inside) | Block scope `{}` (stays inside) |
| **Can you reassign?**     | Yes                                | Yes                             | No (value is locked)            |
| **Can you re-declare?**   | Yes (can cause accidental bugs)    | No                              | No                              |
| **Hoisting Behavior**     | Hoisted, starts as `undefined`     | Hoisted, trapped in **TDZ**     | Hoisted, trapped in **TDZ**     |
| **Attaches to `window`?** | Yes (in browser)                   | No                              | No                              |

---

### 🧱 Scope: Block Scope vs Function Scope

- **Block Scope (`let` / `const`):** Stays strictly inside whatever curly braces `{}` it was created in (like inside an `if`, `for`, or `while` block).
- **Function Scope (`var`):** Ignores regular curly braces `{}` and leaks out to the entire function or file!

```javascript
{
  var leakedVar = "I escaped the curly braces!";
  let blockLet = "I am locked inside.";
  const blockConst = "I am locked inside too.";
}

console.log(leakedVar); // "I escaped the curly braces!"
// console.log(blockLet); // ReferenceError: blockLet is not defined
// console.log(blockConst);// ReferenceError: blockConst is not defined
```

#### The Classic Loop Bug (`var` vs `let`)

Because `var` uses only one shared box for the entire loop, timer functions run _after_ the loop has already finished counting:

```javascript
// With var: All timers read the final value (3)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 100);
}
// Output: 3, 3, 3

// With let: A brand-new 'j' box is created for every loop cycle
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 100);
}
// Output: 0, 1, 2
```

---

### 🚀 Hoisting Explained Simply

When JavaScript runs your file, it does not just start running line 1 right away. It runs in **two phases**:

1. **Phase 1 (Memory Creation / Scan Phase):** JavaScript scans your code from top to bottom, finds all variable and function declarations, and allocates memory space for them.
2. **Phase 2 (Execution Phase):** It runs the code line by line, calculating values and printing outputs.

**Hoisting** is this behavior where JavaScript sets aside memory for declarations before running any lines. But `var`, `let`, `const`, and `function` behave differently during this step!

---

#### 1. How `var` is Hoisted

When JS spots a `var`, it reserves memory and immediately gives it a default starting value of `undefined`.

```javascript
console.log(myHero); // undefined (No crash! Memory was reserved)
var myHero = "Batman";
console.log(myHero); // "Batman" (Now assigned)
```

**What the JS Engine Actually Does Behind the Scenes:**

```javascript
// Step 1: Hoisted to the top with 'undefined'
var myHero = undefined;

// Step 2: Executes code
console.log(myHero); // undefined
myHero = "Batman"; // updates value
console.log(myHero); // "Batman"
```

---

#### 2. How `let` & `const` are Hoisted (The Temporal Dead Zone / TDZ)

`let` and `const` **are also hoisted** (memory is allocated), but JavaScript **refuses to initialize them**. They do not get `undefined`. They get a "Do Not Touch" tag until code execution reaches the line where they are declared.

The dead area between the start of the block and the actual line of declaration is called the **Temporal Dead Zone (TDZ)**. Touching the variable while it is in the TDZ throws a `ReferenceError`.

```javascript
{
  // === TEMPORAL DEAD ZONE (TDZ) STARTS HERE ===
  // Memory is reserved for 'age', but uninitialized.

  // console.log(age);
  // ❌ Throws: ReferenceError: Cannot access 'age' before initialization

  let age = 22;
  // === TDZ ENDS HERE ===

  console.log(age); // 22 (Safe to use!)
}
```

---

#### 3. How Functions are Hoisted

- **Traditional Function Declarations** are hoisted with their **entire body**. You can call them before they appear in your code!
- **Function Expressions (`let` / `const` with arrow functions)** follow variable hoisting rules. You cannot call them before their declaration line.

```javascript
// 1. Traditional function (Works!)
sayHi(); // "Hi there!"

function sayHi() {
  console.log("Hi there!");
}

// 2. Arrow function stored in a variable (Crashes!)
// greet(); // ❌ ReferenceError: Cannot access 'greet' before initialization

const greet = () => {
  console.log("Hello!");
};
```

---

### 🔒 `const`: Lock the Variable, Not the Object Contents

Using `const` means the variable name cannot point to a new memory address. But if the value is an **object or array**, its inner contents can still change:

```javascript
const score = 100;
// score = 200; // ❌ TypeError: Assignment to constant variable.

const player = { name: "Sam", level: 1 };

// Allowed: Modifying properties inside the object
player.level = 2;
player.weapon = "Sword";
console.log(player); // { name: "Sam", level: 2, weapon: "Sword" }

// Not Allowed: Reassigning to a completely new object
// player = { name: "Alex", level: 1 }; // ❌ TypeError
```

If you want to freeze the internal contents so nothing can change, use `Object.freeze()`:

```javascript
const lockedUser = Object.freeze({ name: "Sam", level: 1 });
lockedUser.level = 99; // Silently ignored (or throws error in strict mode)
console.log(lockedUser.level); // 1
```

---

## 2. Type Coercion: JavaScript Converting Types Automatically

**Type Coercion** is JavaScript quietly converting a value from one data type to another behind the scenes when two different types meet.

---

### 🔤 String Coercion: The Binary `+` Operator

The `+` sign does two different jobs:

1. **Math Addition** (if both sides are numbers).
2. **String Glue / Concatenation** (if **even one** side is a string).

```javascript
console.log(5 + "5"); // "55"  (5 converts to "5", then joins)
console.log("Score: " + 100); // "Score: 100"
console.log(true + " story"); // "true story"
```

#### Order Matters (Left to Right Evaluation)

```javascript
// 10 + 20 happens first (numbers) -> 30
// 30 + "30" meets a string -> "3030"
console.log(10 + 20 + "30"); // "3030"

// "10" + 20 meets a string first -> "1020"
// "1020" + 30 joins again -> "102030"
console.log("10" + 20 + 30); // "102030"
```

---

### 🔢 Numeric Coercion: `-`, `*`, `/`, `%`, and Unary `+`

Unlike `+`, math operators like `-`, `*`, `/`, and `%` cannot glue words together. They force values into numbers.

#### What values become when forced into Numbers:

- `true` $\to$ `1`
- `false` $\to$ `0`
- `null` $\to$ `0`
- `""` (empty string) $\to$ `0`
- `"  42  "` (string with spaces) $\to$ `42`
- `undefined` $\to$ `NaN` (Not a Number)
- Any non-number text (`"abc"`, `"10px"`) $\to$ `NaN`

```javascript
// Normal string math
console.log("10" - 2); // 8
console.log("6" * "3"); // 18
console.log("100" / "4"); // 25
console.log("10" % "3"); // 1

// Booleans become 1 and 0
console.log(true - 1); // 0 (1 - 1)
console.log(false * 10); // 0 (0 * 10)

// null vs undefined
console.log(10 - null); // 10  (null becomes 0)
console.log(10 - undefined); // NaN (undefined becomes NaN; any math with NaN is NaN)

// Quick trick: Unary '+' converts any string to a number
console.log(+"42"); // 42
console.log(+true); // 1
console.log(+false); // 0
console.log(+null); // 0
```

---

### 📦 Objects and Arrays in Coercion

When objects or arrays are forced to convert, JavaScript converts them to strings first:

- `[]` (empty array) becomes `""` (empty string), which then becomes `0` in math!
- `[5]` becomes `"5"`, which then becomes `5`.
- `{}` (plain object) becomes `"[object Object]"`.

```javascript
console.log([] + []); // "" (empty string + empty string)
console.log([] + {}); // "[object Object]"
console.log([1, 2] + [3]); // "1,23"
console.log([] - 1); // -1  ([] -> "" -> 0, then 0 - 1 = -1)
console.log([5] * [2]); // 10  ("5" * "2" -> 5 * 2 = 10)
```

---

### ⚖️ Loose Equality (`==`) vs Strict Equality (`===`)

- **`===` (Strict / Always use this):** Compares both value **and** type. No automatic conversions allowed.
- **`==` (Loose / Dangerous):** Converts types automatically before comparing, leading to surprising results.

```javascript
console.log(0 == false); // true  (both converted to 0)
console.log("" == false); // true  (both converted to 0)
console.log("42" == 42); // true  ("42" converted to 42)
console.log(null == undefined); // true  (Special JS rule: they equal each other loosely)

// With Strict Equality (===), all of these are false:
console.log(0 === false); // false (Number !== Boolean)
console.log("42" === 42); // false (String !== Number)
console.log(null === undefined); // false (Different types)
```

---

## 3. Operators Overview

- **Arithmetic:** `+` (add), `-` (subtract), `*` (multiply), `/` (divide), `%` (remainder/modulo).
- **Relational / Comparison:** `<`, `>`, `<=`, `>=`, `==` (loose), `===` (strict), `!=`, `!==`.
- **Logical:**
- `&&` (AND): Returns `true` only if **both** sides are true.
- `||` (OR): Returns `true` if **at least one** side is true.
- `!` (NOT): Flips true to false, and false to true (`!true` $\to$ `false`).

- **Unary Increment / Decrement:**
- **Post-increment (`i++`)**: Returns the current value **first**, then adds 1.
- **Pre-increment (`++i`)**: Adds 1 **first**, then returns the new value.

---

## 4. Tricky Operator Questions Breakdown

### Problem 1

```javascript
let i = 11;
i = i++ + ++i;
console.log(i); // Output: 24
```

- **Step-by-step:**

1. `i++`: Gives old value `11`, then increments `i` to `12` in memory.
2. `++i`: Increments `12` to `13` first, then gives new value `13`.
3. Expression adds them: `11 + 13 = 24`.
4. `24` is assigned to `i`.

---

### Problem 2

```javascript
let a = 11,
  b = 22;
let c = a + b + a++ + b++ + ++a + ++b;
console.log("a=" + a); // a=13
console.log("b=" + b); // b=24
console.log("c=" + c); // c=103
```

- **Step-by-step:**

1. `a` evaluates to `11`.
2. `b` evaluates to `22`.
3. `a++` evaluates to `11` (internal `a` becomes `12`).
4. `b++` evaluates to `22` (internal `b` becomes `23`).
5. `++a` increases `12` to `13`, then evaluates to `13` (internal `a` is `13`).
6. `++b` increases `23` to `24`, then evaluates to `24` (internal `b` is `24`).
7. Final sum: $11 + 22 + 11 + 22 + 13 + 24 = 103$.

---

### Problem 3

```javascript
let b = true;
b++;
console.log(b); // Output: 2
```

- **Step-by-step:**
- `b++` converts `true` to the number `1`.
- Adding 1 makes it `2`.

---

### Problem 4

```javascript
let a = 11++; // SyntaxError: Invalid left-hand side expression in postfix operation

```

- **Step-by-step:**
- Increment operators (`++` / `--`) must update a named storage variable in memory. You cannot increment raw literal numbers directly.

---

### Problem 5

```javascript
let i = 11;
let j = --(i++); // SyntaxError: Invalid left-hand side expression in prefix operation

```

- **Step-by-step:**
- `(i++)` resolves to the raw scalar value `11`.
- The outer `--` tries to run on the number `11` instead of a variable reference, which causes a SyntaxError.

---

## 5. JavaScript Math Methods Cheatsheet

| Method                | What It Does (In Simple Words)              | Example                                          |
| --------------------- | ------------------------------------------- | ------------------------------------------------ |
| `Math.round(x)`       | Rounds to nearest whole number              | `Math.round(4.5) // 5`                           |
| `Math.ceil(x)`        | Always rounds UP (ceiling)                  | `Math.ceil(4.1) // 5`                            |
| `Math.floor(x)`       | Always rounds DOWN (floor)                  | `Math.floor(4.9) // 4`                           |
| `Math.trunc(x)`       | Chops off decimals completely               | `Math.trunc(4.9) // 4`, `Math.trunc(-4.9) // -4` |
| `Math.pow(base, exp)` | Power ($x^y$)                               | `Math.pow(2, 3) // 8`                            |
| `Math.sqrt(x)`        | Square root                                 | `Math.sqrt(25) // 5`                             |
| `Math.cbrt(x)`        | Cube root                                   | `Math.cbrt(27) // 3`                             |
| `Math.abs(x)`         | Makes any number positive                   | `Math.abs(-15) // 15`                            |
| `Math.max(...nums)`   | Finds the biggest number                    | `Math.max(1, 9, 3) // 9`                         |
| `Math.min(...nums)`   | Finds the smallest number                   | `Math.min(1, 9, 3) // 1`                         |
| `Math.random()`       | Gives random decimal between 0 and 1        | `Math.random()`                                  |
| `num.toFixed(digits)` | Formats decimal digits and returns a string | `(3.14159).toFixed(2) // "3.14"`                 |

---
