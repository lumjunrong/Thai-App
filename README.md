# Thai Learning App 🇹🇭

A comprehensive mobile-first web application for learning Thai language, focusing on tone recognition, vocabulary building, and practical conversation skills.

## Features

### 📚 **Flashcard System with Spaced Repetition**
- Smart algorithm adjusts review intervals based on your performance
- Tracks your progress and optimizes learning efficiency
- Audio pronunciation for every word
- Difficulty-based scheduling (easy, medium, hard)

### 🎵 **Tone Recognition Game**
- Interactive exercises for mastering Thai's 5 tones
- Visual tone indicators with audio feedback
- Progressive difficulty levels
- Real-time scoring and feedback

### 💬 **Conversation Practice**
- **Everyday Thai**: Essential phrases for daily interactions
- **Business Thai**: Professional vocabulary and formal expressions
- Contextual usage examples
- Click-to-hear pronunciation

### 📱 **Progressive Web App (PWA)**
- Works offline after initial load
- Install on mobile devices like a native app
- Responsive design optimized for mobile learning
- Local storage preserves your progress

## Getting Started

### Quick Start
1. Open `index.html` in a web browser
2. Start with flashcards to build vocabulary
3. Practice tone recognition to master pronunciation
4. Use conversation sections for practical phrases

### For Development
```bash
# Serve locally (recommended for PWA features)
python -m http.server 8000
# or
npx serve .
```

## Learning Structure

### Vocabulary Categories
- **Greetings & Politeness**: สวัสดี, ขอบคุณ, ครับ/ค่ะ
- **Numbers**: หนึ่ง, สอง, สาม
- **Business**: ประชุม, บริษัท, ลูกค้า
- **Food & Dining**: อาหาร, น้ำ, ข้าว

### Thai Tone System
- **Mid Tone** (◯): Flat, neutral
- **Low Tone** (◌̀): Lower than mid tone
- **Falling Tone** (◌̂): Starts high, falls down
- **High Tone** (◌́): Higher than mid tone
- **Rising Tone** (◌̌): Starts low, rises up

## Usage Tips

### For Best Results:
1. **Daily Practice**: Spend 10-15 minutes daily
2. **Audio Focus**: Always listen to pronunciations
3. **Tone Emphasis**: Pay special attention to tone exercises
4. **Context Learning**: Use conversation phrases in real situations

### Mobile Usage:
- Add to home screen for app-like experience
- Works offline after first visit
- Optimized for touch interactions
- Portrait orientation recommended

## Technical Features

### Built With:
- **HTML5/CSS3**: Modern responsive design
- **Vanilla JavaScript**: No dependencies, fast loading
- **Web Speech API**: Text-to-speech pronunciation
- **Local Storage**: Offline progress tracking
- **Service Worker**: PWA functionality

### Browser Support:
- Chrome/Edge (recommended for best audio support)
- Firefox
- Safari
- Mobile browsers

## File Structure

```
thai-learning-app/
├── index.html          # Main app interface
├── styles.css          # Mobile-first responsive styles
├── app.js             # Core application logic
├── data.js            # Thai language content and vocabulary
├── manifest.json      # PWA configuration
├── sw.js             # Service worker for offline support
└── README.md         # This file
```

## Learning Progress

The app tracks:
- **Cards Reviewed**: Total flashcards studied
- **Tone Accuracy**: Correct tone identifications
- **Streak Counter**: Consecutive days of practice
- **Points System**: Gamified progress tracking

## Future Enhancements

- [ ] More vocabulary categories (family, travel, etc.)
- [ ] Advanced conversation scenarios
- [ ] Writing practice (Thai script)
- [ ] Voice recognition for pronunciation practice
- [ ] Social features and leaderboards

## Contributing

Feel free to contribute by:
- Adding more vocabulary and phrases
- Improving the tone recognition algorithm
- Enhancing the UI/UX
- Adding new learning modules

## License

This project is open source and available under the MIT License.

---

**Happy Learning! สนุกกับการเรียน! 🎉**

*Start your Thai language journey today with interactive flashcards, tone recognition games, and practical conversation practice.*