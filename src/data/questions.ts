export type QuestionType = 'mcq' | 'truefalse' | 'fib';

export interface Question {
  id: number;
  section: 'A' | 'B' | 'C';
  sectionTitle: string;
  type: QuestionType;
  prompt: string;
  options?: { key: string; label: string }[]; // For MCQs
  wordPool?: string[]; // For FIB
  correctAnswer: string; // Internal evaluation only
}

export const WORD_POOL: string[] = [
  'sequence', 'matrix', 'TOP', 'memory', 'integrity',
  'FETCH', 'schema', 'ranks', 'package', 'binary',
  'DISTINCT', 'VALUES', 'volatile', 'links', 'column',
  'CLOB', 'touched', 'row', 'TINYINT', 'suite',
  'SYSDATE', 'register', 'functional', 'LIMIT', 'table'
];

export const EXAM_QUESTIONS: Question[] = [
  // ================= SECTION A: MCQs (Q1 to Q50) =================
  {
    id: 1,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Why is RAM described as "random access" memory?',
    options: [
      { key: 'A', label: 'Data is written in an unpredictable order and cannot be retrieved reliably' },
      { key: 'B', label: 'Cells must be read sequentially starting from the first cell' },
      { key: 'C', label: 'Any memory cell can be accessed directly if its row and column are known' },
      { key: 'D', label: "Only cells chosen by the operating system's scheduler can be accessed" }
    ],
    correctAnswer: 'C'
  },
  {
    id: 2,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which CPU component reads the code for the next instruction, increments the program counter, and instructs the ALU or specialized hardware to perform the requested operation?',
    options: [
      { key: 'A', label: 'Control Unit' },
      { key: 'B', label: 'Arithmetic Logic Unit' },
      { key: 'C', label: 'Registers' },
      { key: 'D', label: 'Primary memory' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 3,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which of the following is NOT one of the three main parts of the CPU?',
    options: [
      { key: 'A', label: 'Arithmetic Logic Unit' },
      { key: 'B', label: 'Control Unit' },
      { key: 'C', label: 'Registers' },
      { key: 'D', label: 'Random Access Memory' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 4,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Comparing two numbers, letters, or special characters is a task assigned to which unit, and of what type?',
    options: [
      { key: 'A', label: 'Control Unit - control operation' },
      { key: 'B', label: 'ALU - logical operation' },
      { key: 'C', label: 'ALU - arithmetic operation' },
      { key: 'D', label: 'Registers - storage operation' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 5,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which of the following is NOT listed among the five gross functions of a digital computer?',
    options: [
      { key: 'A', label: 'Takes data as input' },
      { key: 'B', label: 'Compiles source code into machine language' },
      { key: 'C', label: 'Stores data and instructions in memory for later use' },
      { key: 'D', label: 'Controls all the other steps' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 6,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which pair of characteristics correctly describes ROM?',
    options: [
      { key: 'A', label: 'Volatile and modifiable' },
      { key: 'B', label: 'Volatile and read-only' },
      { key: 'C', label: 'Permanent and freely modifiable' },
      { key: 'D', label: 'Permanent and not modifiable' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 7,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which category of memory retains stored data and programs after the power is turned off?',
    options: [
      { key: 'A', label: 'Secondary memory' },
      { key: 'B', label: 'RAM' },
      { key: 'C', label: 'Registers' },
      { key: 'D', label: 'The program counter' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 8,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which ordering of optical media by maximum storage capacity (smallest to largest) is correct?',
    options: [
      { key: 'A', label: 'Blu-ray, DVD, CD' },
      { key: 'B', label: 'DVD, CD, Blu-ray' },
      { key: 'C', label: 'CD, DVD, Blu-ray' },
      { key: 'D', label: 'CD, Blu-ray, DVD' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 9,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'The floppy disk, with a capacity of only 1.44 MB, is categorized as which type of storage media?',
    options: [
      { key: 'A', label: 'Optical media' },
      { key: 'B', label: 'Solid-state media' },
      { key: 'C', label: 'Magnetic media' },
      { key: 'D', label: 'Volatile media' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 10,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Why is the term "disk" still used for a flash disk even though it has no mechanical platters or access arms?',
    options: [
      { key: 'A', label: 'Because flash chips are physically shaped like circular platters' },
      { key: 'B', label: 'Because data is accessed as if it were on a hard drive, with the disk storage structure emulated' },
      { key: 'C', label: 'Because flash disks use laser light to read data' },
      { key: 'D', label: 'Because flash disks are always connected through a disk drive controller' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 11,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'According to the lab, a hard disk drive provides relatively quick access to large amounts of data stored on what?',
    options: [
      { key: 'A', label: 'An electromagnetically charged surface or set of surfaces' },
      { key: 'B', label: 'A laser-etched polycarbonate layer' },
      { key: 'C', label: 'A set of non-volatile flash chips' },
      { key: 'D', label: 'A refreshed capacitor array' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 12,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which statement about dependency between system software and application software is correct?',
    options: [
      { key: 'A', label: 'System software cannot run without application software' },
      { key: 'B', label: 'Both types depend on each other equally' },
      { key: 'C', label: 'Application software can run independently, while system software depends on it' },
      { key: 'D', label: 'Application software cannot run without system software, whereas system software can run independently' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 13,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which of the following is an example of a software suite rather than a single program?',
    options: [
      { key: 'A', label: 'An image viewer' },
      { key: 'B', label: 'Microsoft Office' },
      { key: 'C', label: 'Opera web browser' },
      { key: 'D', label: 'Linux' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 14,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'A database management system, being a collection of fundamental programs that provide service to a variety of other independent applications, is an example of which form of application software?',
    options: [
      { key: 'A', label: 'A single program' },
      { key: 'B', label: 'A software package' },
      { key: 'C', label: 'A software system' },
      { key: 'D', label: 'A software suite' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 15,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which of the following would be classified as a fundamental system software utility?',
    options: [
      { key: 'A', label: 'A disk formatter' },
      { key: 'B', label: 'A spreadsheet' },
      { key: 'C', label: 'An image viewer' },
      { key: 'D', label: 'Presentation software' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 16,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'What is the primary role of an input device according to the lab?',
    options: [
      { key: 'A', label: 'To store data permanently for later retrieval' },
      { key: 'B', label: 'To convert electronic results into printed form' },
      { key: 'C', label: 'To control and coordinate all other components' },
      { key: 'D', label: 'To translate data from a form humans understand into one the computer can work with' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 17,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'How many keys does a standard (QWERTY) keyboard generally have?',
    options: [
      { key: 'A', label: '84' },
      { key: 'B', label: '101' },
      { key: 'C', label: '108' },
      { key: 'D', label: '104' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 18,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which statement correctly contrasts the binary and decimal number systems?',
    options: [
      { key: 'A', label: 'Binary has ten digits and decimal has two' },
      { key: 'B', label: 'Binary has only two digits, while decimal has ten unique digits from zero through nine' },
      { key: 'C', label: 'Both have ten digits but use different symbols' },
      { key: 'D', label: 'Binary uses digits zero through seven, decimal uses zero through nine' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 19,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: "Dr. E. F. Codd's 1970 paper on the relational concept was intended to overcome which limitation of earlier database systems?",
    options: [
      { key: 'A', label: 'Lack of graphical user interfaces' },
      { key: 'B', label: 'High cost of storage devices' },
      { key: 'C', label: 'Physical dependencies in the then-available database systems' },
      { key: 'D', label: 'Inability to store numeric data' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 20,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'What was the original name of the prototype that later became the SQL (SEQUEL) language?',
    options: [
      { key: 'A', label: 'System R' },
      { key: 'B', label: 'Relational Software' },
      { key: 'C', label: 'T-SQL' },
      { key: 'D', label: 'PL/SQL' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 21,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which company, then called Relational Software, Inc., introduced the first commercially available relational database implementation incorporating SQL in 1979?',
    options: [
      { key: 'A', label: 'IBM' },
      { key: 'B', label: 'Oracle' },
      { key: 'C', label: 'MySQL AB' },
      { key: 'D', label: 'Microsoft' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 22,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which reason does the lab give for SQL remaining a fundamental skill?',
    options: [
      { key: 'A', label: 'There is currently no mature and viable alternative language that accomplishes the same functionality' },
      { key: 'B', label: 'SQL changes so drastically every decade that older knowledge becomes obsolete' },
      { key: 'C', label: 'Only Oracle databases are capable of using SQL' },
      { key: 'D', label: 'SQL has replaced relational databases entirely' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 23,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: '"Data independence" in a relational database means that:',
    options: [
      { key: 'A', label: 'Each table must be stored on a separate hard drive' },
      { key: 'B', label: 'Data cannot be shared between users' },
      { key: 'C', label: 'Users must specify the file name of every record they need' },
      { key: 'D', label: 'A user does not need to know on which hard drive and file a piece of information is stored' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 24,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which statement about NULL is correct?',
    options: [
      { key: 'A', label: 'Null is equal to zero' },
      { key: 'B', label: 'Null is a string of blank spaces' },
      { key: 'C', label: 'Null is an unknown value, not even blank spaces' },
      { key: 'D', label: 'Null can be compared with other values using the equals sign' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 25,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which statement about the order of columns in a table is correct?',
    options: [
      { key: 'A', label: 'Column order is fixed permanently once the table is created' },
      { key: 'B', label: 'Column order determines which column becomes the primary key' },
      { key: 'C', label: 'Column order is unimportant because SQL can display data in any order you choose' },
      { key: 'D', label: 'Column order must always be alphabetical' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 26,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: "Why is a customer's phone number a poor choice for a primary key?",
    options: [
      { key: 'A', label: 'Phone numbers can never be unique' },
      { key: 'B', label: 'Phone numbers cannot be stored in a NUMBER column' },
      { key: 'C', label: 'Primary keys must always be text' },
      { key: 'D', label: 'Phone numbers can change, causing problems with updates of other columns that reference it' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 27,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'What is the main advantage of a surrogate (synthetic) key?',
    options: [
      { key: 'A', label: "It is derived from the customer's name" },
      { key: 'B', label: 'It is unique and has no inherent meaning, so it is not subject to changes' },
      { key: 'C', label: 'It can contain null values' },
      { key: 'D', label: 'It can be reused after the row is deleted' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 28,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which statement about primary keys in a table is correct?',
    options: [
      { key: 'A', label: 'A table may have only one primary key, which may consist of one or more columns' },
      { key: 'B', label: 'A table must have one primary key for every column' },
      { key: 'C', label: 'A table may have several primary keys as long as each is a single column' },
      { key: 'D', label: 'A primary key must always consist of exactly one column' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 29,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which statement about Oracle and primary keys is correct?',
    options: [
      { key: 'A', label: 'Oracle does not require every table to have a primary key, though most tables should have one'
      },
      { key: 'B', label: 'Oracle refuses to create a table without a primary key' },
      { key: 'C', label: 'Oracle automatically creates a primary key on the first column' },
      { key: 'D', label: 'Oracle allows primary keys only on NUMBER columns' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 30,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Splitting customer and order information into two tables chiefly helps to:',
    options: [
      { key: 'A', label: 'Increase the number of columns in each table' },
      { key: 'B', label: 'Remove the need for any key' },
      { key: 'C', label: 'Avoid data inconsistency, since an address change requires updating only one row' },
      { key: 'D', label: 'Make NULL values impossible' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 31,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which statement about a foreign key column and the primary key column it references is correct?',
    options: [
      { key: 'A', label: 'They must always have identical names' },
      { key: 'B', label: 'They must never have identical names' },
      { key: 'C', label: 'The foreign key column must be unique within its table' },
      { key: 'D', label: 'They often share the same name, but this is not required' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 32,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which pairing of an SQL command and its sublanguage is correct?',
    options: [
      { key: 'A', label: 'TRUNCATE - Data Manipulation Language' },
      { key: 'B', label: 'GRANT - Data Control Language' },
      { key: 'C', label: 'COMMIT - Data Definition Language' },
      { key: 'D', label: 'SELECT - Data Definition Language' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 33,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which group of commands belongs to Transaction Control?',
    options: [
      { key: 'A', label: 'CREATE, ALTER, DROP' },
      { key: 'B', label: 'GRANT, REVOKE' },
      { key: 'C', label: 'COMMIT, ROLLBACK, SAVEPOINT' },
      { key: 'D', label: 'SELECT, MERGE, DELETE' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 34,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Depending on setup, how does the default display format show the date July 4, 2009?',
    options: [
      { key: 'A', label: '04-JUL-09' },
      { key: 'B', label: '07-04-2009' },
      { key: 'C', label: 'JUL-04-09' },
      { key: 'D', label: '2009-JUL-04' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 35,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'In the definition NUMBER(5,2), the values 5 and 2 are respectively called:',
    options: [
      { key: 'A', label: 'Scale and precision' },
      { key: 'B', label: 'Length and width' },
      { key: 'C', label: 'Digits and decimals' },
      { key: 'D', label: 'Precision and scale' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 36,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'A column defined as NUMBER(5) or NUMBER(5,0) allows integers in which range?',
    options: [
      { key: 'A', label: '-999.99 to 999.99' },
      { key: 'B', label: '-99,999 to 99,999' },
      { key: 'C', label: '0 to 99,999 only' },
      { key: 'D', label: '-9,999 to 9,999' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 37,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'A column defined as CHAR(10) stores the four-character value JOHN. How many blank characters are padded at the end?',
    options: [
      { key: 'A', label: '4' },
      { key: 'B', label: '6' },
      { key: 'C', label: '10' },
      { key: 'D', label: '0' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 38,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which pair correctly states the maximum sizes of VARCHAR2 and CHAR columns?',
    options: [
      { key: 'A', label: 'VARCHAR2: 2,000 characters; CHAR: 4,000 characters' },
      { key: 'B', label: 'VARCHAR2: 4,000 characters; CHAR: 4,000 characters' },
      { key: 'C', label: 'VARCHAR2: 4,000 characters; CHAR: 2,000 characters' },
      { key: 'D', label: 'VARCHAR2: 2,000 characters; CHAR: 2,000 characters' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 39,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which data type replaced the formerly used LONG data type, which is retained only for backward compatibility?',
    options: [
      { key: 'A', label: 'CLOB' },
      { key: 'B', label: 'VARCHAR2' },
      { key: 'C', label: 'CHAR' },
      { key: 'D', label: 'NUMBER' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 40,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which pairing of an RDBMS and its row-limiting construct is correct according to the lab?',
    options: [
      { key: 'A', label: 'MySQL - ROWNUM' },
      { key: 'B', label: 'Oracle 11g - LIMIT' },
      { key: 'C', label: 'SQL Server - SYSDATE' },
      { key: 'D', label: 'SQL Server (T-SQL) - TOP' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 41,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'You must list only the departments that have more than 5 employees by filtering on COUNT(employee_id). Which clause is appropriate and why?',
    options: [
      { key: 'A', label: 'WHERE, because it filters groups after aggregation' },
      { key: 'B', label: 'ORDER BY, because it removes groups that fail the condition' },
      { key: 'C', label: 'HAVING, because it filters the groups formed by GROUP BY, while WHERE filters individual rows' },
      { key: 'D', label: 'DISTINCT, because it removes departments with duplicate counts' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 42,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'An employee row has a department_id value that has no matching row in the departments table. What happens to that employee when the two tables are combined with INNER JOIN ... ON e.department_id = d.department_id?',
    options: [
      { key: 'A', label: 'The row appears with a NULL department name' },
      { key: 'B', label: 'The row is omitted from the result' },
      { key: 'C', label: 'The query returns an error' },
      { key: 'D', label: 'The row appears with blank spaces as the department name' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 43,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which query correctly returns only the first 10 rows of the employees table in Oracle 11g?',
    options: [
      { key: 'A', label: 'SELECT first_name FROM employees LIMIT 10;' },
      { key: 'B', label: 'SELECT TOP 10 first_name FROM employees;' },
      { key: 'C', label: 'SELECT first_name FROM employees WHERE ROWNUM = 10;' },
      { key: 'D', label: 'SELECT first_name FROM employees WHERE ROWNUM <= 10;' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 44,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'The employees table has 20 rows with no NULLs in department_id: the value 90 appears 3 times, 60 appears 5 times, and 50 appears 12 times. How many rows does SELECT DISTINCT department_id FROM employees return?',
    options: [
      { key: 'A', label: '3' },
      { key: 'B', label: '12' },
      { key: 'C', label: '20' },
      { key: 'D', label: '5' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 45,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'What is the effect of executing UPDATE employees SET salary = 6000; with no WHERE clause?',
    options: [
      { key: 'A', label: 'Only the first row is updated' },
      { key: 'B', label: 'A syntax error occurs' },
      { key: 'C', label: 'The salary of every row in the table is set to 6000' },
      { key: 'D', label: 'No rows are updated' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 46,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Why does a query written as WHERE publish_date = NULL fail to find rows whose PUBLISH_DATE is null?',
    options: [
      { key: 'A', label: 'Nulls are unknown values and cannot be evaluated or compared' },
      { key: 'B', label: 'NULL is stored as zero, so the comparison is always false' },
      { key: 'C', label: 'The DATE data type does not allow comparison operators' },
      { key: 'D', label: 'NULL is stored as blank spaces, so only LIKE can match it' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 47,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which value would be rejected by a column defined as NUMBER(5,2)?',
    options: [
      { key: 'A', label: '-999.99' },
      { key: 'B', label: '0.07' },
      { key: 'C', label: '123.4' },
      { key: 'D', label: '1000.5' }
    ],
    correctAnswer: 'D'
  },
  {
    id: 48,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Given: SELECT d.department_name, e.first_name FROM employees e RIGHT JOIN departments d ON e.department_id = d.department_id; what happens to a department that currently has no employees?',
    options: [
      { key: 'A', label: 'It is omitted from the result' },
      { key: 'B', label: 'It appears in the result with NULL in the employee columns' },
      { key: 'C', label: 'The query returns an error' },
      { key: 'D', label: 'It appears once for every employee in the table' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 49,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which statement about how computers store files and software is correct?',
    options: [
      { key: 'A', label: 'Software is stored in decimal, while data files are stored in binary' },
      { key: 'B', label: 'Only data files are stored as ones and zeros; programs are not' },
      { key: 'C', label: 'Even the software that translates binary files into words and pictures is itself composed of ones and zeros' },
      { key: 'D', label: 'Files are stored as words and pictures natively, and binary is used only during transmission' }
    ],
    correctAnswer: 'C'
  },
  {
    id: 50,
    section: 'A',
    sectionTitle: 'Multiple Choice Questions',
    type: 'mcq',
    prompt: 'Which pair names the function used for the current date/time in the MySQL and Oracle dialects respectively?',
    options: [
      { key: 'A', label: 'SYSDATE / NOW()' },
      { key: 'B', label: 'DATETIME / SYSDATE' },
      { key: 'C', label: 'NOW() / DATE' },
      { key: 'D', label: 'NOW() / SYSDATE' }
    ],
    correctAnswer: 'D'
  },

  // ================= SECTION B: TRUE / FALSE (Q51 to Q90, Exactly 40 Questions) =================
  {
    id: 51,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'A touch screen is exclusively an output device.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 52,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Regarding computing power, the CPU is the most important element of a computer system.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 53,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'A hard disk drive is classified as software because it stores programs.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 54,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Registers provide a very fast storage area for the data that is to be executed next.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 55,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'An output device converts electronically generated information into human-readable form.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 56,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'MySQL is classified as system software.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 57,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'A bit is composed of the digits zero through nine.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 58,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Optical disc drives use laser light to read or write data.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 59,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Users generally interact directly with system software because it runs in the foreground.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 60,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Blu-ray is described as the newest type of optical media.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 61,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'The programs in a software suite share a common user interface or data format.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 62,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'A DBMS is itself the organized collection of data.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 63,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'The name of a column must be unique within a table.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 64,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'In the five computer functions, processing converts information back into raw data.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 65,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Every intersection of a row and a column in a table must hold a non-null value.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 66,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Each table has a unique name that signifies the contents of its data.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 67,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'MERGE is listed as a Data Manipulation Language command.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 68,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'A table typically holds data about several unrelated subjects.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 69,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'RENAME is classified as a Data Control Language command.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 70,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'A barcode reader and a joystick are both input devices.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 71,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'The DATE data type stores only the calendar date and no time information.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 72,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Oracle uses PL/SQL for procedural tasks.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 73,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'InnoDB is an ENGINE option associated with the MySQL dialect.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 74,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'NUMBER columns may include hyphens or dashes as part of the numeric data.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 75,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'GROUP BY is used together with aggregate functions such as COUNT, SUM, and AVG.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 76,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'T-SQL is the dialect used by Oracle.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 77,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'ORDER BY can sort the result set by one or more columns in ascending or descending order.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 78,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'A LEFT JOIN returns all rows from the right table and only matching rows from the left.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 79,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'A relational database management system provides users with data consistency and data integrity.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 80,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'User authentication (login) tools are classified as application software rather than system software.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 81,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'The PRIMARY KEY constraint automatically enforces both UNIQUE and NOT NULL constraints on the column.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 82,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'In relational databases, a foreign key column can never accept or store a NULL value.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 83,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'The DROP TABLE statement can be reversed using the ROLLBACK transaction command in standard SQL.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 84,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Cache memory is typically faster than main memory (RAM) and is located closer to or inside the CPU.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 85,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Operating systems such as Microsoft Windows, Linux, and macOS are categorized as application software.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 86,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'The WHERE clause can directly evaluate aggregate functions such as SUM() and AVG().',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 87,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'Solid State Drives (SSDs) have no moving mechanical platters or access arms compared to traditional HDDs.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 88,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'In SQL pattern matching, the percent symbol (%) matches zero or more arbitrary characters.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },
  {
    id: 89,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'The TRUNCATE statement in SQL is slower than DELETE because it logs individual row deletions.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'F'
  },
  {
    id: 90,
    section: 'B',
    sectionTitle: 'True / False',
    type: 'truefalse',
    prompt: 'A composite primary key is a key that consists of two or more columns combined together to identify a record uniquely.',
    options: [
      { key: 'T', label: 'True' },
      { key: 'F', label: 'False' }
    ],
    correctAnswer: 'T'
  },

  // ================= SECTION C: FILL IN THE BLANKS (Q91 to Q100, 10 Questions) =================
  {
    id: 91,
    section: 'C',
    sectionTitle: 'Fill in the Blanks',
    type: 'fib',
    prompt: 'A computer operates under the control of instructions stored in its own ____________, accepts data, processes it, and stores information for future use.',
    wordPool: WORD_POOL,
    correctAnswer: 'memory'
  },
  {
    id: 92,
    section: 'C',
    sectionTitle: 'Fill in the Blanks',
    type: 'fib',
    prompt: 'System software controls, integrates, and manages the individual hardware components so that other software and users see the system as a single ____________ unit.',
    wordPool: WORD_POOL,
    correctAnswer: 'functional'
  },
  {
    id: 93,
    section: 'C',
    sectionTitle: 'Fill in the Blanks',
    type: 'fib',
    prompt: 'A relational database stores data in tables, which are essentially a two-dimensional ____________ consisting of columns and rows.',
    wordPool: WORD_POOL,
    correctAnswer: 'matrix'
  },
  {
    id: 94,
    section: 'C',
    sectionTitle: 'Fill in the Blanks',
    type: 'fib',
    prompt: 'In the CUSTOMER and ORDER example, CUSTOMER_ID is the foreign key that ____________ the two tables together.',
    wordPool: WORD_POOL,
    correctAnswer: 'links'
  },
  {
    id: 95,
    section: 'C',
    sectionTitle: 'Fill in the Blanks',
    type: 'fib',
    prompt: 'Because Oracle 11g does not support the LIMIT clause, it uses ROWNUM or ____________ FIRST to restrict the number of rows.',
    wordPool: WORD_POOL,
    correctAnswer: 'FETCH'
  },
  {
    id: 96,
    section: 'C',
    sectionTitle: 'Fill in the Blanks',
    type: 'fib',
    prompt: 'In an INSERT INTO statement, the data to be added to the new row is supplied through the ____________ keyword.',
    wordPool: WORD_POOL,
    correctAnswer: 'VALUES'
  },
  {
    id: 97,
    section: 'C',
    sectionTitle: 'Fill in the Blanks',
    type: 'fib',
    prompt: 'A small collection of programs that work closely together to accomplish a task, such as a spreadsheet, is called a software ____________.',
    wordPool: WORD_POOL,
    correctAnswer: 'package'
  },
  {
    id: 98,
    section: 'C',
    sectionTitle: 'Fill in the Blanks',
    type: 'fib',
    prompt: 'Joins combine rows from two or more tables based on a related ____________ between them.',
    wordPool: WORD_POOL,
    correctAnswer: 'column'
  },
  {
    id: 99,
    section: 'C',
    sectionTitle: 'Fill in the Blanks',
    type: 'fib',
    prompt: 'MySQL has data types like ____________ and DATETIME, whereas Oracle uses NUMBER and DATE.',
    wordPool: WORD_POOL,
    correctAnswer: 'TINYINT'
  },
  {
    id: 100,
    section: 'C',
    sectionTitle: 'Fill in the Blanks',
    type: 'fib',
    prompt: 'Computer hardware consists of physical objects, such as the monitor and the motherboard, that can be ____________.',
    wordPool: WORD_POOL,
    correctAnswer: 'touched'
  }
];
