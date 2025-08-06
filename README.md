# Thai Audio Test - Language Learning Application

A comprehensive web-based audio test application for learning Thai pronunciation using voice recognition and speech synthesis technologies.

## Features

### 🎯 Core Functionality
- **Speech Synthesis**: Listen to Thai phrases with native pronunciation
- **Voice Recognition**: Record and analyze your Thai pronunciation
- **Real-time Feedback**: Get instant accuracy scores and personalized feedback
- **Progress Tracking**: Monitor your learning progress and improvement over time

### 🎵 Audio Features
- **Text-to-Speech**: High-quality Thai voice synthesis
- **Adjustable Speed**: Normal and slow playback options for better learning
- **Microphone Recording**: Real-time voice capture and analysis
- **Pronunciation Scoring**: Advanced algorithm to measure pronunciation accuracy

### 📚 Learning Content
- **12 Essential Thai Phrases**: From beginner to advanced levels
- **Phonetic Transcriptions**: IPA-style phonetic guides for each phrase
- **English Translations**: Clear meanings for every phrase
- **Difficulty Levels**: Graduated learning progression

### 📊 Progress System
- **Accuracy Scoring**: Percentage-based pronunciation accuracy
- **Performance Levels**: Beginner → Intermediate → Advanced → Expert
- **Statistics Tracking**: Completed phrases and average accuracy
- **Visual Progress Bar**: See your learning advancement

## How to Use

1. **Listen**: Click "Play Phrase" to hear the Thai pronunciation
2. **Practice**: Use "Play Slow" for detailed pronunciation practice
3. **Record**: Click "Start Recording" and repeat the phrase in Thai
4. **Review**: Get your accuracy score and personalized feedback
5. **Progress**: Continue to next phrase or practice again

## Technical Requirements

### Browser Support
- **Chrome**: Full support (recommended)
- **Edge**: Full support
- **Safari**: Full support
- **Firefox**: Limited support (no speech recognition)

### Permissions Required
- **Microphone Access**: Required for voice recording and recognition
- **Internet Connection**: Needed for speech synthesis voices

## Technology Stack

- **HTML5**: Modern semantic markup
- **CSS3**: Responsive design with animations and gradients
- **JavaScript ES6+**: Object-oriented architecture
- **Web Speech API**: Speech recognition and synthesis
- **Font Awesome**: Beautiful icons and UI elements

## Files Structure

```
/
├── index.html          # Main application interface
├── styles.css          # Responsive styling and animations
├── script.js           # Core application logic and speech processing
└── README.md          # Documentation
```

## Features in Detail

### Speech Recognition
- Uses Web Speech API with Thai language support (`th-TH`)
- Real-time voice processing and transcription
- Error handling for various microphone and network issues
- Automatic timeout and session management

### Pronunciation Analysis
- Levenshtein distance algorithm for text similarity
- Character-level comparison for accuracy scoring
- Normalized text processing for consistent results
- Contextual feedback based on performance levels

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Gradient backgrounds and smooth animations
- **Accessibility**: Clear visual feedback and intuitive controls
- **Progress Visualization**: Real-time statistics and progress bars

### Thai Language Database
The application includes 12 carefully selected Thai phrases:

1. **สวัสดีครับ** - Hello (male speaker)
2. **สวัสดีค่ะ** - Hello (female speaker)
3. **ขอบคุณครับ** - Thank you (male speaker)
4. **ขอบคุณค่ะ** - Thank you (female speaker)
5. **ผมชื่อจอห์น** - My name is John
6. **ดิฉันชื่อแมรี่** - My name is Mary
7. **คุณเป็นอย่างไรบ้าง** - How are you?
8. **สบายดีครับ** - I'm fine (male speaker)
9. **ขอโทษครับ** - Excuse me/Sorry (male speaker)
10. **ไม่เป็นไรค่ะ** - It's okay (female speaker)
11. **คุณพูดภาษาไทยได้ไหม** - Can you speak Thai?
12. **ผมพูดได้นิดหน่อย** - I can speak a little (male speaker)

## Getting Started

1. **Open the Application**: Open `index.html` in a supported web browser
2. **Allow Microphone**: Grant microphone permissions when prompted
3. **Start Learning**: Begin with the first phrase and progress through the levels
4. **Practice Regularly**: Use the application consistently for best results

## Performance Tips

- **Use Chrome**: Best browser support for all features
- **Quiet Environment**: Record in a noise-free space for better accuracy
- **Clear Speech**: Speak clearly and at normal pace
- **Regular Practice**: Consistent practice improves recognition accuracy

## Privacy & Security

- **No Data Storage**: All processing happens locally in your browser
- **No Server Communication**: Voice data never leaves your device
- **Temporary Processing**: Audio is processed in real-time and not saved

## Future Enhancements

- Additional phrase categories (numbers, colors, food, etc.)
- Advanced phonetic analysis with tone recognition
- User accounts and long-term progress tracking
- Multiplayer challenges and competitions
- Integration with Thai language learning curricula

## Support

For the best experience:
- Use the latest version of Chrome, Edge, or Safari
- Ensure microphone permissions are granted
- Test with a good quality microphone
- Practice in a quiet environment

---

**Start your Thai language learning journey today!** 🇹🇭
