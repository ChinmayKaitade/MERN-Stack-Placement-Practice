# 🔤 Mastering Strings | DSA with JavaScript

Master string internals, immutability, built-in lookup methods, ASCII arithmetic, two-pointer palindrome checks, and frequency hashing.

---

## 📌 Core Concept: String Immutability

In JavaScript, strings are **immutable primitive values**. Once a string is created in memory, its characters cannot be modified in-place by index assignment.

```javascript
let str = "hello";
str[0] = "y"; // Silently fails (or throws TypeError in strict mode)
console.log(str); // "hello" - original string never changes!
```

> Any string method (`toUpperCase()`, `slice()`, `replace()`, etc.) always returns a **brand new string** in memory rather than mutating the original.

---

## 🛠️ String Built-in Methods Cheatsheet

| Method                            | What It Does                                                             | Example                           | Output            |
| --------------------------------- | ------------------------------------------------------------------------ | --------------------------------- | ----------------- |
| `length`                          | Property returning number of characters                                  | `"hello".length`                  | `5`               |
| `charAt(idx)` / `[idx]`           | Gets character at index (`charAt` returns `""` if out of bounds)         | `"js".charAt(0)`                  | `"j"`             |
| `charCodeAt(idx)`                 | Returns ASCII / UTF-16 code of character                                 | `"A".charCodeAt(0)`               | `65`              |
| `String.fromCharCode(code)`       | Converts ASCII code number back to character                             | `String.fromCharCode(65)`         | `"A"`             |
| `slice(start, end)`               | Extracts substring from `start` to `end - 1` (supports negative indices) | `"sheryians".slice(1, 5)`         | `"hery"`          |
| `substring(start, end)`           | Extracts substring (negative indices treated as `0`)                     | `"sheryians".substring(1, 4)`     | `"her"`           |
| `toUpperCase()` / `toLowerCase()` | Converts entire string case                                              | `"abc".toUpperCase()`             | `"ABC"`           |
| `concat(str2)`                    | Combines strings (equivalent to `+`)                                     | `"Hello".concat(" World")`        | `"Hello World"`   |
| `trim()`                          | Removes leading and trailing whitespace                                  | `"  hi  ".trim()`                 | `"hi"`            |
| `indexOf(substr)`                 | Returns first index where match starts (or `-1`)                         | `"banana".indexOf("an")`          | `1`               |
| `lastIndexOf(substr)`             | Returns last index where match starts                                    | `"banana".lastIndexOf("an")`      | `3`               |
| `includes(substr)`                | Boolean check if substring exists                                        | `"javascript".includes("script")` | `true`            |
| `startsWith(prefix)`              | Boolean check if string begins with prefix                               | `"react".startsWith("re")`        | `true`            |
| `endsWith(suffix)`                | Boolean check if string ends with suffix                                 | `"index.js".endsWith(".js")`      | `true`            |
| `replace(old, new)`               | Replaces **first** occurrence of substring                               | `"banana".replace("a", "o")`      | `"bonana"`        |
| `replaceAll(old, new)`            | Replaces **all** occurrences                                             | `"banana".replaceAll("a", "o")`   | `"bonono"`        |
| `split(delimiter)`                | Splits string into array of strings                                      | `"a,b,c".split(",")`              | `["a", "b", "c"]` |

---

## 1. Traversal & Reversal Problems

### 🔹 Problem 1: Print Each Character on a New Line (Normal & Reverse)

Traverse forward ($0 \to \text{length} - 1$) and backward ($\text{length} - 1 \to 0$).

```javascript
let s = "sheryians";

// Forward order
for (let i = 0; i < s.length; i++) {
  console.log(s.charAt(i)); // or s[i]
}

// Reverse order
for (let i = s.length - 1; i >= 0; i--) {
  console.log(s.charAt(i));
}
```

---

### 🔹 Problem 2: Reverse a String

Strings are immutable, so build the reversed string by prepending or using backwards accumulation.

```javascript
let a = "chinmay";
let rev = "";

for (let i = a.length - 1; i >= 0; i--) {
  rev += a.charAt(i);
}

console.log("Reversed:", rev); // "yamnihc"
```

---

## 2. Palindrome Verification

A palindrome reads the exact same forward and backward (e.g., `"madam"`, `"naman"`, `"racecar"`).

### 🔹 Problem 3: Palindrome Check

#### Approach 1: Reverse String Comparison ($O(N)$ Time, $O(N)$ Space)

```javascript
let str = "naman";
let rev = "";

for (let i = str.length - 1; i >= 0; i--) {
  rev += str.charAt(i);
}

console.log(rev === str ? "Palindrome" : "Not a Palindrome");
```

#### Approach 2: Optimized Two-Pointer ($O(N)$ Time, $O(1)$ Space)

Compare characters from outer boundaries moving inward until pointers meet.

```javascript
function isPalindrome(str) {
  let i = 0;
  let j = str.length - 1;

  while (i < j) {
    if (str.charAt(i) !== str.charAt(j)) {
      return false; // Mismatch found early
    }
    i++;
    j--;
  }

  return true;
}

console.log(isPalindrome("malayalam")); // true
console.log(isPalindrome("chinmay")); // false
```

---

## 3. Character Manipulation & ASCII Arithmetic

ASCII code ranges for standard alphabets:

- `'A'` to `'Z'`: `65` to `90`
- `'a'` to `'z'`: `97` to `122`
- Difference: $97 - 65 = 32$.
- Uppercase $\to$ Lowercase: `ch + 32`
- Lowercase $\to$ Uppercase: `ch - 32`

---

### 🔹 Problem 4: Toggle Case of Each Character

Convert every lowercase character to uppercase, and vice versa.

```javascript
let s = "ChInMaY";
let toggle = "";

for (let i = 0; i < s.length; i++) {
  let code = s.charCodeAt(i);

  if (code >= 65 && code <= 90) {
    // Uppercase -> add 32 to become lowercase
    toggle += String.fromCharCode(code + 32);
  } else if (code >= 97 && code <= 122) {
    // Lowercase -> subtract 32 to become uppercase
    toggle += String.fromCharCode(code - 32);
  } else {
    // Keep numbers and symbols unchanged
    toggle += s.charAt(i);
  }
}

console.log("Toggled:", toggle); // "cHiNmAy"
```

---

## 4. Hashing & Frequency Counting

### 🔹 Problem 5: Frequency of Each Character

Count how many times each character appears in a string.

#### Approach 1: Fixed-Size ASCII Array ($O(N)$ Time, $O(1)$ Auxiliary Space)

An array of size `128` maps directly to all standard ASCII codes.

```javascript
let str = "hello";
let freq = new Array(128).fill(0);

// Populate counts
for (let i = 0; i < str.length; i++) {
  let ascii = str.charCodeAt(i);
  freq[ascii]++;
}

// Print results
for (let i = 0; i < freq.length; i++) {
  if (freq[i] > 0) {
    console.log(`${String.fromCharCode(i)} appears ${freq[i]} time(s)`);
  }
}
```

#### Approach 2: Hash Map / Object ($O(N)$ Time, $O(K)$ Space where $K \le 26$)

Flexible for UTF-8 and handles dynamic keys cleanly.

```javascript
let str = "javascript";
let map = {};

for (let char of str) {
  map[char] = (map[char] || 0) + 1;
}

console.log(map); // { j: 1, a: 2, v: 1, s: 1, c: 1, r: 1, i: 1, p: 1, t: 1 }
```
