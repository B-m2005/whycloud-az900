# Prompts Used in WhyCloud AZ-900

> Unofficial study tool. Not affiliated with Microsoft. All questions are original and based on the public AZ-900 skills outline on Microsoft Learn.

This file documents the AI prompts used to build WhyCloud and explains why each one was written the way it was.

---

## 1. Question-generation prompt (Claude)

```text
Act as a Microsoft Certified Trainer for AZ-900. I am building an unofficial exam prep tool for the #1MillionDevs Vibe Coding Hackathon.

Generate 10 structured AZ-900 practice questions covering Cloud Concepts, Architecture, and Governance.

For each question, output strict JSON with fields:
- "id": unique number
- "domain": domain name
- "question": text
- "options": array of 4 choices
- "correct_answer": correct option text
- "explanation": detailed explanation of why the correct option is right AND why the others are wrong
- "african_analogy": relate the cloud concept to an everyday African scenario (e.g., local markets, mobile money like M-Pesa, or solar microgrids)

Constraint: Do NOT copy actual exam questions. Use public Microsoft Learn syllabus concepts.
```

| Design choice | Reason |
|---|---|
| Trainer role | Keeps tone and difficulty at a fundamentals level |
| Strict JSON schema | The app can load the output directly, with no parsing errors |
| Explanations for wrong options | Turns the quiz into a learning tool, which is the main problem WhyCloud solves |
| `african_analogy` field | Keeps localisation consistent for every question |
| "Do NOT copy actual exam questions" | Follows the hackathon rule and keeps the content original |

---

## 2. Question-expansion prompt (Claude)

```text
Using the same JSON schema, write 15 more original AZ-900 practice questions to extend the question bank to 25.
Weight them like the public skills outline: Cloud Concepts (about 25-30%), Azure Architecture and Services (about 35-40%), Azure Management and Governance (about 30-35%).
Each question needs 4 options, exactly one correct answer, an explanation of why the correct answer is right and why each wrong option is wrong, and an everyday African analogy.
Do not reproduce real exam questions. Base every question only on public Microsoft Learn concepts.
```

The 15 new questions were added to the app in three batches of five, so that each message stayed small and reliable.

---

## 3. Build prompts (Lovable)

### Add questions (sent in 3 batches)

```text
Add the following 5 new questions to the END of the existing question bank. Keep all existing questions and their order. Use exactly the same data structure and field names as the existing questions (domain, question, options, correct answer, explanation, African analogy). Don't change anything else.
```

The last batch also asked Lovable to update the "Question X / N" counter, the per-domain totals and the readiness calculation to use all 25 questions.

### Shuffle answers and keyboard shortcuts

```text
Make two small changes to the quiz, and keep everything else exactly as it is.

1. Shuffle the answer options. Shuffle a copy of each question's options (never change the original data) once when a question loads, not on every re-render, so the options don't jump around when the user clicks or the screen updates. Decide which option is correct by comparing the option text to the correct answer text, never by position or index. The explanation, the African analogy and the correct/incorrect marking must still match the question after shuffling.

2. Keyboard shortcuts. Let users answer by pressing the keys A, B, C or D, which select the first, second, third and fourth displayed option. Ignore the keys if the user is typing in an input field, if the question was already answered, or if a modifier key like Ctrl, Alt or Cmd is held. Add and remove the key listener safely so it doesn't register twice.

Do not change the design, the "Unofficial study tool" footer, the dashboard, the question data, or the sign-in. Before you finish, check the build and the browser console for errors and fix any so the page loads normally, with no blank screen. Then confirm that all 25 questions still load.
```

**Why this prompt is written this way:** shuffling once per question load stops the options jumping around, and matching the correct answer by its text (not its position) keeps the marking correct after shuffling. The "check for errors" line was added to avoid a blank page.

### Other build prompts

| Purpose | Prompt summary |
|---|---|
| Branding | Rename the app to WhyCloud AZ-900 and keep the visible "Unofficial study tool" footer |
| Backend | Replace the broken backend with Lovable Cloud, which provides Google sign-in and saves each user's attempts |
| Cleanup | Remove the extra "Lovable" button from the top bar |

---

## Quality control

- Every `correct_answer` must exactly match one of the four `options`.
- Every question follows the public AZ-900 skills outline on Microsoft Learn.
- No real exam questions and no Microsoft logos are used.
