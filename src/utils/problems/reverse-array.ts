import assert from "assert";
import { Problem } from "../types/problem";

// Easy Problem 1
const starterCodeReverseArray = `void reverseArray(int* arr, int size) {
  // Write your code here
}
int main() {
    // Write your code here
}`;

export const reverseArray: Problem = {
  id: "reverse-array",
  title: "1. Reverse Array",
  problemStatement: `<p class='mt-3'>
    Write a function to reverse a given array <code>arr</code> of size <code>n</code> in place.
  </p>`,
  examples: [
    {
      id: 1,
      inputText: "arr = [1, 2, 3, 4, 5]",
      outputText: "[5, 4, 3, 2, 1]",
      explanation: "The array is reversed in place.",
    }
  ],
  starterCode: starterCodeReverseArray,
  order: 1,
};
