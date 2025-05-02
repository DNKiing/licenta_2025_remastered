import { Problem } from "../types/problem";

// Medium Problem 1
const starterCodeRemoveDuplicates = `int removeDuplicates(int* arr, int size) {
  // Write your code here
}
int main() {
    // Write your code here
}`;

export const removeDuplicates: Problem = {
  id: "remove-duplicates",
  title: "3. Remove Duplicates from Sorted Array",
  problemStatement: `<p class='mt-3'>
    Given a sorted array <code>arr</code>, remove the duplicates in place such that each element appears only once and return the new length of the array.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "arr = [1, 1, 2]",
      outputText: "2",
      explanation: "The array should be modified to [1, 2, _], and the function should return 2.",
    }
  ],
  starterCode: starterCodeRemoveDuplicates,
  order: 3,
};
