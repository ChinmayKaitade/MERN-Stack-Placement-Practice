# 🍌 LeetCode 875: Koko Eating Bananas | Binary Search on Answer

Koko loves to eat bananas. There are `n` piles of bananas, where the $i^{\text{th}}$ pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has fewer than `k` bananas, she eats all of them instead and will not eat any more bananas during that hour.

Return the **minimum integer `k**`such that she can eat all the bananas within`h` hours.

---

## 1. Core Concepts & Pattern: Binary Search on Answer

Just like the Book Allocation problem, the input array `piles` is **unsorted**, yet we apply Binary Search because the **eating speed `k` forms a monotonic answer space**:

- If Koko can finish all piles at speed `k`, she can also finish them at any speed `> k` (Valid $\to$ try smaller speeds: `last = mid - 1`).
- If she cannot finish at speed `k`, she cannot finish at any speed `< k` (Invalid $\to$ increase speed: `first = mid + 1`).

### 🔹 Defining the Search Space `[first, last]`

- **Lower Bound (`first = 1`):** Koko must eat at least `1` banana per hour to make progress.
- **Upper Bound (`last = max(piles)`):** Since Koko can eat at most **one pile per hour** (even if `k` exceeds the pile size, she waits until the next hour), eating faster than `Math.max(...piles)` saves zero extra time.

### 🔹 Hours Calculation Formula

For a pile of size $P$ and eating speed $S$, the hours spent on that pile is:

$$\text{hours} = \left\lceil \frac{P}{S} \right\rceil = \text{Math.ceil}\left(\frac{\text{pile}[i]}{\text{speed}}\right)$$

_(Tip: Using integer math `Math.floor((pile[i] + speed - 1) / speed)` also computes the exact ceiling without floating-point division)._

---

## 🌳 Visual Dry Run: `piles = [3, 6, 7, 11]`, `h = 8`

```text
Search Space:
- first = 1
- last  = max(3, 6, 7, 11) = 11

Step 1: first = 1, last = 11 -> mid = 6
- Hours: ceil(3/6) + ceil(6/6) + ceil(7/6) + ceil(11/6)
       =   1     +     1     +     2     +     2     = 6 hours <= 8 (Valid!)
- ans = 6, try slower speed: last = 5

Step 2: first = 1, last = 5 -> mid = 3
- Hours: ceil(3/3) + ceil(6/3) + ceil(7/3) + ceil(11/3)
       =   1     +     2     +     3     +     4     = 10 hours > 8 (Invalid!)
- Too slow, increase speed: first = 4

Step 3: first = 4, last = 5 -> mid = 4
- Hours: ceil(3/4) + ceil(6/4) + ceil(7/4) + ceil(11/4)
       =   1     +     2     +     2     +     3     = 8 hours <= 8 (Valid!)
- ans = 4, try slower speed: last = 3

Loop ends because first (4) > last (3).
Final Minimum Eating Speed: 4

```
