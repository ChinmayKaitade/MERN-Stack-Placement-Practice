//  Left rotation by 1 element

// let arr = [1, 2, 3, 4, 5];

// let copy = arr[0];

// for (let i = 0; i < arr.length - 1; i++) {
//   arr[i] = arr[i + 1];
// }

// arr[arr.length - 1] = copy;
// console.log(arr);

// ---

// let arr1 = [1, 2, 3, 4, 5];

// let copy = arr1[arr1.length - 1];

// for (let i = arr1.length - 1; i > 0; i--) {
//   arr1[i] = arr1[i - 1];
// }

// arr1[0] = copy;

// console.log(arr1);

// nested looping

// for (let j = 1; j <= 4; j++) {
//   console.log(j + " Execution");

//   for (let i = 1; i <= 3; i++) {
//     console.log("Hello");
//   }
// }

// Q. Left and right rotation by K element
// Brute force approach
// let arr = [1, 2, 3, 4, 5];
// let k = Number(prompt("Enter K value"));

// k = k % arr.length;
// let count = 0;
// for (let j = 0; j < k; j++) {
//   count++;

//   let copy = arr[0];

//   for (let i = 0; i < arr.length - 1; i++) {
//     arr[i] = arr[i + 1];
//   }
//   arr[arr.length - 1] = copy;
// }
// console.log(arr);
// console.log(count);

// optimized approach
// let arr = [1, 2, 3, 4, 5];
// let temp = new Array(arr.length);

// let k = Number(prompt("Enter k value"));

// k = k % arr.length;

// for (let i = 0; i < arr.length; i++) {
//   temp[i] = arr[(i + k) % arr.length];
// }

// console.log(temp);

// ---

// let arr = [1, 2, 3, 4, 5];
// let k = Number(prompt("Enter a value"));
// k = k % arr.length;

// reverse(0, k - 1);
// reverse(k, arr.length - 1);
// reverse(0, arr.length - 1);

// console.log(arr);

// function reverse(i, j) {
//   while (i < j) {
//     let temp = arr[i];
//     arr[i] = arr[j];
//     arr[j] = temp;
//     i++;
//     j--;
//   }
// }

// ---

// 26. Remove Duplicates from Sorted Array -- Leetcode

// let j = 1;
// for (let i = 0; i < nums.length - 1; i++) {
//   if (nums[i] != nums[i + 1]) {
//     nums[j] = nums[i + 1];
//     j++;
//   }
// }
// return j;

// Q. Merge sorted array

// let arr1 = [2, 5, 6];
// let arr2 = [1, 3, 4, 8];

// let merge = new Array(arr1.length + arr2.length);

// let i = 0,
//   j = 0,
//   k = 0;

// while (i < arr1.length && arr2.length) {
//   if (arr1[i] < arr2[j]) {
//     merge[k++] = arr1[i++];
//   } else {
//     merge[k++] = arr2[j++];
//   }
// }

// while (j < arr2.length) {
//   merge[k++] = arr2[j++];
// }

// while (i < arr1.length) {
//   merge[k++] = arr1[i++];
// }

// console.log(merge);

// Q. Best time to buy and sell stocks
// 121. Best Time to Buy and Sell Stock -- Leetcode
// let maxProfit = 0;
// let min = prices[0];

// for (let i = 0; i < prices.length; i++) {
//   if (prices[i] < min) min = prices[i];
//   let profit = prices[i] - min;
//   maxProfit = Math.max(maxProfit, profit);
// }
// return maxProfit;

// Q. Sort the color
// 75. Sort Colors -- Leetcode

// Q. Maximum Subarray/Kadane's algorithm
// 53. Maximum Subarray -- Leetcode
// let max = -Infinity;
// let sum = 0;

// for (let i = 0; i < nums.length; i++) {
//   sum += nums[i];
//   max = Math.max(max, sum);
//   if (sum < 0) sum = 0;
// }
// return max;

// Q. Majority Element/Moore's voting algo
// 169. Majority Element -- Leetcode
// let ans = nums[0];
// let count = 1;

// for (let i = 1; i < nums.length; i++) {
//   if (count == 0) {
//     ans = nums[i];
//     count = 1;
//   } else if (ans == nums[i]) count++;
//   else count--;
// }
// return ans;

// Q. Trapping Rain Water
// 42. Trapping Rain Water -- Leetcode
// let left = new Array(height.length);
// let right = new Array(height.length);

// let maxLeft = height[0],
//   maxRight = height[height.length - 1];
// ((left[0] = maxLeft), (right[right.length - 1] = maxRight));

// for (let i = 1; i < height.length; i++) {
//   maxLeft = Math.max(height[i], maxLeft);
//   left[i] = maxLeft;
// }

// for (let i = height.length - 2; i >= 0; i--) {
//   maxRight = Math.max(height[i], maxRight);
//   right[i] = maxRight;
// }

// let ans = 0;

// for (let i = 0; i < height.length; i++) {
//   ans += Math.min(left[i], right[i]) - height[i];
// }
// return ans;
