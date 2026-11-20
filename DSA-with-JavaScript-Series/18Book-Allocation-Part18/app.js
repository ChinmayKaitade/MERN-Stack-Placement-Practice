/**
 * Allocate Minimum Pages (Book Allocation Problem) - GFG
 * Pattern: Binary Search on Answer Space
 * Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
 */

function isValid(arr, mid, k) {
  let numberOfStudent = 1;
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] + sum > mid) {
      numberOfStudent++;
      sum = arr[i];

      if (numberOfStudent > k) return false;
    } else {
      sum += arr[i];
    }
  }

  return true;
}

class Solution {
  /**
   * @param {number[]} arr
   * @param {number} k
   * @returns {number}
   */
  findPages(arr, k) {
    // Impossible to allocate at least 1 book to each student
    if (k > arr.length) return -1;

    let first = 0;
    let last = 0;
    let ans = -1;

    for (let i = 0; i < arr.length; i++) {
      first = Math.max(arr[i], first);
      last += arr[i];
    }

    while (first <= last) {
      let mid = first + Math.floor((last - first) / 2);

      if (isValid(arr, mid, k)) {
        ans = mid;
        last = mid - 1; // Try to minimize the maximum pages further
      } else {
        first = mid + 1; // Page limit too tight, increase capacity
      }
    }

    return ans;
  }
}

// --- Execution & Test Cases ---
const sol = new Solution();
console.log(
  "Test 1 [12, 34, 67, 90], k=2:",
  sol.findPages([12, 34, 67, 90], 2),
); // 113
console.log("Test 2 [15, 17, 20], k=5:", sol.findPages([15, 17, 20], 5)); // -1 (k > N)
console.log("Test 3 [22, 23, 67], k=1:", sol.findPages([22, 23, 67], 1)); // 112 (1 student reads all)
console.log(
  "Test 4 [10, 20, 30, 40], k=2:",
  sol.findPages([10, 20, 30, 40], 2),
); // 60
