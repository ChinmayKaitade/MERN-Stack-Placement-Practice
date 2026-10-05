# 🌟 Pattern Programming | DSA with JavaScript Part 04

Mastering nested loops, 2D matrix coordinate thinking (`row, col`), ASCII character transformations, and symmetry logic in modern JavaScript.

---

## 💡 The Universal Formula for Patterns

Every pattern question is essentially a 2D grid matrix problem governed by three simple questions:

1. **Outer loop (`i`):** How many total rows are there?
2. **Inner loop (`j`):** For the current row `i`, how many columns (spaces or characters) do we need to print?
3. **Print action:** What needs to be printed? (stars, indices, alphabet chars, or conditional boundary checks).

> **Node.js Terminal Printing Note:**
> In Node.js, `console.log()` automatically adds a newline at the end. To print inline characters side-by-side on the same line, use `process.stdout.write()`. To break to a new line after each row, call `console.log()`.

---

## 📌 Pattern Catalog & Logic Breakdown

### 🔹 Pattern 1: Single Line Horizontal Stars

```text
******

```

- **Logic:** Single loop iterating from $1 \to N$.

```javascript
for (let i = 1; i <= n; i++) {
  process.stdout.write("* ");
}
console.log();
```

---

### 🔹 Pattern 2: Solid Square Grid ($N \times N$)

```text
* * * *
* * * *
* * * *
* * * *

```

- **Outer loop (`i`):** Runs $N$ times (rows).
- **Inner loop (`j`):** Runs $N$ times for each row (columns).

```javascript
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    process.stdout.write("* ");
  }
  console.log();
}
```

---

### 🔹 Pattern 3: Right Angled Triangle (Stars)

```text
*
* *
* * *
* * * *

```

- **Logic:** In row `i`, print exactly `i` stars.

```javascript
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    process.stdout.write("* ");
  }
  console.log();
}
```

---

### 🔹 Pattern 4: Right Angled Triangle (Numbers)

```text
1
1 2
1 2 3
1 2 3 4

```

- **Logic:** In row `i`, print column numbers $1 \to i$.

```javascript
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    process.stdout.write(j + " ");
  }
  console.log();
}
```

---

### 🔹 Pattern 5: Right Angled Triangle (Alphabet Letters)

```text
A
A B
A B C
A B C D

```

- **Logic:** ASCII value of `'A'` is `65`. Reset ASCII to `65` at each new row and increment column-wise using `String.fromCharCode(ascii)`.

```javascript
for (let i = 1; i <= n; i++) {
  let ascii = 65; // 'A'
  for (let j = 1; j <= i; j++) {
    process.stdout.write(String.fromCharCode(ascii) + " ");
    ascii++;
  }
  console.log();
}
```

---

### 🔹 Pattern 6: Inverted Right Angled Triangle

```text
* * * *
* * *
* *
*

```

- **Logic:** At row `i`, total stars count is $N - i + 1$ (or decrement $j$ from $N$ down to $i$).

```javascript
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n - i + 1; j++) {
    process.stdout.write("* ");
  }
  console.log();
}
```

---

### 🔹 Pattern 7: Mirror / Right-Aligned Triangle (Spaces + Stars)

```text
      *
    * *
  * * *
* * * *

```

- **Step 1 (Spaces):** For row `i`, print $(N - i)$ double spaces.
- **Step 2 (Stars):** Print `i` stars with space.

```javascript
for (let i = 1; i <= n; i++) {
  // Leading spaces
  for (let j = 1; j <= n - i; j++) {
    process.stdout.write("  ");
  }
  // Stars
  for (let j = 1; j <= i; j++) {
    process.stdout.write("* ");
  }
  console.log();
}
```

---

### 🔹 Pattern 8: The 'X' Pattern (Cross Diagonal)

```text
*       *
  *   *
    *
  *   *
*       *

```

- **Logic:** In an $N \times N$ matrix, print a star only on:
- **Main Diagonal:** `i === j`
- **Anti-Diagonal:** `i + j === n + 1`
- Otherwise print double spaces `"  "`.

```javascript
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    if (i === j || i + j === n + 1) {
      process.stdout.write("* ");
    } else {
      process.stdout.write("  ");
    }
  }
  console.log();
}
```

---

### 🔹 Pattern 9: Inverted 'V' Shape

```text
*       *
 *     *
  *   *
    *

```

- **Logic:** Matrix width is $2N - 1$. A star appears where:
- Left arm: `i === j`
- Right arm: `i + j === 2 * n`
- All other coordinates are spaces.

```javascript
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= 2 * n - 1; j++) {
    if (i === j || i + j === 2 * n) {
      process.stdout.write("* ");
    } else {
      process.stdout.write("  ");
    }
  }
  console.log();
}
```

---

### 🔹 Pattern 10: Inverted Pyramid / Triangle

```text
* * * * * * *
  * * * * *
    * * *
      *

```

- **Logic:**
- Row $i$ takes $(i - 1)$ double spaces.
- Number of stars per row is $2 \times (N - i) + 1$ (odd numbers descending: $7, 5, 3, 1$).

```javascript
for (let i = 1; i <= n; i++) {
  // Leading spaces
  for (let j = 1; j <= i - 1; j++) {
    process.stdout.write("  ");
  }
  // Stars
  for (let j = 1; j <= 2 * (n - i) + 1; j++) {
    process.stdout.write("* ");
  }
  console.log();
}
```
