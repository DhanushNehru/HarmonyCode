
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

<h2 align='center'> Hacktoberfest Music for your coding 🎵</h2>

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

### Setting Up Firebase Environment Variables

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

5. **Start Your Application**:
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

In the cloud-free development environment where you can directly start coding. 

You can use Gitpod in the cloud [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/DhanushNehru/HarmonyCode) 

This will automatically start live server in the browser.

You can make changes and see how it behaves on the go without cloning the repo. 

## Acknowledgement

If you liked this project support it by starring it 🌟 and share it on social media
