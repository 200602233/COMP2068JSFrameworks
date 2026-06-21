# Detailed Project Structure

Scanned on 2026-06-21.

Root
- `package.json` — root-level npm manifest (depends on `prompt`).
- `package-lock.json` — lockfile for root dependencies.
- `README.md` — repository readme.
- `.gitignore`, `.gitattributes`

Top-level folders
- `ASSIGNMENT01/` — Primary Express app.
  - `app.js` — Express application configuration and middleware.
  - `bin/www` — Startup script executed by `npm start`.
  - `package.json`, `package-lock.json` — app dependencies and lockfile.
  - `README.md` — assignment-level readme.
  - `.github/` — automation and Copilot metadata:
    - `copilot-instructions.md`
    - `copilot-context.md`
  - `configs/globals.js` — global configuration (MongoDB connection string).
  - `models/project.js` — Mongoose model for projects.
  - `routes/` — Express route handlers:
    - `index.js` — root route
    - `projects.js` — projects routes
    - `users.js` — users routes
  - `views/` — Handlebars templates:
    - `layout.hbs`, `index.hbs`, `projects.hbs`, `about.hbs`, `contact.hbs`, `error.hbs`
  - `public/` — static assets
    - `stylesheets/style.css`
    - `images/` — images used by pages:
      - `location.png`, `github_blackIcon.png`, `bottom_of_page.png`, `Belville.jpeg`, `style_stage.png`, `mail_icon.png`, `teams_icon.png`, `weather_icon.png`

- `ASSIGNMENT02/` — placeholder (`.gitkeep`) for second assignment.
- `LAB01/` — contains `lab1.js` and a `.gitkeep`.
- `LAB02/` — contains `lab2.js` and a `.gitkeep`.
- `LAB03/` — `.gitkeep` placeholder.
- `LAB04/` — `.gitkeep` placeholder.

Notes & Observations
- The runnable web application is `ASSIGNMENT01` (Express + Handlebars + Mongoose).
- `ASSIGNMENT01/package.json` defines these main dependencies: `express`, `hbs`, `mongoose`, `dotenv`, `morgan`, `cookie-parser`, `http-errors`, `debug`.
- Database configuration is externalized in `configs/globals.js` (likely reads from environment variables).
- Static assets and views follow the standard Express layout: `public/` and `views/`.

How to run `ASSIGNMENT01` (minimal):

```bash
cd ASSIGNMENT01
npm install
npm start
```

If you want, I can:
- Add a short `ASSIGNMENT01/README.md` with run and ENV notes.
- Generate a visual route -> view diagram or list of endpoints with their handlers.
