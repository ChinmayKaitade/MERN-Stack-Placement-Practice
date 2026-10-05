# 📦 Mastering Arrays | DSA with JavaScript Part 05

Master dynamic array mechanics, pointer techniques, boundary conditions, and in-place transformations in modern JavaScript.

---

## 📌 Core Mental Models for Arrays

1. **Memory & Zero-Indexing:** In JavaScript, arrays are dynamic objects whose numeric keys act as zero-based indices. Elements can be accessed in $O(1)$ constant time: `arr[i]`.
2. **Space Complexity Awareness:** Aim for **in-place** modifications ($O(1)$ auxiliary space) over creating duplicate arrays ($O(N)$ space).
3. **Two-Pointer Technique:** Using two indices (`left` and `right`, or slow/fast runners `i` and `j`) helps reverse data and segregate elements in a single pass ($O(N)$ time).

---

## 1. Fundamental Traversal Operations

### 🔹 Problem 1: Sum of Array Elements

Accumulate values by visiting each index from $0$ to $N - 1$.

```javascript
let arr = [10, 20, 30, 40, 50];
let sum = 0;

for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}

console.log("Sum:", sum); // 150

```

* **Time Complexity:** $O(N)$
* **Space Complexity:** $O(1)$

---

### 🔹 Problem 2: Maximum & Minimum Element

Initialize your tracker with the first element (`arr[0]`), then compare against every subsequent element.

```javascript
let arr = [10, 2, 78, 13, 4];
let max = arr[0];
let min = arr[0];

for (let i = 1; i < arr.length; i++) {
  if (arr[i] > max) max = arr[i];
  if (arr[i] < min) min = arr[i];
}

console.log("Max:", max); // 78
console.log("Min:", min); // 2

```

* **Time Complexity:** $O(N)$
* **Space Complexity:** $O(1)$

---

## 2. Order Statistics (Second Extremes)

### 🔹 Problem 3: Second Maximum Element (Single Pass)

Maintain two variables: `max` and `sMax`. When a new peak is found, the previous `max` drops down to become `sMax`.

```javascript
let arr = [10, 30, 56, 43, 29, 64, 60];

// Safe initialization handles arrays with negative numbers or duplicates
let max = -Infinity;
let sMax = -Infinity;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > max) {
    sMax = max;      // Old max becomes second max
    max = arr[i];    // New max recorded
  } else if (arr[i] > sMax && arr[i] !== max) {
    // Current number lies between sMax and max (distinct check)
    sMax = arr[i];
  }
}

console.log("Second Max:", sMax); // 60

```

---

### 🔹 Problem 4: Second Minimum Element (Single Pass)

The mirrored logic of Second Max: cascade down when a strictly smaller element appears.

```javascript
let arr = [10, 2, 78, 13, 4];
let min = Infinity;
let sMin = Infinity;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] < min) {
    sMin = min;      // Old min becomes second min
    min = arr[i];    // New min recorded
  } else if (arr[i] < sMin && arr[i] !== min) {
    sMin = arr[i];
  }
}

console.log("Second Min:", sMin); // 4

```

---

## 3. In-Place Reversal (Two-Pointer Technique)

### 🔹 Problem 5: Array Reversal Without Extra Space

> ⚠️ **Common Bug Alert:**
> Using `while (i != j)` crashes or causes an infinite loop on arrays with an **even number of elements** because the pointers cross without ever being equal. Always use **`while (i < j)`**.

```javascript
let arr = [10, 20, 30, 40, 50];

let left = 0;
let right = arr.length - 1;

while (left < right) {
  // In-place swap using ES6 destructuring (or temp variable)
  [arr[left], arr[right]] = [arr[right], arr[left]];
  
  left++;
  right--;
}

console.log("Reversed Array:", arr); // [50, 40, 30, 20, 10]

```

* **Time Complexity:** $O(N)$
* **Space Complexity:** $O(1)$ (No auxiliary array allocated)

---

## 4. Partitioning & Segregation

### 🔹 Problem 6: Move All Zeros to Left and Ones to Right (Lomuto Partition Pattern)

Maintain a slow-pointer `j` representing the boundary where the next `0` must be placed. When the fast-pointer `i` discovers a `0`, swap `arr[i]` with `arr[j]` and advance `j`.

```javascript
let arr = [1, 1, 0, 1, 0, 1, 1, 0, 0];

let j = 0; // Boundary for zeros

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 0) {
    // Swap arr[i] with boundary element at arr[j]
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    j++; // Expand 0s partition
  }
}

console.log("Zeros Left, Ones Right:", arr);
// [0, 0, 0, 0, 1, 1, 1, 1, 1]

```

---

### 🔹 Problem 7: Segregate Negative and Positive Numbers

Move all negative elements to the left and positive elements to the right while preserving in-place $O(1)$ space constraints.

#### Approach A: Fast & Slow Pointer (Preserves relative partition concept)

```javascript
let arr = [12, -7, 5, -3, -2, 10, -9, 8];

let j = 0; // Boundary index for negative elements

for (let i = 0; i < arr.length; i++) {
  if (arr[i] < 0) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    j++;
  }
}

console.log("Partitioned Negatives/Positives:", arr);
// [-7, -3, -2, -9, 12, 10, 5, 8]

```

#### Approach B: Two-Pointer Converging from Both Ends

```javascript
let arr = [12, -7, 5, -3, -2, 10, -9, 8];

let left = 0;
let right = arr.length - 1;

while (left < right) {
  // Move left pointer forward while it already points to a negative
  while (left < right && arr[left] < 0) left++;

  // Move right pointer backward while it already points to a positive
  while (left < right && arr[right] > 0) right--;

  // Swap misplaced elements
  if (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

console.log("Two-Pointer Segregated:", arr);

```

