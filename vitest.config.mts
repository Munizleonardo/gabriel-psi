import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // Não varrer worktrees aninhados (.claude/worktrees/*) nem builds.
    exclude: [...configDefaults.exclude, "**/.claude/**", "**/.next/**"],
  },
  resolve: {
    alias: {
      "@": import.meta.dirname,
    },
  },
});
