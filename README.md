
<h1 align='center'>HarmonyCode</h1>
<div align="center">
 <p>
  
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)
![Visitors](https://api.visitorbadge.io/api/visitors?path=DhanushNehru%2FHarmonyCode%20&countColor=%23263759&style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/DhanushNehru/HarmonyCode?style=for-the-badge)
![GitHub Repo stars](https://img.shields.io/github/stars/DhanushNehru/HarmonyCode?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/DhanushNehru/HarmonyCode?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/DhanushNehru/HarmonyCode?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/DhanushNehru/HarmonyCode?style=for-the-badge)
![Github](https://img.shields.io/github/license/DhanushNehru/HarmonyCode?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/DhanushNehru/HarmonyCode?style=for-the-badge)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/DhanushNehru/HarmonyCode?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/DhanushNehru/HarmonyCode?style=for-the-badge)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/DhanushNehru/HarmonyCode?style=for-the-badge)
  
 </p>
 </div>

<h2 align='center'> Music for your coding 🎵</h2>

<div align="center">
  
[![Join Our Discord](https://img.shields.io/badge/Discord-Join%20Server-blue?logo=discord&style=for-the-badge)](https://discord.com/invite/Yn9g6KuWyA)
[![Subscribe on YouTube](https://img.shields.io/badge/YouTube-Subscribe-red?logo=youtube&style=for-the-badge)](https://www.youtube.com/@dhanushnehru?sub_confirmation=1)
[![Subscribe to Newsletter](https://img.shields.io/badge/Newsletter-Subscribe-orange?style=for-the-badge)](https://dhanushn.substack.com/)
</br>
<a href="https://www.producthunt.com/products/harmony-code?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-harmony&#0045;code" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=995359&theme=light&t=1753034697815" alt="Harmony&#0032;Code - Harmony&#0032;code&#0032;is&#0032;a&#0032;platform&#0032;that&#0032;blends&#0032;music&#0032;with&#0032;coding | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

</div>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setting Up Firebase Environment Variables](#setting-up-firebase-environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Setting Up Firebase Environment Variables and Enabling Authentication

To run this project, you need to set up environment variables for Firebase. These variables contain sensitive information and should not be hard-coded in your codebase. Follow these steps to set up the required environment variables:

1. **Create a Firebase Project**:
   - If you haven't already, create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).

2. **Obtain Firebase Configuration**:
   - In the Firebase Console, select your project.
   - Go to Project settings (gear icon) > General.
   - Under the "Your apps" section, select the web app you are using for this project.
   - You will find the Firebase configuration object, which includes the following properties:

     - `apiKey`
     - `authDomain`
     - `projectId`
     - `storageBucket`
     - `messagingSenderId`
     - `appId`

3. **Set Up Environment Variables**:
   - In your project directory, create a `.env.local` file (if it doesn't already exist).

   - Add the following lines to the `.env.local` file:

     ```env
     NEXT_PUBLIC_API_KEY=<Your-API-Key>
     NEXT_PUBLIC_AUTH_DOMAIN=<Your-Auth-Domain>
     NEXT_PUBLIC_PROJECT_ID=<Your-Project-ID>
     NEXT_PUBLIC_STORAGE_BUCKET=<Your-Storage-Bucket>
     NEXT_PUBLIC_MESSAGING_SENDER_ID=<Your-Messaging-Sender-ID>
     NEXT_PUBLIC_APP_ID=<Your-App-ID>
     NEXT_PUBLIC_GEMINI_API_KEY=<your-gemini-api>
     ```

   Replace `<Your-API-Key>`, `<Your-Auth-Domain>`, etc., with the respective values you obtained from Firebase.

   - Save the `.env.local` file.

4. **Load Environment Variables**:
   - Ensure that you have a method to load environment variables in your Next.js application. You can use packages like `dotenv` or Vercel's built-in support for environment variables.

5. **Enabling Authentication**:

   **Google Authentication**:
   
   1. Go to the Firebase Console and select your project.
   2. Navigate to the "Authentication" section and click on the "Sign-in method" tab.
   3. Click on "Add new provider", then find "Google" and enable it. Configure OAuth consent screen details if required.
   4. Google Authentication is now enabled in your project.

     For detailed instructions, refer to the Firebase's [Google Authentication documentation](https://firebase.google.com/docs/auth/web/google-signin).

   **Github Authentication**:

   1. Go to the [GitHub Developer Settings](https://github.com/settings/developers) and create a new GitHub OAuth application.
   2. Set the "Application Name", "Homepage URL" and ensure the "Authorization callback URL" matches your Firebase project's settings. Register the application.
   3. Note the "Client ID" and "Client Secret."
   4. In the Firebase Console, on your project, navigate to the "Authentication" section.
   5. Enable GitHub Authentication in the "Sign-in method" tab by providing the "Client ID" and "Client Secret" obtained from GitHub. Configure OAuth consent screen details if required.
   6. Github Authentication is now enabled in your project.

    For detailed instructions, refer to the Firebase's [GitHub Authentication documentation](https://firebase.google.com/docs/auth/web/github-auth).
   
6. **Start Your Application**:
   - You can now start your Next.js application. The Firebase configuration will be loaded from the environment variables you set up.

## Usage

Provide information on how to use your project once the environment variables are set up correctly.

## Contributing

We welcome contributions from the community! If you're interested in contributing to this project, please read our [contribution guidelines](CONTRIBUTING.md).


## License

This project is licensed under the [License Name] - see the [LICENSE.md](LICENSE.md) file for details.
 and contributions are welcome!

---
## Best Contributors

<div align="center">
    <a  href="https://github.com/DhanushNehru/HarmonyCode/graphs/contributors">
        <img src="https://contrib.rocks/image?repo=DhanushNehru/HarmonyCode&anon=1" />
    </a>
</div>

</br>

<div align="center">
  If you liked this project support it by starring it 🌟 and share it on social media
</div>
