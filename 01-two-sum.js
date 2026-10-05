 /**
  * LeetCode - Two Sum
  *
  * Given an array of integers nums and an integer target,
  * return the indices of the two numbers such that they add up
  * to the target.
  *
  * You may assume that each input has exactly one solution,
  * and you may not use the same element twice.
  *
  * Example:
  * Input:  nums = [2, 7, 11, 15], target = 9
  * Output: [0, 1]
  *
  * Approach:
  * Use a Map to store numbers we have already seen along
  * with their corresponding indices.
  *
  * For each number:
  * - Calculate the complement needed to reach the target.
  * - Check if the complement already exists in the Map.
  * - If it exists, we found the two numbers → return their indices.
  * - Otherwise, store the current number and its index in the Map.
  *
  * Time Complexity: O(n)
  *   We iterate through the array once.
  *
  * Space Complexity: O(n)
  *   In the worst case, the Map can contain all elements.
  */

 var twoSum = function (nums, target) {
     const seen = new Map();

     for (let i = 0; i < nums.length; i++) {

         // Calculate the number needed to reach the target.
         const complement = target - nums[i];

         // Check if we have already seen the complement.
         if (seen.has(complement)) {
             return [seen.get(complement), i];
         }

         // Store the current number and its index for future checks.
         seen.set(nums[i], i);
     }
 };