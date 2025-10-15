// Gemini AI model configuration constants
export const GEMINI_CONFIG = {
  // Default model - can be overridden by environment variable
  DEFAULT_MODEL: "gemini-2.5-pro-preview-03-25",
  
  // Generation configuration
  GENERATION_CONFIG: {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  },

  // Available fallback models (in order of preference)
  FALLBACK_MODELS: [
    "gemini-2.5-pro-preview-03-25",
    "gemini-1.5-pro-latest",
    "gemini-1.5-pro",
    "gemini-pro",
  ],
};

// Get the model ID from environment or use default
export const getGeminiModelId = () => {
  return process.env.NEXT_PUBLIC_GEMINI_MODEL_ID || GEMINI_CONFIG.DEFAULT_MODEL;
};