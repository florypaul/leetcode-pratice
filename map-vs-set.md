# Map vs Set — JavaScript Quick Reference

A quick reference for understanding when to use **Map** vs **Set**, especially for LeetCode problems.

---

## 1. The Main Difference

### Map

A `Map` stores **key → value** pairs.

Think:

> **"I have a key, and I want to associate some information with it."**

```javascript
const map = new Map();

map.set("apple", 10);
map.set("orange", 20);
```

The data looks conceptually like:

```text
apple  → 10
orange → 20
```

### Set

A `Set` stores **unique values**.

Think:

> **"Have I seen this value before?"**

```javascript
const seen = new Set();

seen.add("apple");
seen.add("orange");
```

The data looks like:

```text
apple
orange
```

If we try:

```javascript
seen.add("apple");
```

nothing new is added because Sets only store unique values.

---

# 2. Common Methods

## Map

### Create a Map

```javascript
const map = new Map();
```

### Add a key/value pair

```javascript
map.set(key, value);
```

Example:

```javascript
map.set(10, 0);
map.set(20, 1);
```

### Check whether a key exists

```javascript
map.has(key);
```

Example:

```javascript
map.has(10); // true
map.has(50); // false
```

### Get the value associated with a key

```javascript
map.get(key);
```

Example:

```javascript
map.get(10); // 0
```

---

## Set

### Create a Set

```javascript
const seen = new Set();
```

### Add a value

```javascript
seen.add(value);
```

Example:

```javascript
seen.add(10);
seen.add(20);
```

### Check whether a value exists

```javascript
seen.has(value);
```

Example:

```javascript
seen.has(10); // true
seen.has(50); // false
```

### Remove a value

```javascript
seen.delete(value);
```

---

# 3. Easy Way to Remember

|               | Map                                     | Set                       |
| ------------- | --------------------------------------- | ------------------------- |
| Stores        | Key + Value                             | Unique Values             |
| Add           | `.set(key, value)`                      | `.add(value)`             |
| Check         | `.has(key)`                             | `.has(value)`             |
| Retrieve      | `.get(key)`                             | Not applicable            |
| Main question | "What information belongs to this key?" | "Have I seen this value?" |

### Mental Model

```text
MAP
Key → Value

SET
Value
Value
Value
```

---

# 4. LeetCode Example — Two Sum

For **Two Sum**, we used a `Map` because we needed to remember both:

```text
number → index
```

Example:

```javascript
const map = new Map();

map.set(nums[i], i);
```

We can then ask:

```javascript
map.has(complement)
```

and retrieve its index:

```javascript
map.get(complement)
```

### Why Map?

Because we needed the **index** associated with each number.

```text
2 → 0
7 → 1
11 → 2
15 → 3
```

---

# 5. LeetCode Example — Contains Duplicate

For **Contains Duplicate**, we only need to know whether we have already seen a number.

We don't need to store an index or any other information.

So a `Set` is a natural choice:

```javascript
const seen = new Set();

for (let i = 0; i < nums.length; i++) {

    if (seen.has(nums[i])) {
        return true;
    }

    seen.add(nums[i]);
}

return false;
```

### How it works

For:

```javascript
[1, 2, 3, 1]
```

We process the numbers:

```text
1 → not seen → add
2 → not seen → add
3 → not seen → add
1 → already seen → duplicate!
```

Therefore:

```javascript
return true;
```

---

# 6. Why Are Map and Set Useful in LeetCode?

Searching through an array repeatedly can lead to:

```text
O(n²)
```

Using a `Map` or `Set` often allows us to check whether something exists in approximately:

```text
O(1)
```

per lookup.

So processing the array once can often result in:

```text
O(n)
```

overall time.

This is why you'll frequently see patterns like:

```javascript
const seen = new Set();
```

or:

```javascript
const map = new Map();
```

in efficient LeetCode solutions.

---

# 7. The Question to Ask Yourself

When you see a new problem, ask:

### Do I need to remember a value?

Use a **Set**.

```javascript
const seen = new Set();
```

### Do I need to remember information associated with a value?

Use a **Map**.

```javascript
const map = new Map();
```

---

## ⭐ Quick Memory Trick

```text
SET
"Have I SEEN this?"

MAP
"What does this key MAP to?"
```

Or simply:

> **Set = unique values**
> **Map = key/value relationship**
