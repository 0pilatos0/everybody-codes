# Everybody Codes Challenge Solutions

This repository contains my solutions for the **[Everybody Codes](https://everybody.codes/)** programming challenges, a monthly coding competition where you solve algorithmic puzzles with increasing difficulty.

## 🎯 About Everybody Codes

Everybody Codes is a series of programming challenges organized by month. Each quest consists of three parts with progressive difficulty levels, similar to Advent of Code. It's a great way to improve your problem-solving skills and compete with programmers worldwide.

## 📁 Project Structure

Solutions are organized by year and day:

```
├── 2025/
│   ├── day 1/
│   │   ├── index.ts
│   │   ├── solutions/
│   │   │   ├── part1.ts
│   │   │   └── part2.ts
│   │   └── input/
│   │       ├── input_test.txt
│   │       └── input_real.txt
│   ├── day 2/
│   └── ...
├── template/        # Boilerplate for new solutions
├── cli.ts          # CLI tool to scaffold new days
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (modern JavaScript runtime)
- Node.js (for npm/package management)

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Create a New Quest

```bash
# Use the interactive CLI to scaffold a new quest
bun cli.ts
# or
npm run cli
```

This will:
1. Prompt you for the year and day
2. Create the directory structure
3. Copy the solution template files
4. Generate boilerplate code for Part 1 and Part 2

### Run a Solution

```bash
# Run with test input (default)
bun 2025/day\ 1/index.ts --test

# Run with real input
bun 2025/day\ 1/index.ts --real
```

## 📝 Solution Template

Each solution includes:
- **`index.ts`**: Main entry point that handles input loading and solution execution
- **`solutions/part1.ts`**: Part 1 solution function
- **`solutions/part2.ts`**: Part 2 solution function
- **`input/input_test.txt`**: Test input for development and debugging
- **`input/input_real.txt`**: Real puzzle input

## 🛠️ Stack

- **Language**: TypeScript
- **Runtime**: Bun
- **Package Manager**: npm / Bun
- **Linting**: ESLint with TypeScript support
- **CLI Tools**:
  - `inquirer` - Interactive prompts
  - `chalk` - Terminal colors
  - `figlet` - ASCII art text
  - `gradient-string` - Gradient text effects
  - `ora` - Loading spinners
  - `zod` - Input validation

## 📊 Solutions

Browse the solutions by year:

- [2025](./2025/)

## 📋 How to Use This Repository

1. **Browse solutions**: Explore the `/2025` directory to see solutions
2. **Learn from code**: Each solution demonstrates different problem-solving approaches
3. **Reference implementations**: Use as reference while solving your own puzzles
4. **Contributing**: Feel free to fork and adapt for your own use

## 🎓 Tips for Solving

1. Read the problem statement carefully
2. Start with the test input to understand the format
3. Implement Part 1 first
4. Use the CLI tool to ensure consistent project structure
5. Run solutions with `--test` flag first, then `--real`

## 📄 License

These solutions are provided for educational purposes. The Everybody Codes challenges themselves are owned by their respective creators.

---

**Happy coding! ⚡💻**
