/**
 * LeetCode 35: Search Insert Position
 * Pattern: Binary Search (Lower Bound)
 * Time Complexity: O(log N) | Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let first = 0;
  let last = nums.length - 1;

  while (first <= last) {
    let mid = first + Math.floor((last - first) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      first = mid + 1;
    } else {
      last = mid - 1;
    }
  }

  // When target is not found, 'first' is the exact insertion index
  return first;
};

// --- Execution & Test Cases ---
console.log("Test 1 (Target found):", searchInsert([1, 3, 5, 6], 5)); // 2
console.log("Test 2 (Insert middle):", searchInsert([1, 3, 5, 6], 2)); // 1
console.log("Test 3 (Insert end):", searchInsert([1, 3, 5, 6], 7)); // 4
console.log("Test 4 (Insert start):", searchInsert([1, 3, 5, 6], 0)); // 0
