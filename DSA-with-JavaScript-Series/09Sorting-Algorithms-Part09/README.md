# 🔢 Sorting Algorithms — Part 1 | DSA with JavaScript Part 09

Comparison-based elementary sorting algorithms: **Bubble Sort**, **Selection Sort**, and **Insertion Sort**. Each algorithm operates in $O(N^2)$ time in the worst case, but their internal mechanics, invariants, and optimal use cases differ significantly.

---

## 📊 Quick Algorithm Comparison

| Algorithm          | Core Philosophy                                                                     | Best Time            | Avg Time | Worst Time | Space  | Stable? | In-Place? |
| ------------------ | ----------------------------------------------------------------------------------- | -------------------- | -------- | ---------- | ------ | ------- | --------- |
| **Bubble Sort**    | Sinking largest elements to the end via adjacent swaps                              | $O(N)$ _(optimized)_ | $O(N^2)$ | $O(N^2)$   | $O(1)$ | Yes     | Yes       |
| **Selection Sort** | Selecting the smallest element from unsorted part and placing it at the front       | $O(N^2)$             | $O(N^2)$ | $O(N^2)$   | $O(1)$ | No      | Yes       |
| **Insertion Sort** | Picking current element and inserting it into its correct position in sorted prefix | $O(N)$               | $O(N^2)$ | $O(N^2)$   | $O(1)$ | Yes     | Yes       |

---

## 1. Bubble Sort

### 💡 Core Idea

Traverse the array repeatedly, compare adjacent elements, and swap them if they are out of order. In each full pass, the **largest unsorted element "bubbles up"** to its correct final index at the end of the array.

### 🔍 Dry Run: `[10, 5, 12, 1, 3]`

- **Pass 1 ($i = 0$):**
- Compare `10, 5` $\to$ Swap $\to$ `[5, 10, 12, 1, 3]`
- Compare `10, 12` $\to$ No swap $\to$ `[5, 10, 12, 1, 3]`
- Compare `12, 1` $\to$ Swap $\to$ `[5, 10, 1, 12, 3]`
- Compare `12, 3` $\to$ Swap $\to$ `[5, 10, 1, 3, 12]` _(Largest element `12` is locked at the end)_

- **Pass 2 ($i = 1$):**
- Compare up to index $N - 1 - i$ $\to$ `[5, 1, 3, 10, 12]` _(Element `10` is locked)_

- **Pass 3 ($i = 2$):**
- `[1, 3, 5, 10, 12]` _(Element `5` is locked)_

- **Pass 4 ($i = 3$):**
- No swaps needed $\to$ Array is sorted.

### ⚡ Optimization Trick

If a full inner loop completes **without a single swap**, the array is already sorted. Breaking out early drops the best-case time complexity from $O(N^2)$ to $O(N)$.

```javascript
function bubbleSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Last i elements are already in place
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }

    // If no two elements were swapped, array is already sorted
    if (!swapped) break;
  }

  return arr;
}
```

---

## 2. Selection Sort

### 💡 Core Idea

Divide the array conceptually into two halves: **sorted (left)** and **unsorted (right)**.

In each pass, find the index of the **minimum element** in the unsorted subarray and swap it with the first unsorted position (`i`).

### 🔍 Dry Run: `[10, 5, 12, 1, 3]`

- **Pass 1 ($i = 0$):**
- Minimum in `[10, 5, 12, 1, 3]` is `1` (at index 3).
- Swap `arr[0]` (`10`) and `arr[3]` (`1`) $\to$ `[1, 5, 12, 10, 3]`

- **Pass 2 ($i = 1$):**
- Minimum in `[5, 12, 10, 3]` is `3` (at index 4).
- Swap `arr[1]` (`5`) and `arr[4]` (`3`) $\to$ `[1, 3, 12, 10, 5]`

- **Pass 3 ($i = 2$):**
- Minimum in `[12, 10, 5]` is `5` (at index 4).
- Swap `arr[2]` (`12`) and `arr[4]` (`5`) $\to$ `[1, 3, 5, 10, 12]`

- **Pass 4 ($i = 3$):**
- Minimum in `[10, 12]` is `10` (at index 3).
- `minIndex === i` $\to$ No swap needed.

### 📌 Key Characteristic

Minimizes total memory write operations: performs at most **$N - 1$ swaps**, making it useful when write cycles to memory are expensive (e.g., flash memory).

```javascript
function selectionSort(arr) {
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Find the smallest element in unsorted subarray
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap only if a strictly smaller element was found
    if (minIndex !== i) {
      let temp = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = temp;
    }
  }

  return arr;
}
```

---

## 3. Insertion Sort

### 💡 Core Idea

Works like sorting playing cards in hand. Assume the first element (`arr[0]`) is sorted. Take the next element (`key = arr[i]`) and shift all elements of the sorted subarray that are greater than `key` one position to the right. Insert the `key` into its correct slot.

### 🔍 Dry Run: `[10, 5, 12, 1, 3]`

- **Pass 1 ($i = 1$, `key = 5`):**
- `10 > 5` $\to$ shift `10` right $\to$ insert `5` at index 0 $\to$ `[5, 10, 12, 1, 3]`

- **Pass 2 ($i = 2$, `key = 12`):**
- `10 < 12` $\to$ no shifts $\to$ insert `12` at index 2 $\to$ `[5, 10, 12, 1, 3]`

- **Pass 3 ($i = 3$, `key = 1`):**
- `12 > 1`, `10 > 1`, `5 > 1` $\to$ shift all three right $\to$ insert `1` at index 0 $\to$ `[1, 5, 10, 12, 3]`

- **Pass 4 ($i = 4$, `key = 3`):**
- `12 > 3`, `10 > 3`, `5 > 3` $\to$ shift right $\to$ `1 < 3` $\to$ insert `3` at index 1 $\to$ `[1, 3, 5, 10, 12]`

### 📌 Key Characteristic

- **Adaptive:** Runs in $O(N)$ time on nearly-sorted data.
- **Online:** Can sort a list as it receives incoming data stream in real time.

```javascript
function insertionSort(arr) {
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;

    // Shift elements of arr[0...i-1] that are greater than key to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Place key at its correct sorted position
    arr[j + 1] = key;
  }

  return arr;
}
```
