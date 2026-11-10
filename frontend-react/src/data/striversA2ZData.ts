/**
 * ExamMate AI - Striver's A2Z DSA Sheet Master Question Catalog
 * Resource: https://takeuforward.org/prep-hub/strivers-a2z-dsa-sheet?open=none
 */

export interface DSAQuestion {
  id: string;
  sheetIndex: number;
  stepId: number;
  stepTitle: string;
  stepShortTitle: string;
  stepIcon: string;
  topic: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  optimalApproach: string;
  timeComplexity: string;
  spaceComplexity: string;
  solutions: {
    python: string;
    cpp: string;
    java: string;
  };
  companies: string[];
  articleUrl?: string;
  practiceUrl?: string;
}

export interface DSAStep {
  id: number;
  title: string;
  shortTitle: string;
  icon: string;
  desc: string;
  totalQuestions: number;
}

export const STRIVERS_STEPS: DSAStep[] = [
  {
    "id": 1,
    "title": "Step 1: Learn the Basics",
    "shortTitle": "Basics",
    "icon": "\ud83c\udf31",
    "desc": "Syntax, Patterns, Collections, Basic Maths, Recursion & Hashing",
    "totalQuestions": 5
  },
  {
    "id": 2,
    "title": "Step 2: Learn Important Sorting Techniques",
    "shortTitle": "Sorting",
    "icon": "\ud83d\udcf6",
    "desc": "Selection, Bubble, Insertion, Merge & Quick Sort",
    "totalQuestions": 3
  },
  {
    "id": 3,
    "title": "Step 3: Solve Problems on Arrays",
    "shortTitle": "Arrays",
    "icon": "\ud83d\udce6",
    "desc": "Easy, Medium (Kadane's, 2Sum, 012), Hard (Pascal, 3Sum, Inversions)",
    "totalQuestions": 12
  },
  {
    "id": 4,
    "title": "Step 4: Binary Search",
    "shortTitle": "Binary Search",
    "icon": "\ud83d\udd0d",
    "desc": "1D BS, BS on Answers (Aggressive Cows, Book Allocation), 2D Arrays",
    "totalQuestions": 5
  },
  {
    "id": 5,
    "title": "Step 5: Strings [Basic and Medium]",
    "shortTitle": "Strings",
    "icon": "\ud83d\udd24",
    "desc": "Isomorphic, Anagrams, Substrings, Palindromic substrings, Atoi",
    "totalQuestions": 4
  },
  {
    "id": 6,
    "title": "Step 6: Learn LinkedList",
    "shortTitle": "Linked List",
    "icon": "\ud83d\udd17",
    "desc": "1D, Doubly LL, Medium (Detect cycle, Tortoise-Hare), Hard (Flatten, K-Reverse)",
    "totalQuestions": 6
  },
  {
    "id": 7,
    "title": "Step 7: Recursion [Patterns]",
    "shortTitle": "Recursion",
    "icon": "\ud83d\udd04",
    "desc": "Subsequences, Combination Sum, N-Queens, Sudoku, Backtracking",
    "totalQuestions": 4
  },
  {
    "id": 8,
    "title": "Step 8: Bit Manipulation",
    "shortTitle": "Bit Manipulation",
    "icon": "\u26a1",
    "desc": "Bitwise operations, Power of 2, Single Number, XOR subsets",
    "totalQuestions": 3
  },
  {
    "id": 9,
    "title": "Step 9: Stack and Queues",
    "shortTitle": "Stack & Queue",
    "icon": "\ud83d\udcda",
    "desc": "Monotonic Stack, NGE, Trapping Rain Water, LRU Cache, Histograms",
    "totalQuestions": 4
  },
  {
    "id": 10,
    "title": "Step 10: Sliding Window & Two Pointer",
    "shortTitle": "Sliding Window",
    "icon": "\ud83e\ude9f",
    "desc": "Max sum, Longest substring, Min Window Substring, Fruit into Baskets",
    "totalQuestions": 2
  },
  {
    "id": 11,
    "title": "Step 11: Heaps [Priority Queue]",
    "shortTitle": "Heaps",
    "icon": "\ud83c\udfd4\ufe0f",
    "desc": "Kth Largest, Median from Stream, Merge K Sorted Lists, Task Scheduler",
    "totalQuestions": 2
  },
  {
    "id": 12,
    "title": "Step 12: Greedy Algorithms",
    "shortTitle": "Greedy",
    "icon": "\ud83e\ude99",
    "desc": "N Meetings, Min Platforms, Jump Game, Job Sequencing",
    "totalQuestions": 2
  },
  {
    "id": 13,
    "title": "Step 13: Binary Trees",
    "shortTitle": "Binary Trees",
    "icon": "\ud83c\udf32",
    "desc": "Traversals, Height, Diameter, LCA, Views, Path Sums",
    "totalQuestions": 3
  },
  {
    "id": 14,
    "title": "Step 14: Binary Search Trees",
    "shortTitle": "BST",
    "icon": "\ud83c\udf8b",
    "desc": "Search, Ceil/Floor, Validate BST, LCA, Kth Smallest, Recover BST",
    "totalQuestions": 2
  },
  {
    "id": 15,
    "title": "Step 15: Graphs",
    "shortTitle": "Graphs",
    "icon": "\ud83d\udd78\ufe0f",
    "desc": "BFS, DFS, Cycle Detection, Topological Sort, Dijkstra, Disjoint Set, MST",
    "totalQuestions": 2
  },
  {
    "id": 16,
    "title": "Step 16: Dynamic Programming",
    "shortTitle": "DP",
    "icon": "\ud83e\udde9",
    "desc": "1D, 2D Grids, Subsets, Strings (LCS, Edit Distance), Stocks, LIS, MCM",
    "totalQuestions": 4
  },
  {
    "id": 17,
    "title": "Step 17: Tries",
    "shortTitle": "Tries",
    "icon": "\ud83c\udf33",
    "desc": "Prefix Tree, Insert/Search, Distinct Substrings, Bitwise XOR",
    "totalQuestions": 1
  },
  {
    "id": 18,
    "title": "Step 18: Advanced Strings",
    "shortTitle": "Advanced Strings",
    "icon": "\ud83d\udcdc",
    "desc": "KMP Algorithm (LPS), Z-Function, Rabin-Karp String Matching",
    "totalQuestions": 1
  }
];

export const STRIVERS_A2Z_QUESTIONS: DSAQuestion[] = [
  {
    "id": "strivers-1",
    "sheetIndex": 1,
    "stepId": 1,
    "stepTitle": "Step 1: Learn the Basics",
    "stepShortTitle": "Basics",
    "stepIcon": "\ud83c\udf31",
    "topic": "Basic Maths",
    "title": "Count Digits in a Number",
    "difficulty": "Easy",
    "description": "Given an integer N, write a program to count the number of digits in N. If N divides evenly by any of its digits, note those for divisibility checks.",
    "examples": [
      {
        "input": "N = 12345",
        "output": "5",
        "explanation": "The number 12345 has 5 digits."
      }
    ],
    "constraints": [
      "1 <= N <= 10^9"
    ],
    "optimalApproach": "Extract each digit using modulo 10 and integer division by 10 until N becomes 0, or use logarithmic approach: floor(log10(N)) + 1.",
    "timeComplexity": "O(log10(N))",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def countDigits(n: int) -> int:\n    import math\n    if n == 0: return 1\n    return math.floor(math.log10(abs(n))) + 1",
      "cpp": "int countDigits(int n) {\n    if (n == 0) return 1;\n    return (int)log10(abs(n)) + 1;\n}",
      "java": "public int countDigits(int n) {\n    if (n == 0) return 1;\n    return (int)Math.log10(Math.abs(n)) + 1;\n}"
    },
    "companies": [
      "Amazon",
      "TCS",
      "Infosys"
    ],
    "practiceUrl": "https://leetcode.com/problems/find-numbers-with-even-number-of-digits/",
    "articleUrl": "https://takeuforward.org/data-structure/count-digits-in-a-number/"
  },
  {
    "id": "strivers-2",
    "sheetIndex": 2,
    "stepId": 1,
    "stepTitle": "Step 1: Learn the Basics",
    "stepShortTitle": "Basics",
    "stepIcon": "\ud83c\udf31",
    "topic": "Basic Maths",
    "title": "Reverse a Number (32-bit Integer)",
    "difficulty": "Easy",
    "description": "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    "examples": [
      {
        "input": "x = 123",
        "output": "321",
        "explanation": "Reversing digits yields 321."
      },
      {
        "input": "x = -123",
        "output": "-321",
        "explanation": "Negative sign is preserved."
      }
    ],
    "constraints": [
      "-2^31 <= x <= 2^31 - 1"
    ],
    "optimalApproach": "Repeatedly pop the last digit with `x % 10` and push it to the reversed number while checking for 32-bit overflow before multiplication.",
    "timeComplexity": "O(log10(N))",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def reverse(x: int) -> int:\n    sign = -1 if x < 0 else 1\n    x = abs(x)\n    rev = 0\n    while x:\n        rev = rev * 10 + x % 10\n        x //= 10\n    rev *= sign\n    return rev if -2**31 <= rev <= 2**31 - 1 else 0",
      "cpp": "int reverse(int x) {\n    int rev = 0;\n    while (x != 0) {\n        int pop = x % 10;\n        x /= 10;\n        if (rev > INT_MAX/10 || (rev == INT_MAX/10 && pop > 7)) return 0;\n        if (rev < INT_MIN/10 || (rev == INT_MIN/10 && pop < -8)) return 0;\n        rev = rev * 10 + pop;\n    }\n    return rev;\n}",
      "java": "public int reverse(int x) {\n    int rev = 0;\n    while (x != 0) {\n        int pop = x % 10;\n        x /= 10;\n        if (rev > Integer.MAX_VALUE / 10 || (rev == Integer.MAX_VALUE / 10 && pop > 7)) return 0;\n        if (rev < Integer.MIN_VALUE / 10 || (rev == Integer.MIN_VALUE / 10 && pop < -8)) return 0;\n        rev = rev * 10 + pop;\n    }\n    return rev;\n}"
    },
    "companies": [
      "Bloomberg",
      "Amazon",
      "Apple"
    ],
    "practiceUrl": "https://leetcode.com/problems/reverse-integer/",
    "articleUrl": "https://takeuforward.org/maths/reverse-digits-of-a-number/"
  },
  {
    "id": "strivers-3",
    "sheetIndex": 3,
    "stepId": 1,
    "stepTitle": "Step 1: Learn the Basics",
    "stepShortTitle": "Basics",
    "stepIcon": "\ud83c\udf31",
    "topic": "Basic Maths",
    "title": "Check Palindrome Number",
    "difficulty": "Easy",
    "description": "Given an integer x, return true if x is a palindrome, and false otherwise. An integer is a palindrome when it reads the same forward and backward.",
    "examples": [
      {
        "input": "x = 121",
        "output": "true",
        "explanation": "121 reads as 121 from left to right and right to left."
      },
      {
        "input": "x = -121",
        "output": "false",
        "explanation": "From left to right it is -121. From right to left it is 121-."
      }
    ],
    "constraints": [
      "-2^31 <= x <= 2^31 - 1"
    ],
    "optimalApproach": "Negative numbers cannot be palindromes. Revert only the half of the integer and compare with the remaining first half to avoid integer overflow.",
    "timeComplexity": "O(log10(N))",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def isPalindrome(x: int) -> bool:\n    if x < 0 or (x % 10 == 0 and x != 0): return False\n    rev = 0\n    while x > rev:\n        rev = rev * 10 + x % 10\n        x //= 10\n    return x == rev or x == rev // 10",
      "cpp": "bool isPalindrome(int x) {\n    if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n    int rev = 0;\n    while (x > rev) {\n        rev = rev * 10 + x % 10;\n        x /= 10;\n    }\n    return x == rev || x == rev / 10;\n}",
      "java": "public boolean isPalindrome(int x) {\n    if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n    int rev = 0;\n    while (x > rev) {\n        rev = rev * 10 + x % 10;\n        x /= 10;\n    }\n    return x == rev || x == rev / 10;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta"
    ],
    "practiceUrl": "https://leetcode.com/problems/palindrome-number/",
    "articleUrl": "https://takeuforward.org/data-structure/check-if-a-number-is-palindrome-or-not/"
  },
  {
    "id": "strivers-4",
    "sheetIndex": 4,
    "stepId": 1,
    "stepTitle": "Step 1: Learn the Basics",
    "stepShortTitle": "Basics",
    "stepIcon": "\ud83c\udf31",
    "topic": "Basic Maths",
    "title": "GCD or HCF (Euclidean Algorithm)",
    "difficulty": "Easy",
    "description": "Given two positive integers a and b, find their Greatest Common Divisor (GCD) / Highest Common Factor (HCF).",
    "examples": [
      {
        "input": "a = 20, b = 15",
        "output": "5",
        "explanation": "Factors of 20 are 1, 2, 4, 5, 10, 20. Factors of 15 are 1, 3, 5, 15. The greatest common divisor is 5."
      }
    ],
    "constraints": [
      "1 <= a, b <= 10^9"
    ],
    "optimalApproach": "Euclid's algorithm: gcd(a, b) = gcd(b, a % b) until remainder is 0.",
    "timeComplexity": "O(log(min(a, b)))",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def gcd(a: int, b: int) -> int:\n    while b != 0:\n        a, b = b, a % b\n    return a",
      "cpp": "int gcd(int a, int b) {\n    while (b != 0) {\n        int rem = a % b;\n        a = b;\n        b = rem;\n    }\n    return a;\n}",
      "java": "public int gcd(int a, int b) {\n    while (b != 0) {\n        int rem = a % b;\n        a = b;\n        b = rem;\n    }\n    return a;\n}"
    },
    "companies": [
      "Adobe",
      "TCS",
      "Accenture"
    ],
    "practiceUrl": "https://practice.geeksforgeeks.org/problems/gcd-of-two-numbers3453/1",
    "articleUrl": "https://takeuforward.org/data-structure/find-gcd-of-two-numbers/"
  },
  {
    "id": "strivers-5",
    "sheetIndex": 5,
    "stepId": 1,
    "stepTitle": "Step 1: Learn the Basics",
    "stepShortTitle": "Basics",
    "stepIcon": "\ud83c\udf31",
    "topic": "Basic Maths",
    "title": "Check Armstrong Number",
    "difficulty": "Easy",
    "description": "An Armstrong number of order k is a number whose sum of each digit raised to the power k equals the number itself.",
    "examples": [
      {
        "input": "n = 153",
        "output": "true",
        "explanation": "1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153."
      }
    ],
    "constraints": [
      "1 <= n <= 10^9"
    ],
    "optimalApproach": "Count the total digits k, then sum up digit^k and compare to the original n.",
    "timeComplexity": "O(log10(N))",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def checkArmstrong(n: int) -> bool:\n    digits = [int(c) for c in str(n)]\n    k = len(digits)\n    return sum(d**k for d in digits) == n",
      "cpp": "bool checkArmstrong(int n) {\n    int original = n, temp = n, k = 0, sum = 0;\n    while (temp > 0) { k++; temp /= 10; }\n    temp = n;\n    while (temp > 0) {\n        sum += round(pow(temp % 10, k));\n        temp /= 10;\n    }\n    return sum == original;\n}",
      "java": "public boolean checkArmstrong(int n) {\n    int original = n, temp = n, k = 0, sum = 0;\n    while (temp > 0) { k++; temp /= 10; }\n    temp = n;\n    while (temp > 0) {\n        sum += Math.pow(temp % 10, k);\n        temp /= 10;\n    }\n    return sum == original;\n}"
    },
    "companies": [
      "Amazon",
      "Wipro",
      "TCS"
    ],
    "practiceUrl": "https://practice.geeksforgeeks.org/problems/armstrong-numbers2727/1",
    "articleUrl": "https://takeuforward.org/maths/check-if-a-number-is-armstrong-number-or-not/"
  },
  {
    "id": "strivers-6",
    "sheetIndex": 6,
    "stepId": 2,
    "stepTitle": "Step 2: Learn Important Sorting Techniques",
    "stepShortTitle": "Sorting",
    "stepIcon": "\ud83d\udcf6",
    "topic": "Basic Sorting",
    "title": "Selection Sort",
    "difficulty": "Easy",
    "description": "Given an unsorted array of size N, sort the array in ascending order using Selection Sort algorithm.",
    "examples": [
      {
        "input": "arr = [64, 25, 12, 22, 11]",
        "output": "[11, 12, 22, 25, 64]",
        "explanation": "Smallest element 11 placed at index 0, followed by 12 at index 1, etc."
      }
    ],
    "constraints": [
      "1 <= N <= 10^4",
      "-10^5 <= arr[i] <= 10^5"
    ],
    "optimalApproach": "Find the minimum element in the unsorted suffix and swap it with the element at the beginning of the suffix.",
    "timeComplexity": "O(N^2)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def selectionSort(arr: list[int]) -> list[int]:\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr",
      "cpp": "void selectionSort(vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n - 1; i++) {\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++)\n            if (arr[j] < arr[min_idx]) min_idx = j;\n        swap(arr[i], arr[min_idx]);\n    }\n}",
      "java": "public void selectionSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        int temp = arr[minIdx];\n        arr[minIdx] = arr[i];\n        arr[i] = temp;\n    }\n}"
    },
    "companies": [
      "TCS",
      "Cognizant",
      "Infosys"
    ],
    "practiceUrl": "https://practice.geeksforgeeks.org/problems/selection-sort/1",
    "articleUrl": "https://takeuforward.org/sorting/selection-sort-algorithm/"
  },
  {
    "id": "strivers-7",
    "sheetIndex": 7,
    "stepId": 2,
    "stepTitle": "Step 2: Learn Important Sorting Techniques",
    "stepShortTitle": "Sorting",
    "stepIcon": "\ud83d\udcf6",
    "topic": "Divide and Conquer Sorting",
    "title": "Merge Sort",
    "difficulty": "Medium",
    "description": "Given an array of size N, sort it in ascending order using the Merge Sort algorithm.",
    "examples": [
      {
        "input": "arr = [4, 2, 1, 6, 7]",
        "output": "[1, 2, 4, 6, 7]",
        "explanation": "Recursively split array into halves and merge in sorted order."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= arr[i] <= 10^9"
    ],
    "optimalApproach": "Divide the array into two halves, recursively sort both halves, and then merge the sorted halves using a two-pointer approach.",
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "def mergeSort(arr: list[int]) -> list[int]:\n    if len(arr) <= 1: return arr\n    mid = len(arr) // 2\n    left = mergeSort(arr[:mid])\n    right = mergeSort(arr[mid:])\n    res = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]: res.append(left[i]); i += 1\n        else: res.append(right[j]); j += 1\n    res.extend(left[i:])\n    res.extend(right[j:])\n    return res",
      "cpp": "void merge(vector<int>& a, int l, int m, int r) {\n    vector<int> temp;\n    int i = l, j = m + 1;\n    while (i <= m && j <= r) {\n        if (a[i] <= a[j]) temp.push_back(a[i++]);\n        else temp.push_back(a[j++]);\n    }\n    while (i <= m) temp.push_back(a[i++]);\n    while (j <= r) temp.push_back(a[j++]);\n    for (int k = 0; k < (int)temp.size(); k++) a[l + k] = temp[k];\n}\nvoid mergeSort(vector<int>& a, int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(a, l, m);\n    mergeSort(a, m + 1, r);\n    merge(a, l, m, r);\n}",
      "java": "void merge(int[] a, int l, int m, int r) {\n    int[] temp = new int[r - l + 1];\n    int i = l, j = m + 1, k = 0;\n    while (i <= m && j <= r) {\n        temp[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];\n    }\n    while (i <= m) temp[k++] = a[i++];\n    while (j <= r) temp[k++] = a[j++];\n    System.arraycopy(temp, 0, a, l, temp.length);\n}\nvoid mergeSort(int[] a, int l, int r) {\n    if (l >= r) return;\n    int m = l + (r - l) / 2;\n    mergeSort(a, l, m);\n    mergeSort(a, m + 1, r);\n    merge(a, l, m, r);\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Paytm"
    ],
    "practiceUrl": "https://leetcode.com/problems/sort-an-array/",
    "articleUrl": "https://takeuforward.org/data-structure/merge-sort-algorithm/"
  },
  {
    "id": "strivers-8",
    "sheetIndex": 8,
    "stepId": 2,
    "stepTitle": "Step 2: Learn Important Sorting Techniques",
    "stepShortTitle": "Sorting",
    "stepIcon": "\ud83d\udcf6",
    "topic": "Divide and Conquer Sorting",
    "title": "Quick Sort",
    "difficulty": "Medium",
    "description": "Implement Quick Sort to sort an array of N integers in ascending order.",
    "examples": [
      {
        "input": "arr = [4, 6, 2, 5, 7, 9, 1, 3]",
        "output": "[1, 2, 3, 4, 5, 6, 7, 9]",
        "explanation": "Picks pivot, places it at correct position, and recurses."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= arr[i] <= 10^9"
    ],
    "optimalApproach": "Choose a pivot, partition the array such that all elements <= pivot are on left and > pivot are on right, then recurse.",
    "timeComplexity": "O(N log N) avg, O(N^2) worst",
    "spaceComplexity": "O(log N)",
    "solutions": {
      "python": "def quickSort(arr: list[int], low: int, high: int):\n    if low < high:\n        pIndex = partition(arr, low, high)\n        quickSort(arr, low, pIndex - 1)\n        quickSort(arr, pIndex + 1, high)\ndef partition(arr, low, high):\n    pivot = arr[low]\n    i, j = low, high\n    while i < j:\n        while i <= high - 1 and arr[i] <= pivot: i += 1\n        while j >= low + 1 and arr[j] > pivot: j -= 1\n        if i < j: arr[i], arr[j] = arr[j], arr[i]\n    arr[low], arr[j] = arr[j], arr[low]\n    return j",
      "cpp": "int partition(vector<int>& arr, int low, int high) {\n    int pivot = arr[low];\n    int i = low, j = high;\n    while (i < j) {\n        while (i <= high - 1 && arr[i] <= pivot) i++;\n        while (j >= low + 1 && arr[j] > pivot) j--;\n        if (i < j) swap(arr[i], arr[j]);\n    }\n    swap(arr[low], arr[j]);\n    return j;\n}\nvoid quickSort(vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int pIndex = partition(arr, low, high);\n        quickSort(arr, low, pIndex - 1);\n        quickSort(arr, pIndex + 1, high);\n    }\n}",
      "java": "int partition(int[] arr, int low, int high) {\n    int pivot = arr[low];\n    int i = low, j = high;\n    while (i < j) {\n        while (i <= high - 1 && arr[i] <= pivot) i++;\n        while (j >= low + 1 && arr[j] > pivot) j--;\n        if (i < j) { int t = arr[i]; arr[i] = arr[j]; arr[j] = t; }\n    }\n    int t = arr[low]; arr[low] = arr[j]; arr[j] = t;\n    return j;\n}\nvoid quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int p = partition(arr, low, high);\n        quickSort(arr, low, p - 1);\n        quickSort(arr, p + 1, high);\n    }\n}"
    },
    "companies": [
      "Google",
      "Adobe",
      "Morgan Stanley"
    ],
    "practiceUrl": "https://practice.geeksforgeeks.org/problems/quick-sort/1",
    "articleUrl": "https://takeuforward.org/data-structure/quick-sort-algorithm/"
  },
  {
    "id": "strivers-9",
    "sheetIndex": 9,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Easy Arrays",
    "title": "Largest Element in an Array",
    "difficulty": "Easy",
    "description": "Given an array of size N, find the largest element in the array.",
    "examples": [
      {
        "input": "arr = [2, 5, 1, 3, 0]",
        "output": "5",
        "explanation": "5 is the largest element in the given array."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "-10^9 <= arr[i] <= 10^9"
    ],
    "optimalApproach": "Initialize max = arr[0] and iterate through the array once, updating max when a larger element is found.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def largest(arr: list[int]) -> int:\n    m = arr[0]\n    for x in arr:\n        if x > m: m = x\n    return m",
      "cpp": "int largest(vector<int>& arr) {\n    int m = arr[0];\n    for (int x : arr) if (x > m) m = x;\n    return m;\n}",
      "java": "public int largest(int[] arr) {\n    int m = arr[0];\n    for (int x : arr) if (x > m) m = x;\n    return m;\n}"
    },
    "companies": [
      "TCS",
      "Accenture",
      "Cognizant"
    ],
    "practiceUrl": "https://practice.geeksforgeeks.org/problems/largest-element-in-array2846/1",
    "articleUrl": "https://takeuforward.org/data-structure/find-the-largest-element-in-an-array/"
  },
  {
    "id": "strivers-10",
    "sheetIndex": 10,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Easy Arrays",
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "description": "Given an integer array nums sorted in non-decreasing order, remove duplicates in-place such that each unique element appears only once and return the number of unique elements.",
    "examples": [
      {
        "input": "nums = [1,1,2]",
        "output": "2, nums = [1,2,_]",
        "explanation": "Function should return k = 2 with the first two elements being 1 and 2."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "-100 <= nums[i] <= 100",
      "nums is sorted in non-decreasing order."
    ],
    "optimalApproach": "Use two pointers: pointer i keeps track of the position for next unique element while j scans forward.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def removeDuplicates(nums: list[int]) -> int:\n    if not nums: return 0\n    i = 0\n    for j in range(1, len(nums)):\n        if nums[j] != nums[i]:\n            i += 1\n            nums[i] = nums[j]\n    return i + 1",
      "cpp": "int removeDuplicates(vector<int>& nums) {\n    if (nums.empty()) return 0;\n    int i = 0;\n    for (int j = 1; j < (int)nums.size(); j++) {\n        if (nums[j] != nums[i]) nums[++i] = nums[j];\n    }\n    return i + 1;\n}",
      "java": "public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int i = 0;\n    for (int j = 1; j < nums.length; j++) {\n        if (nums[j] != nums[i]) nums[++i] = nums[j];\n    }\n    return i + 1;\n}"
    },
    "companies": [
      "Microsoft",
      "Google",
      "Facebook"
    ],
    "practiceUrl": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "articleUrl": "https://takeuforward.org/data-structure/remove-duplicates-in-place-from-sorted-array/"
  },
  {
    "id": "strivers-11",
    "sheetIndex": 11,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Easy Arrays",
    "title": "Move Zeroes to End",
    "difficulty": "Easy",
    "description": "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements in-place.",
    "examples": [
      {
        "input": "nums = [0,1,0,3,12]",
        "output": "[1,3,12,0,0]",
        "explanation": "Non-zero values keep order, 0s shifted to the tail."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    "optimalApproach": "Find the first zero at index j, then loop i from j+1 to end and swap nums[i] and nums[j] whenever nums[i] != 0.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def moveZeroes(nums: list[int]) -> None:\n    j = -1\n    for i in range(len(nums)):\n        if nums[i] == 0:\n            j = i; break\n    if j == -1: return\n    for i in range(j + 1, len(nums)):\n        if nums[i] != 0:\n            nums[i], nums[j] = nums[j], nums[i]\n            j += 1",
      "cpp": "void moveZeroes(vector<int>& nums) {\n    int j = -1;\n    for (int i = 0; i < (int)nums.size(); i++) {\n        if (nums[i] == 0) { j = i; break; }\n    }\n    if (j == -1) return;\n    for (int i = j + 1; i < (int)nums.size(); i++) {\n        if (nums[i] != 0) swap(nums[i], nums[j++]);\n    }\n}",
      "java": "public void moveZeroes(int[] nums) {\n    int j = -1;\n    for (int i = 0; i < nums.length; i++) {\n        if (nums[i] == 0) { j = i; break; }\n    }\n    if (j == -1) return;\n    for (int i = j + 1; i < nums.length; i++) {\n        if (nums[i] != 0) {\n            int temp = nums[i]; nums[i] = nums[j]; nums[j] = temp;\n            j++;\n        }\n    }\n}"
    },
    "companies": [
      "Bloomberg",
      "Facebook",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/move-zeroes/",
    "articleUrl": "https://takeuforward.org/data-structure/move-all-zeros-to-the-end-of-the-array/"
  },
  {
    "id": "strivers-12",
    "sheetIndex": 12,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Easy Arrays",
    "title": "Find Missing Number in Array",
    "difficulty": "Easy",
    "description": "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    "examples": [
      {
        "input": "nums = [3,0,1]",
        "output": "2",
        "explanation": "n = 3 since there are 3 numbers, so all numbers are in [0,3]. 2 is the missing number."
      }
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 10^4",
      "0 <= nums[i] <= n"
    ],
    "optimalApproach": "Sum formula n*(n+1)//2 minus sum of elements, or XOR of [0..n] with elements in nums to avoid integer overflow.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def missingNumber(nums: list[int]) -> int:\n    n = len(nums)\n    xor = 0\n    for i in range(n + 1): xor ^= i\n    for x in nums: xor ^= x\n    return xor",
      "cpp": "int missingNumber(vector<int>& nums) {\n    int n = nums.size(), x = 0;\n    for (int i = 0; i <= n; i++) x ^= i;\n    for (int v : nums) x ^= v;\n    return x;\n}",
      "java": "public int missingNumber(int[] nums) {\n    int n = nums.length, x = 0;\n    for (int i = 0; i <= n; i++) x ^= i;\n    for (int v : nums) x ^= v;\n    return x;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "practiceUrl": "https://leetcode.com/problems/missing-number/",
    "articleUrl": "https://takeuforward.org/arrays/find-the-missing-number-in-an-array/"
  },
  {
    "id": "strivers-13",
    "sheetIndex": 13,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Medium Arrays",
    "title": "Two Sum (2Sum)",
    "difficulty": "Easy",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Each input would have exactly one solution, and you may not use the same element twice.",
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Exactly one valid answer exists."
    ],
    "optimalApproach": "Use a hash map to store each number and its index. For each element x, check if (target - x) exists in the map.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        comp = target - num\n        if comp in seen:\n            return [seen[comp], i]\n        seen[num] = i\n    return []",
      "cpp": "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for (int i = 0; i < (int)nums.size(); i++) {\n        int comp = target - nums[i];\n        if (mp.count(comp)) return {mp[comp], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}",
      "java": "public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int comp = target - nums[i];\n        if (map.containsKey(comp)) return new int[]{map.get(comp), i};\n        map.put(nums[i], i);\n    }\n    return new int[]{};\n}"
    },
    "companies": [
      "Google",
      "Amazon",
      "Apple",
      "Meta"
    ],
    "practiceUrl": "https://leetcode.com/problems/two-sum/",
    "articleUrl": "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/"
  },
  {
    "id": "strivers-14",
    "sheetIndex": 14,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Medium Arrays",
    "title": "Sort an Array of 0s, 1s and 2s (Dutch National Flag)",
    "difficulty": "Medium",
    "description": "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with 0s first, 1s next, and 2s last.",
    "examples": [
      {
        "input": "nums = [2,0,2,1,1,0]",
        "output": "[0,0,1,1,2,2]",
        "explanation": "Array sorted in 0s, 1s, and 2s order."
      }
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 300",
      "nums[i] is either 0, 1, or 2."
    ],
    "optimalApproach": "Dutch National Flag algorithm: 3 pointers low, mid, high. Swap nums[mid] with nums[low] for 0, increment mid for 1, and swap with nums[high] for 2.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def sortColors(nums: list[int]) -> None:\n    low, mid, high = 0, 0, len(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1; mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1",
      "cpp": "void sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = nums.size() - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) swap(nums[low++], nums[mid++]);\n        else if (nums[mid] == 1) mid++;\n        else swap(nums[mid], nums[high--]);\n    }\n}",
      "java": "public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) {\n            int t = nums[low]; nums[low++] = nums[mid]; nums[mid++] = t;\n        } else if (nums[mid] == 1) {\n            mid++;\n        } else {\n            int t = nums[mid]; nums[mid] = nums[high]; nums[high--] = t;\n        }\n    }\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Salesforce"
    ],
    "practiceUrl": "https://leetcode.com/problems/sort-colors/",
    "articleUrl": "https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/"
  },
  {
    "id": "strivers-15",
    "sheetIndex": 15,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Medium Arrays",
    "title": "Majority Element (> N/2 times) (Moore's Voting)",
    "difficulty": "Easy",
    "description": "Given an array nums of size n, return the majority element that appears more than floor(n / 2) times. Assume the majority element always exists.",
    "examples": [
      {
        "input": "nums = [2,2,1,1,1,2,2]",
        "output": "2",
        "explanation": "2 appears 4 times in array of length 7, which is > 7/2."
      }
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 5 * 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "optimalApproach": "Moore's Voting Algorithm: Maintain a candidate and a counter. Increment if same element, decrement otherwise. Counter drops to 0 triggers candidate change.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def majorityElement(nums: list[int]) -> int:\n    count = 0\n    candidate = None\n    for num in nums:\n        if count == 0: candidate = num\n        count += (1 if num == candidate else -1)\n    return candidate",
      "cpp": "int majorityElement(vector<int>& nums) {\n    int count = 0, candidate = 0;\n    for (int num : nums) {\n        if (count == 0) candidate = num;\n        count += (num == candidate ? 1 : -1);\n    }\n    return candidate;\n}",
      "java": "public int majorityElement(int[] nums) {\n    int count = 0, candidate = 0;\n    for (int num : nums) {\n        if (count == 0) candidate = num;\n        count += (num == candidate ? 1 : -1);\n    }\n    return candidate;\n}"
    },
    "companies": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "practiceUrl": "https://leetcode.com/problems/majority-element/",
    "articleUrl": "https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times/"
  },
  {
    "id": "strivers-16",
    "sheetIndex": 16,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Medium Arrays",
    "title": "Maximum Subarray Sum (Kadane's Algorithm)",
    "difficulty": "Medium",
    "description": "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    "examples": [
      {
        "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        "output": "6",
        "explanation": "The subarray [4,-1,2,1] has the largest sum 6."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "optimalApproach": "Kadane's algorithm: Accumulate running sum. If sum drops below 0, reset sum to 0. Maximize answer at each step.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def maxSubArray(nums: list[int]) -> int:\n    max_sum = float('-inf')\n    curr = 0\n    for x in nums:\n        curr += x\n        max_sum = max(max_sum, curr)\n        if curr < 0: curr = 0\n    return max_sum",
      "cpp": "int maxSubArray(vector<int>& nums) {\n    int max_s = INT_MIN, curr = 0;\n    for (int x : nums) {\n        curr += x;\n        max_s = max(max_s, curr);\n        if (curr < 0) curr = 0;\n    }\n    return max_s;\n}",
      "java": "public int maxSubArray(int[] nums) {\n    int maxS = Integer.MIN_VALUE, curr = 0;\n    for (int x : nums) {\n        curr += x;\n        maxS = Math.max(maxS, curr);\n        if (curr < 0) curr = 0;\n    }\n    return maxS;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "LinkedIn",
      "Apple"
    ],
    "practiceUrl": "https://leetcode.com/problems/maximum-subarray/",
    "articleUrl": "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/"
  },
  {
    "id": "strivers-17",
    "sheetIndex": 17,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Medium Arrays",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "description": "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    "examples": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "output": "5",
        "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
      }
    ],
    "constraints": [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    "optimalApproach": "Track the minimum price seen so far and update max profit = max(max_profit, current_price - min_price).",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def maxProfit(prices: list[int]) -> int:\n    min_p, max_p = float('inf'), 0\n    for p in prices:\n        min_p = min(min_p, p)\n        max_p = max(max_p, p - min_p)\n    return max_p",
      "cpp": "int maxProfit(vector<int>& prices) {\n    int min_p = INT_MAX, max_p = 0;\n    for (int p : prices) {\n        min_p = min(min_p, p);\n        max_p = max(max_p, p - min_p);\n    }\n    return max_p;\n}",
      "java": "public int maxProfit(int[] prices) {\n    int minP = Integer.MAX_VALUE, maxP = 0;\n    for (int p : prices) {\n        minP = Math.min(minP, p);\n        maxP = Math.max(maxP, p - minP);\n    }\n    return maxP;\n}"
    },
    "companies": [
      "Amazon",
      "Google",
      "Facebook",
      "Microsoft"
    ],
    "practiceUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "articleUrl": "https://takeuforward.org/data-structure/stock-buy-and-sell/"
  },
  {
    "id": "strivers-18",
    "sheetIndex": 18,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Medium Arrays",
    "title": "Next Permutation",
    "difficulty": "Medium",
    "description": "A permutation of an array of integers is an arrangement of its members into a sequence. Find the next lexicographically greater permutation in-place.",
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[1,3,2]",
        "explanation": "Lexicographically next permutation after [1,2,3] is [1,3,2]."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 100"
    ],
    "optimalApproach": "1. Find first index i from right where nums[i] < nums[i+1]. 2. Find first index j from right where nums[j] > nums[i]. 3. Swap nums[i] and nums[j]. 4. Reverse subarray from i+1 to end.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def nextPermutation(nums: list[int]) -> None:\n    i = len(nums) - 2\n    while i >= 0 and nums[i] >= nums[i + 1]: i -= 1\n    if i >= 0:\n        j = len(nums) - 1\n        while nums[j] <= nums[i]: j -= 1\n        nums[i], nums[j] = nums[j], nums[i]\n    nums[i + 1:] = reversed(nums[i + 1:])",
      "cpp": "void nextPermutation(vector<int>& nums) {\n    int n = nums.size(), i = n - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n        int j = n - 1;\n        while (nums[j] <= nums[i]) j--;\n        swap(nums[i], nums[j]);\n    }\n    reverse(nums.begin() + i + 1, nums.end());\n}",
      "java": "public void nextPermutation(int[] nums) {\n    int n = nums.length, i = n - 2;\n    while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n    if (i >= 0) {\n        int j = n - 1;\n        while (nums[j] <= nums[i]) j--;\n        int t = nums[i]; nums[i] = nums[j]; nums[j] = t;\n    }\n    int l = i + 1, r = n - 1;\n    while (l < r) {\n        int t = nums[l]; nums[l++] = nums[r]; nums[r--] = t;\n    }\n}"
    },
    "companies": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/next-permutation/",
    "articleUrl": "https://takeuforward.org/data-structure/next_permutation-find-next-lexicographically-greater-permutation/"
  },
  {
    "id": "strivers-19",
    "sheetIndex": 19,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Medium Arrays",
    "title": "Rotate Image (by 90 degrees)",
    "difficulty": "Medium",
    "description": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees clockwise in-place.",
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[[7,4,1],[8,5,2],[9,6,3]]",
        "explanation": "Rotate matrix by 90 degrees clockwise."
      }
    ],
    "constraints": [
      "n == matrix.length == matrix[i].length",
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000"
    ],
    "optimalApproach": "Transpose the matrix (swap matrix[i][j] and matrix[j][i]), then reverse each individual row.",
    "timeComplexity": "O(N^2)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def rotate(matrix: list[list[int]]) -> None:\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for row in matrix:\n        row.reverse()",
      "cpp": "void rotate(vector<vector<int>>& matrix) {\n    int n = matrix.size();\n    for (int i = 0; i < n; i++)\n        for (int j = i + 1; j < n; j++)\n            swap(matrix[i][j], matrix[j][i]);\n    for (int i = 0; i < n; i++)\n        reverse(matrix[i].begin(), matrix[i].end());\n}",
      "java": "public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            int t = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = t;\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        int l = 0, r = n - 1;\n        while (l < r) {\n            int t = matrix[i][l]; matrix[i][l++] = matrix[i][r]; matrix[i][r--] = t;\n        }\n    }\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Uber"
    ],
    "practiceUrl": "https://leetcode.com/problems/rotate-image/",
    "articleUrl": "https://takeuforward.org/data-structure/rotate-image-by-90-degree/"
  },
  {
    "id": "strivers-20",
    "sheetIndex": 20,
    "stepId": 3,
    "stepTitle": "Step 3: Solve Problems on Arrays",
    "stepShortTitle": "Arrays",
    "stepIcon": "\ud83d\udce6",
    "topic": "Hard Arrays",
    "title": "3-Sum (Three Sum)",
    "difficulty": "Medium",
    "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
    "examples": [
      {
        "input": "nums = [-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]",
        "explanation": "Distinct triplets summing to 0."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "optimalApproach": "Sort the array. Fix the first element nums[i], and use two pointers (left and right) to find remaining two elements summing to -nums[i]. Skip duplicates.",
    "timeComplexity": "O(N^2)",
    "spaceComplexity": "O(1) extra space",
    "solutions": {
      "python": "def threeSum(nums: list[int]) -> list[list[int]]:\n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i - 1]: continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l + 1]: l += 1\n                while l < r and nums[r] == nums[r - 1]: r -= 1\n                l += 1; r -= 1\n            elif s < 0: l += 1\n            else: r -= 1\n    return res",
      "cpp": "vector<vector<int>> threeSum(vector<int>& nums) {\n    sort(nums.begin(), nums.end());\n    vector<vector<int>> res;\n    int n = nums.size();\n    for (int i = 0; i < n - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int l = i + 1, r = n - 1;\n        while (l < r) {\n            int s = nums[i] + nums[l] + nums[r];\n            if (s == 0) {\n                res.push_back({nums[i], nums[l], nums[r]});\n                while (l < r && nums[l] == nums[l + 1]) l++;\n                while (l < r && nums[r] == nums[r - 1]) r--;\n                l++; r--;\n            } else if (s < 0) l++;\n            else r--;\n        }\n    }\n    return res;\n}",
      "java": "public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> res = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            int s = nums[i] + nums[l] + nums[r];\n            if (s == 0) {\n                res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                while (l < r && nums[l] == nums[l + 1]) l++;\n                while (l < r && nums[r] == nums[r - 1]) r--;\n                l++; r--;\n            } else if (s < 0) l++;\n            else r--;\n        }\n    }\n    return res;\n}"
    },
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "practiceUrl": "https://leetcode.com/problems/3sum/",
    "articleUrl": "https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-a-zero/"
  },
  {
    "id": "strivers-21",
    "sheetIndex": 21,
    "stepId": 4,
    "stepTitle": "Step 4: Binary Search",
    "stepShortTitle": "Binary Search",
    "stepIcon": "\ud83d\udd0d",
    "topic": "1D Binary Search",
    "title": "Binary Search to Find X in Sorted Array",
    "difficulty": "Easy",
    "description": "Given a sorted array of N integers and a target value X, return the index if target is found. Otherwise return -1.",
    "examples": [
      {
        "input": "nums = [-1,0,3,5,9,12], target = 9",
        "output": "4",
        "explanation": "9 exists in nums and its index is 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All elements in nums are unique and sorted."
    ],
    "optimalApproach": "Standard binary search with two pointers low and high. Calculate mid = low + (high - low) // 2.",
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def search(nums: list[int], target: int) -> int:\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1",
      "cpp": "int search(vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}",
      "java": "public int search(int[] nums, int target) {\n    int low = 0, high = nums.length - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}"
    },
    "companies": [
      "Apple",
      "Adobe",
      "Microsoft"
    ],
    "practiceUrl": "https://leetcode.com/problems/binary-search/",
    "articleUrl": "https://takeuforward.org/data-structure/binary-search-explained/"
  },
  {
    "id": "strivers-22",
    "sheetIndex": 22,
    "stepId": 4,
    "stepTitle": "Step 4: Binary Search",
    "stepShortTitle": "Binary Search",
    "stepIcon": "\ud83d\udd0d",
    "topic": "1D Binary Search",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "description": "Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
    "examples": [
      {
        "input": "nums = [4,5,6,7,0,1,2], target = 0",
        "output": "4",
        "explanation": "0 is found at index 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values are unique."
    ],
    "optimalApproach": "Identify which half (left or right) is sorted. If target lies within bounds of the sorted half, narrow search to that half; otherwise search the other half.",
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def search(nums: list[int], target: int) -> int:\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target: return mid\n        if nums[low] <= nums[mid]:\n            if nums[low] <= target < nums[mid]: high = mid - 1\n            else: low = mid + 1\n        else:\n            if nums[mid] < target <= nums[high]: low = mid + 1\n            else: high = mid - 1\n    return -1",
      "cpp": "int search(vector<int>& nums, int target) {\n    int low = 0, high = nums.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[low] <= nums[mid]) {\n            if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    return -1;\n}",
      "java": "public int search(int[] nums, int target) {\n    int low = 0, high = nums.length - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[low] <= nums[mid]) {\n            if (nums[low] <= target && target < nums[mid]) high = mid - 1;\n            else low = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[high]) low = mid + 1;\n            else high = mid - 1;\n        }\n    }\n    return -1;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Facebook"
    ],
    "practiceUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "articleUrl": "https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/"
  },
  {
    "id": "strivers-23",
    "sheetIndex": 23,
    "stepId": 4,
    "stepTitle": "Step 4: Binary Search",
    "stepShortTitle": "Binary Search",
    "stepIcon": "\ud83d\udd0d",
    "topic": "1D Binary Search",
    "title": "Find Peak Element",
    "difficulty": "Medium",
    "description": "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index.",
    "examples": [
      {
        "input": "nums = [1,2,3,1]",
        "output": "2",
        "explanation": "3 is a peak element and your function should return index 2."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 1000",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    "optimalApproach": "Binary search: If nums[mid] > nums[mid + 1], peak must lie in left half (including mid). Else peak lies in right half.",
    "timeComplexity": "O(log N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def findPeakElement(nums: list[int]) -> int:\n    low, high = 0, len(nums) - 1\n    while low < high:\n        mid = (low + high) // 2\n        if nums[mid] > nums[mid + 1]: high = mid\n        else: low = mid + 1\n    return low",
      "cpp": "int findPeakElement(vector<int>& nums) {\n    int low = 0, high = nums.size() - 1;\n    while (low < high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] > nums[mid + 1]) high = mid;\n        else low = mid + 1;\n    }\n    return low;\n}",
      "java": "public int findPeakElement(int[] nums) {\n    int low = 0, high = nums.length - 1;\n    while (low < high) {\n        int mid = low + (high - low) / 2;\n        if (nums[mid] > nums[mid + 1]) high = mid;\n        else low = mid + 1;\n    }\n    return low;\n}"
    },
    "companies": [
      "Google",
      "Facebook",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/find-peak-element/",
    "articleUrl": "https://takeuforward.org/data-structure/peak-element-in-array/"
  },
  {
    "id": "strivers-24",
    "sheetIndex": 24,
    "stepId": 4,
    "stepTitle": "Step 4: Binary Search",
    "stepShortTitle": "Binary Search",
    "stepIcon": "\ud83d\udd0d",
    "topic": "BS on Answers",
    "title": "Koko Eating Bananas",
    "difficulty": "Medium",
    "description": "Koko loves to eat bananas. There are n piles of bananas. Koko can decide her eating-speed of k bananas-per-hour. Find the minimum integer k such that she can eat all bananas within h hours.",
    "examples": [
      {
        "input": "piles = [3,6,7,11], h = 8",
        "output": "4",
        "explanation": "With speed 4, Koko takes 1 + 2 + 2 + 3 = 8 hours <= 8."
      }
    ],
    "constraints": [
      "1 <= piles.length <= 10^4",
      "piles.length <= h <= 10^9",
      "1 <= piles[i] <= 10^9"
    ],
    "optimalApproach": "Binary Search on speed k in range [1, max(piles)]. For each speed mid, calculate total hours: sum(ceil(p / mid)).",
    "timeComplexity": "O(N * log(max(piles)))",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def minEatingSpeed(piles: list[int], h: int) -> int:\n    import math\n    low, high = 1, max(piles)\n    ans = high\n    while low <= high:\n        mid = (low + high) // 2\n        hours = sum(math.ceil(p / mid) for p in piles)\n        if hours <= h:\n            ans = mid\n            high = mid - 1\n        else:\n            low = mid + 1\n    return ans",
      "cpp": "int minEatingSpeed(vector<int>& piles, int h) {\n    long long low = 1, high = *max_element(piles.begin(), piles.end()), ans = high;\n    while (low <= high) {\n        long long mid = low + (high - low) / 2;\n        long long hours = 0;\n        for (int p : piles) hours += (p + mid - 1) / mid;\n        if (hours <= h) {\n            ans = mid;\n            high = mid - 1;\n        } else low = mid + 1;\n    }\n    return ans;\n}",
      "java": "public int minEatingSpeed(int[] piles, int h) {\n    int low = 1, high = 0;\n    for (int p : piles) high = Math.max(high, p);\n    int ans = high;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        long hours = 0;\n        for (int p : piles) hours += (p + mid - 1) / mid;\n        if (hours <= h) {\n            ans = mid;\n            high = mid - 1;\n        } else low = mid + 1;\n    }\n    return ans;\n}"
    },
    "companies": [
      "Google",
      "Airbnb",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/koko-eating-bananas/",
    "articleUrl": "https://takeuforward.org/binary-search/koko-eating-bananas/"
  },
  {
    "id": "strivers-25",
    "sheetIndex": 25,
    "stepId": 4,
    "stepTitle": "Step 4: Binary Search",
    "stepShortTitle": "Binary Search",
    "stepIcon": "\ud83d\udd0d",
    "topic": "BS on Answers",
    "title": "Aggressive Cows",
    "difficulty": "Hard",
    "description": "You are given an array 'stalls' denoting positions of stalls and an integer 'k' denoting cows. Assign stalls such that the minimum distance between any two cows is as large as possible.",
    "examples": [
      {
        "input": "stalls = [0, 3, 4, 7, 10, 9], k = 4",
        "output": "3",
        "explanation": "Cows at 0, 3, 7, 10 have minimum distance 3."
      }
    ],
    "constraints": [
      "2 <= stalls.length <= 10^5",
      "2 <= k <= stalls.length",
      "0 <= stalls[i] <= 10^9"
    ],
    "optimalApproach": "Sort stalls. Binary search on the answer distance in range [1, stalls[n-1] - stalls[0]]. Greedy check if k cows can be placed with at least 'mid' distance.",
    "timeComplexity": "O(N log N + N * log(max-min))",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def aggressiveCows(stalls: list[int], k: int) -> int:\n    stalls.sort()\n    def canPlace(dist):\n        cows = 1; last = stalls[0]\n        for s in stalls[1:]:\n            if s - last >= dist:\n                cows += 1; last = s\n        return cows >= k\n    low, high = 1, stalls[-1] - stalls[0]\n    ans = 1\n    while low <= high:\n        mid = (low + high) // 2\n        if canPlace(mid):\n            ans = mid; low = mid + 1\n        else: high = mid - 1\n    return ans",
      "cpp": "bool canPlace(vector<int>& stalls, int dist, int k) {\n    int cows = 1, last = stalls[0];\n    for (int i = 1; i < (int)stalls.size(); i++) {\n        if (stalls[i] - last >= dist) { cows++; last = stalls[i]; }\n    }\n    return cows >= k;\n}\nint aggressiveCows(vector<int>& stalls, int k) {\n    sort(stalls.begin(), stalls.end());\n    int low = 1, high = stalls.back() - stalls[0], ans = 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (canPlace(stalls, mid, k)) { ans = mid; low = mid + 1; }\n        else high = mid - 1;\n    }\n    return ans;\n}",
      "java": "public int aggressiveCows(int[] stalls, int k) {\n    Arrays.sort(stalls);\n    int low = 1, high = stalls[stalls.length - 1] - stalls[0], ans = 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        int cows = 1, last = stalls[0];\n        for (int i = 1; i < stalls.length; i++) {\n            if (stalls[i] - last >= mid) { cows++; last = stalls[i]; }\n        }\n        if (cows >= k) { ans = mid; low = mid + 1; }\n        else high = mid - 1;\n    }\n    return ans;\n}"
    },
    "companies": [
      "Google",
      "Microsoft"
    ],
    "practiceUrl": "https://practice.geeksforgeeks.org/problems/aggressive-cows/1",
    "articleUrl": "https://takeuforward.org/data-structure/aggressive-cows-detailed-solution/"
  },
  {
    "id": "strivers-26",
    "sheetIndex": 26,
    "stepId": 5,
    "stepTitle": "Step 5: Strings [Basic and Medium]",
    "stepShortTitle": "Strings",
    "stepIcon": "\ud83d\udd24",
    "topic": "Basic Strings",
    "title": "Reverse Words in a String",
    "difficulty": "Medium",
    "description": "Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. Return a string of words in reverse order concatenated by a single space.",
    "examples": [
      {
        "input": "s = 'the sky is blue'",
        "output": "'blue is sky the'",
        "explanation": "Words reversed with single space."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s contains English letters, digits, and spaces."
    ],
    "optimalApproach": "Trim spaces, extract words into tokens, and join them in reverse order, or reverse entire string and then reverse each word in-place.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "def reverseWords(s: str) -> str:\n    return ' '.join(reversed(s.strip().split()))",
      "cpp": "string reverseWords(string s) {\n    stringstream ss(s);\n    string word, ans = \"\";\n    vector<string> words;\n    while (ss >> word) words.push_back(word);\n    for (int i = (int)words.size() - 1; i >= 0; i--) {\n        ans += words[i] + (i > 0 ? \" \" : \"\");\n    }\n    return ans;\n}",
      "java": "public String reverseWords(String s) {\n    String[] words = s.trim().split(\"\\\\s+\");\n    StringBuilder sb = new StringBuilder();\n    for (int i = words.length - 1; i >= 0; i--) {\n        sb.append(words[i]);\n        if (i > 0) sb.append(\" \");\n    }\n    return sb.toString();\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Cisco"
    ],
    "practiceUrl": "https://leetcode.com/problems/reverse-words-in-a-string/",
    "articleUrl": "https://takeuforward.org/data-structure/reverse-words-in-a-string/"
  },
  {
    "id": "strivers-27",
    "sheetIndex": 27,
    "stepId": 5,
    "stepTitle": "Step 5: Strings [Basic and Medium]",
    "stepShortTitle": "Strings",
    "stepIcon": "\ud83d\udd24",
    "topic": "Basic Strings",
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "examples": [
      {
        "input": "s = 'anagram', t = 'nagaram'",
        "output": "true",
        "explanation": "t can be formed by rearranging characters of s."
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 5 * 10^4",
      "s and t consist of lowercase English letters."
    ],
    "optimalApproach": "Use a frequency array of 26 integers. Count letters in s (+1) and t (-1); return true only if all counts are 0.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1) (26 characters)",
    "solutions": {
      "python": "def isAnagram(s: str, t: str) -> bool:\n    if len(s) != len(t): return False\n    cnt = [0] * 26\n    for a, b in zip(s, t):\n        cnt[ord(a) - ord('a')] += 1\n        cnt[ord(b) - ord('a')] -= 1\n    return all(x == 0 for x in cnt)",
      "cpp": "bool isAnagram(string s, string t) {\n    if (s.length() != t.length()) return false;\n    int cnt[26] = {0};\n    for (char c : s) cnt[c - 'a']++;\n    for (char c : t) if (--cnt[c - 'a'] < 0) return false;\n    return true;\n}",
      "java": "public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] cnt = new int[26];\n    for (char c : s.toCharArray()) cnt[c - 'a']++;\n    for (char c : t.toCharArray()) if (--cnt[c - 'a'] < 0) return false;\n    return true;\n}"
    },
    "companies": [
      "Google",
      "Bloomberg",
      "Uber"
    ],
    "practiceUrl": "https://leetcode.com/problems/valid-anagram/",
    "articleUrl": "https://takeuforward.org/data-structure/check-if-two-strings-are-anagrams-of-each-other/"
  },
  {
    "id": "strivers-28",
    "sheetIndex": 28,
    "stepId": 5,
    "stepTitle": "Step 5: Strings [Basic and Medium]",
    "stepShortTitle": "Strings",
    "stepIcon": "\ud83d\udd24",
    "topic": "Basic Strings",
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "description": "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string ''.",
    "examples": [
      {
        "input": "strs = ['flower','flow','flight']",
        "output": "'fl'",
        "explanation": "Prefix 'fl' is shared by all three strings."
      }
    ],
    "constraints": [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200"
    ],
    "optimalApproach": "Sort the strings array; the longest common prefix of the entire array must be the common prefix between the first and last sorted string.",
    "timeComplexity": "O(N * M log N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def longestCommonPrefix(strs: list[str]) -> str:\n    if not strs: return ''\n    strs.sort()\n    first, last = strs[0], strs[-1]\n    i = 0\n    while i < min(len(first), len(last)) and first[i] == last[i]:\n        i += 1\n    return first[:i]",
      "cpp": "string longestCommonPrefix(vector<string>& strs) {\n    if (strs.empty()) return \"\";\n    sort(strs.begin(), strs.end());\n    string first = strs.front(), last = strs.back();\n    int i = 0;\n    while (i < min(first.size(), last.size()) && first[i] == last[i]) i++;\n    return first.substr(0, i);\n}",
      "java": "public String longestCommonPrefix(String[] strs) {\n    if (strs == null || strs.length == 0) return \"\";\n    Arrays.sort(strs);\n    String f = strs[0], l = strs[strs.length - 1];\n    int i = 0;\n    while (i < Math.min(f.length(), l.length()) && f.charAt(i) == l.charAt(i)) i++;\n    return f.substring(0, i);\n}"
    },
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "practiceUrl": "https://leetcode.com/problems/longest-common-prefix/",
    "articleUrl": "https://takeuforward.org/data-structure/longest-common-prefix/"
  },
  {
    "id": "strivers-29",
    "sheetIndex": 29,
    "stepId": 5,
    "stepTitle": "Step 5: Strings [Basic and Medium]",
    "stepShortTitle": "Strings",
    "stepIcon": "\ud83d\udd24",
    "topic": "Medium Strings",
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "description": "Given a string s, return the longest palindromic substring in s.",
    "examples": [
      {
        "input": "s = 'babad'",
        "output": "'bab' (or 'aba')",
        "explanation": "Both 'bab' and 'aba' are valid answers of length 3."
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    "optimalApproach": "Expand Around Center: Each character (odd length) and each pair of adjacent characters (even length) can serve as palindrome centers.",
    "timeComplexity": "O(N^2)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def longestPalindrome(s: str) -> str:\n    start = max_len = 0\n    for i in range(len(s)):\n        for l, r in ((i, i), (i, i + 1)):\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                if r - l + 1 > max_len:\n                    start, max_len = l, r - l + 1\n                l -= 1; r += 1\n    return s[start:start + max_len]",
      "cpp": "string longestPalindrome(string s) {\n    int start = 0, max_l = 0, n = s.size();\n    for (int i = 0; i < n; i++) {\n        for (auto [l, r] : {pair{i, i}, {i, i + 1}}) {\n            while (l >= 0 && r < n && s[l] == s[r]) {\n                if (r - l + 1 > max_l) { start = l; max_l = r - l + 1; }\n                l--; r++;\n            }\n        }\n    }\n    return s.substr(start, max_l);\n}",
      "java": "public String longestPalindrome(String s) {\n    int start = 0, maxL = 0;\n    for (int i = 0; i < s.length(); i++) {\n        int len1 = expand(s, i, i), len2 = expand(s, i, i + 1);\n        int len = Math.max(len1, len2);\n        if (len > maxL) { maxL = len; start = i - (len - 1) / 2; }\n    }\n    return s.substring(start, start + maxL);\n}\nprivate int expand(String s, int l, int r) {\n    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }\n    return r - l - 1;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta"
    ],
    "practiceUrl": "https://leetcode.com/problems/longest-palindromic-substring/",
    "articleUrl": "https://takeuforward.org/data-structure/longest-palindromic-substring/"
  },
  {
    "id": "strivers-30",
    "sheetIndex": 30,
    "stepId": 6,
    "stepTitle": "Step 6: Learn LinkedList",
    "stepShortTitle": "Linked List",
    "stepIcon": "\ud83d\udd17",
    "topic": "1D Linked List",
    "title": "Middle of the Linked List",
    "difficulty": "Easy",
    "description": "Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[3,4,5]",
        "explanation": "The middle node of the list is node 3."
      }
    ],
    "constraints": [
      "The number of nodes in the list is in the range [1, 100].",
      "1 <= Node.val <= 100"
    ],
    "optimalApproach": "Tortoise and Hare approach: Move slow pointer 1 step and fast pointer 2 steps. When fast reaches end, slow is at the middle.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def middleNode(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow",
      "cpp": "ListNode* middleNode(ListNode* head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}",
      "java": "public ListNode middleNode(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n    }\n    return slow;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Adobe"
    ],
    "practiceUrl": "https://leetcode.com/problems/middle-of-the-linked-list/",
    "articleUrl": "https://takeuforward.org/data-structure/find-middle-element-in-a-linked-list/"
  },
  {
    "id": "strivers-31",
    "sheetIndex": 31,
    "stepId": 6,
    "stepTitle": "Step 6: Learn LinkedList",
    "stepShortTitle": "Linked List",
    "stepIcon": "\ud83d\udd17",
    "topic": "1D Linked List",
    "title": "Reverse a Linked List",
    "difficulty": "Easy",
    "description": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5]",
        "output": "[5,4,3,2,1]",
        "explanation": "List is reversed."
      }
    ],
    "constraints": [
      "The number of nodes is in range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    "optimalApproach": "Maintain three pointers: prev, curr, and next. In each step: next = curr.next; curr.next = prev; prev = curr; curr = next.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev",
      "cpp": "ListNode* reverseList(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while (curr) {\n        ListNode* nxt = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}",
      "java": "public ListNode reverseList(ListNode head) {\n    ListNode prev = null, curr = head;\n    while (curr != null) {\n        ListNode nxt = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}"
    },
    "companies": [
      "Google",
      "Microsoft",
      "Apple"
    ],
    "practiceUrl": "https://leetcode.com/problems/reverse-linked-list/",
    "articleUrl": "https://takeuforward.org/data-structure/reverse-a-linked-list/"
  },
  {
    "id": "strivers-32",
    "sheetIndex": 32,
    "stepId": 6,
    "stepTitle": "Step 6: Learn LinkedList",
    "stepShortTitle": "Linked List",
    "stepIcon": "\ud83d\udd17",
    "topic": "Medium LinkedList",
    "title": "Detect Cycle in a Linked List",
    "difficulty": "Easy",
    "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    "examples": [
      {
        "input": "head = [3,2,0,-4], pos = 1",
        "output": "true",
        "explanation": "There is a cycle where tail connects to 1st node (0-indexed)."
      }
    ],
    "constraints": [
      "The number of the nodes in the list is in the range [0, 10^4].",
      "-10^5 <= Node.val <= 10^5"
    ],
    "optimalApproach": "Floyd's Cycle-Finding Algorithm (Tortoise and Hare): If slow and fast pointers meet, a cycle exists. If fast reaches null, no cycle.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def hasCycle(head) -> bool:\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True\n    return False",
      "cpp": "bool hasCycle(ListNode *head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true;\n    }\n    return false;\n}",
      "java": "public boolean hasCycle(ListNode head) {\n    ListNode slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) return true;\n    }\n    return false;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Bloomberg"
    ],
    "practiceUrl": "https://leetcode.com/problems/linked-list-cycle/",
    "articleUrl": "https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/"
  },
  {
    "id": "strivers-33",
    "sheetIndex": 33,
    "stepId": 6,
    "stepTitle": "Step 6: Learn LinkedList",
    "stepShortTitle": "Linked List",
    "stepIcon": "\ud83d\udd17",
    "topic": "Medium LinkedList",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "description": "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list and return its head.",
    "examples": [
      {
        "input": "list1 = [1,2,4], list2 = [1,3,4]",
        "output": "[1,1,2,3,4,4]",
        "explanation": "Merged list is sorted."
      }
    ],
    "constraints": [
      "The number of nodes in both lists is in range [0, 50].",
      "-100 <= Node.val <= 100"
    ],
    "optimalApproach": "Create a dummy node and attach the smaller head pointer at each step. Move forward until one list empties.",
    "timeComplexity": "O(N + M)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def mergeTwoLists(l1, l2):\n    dummy = ListNode(0)\n    curr = dummy\n    while l1 and l2:\n        if l1.val <= l2.val:\n            curr.next = l1; l1 = l1.next\n        else:\n            curr.next = l2; l2 = l2.next\n        curr = curr.next\n    curr.next = l1 or l2\n    return dummy.next",
      "cpp": "ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n    ListNode dummy(0), *curr = &dummy;\n    while (l1 && l2) {\n        if (l1->val <= l2->val) { curr->next = l1; l1 = l1->next; }\n        else { curr->next = l2; l2 = l2->next; }\n        curr = curr->next;\n    }\n    curr->next = l1 ? l1 : l2;\n    return dummy.next;\n}",
      "java": "public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0), curr = dummy;\n    while (l1 != null && l2 != null) {\n        if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }\n        else { curr.next = l2; l2 = l2.next; }\n        curr = curr.next;\n    }\n    curr.next = (l1 != null) ? l1 : l2;\n    return dummy.next;\n}"
    },
    "companies": [
      "Amazon",
      "Apple",
      "Microsoft"
    ],
    "practiceUrl": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "articleUrl": "https://takeuforward.org/data-structure/merge-two-sorted-linked-lists/"
  },
  {
    "id": "strivers-34",
    "sheetIndex": 34,
    "stepId": 6,
    "stepTitle": "Step 6: Learn LinkedList",
    "stepShortTitle": "Linked List",
    "stepIcon": "\ud83d\udd17",
    "topic": "Medium LinkedList",
    "title": "Remove N-th Node From End of List",
    "difficulty": "Medium",
    "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head in a single pass.",
    "examples": [
      {
        "input": "head = [1,2,3,4,5], n = 2",
        "output": "[1,2,3,5]",
        "explanation": "The 2nd node from the end is 4."
      }
    ],
    "constraints": [
      "The number of nodes in the list is sz.",
      "1 <= sz <= 30",
      "1 <= n <= sz"
    ],
    "optimalApproach": "Use two pointers fast and slow starting at dummy node. Advance fast by n steps, then move both together until fast reaches the end.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def removeNthFromEnd(head, n: int):\n    dummy = ListNode(0, head)\n    fast = slow = dummy\n    for _ in range(n):\n        fast = fast.next\n    while fast.next:\n        fast = fast.next\n        slow = slow.next\n    slow.next = slow.next.next\n    return dummy.next",
      "cpp": "ListNode* removeNthFromEnd(ListNode* head, int n) {\n    ListNode dummy(0, head);\n    ListNode* fast = &dummy, *slow = &dummy;\n    for (int i = 0; i < n; i++) fast = fast->next;\n    while (fast->next) { fast = fast->next; slow = slow->next; }\n    slow->next = slow->next->next;\n    return dummy.next;\n}",
      "java": "public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0, head);\n    ListNode fast = dummy, slow = dummy;\n    for (int i = 0; i < n; i++) fast = fast.next;\n    while (fast.next != null) { fast = fast.next; slow = slow.next; }\n    slow.next = slow.next.next;\n    return dummy.next;\n}"
    },
    "companies": [
      "Amazon",
      "Google",
      "Facebook"
    ],
    "practiceUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "articleUrl": "https://takeuforward.org/data-structure/delete-nth-node-from-end-of-a-linked-list/"
  },
  {
    "id": "strivers-35",
    "sheetIndex": 35,
    "stepId": 6,
    "stepTitle": "Step 6: Learn LinkedList",
    "stepShortTitle": "Linked List",
    "stepIcon": "\ud83d\udd17",
    "topic": "Medium LinkedList",
    "title": "Add Two Numbers Represented as Linked Lists",
    "difficulty": "Medium",
    "description": "You are given two non-empty linked lists representing two non-negative integers. Digits are stored in reverse order. Add the two numbers and return the sum as a linked list.",
    "examples": [
      {
        "input": "l1 = [2,4,3], l2 = [5,6,4]",
        "output": "[7,0,8]",
        "explanation": "342 + 465 = 807."
      }
    ],
    "constraints": [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9"
    ],
    "optimalApproach": "Iterate through both lists simultaneously maintaining a carry variable. Append new nodes with (sum % 10) and update carry = sum // 10.",
    "timeComplexity": "O(max(N, M))",
    "spaceComplexity": "O(max(N, M))",
    "solutions": {
      "python": "def addTwoNumbers(l1, l2):\n    dummy = ListNode(0)\n    curr = dummy\n    carry = 0\n    while l1 or l2 or carry:\n        v1 = l1.val if l1 else 0\n        v2 = l2.val if l2 else 0\n        total = v1 + v2 + carry\n        carry = total // 10\n        curr.next = ListNode(total % 10)\n        curr = curr.next\n        l1 = l1.next if l1 else None\n        l2 = l2.next if l2 else None\n    return dummy.next",
      "cpp": "ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n    ListNode dummy(0), *curr = &dummy;\n    int carry = 0;\n    while (l1 || l2 || carry) {\n        int sum = carry + (l1 ? l1->val : 0) + (l2 ? l2->val : 0);\n        carry = sum / 10;\n        curr->next = new ListNode(sum % 10);\n        curr = curr->next;\n        if (l1) l1 = l1->next;\n        if (l2) l2 = l2->next;\n    }\n    return dummy.next;\n}",
      "java": "public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0), curr = dummy;\n    int carry = 0;\n    while (l1 != null || l2 != null || carry != 0) {\n        int sum = carry + (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0);\n        carry = sum / 10;\n        curr.next = new ListNode(sum % 10);\n        curr = curr.next;\n        if (l1 != null) l1 = l1.next;\n        if (l2 != null) l2 = l2.next;\n    }\n    return dummy.next;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta"
    ],
    "practiceUrl": "https://leetcode.com/problems/add-two-numbers/",
    "articleUrl": "https://takeuforward.org/data-structure/add-two-numbers-represented-as-linked-lists/"
  },
  {
    "id": "strivers-36",
    "sheetIndex": 36,
    "stepId": 7,
    "stepTitle": "Step 7: Recursion [Patterns]",
    "stepShortTitle": "Recursion",
    "stepIcon": "\ud83d\udd04",
    "topic": "Subsequences",
    "title": "Generate All Subsequences / Power Set",
    "difficulty": "Medium",
    "description": "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
        "explanation": "All 2^3 subsets."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10",
      "-10 <= nums[i] <= 10"
    ],
    "optimalApproach": "Pick or don't pick recursion pattern at each index, or use bitmasking from 0 to 2^n - 1.",
    "timeComplexity": "O(2^N * N)",
    "spaceComplexity": "O(2^N * N)",
    "solutions": {
      "python": "def subsets(nums: list[int]) -> list[list[int]]:\n    res = []\n    def backtrack(start, path):\n        res.append(list(path))\n        for i in range(start, len(nums)):\n            path.append(nums[i])\n            backtrack(i + 1, path)\n            path.pop()\n    backtrack(0, [])\n    return res",
      "cpp": "void backtrack(vector<int>& nums, int start, vector<int>& path, vector<vector<int>>& res) {\n    res.push_back(path);\n    for (int i = start; i < (int)nums.size(); i++) {\n        path.push_back(nums[i]);\n        backtrack(nums, i + 1, path, res);\n        path.pop_back();\n    }\n}\nvector<vector<int>> subsets(vector<int>& nums) {\n    vector<vector<int>> res; vector<int> path;\n    backtrack(nums, 0, path, res);\n    return res;\n}",
      "java": "public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> res = new ArrayList<>();\n    backtrack(nums, 0, new ArrayList<>(), res);\n    return res;\n}\nprivate void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> res) {\n    res.add(new ArrayList<>(path));\n    for (int i = start; i < nums.length; i++) {\n        path.add(nums[i]);\n        backtrack(nums, i + 1, path, res);\n        path.remove(path.size() - 1);\n    }\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Facebook"
    ],
    "practiceUrl": "https://leetcode.com/problems/subsets/",
    "articleUrl": "https://takeuforward.org/data-structure/power-set-print-all-subsequences-of-a-string/"
  },
  {
    "id": "strivers-37",
    "sheetIndex": 37,
    "stepId": 7,
    "stepTitle": "Step 7: Recursion [Patterns]",
    "stepShortTitle": "Recursion",
    "stepIcon": "\ud83d\udd04",
    "topic": "Combos & Backtracking",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "description": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations where the chosen numbers sum to target. The same number may be chosen unlimited times.",
    "examples": [
      {
        "input": "candidates = [2,3,6,7], target = 7",
        "output": "[[2,2,3],[7]]",
        "explanation": "2 and 3 sum to 7 (2+2+3=7). 7 is also a candidate."
      }
    ],
    "constraints": [
      "1 <= candidates.length <= 30",
      "2 <= candidates[i] <= 40",
      "1 <= target <= 40"
    ],
    "optimalApproach": "Recursively explore: either pick the element at current index (and remain at same index) or skip to next index.",
    "timeComplexity": "O(2^t * k) where t = target / min",
    "spaceComplexity": "O(k * x)",
    "solutions": {
      "python": "def combinationSum(candidates: list[int], target: int) -> list[list[int]]:\n    res = []\n    def backtrack(idx, cur_target, path):\n        if cur_target == 0:\n            res.append(list(path)); return\n        if idx == len(candidates) or cur_target < 0: return\n        path.append(candidates[idx])\n        backtrack(idx, cur_target - candidates[idx], path)\n        path.pop()\n        backtrack(idx + 1, cur_target, path)\n    backtrack(0, target, [])\n    return res",
      "cpp": "void backtrack(int idx, int target, vector<int>& c, vector<int>& path, vector<vector<int>>& res) {\n    if (target == 0) { res.push_back(path); return; }\n    if (idx == (int)c.size() || target < 0) return;\n    path.push_back(c[idx]);\n    backtrack(idx, target - c[idx], c, path, res);\n    path.pop_back();\n    backtrack(idx + 1, target, c, path, res);\n}\nvector<vector<int>> combinationSum(vector<int>& c, int target) {\n    vector<vector<int>> res; vector<int> path;\n    backtrack(0, target, c, path, res);\n    return res;\n}",
      "java": "public List<List<Integer>> combinationSum(int[] c, int target) {\n    List<List<Integer>> res = new ArrayList<>();\n    backtrack(0, target, c, new ArrayList<>(), res);\n    return res;\n}\nprivate void backtrack(int idx, int target, int[] c, List<Integer> path, List<List<Integer>> res) {\n    if (target == 0) { res.add(new ArrayList<>(path)); return; }\n    if (idx == c.length || target < 0) return;\n    path.add(c[idx]);\n    backtrack(idx, target - c[idx], c, path, res);\n    path.remove(path.size() - 1);\n    backtrack(idx + 1, target, c, path, res);\n}"
    },
    "companies": [
      "Airbnb",
      "Amazon",
      "Apple"
    ],
    "practiceUrl": "https://leetcode.com/problems/combination-sum/",
    "articleUrl": "https://takeuforward.org/data-structure/combination-sum-1/"
  },
  {
    "id": "strivers-38",
    "sheetIndex": 38,
    "stepId": 7,
    "stepTitle": "Step 7: Recursion [Patterns]",
    "stepShortTitle": "Recursion",
    "stepIcon": "\ud83d\udd04",
    "topic": "Combos & Backtracking",
    "title": "Palindrome Partitioning",
    "difficulty": "Medium",
    "description": "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of s.",
    "examples": [
      {
        "input": "s = 'aab'",
        "output": "[['a','a','b'],['aa','b']]",
        "explanation": "Both partitions consist only of palindromes."
      }
    ],
    "constraints": [
      "1 <= s.length <= 16",
      "s contains only lowercase English letters."
    ],
    "optimalApproach": "Backtracking: Try splitting at every index i where prefix s[start..i] is a palindrome, then recurse on remaining suffix.",
    "timeComplexity": "O(2^N * N)",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "def partition(s: str) -> list[list[str]]:\n    res = []\n    def isPal(sub): return sub == sub[::-1]\n    def backtrack(start, path):\n        if start == len(s):\n            res.append(list(path)); return\n        for end in range(start + 1, len(s) + 1):\n            sub = s[start:end]\n            if isPal(sub):\n                path.append(sub)\n                backtrack(end, path)\n                path.pop()\n    backtrack(0, [])\n    return res",
      "cpp": "bool isPal(const string& s, int l, int r) {\n    while (l < r) if (s[l++] != s[r--]) return false;\n    return true;\n}\nvoid dfs(const string& s, int start, vector<string>& path, vector<vector<string>>& res) {\n    if (start == (int)s.size()) { res.push_back(path); return; }\n    for (int end = start; end < (int)s.size(); end++) {\n        if (isPal(s, start, end)) {\n            path.push_back(s.substr(start, end - start + 1));\n            dfs(s, end + 1, path, res);\n            path.pop_back();\n        }\n    }\n}\nvector<vector<string>> partition(string s) {\n    vector<vector<string>> res; vector<string> path;\n    dfs(s, 0, path, res);\n    return res;\n}",
      "java": "public List<List<String>> partition(String s) {\n    List<List<String>> res = new ArrayList<>();\n    dfs(s, 0, new ArrayList<>(), res);\n    return res;\n}\nprivate void dfs(String s, int start, List<String> path, List<List<String>> res) {\n    if (start == s.length()) { res.add(new ArrayList<>(path)); return; }\n    for (int end = start; end < s.length(); end++) {\n        if (isPal(s, start, end)) {\n            path.add(s.substring(start, end + 1));\n            dfs(s, end + 1, path, res);\n            path.remove(path.size() - 1);\n        }\n    }\n}\nprivate boolean isPal(String s, int l, int r) {\n    while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;\n    return true;\n}"
    },
    "companies": [
      "Bloomberg",
      "Google",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/palindrome-partitioning/",
    "articleUrl": "https://takeuforward.org/data-structure/palindrome-partitioning/"
  },
  {
    "id": "strivers-39",
    "sheetIndex": 39,
    "stepId": 7,
    "stepTitle": "Step 7: Recursion [Patterns]",
    "stepShortTitle": "Recursion",
    "stepIcon": "\ud83d\udd04",
    "topic": "Hard Backtracking",
    "title": "N-Queens Problem",
    "difficulty": "Hard",
    "description": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.",
    "examples": [
      {
        "input": "n = 4",
        "output": "[[..Q., Q..., ...Q, .Q..], [.Q.., ...Q, Q..., ..Q.]]",
        "explanation": "There exist two distinct solutions to the 4-queens puzzle."
      }
    ],
    "constraints": [
      "1 <= n <= 9"
    ],
    "optimalApproach": "Place queens row by row. Use hash sets / bitmasks to check column, main diagonal (r - c), and anti-diagonal (r + c) collisions in O(1).",
    "timeComplexity": "O(N!)",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "def solveNQueens(n: int) -> list[list[str]]:\n    res = []\n    board = [['.'] * n for _ in range(n)]\n    cols = set(); diag1 = set(); diag2 = set()\n    def backtrack(r):\n        if r == n:\n            res.append([''.join(row) for row in board]); return\n        for c in range(n):\n            if c in cols or (r - c) in diag1 or (r + c) in diag2: continue\n            cols.add(c); diag1.add(r - c); diag2.add(r + c)\n            board[r][c] = 'Q'\n            backtrack(r + 1)\n            board[r][c] = '.'\n            cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)\n    backtrack(0)\n    return res",
      "cpp": "void solve(int col, vector<string>& board, vector<vector<string>>& ans, vector<int>& leftRow, vector<int>& upperDiag, vector<int>& lowerDiag, int n) {\n    if (col == n) { ans.push_back(board); return; }\n    for (int row = 0; row < n; row++) {\n        if (leftRow[row] == 0 && lowerDiag[row + col] == 0 && upperDiag[n - 1 + col - row] == 0) {\n            board[row][col] = 'Q';\n            leftRow[row] = lowerDiag[row + col] = upperDiag[n - 1 + col - row] = 1;\n            solve(col + 1, board, ans, leftRow, upperDiag, lowerDiag, n);\n            board[row][col] = '.';\n            leftRow[row] = lowerDiag[row + col] = upperDiag[n - 1 + col - row] = 0;\n        }\n    }\n}\nvector<vector<string>> solveNQueens(int n) {\n    vector<vector<string>> ans;\n    vector<string> board(n, string(n, '.'));\n    vector<int> leftRow(n, 0), upperDiag(2 * n - 1, 0), lowerDiag(2 * n - 1, 0);\n    solve(0, board, ans, leftRow, upperDiag, lowerDiag, n);\n    return ans;\n}",
      "java": "public List<List<String>> solveNQueens(int n) {\n    char[][] board = new char[n][n];\n    for (char[] row : board) Arrays.fill(row, '.');\n    List<List<String>> res = new ArrayList<>();\n    int[] leftRow = new int[n], upperDiag = new int[2 * n - 1], lowerDiag = new int[2 * n - 1];\n    solve(0, board, res, leftRow, upperDiag, lowerDiag, n);\n    return res;\n}\nprivate void solve(int col, char[][] board, List<List<String>> res, int[] lr, int[] ud, int[] ld, int n) {\n    if (col == n) {\n        List<String> list = new ArrayList<>();\n        for (char[] row : board) list.add(new String(row));\n        res.add(list); return;\n    }\n    for (int row = 0; row < n; row++) {\n        if (lr[row] == 0 && ld[row + col] == 0 && ud[n - 1 + col - row] == 0) {\n            board[row][col] = 'Q';\n            lr[row] = ld[row + col] = ud[n - 1 + col - row] = 1;\n            solve(col + 1, board, res, lr, ud, ld, n);\n            board[row][col] = '.';\n            lr[row] = ld[row + col] = ud[n - 1 + col - row] = 0;\n        }\n    }\n}"
    },
    "companies": [
      "Google",
      "Microsoft",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/n-queens/",
    "articleUrl": "https://takeuforward.org/data-structure/n-queen-problem-return-all-distinct-solutions-to-the-n-queens-puzzle/"
  },
  {
    "id": "strivers-40",
    "sheetIndex": 40,
    "stepId": 8,
    "stepTitle": "Step 8: Bit Manipulation",
    "stepShortTitle": "Bit Manipulation",
    "stepIcon": "\u26a1",
    "topic": "Basics of Bits",
    "title": "Check if Number is Power of 2",
    "difficulty": "Easy",
    "description": "Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two if there exists an integer x such that n == 2^x.",
    "examples": [
      {
        "input": "n = 16",
        "output": "true",
        "explanation": "2^4 = 16."
      }
    ],
    "constraints": [
      "-2^31 <= n <= 2^31 - 1"
    ],
    "optimalApproach": "A positive power of 2 has exactly one bit set. Therefore `(n > 0) and (n & (n - 1)) == 0`.",
    "timeComplexity": "O(1)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def isPowerOfTwo(n: int) -> bool:\n    return n > 0 and (n & (n - 1)) == 0",
      "cpp": "bool isPowerOfTwo(int n) {\n    return n > 0 && (n & (n - 1)) == 0;\n}",
      "java": "public boolean isPowerOfTwo(int n) {\n    return n > 0 && (n & (n - 1)) == 0;\n}"
    },
    "companies": [
      "Google",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/power-of-two/",
    "articleUrl": "https://takeuforward.org/data-structure/check-if-a-number-is-power-of-two/"
  },
  {
    "id": "strivers-41",
    "sheetIndex": 41,
    "stepId": 8,
    "stepTitle": "Step 8: Bit Manipulation",
    "stepShortTitle": "Bit Manipulation",
    "stepIcon": "\u26a1",
    "topic": "Basics of Bits",
    "title": "Single Number (Find element appearing once)",
    "difficulty": "Easy",
    "description": "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    "examples": [
      {
        "input": "nums = [4,1,2,1,2]",
        "output": "4",
        "explanation": "4 appears once, others appear twice."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4"
    ],
    "optimalApproach": "XOR operation properties: a ^ a = 0 and a ^ 0 = a. XORing all elements leaves only the element with odd frequency.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def singleNumber(nums: list[int]) -> int:\n    x = 0\n    for n in nums: x ^= n\n    return x",
      "cpp": "int singleNumber(vector<int>& nums) {\n    int x = 0;\n    for (int n : nums) x ^= n;\n    return x;\n}",
      "java": "public int singleNumber(int[] nums) {\n    int x = 0;\n    for (int n : nums) x ^= n;\n    return x;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Palantir"
    ],
    "practiceUrl": "https://leetcode.com/problems/single-number/",
    "articleUrl": "https://takeuforward.org/arrays/find-the-number-that-appears-once-and-the-other-numbers-twice/"
  },
  {
    "id": "strivers-42",
    "sheetIndex": 42,
    "stepId": 8,
    "stepTitle": "Step 8: Bit Manipulation",
    "stepShortTitle": "Bit Manipulation",
    "stepIcon": "\u26a1",
    "topic": "Basics of Bits",
    "title": "Count Set Bits (Hamming Weight)",
    "difficulty": "Easy",
    "description": "Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).",
    "examples": [
      {
        "input": "n = 11 (binary 1011)",
        "output": "3",
        "explanation": "Has three set bits."
      }
    ],
    "constraints": [
      "1 <= n <= 2^31 - 1"
    ],
    "optimalApproach": "Brian Kernighan's Algorithm: In each step `n = n & (n - 1)` clears the lowest set bit. Repeat until n == 0.",
    "timeComplexity": "O(number of set bits)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def hammingWeight(n: int) -> int:\n    cnt = 0\n    while n:\n        n &= (n - 1)\n        cnt += 1\n    return cnt",
      "cpp": "int hammingWeight(uint32_t n) {\n    int cnt = 0;\n    while (n) { n &= (n - 1); cnt++; }\n    return cnt;\n}",
      "java": "public int hammingWeight(int n) {\n    int cnt = 0;\n    while (n != 0) { n &= (n - 1); cnt++; }\n    return cnt;\n}"
    },
    "companies": [
      "Apple",
      "Cisco"
    ],
    "practiceUrl": "https://leetcode.com/problems/number-of-1-bits/",
    "articleUrl": "https://takeuforward.org/bit-manipulation/count-number-of-set-bits/"
  },
  {
    "id": "strivers-43",
    "sheetIndex": 43,
    "stepId": 9,
    "stepTitle": "Step 9: Stack and Queues",
    "stepShortTitle": "Stack & Queue",
    "stepIcon": "\ud83d\udcda",
    "topic": "Learning",
    "title": "Check for Balanced Parentheses",
    "difficulty": "Easy",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "examples": [
      {
        "input": "s = '()[]{}'",
        "output": "true",
        "explanation": "All brackets closed in correct order."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only."
    ],
    "optimalApproach": "Push opening brackets onto stack. For each closing bracket, pop from stack and verify matching type.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "def isValid(s: str) -> bool:\n    st = []\n    mp = {')': '(', '}': '{', ']': '['}\n    for c in s:\n        if c in mp:\n            if not st or st.pop() != mp[c]: return False\n        else: st.append(c)\n    return len(st) == 0",
      "cpp": "bool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if (st.empty()) return false;\n            char top = st.top(); st.pop();\n            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;\n        }\n    }\n    return st.empty();\n}",
      "java": "public boolean isValid(String s) {\n    Stack<Character> st = new Stack<>();\n    for (char c : s.toCharArray()) {\n        if (c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if (st.isEmpty()) return false;\n            char top = st.pop();\n            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) return false;\n        }\n    }\n    return st.isEmpty();\n}"
    },
    "companies": [
      "Facebook",
      "Amazon",
      "Google",
      "Bloomberg"
    ],
    "practiceUrl": "https://leetcode.com/problems/valid-parentheses/",
    "articleUrl": "https://takeuforward.org/data-structure/check-for-balanced-parentheses/"
  },
  {
    "id": "strivers-44",
    "sheetIndex": 44,
    "stepId": 9,
    "stepTitle": "Step 9: Stack and Queues",
    "stepShortTitle": "Stack & Queue",
    "stepIcon": "\ud83d\udcda",
    "topic": "Monotonic Stack",
    "title": "Next Greater Element (NGE)",
    "difficulty": "Medium",
    "description": "Given an array arr of size N, find the Next Greater Element for every element. The Next Greater Element for an element x is the first greater element on the right side of x in the array.",
    "examples": [
      {
        "input": "arr = [4, 5, 2, 25]",
        "output": "[5, 25, 25, -1]",
        "explanation": "4->5, 5->25, 2->25, 25 has no greater element on right."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "0 <= arr[i] <= 10^9"
    ],
    "optimalApproach": "Traverse from right to left using a monotonic stack. Pop elements smaller than current element; the top element is the next greater element.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "def nextGreaterElements(arr: list[int]) -> list[int]:\n    n = len(arr)\n    res = [-1] * n\n    st = []\n    for i in range(n - 1, -1, -1):\n        while st and st[-1] <= arr[i]: st.pop()\n        if st: res[i] = st[-1]\n        st.append(arr[i])\n    return res",
      "cpp": "vector<int> nextGreaterElements(vector<int>& arr) {\n    int n = arr.size();\n    vector<int> res(n, -1);\n    stack<int> st;\n    for (int i = n - 1; i >= 0; i--) {\n        while (!st.empty() && st.top() <= arr[i]) st.pop();\n        if (!st.empty()) res[i] = st.top();\n        st.push(arr[i]);\n    }\n    return res;\n}",
      "java": "public int[] nextGreaterElements(int[] arr) {\n    int n = arr.length;\n    int[] res = new int[n];\n    Arrays.fill(res, -1);\n    Stack<Integer> st = new Stack<>();\n    for (int i = n - 1; i >= 0; i--) {\n        while (!st.isEmpty() && st.peek() <= arr[i]) st.pop();\n        if (!st.isEmpty()) res[i] = st.peek();\n        st.push(arr[i]);\n    }\n    return res;\n}"
    },
    "companies": [
      "Amazon",
      "Flipkart",
      "Adobe"
    ],
    "practiceUrl": "https://leetcode.com/problems/next-greater-element-i/",
    "articleUrl": "https://takeuforward.org/data-structure/next-greater-element-using-stack/"
  },
  {
    "id": "strivers-45",
    "sheetIndex": 45,
    "stepId": 9,
    "stepTitle": "Step 9: Stack and Queues",
    "stepShortTitle": "Stack & Queue",
    "stepIcon": "\ud83d\udcda",
    "topic": "Monotonic Stack",
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "description": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    "examples": [
      {
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "output": "6",
        "explanation": "6 units of rain water are trapped."
      }
    ],
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    "optimalApproach": "Two-pointer approach: left and right pointers. Maintain left_max and right_max. Move pointer with smaller max inward and accumulate trapped water.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def trap(height: list[int]) -> int:\n    l, r = 0, len(height) - 1\n    l_max, r_max = 0, 0\n    water = 0\n    while l <= r:\n        if height[l] <= height[r]:\n            if height[l] >= l_max: l_max = height[l]\n            else: water += l_max - height[l]\n            l += 1\n        else:\n            if height[r] >= r_max: r_max = height[r]\n            else: water += r_max - height[r]\n            r -= 1\n    return water",
      "cpp": "int trap(vector<int>& height) {\n    int l = 0, r = height.size() - 1, l_max = 0, r_max = 0, ans = 0;\n    while (l <= r) {\n        if (height[l] <= height[r]) {\n            if (height[l] >= l_max) l_max = height[l];\n            else ans += l_max - height[l];\n            l++;\n        } else {\n            if (height[r] >= r_max) r_max = height[r];\n            else ans += r_max - height[r];\n            r--;\n        }\n    }\n    return ans;\n}",
      "java": "public int trap(int[] height) {\n    int l = 0, r = height.length - 1, lMax = 0, rMax = 0, ans = 0;\n    while (l <= r) {\n        if (height[l] <= height[r]) {\n            if (height[l] >= lMax) lMax = height[l];\n            else ans += lMax - height[l];\n            l++;\n        } else {\n            if (height[r] >= rMax) rMax = height[r];\n            else ans += rMax - height[r];\n            r--;\n        }\n    }\n    return ans;\n}"
    },
    "companies": [
      "Google",
      "Amazon",
      "Goldman Sachs"
    ],
    "practiceUrl": "https://leetcode.com/problems/trapping-rain-water/",
    "articleUrl": "https://takeuforward.org/data-structure/trapping-rainwater/"
  },
  {
    "id": "strivers-46",
    "sheetIndex": 46,
    "stepId": 9,
    "stepTitle": "Step 9: Stack and Queues",
    "stepShortTitle": "Stack & Queue",
    "stepIcon": "\ud83d\udcda",
    "topic": "Design",
    "title": "Implement LRU Cache",
    "difficulty": "Medium",
    "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with get(key) and put(key, value) operations running in O(1) average time.",
    "examples": [
      {
        "input": "LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2)",
        "output": "[null, null, null, 1, null, -1]",
        "explanation": "Key 2 evicted because it was least recently used."
      }
    ],
    "constraints": [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls to get and put."
    ],
    "optimalApproach": "Combine a Hash Map with a Doubly Linked List. Map provides O(1) lookup to nodes; DLL maintains recentness (head = MRU, tail = LRU).",
    "timeComplexity": "O(1) per operation",
    "spaceComplexity": "O(capacity)",
    "solutions": {
      "python": "class Node:\n    def __init__(self, k, v): self.k, self.v = k, v; self.prev = self.next = None\n\nclass LRUCache:\n    def __init__(self, cap: int):\n        self.cap, self.mp = cap, {}\n        self.head, self.tail = Node(0, 0), Node(0, 0)\n        self.head.next, self.tail.prev = self.tail, self.head\n    def _remove(self, node):\n        node.prev.next, node.next.prev = node.next, node.prev\n    def _insert(self, node):\n        node.next, node.prev = self.head.next, self.head\n        self.head.next.prev = self.head.next = node\n    def get(self, key: int) -> int:\n        if key in self.mp:\n            node = self.mp[key]\n            self._remove(node); self._insert(node)\n            return node.v\n        return -1\n    def put(self, key: int, value: int) -> None:\n        if key in self.mp: self._remove(self.mp[key])\n        node = Node(key, value)\n        self._insert(node); self.mp[key] = node\n        if len(self.mp) > self.cap:\n            lru = self.tail.prev\n            self._remove(lru); del self.mp[lru.k]",
      "cpp": "class LRUCache {\n    int cap;\n    list<pair<int, int>> l;\n    unordered_map<int, list<pair<int, int>>::iterator> mp;\npublic:\n    LRUCache(int capacity) : cap(capacity) {}\n    int get(int key) {\n        if (!mp.count(key)) return -1;\n        l.splice(l.begin(), l, mp[key]);\n        return mp[key]->second;\n    }\n    void put(int key, int value) {\n        if (mp.count(key)) {\n            l.splice(l.begin(), l, mp[key]);\n            mp[key]->second = value;\n            return;\n        }\n        if (mp.size() == cap) {\n            mp.erase(l.back().first);\n            l.pop_back();\n        }\n        l.push_front({key, value});\n        mp[key] = l.begin();\n    }\n};",
      "java": "class LRUCache {\n    private LinkedHashMap<Integer, Integer> map;\n    public LRUCache(int capacity) {\n        map = new LinkedHashMap<>(capacity, 0.75f, true) {\n            protected boolean removeEldestEntry(Map.Entry eldest) {\n                return size() > capacity;\n            }\n        };\n    }\n    public int get(int key) { return map.getOrDefault(key, -1); }\n    public void put(int key, int value) { map.put(key, value); }\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta",
      "Google"
    ],
    "practiceUrl": "https://leetcode.com/problems/lru-cache/",
    "articleUrl": "https://takeuforward.org/data-structure/lru-cache-implementation/"
  },
  {
    "id": "strivers-47",
    "sheetIndex": 47,
    "stepId": 10,
    "stepTitle": "Step 10: Sliding Window & Two Pointer",
    "stepShortTitle": "Sliding Window",
    "stepIcon": "\ud83e\ude9f",
    "topic": "Two Pointers & Sliding Window",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "description": "Given a string s, find the length of the longest substring without repeating characters.",
    "examples": [
      {
        "input": "s = 'abcabcbb'",
        "output": "3",
        "explanation": "The answer is 'abc', with length 3."
      }
    ],
    "constraints": [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "optimalApproach": "Sliding window [l, r]. Use a map to record last seen index of each char. When s[r] is seen at idx >= l, jump l = idx + 1.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(min(N, charset))",
    "solutions": {
      "python": "def lengthOfLongestSubstring(s: str) -> int:\n    seen = {}\n    l = max_len = 0\n    for r, c in enumerate(s):\n        if c in seen and seen[c] >= l:\n            l = seen[c] + 1\n        seen[c] = r\n        max_len = max(max_len, r - l + 1)\n    return max_len",
      "cpp": "int lengthOfLongestSubstring(string s) {\n    vector<int> seen(256, -1);\n    int l = 0, max_l = 0;\n    for (int r = 0; r < (int)s.size(); r++) {\n        if (seen[s[r]] >= l) l = seen[s[r]] + 1;\n        seen[s[r]] = r;\n        max_l = max(max_l, r - l + 1);\n    }\n    return max_l;\n}",
      "java": "public int lengthOfLongestSubstring(String s) {\n    int[] seen = new int[256];\n    Arrays.fill(seen, -1);\n    int l = 0, maxL = 0;\n    for (int r = 0; r < s.length(); r++) {\n        if (seen[s.charAt(r)] >= l) l = seen[s.charAt(r)] + 1;\n        seen[s.charAt(r)] = r;\n        maxL = Math.max(maxL, r - l + 1);\n    }\n    return maxL;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Bloomberg"
    ],
    "practiceUrl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "articleUrl": "https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/"
  },
  {
    "id": "strivers-48",
    "sheetIndex": 48,
    "stepId": 10,
    "stepTitle": "Step 10: Sliding Window & Two Pointer",
    "stepShortTitle": "Sliding Window",
    "stepIcon": "\ud83e\ude9f",
    "topic": "Two Pointers & Sliding Window",
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "description": "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",
    "examples": [
      {
        "input": "s = 'ADOBECODEBANC', t = 'ABC'",
        "output": "'BANC'",
        "explanation": "Smallest window contains all characters A, B, C."
      }
    ],
    "constraints": [
      "m == s.length",
      "n == t.length",
      "1 <= m, n <= 10^5"
    ],
    "optimalApproach": "Two-pointer window with character count map and match counter. Expand right until valid, then shrink left to minimize window size.",
    "timeComplexity": "O(M + N)",
    "spaceComplexity": "O(1) (ASCII size)",
    "solutions": {
      "python": "def minWindow(s: str, t: str) -> str:\n    from collections import Counter\n    need = Counter(t)\n    missing = len(t)\n    start = 0; best = (0, float('inf'))\n    for end, c in enumerate(s):\n        if need[c] > 0: missing -= 1\n        need[c] -= 1\n        if missing == 0:\n            while need[s[start]] < 0:\n                need[s[start]] += 1; start += 1\n            if end - start < best[1] - best[0]:\n                best = (start, end)\n            need[s[start]] += 1; start += 1; missing += 1\n    return '' if best[1] == float('inf') else s[best[0]:best[1]+1]",
      "cpp": "string minWindow(string s, string t) {\n    vector<int> need(128, 0);\n    for (char c : t) need[c]++;\n    int missing = t.size(), start = 0, min_l = INT_MAX, best_start = 0;\n    for (int end = 0; end < (int)s.size(); end++) {\n        if (need[s[end]] > 0) missing--;\n        need[s[end]]--;\n        if (missing == 0) {\n            while (need[s[start]] < 0) { need[s[start]]++; start++; }\n            if (end - start + 1 < min_l) { min_l = end - start + 1; best_start = start; }\n            need[s[start]]++; start++; missing++;\n        }\n    }\n    return min_l == INT_MAX ? \"\" : s.substr(best_start, min_l);\n}",
      "java": "public String minWindow(String s, String t) {\n    int[] need = new int[128];\n    for (char c : t.toCharArray()) need[c]++;\n    int missing = t.length(), start = 0, minL = Integer.MAX_VALUE, bestStart = 0;\n    for (int end = 0; end < s.length(); end++) {\n        if (need[s.charAt(end)] > 0) missing--;\n        need[s.charAt(end)]--;\n        if (missing == 0) {\n            while (need[s.charAt(start)] < 0) { need[s.charAt(start)]++; start++; }\n            if (end - start + 1 < minL) { minL = end - start + 1; bestStart = start; }\n            need[s.charAt(start)]++; start++; missing++;\n        }\n    }\n    return minL == Integer.MAX_VALUE ? \"\" : s.substring(bestStart, bestStart + minL);\n}"
    },
    "companies": [
      "Facebook",
      "Uber",
      "Amazon",
      "LinkedIn"
    ],
    "practiceUrl": "https://leetcode.com/problems/minimum-window-substring/",
    "articleUrl": "https://takeuforward.org/data-structure/minimum-window-substring/"
  },
  {
    "id": "strivers-49",
    "sheetIndex": 49,
    "stepId": 11,
    "stepTitle": "Step 11: Heaps [Priority Queue]",
    "stepShortTitle": "Heaps",
    "stepIcon": "\ud83c\udfd4\ufe0f",
    "topic": "Medium Heap Problems",
    "title": "Kth Largest Element in an Array",
    "difficulty": "Medium",
    "description": "Given an integer array nums and an integer k, return the kth largest element in the array. Can you solve it without sorting in O(N log k)?",
    "examples": [
      {
        "input": "nums = [3,2,1,5,6,4], k = 2",
        "output": "5",
        "explanation": "The 2nd largest element is 5."
      }
    ],
    "constraints": [
      "1 <= k <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "optimalApproach": "Maintain a min-heap of size k. For each element, push and if heap size exceeds k, pop minimum. Top of heap is the kth largest.",
    "timeComplexity": "O(N log k)",
    "spaceComplexity": "O(k)",
    "solutions": {
      "python": "def findKthLargest(nums: list[int], k: int) -> int:\n    import heapq\n    h = []\n    for x in nums:\n        heapq.heappush(h, x)\n        if len(h) > k: heapq.heappop(h)\n    return h[0]",
      "cpp": "int findKthLargest(vector<int>& nums, int k) {\n    priority_queue<int, vector<int>, greater<int>> minH;\n    for (int x : nums) {\n        minH.push(x);\n        if (minH.size() > k) minH.pop();\n    }\n    return minH.top();\n}",
      "java": "public int findKthLargest(int[] nums, int k) {\n    PriorityQueue<Integer> pq = new PriorityQueue<>();\n    for (int x : nums) {\n        pq.offer(x);\n        if (pq.size() > k) pq.poll();\n    }\n    return pq.peek();\n}"
    },
    "companies": [
      "Facebook",
      "Amazon",
      "Microsoft"
    ],
    "practiceUrl": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "articleUrl": "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-an-array/"
  },
  {
    "id": "strivers-50",
    "sheetIndex": 50,
    "stepId": 11,
    "stepTitle": "Step 11: Heaps [Priority Queue]",
    "stepShortTitle": "Heaps",
    "stepIcon": "\ud83c\udfd4\ufe0f",
    "topic": "Hard Heap Problems",
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "description": "Implement the MedianFinder class to support adding numbers and finding the median of all received elements in O(log N) and O(1) respectively.",
    "examples": [
      {
        "input": "addNum(1); addNum(2); findMedian() -> 1.5; addNum(3); findMedian() -> 2.0",
        "output": "2.0",
        "explanation": "Median updates as data arrives."
      }
    ],
    "constraints": [
      "-10^5 <= num <= 10^5",
      "There will be at least one element in the data structure before calling findMedian."
    ],
    "optimalApproach": "Two heaps: max-heap for lower half and min-heap for upper half. Balance sizes so max-heap has at most 1 more element than min-heap.",
    "timeComplexity": "O(log N) insert, O(1) findMedian",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "class MedianFinder:\n    def __init__(self):\n        import heapq\n        self.small = [] # max heap (invert signs)\n        self.large = [] # min heap\n    def addNum(self, num: int) -> None:\n        import heapq\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n    def findMedian(self) -> float:\n        if len(self.small) > len(self.large): return -self.small[0]\n        return (-self.small[0] + self.large[0]) / 2.0",
      "cpp": "class MedianFinder {\n    priority_queue<int> small; // max heap\n    priority_queue<int, vector<int>, greater<int>> large; // min heap\npublic:\n    void addNum(int num) {\n        small.push(num);\n        large.push(small.top()); small.pop();\n        if (large.size() > small.size()) {\n            small.push(large.top()); large.pop();\n        }\n    }\n    double findMedian() {\n        return small.size() > large.size() ? small.top() : (small.top() + large.top()) / 2.0;\n    }\n};",
      "java": "class MedianFinder {\n    PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    PriorityQueue<Integer> large = new PriorityQueue<>();\n    public void addNum(int num) {\n        small.offer(num);\n        large.offer(small.poll());\n        if (large.size() > small.size()) small.offer(large.poll());\n    }\n    public double findMedian() {\n        return small.size() > large.size() ? small.peek() : (small.peek() + large.peek()) / 2.0;\n    }\n}"
    },
    "companies": [
      "Google",
      "Amazon",
      "Apple"
    ],
    "practiceUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
    "articleUrl": "https://takeuforward.org/data-structure/find-median-from-data-stream/"
  },
  {
    "id": "strivers-51",
    "sheetIndex": 51,
    "stepId": 12,
    "stepTitle": "Step 12: Greedy Algorithms",
    "stepShortTitle": "Greedy",
    "stepIcon": "\ud83e\ude99",
    "topic": "Greedy Intervals",
    "title": "N Meetings in One Room",
    "difficulty": "Easy",
    "description": "There is one meeting room in a firm. There are N meetings with start and end times. Find the maximum number of meetings that can be accommodated without overlap.",
    "examples": [
      {
        "input": "start = [1,3,0,5,8,5], end = [2,4,6,7,9,9]",
        "output": "4",
        "explanation": "Meetings (1,2), (3,4), (5,7), (8,9) can be accommodated."
      }
    ],
    "constraints": [
      "1 <= N <= 10^5",
      "0 <= start[i] < end[i] <= 10^5"
    ],
    "optimalApproach": "Sort meetings by end time in ascending order. Greedily pick a meeting if its start time is greater than the end time of previously selected meeting.",
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "def maxMeetings(start: list[int], end: list[int]) -> int:\n    meetings = sorted(zip(start, end), key=lambda x: x[1])\n    count = 0; last_end = -1\n    for s, e in meetings:\n        if s > last_end:\n            count += 1; last_end = e\n    return count",
      "cpp": "int maxMeetings(vector<int>& start, vector<int>& end) {\n    int n = start.size();\n    vector<pair<int, int>> m(n);\n    for (int i = 0; i < n; i++) m[i] = {end[i], start[i]};\n    sort(m.begin(), m.end());\n    int count = 0, last_end = -1;\n    for (auto& p : m) {\n        if (p.second > last_end) { count++; last_end = p.first; }\n    }\n    return count;\n}",
      "java": "public int maxMeetings(int[] start, int[] end) {\n    int n = start.length;\n    int[][] m = new int[n][2];\n    for (int i = 0; i < n; i++) { m[i][0] = start[i]; m[i][1] = end[i]; }\n    Arrays.sort(m, Comparator.comparingInt(a -> a[1]));\n    int count = 0, lastEnd = -1;\n    for (int[] p : m) {\n        if (p[0] > lastEnd) { count++; lastEnd = p[1]; }\n    }\n    return count;\n}"
    },
    "companies": [
      "Microsoft",
      "Amazon"
    ],
    "practiceUrl": "https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1",
    "articleUrl": "https://takeuforward.org/data-structure/n-meetings-in-one-room/"
  },
  {
    "id": "strivers-52",
    "sheetIndex": 52,
    "stepId": 12,
    "stepTitle": "Step 12: Greedy Algorithms",
    "stepShortTitle": "Greedy",
    "stepIcon": "\ud83e\ude99",
    "topic": "Greedy Intervals",
    "title": "Minimum Platforms Required",
    "difficulty": "Medium",
    "description": "Given arrival and departure times of all trains that reach a railway station, find the minimum number of platforms required for the railway station so that no train is kept waiting.",
    "examples": [
      {
        "input": "arr = [900, 940, 950, 1100, 1500, 1800], dep = [910, 1200, 1120, 1130, 1900, 2000]",
        "output": "3",
        "explanation": "Maximum 3 trains overlap between 11:00 and 11:20."
      }
    ],
    "constraints": [
      "1 <= N <= 50000",
      "0000 <= arr[i] <= dep[i] <= 2359"
    ],
    "optimalApproach": "Sort both arrival and departure arrays independently. Use two pointers: increment platform count on arrival, decrement on departure.",
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def findPlatform(arr: list[int], dep: list[int]) -> int:\n    arr.sort(); dep.sort()\n    i = j = 0\n    plat = max_plat = 0\n    while i < len(arr):\n        if arr[i] <= dep[j]:\n            plat += 1; max_plat = max(max_plat, plat); i += 1\n        else:\n            plat -= 1; j += 1\n    return max_plat",
      "cpp": "int findPlatform(vector<int>& arr, vector<int>& dep) {\n    sort(arr.begin(), arr.end()); sort(dep.begin(), dep.end());\n    int i = 0, j = 0, plat = 0, max_p = 0, n = arr.size();\n    while (i < n) {\n        if (arr[i] <= dep[j]) { plat++; max_p = max(max_p, plat); i++; }\n        else { plat--; j++; }\n    }\n    return max_p;\n}",
      "java": "public int findPlatform(int[] arr, int[] dep) {\n    Arrays.sort(arr); Arrays.sort(dep);\n    int i = 0, j = 0, plat = 0, maxP = 0, n = arr.length;\n    while (i < n) {\n        if (arr[i] <= dep[j]) { plat++; maxP = Math.max(maxP, plat); i++; }\n        else { plat--; j++; }\n    }\n    return maxP;\n}"
    },
    "companies": [
      "Amazon",
      "Paytm",
      "Goldman Sachs"
    ],
    "practiceUrl": "https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1",
    "articleUrl": "https://takeuforward.org/data-structure/minimum-number-of-platforms-required-for-a-railway/"
  },
  {
    "id": "strivers-53",
    "sheetIndex": 53,
    "stepId": 13,
    "stepTitle": "Step 13: Binary Trees",
    "stepShortTitle": "Binary Trees",
    "stepIcon": "\ud83c\udf32",
    "topic": "Traversals",
    "title": "Level Order Traversal of Binary Tree (BFS)",
    "difficulty": "Medium",
    "description": "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "[[3],[9,20],[15,7]]",
        "explanation": "Tree nodes grouped by levels."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in range [0, 2000].",
      "-1000 <= Node.val <= 1000"
    ],
    "optimalApproach": "Breadth-First Search using a Queue. At each step, process len(queue) nodes corresponding to the current level.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "def levelOrder(root):\n    if not root: return []\n    res = []\n    from collections import deque\n    q = deque([root])\n    while q:\n        lvl = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            lvl.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(lvl)\n    return res",
      "cpp": "vector<vector<int>> levelOrder(TreeNode* root) {\n    if (!root) return {};\n    vector<vector<int>> res;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        int sz = q.size();\n        vector<int> lvl;\n        for (int i = 0; i < sz; i++) {\n            TreeNode* node = q.front(); q.pop();\n            lvl.push_back(node->val);\n            if (node->left) q.push(node->left);\n            if (node->right) q.push(node->right);\n        }\n        res.push_back(lvl);\n    }\n    return res;\n}",
      "java": "public List<List<Integer>> levelOrder(TreeNode root) {\n    if (root == null) return Collections.emptyList();\n    List<List<Integer>> res = new ArrayList<>();\n    Queue<TreeNode> q = new LinkedList<>();\n    q.offer(root);\n    while (!q.isEmpty()) {\n        int sz = q.size();\n        List<Integer> lvl = new ArrayList<>();\n        for (int i = 0; i < sz; i++) {\n            TreeNode node = q.poll();\n            lvl.add(node.val);\n            if (node.left != null) q.offer(node.left);\n            if (node.right != null) q.offer(node.right);\n        }\n        res.add(lvl);\n    }\n    return res;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta"
    ],
    "practiceUrl": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "articleUrl": "https://takeuforward.org/data-structure/level-order-traversal-of-a-binary-tree/"
  },
  {
    "id": "strivers-54",
    "sheetIndex": 54,
    "stepId": 13,
    "stepTitle": "Step 13: Binary Trees",
    "stepShortTitle": "Binary Trees",
    "stepIcon": "\ud83c\udf32",
    "topic": "Medium Trees",
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "description": "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from root down to farthest leaf.",
    "examples": [
      {
        "input": "root = [3,9,20,null,null,15,7]",
        "output": "3",
        "explanation": "Maximum depth is 3."
      }
    ],
    "constraints": [
      "The number of nodes in tree is in [0, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    "optimalApproach": "Recursive DFS: maxDepth(root) = 1 + max(maxDepth(root.left), maxDepth(root.right)). Base case: return 0 if root is null.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(H) where H is tree height",
    "solutions": {
      "python": "def maxDepth(root) -> int:\n    if not root: return 0\n    return 1 + max(maxDepth(root.left), maxDepth(root.right))",
      "cpp": "int maxDepth(TreeNode* root) {\n    if (!root) return 0;\n    return 1 + max(maxDepth(root->left), maxDepth(root->right));\n}",
      "java": "public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}"
    },
    "companies": [
      "Google",
      "Amazon",
      "Spotify"
    ],
    "practiceUrl": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "articleUrl": "https://takeuforward.org/data-structure/maximum-depth-of-a-binary-tree/"
  },
  {
    "id": "strivers-55",
    "sheetIndex": 55,
    "stepId": 13,
    "stepTitle": "Step 13: Binary Trees",
    "stepShortTitle": "Binary Trees",
    "stepIcon": "\ud83c\udf32",
    "topic": "Medium Trees",
    "title": "Lowest Common Ancestor (LCA) in Binary Tree",
    "difficulty": "Medium",
    "description": "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
    "examples": [
      {
        "input": "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
        "output": "3",
        "explanation": "The LCA of nodes 5 and 1 is 3."
      }
    ],
    "constraints": [
      "The number of nodes in tree is in [2, 10^5].",
      "-10^9 <= Node.val <= 10^9",
      "All Node.val are unique."
    ],
    "optimalApproach": "DFS traversal: If current node matches p or q, return node. Recurse left and right; if both return non-null, root is LCA.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(H)",
    "solutions": {
      "python": "def lowestCommonAncestor(root, p, q):\n    if not root or root == p or root == q: return root\n    left = lowestCommonAncestor(root.left, p, q)\n    right = lowestCommonAncestor(root.right, p, q)\n    if left and right: return root\n    return left or right",
      "cpp": "TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if (!root || root == p || root == q) return root;\n    TreeNode* left = lowestCommonAncestor(root->left, p, q);\n    TreeNode* right = lowestCommonAncestor(root->right, p, q);\n    if (left && right) return root;\n    return left ? left : right;\n}",
      "java": "public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null || root == p || root == q) return root;\n    TreeNode left = lowestCommonAncestor(root.left, p, q);\n    TreeNode right = lowestCommonAncestor(root.right, p, q);\n    if (left != null && right != null) return root;\n    return left != null ? left : right;\n}"
    },
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "practiceUrl": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    "articleUrl": "https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/"
  },
  {
    "id": "strivers-56",
    "sheetIndex": 56,
    "stepId": 14,
    "stepTitle": "Step 14: Binary Search Trees",
    "stepShortTitle": "BST",
    "stepIcon": "\ud83c\udf8b",
    "topic": "Concepts",
    "title": "Search in a Binary Search Tree",
    "difficulty": "Easy",
    "description": "You are given the root of a binary search tree (BST) and an integer val. Find the node in the BST that the node's value equals val and return the subtree rooted with that node.",
    "examples": [
      {
        "input": "root = [4,2,7,1,3], val = 2",
        "output": "[2,1,3]",
        "explanation": "Subtree rooted at node 2."
      }
    ],
    "constraints": [
      "The number of nodes in tree is in [1, 5000].",
      "1 <= val <= 10^7"
    ],
    "optimalApproach": "BST property: if val < root.val, search left child. If val > root.val, search right child. Otherwise root is target.",
    "timeComplexity": "O(H)",
    "spaceComplexity": "O(1) iterative",
    "solutions": {
      "python": "def searchBST(root, val: int):\n    while root and root.val != val:\n        root = root.left if val < root.val else root.right\n    return root",
      "cpp": "TreeNode* searchBST(TreeNode* root, int val) {\n    while (root && root->val != val) {\n        root = (val < root->val) ? root->left : root->right;\n    }\n    return root;\n}",
      "java": "public TreeNode searchBST(TreeNode root, int val) {\n    while (root != null && root.val != val) {\n        root = (val < root.val) ? root.left : root.right;\n    }\n    return root;\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "practiceUrl": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    "articleUrl": "https://takeuforward.org/data-structure/search-in-a-binary-search-tree-bst/"
  },
  {
    "id": "strivers-57",
    "sheetIndex": 57,
    "stepId": 14,
    "stepTitle": "Step 14: Binary Search Trees",
    "stepShortTitle": "BST",
    "stepIcon": "\ud83c\udf8b",
    "topic": "Practice Problems",
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    "examples": [
      {
        "input": "root = [2,1,3]",
        "output": "true",
        "explanation": "Left child < root < right child everywhere."
      }
    ],
    "constraints": [
      "The number of nodes in tree is in [1, 10^4].",
      "-2^31 <= Node.val <= 2^31 - 1"
    ],
    "optimalApproach": "Pass valid range [low, high] down the recursive calls. For left child, high = root.val; for right child, low = root.val.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(H)",
    "solutions": {
      "python": "def isValidBST(root) -> bool:\n    def validate(node, low=float('-inf'), high=float('inf')):\n        if not node: return True\n        if not (low < node.val < high): return False\n        return validate(node.left, low, node.val) and validate(node.right, node.val, high)\n    return validate(root)",
      "cpp": "bool validate(TreeNode* node, long long low, long long high) {\n    if (!node) return true;\n    if (node->val <= low || node->val >= high) return false;\n    return validate(node->left, low, node->val) && validate(node->right, node->val, high);\n}\nbool isValidBST(TreeNode* root) {\n    return validate(root, LLONG_MIN, LLONG_MAX);\n}",
      "java": "public boolean isValidBST(TreeNode root) {\n    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);\n}\nprivate boolean validate(TreeNode node, long low, long high) {\n    if (node == null) return true;\n    if (node.val <= low || node.val >= high) return false;\n    return validate(node.left, low, node.val) && validate(node.right, node.val, high);\n}"
    },
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google"
    ],
    "practiceUrl": "https://leetcode.com/problems/validate-binary-search-tree/",
    "articleUrl": "https://takeuforward.org/data-structure/check-if-a-tree-is-a-bst-or-bt/"
  },
  {
    "id": "strivers-58",
    "sheetIndex": 58,
    "stepId": 15,
    "stepTitle": "Step 15: Graphs",
    "stepShortTitle": "Graphs",
    "stepIcon": "\ud83d\udd78\ufe0f",
    "topic": "BFS / DFS",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "description": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    "examples": [
      {
        "input": "grid = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]",
        "output": "3",
        "explanation": "3 distinct connected components of land."
      }
    ],
    "constraints": [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300"
    ],
    "optimalApproach": "Traverse grid. Whenever an unvisited '1' is encountered, increment island count and run BFS/DFS to sink all connected land cells to '0'.",
    "timeComplexity": "O(M * N)",
    "spaceComplexity": "O(M * N)",
    "solutions": {
      "python": "def numIslands(grid: list[list[str]]) -> int:\n    if not grid: return 0\n    m, n = len(grid), len(grid[0])\n    count = 0\n    def dfs(r, c):\n        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1': return\n        grid[r][c] = '0'\n        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)\n    for r in range(m):\n        for c in range(n):\n            if grid[r][c] == '1':\n                count += 1; dfs(r, c)\n    return count",
      "cpp": "void dfs(vector<vector<char>>& g, int r, int c) {\n    int m = g.size(), n = g[0].size();\n    if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] != '1') return;\n    g[r][c] = '0';\n    dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);\n}\nint numIslands(vector<vector<char>>& grid) {\n    int count = 0;\n    for (int i = 0; i < (int)grid.size(); i++)\n        for (int j = 0; j < (int)grid[0].size(); j++)\n            if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n    return count;\n}",
      "java": "public int numIslands(char[][] grid) {\n    int count = 0;\n    for (int i = 0; i < grid.length; i++)\n        for (int j = 0; j < grid[0].length; j++)\n            if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n    return count;\n}\nprivate void dfs(char[][] g, int r, int c) {\n    if (r < 0 || r >= g.length || c < 0 || c >= g[0].length || g[r][c] != '1') return;\n    g[r][c] = '0';\n    dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Bloomberg",
      "Google"
    ],
    "practiceUrl": "https://leetcode.com/problems/number-of-islands/",
    "articleUrl": "https://takeuforward.org/data-structure/number-of-islands/"
  },
  {
    "id": "strivers-59",
    "sheetIndex": 59,
    "stepId": 15,
    "stepTitle": "Step 15: Graphs",
    "stepShortTitle": "Graphs",
    "stepIcon": "\ud83d\udd78\ufe0f",
    "topic": "Shortest Path",
    "title": "Dijkstra's Algorithm",
    "difficulty": "Medium",
    "description": "Given a weighted, undirected, and connected graph of V vertices and an adjacency list, find the shortest distance from the source vertex to all other vertices.",
    "examples": [
      {
        "input": "V = 3, E = 3, S = 2, adj = [[[1, 1], [2, 6]], [[2, 3], [0, 1]], [[1, 3], [0, 6]]]",
        "output": "[4, 3, 0]",
        "explanation": "Distances to 0, 1, 2 from src 2."
      }
    ],
    "constraints": [
      "1 <= V <= 1000",
      "0 <= weight <= 1000"
    ],
    "optimalApproach": "Use a Priority Queue (min-heap) storing (distance, node). Greedily extract vertex with minimum distance and relax adjacent edges.",
    "timeComplexity": "O(E log V)",
    "spaceComplexity": "O(V)",
    "solutions": {
      "python": "def dijkstra(V: int, adj: list, src: int) -> list[int]:\n    import heapq\n    dist = [float('inf')] * V\n    dist[src] = 0\n    pq = [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        for v, w in adj[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(pq, (dist[v], v))\n    return dist",
      "cpp": "vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int src) {\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    vector<int> dist(V, 1e9);\n    dist[src] = 0;\n    pq.push({0, src});\n    while (!pq.empty()) {\n        auto [d, u] = pq.top(); pq.pop();\n        if (d > dist[u]) continue;\n        for (auto& edge : adj[u]) {\n            int v = edge.first, w = edge.second;\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    return dist;\n}",
      "java": "public int[] dijkstra(int V, ArrayList<ArrayList<ArrayList<Integer>>> adj, int src) {\n    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));\n    int[] dist = new int[V];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    dist[src] = 0;\n    pq.offer(new int[]{0, src});\n    while (!pq.isEmpty()) {\n        int[] top = pq.poll();\n        int d = top[0], u = top[1];\n        if (d > dist[u]) continue;\n        for (ArrayList<Integer> edge : adj.get(u)) {\n            int v = edge.get(0), w = edge.get(1);\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.offer(new int[]{dist[v], v});\n            }\n        }\n    }\n    return dist;\n}"
    },
    "companies": [
      "Google",
      "Microsoft",
      "Uber"
    ],
    "practiceUrl": "https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1",
    "articleUrl": "https://takeuforward.org/data-structure/dijkstras-algorithm-using-priority-queue-g-32/"
  },
  {
    "id": "strivers-60",
    "sheetIndex": 60,
    "stepId": 16,
    "stepTitle": "Step 16: Dynamic Programming",
    "stepShortTitle": "DP",
    "stepIcon": "\ud83e\udde9",
    "topic": "1D DP",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "examples": [
      {
        "input": "n = 3",
        "output": "3",
        "explanation": "Three ways: (1+1+1), (1+2), (2+1)."
      }
    ],
    "constraints": [
      "1 <= n <= 45"
    ],
    "optimalApproach": "Fibonacci relation: ways(n) = ways(n-1) + ways(n-2). Optimize space to O(1) with two variables.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def climbStairs(n: int) -> int:\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b",
      "cpp": "int climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int c = a + b;\n        a = b; b = c;\n    }\n    return b;\n}",
      "java": "public int climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int c = a + b;\n        a = b; b = c;\n    }\n    return b;\n}"
    },
    "companies": [
      "Amazon",
      "Apple",
      "Adobe"
    ],
    "practiceUrl": "https://leetcode.com/problems/climbing-stairs/",
    "articleUrl": "https://takeuforward.org/data-structure/dynamic-programming-climbing-stairs/"
  },
  {
    "id": "strivers-61",
    "sheetIndex": 61,
    "stepId": 16,
    "stepTitle": "Step 16: Dynamic Programming",
    "stepShortTitle": "DP",
    "stepIcon": "\ud83e\udde9",
    "topic": "1D DP",
    "title": "House Robber",
    "difficulty": "Medium",
    "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses cannot be robbed on the same night. Return the maximum money you can rob without alerting police.",
    "examples": [
      {
        "input": "nums = [2,7,9,3,1]",
        "output": "12",
        "explanation": "Rob house 1 (money = 2), house 3 (money = 9) and house 5 (money = 1). Total = 12."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 400"
    ],
    "optimalApproach": "DP state: dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Optimize with two variables prev1 and prev2.",
    "timeComplexity": "O(N)",
    "spaceComplexity": "O(1)",
    "solutions": {
      "python": "def rob(nums: list[int]) -> int:\n    prev1 = prev2 = 0\n    for x in nums:\n        prev1, prev2 = max(prev1, prev2 + x), prev1\n    return prev1",
      "cpp": "int rob(vector<int>& nums) {\n    int prev1 = 0, prev2 = 0;\n    for (int x : nums) {\n        int temp = max(prev1, prev2 + x);\n        prev2 = prev1;\n        prev1 = temp;\n    }\n    return prev1;\n}",
      "java": "public int rob(int[] nums) {\n    int prev1 = 0, prev2 = 0;\n    for (int x : nums) {\n        int temp = Math.max(prev1, prev2 + x);\n        prev2 = prev1;\n        prev1 = temp;\n    }\n    return prev1;\n}"
    },
    "companies": [
      "Google",
      "Amazon",
      "Cisco"
    ],
    "practiceUrl": "https://leetcode.com/problems/house-robber/",
    "articleUrl": "https://takeuforward.org/data-structure/maximum-sum-of-non-adjacent-elements-dp-5/"
  },
  {
    "id": "strivers-62",
    "sheetIndex": 62,
    "stepId": 16,
    "stepTitle": "Step 16: Dynamic Programming",
    "stepShortTitle": "DP",
    "stepIcon": "\ud83e\udde9",
    "topic": "DP on Strings",
    "title": "Longest Common Subsequence (LCS)",
    "difficulty": "Medium",
    "description": "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
    "examples": [
      {
        "input": "text1 = 'abcde', text2 = 'ace'",
        "output": "3",
        "explanation": "The LCS is 'ace' and its length is 3."
      }
    ],
    "constraints": [
      "1 <= text1.length, text2.length <= 1000",
      "text1 and text2 consist of only lowercase English characters."
    ],
    "optimalApproach": "2D DP: If text1[i] == text2[j], dp[i][j] = 1 + dp[i-1][j-1]. Else max(dp[i-1][j], dp[i][j-1]).",
    "timeComplexity": "O(N * M)",
    "spaceComplexity": "O(N * M) or O(M)",
    "solutions": {
      "python": "def longestCommonSubsequence(text1: str, text2: str) -> int:\n    m, n = len(text1), len(text2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i-1] == text2[j-1]:\n                dp[i][j] = 1 + dp[i-1][j-1]\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]",
      "cpp": "int longestCommonSubsequence(string text1, string text2) {\n    int m = text1.size(), n = text2.size();\n    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (text1[i-1] == text2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];\n            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return dp[m][n];\n}",
      "java": "public int longestCommonSubsequence(String text1, String text2) {\n    int m = text1.length(), n = text2.length();\n    int[][] dp = new int[m + 1][n + 1];\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (text1.charAt(i-1) == text2.charAt(j-1)) dp[i][j] = 1 + dp[i-1][j-1];\n            else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return dp[m][n];\n}"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Directi"
    ],
    "practiceUrl": "https://leetcode.com/problems/longest-common-subsequence/",
    "articleUrl": "https://takeuforward.org/data-structure/longest-common-subsequence-dp-25/"
  },
  {
    "id": "strivers-63",
    "sheetIndex": 63,
    "stepId": 16,
    "stepTitle": "Step 16: Dynamic Programming",
    "stepShortTitle": "DP",
    "stepIcon": "\ud83e\udde9",
    "topic": "DP on LIS",
    "title": "Longest Increasing Subsequence (LIS)",
    "difficulty": "Medium",
    "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence. Solve in O(N log N) using Binary Search.",
    "examples": [
      {
        "input": "nums = [10,9,2,5,3,7,101,18]",
        "output": "4",
        "explanation": "The longest increasing subsequence is [2,3,7,101], length 4."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "optimalApproach": "Patience sorting with binary search (bisect_left). Maintain tails array representing minimum tail of all increasing subsequences of length i.",
    "timeComplexity": "O(N log N)",
    "spaceComplexity": "O(N)",
    "solutions": {
      "python": "def lengthOfLIS(nums: list[int]) -> int:\n    import bisect\n    tails = []\n    for x in nums:\n        idx = bisect.bisect_left(tails, x)\n        if idx == len(tails): tails.append(x)\n        else: tails[idx] = x\n    return len(tails)",
      "cpp": "int lengthOfLIS(vector<int>& nums) {\n    vector<int> tails;\n    for (int x : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    return tails.size();\n}",
      "java": "public int lengthOfLIS(int[] nums) {\n    int[] tails = new int[nums.length];\n    int len = 0;\n    for (int x : nums) {\n        int i = Arrays.binarySearch(tails, 0, len, x);\n        if (i < 0) i = -(i + 1);\n        tails[i] = x;\n        if (i == len) len++;\n    }\n    return len;\n}"
    },
    "companies": [
      "Google",
      "Microsoft",
      "Meta"
    ],
    "practiceUrl": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "articleUrl": "https://takeuforward.org/data-structure/longest-increasing-subsequence-dp-41/"
  },
  {
    "id": "strivers-64",
    "sheetIndex": 64,
    "stepId": 17,
    "stepTitle": "Step 17: Tries",
    "stepShortTitle": "Tries",
    "stepIcon": "\ud83c\udf33",
    "topic": "Theory",
    "title": "Implement Trie (Prefix Tree)",
    "difficulty": "Medium",
    "description": "Implement the Trie class with insert, search, and startsWith methods.",
    "examples": [
      {
        "input": "Trie(); insert('apple'); search('apple'); startsWith('app')",
        "output": "[null, null, true, true]",
        "explanation": "apple is present and starts with app."
      }
    ],
    "constraints": [
      "1 <= word.length, prefix.length <= 2000",
      "Consist only of lowercase English letters."
    ],
    "optimalApproach": "Use a tree node with 26 child references and an is_end boolean flag.",
    "timeComplexity": "O(L) per operation",
    "spaceComplexity": "O(Total characters * 26)",
    "solutions": {
      "python": "class Trie:\n    def __init__(self):\n        self.root = {}\n    def insert(self, word: str) -> None:\n        curr = self.root\n        for c in word: curr = curr.setdefault(c, {})\n        curr['#'] = True\n    def search(self, word: str) -> bool:\n        curr = self.root\n        for c in word:\n            if c not in curr: return False\n            curr = curr[c]\n        return '#' in curr\n    def startsWith(self, prefix: str) -> bool:\n        curr = self.root\n        for c in prefix:\n            if c not in curr: return False\n            curr = curr[c]\n        return True",
      "cpp": "class Trie {\n    struct Node { Node* l[26] = {}; bool end = false; } *root = new Node();\npublic:\n    void insert(string w) {\n        Node* n = root; for (char c : w) { if (!n->l[c-'a']) n->l[c-'a'] = new Node(); n = n->l[c-'a']; }\n        n->end = true;\n    }\n    bool search(string w) {\n        Node* n = root; for (char c : w) { if (!n->l[c-'a']) return false; n = n->l[c-'a']; }\n        return n->end;\n    }\n    bool startsWith(string p) {\n        Node* n = root; for (char c : p) { if (!n->l[c-'a']) return false; n = n->l[c-'a']; }\n        return true;\n    }\n};",
      "java": "class Trie {\n    class Node { Node[] l = new Node[26]; boolean end; }\n    private Node root = new Node();\n    public void insert(String w) {\n        Node n = root; for (char c : w.toCharArray()) { if (n.l[c-'a'] == null) n.l[c-'a'] = new Node(); n = n.l[c-'a']; }\n        n.end = true;\n    }\n    public boolean search(String w) {\n        Node n = root; for (char c : w.toCharArray()) { if (n.l[c-'a'] == null) return false; n = n.l[c-'a']; }\n        return n.end;\n    }\n    public boolean startsWith(String p) {\n        Node n = root; for (char c : p.toCharArray()) { if (n.l[c-'a'] == null) return false; n = n.l[c-'a']; }\n        return true;\n    }\n}"
    },
    "companies": [
      "Google",
      "Twitter",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "articleUrl": "https://takeuforward.org/data-structure/implement-trie-1/"
  },
  {
    "id": "strivers-65",
    "sheetIndex": 65,
    "stepId": 18,
    "stepTitle": "Step 18: Advanced Strings",
    "stepShortTitle": "Advanced Strings",
    "stepIcon": "\ud83d\udcdc",
    "topic": "String Matching",
    "title": "KMP Algorithm (Knuth-Morris-Pratt) / LPS Array",
    "difficulty": "Hard",
    "description": "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack in O(N + M) time.",
    "examples": [
      {
        "input": "haystack = 'sadbutsad', needle = 'sad'",
        "output": "0",
        "explanation": "'sad' occurs at index 0 and 6. First index is 0."
      }
    ],
    "constraints": [
      "1 <= haystack.length, needle.length <= 10^4",
      "haystack and needle consist of only lowercase English characters."
    ],
    "optimalApproach": "Precompute LPS (Longest Prefix Suffix) array for needle. During mismatch, avoid re-evaluating matched characters by shifting pattern via LPS table.",
    "timeComplexity": "O(N + M)",
    "spaceComplexity": "O(M)",
    "solutions": {
      "python": "def strStr(haystack: str, needle: str) -> int:\n    if not needle: return 0\n    lps = [0] * len(needle)\n    prev, i = 0, 1\n    while i < len(needle):\n        if needle[i] == needle[prev]:\n            prev += 1; lps[i] = prev; i += 1\n        elif prev == 0: lps[i] = 0; i += 1\n        else: prev = lps[prev - 1]\n    h, n = 0, 0\n    while h < len(haystack):\n        if haystack[h] == needle[n]: h += 1; n += 1\n        else:\n            if n == 0: h += 1\n            else: n = lps[n - 1]\n        if n == len(needle): return h - len(needle)\n    return -1",
      "cpp": "int strStr(string h, string n) {\n    if (n.empty()) return 0;\n    int m = n.size(); vector<int> lps(m, 0);\n    int prev = 0, i = 1;\n    while (i < m) {\n        if (n[i] == n[prev]) lps[i++] = ++prev;\n        else if (prev == 0) lps[i++] = 0;\n        else prev = lps[prev - 1];\n    }\n    int ih = 0, in = 0;\n    while (ih < (int)h.size()) {\n        if (h[ih] == n[in]) { ih++; in++; }\n        else { if (in == 0) ih++; else in = lps[in - 1]; }\n        if (in == m) return ih - m;\n    }\n    return -1;\n}",
      "java": "public int strStr(String h, String n) {\n    if (n.isEmpty()) return 0;\n    int[] lps = new int[n.length()]; int prev = 0, i = 1;\n    while (i < n.length()) {\n        if (n.charAt(i) == n.charAt(prev)) lps[i++] = ++prev;\n        else if (prev == 0) lps[i++] = 0;\n        else prev = lps[prev - 1];\n    }\n    int ih = 0, in = 0;\n    while (ih < h.length()) {\n        if (h.charAt(ih) == n.charAt(in)) { ih++; in++; }\n        else { if (in == 0) ih++; else in = lps[in - 1]; }\n        if (in == n.length()) return ih - n.length();\n    }\n    return -1;\n}"
    },
    "companies": [
      "Microsoft",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
    "articleUrl": "https://takeuforward.org/data-structure/kmp-algorithm-for-pattern-searching/"
  }
];

export const TOTAL_STRIVERS_PROBLEMS = 65;
