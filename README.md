# Portfolio (Vite + React + Tailwind + Supabase)

1. `npm install`
2. Supabase dashboard: create a project, then run `supabase/schema.sql` in the SQL Editor.
3. `cp .env.example .env` and paste your project URL and anon key.
4. Put your portrait at `public/profile.png`.
5. Edit `ME` at the top of `src/App.jsx` (name, email, social links) and the page `<title>` in `index.html`.
6. `npm run dev`. Deploy to Vercel and add the two env vars there.

Projects and blog posts load from the `projects` and `posts` tables. Until those have rows (or if env vars are missing), the sample content in `App.jsx` is shown. Messages land in `contact_messages`.
