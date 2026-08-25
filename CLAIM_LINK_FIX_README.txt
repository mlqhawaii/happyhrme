HappyHr.Me claim-link initialization fix

Problem: app.js loaded before #claimModal existed in the DOM, causing the owner-claim initializer to return early.
Fix: claim modal markup now loads before app.js, so list Claim buttons, map popup Claim venue buttons, and ?claim=1 owner CTAs initialize correctly.
No database migration changes required.
