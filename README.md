# Cloud Vibe Cert Safari

Build a full-stack React web application using Vite, Tailwind CSS, Lucide React icons, and `@supabase/supabase-js`. Call the project "CloudVibe AZ-900 Prep".

Configuration:
- Set up environment variables with:
  VITE_SUPABASE_URL=https://iykjdvdeuqnqaaxgkpc.supabase.co
  VITE_SUPABASE_ANON_KEY=sb_publishable_0YcWy3gg9SOgUjhqgxutzA_Efp2U

Key Features Required:
1. Top Bar / Navigation:
   - Header with Logo ("CloudVibe AZ-900"), Readiness Score gauge (0-100%), and GitHub Login via Supabase Auth (`supabase.auth.signInWithOAuth({ provider: 'github' })`).
2. Smart Quiz Module:
   - Interactive multiple choice questions covering Cloud Concepts, Architecture, and Governance.
   - Upon clicking an option, show instant green feedback for correct answers and red feedback for incorrect answers.
   - Include an expandable "Detailed Explanation" panel explaining why the correct answer is right and others are wrong.
   - Include an "African Real-World Context Analogy" section for every question.
3. Progress Dashboard:
   - Tracks accuracy scores and overall exam readiness across AZ-900 domains.
   - Saves quiz attempts into Supabase table `user_attempts`.
4. Footer Disclaimer:
   - Prominent notice: "Unofficial study tool built for #1MillionDevs Movement. Not affiliated with or endorsed by Microsoft."

Ensure clean TypeScript definitions, dark theme aesthetic, and mobile responsiveness.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7ec805ac-d096-438e-92f3-d4d7f10b960d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
