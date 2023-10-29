
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

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setting Up Firebase Environment Variables](#setting-up-firebase-environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Gitpod](#gitpod)

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

## Gitpod

Welcome to Gitpod, your cloud-ready development environment where you can start coding directly and see your changes in action on a live server, all without the need to clone the repository. Here's a guide to help you set up and run your app using Gitpod, specifically addressing the need for Firebase environment variables.

### Setting Up Environment Variables in Gitpod for Firebase
Before running the app, it's essential to set up Firebase environment variables to ensure the proper functioning of your application. For more detailed information about setting up environment variables in Gitpod, refer to the official Gitpod documentation on [Configuring Projects - Environment Variables](https://www.gitpod.io/docs/configure/projects/environment-variables).


1. **Access Gitpod Projects:**
Navigate to  [Gitpod Projects](https://gitpod.io/projects) and ensure you are logged into your GitHub account.

2. **Create a New Gitpod Project:**
Click on "New Project" and search for the HarmonyCode repository (fork it if necessary). Choose the HarmonyCode repository.

3. **Access Project Settings:**
Once the project is created, go to project settings.

4. **Configure Environment Variables:**
Navigate to the "Variables" section in project settings.

5. **Set Firebase Environment Variables:**
Add the following Firebase configuration variables:
   ```env
      NEXT_PUBLIC_API_KEY=<Your-API-Key>
      NEXT_PUBLIC_AUTH_DOMAIN=<Your-Auth-Domain>
      NEXT_PUBLIC_PROJECT_ID=<Your-Project-ID>
      NEXT_PUBLIC_STORAGE_BUCKET=<Your-Storage-Bucket>
      NEXT_PUBLIC_MESSAGING_SENDER_ID=<Your-Messaging-Sender-ID>
      NEXT_PUBLIC_APP_ID=<Your-App-ID>
   ```

  - Replace `<Your-API-Key>`, `<Your-Auth-Domain>`, etc., with the respective Firebase configuration values. Refer to the "Setting Up Firebase Environment Variables" section for details.

6. **Create a Workspace from the Main Branch:**
Hover over the "main" branch and click on "Create a new workspace".Click "Continue" to set up the workspace.

7. **Verify Environment Variables:**
Open the terminal in Gitpod and type `gp env` to verify if the environment variables are correctly set.

8. **Start the Application:**
Start your application by running the command npm run dev.

## Acknowledgement

Hey, I am Dhanush N,the maintainer of this opensource repository. You can connect with me and support or follow my work via [Twitter](https://twitter.com/Dhanush_Nehru) / [Instagram](https://www.instagram.com/dhanush_nehru/) / [Youtube](https://www.youtube.com/@dhanushnehru?sub_confirmation=1) / [Github](https://github.com/DhanushNehru)

If you liked this project support it by starring it 🌟 and share it on social media
