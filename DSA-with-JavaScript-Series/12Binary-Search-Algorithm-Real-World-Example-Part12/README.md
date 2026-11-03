# 🔍 Binary Search | DSA with JavaScript Part 12

Binary Search is an optimal searching algorithm designed for **sorted collections**. Instead of checking elements sequentially one by one (Linear Search in $O(N)$), it repeatedly halves the search space by inspecting the middle element, achieving $O(\log N)$ logarithmic time complexity.

---

## 📌 Linear Search vs Binary Search

| Feature                     | Linear Search                           | Binary Search                                     |
| --------------------------- | --------------------------------------- | ------------------------------------------------- |
| **Precondition**            | Works on any array (sorted or unsorted) | **Array MUST be sorted** (monotonic property)     |
| **Time Complexity (Worst)** | $O(N)$                                  | $O(\log N)$                                       |
| **Time Complexity (Best)**  | $O(1)$                                  | $O(1)$                                            |
| **Space Complexity**        | $O(1)$                                  | $O(1)$ iterative / $O(\log N)$ recursive          |
| **Mechanism**               | Scans from index $0 \to N - 1$          | Compares target to `mid`, discards half the array |

> **Scale comparison:** In an array of $1,000,000$ sorted elements:
>
> - Linear search takes up to **$1,000,000$ comparisons**.
> - Binary search takes at most $\lceil \log_2(1,000,000) \rceil \approx$ **20 comparisons**.

---

## ⚙️ How the Algorithm Works

Binary Search maintains two boundary pointers, `first` (or `low`) and `last` (or `high`):

1. **Calculate Midpoint:**

$$\text{mid} = \left\lfloor \frac{\text{first} + \text{last}}{2} \right\rfloor$$

2. **Evaluate Target:**

- If `arr[mid] === target`: Match found! Return `mid`.
- If `arr[mid] > target`: The target is strictly smaller than the middle element. Since the array is sorted, it cannot exist in the right half. Discard the right half by setting `last = mid - 1`.
- If `arr[mid] < target`: The target is strictly larger than the middle element. Discard the left half by setting `first = mid + 1`.

3. **Termination:** Continue while `first <= last`. If `first > last`, the search space is exhausted and the target does not exist in the array (return `-1`).

---

## 🔍 Dry Run: Searching for `67` in `[2, 5, 8, 9, 12, 18, 20, 25, 67, 101, 125]`

Array length $N = 11$. Indices: $0 \to 10$. Target = `67`.

```
Index:    0   1   2   3   4    5    6    7    8    9    10
Value:   [2,  5,  8,  9,  12,  18,  20,  25,  67, 101, 125]

```

### Iteration 1:

- `first = 0`, `last = 10`
- `mid = Math.floor((0 + 10) / 2) = 5`
- `arr[5] = 18`
- Compare: `18 < 67` $\implies$ Target is in right half.
- Update: `first = mid + 1 = 6`.

### Iteration 2:

- `first = 6`, `last = 10`
- `mid = Math.floor((6 + 10) / 2) = 8`
- `arr[8] = 67`
- Compare: `67 === 67` $\implies$ Match found!
- Return: `8`.

---

## ⚠️ The Integer Overflow Bug (Best Practice)

In languages with fixed 32-bit integers (Java, C++, C), calculating `(first + last) / 2` can exceed $2^{31} - 1$ if both indices are large, resulting in an integer overflow.

While JavaScript numbers use IEEE 754 64-bit double precision floats (safe integer up to $2^{53} - 1$), using the overflow-safe formula is standard industry best practice across all technical interviews:

$$\text{mid} = \text{first} + \left\lfloor \frac{\text{last} - \text{first}}{2} \right\rfloor$$

```javascript
// Preferred over Math.floor((first + last) / 2)
let mid = first + Math.floor((last - first) / 2);
```

---

## 💻 Code Implementations

### 1. Iterative Implementation ($O(\log N)$ Time, $O(1)$ Space)

```javascript
function binarySearch(arr, target) {
  let first = 0;
  let last = arr.length - 1;

  while (first <= last) {
    let mid = first + Math.floor((last - first) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    } else if (arr[mid] > target) {
      last = mid - 1; // Search left half
    } else {
      first = mid + 1; // Search right half
    }
  }

  return -1; // Target not found
}
```

---

### 2. Recursive Implementation ($O(\log N)$ Time, $O(\log N)$ Stack Space)

```javascript
function binarySearchRecursive(arr, first, last, target) {
  // Base case: range exhausted
  if (first > last) return -1;

  let mid = first + Math.floor((last - first) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] > target)
    return binarySearchRecursive(arr, first, mid - 1, target);
  return binarySearchRecursive(arr, mid + 1, last, target);
}
```
