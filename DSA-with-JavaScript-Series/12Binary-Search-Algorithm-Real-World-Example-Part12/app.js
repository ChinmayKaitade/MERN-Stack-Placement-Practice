/**
 * Binary Search | DSA with JavaScript Part 12
 * Iterative and Recursive Binary Search implementations with test cases.
 */

// ==========================================
// 1. ITERATIVE BINARY SEARCH
// ==========================================
function binarySearch(arr, target) {
  let first = 0;
  let last = arr.length - 1;

  while (first <= last) {
    // Overflow-safe midpoint calculation
    let mid = first + Math.floor((last - first) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      last = mid - 1;
    } else {
      first = mid + 1;
    }
  }

  return -1;
}

// ==========================================
// 2. RECURSIVE BINARY SEARCH
// ==========================================
function binarySearchRecursive(arr, first, last, target) {
  if (first > last) return -1;

  let mid = first + Math.floor((last - first) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] > target)
    return binarySearchRecursive(arr, first, mid - 1, target);
  return binarySearchRecursive(arr, mid + 1, last, target);
}

// ==========================================
// 3. EXECUTION & TEST RUNS
// ==========================================
const arr = [2, 5, 8, 9, 12, 18, 20, 25, 67, 101, 125];

console.log("=== Testing Iterative Binary Search ===");
const targetFound = 67;
const index1 = binarySearch(arr, targetFound);
if (index1 === -1) {
  console.log(`Target ${targetFound}: Not Found!`);
} else {
  console.log(`Target ${targetFound}: Found at Index ${index1}`);
}

const targetNotFound = 100;
const index2 = binarySearch(arr, targetNotFound);
if (index2 === -1) {
  console.log(`Target ${targetNotFound}: Not Found!`);
} else {
  console.log(`Target ${targetNotFound}: Found at Index ${index2}`);
}

console.log("\n=== Testing Recursive Binary Search ===");
console.log(
  "Searching 125:",
  binarySearchRecursive(arr, 0, arr.length - 1, 125),
); // 10
console.log("Searching 2:", binarySearchRecursive(arr, 0, arr.length - 1, 2)); // 0
console.log("Searching 50:", binarySearchRecursive(arr, 0, arr.length - 1, 50)); // -1
