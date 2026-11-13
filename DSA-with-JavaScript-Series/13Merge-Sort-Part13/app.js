/**
 * Merge Sort (Divide & Conquer) | DSA with JavaScript Part 13
 * Time Complexity: O(N log N) | Space Complexity: O(N)
 */

function conquer(arr, first, mid, last) {
  let temp = new Array(last - first + 1);
  let i = first; // Pointer for left sorted subarray [first...mid]
  let j = mid + 1; // Pointer for right sorted subarray [mid+1...last]
  let k = 0; // Pointer for temp array

  // Compare elements from both halves and pick the smaller one
  while (i <= mid && j <= last) {
    if (arr[i] <= arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }

  // Copy any remaining elements from the left half
  while (i <= mid) {
    temp[k++] = arr[i++];
  }

  // Copy any remaining elements from the right half
  while (j <= last) {
    temp[k++] = arr[j++];
  }

  // Copy merged sorted elements back into the original array
  let p = 0;
  let t = first;
  while (p < temp.length) {
    arr[t++] = temp[p++];
  }
}

function divide(arr, first, last) {
  // Base case: 0 or 1 element is already sorted
  if (first >= last) return;

  // Overflow-safe midpoint calculation
  let mid = first + Math.floor((last - first) / 2);

  // Recursively divide left and right halves
  divide(arr, first, mid);
  divide(arr, mid + 1, last);

  // Merge the two sorted halves
  conquer(arr, first, mid, last);
}

// --- Execution & Test Cases ---
let arr = [8, 2, 1, 9, 5, 12, 4, 20];
divide(arr, 0, arr.length - 1);
console.log("Sorted Array:", arr); // [1, 2, 4, 5, 8, 9, 12, 20]

// Edge case: duplicates & negative numbers
let arr2 = [5, -1, 3, 5, 0, -4];
divide(arr2, 0, arr2.length - 1);
console.log("Sorted with Negatives & Duplicates:", arr2); // [-4, -1, 0, 3, 5, 5]
