# 🚀 Mastering Advance Array Problems | DSA with JavaScript Part 06

High-frequency interview problems on arrays: cyclic shifts, in-place pointer manipulation, prefix tracking, and dynamic window mechanics.

---

## 📌 Summary Table

| Problem                           | Key Technique / Algorithm                        | Time Complexity | Space Complexity |
| --------------------------------- | ------------------------------------------------ | --------------- | ---------------- |
| **Rotate Array by 1 / $K$**       | In-place Reversal Algorithm / Modular arithmetic | $O(N)$          | $O(1)$           |
| **Remove Duplicates**             | Slow & Fast Two-Pointers                         | $O(N)$          | $O(1)$           |
| **Merge Sorted Arrays**           | Three-Pointer Merge (Reverse Fill)               | $O(M + N)$      | $O(1)$           |
| **Best Time to Buy & Sell Stock** | Running Minimum & Peak Difference                | $O(N)$          | $O(1)$           |
| **Sort Colors (0, 1, 2)**         | Dutch National Flag Algorithm (3 Pointers)       | $O(N)$          | $O(1)$           |
| **Maximum Subarray**              | Kadane's Algorithm (Reset on negative sum)       | $O(N)$          | $O(1)$           |
| **Majority Element**              | Boyer-Moore Voting Algorithm                     | $O(N)$          | $O(1)$           |
| **Trapping Rain Water**           | Prefix Max & Suffix Max Arrays / Two Pointers    | $O(N)$          | $O(N)$ or $O(1)$ |

---

## 1. Array Rotations (Left & Right)

### 🔹 1. Left & Right Rotation by 1 Element

#### Left Rotate by 1

- Save the first element (`arr[0]`).
- Shift all elements left by 1 position: `arr[i] = arr[i + 1]`.
- Place the saved element at `arr[arr.length - 1]`.

```javascript
function leftRotateByOne(arr) {
  let first = arr[0];
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr[i + 1];
  }
  arr[arr.length - 1] = first;
  return arr;
}
```

#### Right Rotate by 1

- Save the last element (`arr[arr.length - 1]`).
- Shift all elements right by 1 position: `arr[i] = arr[i - 1]`.
- Place the saved element at `arr[0]`.

```javascript
function rightRotateByOne(arr) {
  let last = arr[arr.length - 1];
  for (let i = arr.length - 1; i > 0; i--) {
    arr[i] = arr[i - 1];
  }
  arr[0] = last;
  return arr;
}
```

---

### 🔹 2. Left & Right Rotation by $K$ Elements

Always normalize rotations using modulo: `k = k % n`.

#### The 3-Step In-Place Reversal Algorithm ($O(N)$ Time, $O(1)$ Space)

```
For Left Rotation by K:
  [1, 2, 3, 4, 5], k = 2  -->  Expected: [3, 4, 5, 1, 2]
  1. Reverse 0 to k - 1:       [2, 1, 3, 4, 5]
  2. Reverse k to n - 1:       [2, 1, 5, 4, 3]
  3. Reverse entire array:     [3, 4, 5, 1, 2]

For Right Rotation by K:
  [1, 2, 3, 4, 5], k = 2  -->  Expected: [4, 5, 1, 2, 3]
  1. Reverse entire array:     [5, 4, 3, 2, 1]
  2. Reverse 0 to k - 1:       [4, 5, 3, 2, 1]
  3. Reverse k to n - 1:       [4, 5, 1, 2, 3]

```

```javascript
function reverse(arr, left, right) {
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
}

// In-place Left Rotation by K
function rotateLeft(arr, k) {
  let n = arr.length;
  k = k % n;
  reverse(arr, 0, k - 1);
  reverse(arr, k, n - 1);
  reverse(arr, 0, n - 1);
  return arr;
}

// In-place Right Rotation by K (LeetCode 189)
function rotateRight(arr, k) {
  let n = arr.length;
  k = k % n;
  reverse(arr, 0, n - 1);
  reverse(arr, 0, k - 1);
  reverse(arr, k, n - 1);
  return arr;
}
```

---

## 2. In-Place Deduplication & Merging

### 🔹 3. Remove Duplicates from Sorted Array (LeetCode 26)

- Maintain a write pointer `j = 1`.
- Iterate read pointer `i` through the array.
- Whenever `nums[i] !== nums[i + 1]`, write `nums[i + 1]` into `nums[j]` and increment `j`.

```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let j = 1;

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] !== nums[i + 1]) {
      nums[j] = nums[i + 1];
      j++;
    }
  }
  return j; // Count of unique elements
}
```

---

### 🔹 4. Merge Sorted Array (LeetCode 88)

When merging `nums2` (size $N$) into `nums1` (allocated size $M + N$ with trailing zeros), fill from the back using three pointers to prevent overwriting unmerged values:

```javascript
function merge(nums1, m, nums2, n) {
  let i = m - 1; // Last valid element in nums1
  let j = n - 1; // Last element in nums2
  let k = m + n - 1; // Insertion index at the end of nums1

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }

  // Copy remaining nums2 elements if any remain
  while (j >= 0) {
    nums1[k--] = nums2[j--];
  }
}
```

---

## 3. Greedy & Partition Algorithms

### 🔹 5. Best Time to Buy and Sell Stock (LeetCode 121)

Track the minimum purchase price seen so far and check potential profit at each step.

```javascript
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let price of prices) {
    if (price < minPrice) {
      minPrice = price; // Lowest buying opportunity
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }

  return maxProfit;
}
```

---

### 🔹 6. Sort Colors / Dutch National Flag (LeetCode 75)

Segregate an array of `0`s (red), `1`s (white), and `2`s (blue) in a single pass with 3 pointers:

- `low`: marks the boundary for `0`s
- `mid`: current element scanner
- `high`: marks the boundary for `2`s

```javascript
function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
      // Do not increment mid here: swapped element from high must be evaluated
    }
  }
}
```

---

### 🔹 7. Maximum Subarray / Kadane's Algorithm (LeetCode 53)

Find the contiguous subarray with the largest sum.

- Add each element to the running `sum`.
- Update `maxSum = Math.max(maxSum, sum)`.
- If `sum < 0`, reset `sum = 0` (a negative prefix will only decrease future subarray sums).

```javascript
function maxSubArray(nums) {
  let maxSum = -Infinity;
  let sum = 0;

  for (let num of nums) {
    sum += num;
    maxSum = Math.max(maxSum, sum);
    if (sum < 0) {
      sum = 0;
    }
  }

  return maxSum;
}
```

---

### 🔹 8. Majority Element / Boyer-Moore Voting Algorithm (LeetCode 169)

Find the element that appears more than $\lfloor N / 2 \rfloor$ times.

- Elements cancel each other out in pairs.
- The majority element will always survive with a count $\ge 1$.

```javascript
function majorityElement(nums) {
  let candidate = nums[0];
  let count = 0;

  for (let num of nums) {
    if (count === 0) {
      candidate = num;
      count = 1;
    } else if (num === candidate) {
      count++;
    } else {
      count--;
    }
  }

  return candidate;
}
```

---

## 4. Hard Classical Problems

### 🔹 9. Trapping Rain Water (LeetCode 42)

Water trapped above any index `i` is determined by:

$$\text{Water}[i] = \min(\text{maxLeft}[i], \text{maxRight}[i]) - \text{height}[i]$$

#### Method 1: Prefix and Suffix Arrays ($O(N)$ Time, $O(N)$ Space)

```javascript
function trapPrefixSuffix(height) {
  let n = height.length;
  if (n === 0) return 0;

  let leftMax = new Array(n);
  let rightMax = new Array(n);

  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  let totalWater = 0;
  for (let i = 0; i < n; i++) {
    totalWater += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return totalWater;
}
```

#### Method 2: Two-Pointer Space Optimized ($O(N)$ Time, $O(1)$ Space)

```javascript
function trap(height) {
  let left = 0,
    right = height.length - 1;
  let leftMax = 0,
    rightMax = 0;
  let totalWater = 0;

  while (left < right) {
    if (height[left] <= height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        totalWater += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        totalWater += rightMax - height[right];
      }
      right--;
    }
  }

  return totalWater;
}
```
