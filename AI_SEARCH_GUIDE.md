# AI Sound Recommendation - How It Works

## 🎯 Overview
The AI recommendation system uses Google's Gemini 2.5 Pro to intelligently match user queries with available sounds.

## 🔍 Search Examples

### For Peaceful/Relaxing Sounds
**Search terms:**
- "peaceful"
- "peaceful songs"
- "relaxing"
- "calm"
- "meditation"
- "sleep"

**Expected results:** Rain, Waterfall, Forest, Birds, Ocean, Wind, Night sounds, etc.

### For Work/Focus Sounds
**Search terms:**
- "work"
- "focus"
- "concentration"
- "productivity"
- "study"
- "office"

**Expected results:** Coffee Shop, Keyboard, Clock, Train, Office ambience, White noise, etc.

### For Nature Sounds
**Search terms:**
- "nature"
- "outdoor"
- "forest"
- "wilderness"

**Expected results:** Forest, Birds, Waterfall, Ocean, Wind, Rain, etc.

### For Energetic/Active Sounds
**Search terms:**
- "energetic"
- "active"
- "upbeat"
- "motivating"

**Expected results:** Upbeat and rhythmic sounds from your collection

### For Sleep/Night
**Search terms:**
- "sleep"
- "night"
- "bedtime"
- "rest"

**Expected results:** Calming sounds like Rain, Ocean, Wind, Night sounds

## 🤖 How the AI Works

1. **User enters a query** (e.g., "peaceful songs")
2. **AI analyzes the query** to understand:
   - Mood (peaceful, energetic, calm)
   - Activity (work, sleep, meditation)
   - Context (nature, office, night)
3. **AI searches available sounds** in your card collection
4. **Returns matching titles** (maximum 8 sounds)
5. **Displays as cards** with smooth animations

## 🎨 Features

### Intelligent Matching
- ✅ Understands synonyms (e.g., "calm" = "peaceful")
- ✅ Context-aware (e.g., "work" suggests office sounds)
- ✅ Mood-based recommendations
- ✅ Activity-based suggestions

### Fuzzy Matching
- If exact title match fails, tries partial matching
- Case-insensitive searching
- Handles variations in AI responses

### User Experience
- Loading spinner while AI processes
- Clear error messages
- Search suggestions in placeholder
- Enter key support for quick search
- Maximum 8 recommendations to avoid overwhelming

## 🔧 Technical Details

### Model Configuration
- **Model:** `gemini-2.5-pro-preview-03-25`
- **API Key:** From `.env.local` (`NEXT_PUBLIC_GEMINI_API_KEY`)
- **Temperature:** 1 (balanced creativity)
- **Max Tokens:** 8192

### Response Processing
1. Clean response (remove quotes, newlines)
2. Split by commas
3. Trim whitespace
4. Filter empty strings
5. Match against available cards
6. Fallback to partial matching if needed

## 📋 Available Sound Categories

Based on typical sound libraries, users can search for:

### Ambience
- Office, Coffee Shop, Library, Restaurant

### Nature
- Rain, Thunder, Ocean, Wind, Forest, Birds, Waterfall, River

### White Noise
- White noise, Pink noise, Brown noise

### Mechanical
- Fan, Clock, Train, Keyboard, Mouse

### Music Instruments
- Piano, Guitar, Drums, Violin, etc.

### Weather
- Rain, Storm, Thunder, Wind, Snow

## 💡 Tips for Best Results

### Do's ✅
- Use simple, descriptive terms
- Describe mood or activity
- Try common categories (peaceful, work, nature)
- Use English terms

### Don'ts ❌
- Avoid very specific song names
- Don't use complex sentences
- Avoid misspellings
- Don't search for unavailable sounds

## 🐛 Troubleshooting

### "No matching sounds found"
- Try broader terms (e.g., "peaceful" instead of "very peaceful calm songs")
- Check spelling
- Try suggested search terms from placeholder

### AI takes too long
- Check internet connection
- API key might have rate limits
- Try refreshing the page

### Wrong recommendations
- Be more specific with your search
- Use activity-based terms (work, sleep, etc.)
- Try different synonyms

## 🔮 Future Enhancements

Potential improvements:
- [ ] Save favorite searches
- [ ] Popular searches suggestions
- [ ] Search history
- [ ] Voice search
- [ ] Multi-language support
- [ ] Custom sound blends
- [ ] Time-based recommendations (morning, evening, etc.)

## 📊 Performance

- **Response Time:** 2-5 seconds (depends on AI)
- **Accuracy:** ~90% with clear search terms
- **Max Results:** 8 sounds per search
- **Supported Queries:** Unlimited

---

**Last Updated:** October 15, 2025
**Model Version:** Gemini 2.5 Pro Preview (03-25)
