/**
 * Mastering Strings | DSA with JavaScript
 * Complete runnable reference: Built-ins, Traversal, Reversal, Palindrome, Case Toggle, and Frequency Hashing.
 */

// 1. Built-in Methods Demo
console.log("--- 1. String Built-in Methods ---");
let sample = "  sheryians coding school  ";
console.log("Original:", sample);
console.log("Trimmed:", sample.trim());
console.log("Slice(2, 11):", sample.trim().slice(0, 9));
console.log("Uppercase:", sample.trim().toUpperCase());
console.log("Includes 'code':", sample.includes("code"));
console.log("Replace all spaces with '-':", sample.trim().replaceAll(" ", "-"));

// 2. Reverse a String
console.log("\n--- 2. Reverse String ---");
function reverseString(str) {
  let rev = "";
  for (let i = str.length - 1; i >= 0; i--) {
    rev += str.charAt(i);
  }
  return rev;
}
console.log("Reverse of 'chinmay':", reverseString("chinmay")); // "yamnihc"

// 3. Two-Pointer Palindrome Check (O(1) Space)
console.log("\n--- 3. Palindrome Check ---");
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str.charAt(left) !== str.charAt(right)) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
console.log("'racecar' is Palindrome?:", isPalindrome("racecar")); // true
console.log("'hello' is Palindrome?:", isPalindrome("hello"));     // false

// 4. Toggle Character Case using ASCII
console.log("\n--- 4. Toggle Character Case ---");
function toggleCase(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      result += String.fromCharCode(code + 32);
    } else if (code >= 97 && code <= 122) {
      result += String.fromCharCode(code - 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}
console.log("Toggled 'Hello World':", toggleCase("Hello World")); // "hELLO wORLD"

// 5. Frequency of Each Character (ASCII Array)
console.log("\n--- 5. Frequency Map (ASCII Array) ---");
function printFrequencies(str) {
  let asciiCounts = new Array(128).fill(0);

  for (let i = 0; i < str.length; i++) {
    asciiCounts[str.charCodeAt(i)]++;
  }

  for (let i = 0; i < asciiCounts.length; i++) {
    if (asciiCounts[i] > 0) {
      console.log(`'${String.fromCharCode(i)}' -> ${asciiCounts[i]}`);
    }
  }
}
printFrequencies("hello");