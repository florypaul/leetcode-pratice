// LeetCode #1 - Two Sum
// Pattern: Hash Map
// Time: O(n)
// Space: O(n)

// First approach: Brute Force - O(n²)
// Optimized approach below using Map - O(n)


var twoSum = function(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const needed = target - nums[i];

        if (map.has(needed)) {
            return [map.get(needed), i];
        }

        map.set(nums[i], i);
    }
};