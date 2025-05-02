import { Problem } from "../types/problem";
// Hard Problem
const starterCodeLongestSubarraySum = `int longestSubarraySum(int* arr, int size, int target) {
  // Write your code here
}
  int main() {
    // Write your code here
}`;

export const longestSubarraySum: Problem = {
  id: "longest-subarray-sum",
  title: "5. Longest Subarray with Given Sum",
  problemStatement: `<p class='mt-3'>
    Given an array <code>arr</code> of integers and an integer <code>target</code>, return the length of the longest subarray that sums to <code>target</code>.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "arr = [1, -1, 5, -2, 3], target = 3",
      outputText: "4",
      explanation: "The subarray [1, -1, 5, -2] sums to 3.",
    }
  ],
  starterCode: starterCodeLongestSubarraySum,
  order: 5,
};
