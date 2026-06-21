# Copilot Fix Plan

## Goal
Fix the security, accessibility, and performance issues identified in `ASSIGNMENT01` and make the app safer and more robust.

## Tasks

### 1. Security hardening
- Install and enable `helmet` in `app.js`.
- Install and enable `compression` for response performance.
- Install and enable `csurf` for POST route CSRF protection.
- Add input validation and sanitization in `routes/projects.js` for `name` and `dueDate`.
- Add `rel="noopener noreferrer"` to all `target="_blank"` external links in `views/layout.hbs`, `views/projects.hbs`, and other views.
- Remove production stack trace rendering from `views/error.hbs` or guard it behind environment checks.
- Add a cookie secret to `cookie-parser` if cookies are used for sensitive operations.

### 2. Accessibility fixes
- Fix HTML structure in `views/layout.hbs`:
  - Add `<meta charset="utf-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1">`.
  - Move `<nav>` and `<footer>` inside `<body>`.
  - Ensure `{{{body}}}` is rendered between the page header and footer.
- Correct invalid markup in views:
  - `views/projects.hbs`: fix heading tags and wrap `li` elements in `<ul>` or `<ol>`.
  - `views/about.hbs`: remove nested `<p>` tags and use proper section/list structure.
  - `views/contact.hbs`: fix heading tag mismatch.
- Add alt text to all meaningful images and add `aria-label` or visible text for icon-only links.
- Wrap main page content in `<main>` where appropriate.

### 3. Performance improvements
- Configure `express.static` in `app.js` with `maxAge` for caching.
- Add `loading="lazy"` to non-critical images in views.
- Fix broken CSS values in `public/stylesheets/style.css`, such as `translate(2pz, -4px)`.
- Review and optimize CSS to reduce unnecessary selectors and duplicate styling.
- Add pagination or limits if the project dataset grows beyond a few items.

## Implementation order
1. Update `views/layout.hbs` and view templates to fix invalid HTML and accessibility issues.
2. Harden `app.js` with `helmet`, `compression`, and secure static asset settings.
3. Add CSRF and input validation to `routes/projects.js`.
4. Correct link attributes and image alt text across all views.
5. Test manually in a browser for page structure, form submission, and external links.

## Verification
- Run the app locally and verify the pages render correctly.
- Confirm that the `POST /projects/new` route rejects invalid input.
- Validate HTML structure with a browser accessibility tool or validator.
- Confirm external links now include `rel="noopener noreferrer"`.
- Confirm responses are compressed and static assets can be cached.
