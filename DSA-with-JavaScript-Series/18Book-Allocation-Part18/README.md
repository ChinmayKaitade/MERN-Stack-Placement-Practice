# 📚 Book Allocation Problem (Allocate Minimum Pages) | Binary Search on Answer (Part 18)

Given an array `arr` of $N$ books where `arr[i]` represents the number of pages in the $i^{\text{th}}$ book, and an integer `k` representing the number of students, allocate all books among the `k` students such that:

1. **Every student gets at least one book.**
2. **Each book is assigned to only one student.**
3. **Contiguous Allocation:** Books allocated to a student must be in contiguous order.
4. **Objective:** **Minimize the maximum number of pages** assigned to any single student. If an allocation is impossible, return `-1`.

---

## 1. Core Concepts & Pattern: Binary Search on Answer

Notice that the input array `arr` is **not sorted**, yet Binary Search solves this in $O(N \log(\text{sum}))$ time. Why? Because the **answer space itself is monotonic**.

### 🔹 Defining the Search Space `[first, last]`

* **Edge Case (`k > arr.length`):** If there are more students than books, at least one student gets zero books $\implies$ return `-1`.
* **Lower Bound (`first = max(arr)`):** Even in the best-case scenario (e.g., $k = N$, 1 book per student), someone must read the thickest book. Thus, the maximum pages cannot be smaller than `Math.max(...arr)`.
* **Upper Bound (`last = sum(arr)`):** In the worst-case scenario ($k = 1$), one student reads all books. Thus, the maximum pages cannot exceed the sum of all elements.

### 🔹 Monotonic Feasibility Function (`isValid`)

If `mid` is our guessed maximum page limit per student:

* Greedily assign contiguous books to the current student while `sum + arr[i] <= mid`.
* Whenever adding the next book exceeds `mid`, assign that book to a **new student** (`numberOfStudent++`) and reset `sum = arr[i]`.
* If `numberOfStudent > k`, `mid` is too small $\implies$ return `false` (need a larger page limit: `first = mid + 1`).
* If `numberOfStudent <= k`, `mid` is valid $\implies$ record `ans = mid` and try to find an even smaller maximum (`last = mid - 1`).

---

## 🌳 Visual Dry Run: `arr = [12, 34, 67, 90]`, `k = 2`

```text
Search Space:
- first = max(12, 34, 67, 90) = 90
- last  = 12 + 34 + 67 + 90  = 203

Step 1: first = 90, last = 203 -> mid = 146
- Student 1: 12 + 34 + 67 = 113 (113 + 90 = 203 > 146 -> switch student)
- Student 2: 90
- Total students used = 2 <= k (Valid!)
- ans = 146, try smaller: last = 145

Step 2: first = 90, last = 145 -> mid = 117
- Student 1: 12 + 34 + 67 = 113 (113 + 90 > 117 -> switch student)
- Student 2: 90
- Total students used = 2 <= k (Valid!)
- ans = 117, try smaller: last = 116

Step 3: first = 90, last = 116 -> mid = 103
- Student 1: 12 + 34 = 46 (46 + 67 = 113 > 103 -> switch student)
- Student 2: 67 (67 + 90 = 157 > 103 -> switch student)
- Student 3: 90 -> numberOfStudent (3) > k (2) -> Invalid!
- Increase limit: first = 104

...Search narrows down until first = 113, last = 113 -> mid = 113:
- Student 1: [12, 34, 67] -> 113 pages
- Student 2: [90]         -> 90 pages
- Valid! ans = 113, last = 112 (Loop terminates)

Final Minimum Possible Maximum Pages: 113

```

---

## 📊 Complexity Analysis

| Metric | Complexity | Explanation |
| --- | --- | --- |
| **Time Complexity** | $O(N \log(\sum \text{arr} - \max(\text{arr})))$ | Binary search takes $\log(\text{range})$ iterations; each calls `isValid` in $O(N)$ |
| **Auxiliary Space** | $O(1)$ | Uses only scalar variables (`first`, `last`, `mid`, `ans`, `sum`) |



