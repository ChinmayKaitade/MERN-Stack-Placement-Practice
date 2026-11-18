# ⚡ Quick Sort | DSA with JavaScript Part 14

Quick Sort is a fast, **in-place**, Divide and Conquer sorting algorithm. It works by selecting a **pivot** element and partitioning the array around it so that all elements smaller than or equal to the pivot move to its left, and all elements greater than the pivot move to its right.

---

## 1. Core Concepts & Questions

### 🔹 What is Quick Sort?

Quick Sort picks a pivot element (here, the first element `arr[first]`), places it at its exact sorted index (`pIdx`), and recursively sorts the left and right subarrays around that pivot.

### 🔹 How Does It Partition the Array? (Hoare-style Two-Pointer Partition)

1. **Choose Pivot:** Pick `pivot = arr[first]`.
2. **Initialize Pointers:** Set `i = first + 1` (scans left-to-right for elements `> pivot`) and `j = last` (scans right-to-left for elements `<= pivot`).
3. **Swap Out-of-Place Pairs:** While `i <= j`:

- Advance `i` while `arr[i] <= pivot`.
- Decrement `j` while `arr[j] > pivot`.
- If `i < j`, swap `arr[i]` and `arr[j]`.

4. **Place Pivot:** Once `i > j`, swap `arr[first]` (the pivot) with `arr[j]`. Now `j` is the pivot's final sorted index.
5. **Recurse:** Repeat on `[first ... pIdx - 1]` and `[pIdx + 1 ... last]`.

### 🔹 Merge Sort vs Quick Sort

| Feature             | Quick Sort                                                       | Merge Sort                                 |
| ------------------- | ---------------------------------------------------------------- | ------------------------------------------ |
| **Average Time**    | $O(N \log N)$ _(often faster in practice due to cache locality)_ | $O(N \log N)$                              |
| **Worst Time**      | $O(N^2)$ _(when array is already sorted/reverse-sorted)_         | $O(N \log N)$ _(guaranteed)_               |
| **Auxiliary Space** | $O(\log N)$ recursive stack _(In-place, no extra array)_         | $O(N)$ temporary array + $O(\log N)$ stack |
| **Stable?**         | **No** _(swaps across long distances)_                           | **Yes**                                    |

---

## 🔍 Visual Dry Run: `[19, 3, 17, 24, 1, 87, 22]`

First call: `findPivotIdx(arr, 0, 6)` with `pivot = 19`, `i = 1`, `j = 6`.

```
Initial:  [ 19,   3,  17,  24,   1,  87,  22 ]
          pivot   i                        j

Step 1:
- i moves past 3, 17 -> stops at index 3 (arr[3] = 24 > 19)
- j moves past 22, 87 -> stops at index 4 (arr[4] = 1 <= 19)
- Since i (3) < j (4), swap arr[3] and arr[4]:
          [ 19,   3,  17,   1,  24,  87,  22 ]
          pivot             i    j

Step 2:
- i moves to index 4 (arr[4] = 24 > 19)
- j moves to index 3 (arr[3] = 1 <= 19)
- Loop ends because i (4) > j (3)

Step 3: Swap pivot arr[0] (19) with arr[j] (arr[3] = 1):
          [  1,   3,  17,  19,  24,  87,  22 ]
           \___________/  pIdx  \___________/
           All <= 19     (idx 3)   All > 19

```

Now `19` is permanently locked at index `3`, and Quick Sort recurses on `[1, 3, 17]` and `[24, 87, 22]`.

---

## 📊 Complexity Analysis

| Metric              | Complexity                     | Explanation                                                          |
| ------------------- | ------------------------------ | -------------------------------------------------------------------- |
| **Best Time**       | $O(N \log N)$                  | Pivot splits the array into two equal halves every step              |
| **Average Time**    | $O(N \log N)$                  | Balanced partitions on random input distributions                    |
| **Worst Time**      | $O(N^2)$                       | Already sorted or reverse-sorted input with first/last element pivot |
| **Auxiliary Space** | $O(\log N)$ avg / $O(N)$ worst | Recursive call stack frames (no auxiliary array allocated)           |
| **Stable?**         | **No**                         | Long-range swaps change relative order of equal keys                 |
| **In-Place?**       | **Yes**                        | Modifies the array directly using $O(1)$ pointer variables           |
