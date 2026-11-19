# 🔄 Cyclic Sort | DSA with JavaScript Part 15

Cyclic Sort is an **$O(N)$ time, $O(1)$ space** sorting pattern built specifically for arrays containing numbers in a **continuous known range**—such as `[1, N]` or `[0, N]`. Instead of comparing pairs of elements like Bubble, Merge, or Quick Sort, it places every number directly at its **exact target index**.

---

## 1. Core Concepts & Pattern Recognition

### 🔹 When to Use Cyclic Sort?

Whenever a problem states:

- _"Given an array containing $N$ numbers in the range `1` to `N`..."_
- _"Given an array containing $N$ distinct numbers in the range `0` to `N`..."_
- _"Find the missing, duplicate, or first missing positive number in $O(N)$ time and $O(1)$ extra space."_

### 🔹 The Golden Index-Mapping Rule

| Input Range                       | Target Index Formula      | Example (`val = 3`)      |
| --------------------------------- | ------------------------- | ------------------------ |
| **`1` to `N**` (1-indexed values) | `correctIdx = arr[i] - 1` | `3` belongs at index `2` |
| **`0` to `N**` (0-indexed values) | `correctIdx = nums[i]`    | `3` belongs at index `3` |

### 🔹 Why Does It Run in $O(N)$ Time?

Inside the `while (i < arr.length)` loop, pointer `i` **only advances when `arr[i]` is already sitting at its home index** (or is out of bounds). Every swap puts **at least one number** permanently into its final sorted position. Because an array of size $N$ has $N$ positions, at most $N - 1$ swaps can ever happen $\implies O(N) + O(N) = O(N)$.

---

## 2. Standard Cyclic Sort (`1` to `N`)

Given an unsorted array of size $N$ containing distinct numbers from `1` to `N`, sort the array in-place.

### 🌳 Visual Dry Run: `arr = [7, 5, 8, 2, 1, 4, 3, 6]` ($N = 8$)

```text
Initial:   [ 7,  5,  8,  2,  1,  4,  3,  6 ]   (indices: 0..7)
             i

Step 1 (i = 0): arr[0] = 7 -> correctIdx = 7 - 1 = 6. Swap arr[0] & arr[6]:
           [ 3,  5,  8,  2,  1,  4,  7,  6 ]   (7 is now home at idx 6)
             i

Step 2 (i = 0): arr[0] = 3 -> correctIdx = 3 - 1 = 2. Swap arr[0] & arr[2]:
           [ 8,  5,  3,  2,  1,  4,  7,  6 ]   (3 is now home at idx 2)
             i

Step 3 (i = 0): arr[0] = 8 -> correctIdx = 8 - 1 = 7. Swap arr[0] & arr[7]:
           [ 6,  5,  3,  2,  1,  4,  7,  8 ]   (8 is now home at idx 7)
             i

...Swaps continue until 1 lands at index 0:
           [ 1,  2,  3,  4,  5,  6,  7,  8 ]   (All elements match idx + 1)

```

### 💻 Implementation (`1` to `N`)

```javascript
function cyclicSort(arr) {
  let i = 0;

  while (i < arr.length) {
    let correctIdx = arr[i] - 1;

    if (arr[i] !== arr[correctIdx]) {
      let temp = arr[i];
      arr[i] = arr[correctIdx];
      arr[correctIdx] = temp;
    } else {
      i++;
    }
  }

  return arr;
}
```

---

## 3. LeetCode 268: Missing Number (`0` to `N`)

Given an array `nums` containing $N$ distinct numbers in the range `[0, N]`, return the single number in the range that is missing from the array.

### 🔍 Step-by-Step Logic

1. **Sort Phase (`0` to `N`):**

- Since values start at `0`, each number `val` belongs at `correctIdx = nums[i]`.
- **Boundary Guard (`nums[i] < nums.length`):** Because the array has length $N$ (indices `0` to `N - 1`), the value `N` has no valid index to sit in. Skip `N` and let it naturally settle into the missing number's slot.

2. **Scan Phase:**

- Iterate `j` from `0` to `nums.length - 1`. The first index where `j !== nums[j]` is the missing number.
- If all indices `0` to `N - 1` match their values, then **`N` itself** is missing (`return nums.length`).

### 🌳 Visual Dry Run: `nums = [3, 0, 1]` ($N = 3$)

```text
Initial:   [ 3,  0,  1 ]     (indices: 0, 1, 2)
             i

Step 1 (i = 0): nums[0] = 3. Is 3 < 3? False (skip 3) -> i++ (i = 1)
Step 2 (i = 1): nums[1] = 0 -> correctIdx = 0. Swap nums[1] & nums[0]:
           [ 0,  3,  1 ]
                 i
Step 3 (i = 1): nums[1] = 3. Is 3 < 3? False (skip 3) -> i++ (i = 2)
Step 4 (i = 2): nums[2] = 1 -> correctIdx = 1. Swap nums[2] & nums[1]:
           [ 0,  1,  3 ]
                     i
Step 5 (i = 2): nums[2] = 3. Is 3 < 3? False -> i++ (i = 3, loop ends)

Scan Phase:
- j = 0 -> nums[0] === 0 (OK)
- j = 1 -> nums[1] === 1 (OK)
- j = 2 -> nums[2] === 3 !== 2  --> Return 2!

```

### 💻 Implementation (`0` to `N`)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let i = 0;

  while (i < nums.length) {
    let correctIdx = nums[i];
    if (nums[i] < nums.length && nums[i] !== nums[correctIdx]) {
      let temp = nums[i];
      nums[i] = nums[correctIdx];
      nums[correctIdx] = temp;
    } else {
      i++;
    }
  }

  for (let j = 0; j < nums.length; j++) {
    if (j !== nums[j]) return j;
  }

  return nums.length;
};
```

---

## 4. LeetCode 448: Find All Numbers Disappeared in an Array (`1` to `N` with Duplicates)

Given an array `nums` of $N$ integers where `nums[i]` is in the range **`[1, N]`**, return an array of all the integers in the range `[1, N]` that do not appear in `nums`.

### 🔍 Step-by-Step Logic

1. **Cyclic Sort Phase (`1` to `N`):**

- Every valid number belongs at `correctIdx = nums[i] - 1`.
- Unlike LeetCode 268, `nums` contains **duplicates**. When placing numbers at their home indices, duplicates naturally get pushed into the exact index slots belonging to the missing numbers.
- Checking `if (nums[i] !== nums[correctIdx])` prevents infinite loops on duplicates: if the target slot already holds the right value, `i++` advances immediately.

2. **Collection Phase:**

- Loop `j` from `0` to `nums.length - 1`.
- Whenever `nums[j] !== j + 1`, push `j + 1` into `ans`.

### 🌳 Visual Dry Run: `nums = [4, 3, 2, 7, 8, 2, 3, 1]` ($N = 8$)

```text
Initial:   [ 4,  3,  2,  7,  8,  2,  3,  1 ]   (indices: 0..7)
             i

Step 1 (i = 0): nums[0] = 4 -> correctIdx = 3. Swap idx 0 & 3:
           [ 7,  3,  2,  4,  8,  2,  3,  1 ]
             i

Step 2 (i = 0): nums[0] = 7 -> correctIdx = 6. Swap idx 0 & 6:
           [ 3,  3,  2,  4,  8,  2,  7,  1 ]
             i

Step 3 (i = 0): nums[0] = 3 -> correctIdx = 2. Swap idx 0 & 2:
           [ 2,  3,  3,  4,  8,  2,  7,  1 ]
             i

Step 4 (i = 0): nums[0] = 2 -> correctIdx = 1. Swap idx 0 & 1:
           [ 3,  2,  3,  4,  8,  2,  7,  1 ]
             i

Step 5 (i = 0): nums[0] = 3 -> correctIdx = 2.
           Is nums[0] (3) !== nums[2] (3)? FALSE (duplicate detected!) -> i++ (i = 1)

...Continuing through the array places every unique number at (val - 1):

Sorted:    [ 1,  2,  3,  4,  3,  2,  7,  8 ]
Indices:     0   1   2   3   4   5   6   7
Expected:    1   2   3   4   5   6   7   8
                             ^   ^
                     Mismatch at j=4 (missing 5) and j=5 (missing 6)

Result: [5, 6]

```

### 💻 Implementation (`1` to `N` with Duplicates)

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  let i = 0;

  while (i < nums.length) {
    let correctIdx = nums[i] - 1;
    if (nums[i] !== nums[correctIdx]) {
      let temp = nums[i];
      nums[i] = nums[correctIdx];
      nums[correctIdx] = temp;
    } else {
      i++;
    }
  }

  let ans = [];
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== j + 1) {
      ans.push(j + 1);
    }
  }

  return ans;
};
```

---

## 📊 Complexity Comparison Table

| Problem                         | Range                      | Time Complexity | Auxiliary Space | Key Condition                                        |
| ------------------------------- | -------------------------- | --------------- | --------------- | ---------------------------------------------------- |
| **Standard Cyclic Sort**        | `[1, N]`                   | $O(N)$          | $O(1)$          | `arr[i] !== arr[arr[i] - 1]`                         |
| **LC 268: Missing Number**      | `[0, N]`                   | $O(N)$          | $O(1)$          | `nums[i] < nums.length && nums[i] !== nums[nums[i]]` |
| **LC 448: Disappeared Numbers** | `[1, N]` (with duplicates) | $O(N)$          | $O(1)$          | `nums[i] !== nums[nums[i] - 1]`                      |
