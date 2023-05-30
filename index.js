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
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );

  let nextSteps = ` new`;

  p.note(nextSteps, "additional text");

  p.outro(
    `Problems? ${color.underline(color.red("Link"))}`
  );
}

main().catch(console.error);
