/**
 * LeetCode - Contains Duplicate
 *
 * Given an integer array nums, return true if any value appears
 * at least twice in the array. Return false if every element is distinct.
 *
 * Example:
 * Input:  [1, 2, 3, 1]
 * Output: true
 *
 * Approach:
 * Use a Set to keep track of values we have already seen.
 *
 * - If the current value already exists in the Set,
 *   we found a duplicate → return true.
 * - Otherwise, add the value to the Set and continue.
 * - If we finish the loop without finding a duplicate,
 *   return false.
 *
 * Time Complexity: O(n)
 *   We iterate through the array once.
 *
 * Space Complexity: O(n)
 *   In the worst case, the Set can contain all elements.
 */

var containsDuplicate = function (nums) {
    const seen = new Set();

    for (let i = 0; i < nums.length; i++) {

        // If the value is already in the Set, it is a duplicate.
        if (seen.has(nums[i])) {
            return true;
        }

        // Add the current value to the Set for future checks.
        seen.add(nums[i]);
    }

    // No duplicate was found.
    return false;
};

containsDuplicate([1,2,3,1]);
containsDuplicate([1,2,3,4]);
containsDuplicate([1,1,1,3,3,4,3,2,4,2]);

