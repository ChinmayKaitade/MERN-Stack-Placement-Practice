/**
 * Mastering Arrays | DSA with JavaScript Part 05
 * Complete runnable reference: Traversals, Extremes, Second Extremes, In-place Reversal, and Partitioning.
 */

// 1. Sum of Elements
function getArraySum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
  return sum;
}
console.log("1. Sum:", getArraySum([10, 20, 30, 40, 50])); // 150

// 2. Max and Min
function getMaxAndMin(arr) {
  let max = arr[0],
    min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
  }
  return { max, min };
}
console.log("2. Max & Min:", getMaxAndMin([10, 2, 78, 13, 4])); // { max: 78, min: 2 }

// 3. Second Max
function getSecondMax(arr) {
  let max = -Infinity,
    sMax = -Infinity;
  for (let num of arr) {
    if (num > max) {
      sMax = max;
      max = num;
    } else if (num > sMax && num !== max) {
      sMax = num;
    }
  }
  return sMax === -Infinity ? null : sMax;
}
console.log("3. Second Max:", getSecondMax([10, 30, 56, 43, 29, 64, 60])); // 60

// 4. Second Min
function getSecondMin(arr) {
  let min = Infinity,
    sMin = Infinity;
  for (let num of arr) {
    if (num < min) {
      sMin = min;
      min = num;
    } else if (num < sMin && num !== min) {
      sMin = num;
    }
  }
  return sMin === Infinity ? null : sMin;
}
console.log("4. Second Min:", getSecondMin([10, 2, 78, 13, 4])); // 4

// 5. In-Place Reversal (while left < right)
function reverseInPlace(arr) {
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  return arr;
}
console.log("5. In-Place Reverse:", reverseInPlace([10, 20, 30, 40, 50])); // [50, 40, 30, 20, 10]

// 6. Move Zeros Left and Ones Right
function moveZerosToLeft(arr) {
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      j++;
    }
  }
  return arr;
}
console.log("6. Zeros to Left:", moveZerosToLeft([1, 1, 0, 1, 0, 1, 1, 0, 0])); // [0, 0, 0, 0, 1, 1, 1, 1, 1]

// 7. Segregate Negative to Left, Positive to Right
function segregatePosNeg(arr) {
  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      j++;
    }
  }
  return arr;
}
console.log(
  "7. Negatives Left, Positives Right:",
  segregatePosNeg([12, -7, 5, -3, -2, 10, -9, 8]),
);
// [-7, -3, -2, -9, 12, 10, 5, 8]
