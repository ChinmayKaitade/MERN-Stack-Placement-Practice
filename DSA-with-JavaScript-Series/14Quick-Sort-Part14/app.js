/**
 * Quick Sort (Divide & Conquer) | DSA with JavaScript Part 14
 * Average Time: O(N log N) | Worst Time: O(N^2) | Space: O(log N) stack
 */

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function findPivotIdx(arr, first, last) {
  let pivot = arr[first];
  let i = first + 1;
  let j = last;

  while (i <= j) {
    // Move i right until an element greater than pivot is found
    while (i <= last && arr[i] <= pivot) i++;

    // Move j left until an element less than or equal to pivot is found
    while (j >= first + 1 && arr[j] > pivot) j--;

    // Swap out-of-place elements
    if (i < j) {
      swap(arr, i, j);
    }
  }

  // Place pivot at its exact sorted position (j)
  swap(arr, j, first);
  return j;
}

function quickSort(arr, first, last) {
  // Base case: 0 or 1 element is already sorted
  if (first >= last) return;

  // Partition array and get pivot's final index
  let pIdx = findPivotIdx(arr, first, last);

  // Recursively sort left and right subarrays
  quickSort(arr, first, pIdx - 1);
  quickSort(arr, pIdx + 1, last);
}

// --- Execution & Test Cases ---
let arr = [19, 3, 17, 24, 1, 87, 22];
quickSort(arr, 0, arr.length - 1);
console.log("Sorted Array:", arr); // [1, 3, 17, 19, 22, 24, 87]

// Edge case: duplicates & negative numbers
let arr2 = [10, -3, 7, 10, 0, -8, 4];
quickSort(arr2, 0, arr2.length - 1);
console.log("Sorted with Negatives & Duplicates:", arr2); // [-8, -3, 0, 4, 7, 10, 10]
