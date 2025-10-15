# AI Recommendation Setup Guide

## ✅ What's Been Configured

### 1. AI Model Setup
- **Model**: `gemini-1.5-flash` (Fast and efficient)
- **API Key**: Configured in `.env.local`
- **Location**: `components/AiRecommendation.js`

### 2. Features Implemented

#### Search Functionality
- Text input for mood/activity descriptions
- Enter key support for quick search
- Real-time search with AI recommendations

#### Loading States
- Animated spinner while AI processes request
- Disabled input during loading
- Loading message: "🤖 AI is thinking..."

#### Error Handling
- User-friendly error messages
- API key validation
- Model availability checks
- Empty search validation

#### UI Enhancements
- Dark mode support
- Responsive design
- Smooth animations with react-spring
- Empty state messages
- Search suggestions in placeholder

### 3. How It Works

1. **User enters a search query** (e.g., "relaxing evening", "focus work", "peaceful sleep")
2. **AI analyzes the query** using Gemini 1.5 Flash model
3. **Returns matching sound titles** from your sound library
4. **Displays recommended sounds** as animated cards (max 5)
5. **User can play the sounds** directly from the recommendations

### 4. Example Search Queries

Try these searches:
- "relaxing evening"
- "focus and concentration"
- "peaceful sleep"
- "energetic morning"
- "meditation and calm"
- "nature sounds"
- "stress relief"
- "background ambience"

### 5. Configuration Files

#### Environment Variables (`.env.local`)
```bash
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyDnqz_rdb4diwG9tgdGzXbwFgVqGc-QKIU
```

#### Firebase Config (`.env.local`)
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBiVe1x5vKjP9bp_-yCBtaIqOeXhsDXM20
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=harmony-code-24740.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=harmony-code-24740
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=harmony-code-24740.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=355825664657
NEXT_PUBLIC_FIREBASE_APP_ID=1:355825664657:web:06d994acb64bcb85747530
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-4P789N7E9L
```

## 🚀 How to Use

### Start the Development Server
```powershell
cd "C:\Users\ami05\OneDrive\Desktop\Harmonycode\Harmonycode"
npm run dev
```

### Access the App
Open: http://localhost:3000

### Use AI Recommendations
1. Look for the "AI Sound Recommendation" section
2. Type your mood or activity in the search box
3. Press Enter or click the search icon
4. Wait for AI to generate recommendations
5. Play the recommended sounds

## 🔧 Troubleshooting

### If you get 404 Model Error:
- Your API key might not have access to `gemini-1.5-flash`
- Try regenerating your API key at: https://aistudio.google.com/app/apikey
- Make sure the key has "Generative Language API" enabled

### If Firebase Auth doesn't work:
1. Go to Firebase Console: https://console.firebase.google.com/project/harmony-code-24740
2. Enable Authentication
3. Enable Google Sign-in provider
4. Add `localhost` to authorized domains

### If environment variables aren't loading:
1. Make sure `.env.local` is in the root directory (next to `package.json`)
2. Restart the dev server completely (Ctrl+C then `npm run dev`)
3. Clear browser cache and reload

## 📝 Current Model Options

If `gemini-1.5-flash` doesn't work, you can try:
- `gemini-1.5-pro` (slower but more accurate)
- `gemini-pro` (older stable version)

Change in `components/AiRecommendation.js` line 56.

## 🎨 Customization

### Change Maximum Recommendations
Edit line 91 in `AiRecommendation.js`:
```javascript
cleanedResponse = cleanedResponse.slice(0, 5); // Change 5 to any number
```

### Modify AI Prompt
Edit the prompt in lines 71-78 to change how AI interprets searches.

### Adjust Animation Speed
Modify the `transition` config at line 148:
```javascript
config: { tension: 220, friction: 120 }, // Adjust these values
trail: 130, // Adjust delay between animations
```

## 📦 Dependencies

All required packages are already installed:
- `@google/generative-ai` - For Gemini API
- `@react-spring/web` - For animations
- `firebase` - For authentication
- `react-icons` - For UI icons

## 🔐 Security Notes

- `.env.local` is in `.gitignore` - your keys are safe
- Never commit API keys to the repository
- Regenerate keys if accidentally exposed
- Use Firebase security rules for production

## ✨ Features to Add (Optional)

- [ ] Save favorite searches
- [ ] Search history
- [ ] Share recommendations
- [ ] Custom sound blends
- [ ] Export recommendations
- [ ] Voice search input

---

**Status**: ✅ Ready to use! The AI recommendation search is fully set up and configured.
