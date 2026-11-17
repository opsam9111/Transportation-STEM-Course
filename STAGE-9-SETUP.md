# Stage 9: Live Google Forms integration

The three respondent URLs are configured in `course-config.js`:
- Registration: https://forms.gle/bj4WENYxnGG2orBr6
- Unit progress: https://forms.gle/us657CZbigN1Wi9q6
- Final artifact: https://forms.gle/cLD2L811VzMtub7Z8

## Deploy
Upload the **contents** of `dist/` (not the folder itself) to the root of the GitHub Pages repository, replacing matching files. Keep all other website files. Verify `register.html`, `progress.html`, `submit.html`, and a unit page.

## Google setup (owner action required)
Each Form > Responses > Link to Sheets > Select existing spreadsheet > choose the private master workbook. Each form must use a distinct response tab. Match teacher records by registered email; avoid publishing the response workbook. File uploads can require a Google sign-in. Test with an external teacher account.

## Limitations
The site does not automatically detect course activity or certify completion. Progress submissions are self-reported; final submissions and rubric approvals must be reviewed by the instructor. The forms were provided by the course owner; their question contents, permissions, and file-upload behavior could not be inspected here.
