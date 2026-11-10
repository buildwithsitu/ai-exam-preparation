/**
 * ExamMate AI - LeetCode Top SQL 50 Study Plan Master Catalog
 * Resource: https://leetcode.com/studyplan/top-sql-50/
 */

export interface SQLQuestion {
  id: string;
  sheetIndex: number;
  leetcodeId: number;
  sectionId: number;
  sectionTitle: string;
  sectionShortTitle: string;
  sectionIcon: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  schema: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  optimalApproach: string;
  solutions: {
    mysql: string;
    postgresql: string;
  };
  companies: string[];
  practiceUrl: string;
  studyPlanUrl: string;
}

export interface SQLSection {
  id: number;
  title: string;
  icon: string;
  desc: string;
  totalQuestions: number;
}

export const TOP_SQL_50_SECTIONS: SQLSection[] = [
  {
    "id": 1,
    "title": "Select",
    "icon": "\ud83c\udfaf",
    "desc": "Basic retrieval, filtering conditions (WHERE), and handling null values",
    "totalQuestions": 5
  },
  {
    "id": 2,
    "title": "Basic Joins",
    "icon": "\ud83d\udd17",
    "desc": "INNER JOIN, LEFT JOIN, Cross Joins, and Self-Joins",
    "totalQuestions": 9
  },
  {
    "id": 3,
    "title": "Basic Aggregate Functions",
    "icon": "\ud83d\udcca",
    "desc": "COUNT, SUM, AVG, MIN, MAX, and conditional aggregation",
    "totalQuestions": 8
  },
  {
    "id": 4,
    "title": "Sorting and Grouping",
    "icon": "\ud83d\uddc2\ufe0f",
    "desc": "GROUP BY, HAVING, ORDER BY, and distinct counts",
    "totalQuestions": 7
  },
  {
    "id": 5,
    "title": "Advanced Select and Joins",
    "icon": "\u26a1",
    "desc": "CASE WHEN, Window Functions, running totals, and date logic",
    "totalQuestions": 7
  },
  {
    "id": 6,
    "title": "Subqueries",
    "icon": "\ud83d\udd0d",
    "desc": "Correlated subqueries, CTEs, UNION ALL, and DENSE_RANK()",
    "totalQuestions": 7
  },
  {
    "id": 7,
    "title": "Advanced String Functions / Regex / Clause",
    "icon": "\ud83d\udd24",
    "desc": "String manipulation, pattern matching, REGEXP, and string aggregation",
    "totalQuestions": 7
  }
];

export const TOP_SQL_50_QUESTIONS: SQLQuestion[] = [
  {
    "id": "sql-1",
    "sheetIndex": 1,
    "leetcodeId": 1757,
    "sectionId": 1,
    "sectionTitle": "Select",
    "sectionShortTitle": "Select",
    "sectionIcon": "\ud83c\udfaf",
    "title": "Recyclable and Low Fat Products",
    "difficulty": "Easy",
    "description": "Find the ids of products that are both low fat and recyclable. Return the result table in any order.",
    "schema": "Table: Products\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| product_id  | int     |\n| low_fats    | enum    |\n| recyclable  | enum    |\n+-------------+---------+\nproduct_id is the primary key. low_fats is of type ('Y', 'N'). recyclable is of type ('Y', 'N').",
    "examples": [
      {
        "input": "Products table:\n+-------------+----------+------------+\n| product_id  | low_fats | recyclable |\n+-------------+----------+------------+\n| 0           | Y        | N          |\n| 1           | Y        | Y          |\n| 2           | N        | Y          |\n| 3           | Y        | Y          |\n| 4           | N        | N          |\n+-------------+----------+------------+",
        "output": "+-------------+\n| product_id  |\n+-------------+\n| 1           |\n| 3           |\n+-------------+",
        "explanation": "Only product 1 and 3 are both low fat ('Y') and recyclable ('Y')."
      }
    ],
    "optimalApproach": "Use a simple WHERE clause filtering rows where low_fats = 'Y' AND recyclable = 'Y'.",
    "solutions": {
      "mysql": "SELECT product_id\nFROM Products\nWHERE low_fats = 'Y' AND recyclable = 'Y';",
      "postgresql": "SELECT product_id\nFROM Products\nWHERE low_fats = 'Y' AND recyclable = 'Y';"
    },
    "companies": [
      "Amazon",
      "Apple",
      "Facebook"
    ],
    "practiceUrl": "https://leetcode.com/problems/recyclable-and-low-fat-products/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-2",
    "sheetIndex": 2,
    "leetcodeId": 584,
    "sectionId": 1,
    "sectionTitle": "Select",
    "sectionShortTitle": "Select",
    "sectionIcon": "\ud83c\udfaf",
    "title": "Find Customer Referee",
    "difficulty": "Easy",
    "description": "Find the names of the customer that are either referred by someone other than id = 2, or not referred by anyone at all (referee_id is NULL).",
    "schema": "Table: Customer\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| id          | int     |\n| name        | varchar |\n| referee_id  | int     |\n+-------------+---------+\nid is the primary key. Each row indicates customer id, name, and referee id.",
    "examples": [
      {
        "input": "Customer table:\n+----+------+------------+\n| id | name | referee_id |\n+----+------+------------+\n| 1  | Will | null       |\n| 2  | Jane | null       |\n| 3  | Alex | 2          |\n| 4  | Bill | null       |\n| 5  | Zack | 1          |\n| 6  | Mark | 2          |\n+----+------+------------+",
        "output": "+------+\n| name |\n+------+\n| Will |\n| Jane |\n| Bill |\n| Zack |\n+------+",
        "explanation": "Customers 1, 2, 4 have NULL referee_id, customer 5 has referee_id 1 != 2. Customers 3 and 6 were referred by id 2."
      }
    ],
    "optimalApproach": "In SQL, comparing a NULL with `<>` returns UNKNOWN, not TRUE. We must explicitly check `referee_id != 2 OR referee_id IS NULL` (or use `COALESCE(referee_id, 0) <> 2`).",
    "solutions": {
      "mysql": "SELECT name\nFROM Customer\nWHERE referee_id != 2 OR referee_id IS NULL;",
      "postgresql": "SELECT name\nFROM Customer\nWHERE COALESCE(referee_id, 0) != 2;"
    },
    "companies": [
      "Amazon",
      "Google",
      "Bloomberg"
    ],
    "practiceUrl": "https://leetcode.com/problems/find-customer-referee/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-3",
    "sheetIndex": 3,
    "leetcodeId": 595,
    "sectionId": 1,
    "sectionTitle": "Select",
    "sectionShortTitle": "Select",
    "sectionIcon": "\ud83c\udfaf",
    "title": "Big Countries",
    "difficulty": "Easy",
    "description": "A country is big if it has an area of at least three million (3,000,000 km^2), or it has a population of at least twenty-five million (25,000,000). Write a solution to find the name, population, and area of the big countries.",
    "schema": "Table: World\n+-------------+---------+\n| Column Name | Type    |\n+-------------+---------+\n| name        | varchar |\n| continent   | varchar |\n| area        | int     |\n| population  | int     |\n| gdp         | bigint  |\n+-------------+---------+\nname is the primary key.",
    "examples": [
      {
        "input": "World table:\n+-------------+-----------+---------+------------+--------------+\n| name        | continent | area    | population | gdp          |\n+-------------+-----------+---------+------------+--------------+\n| Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |\n| Albania     | Europe    | 28748   | 2831741    | 12960000000  |\n| Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |\n| Andorra     | Europe    | 468     | 78115      | 3712000000   |\n| Angola      | Africa    | 1246700 | 20609294   | 100990000000 |\n+-------------+-----------+---------+------------+--------------+",
        "output": "+-------------+------------+---------+\n| name        | population | area    |\n+-------------+------------+---------+\n| Afghanistan | 25500100   | 652230  |\n| Algeria     | 37100000   | 2381741 |\n+-------------+------------+---------+",
        "explanation": "Afghanistan population >= 25M, Algeria area >= 3M and population >= 25M."
      }
    ],
    "optimalApproach": "Filter with `WHERE area >= 3000000 OR population >= 25000000`. Can also use `UNION` to leverage separate indexes if any.",
    "solutions": {
      "mysql": "SELECT name, population, area\nFROM World\nWHERE area >= 3000000 OR population >= 25000000;",
      "postgresql": "SELECT name, population, area\nFROM World\nWHERE area >= 3000000 OR population >= 25000000;"
    },
    "companies": [
      "Apple",
      "Amazon",
      "Microsoft"
    ],
    "practiceUrl": "https://leetcode.com/problems/big-countries/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-4",
    "sheetIndex": 4,
    "leetcodeId": 1148,
    "sectionId": 1,
    "sectionTitle": "Select",
    "sectionShortTitle": "Select",
    "sectionIcon": "\ud83c\udfaf",
    "title": "Article Views I",
    "difficulty": "Easy",
    "description": "Find all the authors that viewed at least one of their own articles. Return the result table sorted by id in ascending order.",
    "schema": "Table: Views\n+---------------+---------+\n| Column Name   | Type    |\n+---------------+---------+\n| article_id    | int     |\n| author_id     | int     |\n| viewer_id     | int     |\n| view_date     | date    |\n+---------------+---------+\nThere is no primary key; the table may contain duplicate rows.",
    "examples": [
      {
        "input": "Views table:\n+------------+-----------+-----------+------------+\n| article_id | author_id | viewer_id | view_date  |\n+------------+-----------+-----------+------------+\n| 1          | 3         | 5         | 2019-08-01 |\n| 1          | 3         | 6         | 2019-08-02 |\n| 2          | 7         | 7         | 2019-08-01 |\n| 2          | 7         | 6         | 2019-08-02 |\n| 4          | 7         | 1         | 2019-07-22 |\n| 3          | 4         | 4         | 2019-07-21 |\n| 3          | 4         | 4         | 2019-07-21 |\n+------------+-----------+-----------+------------+",
        "output": "+----+\n| id |\n+----+\n| 4  |\n| 7  |\n+----+",
        "explanation": "Authors 4 and 7 viewed their own articles. Result has distinct ids sorted ascending."
      }
    ],
    "optimalApproach": "Filter rows where `author_id = viewer_id`, select `DISTINCT author_id AS id`, and sort by `id ASC`.",
    "solutions": {
      "mysql": "SELECT DISTINCT author_id AS id\nFROM Views\nWHERE author_id = viewer_id\nORDER BY id ASC;",
      "postgresql": "SELECT DISTINCT author_id AS id\nFROM Views\nWHERE author_id = viewer_id\nORDER BY id ASC;"
    },
    "companies": [
      "LinkedIn",
      "Amazon",
      "Yahoo"
    ],
    "practiceUrl": "https://leetcode.com/problems/article-views-i/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-5",
    "sheetIndex": 5,
    "leetcodeId": 1683,
    "sectionId": 1,
    "sectionTitle": "Select",
    "sectionShortTitle": "Select",
    "sectionIcon": "\ud83c\udfaf",
    "title": "Invalid Tweets",
    "difficulty": "Easy",
    "description": "Find the IDs of the invalid tweets. A tweet is invalid if the number of characters used in the content of the tweet is strictly greater than 15.",
    "schema": "Table: Tweets\n+----------------+---------+\n| Column Name    | Type    |\n+----------------+---------+\n| tweet_id       | int     |\n| content        | varchar |\n+----------------+---------+\ntweet_id is the primary key.",
    "examples": [
      {
        "input": "Tweets table:\n+----------+----------------------------------+\n| tweet_id | content                          |\n+----------+----------------------------------+\n| 1        | Vote for BBB                     |\n| 2        | Let us make America great again! |\n+----------+----------------------------------+",
        "output": "+----------+\n| tweet_id |\n+----------+\n| 2        |\n+----------+",
        "explanation": "Tweet 1 length = 12 <= 15 (valid). Tweet 2 length = 32 > 15 (invalid)."
      }
    ],
    "optimalApproach": "Use `LENGTH(content) > 15` (or `CHAR_LENGTH(content) > 15` to properly count Unicode characters).",
    "solutions": {
      "mysql": "SELECT tweet_id\nFROM Tweets\nWHERE CHAR_LENGTH(content) > 15;",
      "postgresql": "SELECT tweet_id\nFROM Tweets\nWHERE LENGTH(content) > 15;"
    },
    "companies": [
      "Twitter",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/invalid-tweets/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-6",
    "sheetIndex": 6,
    "leetcodeId": 1378,
    "sectionId": 2,
    "sectionTitle": "Basic Joins",
    "sectionShortTitle": "Basic Joins",
    "sectionIcon": "\ud83d\udd17",
    "title": "Replace Employee ID With The Unique Identifier",
    "difficulty": "Easy",
    "description": "Show the unique ID of each user, If a user does not have a unique ID replace just show null. Return the result table in any order.",
    "schema": "Table: Employees (id int, name varchar)\nTable: EmployeeUNI (id int, unique_id int)",
    "examples": [
      {
        "input": "Employees: (1, 'Alice'), (7, 'Bob'), (11, 'Meir'), (90, 'Winston'), (3, 'Jonathan')\nEmployeeUNI: (3, 1), (11, 2), (90, 3)",
        "output": "+-----------+----------+\n| unique_id | name     |\n+-----------+----------+\n| null      | Alice    |\n| null      | Bob      |\n| 2         | Meir     |\n| 3         | Winston  |\n| 1         | Jonathan |\n+-----------+----------+",
        "explanation": "Alice and Bob don't have unique_id, so NULL is shown."
      }
    ],
    "optimalApproach": "Perform a `LEFT JOIN` between Employees and EmployeeUNI on id.",
    "solutions": {
      "mysql": "SELECT u.unique_id, e.name\nFROM Employees e\nLEFT JOIN EmployeeUNI u ON e.id = u.id;",
      "postgresql": "SELECT u.unique_id, e.name\nFROM Employees e\nLEFT JOIN EmployeeUNI u ON e.id = u.id;"
    },
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "practiceUrl": "https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-7",
    "sheetIndex": 7,
    "leetcodeId": 1068,
    "sectionId": 2,
    "sectionTitle": "Basic Joins",
    "sectionShortTitle": "Basic Joins",
    "sectionIcon": "\ud83d\udd17",
    "title": "Product Sales Analysis I",
    "difficulty": "Easy",
    "description": "Reports the product_name, year, and price for each sale_id in the Sales table.",
    "schema": "Table: Sales (sale_id int, product_id int, year int, quantity int, price int)\nTable: Product (product_id int, product_name varchar)",
    "examples": [
      {
        "input": "Sales: (1, 100, 2008, 10, 5000), (2, 100, 2009, 12, 5000), (7, 200, 2011, 15, 9000)\nProduct: (100, 'Nokia'), (200, 'Apple'), (300, 'Samsung')",
        "output": "+--------------+-------+-------+\n| product_name | year  | price |\n+--------------+-------+-------+\n| Nokia        | 2008  | 5000  |\n| Nokia        | 2009  | 5000  |\n| Apple        | 2011  | 9000  |\n+--------------+-------+-------+",
        "explanation": "Each sale is matched with its product name."
      }
    ],
    "optimalApproach": "Join Sales and Product using `product_id`.",
    "solutions": {
      "mysql": "SELECT p.product_name, s.year, s.price\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id;",
      "postgresql": "SELECT p.product_name, s.year, s.price\nFROM Sales s\nJOIN Product p ON s.product_id = p.product_id;"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/product-sales-analysis-i/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-8",
    "sheetIndex": 8,
    "leetcodeId": 1581,
    "sectionId": 2,
    "sectionTitle": "Basic Joins",
    "sectionShortTitle": "Basic Joins",
    "sectionIcon": "\ud83d\udd17",
    "title": "Customer Who Visited but Did Not Make Any Transactions",
    "difficulty": "Easy",
    "description": "Find the IDs of the users who visited without making any transactions and the number of times they made these types of visits.",
    "schema": "Table: Visits (visit_id int, customer_id int)\nTable: Transactions (transaction_id int, visit_id int, amount int)",
    "examples": [
      {
        "input": "Visits: (1, 23), (2, 9), (4, 30), (5, 54), (6, 96), (7, 54), (8, 54)\nTransactions: (2, 5, 310), (3, 5, 300), (9, 5, 200), (12, 1, 910), (13, 2, 970)",
        "output": "+-------------+----------------+\n| customer_id | count_no_trans |\n+-------------+----------------+\n| 54          | 2              |\n| 30          | 1              |\n| 96          | 1              |\n+-------------+----------------+",
        "explanation": "Visits 4, 6, 7, 8 had no transactions."
      }
    ],
    "optimalApproach": "Left join Visits with Transactions where `t.transaction_id IS NULL`, then GROUP BY `customer_id` and `COUNT(v.visit_id)`.",
    "solutions": {
      "mysql": "SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans\nFROM Visits v\nLEFT JOIN Transactions t ON v.visit_id = t.visit_id\nWHERE t.transaction_id IS NULL\nGROUP BY v.customer_id;",
      "postgresql": "SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans\nFROM Visits v\nLEFT JOIN Transactions t ON v.visit_id = t.visit_id\nWHERE t.transaction_id IS NULL\nGROUP BY v.customer_id;"
    },
    "companies": [
      "Amazon",
      "Apple"
    ],
    "practiceUrl": "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-9",
    "sheetIndex": 9,
    "leetcodeId": 197,
    "sectionId": 2,
    "sectionTitle": "Basic Joins",
    "sectionShortTitle": "Basic Joins",
    "sectionIcon": "\ud83d\udd17",
    "title": "Rising Temperature",
    "difficulty": "Easy",
    "description": "Find all dates' Id with higher temperatures compared to its previous dates (yesterday).",
    "schema": "Table: Weather (id int, recordDate date, temperature int)\nid is the column with unique values for this table.",
    "examples": [
      {
        "input": "Weather:\n+----+------------+-------------+\n| id | recordDate | temperature |\n+----+------------+-------------+\n| 1  | 2015-01-01 | 10          |\n| 2  | 2015-01-02 | 25          |\n| 3  | 2015-01-03 | 20          |\n| 4  | 2015-01-04 | 30          |\n+----+------------+-------------+",
        "output": "+----+\n| id |\n+----+\n| 2  |\n| 4  |\n+----+",
        "explanation": "2015-01-02 temp 25 > 10. 2015-01-04 temp 30 > 20."
      }
    ],
    "optimalApproach": "Self join Weather w1 with Weather w2 where `w1.recordDate = w2.recordDate + 1 day` and `w1.temperature > w2.temperature`.",
    "solutions": {
      "mysql": "SELECT w1.id\nFROM Weather w1\nJOIN Weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1\nWHERE w1.temperature > w2.temperature;",
      "postgresql": "SELECT w1.id\nFROM Weather w1\nJOIN Weather w2 ON w1.recordDate = w2.recordDate + INTERVAL '1 day'\nWHERE w1.temperature > w2.temperature;"
    },
    "companies": [
      "Amazon",
      "Facebook",
      "Bloomberg"
    ],
    "practiceUrl": "https://leetcode.com/problems/rising-temperature/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-10",
    "sheetIndex": 10,
    "leetcodeId": 1661,
    "sectionId": 2,
    "sectionTitle": "Basic Joins",
    "sectionShortTitle": "Basic Joins",
    "sectionIcon": "\ud83d\udd17",
    "title": "Average Time of Process per Machine",
    "difficulty": "Easy",
    "description": "There is a factory website that has several machines each running the same number of processes. Write a solution to find the average time each machine takes to complete a process rounded to 3 decimal places.",
    "schema": "Table: Activity (machine_id int, process_id int, activity_type enum('start', 'end'), timestamp float)",
    "examples": [
      {
        "input": "Activity:\n(0, 0, 'start', 0.712), (0, 0, 'end', 1.520), (0, 1, 'start', 3.140), (0, 1, 'end', 4.120)\n(1, 0, 'start', 0.550), (1, 0, 'end', 1.550), (1, 1, 'start', 0.430), (1, 1, 'end', 1.420)",
        "output": "+------------+----------------+\n| machine_id | processing_time|\n+------------+----------------+\n| 0          | 0.894          |\n| 1          | 0.995          |\n+------------+----------------+",
        "explanation": "Machine 0 avg: ((1.520 - 0.712) + (4.120 - 3.140)) / 2 = 0.894."
      }
    ],
    "optimalApproach": "Self join start and end activities on `machine_id` and `process_id`, then compute `ROUND(AVG(a2.timestamp - a1.timestamp), 3)` grouped by `machine_id`.",
    "solutions": {
      "mysql": "SELECT a1.machine_id, ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time\nFROM Activity a1\nJOIN Activity a2 \n  ON a1.machine_id = a2.machine_id \n AND a1.process_id = a2.process_id\n AND a1.activity_type = 'start' \n AND a2.activity_type = 'end'\nGROUP BY a1.machine_id;",
      "postgresql": "SELECT a1.machine_id, ROUND(AVG(a2.timestamp - a1.timestamp)::numeric, 3) AS processing_time\nFROM Activity a1\nJOIN Activity a2 \n  ON a1.machine_id = a2.machine_id \n AND a1.process_id = a2.process_id\n AND a1.activity_type = 'start' \n AND a2.activity_type = 'end'\nGROUP BY a1.machine_id;"
    },
    "companies": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/average-time-of-process-per-machine/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-11",
    "sheetIndex": 11,
    "leetcodeId": 577,
    "sectionId": 2,
    "sectionTitle": "Basic Joins",
    "sectionShortTitle": "Basic Joins",
    "sectionIcon": "\ud83d\udd17",
    "title": "Employee Bonus",
    "difficulty": "Easy",
    "description": "Report the name and bonus amount of each employee with a bonus less than 1000 or no bonus at all.",
    "schema": "Table: Employee (empId int, name varchar, supervisor int, salary int)\nTable: Bonus (empId int, bonus int)",
    "examples": [
      {
        "input": "Employee: (3, 'Brad', null, 4000), (1, 'John', 3, 1000), (2, 'Dan', 3, 2000), (4, 'Thomas', 3, 4000)\nBonus: (2, 500), (4, 2000)",
        "output": "+------+-------+\n| name | bonus |\n+------+-------+\n| Brad | null  |\n| John | null  |\n| Dan  | 500   |\n+------+-------+",
        "explanation": "Brad and John have no bonus, Dan has 500 < 1000."
      }
    ],
    "optimalApproach": "LEFT JOIN Employee with Bonus and filter `b.bonus < 1000 OR b.bonus IS NULL`.",
    "solutions": {
      "mysql": "SELECT e.name, b.bonus\nFROM Employee e\nLEFT JOIN Bonus b ON e.empId = b.empId\nWHERE b.bonus < 1000 OR b.bonus IS NULL;",
      "postgresql": "SELECT e.name, b.bonus\nFROM Employee e\nLEFT JOIN Bonus b ON e.empId = b.empId\nWHERE b.bonus < 1000 OR b.bonus IS NULL;"
    },
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "practiceUrl": "https://leetcode.com/problems/employee-bonus/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-12",
    "sheetIndex": 12,
    "leetcodeId": 1280,
    "sectionId": 2,
    "sectionTitle": "Basic Joins",
    "sectionShortTitle": "Basic Joins",
    "sectionIcon": "\ud83d\udd17",
    "title": "Students and Examinations",
    "difficulty": "Easy",
    "description": "Find the number of times each student attended each exam. Return the result table ordered by student_id and subject_name.",
    "schema": "Table: Students (student_id int, student_name varchar)\nTable: Subjects (subject_name varchar)\nTable: Examinations (student_id int, subject_name varchar)",
    "examples": [
      {
        "input": "Students: (1, 'Alice'), (2, 'Bob'), (13, 'John'), (6, 'Alex')\nSubjects: ('Math'), ('Physics'), ('Programming')",
        "output": "+------------+--------------+--------------+----------------+\n| student_id | student_name | subject_name | attended_exams |\n+------------+--------------+--------------+----------------+\n| 1          | Alice        | Math         | 3              |\n| 1          | Alice        | Physics      | 2              |\n| 1          | Alice        | Programming  | 1              |\n| 2          | Bob          | Math         | 1              | ...",
        "explanation": "Cross join all students with all subjects, then left join examinations."
      }
    ],
    "optimalApproach": "Use `CROSS JOIN` between Students and Subjects to generate every possible (student, subject) pair, then `LEFT JOIN` Examinations and `COUNT(e.subject_name)`.",
    "solutions": {
      "mysql": "SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams\nFROM Students s\nCROSS JOIN Subjects sub\nLEFT JOIN Examinations e \n  ON s.student_id = e.student_id AND sub.subject_name = e.subject_name\nGROUP BY s.student_id, s.student_name, sub.subject_name\nORDER BY s.student_id, sub.subject_name;",
      "postgresql": "SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams\nFROM Students s\nCROSS JOIN Subjects sub\nLEFT JOIN Examinations e \n  ON s.student_id = e.student_id AND sub.subject_name = e.subject_name\nGROUP BY s.student_id, s.student_name, sub.subject_name\nORDER BY s.student_id, sub.subject_name;"
    },
    "companies": [
      "Amazon",
      "Adobe"
    ],
    "practiceUrl": "https://leetcode.com/problems/students-and-examinations/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-13",
    "sheetIndex": 13,
    "leetcodeId": 570,
    "sectionId": 2,
    "sectionTitle": "Basic Joins",
    "sectionShortTitle": "Basic Joins",
    "sectionIcon": "\ud83d\udd17",
    "title": "Managers with at Least 5 Direct Reports",
    "difficulty": "Medium",
    "description": "Find the managers with at least five direct reports. Return the result table in any order.",
    "schema": "Table: Employee (id int, name varchar, department varchar, managerId int)",
    "examples": [
      {
        "input": "Employee:\n(101, 'John', 'A', null), (102, 'Dan', 'A', 101), (103, 'James', 'A', 101), (104, 'Amy', 'A', 101), (105, 'Anne', 'A', 101), (106, 'Ron', 'B', 101)",
        "output": "+------+\n| name |\n+------+\n| John |\n+------+",
        "explanation": "John has 5 direct reports (Dan, James, Amy, Anne, Ron)."
      }
    ],
    "optimalApproach": "Join Employee as manager with Employee as reporter on `m.id = e.managerId`, GROUP BY `m.id` and filter with `HAVING COUNT(e.id) >= 5`.",
    "solutions": {
      "mysql": "SELECT m.name\nFROM Employee m\nJOIN Employee e ON m.id = e.managerId\nGROUP BY m.id, m.name\nHAVING COUNT(e.id) >= 5;",
      "postgresql": "SELECT m.name\nFROM Employee m\nJOIN Employee e ON m.id = e.managerId\nGROUP BY m.id, m.name\nHAVING COUNT(e.id) >= 5;"
    },
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google"
    ],
    "practiceUrl": "https://leetcode.com/problems/managers-with-at-least-5-direct-reports/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-14",
    "sheetIndex": 14,
    "leetcodeId": 1934,
    "sectionId": 2,
    "sectionTitle": "Basic Joins",
    "sectionShortTitle": "Basic Joins",
    "sectionIcon": "\ud83d\udd17",
    "title": "Confirmation Rate",
    "difficulty": "Medium",
    "description": "The confirmation rate of a user is the number of 'confirmed' messages divided by the total number of requested confirmation messages. Round to 2 decimal places.",
    "schema": "Table: Signups (user_id int, time_stamp datetime)\nTable: Confirmations (user_id int, time_stamp datetime, action enum('confirmed','timeout'))",
    "examples": [
      {
        "input": "Signups: (3), (7), (2), (6)\nConfirmations: (3, 'confirmed'), (7, 'confirmed'), (7, 'timeout'), (2, 'timeout')",
        "output": "+---------+-------------------+\n| user_id | confirmation_rate |\n+---------+-------------------+\n| 6       | 0.00              |\n| 3       | 1.00              |\n| 7       | 0.50              |\n| 2       | 0.00              |\n+---------+-------------------+",
        "explanation": "User 6 requested 0 messages -> rate 0.00. User 7 had 1 confirmed / 2 total = 0.50."
      }
    ],
    "optimalApproach": "LEFT JOIN Signups with Confirmations. Use `ROUND(AVG(IF(c.action = 'confirmed', 1, 0)), 2)` or `CASE WHEN c.action = 'confirmed' THEN 1 ELSE 0 END`.",
    "solutions": {
      "mysql": "SELECT s.user_id, ROUND(AVG(IF(c.action = 'confirmed', 1, 0)), 2) AS confirmation_rate\nFROM Signups s\nLEFT JOIN Confirmations c ON s.user_id = c.user_id\nGROUP BY s.user_id;",
      "postgresql": "SELECT s.user_id, ROUND(COALESCE(AVG(CASE WHEN c.action = 'confirmed' THEN 1.0 ELSE 0.0 END), 0.0), 2) AS confirmation_rate\nFROM Signups s\nLEFT JOIN Confirmations c ON s.user_id = c.user_id\nGROUP BY s.user_id;"
    },
    "companies": [
      "Amazon",
      "Meta"
    ],
    "practiceUrl": "https://leetcode.com/problems/confirmation-rate/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-15",
    "sheetIndex": 15,
    "leetcodeId": 620,
    "sectionId": 3,
    "sectionTitle": "Basic Aggregate Functions",
    "sectionShortTitle": "Basic Aggregate Functions",
    "sectionIcon": "\ud83d\udcca",
    "title": "Not Boring Movies",
    "difficulty": "Easy",
    "description": "Report the movies with an odd-numbered ID and a description that is not 'boring'. Return the result table ordered by rating in descending order.",
    "schema": "Table: Cinema (id int, movie varchar, description varchar, rating float)",
    "examples": [
      {
        "input": "Cinema:\n(1, 'War', 'great 3D', 8.9), (2, 'Science', 'fiction', 8.5), (3, 'irish', 'boring', 6.2), (4, 'Ice song', 'Fantacy', 8.6), (5, 'House card', 'Interesting', 9.1)",
        "output": "+----+------------+-------------+--------+\n| id | movie      | description | rating |\n+----+------------+-------------+--------+\n| 5  | House card | Interesting | 9.1    |\n| 1  | War        | great 3D    | 8.9    |\n+----+------------+-------------+--------+",
        "explanation": "Id 1 and 5 are odd, and descriptions are not 'boring'."
      }
    ],
    "optimalApproach": "Filter `id % 2 = 1` (or `MOD(id, 2) = 1`) AND `description <> 'boring'`, then ORDER BY `rating DESC`.",
    "solutions": {
      "mysql": "SELECT id, movie, description, rating\nFROM Cinema\nWHERE id % 2 = 1 AND description != 'boring'\nORDER BY rating DESC;",
      "postgresql": "SELECT id, movie, description, rating\nFROM Cinema\nWHERE id % 2 = 1 AND description != 'boring'\nORDER BY rating DESC;"
    },
    "companies": [
      "Amazon",
      "Apple"
    ],
    "practiceUrl": "https://leetcode.com/problems/not-boring-movies/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-16",
    "sheetIndex": 16,
    "leetcodeId": 1251,
    "sectionId": 3,
    "sectionTitle": "Basic Aggregate Functions",
    "sectionShortTitle": "Basic Aggregate Functions",
    "sectionIcon": "\ud83d\udcca",
    "title": "Average Selling Price",
    "difficulty": "Easy",
    "description": "Find the average selling price for each product. average_price should be rounded to 2 decimal places. If a product does not have any sold units, its average selling price is 0.",
    "schema": "Table: Prices (product_id int, start_date date, end_date date, price int)\nTable: UnitsSold (product_id int, purchase_date date, units int)",
    "examples": [
      {
        "input": "Prices: (1, '2019-02-17', '2019-02-28', 5), (1, '2019-03-01', '2019-03-22', 20), (2, '2019-02-01', '2019-02-20', 15)\nUnitsSold: (1, '2019-02-25', 100), (1, '2019-03-01', 15), (2, '2019-02-10', 200)",
        "output": "+------------+---------------+\n| product_id | average_price |\n+------------+---------------+\n| 1          | 6.96          |\n| 2          | 15.00         |\n+------------+---------------+",
        "explanation": "Product 1: (100 * 5 + 15 * 20) / 115 = 6.96."
      }
    ],
    "optimalApproach": "Left join Prices with UnitsSold on `purchase_date BETWEEN start_date AND end_date`, compute `COALESCE(ROUND(SUM(price * units) / SUM(units), 2), 0)`.",
    "solutions": {
      "mysql": "SELECT p.product_id, IFNULL(ROUND(SUM(p.price * u.units) / SUM(u.units), 2), 0) AS average_price\nFROM Prices p\nLEFT JOIN UnitsSold u \n  ON p.product_id = u.product_id \n AND u.purchase_date BETWEEN p.start_date AND p.end_date\nGROUP BY p.product_id;",
      "postgresql": "SELECT p.product_id, COALESCE(ROUND(SUM(p.price * u.units)::numeric / NULLIF(SUM(u.units), 0), 2), 0) AS average_price\nFROM Prices p\nLEFT JOIN UnitsSold u \n  ON p.product_id = u.product_id \n AND u.purchase_date BETWEEN p.start_date AND p.end_date\nGROUP BY p.product_id;"
    },
    "companies": [
      "Amazon",
      "Google"
    ],
    "practiceUrl": "https://leetcode.com/problems/average-selling-price/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-17",
    "sheetIndex": 17,
    "leetcodeId": 1075,
    "sectionId": 3,
    "sectionTitle": "Basic Aggregate Functions",
    "sectionShortTitle": "Basic Aggregate Functions",
    "sectionIcon": "\ud83d\udcca",
    "title": "Project Employees I",
    "difficulty": "Easy",
    "description": "Report the average experience years of all the employees for each project, rounded to 2 digits.",
    "schema": "Table: Project (project_id int, employee_id int)\nTable: Employee (employee_id int, name varchar, experience_years int)",
    "examples": [
      {
        "input": "Project: (1, 1), (1, 2), (1, 3), (2, 1), (2, 4)\nEmployee: (1, 'Khaled', 3), (2, 'Ali', 2), (3, 'John', 1), (4, 'Doe', 2)",
        "output": "+-------------+---------------+\n| project_id  | average_years |\n+-------------+---------------+\n| 1           | 2.00          |\n| 2           | 2.50          |\n+-------------+---------------+",
        "explanation": "Project 1 avg = (3 + 2 + 1) / 3 = 2.00. Project 2 avg = (3 + 2) / 2 = 2.50."
      }
    ],
    "optimalApproach": "JOIN Project and Employee on employee_id, GROUP BY project_id and compute `ROUND(AVG(experience_years), 2)`.",
    "solutions": {
      "mysql": "SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years\nFROM Project p\nJOIN Employee e ON p.employee_id = e.employee_id\nGROUP BY p.project_id;",
      "postgresql": "SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years\nFROM Project p\nJOIN Employee e ON p.employee_id = e.employee_id\nGROUP BY p.project_id;"
    },
    "companies": [
      "Facebook"
    ],
    "practiceUrl": "https://leetcode.com/problems/project-employees-i/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-18",
    "sheetIndex": 18,
    "leetcodeId": 1633,
    "sectionId": 3,
    "sectionTitle": "Basic Aggregate Functions",
    "sectionShortTitle": "Basic Aggregate Functions",
    "sectionIcon": "\ud83d\udcca",
    "title": "Percentage of Users Attended a Contest",
    "difficulty": "Easy",
    "description": "Find the percentage of the users registered in each contest rounded to two decimals. Return the result table ordered by percentage in descending order. In case of a tie, order it by contest_id in ascending order.",
    "schema": "Table: Users (user_id int, user_name varchar)\nTable: Register (contest_id int, user_id int)",
    "examples": [
      {
        "input": "Users: 4 users total (6, 2, 7, 21)\nRegister: (215, 6), (209, 2), (208, 2), (210, 6), (208, 6), (209, 7), (209, 6), (215, 7), (208, 7), (210, 2), (207, 2), (210, 7)",
        "output": "+------------+------------+\n| contest_id | percentage |\n+------------+------------+\n| 208        | 75.00      |\n| 209        | 75.00      |\n| 210        | 75.00      |\n| 215        | 50.00      |\n| 207        | 25.00      |\n+------------+------------+",
        "explanation": "Contests 208, 209, 210 each have 3/4 = 75% users."
      }
    ],
    "optimalApproach": "Group Register by contest_id. Divide `COUNT(DISTINCT user_id) * 100.0` by a subquery `(SELECT COUNT(*) FROM Users)`.",
    "solutions": {
      "mysql": "SELECT contest_id, ROUND(COUNT(DISTINCT user_id) * 100.0 / (SELECT COUNT(*) FROM Users), 2) AS percentage\nFROM Register\nGROUP BY contest_id\nORDER BY percentage DESC, contest_id ASC;",
      "postgresql": "SELECT contest_id, ROUND(COUNT(DISTINCT user_id) * 100.0 / (SELECT COUNT(*) FROM Users), 2) AS percentage\nFROM Register\nGROUP BY contest_id\nORDER BY percentage DESC, contest_id ASC;"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/percentage-of-users-attended-a-contest/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-19",
    "sheetIndex": 19,
    "leetcodeId": 1211,
    "sectionId": 3,
    "sectionTitle": "Basic Aggregate Functions",
    "sectionShortTitle": "Basic Aggregate Functions",
    "sectionIcon": "\ud83d\udcca",
    "title": "Queries Quality and Percentage",
    "difficulty": "Easy",
    "description": "Find each query_name, its quality, and its poor_query_percentage (rating < 3), both rounded to 2 decimal places. Filter out NULL query_name.",
    "schema": "Table: Queries (query_name varchar, result varchar, position int, rating int)",
    "examples": [
      {
        "input": "Queries:\n('Dog', 'Golden Retriever', 1, 5), ('Dog', 'German Shepherd', 2, 5), ('Dog', 'Mule', 200, 1), ('Cat', 'Shirazi', 5, 2), ('Cat', 'Siamese', 3, 3), ('Cat', 'Sphynx', 7, 4)",
        "output": "+------------+---------+-----------------------+\n| query_name | quality | poor_query_percentage |\n+------------+---------+-----------------------+\n| Dog        | 2.50    | 33.33                 |\n| Cat        | 0.66    | 33.33                 |\n+------------+---------+-----------------------+",
        "explanation": "Dog quality: (5/1 + 5/2 + 1/200) / 3 = 2.50. Poor queries (rating < 3) = 1/3 = 33.33%."
      }
    ],
    "optimalApproach": "Group by query_name where `query_name IS NOT NULL`. Quality = `AVG(rating / position)`. Poor query % = `AVG(rating < 3) * 100`.",
    "solutions": {
      "mysql": "SELECT query_name, \n       ROUND(AVG(rating / position), 2) AS quality,\n       ROUND(AVG(IF(rating < 3, 1, 0)) * 100, 2) AS poor_query_percentage\nFROM Queries\nWHERE query_name IS NOT NULL\nGROUP BY query_name;",
      "postgresql": "SELECT query_name, \n       ROUND(AVG(rating::numeric / position), 2) AS quality,\n       ROUND(AVG(CASE WHEN rating < 3 THEN 1.0 ELSE 0.0 END) * 100, 2) AS poor_query_percentage\nFROM Queries\nWHERE query_name IS NOT NULL\nGROUP BY query_name;"
    },
    "companies": [
      "Facebook"
    ],
    "practiceUrl": "https://leetcode.com/problems/queries-quality-and-percentage/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-20",
    "sheetIndex": 20,
    "leetcodeId": 1193,
    "sectionId": 3,
    "sectionTitle": "Basic Aggregate Functions",
    "sectionShortTitle": "Basic Aggregate Functions",
    "sectionIcon": "\ud83d\udcca",
    "title": "Monthly Transactions I",
    "difficulty": "Medium",
    "description": "Find for each month and country, the number of transactions and their total amount, the number of approved transactions and their total amount.",
    "schema": "Table: Transactions (id int, country varchar, state enum('approved', 'declined'), amount int, trans_date date)",
    "examples": [
      {
        "input": "Transactions:\n(121, 'US', 'approved', 1000, '2018-12-18'), (122, 'US', 'declined', 2000, '2018-12-19')\n(123, 'US', 'approved', 2000, '2019-01-01'), (124, 'DE', 'approved', 2000, '2019-01-07')",
        "output": "+----------+---------+-------------+----------------+--------------------+-----------------------+\n| month    | country | trans_count | approved_count | trans_total_amount | approved_total_amount |\n+----------+---------+-------------+----------------+--------------------+-----------------------+\n| 2018-12  | US      | 2           | 1              | 3000               | 1000                  |\n| 2019-01  | US      | 1           | 1              | 2000               | 2000                  |\n| 2019-01  | DE      | 1           | 1              | 2000               | 2000                  |\n+----------+---------+-------------+----------------+--------------------+-----------------------+",
        "explanation": "Aggregated by 'YYYY-MM' and country."
      }
    ],
    "optimalApproach": "Extract month formatted as `DATE_FORMAT(trans_date, '%Y-%m')`. Use conditional aggregation `SUM(IF(state = 'approved', amount, 0))`.",
    "solutions": {
      "mysql": "SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month,\n       country,\n       COUNT(id) AS trans_count,\n       SUM(IF(state = 'approved', 1, 0)) AS approved_count,\n       SUM(amount) AS trans_total_amount,\n       SUM(IF(state = 'approved', amount, 0)) AS approved_total_amount\nFROM Transactions\nGROUP BY month, country;",
      "postgresql": "SELECT TO_CHAR(trans_date, 'YYYY-MM') AS month,\n       country,\n       COUNT(id) AS trans_count,\n       SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,\n       SUM(amount) AS trans_total_amount,\n       SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount\nFROM Transactions\nGROUP BY TO_CHAR(trans_date, 'YYYY-MM'), country;"
    },
    "companies": [
      "Bloomberg",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/monthly-transactions-i/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-21",
    "sheetIndex": 21,
    "leetcodeId": 1174,
    "sectionId": 3,
    "sectionTitle": "Basic Aggregate Functions",
    "sectionShortTitle": "Basic Aggregate Functions",
    "sectionIcon": "\ud83d\udcca",
    "title": "Immediate Food Delivery II",
    "difficulty": "Medium",
    "description": "If the customer's preferred delivery date is the same as the order date, then the order is called immediate. Find the percentage of immediate orders in the first orders of all customers, rounded to 2 decimal places.",
    "schema": "Table: Delivery (delivery_id int, customer_id int, order_date date, customer_pref_delivery_date date)",
    "examples": [
      {
        "input": "Delivery: 6 customers with order dates and preferred delivery dates.",
        "output": "+----------------------+\n| immediate_percentage |\n+----------------------+\n| 50.00                |\n+----------------------+",
        "explanation": "Out of customers' first orders, 50% preferred the order date itself."
      }
    ],
    "optimalApproach": "Filter for first orders using `(customer_id, order_date) IN (SELECT customer_id, MIN(order_date) FROM Delivery GROUP BY customer_id)`. Then calculate immediate percentage.",
    "solutions": {
      "mysql": "SELECT ROUND(AVG(IF(order_date = customer_pref_delivery_date, 1, 0)) * 100, 2) AS immediate_percentage\nFROM Delivery\nWHERE (customer_id, order_date) IN (\n    SELECT customer_id, MIN(order_date)\n    FROM Delivery\n    GROUP BY customer_id\n);",
      "postgresql": "SELECT ROUND(AVG(CASE WHEN order_date = customer_pref_delivery_date THEN 1.0 ELSE 0.0 END) * 100, 2) AS immediate_percentage\nFROM Delivery\nWHERE (customer_id, order_date) IN (\n    SELECT customer_id, MIN(order_date)\n    FROM Delivery\n    GROUP BY customer_id\n);"
    },
    "companies": [
      "DoorDash",
      "Uber"
    ],
    "practiceUrl": "https://leetcode.com/problems/immediate-food-delivery-ii/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-22",
    "sheetIndex": 22,
    "leetcodeId": 550,
    "sectionId": 3,
    "sectionTitle": "Basic Aggregate Functions",
    "sectionShortTitle": "Basic Aggregate Functions",
    "sectionIcon": "\ud83d\udcca",
    "title": "Game Play Analysis IV",
    "difficulty": "Medium",
    "description": "Report the fraction of players that logged in again on the day after the day they first logged in, rounded to 2 decimal places.",
    "schema": "Table: Activity (player_id int, device_id int, event_date date, games_played int)",
    "examples": [
      {
        "input": "Activity:\n(1, 2, '2016-03-01', 5), (1, 2, '2016-03-02', 6)\n(2, 3, '2017-06-25', 1)\n(3, 1, '2016-03-02', 0), (3, 4, '2018-07-03', 5)",
        "output": "+-----------+\n| fraction  |\n+-----------+\n| 0.33      |\n+-----------+",
        "explanation": "Only player 1 logged in on 2016-03-02 (day after first login on 2016-03-01). 1 / 3 = 0.33."
      }
    ],
    "optimalApproach": "Find each player's first login date `MIN(event_date)`. Match with Activity on `event_date = first_login + 1 day`. Divide matching players by total distinct players.",
    "solutions": {
      "mysql": "SELECT ROUND(COUNT(DISTINCT a.player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction\nFROM Activity a\nJOIN (\n    SELECT player_id, MIN(event_date) AS first_date\n    FROM Activity\n    GROUP BY player_id\n) f ON a.player_id = f.player_id AND a.event_date = DATE_ADD(f.first_date, INTERVAL 1 DAY);",
      "postgresql": "SELECT ROUND(COUNT(DISTINCT a.player_id)::numeric / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction\nFROM Activity a\nJOIN (\n    SELECT player_id, MIN(event_date) AS first_date\n    FROM Activity\n    GROUP BY player_id\n) f ON a.player_id = f.player_id AND a.event_date = f.first_date + INTERVAL '1 day';"
    },
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "practiceUrl": "https://leetcode.com/problems/game-play-analysis-iv/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-23",
    "sheetIndex": 23,
    "leetcodeId": 2356,
    "sectionId": 4,
    "sectionTitle": "Sorting and Grouping",
    "sectionShortTitle": "Sorting and Grouping",
    "sectionIcon": "\ud83d\uddc2\ufe0f",
    "title": "Number of Unique Subjects Taught by Each Teacher",
    "difficulty": "Easy",
    "description": "Calculate the number of unique subjects each teacher teaches in the university.",
    "schema": "Table: Teacher (teacher_id int, subject_id int, dept_id int)",
    "examples": [
      {
        "input": "Teacher:\n(1, 2, 3), (1, 2, 4), (1, 3, 3), (2, 1, 1), (2, 2, 1), (2, 3, 1), (2, 4, 1)",
        "output": "+------------+-----+\n| teacher_id | cnt |\n+------------+-----+\n| 1          | 2   |\n| 2          | 4   |\n+------------+-----+",
        "explanation": "Teacher 1 teaches subjects 2, 3 (2 unique). Teacher 2 teaches 1, 2, 3, 4 (4 unique)."
      }
    ],
    "optimalApproach": "Group by `teacher_id` and compute `COUNT(DISTINCT subject_id) AS cnt`.",
    "solutions": {
      "mysql": "SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt\nFROM Teacher\nGROUP BY teacher_id;",
      "postgresql": "SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt\nFROM Teacher\nGROUP BY teacher_id;"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-24",
    "sheetIndex": 24,
    "leetcodeId": 1141,
    "sectionId": 4,
    "sectionTitle": "Sorting and Grouping",
    "sectionShortTitle": "Sorting and Grouping",
    "sectionIcon": "\ud83d\uddc2\ufe0f",
    "title": "User Activity for the Past 30 Days I",
    "difficulty": "Easy",
    "description": "Find the daily active user count for a period of 30 days ending 2019-07-27 inclusively. A user was active on days they made at least one activity.",
    "schema": "Table: Activity (user_id int, session_id int, activity_date date, activity_type enum)",
    "examples": [
      {
        "input": "Activity table spanning dates from 2019-06-20 to 2019-07-27.",
        "output": "+------------+--------------+\n| day        | active_users |\n+------------+--------------+\n| 2019-07-20 | 2            |\n| 2019-07-21 | 2            |\n+------------+--------------+",
        "explanation": "Count distinct active users per date within 30 days ending 2019-07-27."
      }
    ],
    "optimalApproach": "Filter `activity_date BETWEEN '2019-06-28' AND '2019-07-27'`. Group by `activity_date` and count `DISTINCT user_id`.",
    "solutions": {
      "mysql": "SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users\nFROM Activity\nWHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27'\nGROUP BY activity_date;",
      "postgresql": "SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users\nFROM Activity\nWHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27'\nGROUP BY activity_date;"
    },
    "companies": [
      "Facebook",
      "Twitter"
    ],
    "practiceUrl": "https://leetcode.com/problems/user-activity-for-the-past-30-days-i/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-25",
    "sheetIndex": 25,
    "leetcodeId": 1070,
    "sectionId": 4,
    "sectionTitle": "Sorting and Grouping",
    "sectionShortTitle": "Sorting and Grouping",
    "sectionIcon": "\ud83d\uddc2\ufe0f",
    "title": "Product Sales Analysis III",
    "difficulty": "Medium",
    "description": "Select the product id, year, quantity, and price for the first year of every product sold.",
    "schema": "Table: Sales (sale_id int, product_id int, year int, quantity int, price int)",
    "examples": [
      {
        "input": "Sales: (1, 100, 2008, 10, 5000), (2, 100, 2009, 12, 5000), (7, 200, 2011, 15, 9000)",
        "output": "+------------+------------+----------+-------+\n| product_id | first_year | quantity | price |\n+------------+------------+----------+-------+\n| 100        | 2008       | 10       | 5000  |\n| 200        | 2011       | 15       | 9000  |\n+------------+------------+----------+-------+",
        "explanation": "First year of product 100 is 2008, for 200 is 2011."
      }
    ],
    "optimalApproach": "Filter rows with `(product_id, year) IN (SELECT product_id, MIN(year) FROM Sales GROUP BY product_id)`.",
    "solutions": {
      "mysql": "SELECT product_id, year AS first_year, quantity, price\nFROM Sales\nWHERE (product_id, year) IN (\n    SELECT product_id, MIN(year)\n    FROM Sales\n    GROUP BY product_id\n);",
      "postgresql": "SELECT product_id, year AS first_year, quantity, price\nFROM Sales\nWHERE (product_id, year) IN (\n    SELECT product_id, MIN(year)\n    FROM Sales\n    GROUP BY product_id\n);"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/product-sales-analysis-iii/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-26",
    "sheetIndex": 26,
    "leetcodeId": 596,
    "sectionId": 4,
    "sectionTitle": "Sorting and Grouping",
    "sectionShortTitle": "Sorting and Grouping",
    "sectionIcon": "\ud83d\uddc2\ufe0f",
    "title": "Classes More Than 5 Students",
    "difficulty": "Easy",
    "description": "Find all the classes that have at least five students. Return the result table in any order.",
    "schema": "Table: Courses (student varchar, class varchar)\n(student, class) is the primary key.",
    "examples": [
      {
        "input": "Courses:\n('A', 'Math'), ('B', 'English'), ('C', 'Math'), ('D', 'Biology'), ('E', 'Math'), ('F', 'Computer'), ('G', 'Math'), ('H', 'Math'), ('I', 'Math')",
        "output": "+-------+\n| class |\n+-------+\n| Math  |\n+-------+",
        "explanation": "Math has 6 students >= 5."
      }
    ],
    "optimalApproach": "Group by class and use `HAVING COUNT(student) >= 5`.",
    "solutions": {
      "mysql": "SELECT class\nFROM Courses\nGROUP BY class\nHAVING COUNT(student) >= 5;",
      "postgresql": "SELECT class\nFROM Courses\nGROUP BY class\nHAVING COUNT(student) >= 5;"
    },
    "companies": [
      "Google"
    ],
    "practiceUrl": "https://leetcode.com/problems/classes-more-than-5-students/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-27",
    "sheetIndex": 27,
    "leetcodeId": 1729,
    "sectionId": 4,
    "sectionTitle": "Sorting and Grouping",
    "sectionShortTitle": "Sorting and Grouping",
    "sectionIcon": "\ud83d\uddc2\ufe0f",
    "title": "Find Followers Count",
    "difficulty": "Easy",
    "description": "Return the number of followers for each user. Return the result table ordered by user_id in ascending order.",
    "schema": "Table: Followers (user_id int, follower_id int)",
    "examples": [
      {
        "input": "Followers:\n(0, 1), (1, 0), (2, 0), (2, 1)",
        "output": "+---------+----------------+\n| user_id | followers_count|\n+---------+----------------+\n| 0       | 1              |\n| 1       | 1              |\n| 2       | 2              |\n+---------+----------------+",
        "explanation": "User 0 has 1 follower, User 2 has 2 followers."
      }
    ],
    "optimalApproach": "Group by `user_id`, select `COUNT(follower_id) AS followers_count` and ORDER BY `user_id ASC`.",
    "solutions": {
      "mysql": "SELECT user_id, COUNT(follower_id) AS followers_count\nFROM Followers\nGROUP BY user_id\nORDER BY user_id ASC;",
      "postgresql": "SELECT user_id, COUNT(follower_id) AS followers_count\nFROM Followers\nGROUP BY user_id\nORDER BY user_id ASC;"
    },
    "companies": [
      "Tesla"
    ],
    "practiceUrl": "https://leetcode.com/problems/find-followers-count/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-28",
    "sheetIndex": 28,
    "leetcodeId": 619,
    "sectionId": 4,
    "sectionTitle": "Sorting and Grouping",
    "sectionShortTitle": "Sorting and Grouping",
    "sectionIcon": "\ud83d\uddc2\ufe0f",
    "title": "Biggest Single Number",
    "difficulty": "Easy",
    "description": "Find the largest single number. If there is no single number, return null.",
    "schema": "Table: MyNumbers (num int)",
    "examples": [
      {
        "input": "MyNumbers: [8, 8, 3, 3, 1, 4, 5, 6]",
        "output": "+-----+\n| num |\n+-----+\n| 6   |\n+-----+",
        "explanation": "The single numbers are 1, 4, 5, 6. The largest is 6."
      }
    ],
    "optimalApproach": "Use a subquery to find all numbers having `COUNT(num) = 1`, then take `MAX(num)`.",
    "solutions": {
      "mysql": "SELECT MAX(num) AS num\nFROM (\n    SELECT num\n    FROM MyNumbers\n    GROUP BY num\n    HAVING COUNT(num) = 1\n) AS unique_nums;",
      "postgresql": "SELECT MAX(num) AS num\nFROM (\n    SELECT num\n    FROM MyNumbers\n    GROUP BY num\n    HAVING COUNT(num) = 1\n) AS unique_nums;"
    },
    "companies": [
      "Apple",
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/biggest-single-number/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-29",
    "sheetIndex": 29,
    "leetcodeId": 1045,
    "sectionId": 4,
    "sectionTitle": "Sorting and Grouping",
    "sectionShortTitle": "Sorting and Grouping",
    "sectionIcon": "\ud83d\uddc2\ufe0f",
    "title": "Customers Who Bought All Products",
    "difficulty": "Medium",
    "description": "Report the customer_ids from the Customer table that bought all the products in the Product table.",
    "schema": "Table: Customer (customer_id int, product_key int)\nTable: Product (product_key int)",
    "examples": [
      {
        "input": "Customer: (1, 5), (2, 6), (3, 5), (3, 6), (1, 6)\nProduct: (5), (6)",
        "output": "+-------------+\n| customer_id |\n+-------------+\n| 1           |\n| 3           |\n+-------------+",
        "explanation": "Customers 1 and 3 bought both products 5 and 6."
      }
    ],
    "optimalApproach": "Group by customer_id and filter `COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product)`.",
    "solutions": {
      "mysql": "SELECT customer_id\nFROM Customer\nGROUP BY customer_id\nHAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);",
      "postgresql": "SELECT customer_id\nFROM Customer\nGROUP BY customer_id\nHAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/customers-who-bought-all-products/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-30",
    "sheetIndex": 30,
    "leetcodeId": 1731,
    "sectionId": 5,
    "sectionTitle": "Advanced Select and Joins",
    "sectionShortTitle": "Advanced Select and Joins",
    "sectionIcon": "\u26a1",
    "title": "The Number of Employees Which Report to Each Employee",
    "difficulty": "Easy",
    "description": "For this problem, we will consider a manager an employee who has at least 1 other employee reporting to them. Report the manager id, name, reports_count, and average_age rounded to the nearest integer.",
    "schema": "Table: Employees (employee_id int, name varchar, reports_to int, age int)",
    "examples": [
      {
        "input": "Employees with managers and their report ages.",
        "output": "+-------------+------+---------------+-------------+\n| employee_id | name | reports_count | average_age |\n+-------------+------+---------------+-------------+\n| 9           | Herc | 2             | 39          |\n+-------------+------+---------------+-------------+",
        "explanation": "Employee 9 has 2 direct reports with rounded average age 39."
      }
    ],
    "optimalApproach": "Join Employees as manager m with Employees as reporter e on `m.employee_id = e.reports_to`. Group by `m.employee_id, m.name`.",
    "solutions": {
      "mysql": "SELECT m.employee_id,\n       m.name,\n       COUNT(e.employee_id) AS reports_count,\n       ROUND(AVG(e.age)) AS average_age\nFROM Employees m\nJOIN Employees e ON m.employee_id = e.reports_to\nGROUP BY m.employee_id, m.name\nORDER BY m.employee_id;",
      "postgresql": "SELECT m.employee_id,\n       m.name,\n       COUNT(e.employee_id) AS reports_count,\n       ROUND(AVG(e.age)) AS average_age\nFROM Employees m\nJOIN Employees e ON m.employee_id = e.reports_to\nGROUP BY m.employee_id, m.name\nORDER BY m.employee_id;"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-31",
    "sheetIndex": 31,
    "leetcodeId": 1789,
    "sectionId": 5,
    "sectionTitle": "Advanced Select and Joins",
    "sectionShortTitle": "Advanced Select and Joins",
    "sectionIcon": "\u26a1",
    "title": "Primary Department for Each Employee",
    "difficulty": "Easy",
    "description": "Employees can belong to multiple departments. When an employee joins other departments, they need to decide which department is their primary department ('Y'). If an employee belongs to only one department, report that department.",
    "schema": "Table: Employee (employee_id int, department_id int, primary_flag enum('Y','N'))",
    "examples": [
      {
        "input": "Employee records with primary_flag 'Y' or single department membership.",
        "output": "+-------------+---------------+\n| employee_id | department_id |\n+-------------+---------------+\n| 1           | 1             |\n| 2           | 1             |\n| 3           | 3             |\n| 4           | 3             |\n+-------------+---------------+",
        "explanation": "Flag 'Y' selected or sole department selected."
      }
    ],
    "optimalApproach": "Filter rows where `primary_flag = 'Y'` OR where `employee_id IN (SELECT employee_id FROM Employee GROUP BY employee_id HAVING COUNT(*) = 1)`.",
    "solutions": {
      "mysql": "SELECT employee_id, department_id\nFROM Employee\nWHERE primary_flag = 'Y'\n   OR employee_id IN (\n       SELECT employee_id\n       FROM Employee\n       GROUP BY employee_id\n       HAVING COUNT(department_id) = 1\n   );",
      "postgresql": "SELECT employee_id, department_id\nFROM Employee\nWHERE primary_flag = 'Y'\n   OR employee_id IN (\n       SELECT employee_id\n       FROM Employee\n       GROUP BY employee_id\n       HAVING COUNT(department_id) = 1\n   );"
    },
    "companies": [
      "Facebook"
    ],
    "practiceUrl": "https://leetcode.com/problems/primary-department-for-each-employee/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-32",
    "sheetIndex": 32,
    "leetcodeId": 610,
    "sectionId": 5,
    "sectionTitle": "Advanced Select and Joins",
    "sectionShortTitle": "Advanced Select and Joins",
    "sectionIcon": "\u26a1",
    "title": "Triangle Judgement",
    "difficulty": "Easy",
    "description": "Report for every three line segments whether they can form a triangle ('Yes' or 'No').",
    "schema": "Table: Triangle (x int, y int, z int)",
    "examples": [
      {
        "input": "Triangle:\n(13, 15, 30), (10, 20, 15)",
        "output": "+----+----+----+----------+\n| x  | y  | z  | triangle |\n+----+----+----+----------+\n| 13 | 15 | 30 | No       |\n| 10 | 20 | 15 | Yes      |\n+----+----+----+----------+",
        "explanation": "Triangle inequality: sum of any two sides must be strictly greater than the third side."
      }
    ],
    "optimalApproach": "Use CASE statement: `CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END`.",
    "solutions": {
      "mysql": "SELECT x, y, z, \n       CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle\nFROM Triangle;",
      "postgresql": "SELECT x, y, z, \n       CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle\nFROM Triangle;"
    },
    "companies": [
      "Apple"
    ],
    "practiceUrl": "https://leetcode.com/problems/triangle-judgement/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-33",
    "sheetIndex": 33,
    "leetcodeId": 180,
    "sectionId": 5,
    "sectionTitle": "Advanced Select and Joins",
    "sectionShortTitle": "Advanced Select and Joins",
    "sectionIcon": "\u26a1",
    "title": "Consecutive Numbers",
    "difficulty": "Medium",
    "description": "Find all numbers that appear at least three times consecutively.",
    "schema": "Table: Logs (id int, num int)\nid is an autoincrement column.",
    "examples": [
      {
        "input": "Logs: (1, 1), (2, 1), (3, 1), (4, 2), (5, 1), (6, 2), (7, 2)",
        "output": "+-----------------+\n| ConsecutiveNums |\n+-----------------+\n| 1               |\n+-----------------+",
        "explanation": "1 is the only number that appears at least three times consecutively."
      }
    ],
    "optimalApproach": "Join Logs l1, l2, l3 on `l2.id = l1.id + 1` and `l3.id = l1.id + 2` where `l1.num = l2.num AND l2.num = l3.num` (or use window functions `LEAD`/`LAG`).",
    "solutions": {
      "mysql": "SELECT DISTINCT l1.num AS ConsecutiveNums\nFROM Logs l1\nJOIN Logs l2 ON l1.id + 1 = l2.id\nJOIN Logs l3 ON l1.id + 2 = l3.id\nWHERE l1.num = l2.num AND l2.num = l3.num;",
      "postgresql": "SELECT DISTINCT l1.num AS ConsecutiveNums\nFROM Logs l1\nJOIN Logs l2 ON l1.id + 1 = l2.id\nJOIN Logs l3 ON l1.id + 2 = l3.id\nWHERE l1.num = l2.num AND l2.num = l3.num;"
    },
    "companies": [
      "Amazon",
      "Adobe"
    ],
    "practiceUrl": "https://leetcode.com/problems/consecutive-numbers/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-34",
    "sheetIndex": 34,
    "leetcodeId": 1164,
    "sectionId": 5,
    "sectionTitle": "Advanced Select and Joins",
    "sectionShortTitle": "Advanced Select and Joins",
    "sectionIcon": "\u26a1",
    "title": "Product Price at a Given Date",
    "difficulty": "Medium",
    "description": "Find the prices of all products on 2019-08-16. Assume the price of all products before any change is 10.",
    "schema": "Table: Products (product_id int, new_price int, change_date date)",
    "examples": [
      {
        "input": "Products prices modified on dates before and after 2019-08-16.",
        "output": "+------------+-------+\n| product_id | price |\n+------------+-------+\n| 1          | 35    |\n| 2          | 50    |\n| 3          | 10    |\n+------------+-------+",
        "explanation": "Product 3 had no price change before 2019-08-16, so price remains default 10."
      }
    ],
    "optimalApproach": "Find last change_date <= '2019-08-16' for products that changed. For products without changes before this date, default price is 10 via UNION.",
    "solutions": {
      "mysql": "SELECT product_id, new_price AS price\nFROM Products\nWHERE (product_id, change_date) IN (\n    SELECT product_id, MAX(change_date)\n    FROM Products\n    WHERE change_date <= '2019-08-16'\n    GROUP BY product_id\n)\nUNION\nSELECT product_id, 10 AS price\nFROM Products\nGROUP BY product_id\nHAVING MIN(change_date) > '2019-08-16';",
      "postgresql": "SELECT product_id, new_price AS price\nFROM Products\nWHERE (product_id, change_date) IN (\n    SELECT product_id, MAX(change_date)\n    FROM Products\n    WHERE change_date <= '2019-08-16'\n    GROUP BY product_id\n)\nUNION\nSELECT product_id, 10 AS price\nFROM Products\nGROUP BY product_id\nHAVING MIN(change_date) > '2019-08-16';"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/product-price-at-a-given-date/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-35",
    "sheetIndex": 35,
    "leetcodeId": 1204,
    "sectionId": 5,
    "sectionTitle": "Advanced Select and Joins",
    "sectionShortTitle": "Advanced Select and Joins",
    "sectionIcon": "\u26a1",
    "title": "Last Person to Fit in the Bus",
    "difficulty": "Medium",
    "description": "There is a queue of people waiting to board a bus with a weight limit of 1000 kilograms. Find the person_name of the last person that can fit on the bus without exceeding the weight limit.",
    "schema": "Table: Queue (person_id int, person_name varchar, weight int, turn int)",
    "examples": [
      {
        "input": "Queue ordered by turn: 1: Alice (250), 2: Bob (350), 3: Alex (400), 4: John (200)...",
        "output": "+-------------+\n| person_name |\n+-------------+\n| Alex        |\n+-------------+",
        "explanation": "Alice (250) + Bob (350) + Alex (400) = 1000 kg. John would exceed 1000 kg."
      }
    ],
    "optimalApproach": "Calculate running cumulative weight using window function `SUM(weight) OVER (ORDER BY turn)`. Filter cumulative weight <= 1000, ORDER BY turn DESC LIMIT 1.",
    "solutions": {
      "mysql": "SELECT person_name\nFROM (\n    SELECT person_name, SUM(weight) OVER (ORDER BY turn) AS cum_weight\n    FROM Queue\n) t\nWHERE cum_weight <= 1000\nORDER BY cum_weight DESC\nLIMIT 1;",
      "postgresql": "SELECT person_name\nFROM (\n    SELECT person_name, SUM(weight) OVER (ORDER BY turn) AS cum_weight\n    FROM Queue\n) t\nWHERE cum_weight <= 1000\nORDER BY cum_weight DESC\nLIMIT 1;"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/last-person-to-fit-in-the-bus/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-36",
    "sheetIndex": 36,
    "leetcodeId": 1907,
    "sectionId": 5,
    "sectionTitle": "Advanced Select and Joins",
    "sectionShortTitle": "Advanced Select and Joins",
    "sectionIcon": "\u26a1",
    "title": "Count Salary Categories",
    "difficulty": "Medium",
    "description": "Calculate the number of bank accounts for each salary category: 'Low Salary' (< 20000), 'Average Salary' (20000 to 50000), and 'High Salary' (> 50000). All categories must be listed even if 0.",
    "schema": "Table: Accounts (account_id int, income int)",
    "examples": [
      {
        "input": "Accounts: (3, 108939), (2, 12747), (8, 87709), (6, 91796)",
        "output": "+----------------+----------------+\n| category       | accounts_count |\n+----------------+----------------+\n| Low Salary     | 1              |\n| Average Salary | 0              |\n| High Salary    | 3              |\n+----------------+----------------+",
        "explanation": "1 low, 0 average, 3 high."
      }
    ],
    "optimalApproach": "Use three separate queries unified with UNION to ensure categories with 0 accounts are explicitly included.",
    "solutions": {
      "mysql": "SELECT 'Low Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income < 20000\nUNION\nSELECT 'Average Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income BETWEEN 20000 AND 50000\nUNION\nSELECT 'High Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income > 50000;",
      "postgresql": "SELECT 'Low Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income < 20000\nUNION\nSELECT 'Average Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income BETWEEN 20000 AND 50000\nUNION\nSELECT 'High Salary' AS category, COUNT(*) AS accounts_count FROM Accounts WHERE income > 50000;"
    },
    "companies": [
      "Bloomberg"
    ],
    "practiceUrl": "https://leetcode.com/problems/count-salary-categories/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-37",
    "sheetIndex": 37,
    "leetcodeId": 1978,
    "sectionId": 6,
    "sectionTitle": "Subqueries",
    "sectionShortTitle": "Subqueries",
    "sectionIcon": "\ud83d\udd0d",
    "title": "Employees Whose Manager Left the Company",
    "difficulty": "Easy",
    "description": "Find the IDs of the employees whose salary is strictly less than $30000 and whose manager left the company (managerId is not in Employees table).",
    "schema": "Table: Employees (employee_id int, name varchar, manager_id int, salary int)",
    "examples": [
      {
        "input": "Employees table with some manager_ids no longer existing in table.",
        "output": "+-------------+\n| employee_id |\n+-------------+\n| 11          |\n+-------------+",
        "explanation": "Employee 11 salary is $12480 < 30000 and manager 6 does not exist in table."
      }
    ],
    "optimalApproach": "Filter `salary < 30000 AND manager_id IS NOT NULL AND manager_id NOT IN (SELECT employee_id FROM Employees) ORDER BY employee_id`.",
    "solutions": {
      "mysql": "SELECT employee_id\nFROM Employees\nWHERE salary < 30000 \n  AND manager_id IS NOT NULL\n  AND manager_id NOT IN (SELECT employee_id FROM Employees)\nORDER BY employee_id;",
      "postgresql": "SELECT employee_id\nFROM Employees\nWHERE salary < 30000 \n  AND manager_id IS NOT NULL\n  AND manager_id NOT IN (SELECT employee_id FROM Employees)\nORDER BY employee_id;"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/employees-whose-manager-left-the-company/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-38",
    "sheetIndex": 38,
    "leetcodeId": 626,
    "sectionId": 6,
    "sectionTitle": "Subqueries",
    "sectionShortTitle": "Subqueries",
    "sectionIcon": "\ud83d\udd0d",
    "title": "Exchange Seats",
    "difficulty": "Medium",
    "description": "Swap the seat id of every two consecutive students. If the number of students is odd, the id of the last student is not swapped.",
    "schema": "Table: Seat (id int, student varchar)\nid is continuous from 1 to N.",
    "examples": [
      {
        "input": "Seat: (1, 'Abbot'), (2, 'Doris'), (3, 'Emerson'), (4, 'Green'), (5, 'Jeames')",
        "output": "+----+---------+\n| id | student |\n+----+---------+\n| 1  | Doris   |\n| 2  | Abbot   |\n| 3  | Green   |\n| 4  | Emerson |\n| 5  | Jeames  |\n+----+---------+",
        "explanation": "1 and 2 swap, 3 and 4 swap, 5 remains."
      }
    ],
    "optimalApproach": "Use CASE statement on id: if id is odd and id is last, stay id; if id is odd, id + 1; if id is even, id - 1.",
    "solutions": {
      "mysql": "SELECT CASE \n         WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id\n         WHEN id % 2 = 1 THEN id + 1\n         ELSE id - 1\n       END AS id,\n       student\nFROM Seat\nORDER BY id;",
      "postgresql": "SELECT CASE \n         WHEN id % 2 = 1 AND id = (SELECT COUNT(*) FROM Seat) THEN id\n         WHEN id % 2 = 1 THEN id + 1\n         ELSE id - 1\n       END AS id,\n       student\nFROM Seat\nORDER BY id;"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/exchange-seats/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-39",
    "sheetIndex": 39,
    "leetcodeId": 1341,
    "sectionId": 6,
    "sectionTitle": "Subqueries",
    "sectionShortTitle": "Subqueries",
    "sectionIcon": "\ud83d\udd0d",
    "title": "Movie Rating",
    "difficulty": "Medium",
    "description": "Find the name of the user who has rated the greatest number of movies (lexicographically smallest on tie), and the movie name with the highest average rating in February 2020.",
    "schema": "Table: Movies (movie_id int, title varchar)\nTable: Users (user_id int, name varchar)\nTable: MovieRating (movie_id int, user_id int, rating int, created_at date)",
    "examples": [
      {
        "input": "Ratings submitted across multiple months by users.",
        "output": "+--------------+\n| results      |\n+--------------+\n| Daniel       |\n| Frozen 2     |\n+--------------+",
        "explanation": "Daniel rated the most movies. Frozen 2 had the highest average rating in Feb 2020."
      }
    ],
    "optimalApproach": "Combine two independent subqueries with `UNION ALL`, each using `ORDER BY ... LIMIT 1`.",
    "solutions": {
      "mysql": "(SELECT u.name AS results\n FROM MovieRating mr\n JOIN Users u ON mr.user_id = u.user_id\n GROUP BY mr.user_id, u.name\n ORDER BY COUNT(*) DESC, u.name ASC\n LIMIT 1)\nUNION ALL\n(SELECT m.title AS results\n FROM MovieRating mr\n JOIN Movies m ON mr.movie_id = m.movie_id\n WHERE mr.created_at BETWEEN '2020-02-01' AND '2020-02-29'\n GROUP BY mr.movie_id, m.title\n ORDER BY AVG(mr.rating) DESC, m.title ASC\n LIMIT 1);",
      "postgresql": "(SELECT u.name AS results\n FROM MovieRating mr\n JOIN Users u ON mr.user_id = u.user_id\n GROUP BY mr.user_id, u.name\n ORDER BY COUNT(*) DESC, u.name ASC\n LIMIT 1)\nUNION ALL\n(SELECT m.title AS results\n FROM MovieRating mr\n JOIN Movies m ON mr.movie_id = m.movie_id\n WHERE mr.created_at BETWEEN '2020-02-01' AND '2020-02-29'\n GROUP BY mr.movie_id, m.title\n ORDER BY AVG(mr.rating) DESC, m.title ASC\n LIMIT 1);"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/movie-rating/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-40",
    "sheetIndex": 40,
    "leetcodeId": 1321,
    "sectionId": 6,
    "sectionTitle": "Subqueries",
    "sectionShortTitle": "Subqueries",
    "sectionIcon": "\ud83d\udd0d",
    "title": "Restaurant Growth",
    "difficulty": "Medium",
    "description": "Compute the moving average of how much the customer paid in a seven days window (current day + 6 days before). Round average_amount to 2 decimal places.",
    "schema": "Table: Customer (customer_id int, name varchar, visited_on date, amount int)",
    "examples": [
      {
        "input": "Customer visits recorded daily.",
        "output": "+------------+--------------+----------------+\n| visited_on | amount       | average_amount |\n+------------+--------------+----------------+\n| 2019-01-07 | 860          | 122.86         |\n| 2019-01-08 | 840          | 120.00         |\n+------------+--------------+----------------+",
        "explanation": "7-day moving sum and average."
      }
    ],
    "optimalApproach": "Group daily amounts in a CTE or subquery, then self-join or use window function `SUM(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` filtering `visited_on >= MIN(visited_on) + 6 days`.",
    "solutions": {
      "mysql": "WITH DailyTotals AS (\n    SELECT visited_on, SUM(amount) AS daily_amount\n    FROM Customer\n    GROUP BY visited_on\n)\nSELECT visited_on,\n       SUM(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,\n       ROUND(AVG(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount\nFROM DailyTotals\nLIMIT 999999 OFFSET 6;",
      "postgresql": "WITH DailyTotals AS (\n    SELECT visited_on, SUM(amount) AS daily_amount\n    FROM Customer\n    GROUP BY visited_on\n)\nSELECT visited_on,\n       SUM(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,\n       ROUND(AVG(daily_amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount\nFROM DailyTotals\nOFFSET 6;"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/restaurant-growth/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-41",
    "sheetIndex": 41,
    "leetcodeId": 602,
    "sectionId": 6,
    "sectionTitle": "Subqueries",
    "sectionShortTitle": "Subqueries",
    "sectionIcon": "\ud83d\udd0d",
    "title": "Friend Requests II: Who Has the Most Friends",
    "difficulty": "Medium",
    "description": "Find the people who have the most friends and the most friends number.",
    "schema": "Table: RequestAccepted (requester_id int, accepter_id int, accept_date date)",
    "examples": [
      {
        "input": "RequestAccepted: (1, 2), (1, 3), (2, 3), (3, 4)",
        "output": "+----+-----+\n| id | num |\n+----+-----+\n| 3  | 3   |\n+----+-----+",
        "explanation": "User 3 is friend with 1, 2, and 4 (3 friends total)."
      }
    ],
    "optimalApproach": "Union all requester_id and accepter_id together, group by id, count occurrences, and take the top 1.",
    "solutions": {
      "mysql": "SELECT id, COUNT(*) AS num\nFROM (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n) all_friends\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
      "postgresql": "SELECT id, COUNT(*) AS num\nFROM (\n    SELECT requester_id AS id FROM RequestAccepted\n    UNION ALL\n    SELECT accepter_id AS id FROM RequestAccepted\n) all_friends\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;"
    },
    "companies": [
      "Facebook"
    ],
    "practiceUrl": "https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-42",
    "sheetIndex": 42,
    "leetcodeId": 585,
    "sectionId": 6,
    "sectionTitle": "Subqueries",
    "sectionShortTitle": "Subqueries",
    "sectionIcon": "\ud83d\udd0d",
    "title": "Investments in 2016",
    "difficulty": "Medium",
    "description": "Report the sum of all total investment values in 2016 tiv_2016, for all policyholders who have the same tiv_2015 value as one or more other policyholders, and are not located in the same city as any other policyholder (lat, lon unique). Round to 2 decimal places.",
    "schema": "Table: Insurance (pid int, tiv_2015 float, tiv_2016 float, lat float, lon float)",
    "examples": [
      {
        "input": "Insurance policies with location coordinates and investment values.",
        "output": "+----------+\n| tiv_2016 |\n+----------+\n| 45.00    |\n+----------+",
        "explanation": "Policyholders satisfying both criteria summed."
      }
    ],
    "optimalApproach": "Filter `tiv_2015 IN (SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1)` AND `(lat, lon) IN (SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1)`.",
    "solutions": {
      "mysql": "SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016\nFROM Insurance\nWHERE tiv_2015 IN (\n    SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1\n) AND (lat, lon) IN (\n    SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1\n);",
      "postgresql": "SELECT ROUND(SUM(tiv_2016)::numeric, 2) AS tiv_2016\nFROM Insurance\nWHERE tiv_2015 IN (\n    SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1\n) AND (lat, lon) IN (\n    SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1\n);"
    },
    "companies": [
      "Twitter"
    ],
    "practiceUrl": "https://leetcode.com/problems/investments-in-2016/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-43",
    "sheetIndex": 43,
    "leetcodeId": 185,
    "sectionId": 6,
    "sectionTitle": "Subqueries",
    "sectionShortTitle": "Subqueries",
    "sectionIcon": "\ud83d\udd0d",
    "title": "Department Top Three Salaries",
    "difficulty": "Hard",
    "description": "A company's executives are interested in seeing who earns the most money in each of the company's departments. A high earner in a department is an employee who has a salary in the top three unique salaries for that department.",
    "schema": "Table: Employee (id int, name varchar, salary int, departmentId int)\nTable: Department (id int, name varchar)",
    "examples": [
      {
        "input": "Employees across IT and Sales departments.",
        "output": "+------------+----------+--------+\n| Department | Employee | Salary |\n+------------+----------+--------+\n| IT         | Max      | 90000  |\n| IT         | Joe      | 85000  |\n| IT         | Randy    | 85000  |\n| IT         | Will     | 70000  |\n| Sales      | Henry    | 80000  |\n| Sales      | Sam      | 60000  |\n+------------+----------+--------+",
        "explanation": "Top 3 distinct salaries in IT are 90000, 85000, 70000."
      }
    ],
    "optimalApproach": "Use `DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)` as ranking, and select rows with `ranking <= 3`.",
    "solutions": {
      "mysql": "WITH Ranked AS (\n    SELECT e.name AS Employee, \n           e.salary AS Salary, \n           d.name AS Department,\n           DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk\n    FROM Employee e\n    JOIN Department d ON e.departmentId = d.id\n)\nSELECT Department, Employee, Salary\nFROM Ranked\nWHERE rnk <= 3;",
      "postgresql": "WITH Ranked AS (\n    SELECT e.name AS Employee, \n           e.salary AS Salary, \n           d.name AS Department,\n           DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk\n    FROM Employee e\n    JOIN Department d ON e.departmentId = d.id\n)\nSELECT Department, Employee, Salary\nFROM Ranked\nWHERE rnk <= 3;"
    },
    "companies": [
      "Amazon",
      "Google",
      "Facebook"
    ],
    "practiceUrl": "https://leetcode.com/problems/department-top-three-salaries/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-44",
    "sheetIndex": 44,
    "leetcodeId": 1667,
    "sectionId": 7,
    "sectionTitle": "Advanced String Functions / Regex / Clause",
    "sectionShortTitle": "Advanced String Functions / Regex / Clause",
    "sectionIcon": "\ud83d\udd24",
    "title": "Fix Names in a Table",
    "difficulty": "Easy",
    "description": "Fix the names so that only the first character is uppercase and the rest are lowercase. Return the result table ordered by user_id.",
    "schema": "Table: Users (user_id int, name varchar)",
    "examples": [
      {
        "input": "Users: (1, 'aLice'), (2, 'bOB')",
        "output": "+---------+-------+\n| user_id | name  |\n+---------+-------+\n| 1       | Alice |\n| 2       | Bob   |\n+---------+-------+",
        "explanation": "First letter uppercase, rest lowercase."
      }
    ],
    "optimalApproach": "Use `CONCAT(UPPER(SUBSTRING(name, 1, 1)), LOWER(SUBSTRING(name, 2)))`.",
    "solutions": {
      "mysql": "SELECT user_id, \n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;",
      "postgresql": "SELECT user_id, \n       CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name\nFROM Users\nORDER BY user_id;"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/fix-names-in-a-table/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-45",
    "sheetIndex": 45,
    "leetcodeId": 1527,
    "sectionId": 7,
    "sectionTitle": "Advanced String Functions / Regex / Clause",
    "sectionShortTitle": "Advanced String Functions / Regex / Clause",
    "sectionIcon": "\ud83d\udd24",
    "title": "Patients With a Condition",
    "difficulty": "Easy",
    "description": "Find the patient_id, patient_name, and conditions of the patients who have Type I Diabetes. Type I Diabetes always starts with DIAB1 prefix.",
    "schema": "Table: Patients (patient_id int, patient_name varchar, conditions varchar)",
    "examples": [
      {
        "input": "Patients: (1, 'Daniel', 'YFEV COUGH'), (2, 'Alice', ''), (3, 'Bob', 'DIAB100 MYOP'), (4, 'George', 'ACNE DIAB100')",
        "output": "+------------+--------------+--------------+\n| patient_id | patient_name | conditions   |\n+------------+--------------+--------------+\n| 3          | Bob          | DIAB100 MYOP |\n| 4          | George       | ACNE DIAB100 |\n+------------+--------------+--------------+",
        "explanation": "DIAB1 can appear at the start of string or preceded by a space."
      }
    ],
    "optimalApproach": "Match using `conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%'`.",
    "solutions": {
      "mysql": "SELECT patient_id, patient_name, conditions\nFROM Patients\nWHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';",
      "postgresql": "SELECT patient_id, patient_name, conditions\nFROM Patients\nWHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/patients-with-a-condition/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-46",
    "sheetIndex": 46,
    "leetcodeId": 196,
    "sectionId": 7,
    "sectionTitle": "Advanced String Functions / Regex / Clause",
    "sectionShortTitle": "Advanced String Functions / Regex / Clause",
    "sectionIcon": "\ud83d\udd24",
    "title": "Delete Duplicate Emails",
    "difficulty": "Easy",
    "description": "Delete all duplicate emails, keeping only one unique email with the smallest id. Note that you must write a DELETE statement and not a SELECT.",
    "schema": "Table: Person (id int, email varchar)",
    "examples": [
      {
        "input": "Person: (1, 'john@example.com'), (2, 'bob@example.com'), (3, 'john@example.com')",
        "output": "+----+------------------+\n| id | email            |\n+----+------------------+\n| 1  | john@example.com |\n| 2  | bob@example.com  |\n+----+------------------+",
        "explanation": "id 3 has duplicate email and larger id than 1, so it is deleted."
      }
    ],
    "optimalApproach": "Delete p1 where p1 joins p2 on `p1.email = p2.email AND p1.id > p2.id`.",
    "solutions": {
      "mysql": "DELETE p1\nFROM Person p1\nJOIN Person p2 ON p1.email = p2.email AND p1.id > p2.id;",
      "postgresql": "DELETE FROM Person\nWHERE id NOT IN (\n    SELECT MIN(id) FROM Person GROUP BY email\n);"
    },
    "companies": [
      "Amazon",
      "Apple"
    ],
    "practiceUrl": "https://leetcode.com/problems/delete-duplicate-emails/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-47",
    "sheetIndex": 47,
    "leetcodeId": 176,
    "sectionId": 7,
    "sectionTitle": "Advanced String Functions / Regex / Clause",
    "sectionShortTitle": "Advanced String Functions / Regex / Clause",
    "sectionIcon": "\ud83d\udd24",
    "title": "Second Highest Salary",
    "difficulty": "Medium",
    "description": "Find the second highest distinct salary from the Employee table. If there is no second highest salary, return null.",
    "schema": "Table: Employee (id int, salary int)",
    "examples": [
      {
        "input": "Employee: (1, 100), (2, 200), (3, 300)",
        "output": "+---------------------+\n| SecondHighestSalary |\n+---------------------+\n| 200                 |\n+---------------------+",
        "explanation": "The second highest salary is 200."
      }
    ],
    "optimalApproach": "Wrap query in `SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary` so it returns NULL if not found.",
    "solutions": {
      "mysql": "SELECT (\n    SELECT DISTINCT salary\n    FROM Employee\n    ORDER BY salary DESC\n    LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;",
      "postgresql": "SELECT (\n    SELECT DISTINCT salary\n    FROM Employee\n    ORDER BY salary DESC\n    LIMIT 1 OFFSET 1\n) AS SecondHighestSalary;"
    },
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "practiceUrl": "https://leetcode.com/problems/second-highest-salary/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-48",
    "sheetIndex": 48,
    "leetcodeId": 1484,
    "sectionId": 7,
    "sectionTitle": "Advanced String Functions / Regex / Clause",
    "sectionShortTitle": "Advanced String Functions / Regex / Clause",
    "sectionIcon": "\ud83d\udd24",
    "title": "Group Sold Products By The Date",
    "difficulty": "Easy",
    "description": "Find for each date the number of different products sold and their names sorted lexicographically, comma-separated.",
    "schema": "Table: Activities (sell_date date, product varchar)",
    "examples": [
      {
        "input": "Activities: (2020-05-30, 'Headphone'), (2020-06-01, 'Pencil'), (2020-06-02, 'Mask'), (2020-05-30, 'Basketball'), (2020-06-01, 'Bible')",
        "output": "+------------+----------+------------------------------+\n| sell_date  | num_sold | products                     |\n+------------+----------+------------------------------+\n| 2020-05-30 | 2        | Basketball,Headphone         |\n| 2020-06-01 | 2        | Bible,Pencil                 |\n| 2020-06-02 | 1        | Mask                         |\n+------------+----------+------------------------------+",
        "explanation": "Products grouped and ordered alphabetically."
      }
    ],
    "optimalApproach": "Group by sell_date, count distinct products, and use `GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',')` (or `STRING_AGG` in PostgreSQL).",
    "solutions": {
      "mysql": "SELECT sell_date,\n       COUNT(DISTINCT product) AS num_sold,\n       GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products\nFROM Activities\nGROUP BY sell_date\nORDER BY sell_date;",
      "postgresql": "SELECT sell_date,\n       COUNT(DISTINCT product) AS num_sold,\n       STRING_AGG(DISTINCT product, ',' ORDER BY product) AS products\nFROM Activities\nGROUP BY sell_date\nORDER BY sell_date;"
    },
    "companies": [
      "Adobe"
    ],
    "practiceUrl": "https://leetcode.com/problems/group-sold-products-by-the-date/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-49",
    "sheetIndex": 49,
    "leetcodeId": 1327,
    "sectionId": 7,
    "sectionTitle": "Advanced String Functions / Regex / Clause",
    "sectionShortTitle": "Advanced String Functions / Regex / Clause",
    "sectionIcon": "\ud83d\udd24",
    "title": "List the Products Ordered in a Period",
    "difficulty": "Easy",
    "description": "Get the names of products that have at least 100 units ordered in February 2020 and their amount.",
    "schema": "Table: Products (product_id int, product_name varchar, product_category varchar)\nTable: Orders (product_id int, order_date date, unit int)",
    "examples": [
      {
        "input": "Orders placed in February 2020 with quantities.",
        "output": "+--------------------+---------+\n| product_name       | unit    |\n+--------------------+---------+\n| Leetcode Solutions | 130     |\n| Leetcode Kit       | 100     |\n+--------------------+---------+",
        "explanation": "Products with >= 100 total units ordered in Feb 2020."
      }
    ],
    "optimalApproach": "Join Products and Orders on `product_id`. Filter `order_date BETWEEN '2020-02-01' AND '2020-02-29'`. Group by `product_name` with `HAVING SUM(unit) >= 100`.",
    "solutions": {
      "mysql": "SELECT p.product_name, SUM(o.unit) AS unit\nFROM Products p\nJOIN Orders o ON p.product_id = o.product_id\nWHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29'\nGROUP BY p.product_name\nHAVING SUM(o.unit) >= 100;",
      "postgresql": "SELECT p.product_name, SUM(o.unit) AS unit\nFROM Products p\nJOIN Orders o ON p.product_id = o.product_id\nWHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29'\nGROUP BY p.product_name\nHAVING SUM(o.unit) >= 100;"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/list-the-products-ordered-in-a-period/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  },
  {
    "id": "sql-50",
    "sheetIndex": 50,
    "leetcodeId": 1517,
    "sectionId": 7,
    "sectionTitle": "Advanced String Functions / Regex / Clause",
    "sectionShortTitle": "Advanced String Functions / Regex / Clause",
    "sectionIcon": "\ud83d\udd24",
    "title": "Find Users With Valid E-Mails",
    "difficulty": "Easy",
    "description": "Find the users who have valid emails. A valid email has a prefix name and a domain. Prefix name starts with a letter and contains only letters, digits, underscore, period, or dash. Domain must be '@leetcode.com'.",
    "schema": "Table: Users (user_id int, name varchar, mail varchar)",
    "examples": [
      {
        "input": "Users table with various valid and invalid emails.",
        "output": "+---------+-----------+-------------------------+\n| user_id | name      | mail                    |\n+---------+-----------+-------------------------+\n| 1       | Winston   | winston@leetcode.com    |\n| 3       | Annabelle | bella-@leetcode.com     |\n| 4       | Sally     | sally.eliza@leetcode.com|\n+---------+-----------+-------------------------+",
        "explanation": "Valid prefix matching regexp `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`."
      }
    ],
    "optimalApproach": "Use REGEXP / regex pattern: `^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$`.",
    "solutions": {
      "mysql": "SELECT user_id, name, mail\nFROM Users\nWHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$';",
      "postgresql": "SELECT user_id, name, mail\nFROM Users\nWHERE mail ~ '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$';"
    },
    "companies": [
      "Amazon"
    ],
    "practiceUrl": "https://leetcode.com/problems/find-users-with-valid-e-mails/",
    "studyPlanUrl": "https://leetcode.com/studyplan/top-sql-50/"
  }
];

export const TOTAL_SQL_50_PROBLEMS = 50;
