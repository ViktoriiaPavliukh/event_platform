# EventSpot

Welcome to EventSpot, the event management platform where staff members can post events, while users can seamlessly purchase tickets for their favorite events.

## 📋 Table of Contents

- [🤖 Introduction](#introduction)
- [⚙️ Tech Stack](#tech-stack)
- [🔋 Features](#features)
- [🤸 Quick Start](#quick-start)

## 🤖 Introduction

EventSpot is a platform for discovering and attending a wide range of events. Built with simplicity and convenience in mind, EventSpot offers a curated selection of events, ensuring high-quality experiences for all users.

## ⚙️ Tech Stack

- Node.js
- Next.js
- TypeScript
- Material UI
- Stripe
- Zod
- Google Calendar API
- uploadthing
- MongoDB
- Mongoose

## 🔋 Features

- 👉 Staff-Only Event Creation: Exclusive access for staff members to create and manage events, ensuring high-quality content.
- 👉 Seamless Ticket Purchasing: Users can easily purchase tickets for their desired events with a streamlined checkout process.
- 👉 Secure Authentication: Robust authentication system to ensure user data security and privacy.
- 👉 Intuitive Event Discovery: Effortlessly explore and discover a diverse range of events tailored to your interests.
- 👉 Interactive Event Pages: Engaging event pages with rich media, detailed descriptions, and user-friendly interfaces.
- 👉 Google Calendar Integration: Users who have purchased tickets can conveniently add events to their Google Calendar directly from the platform, ensuring they never miss out on their favorite events.

## 🤸 Quick Start

Get started with EventSpot on your local machine with these simple steps:

**Prerequisites**

- Git
- Node.js
- npm

**Cloning the Repository**

```bash
git clone https://github.com/ViktoriiaPavliukh/event_platform.git
cd eventspot
```

**Installation**
npm install

**Set Up Environment Variables**
Before running the project, you'll need to set up environment variables for the following services. Follow these steps to configure your `.env.local` file:

1. **Stripe**:

   - Obtain your Stripe API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys).
   - Add the following variables to your `.env.local` file:
     ```plaintext
     STRIPE_SECRET_KEY=your_stripe_secret_key
     STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
     ```

2. **Clerk**:

   - Sign up for Clerk to manage authentication and user data.
   - Obtain your Clerk API keys.
   - Add the following variables to your `.env.local` file:
     ```plaintext
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     NEXT_CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
     NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
     ```

3. **MongoDB**:

   - Set up a MongoDB database and obtain your MongoDB connection URI.
   - Add the following variable to your `.env.local` file:
     ```plaintext
     MONGODB_URI=your_mongodb_connection_uri
     ```

4. **UploadThing**:

   - Sign up for UploadThing to manage file uploads.
   - Obtain your UploadThing API keys.
   - Add the following variables to your `.env.local` file:
     ```plaintext
     UPLOADTHING_SECRET=your_uploadthing_secret
     UPLOADTHING_APP_ID=your_uploadthing_app_id
     ```

5. **Google Calendar**:

   - Enable the Google Calendar API for your project in the [Google Cloud Console](https://console.cloud.google.com/).
   - Create credentials and obtain your Google Calendar API key.
   - Add the following variable to your `.env.local` file:
     ```plaintext
     GOOGLE_CALENDAR_CLIENT_ID=your_google_calendar_client_id
     GOOGLE_CALENDAR_CLIENT_SECRET=your_google_calendar_client_secret
     REDIRECT_URL=your_google_calendar_redirect_url
     ```

Replace `your_xxx` with your actual API keys or connection URIs.

Once you've added these environment variables to your `.env.local` file, you're ready to run the project.
