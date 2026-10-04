---
title: "Building with AI: implementation detail or a way of life?"
date: 2026-10-04
published: true
tags: ['AI', 'Engineering', 'Craft']
description: "Cursor, Claude Code and friends have changed how I build software. Here is what that looks like day to day, how I try to keep real knowledge, and whether AI is just a tool or a new way of working."
faq:
  - q: "What does building software with AI look like day to day?"
    a: "Less typing and more directing. I describe the outcome, let a tool like Cursor or Claude Code draft the change, then review, test and refine it. The work shifts from writing every line to defining the problem clearly and judging the result."
  - q: "How do you keep real knowledge when relying on AI coding tools?"
    a: "Read every diff before accepting it, ask the tool to explain its choices, write some code without AI on purpose, keep the fundamentals sharp (accessibility, performance, the browser itself), and treat tests and notes as proof that you understand what shipped."
  - q: "Is AI an implementation detail or a way of life for engineers?"
    a: "Both. The specific tools are implementation details that will keep changing. The shift towards working alongside AI is a way of life. What stays constant is that the engineer remains responsible for what ships."
---

A year or two ago, "using AI" meant asking a chatbot for a regex. Today it can mean an agent reading my whole repository, running the tests and opening a pull request while I make tea. That shift has been quick enough that I wanted to stop and write down what building with AI actually looks like for me, and what I think it means for our craft.

## So many options

The tooling landscape is crowded, and each tool pulls you into a slightly different way of working.

- **Cursor** is an editor built around AI. Tab completion that predicts your next edit, chat that understands your codebase, and multi-file changes without leaving the editor. It feels like pair programming where your partner types very fast.
- **Claude Code** is agentic. You give it a task and it explores the repository, makes a plan, edits files, runs commands and checks its own work. It is less "help me write this function" and more "here is the outcome I want, go".
- **GitHub Copilot**, general chat assistants, and UI generators fill in the gaps, from autocomplete to quick prototypes.

None of these is "the right one". I reach for completion when I know exactly what I am writing, chat when I am exploring, and an agent when the task is well defined but tedious.

## What it looks like day to day

My workflow has quietly moved from *writing* code to *directing* it:

1. **Frame the problem.** The clearer the brief, the better the result. Constraints, edge cases, accessibility requirements, what "done" means.
2. **Let the tool draft.** A component, a migration, a test suite.
3. **Review like it is a colleague's pull request.** Because it is. Does it handle loading and error states? Is it keyboard accessible? Did it invent an API that does not exist?
4. **Test and refine.** Run it, break it, tighten it.

The typing got faster. The thinking did not get optional.

## How do we maintain actual knowledge?

This is the question I care about most. When a tool can produce working code in seconds, it is tempting to stop understanding *why* it works. A few habits help me:

- **Read every diff.** If I cannot explain a change, it does not ship.
- **Ask why.** I regularly ask the tool to explain its choices, then check whether the explanation holds up.
- **Do reps without it.** Some features I build by hand on purpose, the same way you still learn arithmetic even though calculators exist.
- **Keep the fundamentals sharp.** HTML semantics, accessibility, performance and how the browser really works. AI is weakest exactly where these details matter.
- **Write things down.** Notes, docs and posts like this one force me to turn borrowed answers into my own understanding.

## The risk of heavy reliance

Leaning on AI too much has real costs:

- **Skills fade quietly.** You do not notice you have forgotten how something works until the tool is wrong and you cannot tell.
- **Confident, wrong code.** Generated code often *looks* right. Subtle bugs, outdated patterns and accessibility gaps slip through when review gets lazy.
- **Learning paths change.** Newer engineers can ship faster than ever but may skip the struggle that builds intuition.
- **Everything starts to look the same.** If we all accept the first suggestion, we lose the taste that makes products feel considered.

## Implementation detail or a way of life?

I think the honest answer is *both*.

The **tools are implementation details.** Cursor, Claude Code and whatever arrives next month will keep changing, and loyalty to any one of them is not a skill.

The **way of working is a way of life.** Collaborating with AI is now part of how software gets built, the same way version control and the web itself once were. Pretending otherwise does not make us better engineers; it just makes us slower ones.

What does not change is responsibility. AI can write the code, but I still own what ships: whether it is accessible, whether it is fast, whether it is kind to the people using it. That part is not something I want to delegate.

My rule for now: **let AI do the typing, but never the understanding.**
