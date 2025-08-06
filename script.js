// Thai Audio Test Application
class ThaiAudioTest {
    constructor() {
        this.currentPhraseIndex = 0;
        this.phrasesCompleted = 0;
        this.totalAccuracy = 0;
        this.isRecording = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.recordingTimer = null;
        this.recordingStartTime = null;
        
        // Thai phrases database with phonetic and English translations
        this.phrases = [
            {
                thai: "สวัสดีครับ",
                english: "Hello (male speaker)",
                phonetic: "sà-wàt-dii khráp",
                difficulty: "beginner"
            },
            {
                thai: "สวัสดีค่ะ",
                english: "Hello (female speaker)", 
                phonetic: "sà-wàt-dii khâ",
                difficulty: "beginner"
            },
            {
                thai: "ขอบคุณครับ",
                english: "Thank you (male speaker)",
                phonetic: "khɔ̀ɔp-khun khráp",
                difficulty: "beginner"
            },
            {
                thai: "ขอบคุณค่ะ",
                english: "Thank you (female speaker)",
                phonetic: "khɔ̀ɔp-khun khâ",
                difficulty: "beginner"
            },
            {
                thai: "ผมชื่อจอห์น",
                english: "My name is John (male speaker)",
                phonetic: "phǒm chɯ̂ɯ jɔɔn",
                difficulty: "intermediate"
            },
            {
                thai: "ดิฉันชื่อแมรี่",
                english: "My name is Mary (female speaker)",
                phonetic: "dì-chǎn chɯ̂ɯ mɛɛ-rii",
                difficulty: "intermediate"
            },
            {
                thai: "คุณเป็นอย่างไรบ้าง",
                english: "How are you?",
                phonetic: "khun pen yàaŋ-rai bâaŋ",
                difficulty: "intermediate"
            },
            {
                thai: "สบายดีครับ",
                english: "I'm fine (male speaker)",
                phonetic: "sà-baai dii khráp",
                difficulty: "beginner"
            },
            {
                thai: "ขอโทษครับ",
                english: "Excuse me/Sorry (male speaker)",
                phonetic: "khɔ̌ɔ-thôot khráp",
                difficulty: "beginner"
            },
            {
                thai: "ไม่เป็นไรค่ะ",
                english: "It's okay (female speaker)",
                phonetic: "mâi pen rai khâ",
                difficulty: "intermediate"
            },
            {
                thai: "คุณพูดภาษาไทยได้ไหม",
                english: "Can you speak Thai?",
                phonetic: "khun phûut phaa-sǎa thai dâi mǎi",
                difficulty: "advanced"
            },
            {
                thai: "ผมพูดได้นิดหน่อย",
                english: "I can speak a little (male speaker)",
                phonetic: "phǒm phûut dâi nít-nɔ̀i",
                difficulty: "advanced"
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupSpeechRecognition();
        this.displayCurrentPhrase();
        this.updateProgress();
        this.checkBrowserSupport();
    }
    
    checkBrowserSupport() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showFeedback('Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.', 'poor');
            document.getElementById('recordButton').disabled = true;
        }
        
        if (!this.synthesis) {
            this.showFeedback('Your browser does not support speech synthesis.', 'poor');
            document.getElementById('playButton').disabled = true;
            document.getElementById('slowPlayButton').disabled = true;
        }
    }
    
    setupEventListeners() {
        // Audio control buttons
        document.getElementById('playButton').addEventListener('click', () => this.playPhrase(1.0));
        document.getElementById('slowPlayButton').addEventListener('click', () => this.playPhrase(0.7));
        
        // Recording control buttons
        document.getElementById('recordButton').addEventListener('click', () => this.startRecording());
        document.getElementById('stopButton').addEventListener('click', () => this.stopRecording());
        
        // Action buttons
        document.getElementById('nextPhraseButton').addEventListener('click', () => this.nextPhrase());
        document.getElementById('repeatPhraseButton').addEventListener('click', () => this.repeatPhrase());
    }
    
    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'th-TH'; // Thai language
            
            this.recognition.onstart = () => {
                this.onRecordingStart();
            };
            
            this.recognition.onresult = (event) => {
                const result = event.results[0][0].transcript;
                this.onRecognitionResult(result);
            };
            
            this.recognition.onerror = (event) => {
                this.onRecognitionError(event.error);
            };
            
            this.recognition.onend = () => {
                this.onRecordingEnd();
            };
        }
    }
    
    playPhrase(rate = 1.0) {
        if (this.synthesis.speaking) {
            this.synthesis.cancel();
        }
        
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        const utterance = new SpeechSynthesisUtterance(currentPhrase.thai);
        
        // Try to find Thai voice, fallback to default
        const voices = this.synthesis.getVoices();
        const thaiVoice = voices.find(voice => voice.lang.includes('th')) || 
                         voices.find(voice => voice.lang.includes('TH'));
        
        if (thaiVoice) {
            utterance.voice = thaiVoice;
        }
        
        utterance.rate = rate;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onstart = () => {
            const button = rate === 1.0 ? document.getElementById('playButton') : document.getElementById('slowPlayButton');
            button.innerHTML = '<i class="fas fa-pause"></i> Playing...';
            button.disabled = true;
        };
        
        utterance.onend = () => {
            const button = rate === 1.0 ? document.getElementById('playButton') : document.getElementById('slowPlayButton');
            const icon = rate === 1.0 ? 'play' : 'play';
            const text = rate === 1.0 ? 'Play Phrase' : 'Play Slow';
            button.innerHTML = `<i class="fas fa-${icon}"></i> ${text}`;
            button.disabled = false;
        };
        
        this.synthesis.speak(utterance);
    }
    
    startRecording() {
        if (!this.recognition) {
            this.showFeedback('Speech recognition not available', 'poor');
            return;
        }
        
        try {
            this.recognition.start();
        } catch (error) {
            console.error('Recognition start error:', error);
            this.showFeedback('Could not start recording. Please try again.', 'poor');
        }
    }
    
    stopRecording() {
        if (this.recognition && this.isRecording) {
            this.recognition.stop();
        }
    }
    
    onRecordingStart() {
        this.isRecording = true;
        this.recordingStartTime = Date.now();
        
        // Update UI
        document.getElementById('recordButton').disabled = true;
        document.getElementById('stopButton').disabled = false;
        
        const indicator = document.getElementById('recordingIndicator');
        indicator.innerHTML = '<i class="fas fa-circle"></i> Recording...';
        indicator.classList.add('recording');
        
        // Start timer
        this.startRecordingTimer();
        
        // Clear previous results
        document.getElementById('recognizedText').textContent = 'Listening...';
        document.getElementById('accuracyScore').textContent = '--';
        document.getElementById('feedbackMessage').textContent = '';
    }
    
    onRecordingEnd() {
        this.isRecording = false;
        
        // Update UI
        document.getElementById('recordButton').disabled = false;
        document.getElementById('stopButton').disabled = true;
        
        const indicator = document.getElementById('recordingIndicator');
        indicator.innerHTML = '<i class="fas fa-circle"></i> Ready to record';
        indicator.classList.remove('recording');
        
        // Stop timer
        this.stopRecordingTimer();
    }
    
    onRecognitionResult(recognizedText) {
        document.getElementById('recognizedText').textContent = recognizedText;
        
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        const accuracy = this.calculateAccuracy(currentPhrase.thai, recognizedText);
        
        this.displayAccuracy(accuracy);
        this.showFeedback(this.getFeedbackMessage(accuracy), this.getFeedbackClass(accuracy));
        
        // Update statistics
        this.phrasesCompleted++;
        this.totalAccuracy += accuracy;
        this.updateProgress();
    }
    
    onRecognitionError(error) {
        console.error('Recognition error:', error);
        
        let message = 'Recognition error occurred. ';
        switch(error) {
            case 'no-speech':
                message += 'No speech was detected. Please try again.';
                break;
            case 'audio-capture':
                message += 'No microphone was found. Please check your microphone.';
                break;
            case 'not-allowed':
                message += 'Microphone access was denied. Please allow microphone access.';
                break;
            case 'network':
                message += 'Network error occurred. Please check your connection.';
                break;
            default:
                message += 'Please try again.';
        }
        
        this.showFeedback(message, 'poor');
        document.getElementById('recognizedText').textContent = 'Recognition failed';
    }
    
    calculateAccuracy(original, recognized) {
        // Simple similarity calculation based on character matching
        // This is a basic implementation - in production, you'd want more sophisticated
        // phonetic matching for Thai language
        
        const normalizeText = (text) => {
            return text.toLowerCase().trim().replace(/\s+/g, '');
        };
        
        const orig = normalizeText(original);
        const recog = normalizeText(recognized);
        
        if (orig === recog) return 100;
        
        // Calculate Levenshtein distance
        const distance = this.levenshteinDistance(orig, recog);
        const maxLength = Math.max(orig.length, recog.length);
        
        if (maxLength === 0) return 100;
        
        const similarity = ((maxLength - distance) / maxLength) * 100;
        return Math.max(0, Math.round(similarity));
    }
    
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }
    
    displayAccuracy(accuracy) {
        const scoreElement = document.getElementById('accuracyScore');
        scoreElement.textContent = accuracy + '%';
        
        // Remove existing classes
        scoreElement.classList.remove('score-excellent', 'score-good', 'score-fair', 'score-poor');
        
        // Add appropriate class
        if (accuracy >= 90) {
            scoreElement.classList.add('score-excellent');
        } else if (accuracy >= 75) {
            scoreElement.classList.add('score-good');
        } else if (accuracy >= 50) {
            scoreElement.classList.add('score-fair');
        } else {
            scoreElement.classList.add('score-poor');
        }
    }
    
    getFeedbackMessage(accuracy) {
        if (accuracy >= 90) {
            return '🎉 Excellent! Your pronunciation is very good!';
        } else if (accuracy >= 75) {
            return '👍 Good job! Your pronunciation is quite accurate.';
        } else if (accuracy >= 50) {
            return '📈 Not bad! Keep practicing to improve your pronunciation.';
        } else {
            return '💪 Keep trying! Listen carefully and practice more.';
        }
    }
    
    getFeedbackClass(accuracy) {
        if (accuracy >= 90) return 'excellent';
        if (accuracy >= 75) return 'good';
        if (accuracy >= 50) return 'fair';
        return 'poor';
    }
    
    showFeedback(message, type) {
        const feedbackElement = document.getElementById('feedbackMessage');
        feedbackElement.textContent = message;
        
        // Remove existing classes
        feedbackElement.classList.remove('feedback-excellent', 'feedback-good', 'feedback-fair', 'feedback-poor');
        
        // Add appropriate class
        feedbackElement.classList.add(`feedback-${type}`);
    }
    
    startRecordingTimer() {
        this.recordingTimer = setInterval(() => {
            if (this.recordingStartTime) {
                const elapsed = Math.floor((Date.now() - this.recordingStartTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                document.getElementById('recordingTimer').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }
    
    stopRecordingTimer() {
        if (this.recordingTimer) {
            clearInterval(this.recordingTimer);
            this.recordingTimer = null;
        }
        document.getElementById('recordingTimer').textContent = '00:00';
    }
    
    displayCurrentPhrase() {
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        document.getElementById('thaiPhrase').textContent = currentPhrase.thai;
        document.getElementById('englishTranslation').textContent = currentPhrase.english;
        document.getElementById('phoneticText').textContent = currentPhrase.phonetic;
    }
    
    nextPhrase() {
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
        this.displayCurrentPhrase();
        this.clearResults();
    }
    
    repeatPhrase() {
        this.clearResults();
    }
    
    clearResults() {
        document.getElementById('recognizedText').textContent = 'Click "Start Recording" to begin';
        document.getElementById('accuracyScore').textContent = '--';
        document.getElementById('feedbackMessage').textContent = '';
        
        const scoreElement = document.getElementById('accuracyScore');
        scoreElement.classList.remove('score-excellent', 'score-good', 'score-fair', 'score-poor');
        
        const feedbackElement = document.getElementById('feedbackMessage');
        feedbackElement.classList.remove('feedback-excellent', 'feedback-good', 'feedback-fair', 'feedback-poor');
    }
    
    updateProgress() {
        document.getElementById('phrasesCompleted').textContent = this.phrasesCompleted;
        
        const averageAccuracy = this.phrasesCompleted > 0 ? 
            Math.round(this.totalAccuracy / this.phrasesCompleted) : 0;
        document.getElementById('averageAccuracy').textContent = averageAccuracy + '%';
        
        // Update level based on average accuracy
        let level = 'Beginner';
        if (averageAccuracy >= 90) level = 'Expert';
        else if (averageAccuracy >= 75) level = 'Advanced';
        else if (averageAccuracy >= 50) level = 'Intermediate';
        
        document.getElementById('currentLevel').textContent = level;
        
        // Update progress bar
        const totalPhrases = this.phrases.length;
        const progress = (this.phrasesCompleted / totalPhrases) * 100;
        document.getElementById('progressFill').style.width = Math.min(progress, 100) + '%';
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for speech synthesis voices to load
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
            new ThaiAudioTest();
        };
    } else {
        new ThaiAudioTest();
    }
});

// Handle page visibility change to stop recording if page becomes hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.thaiAudioTest && window.thaiAudioTest.isRecording) {
        window.thaiAudioTest.stopRecording();
    }
});