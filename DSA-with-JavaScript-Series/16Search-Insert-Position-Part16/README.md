# 🔍 LeetCode 35: Search Insert Position | Binary Search

Given a sorted array of distinct integers `nums` and a `target` value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with **$O(\log N)$** runtime complexity.

---

## 1. Core Concepts & Intuition

### 🔹 Why Returning `first` Works When Target Is Missing

In standard Binary Search, if `target` is not present in `nums`, the `while (first <= last)` loop terminates at the exact moment `first` crosses `last` (`first = last + 1`):

- Everything to the **left of `first**` (`0 ... first - 1`) is strictly **less than `target\*\*`.
- Everything to the **right of `last**` (`last + 1 ... n - 1`, which starts at `first`) is strictly **greater than `target\*\*`.

Therefore, **`first` always lands on the exact insertion index** (also known as the **Lower Bound** — the first index where `nums[index] >= target`).

---

## 2. Step-by-Step Algorithm

1. Initialize two pointers: `first = 0` and `last = nums.length - 1`.
2. Loop while `first <= last`:

- Compute `mid = first + Math.floor((last - first) / 2)`.
- If `nums[mid] === target`, return `mid` immediately.
- If `nums[mid] < target`, discard the left half (`first = mid + 1`).
- Else (`nums[mid] > target`), discard the right half (`last = mid - 1`).

3. If the loop finishes without finding `target`, return `first`.

---

## 🌳 Visual Dry Runs: `nums = [1, 3, 5, 6]`

### Case 1: Target Exists (`target = 5`)

```text
Indices:   0   1   2   3
Values:  [ 1,  3,  5,  6 ]

Step 1: first = 0, last = 3 -> mid = 1 (nums[1] = 3 < 5) -> first = 2
Step 2: first = 2, last = 3 -> mid = 2 (nums[2] = 5 === 5) -> Return 2!

```

---

### Case 2: Target Inserted in the Middle (`target = 2`)

```text
Indices:   0   1   2   3
Values:  [ 1,  3,  5,  6 ]

Step 1: first = 0, last = 3 -> mid = 1 (nums[1] = 3 > 2) -> last = 0
Step 2: first = 0, last = 0 -> mid = 0 (nums[0] = 1 < 2) -> first = 1
Loop ends because first (1) > last (0).
Return first = 1!  --> Array becomes [1, (2), 3, 5, 6]

```

---

### Case 3: Target Inserted at the End (`target = 7`)

```text
Indices:   0   1   2   3
Values:  [ 1,  3,  5,  6 ]

Step 1: first = 0, last = 3 -> mid = 1 (nums[1] = 3 < 7) -> first = 2
Step 2: first = 2, last = 3 -> mid = 2 (nums[2] = 5 < 7) -> first = 3
Step 3: first = 3, last = 3 -> mid = 3 (nums[3] = 6 < 7) -> first = 4
Loop ends because first (4) > last (3).
Return first = 4!  --> Array becomes [1, 3, 5, 6, (7)]

```

---

### Case 4: Target Inserted at the Start (`target = 0`)

```text
Indices:   0   1   2   3
Values:  [ 1,  3,  5,  6 ]

Step 1: first = 0, last = 3 -> mid = 1 (nums[1] = 3 > 0) -> last = 0
Step 2: first = 0, last = 0 -> mid = 0 (nums[0] = 1 > 0) -> last = -1
Loop ends because first (0) > last (-1).
Return first = 0!  --> Array becomes [(0), 1, 3, 5, 6]

```

---

## 📊 Complexity Analysis

| Metric              | Complexity  | Explanation                                                       |
| ------------------- | ----------- | ----------------------------------------------------------------- |
| **Time Complexity** | $O(\log N)$ | Search space is halved on every iteration                         |
| **Auxiliary Space** | $O(1)$      | Uses only three scalar pointer variables (`first`, `last`, `mid`) |
