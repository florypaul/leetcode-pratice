
/**
 * LeetCode - Valid Anagram
 *
 * Given two strings s and t, return true if t is an anagram of s,
 * and false otherwise.
 *
 * An anagram contains the same characters with the same frequency,
 * but the characters can be in a different order.
 *
 * Example:
 * Input:  s = "anagram", t = "nagaram"
 * Output: true
 *
 * Example:
 * Input:  s = "rat", t = "car"
 * Output: false
 *
 * Approach:
 * 1. If the strings have different lengths, they cannot be anagrams.
 * 2. Use a Map to count how many times each character appears in s.
 * 3. Use another Map to count how many times each character appears in t.
 * 4. Compare the character counts in both Maps.
 *
 * Map structure:
 *
 *     character → frequency
 *
 * For example:
 *
 *     "aab" → a: 2, b: 1
 *
 * Time Complexity: O(n)
 *   We iterate through the strings and compare the character counts.
 *
 * Space Complexity: O(n)
 *   The Maps store the characters and their frequencies.
 */

var isAnagram = function (s, t) {

    // Anagrams must have the same number of characters.
    if (s.length !== t.length) {
        return false;
    }

    const mapS = new Map();
    const mapT = new Map();

    // Count the frequency of each character in s.
    for (let i = 0; i < s.length; i++) {

        if (mapS.has(s[i])) {
            // Character already exists, so increase its count.
            mapS.set(s[i], mapS.get(s[i]) + 1);
        } else {
            // First time seeing this character.
            mapS.set(s[i], 1);
        }
    }

    // Count the frequency of each character in t.
    for (let i = 0; i < t.length; i++) {

        if (mapT.has(t[i])) {
            // Character already exists, so increase its count.
            mapT.set(t[i], mapT.get(t[i]) + 1);
        } else {
            // First time seeing this character.
            mapT.set(t[i], 1);
        }
    }

    // Compare the character counts from both Maps.
    for (let i = 0; i < s.length; i++) {

        /*
         * If the character does not exist in mapT,
         * OR if its frequency is different,
         * the strings are not anagrams.
         */
        if (
            !mapT.has(s[i]) ||
            mapT.get(s[i]) !== mapS.get(s[i])
        ) {
            return false;
        }
    }

    // Every character and frequency matched.
    return true;
};

