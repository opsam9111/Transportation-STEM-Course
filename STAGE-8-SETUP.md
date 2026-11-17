# Stage 8 — Registration and Final Artifact Submission

## Delivered
- `dist/register.html`: participant registration instructions and configurable form link.
- `dist/submit.html`: final project requirements and configurable secure upload link.
- Homepage, modules, showcase, and navigation links updated.
- `dist/course-config.js`: insert two HTTPS URLs only after forms are created and tested.
- `dist/enrollment.js`: keeps form links disabled until configured.

## Activation
1. Create a secure registration form with name, email, subject, grade band, optional school, privacy notice.
2. Create a separate submission form with teacher identity, pathway, artifact upload or link, and consent/acknowledgment. Test whether your form provider permits external uploads without requiring a particular organizational account.
3. Set `registration` and `submission` in `dist/course-config.js` to the actual HTTPS URLs. Do not put API keys, passwords, or private spreadsheet links in public code.
4. Test both forms as a teacher, including mobile and a non-organization account. Verify confirmation receipts and instructor access.
5. Keep a private instructor spreadsheet with registration date, teacher ID, units completed (self-reported or LMS verified), final submission, review status, feedback date. Never publish it to GitHub.
6. Publish contents of `dist` to GitHub Pages.

## Important limitations
- No backend, real upload handling, email notifications, authenticated progress, or automatic enrollment exists in the static website.
- Both buttons remain disabled until real form URLs are provided.
- This package has structural checks only, not browser testing.
