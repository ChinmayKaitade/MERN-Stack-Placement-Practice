/**
 * LeetCode 33: Search in Rotated Sorted Array
 * Pattern: Modified Binary Search (Identify Sorted Half)
 * Time Complexity: O(log N) | Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let first = 0;
  let last = nums.length - 1;

  while (first <= last) {
    let m = first + Math.floor((last - first) / 2);

    if (nums[m] === target) return m;

    // Case 1: Left half [first...m] is strictly sorted
    if (nums[first] <= nums[m]) {
      if (target >= nums[first] && target < nums[m]) {
        last = m - 1;
      } else {
        first = m + 1;
      }
    }
    // Case 2: Right half [m...last] is strictly sorted
    else {
      if (target > nums[m] && target <= nums[last]) {
        first = m + 1;
      } else {
        last = m - 1;
      }
    }
  }

  return -1;
};

// --- Execution & Test Cases ---
console.log("Test 1 (Target 0):", search([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log("Test 2 (Target 3):", search([4, 5, 6, 7, 0, 1, 2], 3)); // -1
console.log("Test 3 (Single element):", search([1], 0)); // -1
console.log("Test 4 (Rotated at pivot 1):", search([3, 1], 1)); // 1
