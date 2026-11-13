# 🔀 Merge Sort | DSA with JavaScript Part 13

Merge Sort is an efficient, stable, comparison-based sorting algorithm built on the **Divide and Conquer** paradigm. It guarantees **$O(N \log N)$** time complexity across all cases (best, average, and worst).

---

## 1. Core Concepts & Questions

### 🔹 What is Merge Sort?

Merge Sort splits an unsorted array recursively into two halves until each subarray contains a single element (which is inherently sorted), and then merges those sorted subarrays back together in sorted order.

### 🔹 How Does It Break Down Problems? (Divide & Conquer)

1. **Divide:** Calculate `mid = first + Math.floor((last - first) / 2)` and recursively split the array into left (`first` to `mid`) and right (`mid + 1` to `last`) halves until `first >= last`.
2. **Conquer (Base Case):** Single-element subarrays (`first === last`) are already sorted.
3. **Combine (Merge):** Use two pointers to compare and merge two sorted halves into a temporary auxiliary array, then copy the merged result back into the original array.

### 🔹 When to Use Merge Sort?

- **Guaranteed Performance:** When you need a strict $O(N \log N)$ worst-case time guarantee (unlike Quick Sort, which degrades to $O(N^2)$ on bad pivots).
- **Stability Required:** When preserving the original relative order of duplicate elements matters (e.g., sorting objects by multiple keys).
- **Linked Lists:** Sorting linked lists in $O(N \log N)$ time with $O(1)$ auxiliary space (no extra array needed since pointers can be rewired directly).
- **External Sorting:** Sorting massive datasets on disk that exceed available RAM.

---

## 🌳 Visual Dry Run: `[8, 2, 1, 9, 5, 12, 4, 20]`

```
DIVIDE PHASE (Splitting down to single elements)
                 [8, 2, 1, 9, 5, 12, 4, 20]
                 /                        \
          [8, 2, 1, 9]                [5, 12, 4, 20]
           /        \                   /         \
       [8, 2]      [1, 9]           [5, 12]      [4, 20]
       /    \      /    \           /     \      /     \
     [8]    [2]  [1]    [9]       [5]    [12]  [4]    [20]

CONQUER / MERGE PHASE (Merging in sorted order)
     [8]    [2]  [1]    [9]       [5]    [12]  [4]    [20]
       \    /      \    /           \     /      \     /
       [2, 8]      [1, 9]           [5, 12]      [4, 20]
           \        /                   \         /
          [1, 2, 8, 9]                [4, 5, 12, 20]
                 \                        /
                 [1, 2, 4, 5, 8, 9, 12, 20]

```

---

## 📊 Complexity Analysis

| Metric              | Complexity    | Explanation                                                      |
| ------------------- | ------------- | ---------------------------------------------------------------- |
| **Best Time**       | $O(N \log N)$ | Always splits and merges every level completely                  |
| **Average Time**    | $O(N \log N)$ | $\log_2 N$ recursion levels $\times$ $O(N)$ merge work per level |
| **Worst Time**      | $O(N \log N)$ | Immune to reverse-sorted or duplicate-heavy inputs               |
| **Auxiliary Space** | $O(N)$        | Temporary array `temp` of size $N$ + $O(\log N)$ call stack      |
| **Stable?**         | **Yes**       | Equal elements maintain their original relative positions (`<=`) |
| **In-Place?**       | **No**        | Requires $O(N)$ auxiliary memory for merging arrays              |
