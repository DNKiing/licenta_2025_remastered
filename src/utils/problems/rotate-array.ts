import { Problem } from "../types/problem";
// Medium Problem 2
const starterCodeRotateArray = `void rotateArray(int* arr, int size, int k) {
  // Write your code here
}
int main() {
    // Write your code here
}`;

export const rotateArray: Problem = {
  id: "rotate-array",
  title: "4. Rotate Array",
  problemStatement: `<p class='mt-3'>
    Rotate an array <code>arr</code> of size <code>n</code> to the right by <code>k</code> steps.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "arr = [1, 2, 3, 4, 5, 6, 7], k = 3",
      outputText: "[5, 6, 7, 1, 2, 3, 4]",
      explanation: "Array is rotated 3 steps to the right.",
    }
  ],
  starterCode: starterCodeRotateArray,
  order: 4,
};
