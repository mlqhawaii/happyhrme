HappyHr.Me Admin setup

1) Run HappyHrMe_ADMIN_CONTACT_MIGRATION.sql once in Supabase SQL Editor.

2) In Vercel -> HappyHrMe project -> Settings -> Environment Variables, add:
   ADMIN_PASSWORD
      A strong password you will use to log into /admin
   ADMIN_SESSION_SECRET
      A long random secret (32+ characters; different from the password)
   SUPABASE_SERVICE_ROLE_KEY
      Supabase -> Project Settings -> API Keys -> service_role / secret key
      IMPORTANT: this must ONLY be placed in Vercel environment variables.
      Never place it in app.js or any browser-visible file.
   SUPABASE_URL
      Optional. The existing project URL is used as a fallback.

3) Redeploy after adding the environment variables.

4) Open:
   https://happyhr.me/admin

The admin dashboard can:
- filter pending / reviewed / applied / rejected
- filter new venue / correction / contact
- view submitted address, source URL, and contact email
- add private admin notes
- Approve / reviewed
- Mark applied / published
- Reject
- Return to pending

Website contact messages now go into the same happy_hour_submissions queue with type "contact".

NOTE: "Approve / reviewed" does NOT automatically create or overwrite a happy_hours venue.
That remains deliberate until venue-field validation is fully defined. "Mark applied" means you have
made the corresponding database change and the submission can leave the pending queue.
