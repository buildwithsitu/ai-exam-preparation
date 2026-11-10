/**
 * ExamMate AI - IndiaBIX Quantitative Aptitude Master Catalog
 * Resource: https://www.indiabix.com/aptitude/questions-and-answers/
 */

export interface AptitudeOption {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface AptitudeQuestion {
  id: string;
  sheetIndex: number;
  categoryId: number;
  category: string;
  categoryIcon: string;
  topic: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: AptitudeOption[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  formula: string;
  shortcut: string;
  companies: string[];
  sourceUrl: string;
}

export interface AptitudeCategory {
  id: number;
  title: string;
  icon: string;
  desc: string;
  totalQuestions: number;
}

export const INDIABIX_CATEGORIES: AptitudeCategory[] = [
  {
    "id": 1,
    "title": "Numbers & Basic Math",
    "icon": "\ud83d\udd22",
    "desc": "HCF/LCM, divisibility rules, remainders, fractions, and simplification",
    "totalQuestions": 6
  },
  {
    "id": 2,
    "title": "Percentages, Profit & Loss",
    "icon": "\ud83d\udcb0",
    "desc": "Percentage change, markup, successive discounts, false weights, and profit/loss",
    "totalQuestions": 7
  },
  {
    "id": 3,
    "title": "Ratio, Averages & Mixtures",
    "icon": "\u2696\ufe0f",
    "desc": "Proportions, alligation rule, replacement of liquids, and batting averages",
    "totalQuestions": 6
  },
  {
    "id": 4,
    "title": "Simple & Compound Interest",
    "icon": "\ud83d\udcc8",
    "desc": "SI formulas, compounding cycles, and 2-year/3-year CI vs SI difference",
    "totalQuestions": 6
  },
  {
    "id": 5,
    "title": "Time & Work, Pipes",
    "icon": "\u23f3",
    "desc": "Efficiency, alternate days, wages, and inlet/outlet leakage rates",
    "totalQuestions": 6
  },
  {
    "id": 6,
    "title": "Speed, Distance & Trains",
    "icon": "\ud83d\ude82",
    "desc": "Relative speed, crossing poles/platforms, opposite/same directions, and boats",
    "totalQuestions": 8
  },
  {
    "id": 7,
    "title": "Permutation & Probability",
    "icon": "\ud83c\udfb2",
    "desc": "Arrangements (vowels together), committee combinations, cards, dice, and balls",
    "totalQuestions": 6
  },
  {
    "id": 8,
    "title": "Ages, Calendars & Clocks",
    "icon": "\ud83d\udcc5",
    "desc": "Age equations, odd days, leap year cycles, and clock hand angles",
    "totalQuestions": 5
  }
];

export const INDIABIX_APTITUDE_QUESTIONS: AptitudeQuestion[] = [
  {
    "id": "apt-1",
    "sheetIndex": 1,
    "categoryId": 1,
    "category": "Numbers & Basic Math",
    "categoryIcon": "\ud83d\udd22",
    "topic": "Problems on H.C.F and L.C.M",
    "title": "Product of Two Numbers and HCF/LCM",
    "difficulty": "Easy",
    "question": "The H.C.F. of two numbers is 11 and their L.C.M. is 7700. If one of the numbers is 275, then the other number is:",
    "options": [
      {
        "label": "A",
        "text": "279"
      },
      {
        "label": "B",
        "text": "283"
      },
      {
        "label": "C",
        "text": "308"
      },
      {
        "label": "D",
        "text": "318"
      }
    ],
    "correctOption": "C",
    "explanation": "Product of two numbers = Product of their H.C.F. and L.C.M.\nLet the other number be x.\nThen, 275 * x = 11 * 7700\nx = (11 * 7700) / 275\nx = 84700 / 275 = 308.\nHence, the other number is 308.",
    "formula": "First Number * Second Number = H.C.F. * L.C.M.",
    "shortcut": "Divide 7700 by (275 / 11) = 7700 / 25 = 308.",
    "companies": [
      "TCS NQT",
      "Infosys",
      "Wipro"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/problems-on-hcf-and-lcm/"
  },
  {
    "id": "apt-2",
    "sheetIndex": 2,
    "categoryId": 1,
    "category": "Numbers & Basic Math",
    "categoryIcon": "\ud83d\udd22",
    "topic": "Problems on H.C.F and L.C.M",
    "title": "Greatest Number Leaving Specific Remainders",
    "difficulty": "Medium",
    "question": "Find the greatest number that will divide 43, 91 and 183 so as to leave the same remainder in each case.",
    "options": [
      {
        "label": "A",
        "text": "4"
      },
      {
        "label": "B",
        "text": "7"
      },
      {
        "label": "C",
        "text": "9"
      },
      {
        "label": "D",
        "text": "13"
      }
    ],
    "correctOption": "A",
    "explanation": "Required number = H.C.F. of (91 - 43), (183 - 91) and (183 - 43)\n= H.C.F. of 48, 92 and 140.\n48 = 2^4 * 3\n92 = 2^2 * 23\n140 = 2^2 * 5 * 7\nH.C.F. = 2^2 = 4.\nTherefore, 4 is the required greatest number.",
    "formula": "Required number = H.C.F. of |a - b|, |b - c|, |c - a|",
    "shortcut": "Check differences: 91 - 43 = 48, 183 - 91 = 92. HCF of 48 and 92 is clearly 4.",
    "companies": [
      "Cognizant",
      "Capgemini",
      "Accenture"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/problems-on-hcf-and-lcm/"
  },
  {
    "id": "apt-3",
    "sheetIndex": 3,
    "categoryId": 1,
    "category": "Numbers & Basic Math",
    "categoryIcon": "\ud83d\udd22",
    "topic": "Problems on Numbers",
    "title": "Smallest Number Leaving Remainder with Multiple Divisors",
    "difficulty": "Medium",
    "question": "The least number which when divided by 5, 6, 7 and 8 leaves a remainder 3, but when divided by 9 leaves no remainder, is:",
    "options": [
      {
        "label": "A",
        "text": "1677"
      },
      {
        "label": "B",
        "text": "1683"
      },
      {
        "label": "C",
        "text": "2523"
      },
      {
        "label": "D",
        "text": "3363"
      }
    ],
    "correctOption": "B",
    "explanation": "L.C.M. of 5, 6, 7, 8 = 840.\nSo the number is of the form (840k + 3).\nNow we need (840k + 3) to be divisible by 9.\n840k + 3 = (93 * 9k) + 3k + 3.\nFor (3k + 3) to be divisible by 9, least value of k is 2 (3*2 + 3 = 9).\nRequired number = 840 * 2 + 3 = 1680 + 3 = 1683.",
    "formula": "Number = (LCM * k) + Remainder",
    "shortcut": "Sum of digits of 1683 is 1 + 6 + 8 + 3 = 18 (divisible by 9). 1683 % 5 leaves 3.",
    "companies": [
      "TCS NQT",
      "Infosys"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/problems-on-numbers/"
  },
  {
    "id": "apt-4",
    "sheetIndex": 4,
    "categoryId": 1,
    "category": "Numbers & Basic Math",
    "categoryIcon": "\ud83d\udd22",
    "topic": "Numbers",
    "title": "Sum of First N Natural Numbers & Squares",
    "difficulty": "Easy",
    "question": "What is the sum of all two-digit numbers divisible by 5?",
    "options": [
      {
        "label": "A",
        "text": "935"
      },
      {
        "label": "B",
        "text": "945"
      },
      {
        "label": "C",
        "text": "955"
      },
      {
        "label": "D",
        "text": "965"
      }
    ],
    "correctOption": "B",
    "explanation": "Two-digit numbers divisible by 5 are: 10, 15, 20, ..., 95.\nThis forms an Arithmetic Progression (A.P.) with a = 10, d = 5, l = 95.\nNumber of terms n = ((l - a) / d) + 1 = ((95 - 10) / 5) + 1 = 17 + 1 = 18.\nSum S_n = (n / 2) * (a + l) = (18 / 2) * (10 + 95) = 9 * 105 = 945.",
    "formula": "Sum of AP = (n / 2) * (first_term + last_term)",
    "shortcut": "Average = (10 + 95) / 2 = 52.5. Total = 18 * 52.5 = 945.",
    "companies": [
      "Wipro",
      "Tech Mahindra"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/numbers/"
  },
  {
    "id": "apt-5",
    "sheetIndex": 5,
    "categoryId": 1,
    "category": "Numbers & Basic Math",
    "categoryIcon": "\ud83d\udd22",
    "topic": "Simplification",
    "title": "BODMAS and Algebraic Identities",
    "difficulty": "Easy",
    "question": "Evaluate: (785 * 785 * 785 + 435 * 435 * 435) / (785 * 785 - 785 * 435 + 435 * 435)",
    "options": [
      {
        "label": "A",
        "text": "350"
      },
      {
        "label": "B",
        "text": "785"
      },
      {
        "label": "C",
        "text": "1220"
      },
      {
        "label": "D",
        "text": "1320"
      }
    ],
    "correctOption": "C",
    "explanation": "Given expression is of the form: (a^3 + b^3) / (a^2 - ab + b^2).\nWe know that a^3 + b^3 = (a + b)(a^2 - ab + b^2).\nTherefore, (a^3 + b^3) / (a^2 - ab + b^2) = (a + b).\nHere a = 785 and b = 435.\nSo, a + b = 785 + 435 = 1220.",
    "formula": "(a^3 + b^3) = (a + b)(a^2 - ab + b^2)",
    "shortcut": "Direct formula: answer is simply a + b = 785 + 435 = 1220.",
    "companies": [
      "TCS NQT",
      "Accenture"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/simplification/"
  },
  {
    "id": "apt-6",
    "sheetIndex": 6,
    "categoryId": 1,
    "category": "Numbers & Basic Math",
    "categoryIcon": "\ud83d\udd22",
    "topic": "Decimal Fraction",
    "title": "Recurring Decimals Conversion to Fraction",
    "difficulty": "Easy",
    "question": "Express the recurring decimal 0.363636... as a vulgar fraction.",
    "options": [
      {
        "label": "A",
        "text": "4/11"
      },
      {
        "label": "B",
        "text": "3/11"
      },
      {
        "label": "C",
        "text": "9/25"
      },
      {
        "label": "D",
        "text": "36/100"
      }
    ],
    "correctOption": "A",
    "explanation": "Let x = 0.363636...\nSince 2 digits are repeating, multiply by 100:\n100x = 36.363636...\nSubtracting x from 100x:\n99x = 36\nx = 36 / 99 = 4 / 11.\nThus, 0.3636... = 4/11.",
    "formula": "0.ab... = ab / 99",
    "shortcut": "Two repeating digits -> divide by 99: 36 / 99 = 4/11.",
    "companies": [
      "Infosys",
      "Mindtree"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/decimal-fraction/"
  },
  {
    "id": "apt-7",
    "sheetIndex": 7,
    "categoryId": 2,
    "category": "Percentages, Profit & Loss",
    "categoryIcon": "\ud83d\udcb0",
    "topic": "Percentage",
    "title": "Price Rise and Expenditure Reduction",
    "difficulty": "Easy",
    "question": "If the price of sugar rises by 25%, by what percent must a household reduce its consumption of sugar so as not to increase the expenditure?",
    "options": [
      {
        "label": "A",
        "text": "15%"
      },
      {
        "label": "B",
        "text": "20%"
      },
      {
        "label": "C",
        "text": "25%"
      },
      {
        "label": "D",
        "text": "30%"
      }
    ],
    "correctOption": "B",
    "explanation": "Reduction in consumption = [R / (100 + R)] * 100%\nHere R = 25%.\nReduction = [25 / (100 + 25)] * 100% = [25 / 125] * 100% = (1/5) * 100% = 20%.\nHence, consumption must be reduced by 20%.",
    "formula": "Reduction % = [R / (100 + R)] * 100",
    "shortcut": "Assume price = 100, becomes 125. Reduction needed = 25 out of 125 = 1/5 = 20%.",
    "companies": [
      "TCS NQT",
      "Capgemini",
      "Amazon"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/percentage/"
  },
  {
    "id": "apt-8",
    "sheetIndex": 8,
    "categoryId": 2,
    "category": "Percentages, Profit & Loss",
    "categoryIcon": "\ud83d\udcb0",
    "topic": "Percentage",
    "title": "Population Successive Growth",
    "difficulty": "Easy",
    "question": "The population of a town increases by 5% annually. If its present population is 80,000, what will be its population after 2 years?",
    "options": [
      {
        "label": "A",
        "text": "86,200"
      },
      {
        "label": "B",
        "text": "88,200"
      },
      {
        "label": "C",
        "text": "88,000"
      },
      {
        "label": "D",
        "text": "89,100"
      }
    ],
    "correctOption": "B",
    "explanation": "Population after n years = P * (1 + R/100)^n\n= 80000 * (1 + 5/100)^2\n= 80000 * (21/20) * (21/20)\n= 80000 * (441 / 400) = 200 * 441 = 88,200.",
    "formula": "A = P * (1 + R/100)^t",
    "shortcut": "Year 1: 80,000 + 4,000 = 84,000. Year 2: 84,000 + 4,200 = 88,200.",
    "companies": [
      "Infosys",
      "Wipro"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/percentage/"
  },
  {
    "id": "apt-9",
    "sheetIndex": 9,
    "categoryId": 2,
    "category": "Percentages, Profit & Loss",
    "categoryIcon": "\ud83d\udcb0",
    "topic": "Profit and Loss",
    "title": "Two Items Sold at Same Price with Equal Gain and Loss",
    "difficulty": "Easy",
    "question": "A man sells two articles for Rs. 990 each, making a profit of 10% on one and a loss of 10% on the other. What is his net gain or loss percentage?",
    "options": [
      {
        "label": "A",
        "text": "No profit no loss"
      },
      {
        "label": "B",
        "text": "1% gain"
      },
      {
        "label": "C",
        "text": "1% loss"
      },
      {
        "label": "D",
        "text": "2% loss"
      }
    ],
    "correctOption": "C",
    "explanation": "When two items are sold at the same selling price, one at a gain of x% and other at a loss of x%, there is always an overall loss.\nLoss % = (Common Gain or Loss % / 10)^2\nLoss % = (10 / 10)^2 = 1^2 = 1% loss.",
    "formula": "Overall Loss % = (x / 10)^2 %",
    "shortcut": "Always a loss of (x/10)^2 = (10/10)^2 = 1%.",
    "companies": [
      "TCS NQT",
      "Cognizant",
      "Accenture"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/profit-and-loss/"
  },
  {
    "id": "apt-10",
    "sheetIndex": 10,
    "categoryId": 2,
    "category": "Percentages, Profit & Loss",
    "categoryIcon": "\ud83d\udcb0",
    "topic": "Profit and Loss",
    "title": "Cost Price Calculation from Selling Price",
    "difficulty": "Easy",
    "question": "A vendor bought bananas at 6 for Rs. 10 and sold them at 4 for Rs. 6. Find his gain or loss percent.",
    "options": [
      {
        "label": "A",
        "text": "10% gain"
      },
      {
        "label": "B",
        "text": "10% loss"
      },
      {
        "label": "C",
        "text": "12.5% loss"
      },
      {
        "label": "D",
        "text": "12.5% gain"
      }
    ],
    "correctOption": "B",
    "explanation": "C.P. of 1 banana = 10 / 6 = Rs. 5/3.\nS.P. of 1 banana = 6 / 4 = Rs. 3/2.\nSince C.P. > S.P., there is a loss.\nLoss = (5/3) - (3/2) = (10 - 9) / 6 = Rs. 1/6.\nLoss % = [Loss / C.P.] * 100 = [(1/6) / (5/3)] * 100 = (3 / 30) * 100 = 10% loss.",
    "formula": "Loss % = (Loss / CP) * 100",
    "shortcut": "Take LCM of 6 and 4 = 12 bananas. CP of 12 = 20, SP of 12 = 18. Loss = 2/20 = 10%.",
    "companies": [
      "Infosys",
      "Capgemini"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/profit-and-loss/"
  },
  {
    "id": "apt-11",
    "sheetIndex": 11,
    "categoryId": 2,
    "category": "Percentages, Profit & Loss",
    "categoryIcon": "\ud83d\udcb0",
    "topic": "Profit and Loss",
    "title": "Dishonest Dealer False Weight",
    "difficulty": "Medium",
    "question": "A dishonest dealer professes to sell his goods at cost price, but uses a weight of 960 grams for a kg weight. Find his gain percent.",
    "options": [
      {
        "label": "A",
        "text": "4 1/6%"
      },
      {
        "label": "B",
        "text": "4 1/3%"
      },
      {
        "label": "C",
        "text": "3 1/8%"
      },
      {
        "label": "D",
        "text": "5%"
      }
    ],
    "correctOption": "A",
    "explanation": "Error = 1000 - 960 = 40 grams.\nGain % = [Error / (True Value - Error)] * 100%\n= [40 / 960] * 100% = (1/24) * 100% = 25/6 % = 4 1/6%.",
    "formula": "Gain % = [Error / (True Weight - Error)] * 100",
    "shortcut": "40 / 960 = 1/24 = 4.166% = 4 1/6%.",
    "companies": [
      "TCS NQT",
      "Tech Mahindra"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/profit-and-loss/"
  },
  {
    "id": "apt-12",
    "sheetIndex": 12,
    "categoryId": 2,
    "category": "Percentages, Profit & Loss",
    "categoryIcon": "\ud83d\udcb0",
    "topic": "Profit and Loss",
    "title": "Successive Discounts",
    "difficulty": "Easy",
    "question": "Find the single discount equivalent to a series discount of 20%, 10% and 5%.",
    "options": [
      {
        "label": "A",
        "text": "31.6%"
      },
      {
        "label": "B",
        "text": "32.4%"
      },
      {
        "label": "C",
        "text": "35%"
      },
      {
        "label": "D",
        "text": "38%"
      }
    ],
    "correctOption": "A",
    "explanation": "Let marked price = 100.\nPrice after 20% discount = 80.\nPrice after 10% discount = 80 - (80 * 0.10) = 72.\nPrice after 5% discount = 72 - (72 * 0.05) = 72 - 3.6 = 68.4.\nSingle equivalent discount = 100 - 68.4 = 31.6%.",
    "formula": "Net Price = MP * (1 - d1/100) * (1 - d2/100) * (1 - d3/100)",
    "shortcut": "Successive of 20 & 10 = 20 + 10 - 2 = 28%. Successive of 28 & 5 = 28 + 5 - (28*5/100) = 33 - 1.4 = 31.6%.",
    "companies": [
      "Wipro",
      "Accenture"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/profit-and-loss/"
  },
  {
    "id": "apt-13",
    "sheetIndex": 13,
    "categoryId": 2,
    "category": "Percentages, Profit & Loss",
    "categoryIcon": "\ud83d\udcb0",
    "topic": "Profit and Loss",
    "title": "Marked Price to Gain Profit after Discount",
    "difficulty": "Medium",
    "question": "At what percentage above the cost price must an article be marked so that after allowing a discount of 10%, a profit of 26% is gained?",
    "options": [
      {
        "label": "A",
        "text": "36%"
      },
      {
        "label": "B",
        "text": "40%"
      },
      {
        "label": "C",
        "text": "45%"
      },
      {
        "label": "D",
        "text": "50%"
      }
    ],
    "correctOption": "B",
    "explanation": "Let C.P. = 100.\nDesired S.P. for 26% profit = 126.\nNow S.P. is 90% of Marked Price (M.P.).\nSo, 0.90 * M.P. = 126 => M.P. = 126 / 0.90 = 140.\nMark up percentage = 140 - 100 = 40%.",
    "formula": "MP = CP * (100 + Gain%) / (100 - Discount%)",
    "shortcut": "MP / CP = (100 + 26) / (100 - 10) = 126 / 90 = 14 / 10 = 1.40 -> 40% markup.",
    "companies": [
      "Cognizant",
      "TCS NQT"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/profit-and-loss/"
  },
  {
    "id": "apt-14",
    "sheetIndex": 14,
    "categoryId": 3,
    "category": "Ratio, Averages & Mixtures",
    "categoryIcon": "\u2696\ufe0f",
    "topic": "Ratio and Proportion",
    "title": "Ratio Sharing Among Three Persons",
    "difficulty": "Easy",
    "question": "A sum of Rs. 427 is to be divided among A, B and C such that 3 times A's share, 4 times B's share and 7 times C's share are all equal. Find the share of C.",
    "options": [
      {
        "label": "A",
        "text": "Rs. 84"
      },
      {
        "label": "B",
        "text": "Rs. 140"
      },
      {
        "label": "C",
        "text": "Rs. 196"
      },
      {
        "label": "D",
        "text": "Rs. 240"
      }
    ],
    "correctOption": "A",
    "explanation": "Given: 3A = 4B = 7C = k.\nThen A = k/3, B = k/4, C = k/7.\nA : B : C = (1/3) : (1/4) : (1/7).\nMultiply by LCM(3, 4, 7) = 84:\nA : B : C = 28 : 21 : 12.\nSum of ratio parts = 28 + 21 + 12 = 61.\nShare of C = (12 / 61) * 427 = 12 * 7 = Rs. 84.",
    "formula": "A : B : C = (1/a) : (1/b) : (1/c)",
    "shortcut": "427 / 61 = 7. C's share = 12 * 7 = 84.",
    "companies": [
      "TCS NQT",
      "Infosys"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/ratio-and-proportion/"
  },
  {
    "id": "apt-15",
    "sheetIndex": 15,
    "categoryId": 3,
    "category": "Ratio, Averages & Mixtures",
    "categoryIcon": "\u2696\ufe0f",
    "topic": "Average",
    "title": "Batsman Average after New Innings",
    "difficulty": "Easy",
    "question": "A batsman makes a score of 87 runs in the 17th inning and thus increases his average by 3. Find his average after the 17th inning.",
    "options": [
      {
        "label": "A",
        "text": "36"
      },
      {
        "label": "B",
        "text": "39"
      },
      {
        "label": "C",
        "text": "42"
      },
      {
        "label": "D",
        "text": "45"
      }
    ],
    "correctOption": "B",
    "explanation": "Let average after 16 innings be x.\nThen total runs in 16 innings = 16x.\nAfter 17th inning, total runs = 16x + 87.\nNew average = x + 3.\nSo, 16x + 87 = 17 * (x + 3)\n16x + 87 = 17x + 51\nx = 87 - 51 = 36.\nAverage after 17th inning = x + 3 = 36 + 3 = 39.",
    "formula": "New Average = Old Average + Increase",
    "shortcut": "Direct: New Average = 87 - (16 * 3) = 87 - 48 = 39.",
    "companies": [
      "Wipro",
      "Capgemini"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/average/"
  },
  {
    "id": "apt-16",
    "sheetIndex": 16,
    "categoryId": 3,
    "category": "Ratio, Averages & Mixtures",
    "categoryIcon": "\u2696\ufe0f",
    "topic": "Average",
    "title": "Average Age with Teacher Included",
    "difficulty": "Easy",
    "question": "The average age of 24 students and the principal is 15 years. When the principal's age is excluded, the average decreases by 1 year. What is the age of the principal?",
    "options": [
      {
        "label": "A",
        "text": "35 years"
      },
      {
        "label": "B",
        "text": "38 years"
      },
      {
        "label": "C",
        "text": "39 years"
      },
      {
        "label": "D",
        "text": "40 years"
      }
    ],
    "correctOption": "C",
    "explanation": "Total age of 24 students + 1 principal (25 persons) = 25 * 15 = 375 years.\nWhen principal is excluded, remaining persons = 24.\nNew average = 15 - 1 = 14 years.\nTotal age of 24 students = 24 * 14 = 336 years.\nAge of principal = 375 - 336 = 39 years.",
    "formula": "Excluded Person Age = Old Total - New Total",
    "shortcut": "15 + (24 * 1) = 15 + 24 = 39 years.",
    "companies": [
      "Accenture",
      "TCS NQT"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/average/"
  },
  {
    "id": "apt-17",
    "sheetIndex": 17,
    "categoryId": 3,
    "category": "Ratio, Averages & Mixtures",
    "categoryIcon": "\u2696\ufe0f",
    "topic": "Mixture and Alligation",
    "title": "Alligation Rule for Milk and Water",
    "difficulty": "Medium",
    "question": "In what ratio must water be mixed with milk costing Rs. 12 per litre to obtain a mixture worth Rs. 8 per litre?",
    "options": [
      {
        "label": "A",
        "text": "1 : 2"
      },
      {
        "label": "B",
        "text": "2 : 1"
      },
      {
        "label": "C",
        "text": "2 : 3"
      },
      {
        "label": "D",
        "text": "3 : 2"
      }
    ],
    "correctOption": "A",
    "explanation": "Cost of water = Rs. 0.\nCost of milk = Rs. 12.\nMean price = Rs. 8.\nBy the rule of alligation:\nWater / Milk = (12 - 8) / (8 - 0) = 4 / 8 = 1 / 2.\nHence, water and milk must be mixed in the ratio 1 : 2.",
    "formula": "(Cheaper Qty / Dearer Qty) = (d - m) / (m - c)",
    "shortcut": "Water price 0, Milk price 12, Target 8. Difference across: 12 - 8 = 4, 8 - 0 = 8. Ratio = 4:8 = 1:2.",
    "companies": [
      "Infosys",
      "Cognizant"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/mixture-and-alligation/"
  },
  {
    "id": "apt-18",
    "sheetIndex": 18,
    "categoryId": 3,
    "category": "Ratio, Averages & Mixtures",
    "categoryIcon": "\u2696\ufe0f",
    "topic": "Mixture and Alligation",
    "title": "Liquid Replacement Formula",
    "difficulty": "Medium",
    "question": "A container contains 40 litres of milk. From this container, 4 litres of milk was taken out and replaced by water. This process was repeated further two times. How much milk is now contained by the container?",
    "options": [
      {
        "label": "A",
        "text": "26.34 litres"
      },
      {
        "label": "B",
        "text": "27.36 litres"
      },
      {
        "label": "C",
        "text": "28 litres"
      },
      {
        "label": "D",
        "text": "29.16 litres"
      }
    ],
    "correctOption": "D",
    "explanation": "Formula: Amount of liquid left = x * (1 - y/x)^n\nHere x = 40, y = 4, and process is done 1 + 2 = 3 times (n = 3).\nAmount left = 40 * (1 - 4/40)^3 = 40 * (9/10)^3\n= 40 * (729 / 1000) = 4 * 72.9 / 10 = 291.6 / 10 = 29.16 litres.",
    "formula": "Quantity left = Original * (1 - Drawn/Original)^n",
    "shortcut": "Each step retains 90% (0.9) of milk: 40 * 0.9^3 = 40 * 0.729 = 29.16 litres.",
    "companies": [
      "TCS NQT",
      "Amazon"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/mixture-and-alligation/"
  },
  {
    "id": "apt-19",
    "sheetIndex": 19,
    "categoryId": 3,
    "category": "Ratio, Averages & Mixtures",
    "categoryIcon": "\u2696\ufe0f",
    "topic": "Partnership",
    "title": "Investment and Period Profit Sharing",
    "difficulty": "Easy",
    "question": "A started a business with Rs. 21,000 and is joined afterwards by B with Rs. 36,000. After how many months did B join if the profits at the end of the year are divided equally?",
    "options": [
      {
        "label": "A",
        "text": "3 months"
      },
      {
        "label": "B",
        "text": "5 months"
      },
      {
        "label": "C",
        "text": "7 months"
      },
      {
        "label": "D",
        "text": "8 months"
      }
    ],
    "correctOption": "B",
    "explanation": "Let B's investment be for x months.\nA's investment is for 12 months.\nRatio of investments = (21000 * 12) : (36000 * x) = 1 : 1 (equal profit)\n21000 * 12 = 36000 * x\n252000 = 36000x\nx = 252 / 36 = 7 months.\nSince B worked for 7 months, he joined after (12 - 7) = 5 months.",
    "formula": "Profit Ratio = (P1 * T1) : (P2 * T2)",
    "shortcut": "21 * 12 = 36 * x => x = 7 months. So B joined after 12 - 7 = 5 months.",
    "companies": [
      "Infosys",
      "Wipro"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/partnership/"
  },
  {
    "id": "apt-20",
    "sheetIndex": 20,
    "categoryId": 4,
    "category": "Simple & Compound Interest",
    "categoryIcon": "\ud83d\udcc8",
    "topic": "Simple Interest",
    "title": "Sum Doubles in N Years Rule",
    "difficulty": "Easy",
    "question": "A sum of money at simple interest doubles itself in 8 years. In how many years will it become 4 times itself?",
    "options": [
      {
        "label": "A",
        "text": "16 years"
      },
      {
        "label": "B",
        "text": "24 years"
      },
      {
        "label": "C",
        "text": "28 years"
      },
      {
        "label": "D",
        "text": "32 years"
      }
    ],
    "correctOption": "B",
    "explanation": "Let principal = P.\nWhen it doubles, Amount = 2P, so SI = P in 8 years.\nTo become 4 times, Amount = 4P, so SI needed = 3P.\nSince SI is proportional to time:\nP interest takes 8 years.\n3P interest will take 3 * 8 = 24 years.",
    "formula": "(N1 - 1) / T1 = (N2 - 1) / T2",
    "shortcut": "Time = ((4 - 1) / (2 - 1)) * 8 = 3 * 8 = 24 years.",
    "companies": [
      "TCS NQT",
      "Capgemini"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/simple-interest/"
  },
  {
    "id": "apt-21",
    "sheetIndex": 21,
    "categoryId": 4,
    "category": "Simple & Compound Interest",
    "categoryIcon": "\ud83d\udcc8",
    "topic": "Simple Interest",
    "title": "Rate of Interest from Two Given Periods",
    "difficulty": "Medium",
    "question": "A sum of money amounts to Rs. 9800 after 5 years and Rs. 12005 after 8 years at the same rate of simple interest. What is the rate of interest per annum?",
    "options": [
      {
        "label": "A",
        "text": "12%"
      },
      {
        "label": "B",
        "text": "15%"
      },
      {
        "label": "C",
        "text": "18%"
      },
      {
        "label": "D",
        "text": "20%"
      }
    ],
    "correctOption": "A",
    "explanation": "S.I. for 3 years (8 - 5) = Rs. (12005 - 9800) = Rs. 2205.\nS.I. for 1 year = 2205 / 3 = Rs. 735.\nS.I. for 5 years = 735 * 5 = Rs. 3675.\nPrincipal P = Amount after 5 yrs - S.I. for 5 yrs = 9800 - 3675 = Rs. 6125.\nRate R = (100 * S.I.) / (P * T) = (100 * 3675) / (6125 * 5) = 367500 / 30625 = 12% per annum.",
    "formula": "R = (SI * 100) / (P * T)",
    "shortcut": "SI per yr = 735. P = 9800 - 5*735 = 6125. R = 735 / 61.25 = 12%.",
    "companies": [
      "Cognizant",
      "Infosys"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/simple-interest/"
  },
  {
    "id": "apt-22",
    "sheetIndex": 22,
    "categoryId": 4,
    "category": "Simple & Compound Interest",
    "categoryIcon": "\ud83d\udcc8",
    "topic": "Compound Interest",
    "title": "Annual Compound Interest Calculation",
    "difficulty": "Easy",
    "question": "What will be the compound interest on a sum of Rs. 25,000 after 3 years at the rate of 12% per annum?",
    "options": [
      {
        "label": "A",
        "text": "Rs. 9,000"
      },
      {
        "label": "B",
        "text": "Rs. 10,123.20"
      },
      {
        "label": "C",
        "text": "Rs. 10,500"
      },
      {
        "label": "D",
        "text": "Rs. 11,200"
      }
    ],
    "correctOption": "B",
    "explanation": "Amount = P * (1 + R/100)^t = 25000 * (1 + 12/100)^3\n= 25000 * (28/25)^3 = 25000 * (21952 / 15625)\n= 1.6 * 21952 = Rs. 35,123.20.\nCompound Interest C.I. = Amount - Principal = 35123.20 - 25000 = Rs. 10,123.20.",
    "formula": "CI = P * [(1 + R/100)^t - 1]",
    "shortcut": "Effective 3-yr rate for 12% = 40.4928%. 25000 * 0.404928 = Rs. 10,123.20.",
    "companies": [
      "TCS NQT",
      "Wipro"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/compound-interest/"
  },
  {
    "id": "apt-23",
    "sheetIndex": 23,
    "categoryId": 4,
    "category": "Simple & Compound Interest",
    "categoryIcon": "\ud83d\udcc8",
    "topic": "Compound Interest",
    "title": "Difference Between CI and SI for 2 Years",
    "difficulty": "Easy",
    "question": "The difference between compound interest and simple interest on an amount of Rs. 15,000 for 2 years is Rs. 96. What is the rate of interest per annum?",
    "options": [
      {
        "label": "A",
        "text": "6%"
      },
      {
        "label": "B",
        "text": "8%"
      },
      {
        "label": "C",
        "text": "10%"
      },
      {
        "label": "D",
        "text": "12%"
      }
    ],
    "correctOption": "B",
    "explanation": "For 2 years: Difference = P * (R / 100)^2.\n96 = 15000 * (R / 100)^2\n96 / 15000 = R^2 / 10000\nR^2 = (96 * 10000) / 15000 = 960 / 15 = 64.\nR = sqrt(64) = 8% per annum.",
    "formula": "Difference (2 yrs) = P * (R/100)^2",
    "shortcut": "R = 100 * sqrt(Diff / P) = 100 * sqrt(96 / 15000) = 100 * sqrt(0.0064) = 100 * 0.08 = 8%.",
    "companies": [
      "Accenture",
      "Infosys"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/compound-interest/"
  },
  {
    "id": "apt-24",
    "sheetIndex": 24,
    "categoryId": 4,
    "category": "Simple & Compound Interest",
    "categoryIcon": "\ud83d\udcc8",
    "topic": "Compound Interest",
    "title": "Difference Between CI and SI for 3 Years",
    "difficulty": "Medium",
    "question": "The difference between compound interest and simple interest on a certain sum at 10% per annum for 3 years is Rs. 31. Find the sum.",
    "options": [
      {
        "label": "A",
        "text": "Rs. 1,000"
      },
      {
        "label": "B",
        "text": "Rs. 1,200"
      },
      {
        "label": "C",
        "text": "Rs. 1,500"
      },
      {
        "label": "D",
        "text": "Rs. 2,000"
      }
    ],
    "correctOption": "A",
    "explanation": "For 3 years: Difference = P * (R/100)^2 * (3 + R/100)\n31 = P * (10/100)^2 * (3 + 10/100)\n31 = P * (1/100) * (31/10)\n31 = P * (31 / 1000)\nP = (31 * 1000) / 31 = Rs. 1000.",
    "formula": "Diff (3 yrs) = P * (R/100)^2 * [3 + (R/100)]",
    "shortcut": "At 10%: SI = 30%, CI = 33.1%. Difference = 3.1%. 3.1% = 31 => 100% = Rs. 1000.",
    "companies": [
      "TCS NQT",
      "Tech Mahindra"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/compound-interest/"
  },
  {
    "id": "apt-25",
    "sheetIndex": 25,
    "categoryId": 4,
    "category": "Simple & Compound Interest",
    "categoryIcon": "\ud83d\udcc8",
    "topic": "Compound Interest",
    "title": "Sum Doubles in N Years (CI)",
    "difficulty": "Easy",
    "question": "A sum of money placed at compound interest doubles itself in 5 years. In how many years will it become 8 times itself?",
    "options": [
      {
        "label": "A",
        "text": "12 years"
      },
      {
        "label": "B",
        "text": "15 years"
      },
      {
        "label": "C",
        "text": "20 years"
      },
      {
        "label": "D",
        "text": "25 years"
      }
    ],
    "correctOption": "B",
    "explanation": "Under compound interest, growth is exponential:\nAmount = P * 2 in 5 years.\nTo become 8 times: 8 = 2^3.\nTime taken = 3 * 5 = 15 years.",
    "formula": "If P becomes 2P in T years, it becomes (2^k)P in (k * T) years",
    "shortcut": "8 = 2^3 -> 3 * 5 = 15 years.",
    "companies": [
      "Capgemini",
      "Wipro"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/compound-interest/"
  },
  {
    "id": "apt-26",
    "sheetIndex": 26,
    "categoryId": 5,
    "category": "Time & Work, Pipes",
    "categoryIcon": "\u23f3",
    "topic": "Time and Work",
    "title": "Two Persons Working Together",
    "difficulty": "Easy",
    "question": "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:",
    "options": [
      {
        "label": "A",
        "text": "7/15"
      },
      {
        "label": "B",
        "text": "8/15"
      },
      {
        "label": "C",
        "text": "1/10"
      },
      {
        "label": "D",
        "text": "1/4"
      }
    ],
    "correctOption": "B",
    "explanation": "A's 1 day work = 1/15.\nB's 1 day work = 1/20.\n(A + B)'s 1 day work = (1/15) + (1/20) = (4 + 3) / 60 = 7/60.\nWork done in 4 days = 4 * (7/60) = 7/15.\nRemaining work = 1 - (7/15) = 8/15.",
    "formula": "Work Left = 1 - (Days * Combined Rate)",
    "shortcut": "Total work = 60 units. A = 4 u/d, B = 3 u/d. In 4 days = 4 * 7 = 28 units done. Left = 32/60 = 8/15.",
    "companies": [
      "TCS NQT",
      "Infosys"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/time-and-work/"
  },
  {
    "id": "apt-27",
    "sheetIndex": 27,
    "categoryId": 5,
    "category": "Time & Work, Pipes",
    "categoryIcon": "\u23f3",
    "topic": "Time and Work",
    "title": "One Leaves Before Completion",
    "difficulty": "Medium",
    "question": "A can finish a work in 18 days and B can do the same work in 15 days. B worked for 10 days and left the job. In how many days, can A alone finish the remaining work?",
    "options": [
      {
        "label": "A",
        "text": "5 days"
      },
      {
        "label": "B",
        "text": "5 1/2 days"
      },
      {
        "label": "C",
        "text": "6 days"
      },
      {
        "label": "D",
        "text": "8 days"
      }
    ],
    "correctOption": "C",
    "explanation": "B's 10 days work = 10 * (1/15) = 10/15 = 2/3.\nRemaining work = 1 - 2/3 = 1/3.\nA finishes 1 complete work in 18 days.\nSo A finishes 1/3 of the work in (1/3) * 18 = 6 days.",
    "formula": "Days = Remaining Work / Worker Efficiency",
    "shortcut": "Total work = 90. B = 6 u/d, A = 5 u/d. B in 10 days = 60 units. Left = 30 units. A takes 30 / 5 = 6 days.",
    "companies": [
      "Cognizant",
      "Accenture"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/time-and-work/"
  },
  {
    "id": "apt-28",
    "sheetIndex": 28,
    "categoryId": 5,
    "category": "Time & Work, Pipes",
    "categoryIcon": "\u23f3",
    "topic": "Time and Work",
    "title": "Work and Wages Distribution",
    "difficulty": "Easy",
    "question": "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
    "options": [
      {
        "label": "A",
        "text": "12 days"
      },
      {
        "label": "B",
        "text": "15 days"
      },
      {
        "label": "C",
        "text": "16 days"
      },
      {
        "label": "D",
        "text": "18 days"
      }
    ],
    "correctOption": "B",
    "explanation": "A's 1 day work = 1/20.\nB's 1 day work = 1/30.\nC's 1 day work = 1/60.\nDay 1: A works = 1/20.\nDay 2: A works = 1/20.\nDay 3: (A + B + C) work = 1/20 + 1/30 + 1/60 = (3 + 2 + 1) / 60 = 6/60 = 1/10.\nWork done in 3 days = 1/20 + 1/20 + 1/10 = 2/20 + 1/10 = 1/10 + 1/10 = 2/10 = 1/5.\n1/5th work is completed in 3 days.\nSo full work is completed in 3 * 5 = 15 days.",
    "formula": "Group into repeating day cycles",
    "shortcut": "Total work = 60. A=3, B=2, C=1. Cycle of 3 days: 3 + 3 + (3+2+1) = 12 units. Cycles needed = 60 / 12 = 5 cycles = 15 days.",
    "companies": [
      "TCS NQT",
      "Wipro"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/time-and-work/"
  },
  {
    "id": "apt-29",
    "sheetIndex": 29,
    "categoryId": 5,
    "category": "Time & Work, Pipes",
    "categoryIcon": "\u23f3",
    "topic": "Pipes and Cistern",
    "title": "Two Inlets and One Outlet",
    "difficulty": "Easy",
    "question": "Two pipes A and B can fill a cistern in 37 1/2 minutes and 45 minutes respectively. Both pipes are opened. The cistern will be filled in just half an hour, if the B is turned off after:",
    "options": [
      {
        "label": "A",
        "text": "5 min"
      },
      {
        "label": "B",
        "text": "9 min"
      },
      {
        "label": "C",
        "text": "10 min"
      },
      {
        "label": "D",
        "text": "15 min"
      }
    ],
    "correctOption": "B",
    "explanation": "Pipe A fills in 75/2 minutes => A's rate = 2/75 per minute.\nPipe B fills in 45 minutes => B's rate = 1/45 per minute.\nTotal time is 30 minutes. Pipe A works the entire 30 minutes.\nWork done by A in 30 minutes = 30 * (2/75) = 60/75 = 4/5.\nRemaining part to be filled by B = 1 - 4/5 = 1/5.\nTime taken by B to fill 1/5th = (1/5) / (1/45) = 45 / 5 = 9 minutes.\nHence, Pipe B should be turned off after 9 minutes.",
    "formula": "Work done by continuous pipe + Work done by closed pipe = 1",
    "shortcut": "A does 4/5 of work in 30 min. B must do remaining 1/5: 1/5 of 45 min = 9 min.",
    "companies": [
      "Infosys",
      "Capgemini"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/pipes-and-cistern/"
  },
  {
    "id": "apt-30",
    "sheetIndex": 30,
    "categoryId": 5,
    "category": "Time & Work, Pipes",
    "categoryIcon": "\u23f3",
    "topic": "Pipes and Cistern",
    "title": "Tank Leak Emptying Concept",
    "difficulty": "Medium",
    "question": "A pump can fill a tank with water in 2 hours. Because of a leak, it took 2 1/3 hours to fill the tank. The leak can drain all the water of the tank in:",
    "options": [
      {
        "label": "A",
        "text": "4 1/3 hours"
      },
      {
        "label": "B",
        "text": "7 hours"
      },
      {
        "label": "C",
        "text": "8 hours"
      },
      {
        "label": "D",
        "text": "14 hours"
      }
    ],
    "correctOption": "D",
    "explanation": "Work done by the inlet in 1 hour = 1/2.\nWork done by (inlet - leak) in 1 hour = 1 / (7/3) = 3/7.\nWork done by the leak in 1 hour = (1/2) - (3/7) = (7 - 6) / 14 = 1/14.\nTherefore, the leak alone can empty the tank in 14 hours.",
    "formula": "Leak Rate = Inlet Rate - Combined Rate",
    "shortcut": "(1/2) - (3/7) = 1/14 => 14 hours.",
    "companies": [
      "TCS NQT",
      "Accenture"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/pipes-and-cistern/"
  },
  {
    "id": "apt-31",
    "sheetIndex": 31,
    "categoryId": 5,
    "category": "Time & Work, Pipes",
    "categoryIcon": "\u23f3",
    "topic": "Pipes and Cistern",
    "title": "Three Pipes Alternating Flow",
    "difficulty": "Easy",
    "question": "Three pipes A, B and C can fill a tank in 6 hours. After working at it together for 2 hours, C is closed and A and B can fill the remaining part in 7 hours. The number of hours taken by C alone to fill the tank is:",
    "options": [
      {
        "label": "A",
        "text": "10"
      },
      {
        "label": "B",
        "text": "12"
      },
      {
        "label": "C",
        "text": "14"
      },
      {
        "label": "D",
        "text": "16"
      }
    ],
    "correctOption": "C",
    "explanation": "Part filled by (A + B + C) in 2 hours = 2/6 = 1/3.\nRemaining part = 1 - 1/3 = 2/3.\n(A + B) fill 2/3 part in 7 hours => (A + B) 1 hour work = (2/3) / 7 = 2/21.\nC's 1 hour work = (A + B + C)'s 1 hr work - (A + B)'s 1 hr work\n= (1/6) - (2/21) = (7 - 4) / 42 = 3/42 = 1/14.\nTherefore, C alone can fill the tank in 14 hours.",
    "formula": "C Rate = Total Rate - (A+B) Rate",
    "shortcut": "In 2 hrs, 1/3 done. Remaining 2/3 takes A+B 7 hrs. C's rate = 1/6 - 2/21 = 1/14 => 14 hrs.",
    "companies": [
      "Cognizant",
      "Mindtree"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/pipes-and-cistern/"
  },
  {
    "id": "apt-32",
    "sheetIndex": 32,
    "categoryId": 6,
    "category": "Speed, Distance & Trains",
    "categoryIcon": "\ud83d\ude82",
    "topic": "Time and Distance",
    "title": "Speed Conversion and Fundamental Formula",
    "difficulty": "Easy",
    "question": "A person crosses a 600 m long street in 5 minutes. What is his speed in km per hour?",
    "options": [
      {
        "label": "A",
        "text": "3.6"
      },
      {
        "label": "B",
        "text": "7.2"
      },
      {
        "label": "C",
        "text": "8.4"
      },
      {
        "label": "D",
        "text": "10"
      }
    ],
    "correctOption": "B",
    "explanation": "Distance = 600 m.\nTime = 5 minutes = 5 * 60 = 300 seconds.\nSpeed in m/s = Distance / Time = 600 / 300 = 2 m/s.\nTo convert m/s to km/hr, multiply by 18/5:\nSpeed in km/hr = 2 * (18 / 5) = 36 / 5 = 7.2 km/hr.",
    "formula": "Speed (km/hr) = Speed (m/s) * (18 / 5)",
    "shortcut": "600 m / 300 s = 2 m/s. 2 * 3.6 = 7.2 km/hr.",
    "companies": [
      "TCS NQT",
      "Wipro"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/time-and-distance/"
  },
  {
    "id": "apt-33",
    "sheetIndex": 33,
    "categoryId": 6,
    "category": "Speed, Distance & Trains",
    "categoryIcon": "\ud83d\ude82",
    "topic": "Time and Distance",
    "title": "Average Speed for Round Trip",
    "difficulty": "Easy",
    "question": "A man travels from A to B at 20 km/hr and returns from B to A at 30 km/hr. What is his average speed for the whole journey?",
    "options": [
      {
        "label": "A",
        "text": "24 km/hr"
      },
      {
        "label": "B",
        "text": "25 km/hr"
      },
      {
        "label": "C",
        "text": "26 km/hr"
      },
      {
        "label": "D",
        "text": "28 km/hr"
      }
    ],
    "correctOption": "A",
    "explanation": "When equal distances are covered at speeds x and y, the average speed is the Harmonic Mean:\nAverage Speed = (2 * x * y) / (x + y)\n= (2 * 20 * 30) / (20 + 30)\n= 1200 / 50 = 24 km/hr.",
    "formula": "Avg Speed = 2xy / (x + y)",
    "shortcut": "(2 * 20 * 30) / 50 = 1200 / 50 = 24 km/hr.",
    "companies": [
      "Infosys",
      "Capgemini"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/time-and-distance/"
  },
  {
    "id": "apt-34",
    "sheetIndex": 34,
    "categoryId": 6,
    "category": "Speed, Distance & Trains",
    "categoryIcon": "\ud83d\ude82",
    "topic": "Problems on Trains",
    "title": "Train Crossing a Stationary Pole",
    "difficulty": "Easy",
    "question": "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    "options": [
      {
        "label": "A",
        "text": "120 metres"
      },
      {
        "label": "B",
        "text": "150 metres"
      },
      {
        "label": "C",
        "text": "180 metres"
      },
      {
        "label": "D",
        "text": "324 metres"
      }
    ],
    "correctOption": "B",
    "explanation": "Speed in m/s = 60 * (5 / 18) = 50 / 3 m/s.\nTime taken to cross the pole = 9 seconds.\nLength of train = Speed * Time = (50 / 3) * 9 = 50 * 3 = 150 metres.",
    "formula": "Distance = Speed * Time; Length of train is the distance covered.",
    "shortcut": "(60 * 5/18) * 9 = 50/3 * 9 = 150 metres.",
    "companies": [
      "TCS NQT",
      "Accenture"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/problems-on-trains/"
  },
  {
    "id": "apt-35",
    "sheetIndex": 35,
    "categoryId": 6,
    "category": "Speed, Distance & Trains",
    "categoryIcon": "\ud83d\ude82",
    "topic": "Problems on Trains",
    "title": "Train Crossing a Platform",
    "difficulty": "Easy",
    "question": "A train 130 metres long and travelling at 45 km/hr can cross a bridge in 30 seconds. The length of the bridge is:",
    "options": [
      {
        "label": "A",
        "text": "200 metres"
      },
      {
        "label": "B",
        "text": "225 metres"
      },
      {
        "label": "C",
        "text": "245 metres"
      },
      {
        "label": "D",
        "text": "250 metres"
      }
    ],
    "correctOption": "C",
    "explanation": "Speed = 45 * (5/18) = 25 / 2 m/s.\nTotal distance = Length of train + Length of bridge = 130 + x.\nTime = 30 seconds.\n(130 + x) / 30 = 25 / 2\n2 * (130 + x) = 750\n260 + 2x = 750\n2x = 490 => x = 245 metres.",
    "formula": "Total Distance = Train Length + Platform/Bridge Length",
    "shortcut": "Distance in 30 s = (25/2) * 30 = 375 m. Bridge = 375 - 130 = 245 m.",
    "companies": [
      "Infosys",
      "Wipro"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/problems-on-trains/"
  },
  {
    "id": "apt-36",
    "sheetIndex": 36,
    "categoryId": 6,
    "category": "Speed, Distance & Trains",
    "categoryIcon": "\ud83d\ude82",
    "topic": "Problems on Trains",
    "title": "Two Trains Moving in Opposite Directions",
    "difficulty": "Medium",
    "question": "Two trains of lengths 140 m and 160 m run on parallel lines towards each other at 60 km/hr and 40 km/hr respectively. In what time will they clear each other from the moment they meet?",
    "options": [
      {
        "label": "A",
        "text": "9 seconds"
      },
      {
        "label": "B",
        "text": "10.8 seconds"
      },
      {
        "label": "C",
        "text": "12 seconds"
      },
      {
        "label": "D",
        "text": "14.4 seconds"
      }
    ],
    "correctOption": "B",
    "explanation": "Relative speed (opposite directions) = 60 + 40 = 100 km/hr.\n= 100 * (5 / 18) = 250 / 9 m/s.\nTotal distance to be covered = 140 + 160 = 300 m.\nTime = Distance / Relative Speed = 300 / (250 / 9) = (300 * 9) / 250 = 2700 / 250 = 10.8 seconds.",
    "formula": "Relative Speed (Opposite) = S1 + S2; Distance = L1 + L2",
    "shortcut": "300 / (100 * 5/18) = 300 * 18 / 500 = 54 / 5 = 10.8 seconds.",
    "companies": [
      "TCS NQT",
      "Cognizant"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/problems-on-trains/"
  },
  {
    "id": "apt-37",
    "sheetIndex": 37,
    "categoryId": 6,
    "category": "Speed, Distance & Trains",
    "categoryIcon": "\ud83d\ude82",
    "topic": "Problems on Trains",
    "title": "Two Trains in Same Direction",
    "difficulty": "Medium",
    "question": "Two trains 100 m and 120 m long are running in the same direction with speeds of 72 km/hr and 54 km/hr. In how much time will the first train pass the second?",
    "options": [
      {
        "label": "A",
        "text": "40 seconds"
      },
      {
        "label": "B",
        "text": "44 seconds"
      },
      {
        "label": "C",
        "text": "48 seconds"
      },
      {
        "label": "D",
        "text": "50 seconds"
      }
    ],
    "correctOption": "B",
    "explanation": "Relative speed (same direction) = 72 - 54 = 18 km/hr.\n= 18 * (5 / 18) = 5 m/s.\nTotal distance = 100 + 120 = 220 m.\nTime taken = Total Distance / Relative Speed = 220 / 5 = 44 seconds.",
    "formula": "Relative Speed (Same direction) = S1 - S2",
    "shortcut": "Distance = 220 m. Relative speed = 18 km/hr = 5 m/s. Time = 220 / 5 = 44 s.",
    "companies": [
      "Capgemini",
      "Tech Mahindra"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/problems-on-trains/"
  },
  {
    "id": "apt-38",
    "sheetIndex": 38,
    "categoryId": 6,
    "category": "Speed, Distance & Trains",
    "categoryIcon": "\ud83d\ude82",
    "topic": "Boats and Streams",
    "title": "Speed of Boat in Still Water & Stream",
    "difficulty": "Easy",
    "question": "A boat can travel with a speed of 13 km/hr in still water. If the speed of the stream is 4 km/hr, find the time taken by the boat to go 68 km downstream.",
    "options": [
      {
        "label": "A",
        "text": "3 hours"
      },
      {
        "label": "B",
        "text": "4 hours"
      },
      {
        "label": "C",
        "text": "5 hours"
      },
      {
        "label": "D",
        "text": "6 hours"
      }
    ],
    "correctOption": "B",
    "explanation": "Speed of boat in still water u = 13 km/hr.\nSpeed of stream v = 4 km/hr.\nSpeed downstream = u + v = 13 + 4 = 17 km/hr.\nTime taken to travel 68 km downstream = Distance / Downstream Speed = 68 / 17 = 4 hours.",
    "formula": "Downstream Speed = u + v; Upstream Speed = u - v",
    "shortcut": "Downstream speed = 13 + 4 = 17 km/hr. Time = 68 / 17 = 4 hours.",
    "companies": [
      "TCS NQT",
      "Accenture"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/boats-and-streams/"
  },
  {
    "id": "apt-39",
    "sheetIndex": 39,
    "categoryId": 6,
    "category": "Speed, Distance & Trains",
    "categoryIcon": "\ud83d\ude82",
    "topic": "Boats and Streams",
    "title": "Boat Upstream and Downstream Speed Given",
    "difficulty": "Medium",
    "question": "A man's speed with the current is 15 km/hr and the speed of the current is 2.5 km/hr. The man's speed against the current is:",
    "options": [
      {
        "label": "A",
        "text": "8.5 km/hr"
      },
      {
        "label": "B",
        "text": "9 km/hr"
      },
      {
        "label": "C",
        "text": "10 km/hr"
      },
      {
        "label": "D",
        "text": "12.5 km/hr"
      }
    ],
    "correctOption": "C",
    "explanation": "Man's speed with current (downstream) = u + v = 15 km/hr.\nCurrent speed v = 2.5 km/hr.\nMan's speed in still water u = 15 - 2.5 = 12.5 km/hr.\nMan's speed against current (upstream) = u - v = 12.5 - 2.5 = 10 km/hr.",
    "formula": "Upstream Speed = Downstream Speed - 2 * Current Speed",
    "shortcut": "Upstream = 15 - 2*(2.5) = 15 - 5 = 10 km/hr.",
    "companies": [
      "Infosys",
      "Wipro"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/boats-and-streams/"
  },
  {
    "id": "apt-40",
    "sheetIndex": 40,
    "categoryId": 7,
    "category": "Permutation & Probability",
    "categoryIcon": "\ud83c\udfb2",
    "topic": "Permutation and Combination",
    "title": "Arranging Letters with Vowels Together",
    "difficulty": "Medium",
    "question": "In how many different ways can the letters of the word 'LEADING' be arranged in such a way that the vowels always come together?",
    "options": [
      {
        "label": "A",
        "text": "360"
      },
      {
        "label": "B",
        "text": "480"
      },
      {
        "label": "C",
        "text": "720"
      },
      {
        "label": "D",
        "text": "5040"
      }
    ],
    "correctOption": "C",
    "explanation": "Word: 'LEADING' (7 letters: L, E, A, D, I, N, G).\nVowels: E, A, I (3 vowels).\nConsonants: L, D, N, G (4 consonants).\nTreat the 3 vowels as one single block (EAI).\nNow we have 4 consonants + 1 vowel block = 5 entities.\nThese 5 entities can be arranged in 5! = 120 ways.\nThe 3 vowels within their block can be arranged in 3! = 6 ways.\nTotal number of ways = 5! * 3! = 120 * 6 = 720 ways.",
    "formula": "Total Ways = (n - k + 1)! * k!",
    "shortcut": "5! * 3! = 120 * 6 = 720.",
    "companies": [
      "TCS NQT",
      "Cognizant",
      "Amazon"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/permutation-and-combination/"
  },
  {
    "id": "apt-41",
    "sheetIndex": 41,
    "categoryId": 7,
    "category": "Permutation & Probability",
    "categoryIcon": "\ud83c\udfb2",
    "topic": "Permutation and Combination",
    "title": "Committee Selection Combination (nCr)",
    "difficulty": "Easy",
    "question": "From a group of 7 men and 6 women, five persons are to be selected to form a committee so that at least 3 men are there on the committee. In how many ways can it be done?",
    "options": [
      {
        "label": "A",
        "text": "564"
      },
      {
        "label": "B",
        "text": "645"
      },
      {
        "label": "C",
        "text": "735"
      },
      {
        "label": "D",
        "text": "756"
      }
    ],
    "correctOption": "D",
    "explanation": "We can select: (3 Men and 2 Women) OR (4 Men and 1 Woman) OR (5 Men and 0 Women).\nCase 1: 7C3 * 6C2 = (35) * (15) = 525.\nCase 2: 7C4 * 6C1 = (35) * (6) = 210.\nCase 3: 7C5 * 6C0 = (21) * (1) = 21.\nTotal ways = 525 + 210 + 21 = 756 ways.",
    "formula": "nCr = n! / (r! * (n - r)!)",
    "shortcut": "7C3*6C2 + 7C4*6C1 + 7C5 = 525 + 210 + 21 = 756.",
    "companies": [
      "Infosys",
      "Capgemini"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/permutation-and-combination/"
  },
  {
    "id": "apt-42",
    "sheetIndex": 42,
    "categoryId": 7,
    "category": "Permutation & Probability",
    "categoryIcon": "\ud83c\udfb2",
    "topic": "Permutation and Combination",
    "title": "Handshakes in a Meeting",
    "difficulty": "Easy",
    "question": "In a party every person shakes hands with every other person. If there are 105 handshakes in all, how many persons were present in the party?",
    "options": [
      {
        "label": "A",
        "text": "13"
      },
      {
        "label": "B",
        "text": "14"
      },
      {
        "label": "C",
        "text": "15"
      },
      {
        "label": "D",
        "text": "16"
      }
    ],
    "correctOption": "C",
    "explanation": "Each handshake occurs between 2 people: nC2 = 105.\nn * (n - 1) / 2 = 105\nn * (n - 1) = 210.\nNotice that 15 * 14 = 210.\nTherefore, n = 15 persons were present.",
    "formula": "Handshakes = n * (n - 1) / 2",
    "shortcut": "n*(n-1) = 210. Since 15*14 = 210, n = 15.",
    "companies": [
      "Accenture",
      "Wipro"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/permutation-and-combination/"
  },
  {
    "id": "apt-43",
    "sheetIndex": 43,
    "categoryId": 7,
    "category": "Permutation & Probability",
    "categoryIcon": "\ud83c\udfb2",
    "topic": "Probability",
    "title": "Probability with Pack of Cards",
    "difficulty": "Easy",
    "question": "Two cards are drawn together from a pack of 52 cards. The probability that one is a spade and one is a heart, is:",
    "options": [
      {
        "label": "A",
        "text": "3/20"
      },
      {
        "label": "B",
        "text": "29/34"
      },
      {
        "label": "C",
        "text": "47/100"
      },
      {
        "label": "D",
        "text": "13/102"
      }
    ],
    "correctOption": "D",
    "explanation": "Total outcomes = 52C2 = (52 * 51) / 2 = 1326.\nNumber of spades = 13; Number of hearts = 13.\nFavourable outcomes = 13C1 * 13C1 = 13 * 13 = 169.\nProbability = 169 / 1326 = 13 / 102.",
    "formula": "P(E) = Favourable Outcomes / Total Outcomes",
    "shortcut": "(13 * 13) / (26 * 51) = 13 / 102.",
    "companies": [
      "TCS NQT",
      "Tech Mahindra"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/probability/"
  },
  {
    "id": "apt-44",
    "sheetIndex": 44,
    "categoryId": 7,
    "category": "Permutation & Probability",
    "categoryIcon": "\ud83c\udfb2",
    "topic": "Probability",
    "title": "Rolling Two Dice Sum",
    "difficulty": "Easy",
    "question": "In a simultaneous throw of two dice, what is the probability of getting a total score of 7?",
    "options": [
      {
        "label": "A",
        "text": "1/6"
      },
      {
        "label": "B",
        "text": "1/12"
      },
      {
        "label": "C",
        "text": "7/36"
      },
      {
        "label": "D",
        "text": "1/4"
      }
    ],
    "correctOption": "A",
    "explanation": "Total outcomes when two dice are thrown = 6 * 6 = 36.\nPairs giving sum of 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> Total 6 pairs.\nProbability = 6 / 36 = 1/6.",
    "formula": "P(sum=7 on 2 dice) = 6/36 = 1/6",
    "shortcut": "6 pairs give 7 out of 36 -> 6/36 = 1/6.",
    "companies": [
      "Infosys",
      "Capgemini"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/probability/"
  },
  {
    "id": "apt-45",
    "sheetIndex": 45,
    "categoryId": 7,
    "category": "Permutation & Probability",
    "categoryIcon": "\ud83c\udfb2",
    "topic": "Probability",
    "title": "Colored Balls Drawn from a Bag",
    "difficulty": "Medium",
    "question": "A bag contains 6 black and 8 white balls. One ball is drawn at random. What is the probability that the ball drawn is white?",
    "options": [
      {
        "label": "A",
        "text": "3/4"
      },
      {
        "label": "B",
        "text": "4/7"
      },
      {
        "label": "C",
        "text": "1/8"
      },
      {
        "label": "D",
        "text": "3/7"
      }
    ],
    "correctOption": "B",
    "explanation": "Total balls = 6 + 8 = 14 balls.\nFavourable white balls = 8.\nProbability = 8 / 14 = 4 / 7.",
    "formula": "P(white) = White balls / Total balls",
    "shortcut": "8 / 14 = 4/7.",
    "companies": [
      "Wipro",
      "Cognizant"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/probability/"
  },
  {
    "id": "apt-46",
    "sheetIndex": 46,
    "categoryId": 8,
    "category": "Ages, Calendars & Clocks",
    "categoryIcon": "\ud83d\udcc5",
    "topic": "Problems on Ages",
    "title": "Father and Son Age Ratio Equation",
    "difficulty": "Easy",
    "question": "Father is four times as old as his son. In 20 years, father will be twice as old as his son. Find the present age of the son.",
    "options": [
      {
        "label": "A",
        "text": "8 years"
      },
      {
        "label": "B",
        "text": "10 years"
      },
      {
        "label": "C",
        "text": "12 years"
      },
      {
        "label": "D",
        "text": "15 years"
      }
    ],
    "correctOption": "B",
    "explanation": "Let son's present age = x.\nFather's present age = 4x.\nIn 20 years:\nFather's age = 4x + 20.\nSon's age = x + 20.\nAccording to question:\n4x + 20 = 2 * (x + 20)\n4x + 20 = 2x + 40\n2x = 20 => x = 10 years.\nPresent age of son is 10 years.",
    "formula": "Set up linear equation in terms of present age x",
    "shortcut": "4x + 20 = 2x + 40 => 2x = 20 => x = 10 years.",
    "companies": [
      "TCS NQT",
      "Infosys"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/problems-on-ages/"
  },
  {
    "id": "apt-47",
    "sheetIndex": 47,
    "categoryId": 8,
    "category": "Ages, Calendars & Clocks",
    "categoryIcon": "\ud83d\udcc5",
    "topic": "Problems on Ages",
    "title": "Ratio of Ages Past and Future",
    "difficulty": "Medium",
    "question": "The ratio of the present ages of two persons A and B is 5 : 7. Eighteen years ago, their ages were in the ratio of 8 : 13. Find their present ages.",
    "options": [
      {
        "label": "A",
        "text": "50, 70"
      },
      {
        "label": "B",
        "text": "40, 56"
      },
      {
        "label": "C",
        "text": "45, 63"
      },
      {
        "label": "D",
        "text": "35, 49"
      }
    ],
    "correctOption": "A",
    "explanation": "Let present ages be 5x and 7x.\n18 years ago, their ages were (5x - 18) and (7x - 18).\n(5x - 18) / (7x - 18) = 8 / 13\n13 * (5x - 18) = 8 * (7x - 18)\n65x - 234 = 56x - 144\n9x = 90 => x = 10.\nPresent age of A = 5 * 10 = 50 years.\nPresent age of B = 7 * 10 = 70 years.",
    "formula": "Cross multiplication on linear age ratios",
    "shortcut": "x = 10. Ages are 50 and 70.",
    "companies": [
      "Accenture",
      "Cognizant"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/problems-on-ages/"
  },
  {
    "id": "apt-48",
    "sheetIndex": 48,
    "categoryId": 8,
    "category": "Ages, Calendars & Clocks",
    "categoryIcon": "\ud83d\udcc5",
    "topic": "Calendar",
    "title": "Day of the Week Calculation",
    "difficulty": "Medium",
    "question": "What was the day of the week on 15th August, 1947 (India's Independence Day)?",
    "options": [
      {
        "label": "A",
        "text": "Thursday"
      },
      {
        "label": "B",
        "text": "Friday"
      },
      {
        "label": "C",
        "text": "Saturday"
      },
      {
        "label": "D",
        "text": "Sunday"
      }
    ],
    "correctOption": "B",
    "explanation": "15th August 1947 = 1946 years + Period from 1st Jan 1947 to 15th Aug 1947.\nOdd days in 1600 years = 0.\nOdd days in 300 years = 1.\n46 years = 11 leap years + 35 ordinary years\n= (11 * 2) + 35 = 22 + 35 = 57 odd days = (8 * 7 + 1) = 1 odd day.\nTotal odd days in 1946 years = 0 + 1 + 1 = 2 odd days.\nDays from 1st Jan to 15th Aug 1947:\nJan (31) + Feb (28) + Mar (31) + Apr (30) + May (31) + Jun (30) + Jul (31) + Aug (15)\n= 3 + 0 + 3 + 2 + 3 + 2 + 3 + 1 = 17 odd days = (2 * 7 + 3) = 3 odd days.\nTotal odd days = 2 + 3 = 5 odd days.\n0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Friday, 6=Sat.\nHence, 15th August 1947 was a Friday.",
    "formula": "Odd days counting: 100 yrs = 5, 200 yrs = 3, 300 yrs = 1, 400 yrs = 0. Day code: 5 = Friday.",
    "shortcut": "Historical fact & standard aptitude question: 15 August 1947 was Friday.",
    "companies": [
      "TCS NQT",
      "Wipro",
      "UPSC"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/calendar/"
  },
  {
    "id": "apt-49",
    "sheetIndex": 49,
    "categoryId": 8,
    "category": "Ages, Calendars & Clocks",
    "categoryIcon": "\ud83d\udcc5",
    "topic": "Clock",
    "title": "Angle Between Hands of a Clock",
    "difficulty": "Easy",
    "question": "An accurate clock shows 8 o'clock in the morning. Through how many degrees will the hour hand rotate when the clock shows 2 o'clock in the afternoon?",
    "options": [
      {
        "label": "A",
        "text": "144\u00b0"
      },
      {
        "label": "B",
        "text": "150\u00b0"
      },
      {
        "label": "C",
        "text": "168\u00b0"
      },
      {
        "label": "D",
        "text": "180\u00b0"
      }
    ],
    "correctOption": "D",
    "explanation": "Time from 8 a.m. to 2 p.m. = 6 hours.\nHour hand rotates 360\u00b0 in 12 hours.\nRate of rotation of hour hand = 360\u00b0 / 12 = 30\u00b0 per hour.\nIn 6 hours, rotation = 6 * 30\u00b0 = 180\u00b0.",
    "formula": "Hour hand speed = 0.5\u00b0 per minute = 30\u00b0 per hour",
    "shortcut": "6 hours * 30\u00b0 = 180\u00b0.",
    "companies": [
      "Infosys",
      "Capgemini"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/clock/"
  },
  {
    "id": "apt-50",
    "sheetIndex": 50,
    "categoryId": 8,
    "category": "Ages, Calendars & Clocks",
    "categoryIcon": "\ud83d\udcc5",
    "topic": "Clock",
    "title": "Angle Between Minute and Hour Hand at Specific Time",
    "difficulty": "Medium",
    "question": "What is the angle between the hour hand and the minute hand of a clock at 3:40?",
    "options": [
      {
        "label": "A",
        "text": "120\u00b0"
      },
      {
        "label": "B",
        "text": "125\u00b0"
      },
      {
        "label": "C",
        "text": "130\u00b0"
      },
      {
        "label": "D",
        "text": "140\u00b0"
      }
    ],
    "correctOption": "C",
    "explanation": "Formula for angle between hands at H hours and M minutes:\nAngle = |(30 * H) - (11/2 * M)|\nHere H = 3, M = 40.\nAngle = |(30 * 3) - (11/2 * 40)|\n= |90 - (11 * 20)|\n= |90 - 220| = |-130| = 130\u00b0.\nHence, the angle is 130\u00b0.",
    "formula": "Angle = |30*H - (11/2)*M|",
    "shortcut": "|30 * 3 - 5.5 * 40| = |90 - 220| = 130\u00b0.",
    "companies": [
      "TCS NQT",
      "Amazon"
    ],
    "sourceUrl": "https://www.indiabix.com/aptitude/clock/"
  }
];

export const TOTAL_APTITUDE_PROBLEMS = 50;
