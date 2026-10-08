var isValid = function (s) {
    const stack = [];

    for (let i = 0; i < s.length; i++) {

        // Opening brackets are added to the stack
        if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
            stack.push(s[i]);

        } else {

            // If there is no opening bracket to match
            if (stack.length === 0) {
                return false;
            }

            // pop() removes and returns the last opening bracket
            const opening = stack.pop();

            // Check if the opening and closing brackets match
            if (
                (s[i] === ']' && opening !== '[') ||
                (s[i] === ')' && opening !== '(') ||
                (s[i] === '}' && opening !== '{')
            ) {
                return false;
            }
        }
    }

    // If nothing is left in the stack, all brackets were matched
    return stack.length === 0;
};


// Test
console.log(isValid("()"));       // true
console.log(isValid("()[]{}"));   // true
console.log(isValid("([])"));     // true
console.log(isValid("(]"));       // false
console.log(isValid("([)]"));     // false
console.log(isValid("((("));      // false
console.log(isValid(")"));        // false
console.log(isValid("([]{)"));    // false