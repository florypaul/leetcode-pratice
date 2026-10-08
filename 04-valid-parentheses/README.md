# Day 2 — Valid Parentheses

## LeetCode Problem

**Problem:** Valid Parentheses
**Difficulty:** Easy
**Topic:** Stack

---

## Problem

Given a string `s` containing just the characters:

```text
( ) { } [ ]
```

Determine if the input string is valid.

A string is valid if:

1. Every opening bracket has a corresponding closing bracket.
2. Brackets close in the correct order.

---

## Examples

```text
"()"       → true
"()[]{}"   → true
"([])"     → true
"(]"       → false
"([)]"     → false
"((("      → false
")"        → false
"([]{)"    → false
```

### Why is `"([)]"` false?

The brackets are not closed in the correct order.

```text
( [ ) ]
    ↑
```

`)` is trying to close `(` while `[` is still open.

---

# Approach

I used a **Stack**.

In JavaScript, an array can be used as a stack:

```javascript
const stack = [];
```

The basic idea:

```text
Opening bracket → push into stack

Closing bracket → pop the most recent opening bracket
                         ↓
                      compare
                         ↓
                    Do they match?
                     /          \
                   No            Yes
                   ↓              ↓
                false          continue
```

---

# What is a Stack?

A Stack follows:

**LIFO = Last In, First Out**

Think about a stack of plates.

If we put plates on the stack:

```text
Plate 1
Plate 2
Plate 3
```

Plate 3 is removed first.

The **last item added is the first item removed**.

This is exactly what we need for nested brackets.

---

# `push()`

`push()` adds an item to the end of the stack.

```javascript
const stack = [];

stack.push("(");
```

Now:

```text
["("]
```

If we add another opening bracket:

```javascript
stack.push("[");
```

The stack becomes:

```text
["(", "["]
```

---

# `pop()`

`pop()` does two things:

1. Removes the **last item** from the stack.
2. Returns the item that was removed.

Example:

```javascript
const stack = ["(", "["];

const opening = stack.pop();
```

After `pop()`:

```text
opening = "["

stack = ["("]
```

### Important

We are **not popping the closing bracket from the string**.

The closing bracket is still in `s[i]`.

We are popping the **opening bracket from our stack** so that we can compare it with the closing bracket we are currently reading.

---

# Step-by-Step Example

Let's use:

```javascript
isValid("([])")
```

The string is:

```text
( [ ] )
```

---

## Step 1 — `(`

Current character:

```text
(
```

It is an opening bracket, so we push it:

```javascript
stack.push(s[i]);
```

Stack:

```text
["("]
```

---

## Step 2 — `[`

Current character:

```text
[
```

It is another opening bracket.

Push it:

```javascript
stack.push(s[i]);
```

Stack:

```text
["(", "["]
```

---

## Step 3 — `]`

Current character:

```text
]
```

It is a closing bracket, so we use:

```javascript
const opening = stack.pop();
```

Before `pop()`:

```text
stack = ["(", "["]
```

After `pop()`:

```text
opening = "["
stack = ["("]
```

Now compare:

```text
opening = "["
current = "]"
```

They match, so we continue.

---

## Step 4 — `)`

Current character:

```text
)
```

Again, it is a closing bracket.

```javascript
const opening = stack.pop();
```

Before:

```text
stack = ["("]
```

After:

```text
opening = "("
stack = []
```

Compare:

```text
opening = "("
current = ")"
```

They match.

---

## End of String

We have checked every character.

The stack is:

```text
[]
```

Therefore:

```javascript
stack.length === 0
```

is `true`.

So:

```text
"([])" → true
```

---

# Code Logic

## 1. Opening Brackets

If the current character is:

```text
(  [  {
```

put it into the stack.

```javascript
if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
    stack.push(s[i]);
}
```

---

## 2. Closing Brackets

If it is not an opening bracket, it is a closing bracket.

Before calling `pop()`, we need to make sure there is an opening bracket available.

```javascript
if (stack.length === 0) {
    return false;
}
```

For example:

```text
")"
```

There is nothing in the stack to match `)`.

Therefore it is immediately invalid.

---

## 3. Get the Most Recent Opening Bracket

```javascript
const opening = stack.pop();
```

This gives us the most recently added opening bracket.

---

## 4. Check for Mismatches

We check the **failure conditions first**:

```javascript
if (
    (s[i] === ']' && opening !== '[') ||
    (s[i] === ')' && opening !== '(') ||
    (s[i] === '}' && opening !== '{')
) {
    return false;
}
```

For example:

```text
opening = "{"
current = ")"
```

They do not match.

Therefore:

```javascript
return false;
```

We stop immediately because the string is already invalid.

---

# Why Return `false` First?

Instead of returning `true` every time we find a correct pair, we only return `false` when we find something wrong.

The pattern is:

```javascript
if (somethingIsWrong) {
    return false;
}

// Keep checking...

return true;
```

A correct pair does **not** mean the entire string is valid yet.

For example:

```text
"([])"
```

After `[]` matches, we still need to check `()`.

So we continue checking.

Only after the entire string has been processed can we return `true`.

---

# Final Stack Check

Consider:

```text
"((("
```

Every character is an opening bracket.

The stack becomes:

```text
["(", "(", "("]
```

The loop finishes, but the stack is not empty.

That means some opening brackets were never closed.

Therefore the result must be:

```text
false
```

At the end:

```javascript
return stack.length === 0;
```

If the stack is empty:

```text
[] → true
```

If the stack contains something:

```text
["(", "("] → false
```

---

# Complete Solution

```javascript
var isValid = function (s) {
    const stack = [];

    for (let i = 0; i < s.length; i++) {

        // Opening brackets go into the stack
        if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
            stack.push(s[i]);

        } else {

            // No opening bracket available to match
            if (stack.length === 0) {
                return false;
            }

            // Get the most recent opening bracket
            const opening = stack.pop();

            // Check if the brackets do not match
            if (
                (s[i] === ']' && opening !== '[') ||
                (s[i] === ')' && opening !== '(') ||
                (s[i] === '}' && opening !== '{')
            ) {
                return false;
            }
        }
    }

    // Valid only when no unmatched opening brackets remain
    return stack.length === 0;
};
```

---

# Test Cases

```javascript
console.log(isValid("()"));       // true
console.log(isValid("()[]{}"));   // true
console.log(isValid("([])"));     // true
console.log(isValid("(]"));       // false
console.log(isValid("([)]"));     // false
console.log(isValid("((("));      // false
console.log(isValid(")"));        // false
console.log(isValid("([]{)"));    // false
console.log(isValid(""));         // true
```

---

# Edge Cases

| Input      | Result  | Reason                |
| ---------- | ------- | --------------------- |
| `"()"`     | `true`  | Matching pair         |
| `"([])"`   | `true`  | Correct nesting       |
| `"()[]{}"` | `true`  | All pairs match       |
| `"(]"`     | `false` | Wrong closing bracket |
| `"([)]"`   | `false` | Wrong order           |
| `"((("`    | `false` | Unclosed brackets     |
| `")"`      | `false` | No opening bracket    |
| `""`       | `true`  | Nothing to match      |

---

# Time Complexity

**O(n)**

We loop through the string once:

```javascript
for (let i = 0; i < s.length; i++)
```

If the string contains `n` characters, each character is processed once.

Therefore:

```text
Time: O(n)
```

---

# Space Complexity

**O(n)**

In the worst case, all characters can be opening brackets and stored in the stack.

Example:

```text
"((((((("
```

Therefore:

```text
Space: O(n)
```

---

# Key Concepts Learned

### Stack

```text
LIFO
Last In, First Out
```

### `push()`

Adds an item to the stack:

```javascript
stack.push(s[i]);
```

### `pop()`

Removes and returns the last item:

```javascript
const opening = stack.pop();
```

### `stack.length`

Checks how many items are in the stack:

```javascript
stack.length === 0
```

means the stack is empty.

### Early Return

If something is definitely invalid:

```javascript
return false;
```

We stop immediately.

### Final Result

After checking the entire string:

```javascript
return stack.length === 0;
```

The stack must be empty for the string to be valid.

---

# What I Learned Today

* An array can be used as a Stack in JavaScript.
* `push()` adds an item to the stack.
* `pop()` removes and returns the last item.
* `pop()` removes the **opening bracket from the stack**, not the closing bracket from the string.
* Closing brackets are compared with the most recently opened bracket.
* A Stack uses **LIFO — Last In, First Out**.
* We check failure conditions and return `false` immediately.
* We don't return `true` until the entire string has been checked.
* The stack must be empty at the end for the string to be valid.
* The problem can be solved in **O(n) time** and **O(n) space**.
* I learned to use a Stack to handle nested brackets instead of trying to match brackets by position.
