/**
 * LeetCode 875: Koko Eating Bananas
 * Pattern: Binary Search on Answer Space
 * Time Complexity: O(N * log(max(piles))) | Space Complexity: O(1)
 */

/**
 * Helper to check if Koko can finish all piles within `h` hours at `speed`
 * @param {number[]} pile
 * @param {number} speed
 * @param {number} h
 * @return {boolean}
 */
var isValid = function (pile, speed, h) {
  let totalHour = 0;

  for (let i = 0; i < pile.length; i++) {
    totalHour += Math.ceil(pile[i] / speed);
    if (totalHour > h) return false; // Early exit once hours exceed h
  }

  return true;
};

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  let first = 1;
  let last = 0;
  let ans = -1;

  for (let i = 0; i < piles.length; i++) {
    last = Math.max(piles[i], last);
  }

  while (first <= last) {
    let mid = first + Math.floor((last - first) / 2);

    if (isValid(piles, mid, h)) {
      ans = mid;
      last = mid - 1; // Speed works, try finding a smaller valid speed
    } else {
      first = mid + 1; // Too slow, increase eating speed
    }
  }

  return ans;
};

// --- Execution & Test Cases ---
console.log("Test 1 [3, 6, 7, 11], h=8:", minEatingSpeed([3, 6, 7, 11], 8)); // 4
console.log(
  "Test 2 [30, 11, 23, 4, 20], h=5:",
  minEatingSpeed([30, 11, 23, 4, 20], 5),
); // 30
console.log(
  "Test 3 [30, 11, 23, 4, 20], h=6:",
  minEatingSpeed([30, 11, 23, 4, 20], 6),
); // 23
