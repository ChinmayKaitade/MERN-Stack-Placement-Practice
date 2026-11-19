# 🔍 LeetCode 33: Search in Rotated Sorted Array | Binary Search

Given an integer array `nums` sorted in ascending order (with distinct values) that is rotated at an unknown pivot index, and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not.

You must write an algorithm with **$O(\log N)$** runtime complexity.

---

## 1. Core Concepts & Intuition

### 🔹 The Golden Property of Rotated Sorted Arrays

When you pick any midpoint `m` in a rotated sorted array, **at least one of the two halves (`[first ... m]` or `[m ... last]`) is guaranteed to be strictly sorted**.

1. **Identify the Sorted Half:**

- If `nums[first] <= nums[m]`: The **left half** (`first` to `m`) is sorted.
- Otherwise (`nums[first] > nums[m]`): The **right half** (`m` to `last`) is sorted.

2. **Check If `target` Lies Inside That Sorted Half:**

- Since one half is strictly sorted, you can check in $O(1)$ time whether `target` falls within its `[min, max]` range:
- **Left half sorted:** Is `target >= nums[first] && target < nums[m]`?
- Yes $\implies$ Search left (`last = m - 1`).
- No $\implies$ Search right (`first = m + 1`).

- **Right half sorted:** Is `target > nums[m] && target <= nums[last]`?
- Yes $\implies$ Search right (`first = m + 1`).
- No $\implies$ Search left (`last = m - 1`).

---

## 🌳 Visual Dry Run: `nums = [4, 5, 6, 7, 0, 1, 2]`, `target = 0`

```text
Indices:   0   1   2   3   4   5   6
Values:  [ 4,  5,  6,  7,  0,  1,  2 ]

Step 1: first = 0, last = 6 -> m = 3 (nums[3] = 7)
- nums[3] !== 0
- Is left half sorted? nums[0] (4) <= nums[3] (7) -> YES ([4, 5, 6, 7] is sorted)
- Is target (0) between 4 and 7? NO -> Discard left half: first = m + 1 = 4.

Step 2: first = 4, last = 6 -> m = 5 (nums[5] = 1)
- nums[5] !== 0
- Is left half sorted? nums[4] (0) <= nums[5] (1) -> YES ([0, 1] is sorted)
- Is target (0) between 0 and 1? YES -> Discard right half: last = m - 1 = 4.

Step 3: first = 4, last = 4 -> m = 4 (nums[4] = 0)
- nums[4] === 0 -> Match found! Return 4.

```

---

## 📊 Complexity Analysis

| Metric              | Complexity  | Explanation                                                         |
| ------------------- | ----------- | ------------------------------------------------------------------- |
| **Time Complexity** | $O(\log N)$ | Half of the remaining search space is eliminated in every iteration |
| **Auxiliary Space** | $O(1)$      | Only uses scalar pointers (`first`, `last`, `m`)                    |
