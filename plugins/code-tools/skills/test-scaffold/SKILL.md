---
name: test-scaffold
description: "Generates test file stubs for source files. Use when asked to write tests for, scaffold tests, generate test file, or add test coverage for a file or function."
allowed-tools: Bash, Read, Write, Glob, Grep
---

Generate test stubs for: $ARGUMENTS

## Project test context (pre-fetched)

**Test framework:** !`(grep -q '"vitest"' package.json 2>/dev/null && echo "vitest") || (grep -q '"jest"' package.json 2>/dev/null && echo "jest") || echo "unknown"`
**Existing test files:** !`find src -name "*.test.ts" -o -name "*.test.tsx" -o -name "*.spec.ts" -o -name "*.spec.tsx" 2>/dev/null | head -8 || echo "no tests found"`
**Test config:** !`ls vitest.config.* vite.config.* jest.config.* 2>/dev/null | head -3 || echo "no config found"`
**E2E tests:** !`ls e2e/*.spec.ts 2>/dev/null | head -5 || echo "no e2e tests"`
**Test convention:** !`find src -type d -name "__tests__" 2>/dev/null | head -3 || echo "no __tests__ dirs found"`

## Steps

### 1. Read the source file

Read the file the user specified. Identify:
- All exported functions (named exports and default export)
- All exported types/interfaces (for understanding signatures)
- All exported components (for Astro/React/Preact)
- Dependencies that will need mocking (external APIs, file system, etc.)

### 2. Learn the project's test conventions

Read ONE existing test file from the pre-fetched list above. Learn:
- Import style (`import { describe, it, expect } from "vitest"` vs `import { test } from "vitest"`)
- Nesting pattern (flat `it()` vs nested `describe()` blocks)
- Assertion style (`expect().toBe()` vs `assert`)
- File naming (`.test.ts` vs `.spec.ts`)
- Any common setup patterns (`beforeEach`, fixtures, etc.)

### 3. Determine test file location

Based on the pre-fetched convention data:
- If `__tests__/` directories exist alongside source files: place test at `src/path/__tests__/filename.test.ts`
- If tests live in a top-level `tests/` directory: mirror the source path there
- For E2E tests (pages, full flows): use `e2e/` directory
- Match the existing file extension pattern (`.test.ts` vs `.spec.ts`)

### 4. Generate the test file

Create a test file with:
- Correct framework imports matching project conventions
- Source file imports for all exported functions/components
- One `describe` block per logical group of exports
- `it.todo()` stubs for each testable behavior — think about BEHAVIORS, not just one test per function:
  - Happy path
  - Edge cases (null, undefined, empty input)
  - Error cases (invalid input, throws)
  - Boundary conditions

Example output shape:
```typescript
import { describe, expect, it } from "vitest";
import { myFunction, myOtherFunction } from "../sourceFile";

describe("myFunction", () => {
  it.todo("returns expected value for valid input");
  it.todo("handles empty string input");
  it.todo("throws on null input");
});

describe("myOtherFunction", () => {
  it.todo("computes correct result");
  it.todo("handles edge case");
});
```

### 5. Write the file

Write the test file to the determined location.

## Rules

- Generate `it.todo()` stubs ONLY. Do NOT write assertions — the user fills those in.
- Match the project's existing import style, nesting patterns, and naming conventions exactly.
- If the source file has no exports (side-effect module), say so and suggest what to test instead.
- For components, suggest both unit tests (structure/props) and E2E tests (user interaction) where appropriate.
- If the source file already has a corresponding test file, read it first and only add missing stubs — don't overwrite.
