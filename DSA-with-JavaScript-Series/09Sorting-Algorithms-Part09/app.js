/**
 * Sorting Algorithms - Part 1 | DSA with JavaScript Part 09
 * Bubble Sort, Selection Sort, and Insertion Sort implementations with dry-run tests.
 */

// 1. Optimized Bubble Sort
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

// 2. Selection Sort
function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = temp;
    }
  }
  return arr;
}

// 3. Insertion Sort
function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// --- Verification & Test Runs ---
console.log("=== Bubble Sort ===");
console.log("Result:", bubbleSort([10, 5, 12, 1, 3])); // [1, 3, 5, 10, 12]

console.log("\n=== Selection Sort ===");
console.log("Result:", selectionSort([10, 5, 12, 1, 3])); // [1, 3, 5, 10, 12]

console.log("\n=== Insertion Sort ===");
console.log("Result:", insertionSort([10, 5, 12, 1, 3])); // [1, 3, 5, 10, 12]
