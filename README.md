# Seizure Tracker

An installable web app for timing and recording seizures, prompting care-plan steps (VNS, rescue medication, 999), tracking recovery, and sharing a log with a child's care team.

- Open the app's GitHub Pages address in Chrome on Android and choose **Install app**.
- In "this phone only" mode, records stay on the phone. Videos always stay on the phone that recorded them.
- This repository holds only the app's code. It contains no seizure records or personal data.

A record-keeping and reminder tool that follows the child's own care plan. It is not medical advice and does not replace the care plan.

## Backend (Firebase)

- Signed-in mode stores records in Cloud Firestore (europe-west2, London) and uses Firebase Authentication (Google, or a passwordless email link).
- Access is per child and enforced by `firestore.rules`: owner, carer, logger, viewer. Invites are single-use links that expire after 7 days.
- `firestore.rules` must be published in the Firebase console (Firestore → Rules) whenever it changes.
- The app's address must be listed in Firebase Authentication → Settings → Authorised domains.
