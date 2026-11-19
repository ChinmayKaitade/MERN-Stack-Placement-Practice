/**
 * Cyclic Sort | DSA with JavaScript Part 15
 * 1. Standard Cyclic Sort (Range: 1 to N)
 * 2. LeetCode 268: Missing Number (Range: 0 to N)
 * 3. LeetCode 448: Find All Numbers Disappeared in an Array (Range: 1 to N with Duplicates)
 * Time Complexity: O(N) | Space Complexity: O(1) extra space
 */

// ==========================================
// 1. STANDARD CYCLIC SORT (RANGE: 1 TO N)
// ==========================================
function cyclicSort(arr) {
  let i = 0;

  while (i < arr.length) {
    let correctIdx = arr[i] - 1;
    if (arr[i] !== arr[correctIdx]) {
      let temp = arr[i];
      arr[i] = arr[correctIdx];
      arr[correctIdx] = temp;
    } else {
      i++;
    }
  }

  return arr;
}

console.log("=== 1. Standard Cyclic Sort (1 to N) ===");
console.log(
  "Sorted [7, 5, 8, 2, 1, 4, 3, 6]:",
  cyclicSort([7, 5, 8, 2, 1, 4, 3, 6]),
);
// Output: [1, 2, 3, 4, 5, 6, 7, 8]

// ==========================================
// 2. LEETCODE 268: MISSING NUMBER (RANGE: 0 TO N)
// ==========================================
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let i = 0;

  while (i < nums.length) {
    let correctIdx = nums[i];
    if (nums[i] < nums.length && nums[i] !== nums[correctIdx]) {
      let temp = nums[i];
      nums[i] = nums[correctIdx];
      nums[correctIdx] = temp;
    } else {
      i++;
    }
  }

  for (let j = 0; j < nums.length; j++) {
    if (j !== nums[j]) return j;
  }

  return nums.length;
};

console.log("\n=== 2. LeetCode 268: Missing Number ===");
console.log("Test 1 [3, 0, 1]:", missingNumber([3, 0, 1])); // 2
console.log("Test 2 [0, 1]:", missingNumber([0, 1])); // 2
console.log(
  "Test 3 [9, 6, 4, 2, 3, 5, 7, 0, 1]:",
  missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]),
); // 8

// ==========================================
// 3. LEETCODE 448: DISAPPEARED NUMBERS (RANGE: 1 TO N)
// ==========================================
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  let i = 0;

  while (i < nums.length) {
    let correctIdx = nums[i] - 1;
    if (nums[i] !== nums[correctIdx]) {
      let temp = nums[i];
      nums[i] = nums[correctIdx];
      nums[correctIdx] = temp;
    } else {
      i++;
    }
  }

  let ans = [];
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== j + 1) {
      ans.push(j + 1);
    }
  }

  return ans;
};

console.log("\n=== 3. LeetCode 448: Find All Disappeared Numbers ===");
console.log(
  "Test 1 [4, 3, 2, 7, 8, 2, 3, 1]:",
  findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]),
); // [5, 6]
console.log("Test 2 [1, 1]:", findDisappearedNumbers([1, 1])); // [2]
console.log("Test 3 [1, 2, 3]:", findDisappearedNumbers([1, 2, 3])); // []
