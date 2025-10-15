// Script to list available Gemini AI models
// Run this to see which models your API key has access to

require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  
  if (!apiKey) {
    console.error("❌ Error: No API key found!");
    console.error("Make sure NEXT_PUBLIC_GEMINI_API_KEY or GOOGLE_API_KEY is set in your .env.local file");
    process.exit(1);
  }

  console.log("🔑 Using API Key (hidden for security)");
  console.log("\n📋 Fetching available models...\n");

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try to list models using the API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    if (!response.ok) {
      console.error(`❌ Error: ${response.status} ${response.statusText}`);
      const errorData = await response.json();
      console.error("Error details:", JSON.stringify(errorData, null, 2));
      return;
    }

    const data = await response.json();
    
    if (!data.models || data.models.length === 0) {
      console.log("⚠️  No models found for this API key");
      return;
    }

    console.log(`✅ Found ${data.models.length} models:\n`);
    
    data.models.forEach((model, index) => {
      console.log(`${index + 1}. ${model.name}`);
      console.log(`   Display Name: ${model.displayName || "N/A"}`);
      console.log(`   Description: ${model.description || "N/A"}`);
      
      if (model.supportedGenerationMethods) {
        console.log(`   Supported Methods: ${model.supportedGenerationMethods.join(", ")}`);
      }
      
      console.log("");
    });

    // Highlight models that support generateContent
    console.log("\n🎯 Recommended models for your use case (support generateContent):\n");
    
    const contentGenModels = data.models.filter(model => 
      model.supportedGenerationMethods && 
      model.supportedGenerationMethods.includes("generateContent")
    );

    if (contentGenModels.length > 0) {
      contentGenModels.forEach(model => {
        // Extract just the model name (without the "models/" prefix)
        const modelName = model.name.replace("models/", "");
        console.log(`   ✓ ${modelName}`);
      });
      
      console.log("\n💡 Update your AiRecommendation.js to use one of these models:");
      console.log(`   model: "${contentGenModels[0].name.replace("models/", "")}"`);
    } else {
      console.log("   ⚠️  No models found that support generateContent");
    }

  } catch (error) {
    console.error("\n❌ Error fetching models:", error.message);
    
    if (error.message.includes("fetch")) {
      console.error("\n💡 Make sure you have internet connection");
    }
    
    if (error.message.includes("API key")) {
      console.error("\n💡 Your API key might be invalid or expired");
      console.error("Generate a new one at: https://aistudio.google.com/app/apikey");
    }
  }
}

// Run the script
listModels().catch(console.error);
