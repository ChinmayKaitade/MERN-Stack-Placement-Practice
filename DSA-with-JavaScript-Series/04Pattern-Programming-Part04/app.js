/**
 * Pattern Programming | DSA with JavaScript Part 04
 * Complete runnable reference for all 10 patterns.
 */

const prompt = require("prompt-sync")({ sigint: true });

function runAllPatterns() {
  const input = prompt("Enter N (recommended: 4 or 5): ");
  const n = Number(input) || 4;

  console.log(
    `\n================ Pattern 1: Horizontal Line (n=${n}) ================`,
  );
  for (let i = 1; i <= n; i++) {
    process.stdout.write("* ");
  }
  console.log();

  console.log(
    `\n================ Pattern 2: Solid Square Grid (n=${n}) ================`,
  );
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      process.stdout.write("* ");
    }
    console.log();
  }

  console.log(
    `\n================ Pattern 3: Right Angle Triangle (n=${n}) ================`,
  );
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      process.stdout.write("* ");
    }
    console.log();
  }

  console.log(
    `\n================ Pattern 4: Number Triangle (n=${n}) ================`,
  );
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      process.stdout.write(j + " ");
    }
    console.log();
  }

  console.log(
    `\n================ Pattern 5: Character Triangle (n=${n}) ================`,
  );
  for (let i = 1; i <= n; i++) {
    let ascii = 65; // ASCII for 'A'
    for (let j = 1; j <= i; j++) {
      process.stdout.write(String.fromCharCode(ascii) + " ");
      ascii++;
    }
    console.log();
  }

  console.log(
    `\n================ Pattern 6: Inverted Right Angle Triangle (n=${n}) ================`,
  );
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n - i + 1; j++) {
      process.stdout.write("* ");
    }
    console.log();
  }

  console.log(
    `\n================ Pattern 7: Mirror Right Angle Triangle (n=${n}) ================`,
  );
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n - i; j++) {
      process.stdout.write("  ");
    }
    for (let j = 1; j <= i; j++) {
      process.stdout.write("* ");
    }
    console.log();
  }

  console.log(
    `\n================ Pattern 8: 'X' Shape Diagonals (n=${n}) ================`,
  );
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

  console.log(
    `\n================ Pattern 9: Inverted 'V' Shape (n=${n}) ================`,
  );
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

  console.log(
    `\n================ Pattern 10: Inverted Full Pyramid (n=${n}) ================`,
  );
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i - 1; j++) {
      process.stdout.write("  ");
    }
    for (let j = 1; j <= 2 * (n - i) + 1; j++) {
      process.stdout.write("* ");
    }
    console.log();
  }
}

runAllPatterns();
