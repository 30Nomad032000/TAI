import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";

async function main() {
  console.clear();

  const boot = p.spinner();
  boot.start("Starting up...");
  await setTimeout(1000);
  boot.stop("Welcome to AI Chat");


  const project = await p.group(
    {
      path: () =>
        p.text({
          message: "Proompt",
          placeholder: "How do I center a div ?",
          validate: (value) => {
            if (value.length<5) return "Please enter a valid prompt";
          },
        }),
      password: () =>
        p.password({
          message: "Provide a password",
          validate: (value) => {
            if (!value) return "Please enter a password.";
            if (value.length < 5)
              return "Password should have at least 5 characters.";
          },
        }),
      type: ({ results }) =>
        p.select({
          message: `Pick a project type within "${results.path}"`,
          initialValue: "ts",
          options: [
            { value: "ts", label: "TypeScript" },
            { value: "js", label: "JavaScript" },
            { value: "coffee", label: "CoffeeScript", hint: "oh no" },
          ],
        }),
      tools: () =>
        p.multiselect({
          message: "Select additional tools.",
          initialValues: ["prettier", "eslint"],
          options: [
            { value: "prettier", label: "Prettier", hint: "recommended" },
            { value: "eslint", label: "ESLint", hint: "recommended" },
            { value: "stylelint", label: "Stylelint" },
            { value: "gh-action", label: "GitHub Action" },
          ],
        }),
      install: () =>
        p.confirm({
          message: "Install dependencies?",
          initialValue: false,
        }),
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );

  if (project.install) {
    const s = p.spinner();
    s.start("Installing via pnpm");
    await setTimeout(5000);
    s.stop("Installed via pnpm");
  }

  let nextSteps = `cd ${project.path}        \n${
    project.install ? "" : "pnpm install\n"
  }pnpm dev`;

  p.note(nextSteps, "Next steps.");

  p.outro(
    `Problems? ${color.underline(color.cyan("https://example.com/issues"))}`
  );
}

main().catch(console.error);
