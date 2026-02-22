// ─────────────────────────────────────────────────────────
// B.Tech CSE — 2nd Semester Syllabus
// ─────────────────────────────────────────────────────────
// TODO: Paste your 2nd semester syllabus here and it will
//       be structured like 3rd-sem.js
//
// Subjects expected:
//   - English
//   - Chemistry
//   - PPS (Programming for Problem Solving — C)
//   - Mathematics-2

export const secondSemSyllabus = {
    English: {
        code: "",
        title: "Professional Communication / English",
        credits: null,
        modules: [],
    },
    Chemistry: {
        code: "",
        title: "Engineering Chemistry",
        credits: null,
        modules: [],
    },
    PPS: {
        code: "BTPS101-18",
        title: "Programming for Problem Solving (C Language)",
        credits: 3,
        structure: "L-3, T-0, P-0",
        modules: [
            {
                name: "Introduction to Programming",
                number: 1,
                hours: 8,
                topics: [
                    "Introduction to Programming (4 lectures)",
                    "Components of a computer system (disks, memory, processor, etc.) (1 lecture)",
                    "Idea of Algorithm: steps to solve logical and numerical problems",
                    "Representation of Algorithm: Flowchart/Pseudocode with examples (1 lecture)",
                    "From algorithms to programs: source code, variables (with data types), variables and memory locations",
                    "Syntax and Logical Errors in compilation, object and executable code (2 lectures)"
                ]
            },
            {
                name: "Arithmetic expressions, Branching and Loops",
                number: 2,
                hours: 14,
                topics: [
                    "Arithmetic expressions and precedence (2 lectures)",
                    "Conditional Branching and Loops (6 lectures)",
                    "Writing and evaluation of conditionals and consequent branching (3 lectures)",
                    "Iteration and loops (3 lectures)"
                ]
            },
            {
                name: "Arrays",
                number: 3,
                hours: 6,
                topics: [
                    "Arrays (6 lectures)",
                    "Arrays (1-D, 2-D), Character arrays and Strings"
                ]
            },
            {
                name: "Basic Algorithms",
                number: 4,
                hours: 6,
                topics: [
                    "Basic Algorithms (6 lectures)",
                    "Searching, Basic Sorting Algorithms (Bubble, Insertion and Selection)",
                    "Finding roots of equations, notion of order of complexity through example programs"
                ]
            },
            {
                name: "Functions",
                number: 5,
                hours: 5,
                topics: [
                    "Functions (including using built-in libraries)",
                    "Parameter passing in functions, call by value",
                    "Passing arrays to functions: idea of call by reference"
                ]
            },
            {
                name: "Recursion",
                number: 6,
                hours: 5,
                topics: [
                    "Recursion (4-5 lectures)",
                    "Recursion as a different way of solving problems",
                    "Example programs: Finding Factorial, Fibonacci series, Ackerman function etc.",
                    "Quick sort or Merge sort"
                ]
            },
            {
                name: "Structure",
                number: 7,
                hours: 4,
                topics: [
                    "Structure (4 lectures)",
                    "Structures, Defining structures and Array of Structures"
                ]
            },
            {
                name: "Pointers",
                number: 8,
                hours: 2,
                topics: [
                    "Pointers (2 lectures)",
                    "Idea of pointers, Defining pointers, Use of Pointers in self-referential structures",
                    "Notion of linked list (no implementation)"
                ]
            },
            {
                name: "File Handling",
                number: 9,
                topics: [
                    "File handling (only if time is available, otherwise should be done as part of the lab)"
                ]
            }
        ]
    },
    "Mathematics-2": {
        code: "BTAM201-23",
        title: "Engineering Mathematics-II",
        credits: 4,
        structure: "L-4, T-1, P-0",
        modules: [
            {
                name: "System of Linear Equations (Unit-I)",
                number: 1,
                topics: [
                    "Rank of a matrix, Echelon form of matrix",
                    "Homogeneous and Non-homogeneous system of linear equations",
                    "Consistency and inconsistency of system of equations",
                    "Gauss elimination method",
                    "Inverse of a matrix, Gauss-Jordon method"
                ]
            },
            {
                name: "Vector Spaces (Unit-II)",
                number: 2,
                topics: [
                    "Vector spaces, Subspaces",
                    "Linear independence and Linear dependence of vectors",
                    "Dimension and basis",
                    "Linear transformation, rank and nullity theorem (without proof)",
                    "Matrix associated with Linear Transformation",
                    "Eigen values, eigen vectors, Cayley-Hamilton theorem",
                    "Algebraic multiplicity, geometric multiplicity",
                    "Similar and diagonalizable matrices"
                ]
            },
            {
                name: "Ordinary Differential Equations (Unit-III)",
                number: 3,
                topics: [
                    "Formation of Differential Equations, Solution of Differential Equations",
                    "Initial and Boundary value problems",
                    "Solution of equations in separable form",
                    "Equations reducible to separable form",
                    "Exact differential equations, integrating factors",
                    "Linear first order equations, Bernoulli equation, Riccati equation",
                    "Clairaut's equation, Higher order differential equation with constant coefficients and variable coefficients",
                    "Method of variation of parameters, Method of undetermined coefficients",
                    "Applications to electric RLC circuit",
                    "Deflection of beams, Simple harmonic motion",
                    "Simple population decay model",
                    "Orthogonal trajectories of a given family of curves"
                ]
            },
            {
                name: "Partial Differential Equations (Unit-IV)",
                number: 4,
                topics: [
                    "Formation of first and second order equations",
                    "Solution of first order equations: Lagrange's equation",
                    "Surfaces orthogonal to a given family of surfaces",
                    "Non-linear first order equations, Charpit's method",
                    "Higher order Linear equations with constant coefficients"
                ]
            }
        ]
    },
};
