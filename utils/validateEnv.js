// Environment variable validation for production builds
// This helps catch missing environment variables during build time

const requiredEnvVars = {
  // Firebase (required for auth)
  NEXT_PUBLIC_FIREBASE_API_KEY: 'Firebase API Key',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'Firebase Auth Domain', 
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'Firebase Project ID',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'Firebase Storage Bucket',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: 'Firebase Messaging Sender ID',
  NEXT_PUBLIC_FIREBASE_APP_ID: 'Firebase App ID',
  
  // Gemini AI (required for recommendations)
  NEXT_PUBLIC_GEMINI_API_KEY: 'Google Gemini API Key',
};

const optionalEnvVars = {
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'Firebase Analytics Measurement ID',
  NEXT_PUBLIC_GEMINI_MODEL_ID: 'Custom Gemini Model ID',
};

export const validateEnvironment = () => {
  const missing = [];
  const warnings = [];

  // Check required variables
  Object.entries(requiredEnvVars).forEach(([key, description]) => {
    if (!process.env[key] || process.env[key].includes('placeholder')) {
      missing.push(`${key} (${description})`);
    }
  });

  // Check optional variables (warnings only)
  Object.entries(optionalEnvVars).forEach(([key, description]) => {
    if (!process.env[key]) {
      warnings.push(`${key} (${description})`);
    }
  });

  if (missing.length > 0) {
    const errorMsg = `❌ Missing required environment variables:\n${missing.map(v => `  - ${v}`).join('\n')}`;
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error(errorMsg);
    } else {
      console.error(errorMsg);
      console.error('\n📋 Please check your .env.local file and ensure all required variables are set.');
    }
  }

  if (warnings.length > 0 && process.env.NODE_ENV !== 'production') {
    console.warn(`⚠️ Optional environment variables not set:\n${warnings.map(v => `  - ${v}`).join('\n')}`);
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Environment validation complete');
  }
};

export default validateEnvironment;