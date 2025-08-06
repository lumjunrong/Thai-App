// Thai Learning App - Main JavaScript

class ThaiLearningApp {
    constructor() {
        this.currentScreen = 'home-screen';
        this.currentCardIndex = 0;
        this.currentSessionCards = [];
        this.userStats = this.loadStats();
        this.currentToneExercise = null;
        this.toneScore = 0;
        this.currentCategory = 'everyday';
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.updateUI();
        this.loadProgressData();
    }

    loadData() {
        // Load data from data.js file
        this.vocabulary = thaiVocabulary;
        this.phrases = conversationPhrases;
        this.toneExercises = toneExercises;
        this.toneInfo = toneInfo;
        this.pronunciationPhrases = pronunciationPhrases;
        
        // Pronunciation test state
        this.currentPronunciationPhrase = null;
        this.pronunciationScore = 0;
        this.pronunciationIndex = 0;
        this.recognition = null;
        this.isRecording = false;
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.module-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const module = e.currentTarget.dataset.module;
                this.navigateToModule(module);
            });
        });

        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.navigateToScreen('home-screen');
            });
        });

        // Flashcard functionality
        const flipBtn = document.getElementById('flip-card');
        if (flipBtn) {
            flipBtn.addEventListener('click', () => {
                this.flipCard();
            });
        }

        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const difficulty = e.currentTarget.dataset.difficulty;
                this.handleCardResponse(difficulty);
            });
        });

        // Audio buttons
        document.querySelectorAll('.audio-btn, #play-audio').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const text = this.getCurrentCardText();
                this.playAudio(text);
            });
        });

        // Tone recognition
        document.querySelectorAll('.tone-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedTone = e.currentTarget.dataset.tone;
                this.handleToneSelection(selectedTone, e.currentTarget);
            });
        });

        const playToneBtn = document.getElementById('play-tone');
        if (playToneBtn) {
            playToneBtn.addEventListener('click', () => {
                if (this.currentToneExercise) {
                    this.playAudio(this.currentToneExercise.thai);
                }
            });
        }

        // Conversation tabs
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.switchConversationCategory(category);
            });
        });

        // Pronunciation test controls
        const playPromptBtn = document.getElementById('play-prompt');
        if (playPromptBtn) {
            playPromptBtn.addEventListener('click', () => {
                if (this.currentPronunciationPhrase) {
                    this.playAudio(this.currentPronunciationPhrase.thai);
                }
            });
        }

        const micBtn = document.getElementById('mic-btn');
        if (micBtn) {
            micBtn.addEventListener('mousedown', () => this.startRecording());
            micBtn.addEventListener('mouseup', () => this.stopRecording());
            micBtn.addEventListener('mouseleave', () => this.stopRecording());
            
            // Touch events for mobile
            micBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.startRecording();
            });
            micBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.stopRecording();
            });
        }

        const skipBtn = document.getElementById('skip-pronunciation');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                this.nextPronunciationPhrase();
            });
        }

        const nextBtn = document.getElementById('next-pronunciation');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextPronunciationPhrase();
            });
        }
    }

    navigateToModule(module) {
        switch (module) {
            case 'flashcards':
                this.startFlashcardSession();
                break;
            case 'tones':
                this.startToneRecognition();
                break;
            case 'pronunciation':
                this.startPronunciationTest();
                break;
            case 'conversation':
                this.navigateToScreen('conversation-screen');
                this.loadConversationPhrases();
                break;
            case 'review':
                this.startReviewSession();
                break;
        }
    }

    navigateToScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;
    }

    // Flashcard System with Spaced Repetition
    startFlashcardSession() {
        this.currentSessionCards = this.getCardsForSession();
        this.currentCardIndex = 0;
        
        if (this.currentSessionCards.length === 0) {
            alert('No cards available for review right now. Great job!');
            return;
        }

        this.navigateToScreen('flashcard-screen');
        this.displayCurrentCard();
        this.updateCardCounter();
    }

    getCardsForSession() {
        const now = new Date();
        const availableCards = this.vocabulary.filter(card => 
            new Date(card.nextReview) <= now
        );
        
        // If no cards due, get some new ones
        if (availableCards.length === 0) {
            return this.vocabulary.slice(0, 10);
        }
        
        return availableCards.slice(0, 10); // Limit session size
    }

    displayCurrentCard() {
        if (this.currentCardIndex >= this.currentSessionCards.length) {
            this.endFlashcardSession();
            return;
        }

        const card = this.currentSessionCards[this.currentCardIndex];
        const cardElement = document.getElementById('current-card');
        const frontElement = cardElement.querySelector('.card-front');
        const backElement = cardElement.querySelector('.card-back');

        // Show front, hide back
        frontElement.classList.remove('hidden');
        backElement.classList.add('hidden');

        // Update content
        document.getElementById('thai-word').textContent = card.thai;
        document.getElementById('english-word').textContent = card.english;
        document.getElementById('phonetic-word').textContent = card.phonetic;
        document.getElementById('tone-info').textContent = card.tones.join('-');

        // Reset buttons
        document.getElementById('flip-card').classList.remove('hidden');
        document.getElementById('difficulty-buttons').classList.add('hidden');
    }

    flipCard() {
        const cardElement = document.getElementById('current-card');
        const frontElement = cardElement.querySelector('.card-front');
        const backElement = cardElement.querySelector('.card-back');

        frontElement.classList.add('hidden');
        backElement.classList.remove('hidden');

        document.getElementById('flip-card').classList.add('hidden');
        document.getElementById('difficulty-buttons').classList.remove('hidden');
    }

    handleCardResponse(difficulty) {
        const card = this.currentSessionCards[this.currentCardIndex];
        this.updateCardWithSpacedRepetition(card, difficulty);
        
        this.currentCardIndex++;
        this.displayCurrentCard();
        this.updateCardCounter();
    }

    updateCardWithSpacedRepetition(card, difficulty) {
        const now = new Date();
        card.reviewCount++;

        let multiplier;
        switch (difficulty) {
            case 'easy':
                multiplier = 2.5;
                card.easeFactor = Math.max(1.3, card.easeFactor + 0.1);
                break;
            case 'medium':
                multiplier = 1.5;
                break;
            case 'hard':
                multiplier = 0.8;
                card.easeFactor = Math.max(1.3, card.easeFactor - 0.2);
                card.interval = 1; // Reset interval for hard cards
                break;
        }

        if (difficulty !== 'hard') {
            card.interval = Math.ceil(card.interval * multiplier * card.easeFactor);
        }

        card.nextReview = new Date(now.getTime() + (card.interval * 24 * 60 * 60 * 1000));
        
        // Update user stats
        this.userStats.cardsReviewed++;
        this.saveStats();
    }

    updateCardCounter() {
        const counter = document.getElementById('card-counter');
        if (counter) {
            counter.textContent = `${this.currentCardIndex + 1} / ${this.currentSessionCards.length}`;
        }
    }

    endFlashcardSession() {
        alert(`Session complete! You reviewed ${this.currentSessionCards.length} cards.`);
        this.navigateToScreen('home-screen');
        this.updateUI();
    }

    // Tone Recognition Game
    startToneRecognition() {
        this.navigateToScreen('tone-screen');
        this.toneScore = 0;
        this.updateToneScore();
        this.loadNextToneExercise();
    }

    loadNextToneExercise() {
        this.currentToneExercise = this.toneExercises[
            Math.floor(Math.random() * this.toneExercises.length)
        ];
        
        document.getElementById('tone-thai-word').textContent = this.currentToneExercise.thai;
        document.getElementById('tone-feedback').textContent = '';
        
        // Reset tone options
        document.querySelectorAll('.tone-option').forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
    }

    handleToneSelection(selectedTone, element) {
        const correct = selectedTone === this.currentToneExercise.correctTone;
        const feedbackElement = document.getElementById('tone-feedback');
        
        if (correct) {
            element.classList.add('correct');
            feedbackElement.innerHTML = `
                <div style="color: #10b981; font-weight: 600;">
                    ✅ Correct! "${this.currentToneExercise.thai}" is ${this.toneInfo[selectedTone].name}
                    <br><small>${this.currentToneExercise.english} - ${this.currentToneExercise.phonetic}</small>
                </div>
            `;
            this.toneScore += 10;
            this.userStats.toneCorrect++;
        } else {
            element.classList.add('incorrect');
            const correctElement = document.querySelector(`[data-tone="${this.currentToneExercise.correctTone}"]`);
            correctElement.classList.add('correct');
            
            feedbackElement.innerHTML = `
                <div style="color: #ef4444; font-weight: 600;">
                    ❌ Incorrect. "${this.currentToneExercise.thai}" is ${this.toneInfo[this.currentToneExercise.correctTone].name}
                    <br><small>${this.currentToneExercise.english} - ${this.currentToneExercise.phonetic}</small>
                </div>
            `;
            this.userStats.toneIncorrect++;
        }
        
        this.updateToneScore();
        this.saveStats();
        
        // Load next exercise after delay
        setTimeout(() => {
            this.loadNextToneExercise();
        }, 2000);
    }

    updateToneScore() {
        document.getElementById('tone-score').textContent = this.toneScore;
    }

    // Conversation Practice
    switchConversationCategory(category) {
        this.currentCategory = category;
        
        // Update tab appearance
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.loadConversationPhrases();
    }

    loadConversationPhrases() {
        const phraseList = document.getElementById('phrase-list');
        const phrases = this.phrases[this.currentCategory];
        
        phraseList.innerHTML = phrases.map(phrase => `
            <div class="phrase-item" onclick="app.playAudio('${phrase.thai}')">
                <div class="phrase-thai thai-text">${phrase.thai}</div>
                <div class="phrase-english">${phrase.english}</div>
                <div class="phrase-phonetic">${phrase.phonetic}</div>
                <div style="font-size: 0.8rem; color: #9ca3af; margin-top: 0.5rem;">
                    ${phrase.context}
                </div>
            </div>
        `).join('');
    }

    // Audio functionality
    playAudio(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Try to use Thai voice if available
            const voices = speechSynthesis.getVoices();
            const thaiVoice = voices.find(voice => 
                voice.lang.includes('th') || voice.name.includes('Thai')
            );
            
            if (thaiVoice) {
                utterance.voice = thaiVoice;
            }
            
            utterance.lang = 'th-TH';
            utterance.rate = 0.8; // Slower for learning
            
            speechSynthesis.speak(utterance);
        } else {
            console.log('Speech synthesis not supported');
        }
    }

    getCurrentCardText() {
        if (this.currentSessionCards && this.currentSessionCards[this.currentCardIndex]) {
            return this.currentSessionCards[this.currentCardIndex].thai;
        }
        return '';
    }

    // Progress and Statistics
    loadStats() {
        const saved = localStorage.getItem('thaiLearningStats');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            cardsReviewed: 0,
            toneCorrect: 0,
            toneIncorrect: 0,
            pronunciationAttempts: 0,
            pronunciationCorrect: 0,
            streak: 0,
            points: 0,
            lastStudyDate: null
        };
    }

    saveStats() {
        this.userStats.points = this.userStats.cardsReviewed * 5 + 
                               this.userStats.toneCorrect * 10 + 
                               this.userStats.pronunciationCorrect * 15;
        localStorage.setItem('thaiLearningStats', JSON.stringify(this.userStats));
        this.updateUI();
    }

    loadProgressData() {
        const saved = localStorage.getItem('thaiVocabularyProgress');
        if (saved) {
            const savedVocab = JSON.parse(saved);
            // Merge saved progress with current vocabulary
            this.vocabulary.forEach(card => {
                const savedCard = savedVocab.find(s => s.id === card.id);
                if (savedCard) {
                    Object.assign(card, savedCard);
                }
            });
        }
        this.saveProgressData();
    }

    saveProgressData() {
        localStorage.setItem('thaiVocabularyProgress', JSON.stringify(this.vocabulary));
    }

    updateUI() {
        // Update navigation stats
        document.getElementById('streak-counter').textContent = `🔥 ${this.userStats.streak}`;
        document.getElementById('points-counter').textContent = `⭐ ${this.userStats.points}`;
        
        // Update review count
        const dueCards = this.vocabulary.filter(card => 
            new Date(card.nextReview) <= new Date()
        ).length;
        
        const reviewCountElement = document.querySelector('.review-count');
        if (reviewCountElement) {
            reviewCountElement.textContent = `${dueCards} due`;
        }
        
        // Update progress bars (simplified for now)
        document.querySelectorAll('.progress-fill').forEach((bar, index) => {
            const progress = Math.min(100, (this.userStats.cardsReviewed + this.userStats.toneCorrect) * 2);
            bar.style.width = `${progress}%`;
        });
    }

    startReviewSession() {
        this.startFlashcardSession(); // Same as flashcard session for now
    }

    // Pronunciation Test System
    startPronunciationTest() {
        this.pronunciationIndex = 0;
        this.pronunciationScore = 0;
        this.navigateToScreen('pronunciation-screen');
        this.initializeSpeechRecognition();
        this.loadNextPronunciationPhrase();
        this.updatePronunciationScore();
    }

    initializeSpeechRecognition() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showPronunciationError('Speech recognition not supported in this browser. Please use Chrome or Edge for the best experience.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.lang = 'th-TH'; // Thai language
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 3;

        this.recognition.onstart = () => {
            this.isRecording = true;
            this.updateMicrophoneUI('recording');
            this.startSoundWaveAnimation();
        };

        this.recognition.onresult = (event) => {
            const result = event.results[0];
            const transcript = result[0].transcript;
            const confidence = result[0].confidence;
            
            this.processPronunciationResult(transcript, confidence);
        };

        this.recognition.onerror = (event) => {
            this.isRecording = false;
            this.updateMicrophoneUI('ready');
            this.stopSoundWaveAnimation();
            
            let errorMessage = 'Speech recognition error: ';
            switch(event.error) {
                case 'no-speech':
                    errorMessage += 'No speech detected. Please try again.';
                    break;
                case 'audio-capture':
                    errorMessage += 'Microphone not accessible. Please check permissions.';
                    break;
                case 'not-allowed':
                    errorMessage += 'Microphone permission denied. Please allow microphone access.';
                    break;
                default:
                    errorMessage += event.error;
            }
            
            this.showPronunciationFeedback(errorMessage, 'error');
        };

        this.recognition.onend = () => {
            this.isRecording = false;
            this.updateMicrophoneUI('ready');
            this.stopSoundWaveAnimation();
        };
    }

    loadNextPronunciationPhrase() {
        if (this.pronunciationIndex >= this.pronunciationPhrases.length) {
            this.endPronunciationTest();
            return;
        }

        this.currentPronunciationPhrase = this.pronunciationPhrases[this.pronunciationIndex];
        
        // Update UI
        document.getElementById('prompt-thai').textContent = this.currentPronunciationPhrase.thai;
        document.getElementById('prompt-english').textContent = this.currentPronunciationPhrase.english;
        document.getElementById('prompt-phonetic').textContent = this.currentPronunciationPhrase.phonetic;
        
        // Reset feedback
        document.getElementById('recognized-text').textContent = 'Press and hold the microphone to start';
        document.getElementById('accuracy-display').innerHTML = '';
        document.getElementById('accuracy-display').className = 'accuracy-score';
        
        // Hide/show buttons
        document.getElementById('next-pronunciation').classList.add('hidden');
        document.getElementById('skip-pronunciation').classList.remove('hidden');
    }

    startRecording() {
        if (!this.recognition || this.isRecording) return;
        
        try {
            this.recognition.start();
            this.updateMicrophoneUI('recording');
        } catch (error) {
            console.error('Error starting speech recognition:', error);
            this.showPronunciationFeedback('Failed to start recording. Please try again.', 'error');
        }
    }

    stopRecording() {
        if (!this.recognition || !this.isRecording) return;
        
        try {
            this.recognition.stop();
            this.updateMicrophoneUI('processing');
        } catch (error) {
            console.error('Error stopping speech recognition:', error);
        }
    }

    processPronunciationResult(transcript, confidence) {
        const recognizedText = transcript.trim();
        const targetText = this.currentPronunciationPhrase.thai;
        
        // Display what was recognized
        document.getElementById('recognized-text').textContent = recognizedText || 'No speech detected';
        
        // Calculate similarity score
        const accuracy = this.calculatePronunciationAccuracy(recognizedText, targetText);
        const confidenceScore = confidence || 0;
        
        // Combined score (weighted average)
        const finalScore = Math.round((accuracy * 0.7 + confidenceScore * 0.3) * 100);
        
        this.displayPronunciationFeedback(finalScore, recognizedText, targetText);
        
        // Update user stats
        this.userStats.pronunciationAttempts = (this.userStats.pronunciationAttempts || 0) + 1;
        if (finalScore >= 70) {
            this.userStats.pronunciationCorrect = (this.userStats.pronunciationCorrect || 0) + 1;
            this.pronunciationScore += Math.max(10, finalScore / 5);
        }
        
        this.updatePronunciationScore();
        this.saveStats();
        
        // Show next button
        document.getElementById('next-pronunciation').classList.remove('hidden');
        document.getElementById('skip-pronunciation').classList.add('hidden');
    }

    calculatePronunciationAccuracy(recognized, target) {
        if (!recognized || !target) return 0;
        
        // Normalize both strings (remove spaces, convert to lowercase)
        const normalizedRecognized = recognized.replace(/\s+/g, '').toLowerCase();
        const normalizedTarget = target.replace(/\s+/g, '').toLowerCase();
        
        // If exact match, return 1.0
        if (normalizedRecognized === normalizedTarget) {
            return 1.0;
        }
        
        // Calculate Levenshtein distance for similarity
        const distance = this.levenshteinDistance(normalizedRecognized, normalizedTarget);
        const maxLength = Math.max(normalizedRecognized.length, normalizedTarget.length);
        
        if (maxLength === 0) return 0;
        
        const similarity = 1 - (distance / maxLength);
        return Math.max(0, similarity);
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

    displayPronunciationFeedback(score, recognized, target) {
        const accuracyDisplay = document.getElementById('accuracy-display');
        let feedbackClass = '';
        let feedbackText = '';
        
        if (score >= 85) {
            feedbackClass = 'accuracy-excellent';
            feedbackText = `🎉 Excellent! ${score}% accuracy`;
        } else if (score >= 70) {
            feedbackClass = 'accuracy-good';
            feedbackText = `👍 Good! ${score}% accuracy`;
        } else if (score >= 50) {
            feedbackClass = 'accuracy-needs-work';
            feedbackText = `📚 Keep practicing! ${score}% accuracy`;
        } else {
            feedbackClass = 'accuracy-needs-work';
            feedbackText = `💪 Try again! ${score}% accuracy`;
        }
        
        accuracyDisplay.className = `accuracy-score ${feedbackClass}`;
        accuracyDisplay.innerHTML = `
            <div>${feedbackText}</div>
            <small>Target: ${target}</small>
        `;
    }

    updateMicrophoneUI(state) {
        const micBtn = document.getElementById('mic-btn');
        const micStatus = document.getElementById('mic-status');
        const micText = micBtn.querySelector('.mic-text');
        
        micBtn.className = 'mic-btn';
        
        switch (state) {
            case 'recording':
                micBtn.classList.add('recording');
                micStatus.textContent = 'Listening... Speak now!';
                micText.textContent = 'Recording...';
                break;
            case 'processing':
                micBtn.classList.add('processing');
                micStatus.textContent = 'Processing your speech...';
                micText.textContent = 'Processing...';
                break;
            case 'ready':
            default:
                micStatus.textContent = 'Ready to listen';
                micText.textContent = 'Hold to Speak';
                break;
        }
    }

    startSoundWaveAnimation() {
        const soundWave = document.getElementById('sound-wave');
        soundWave.classList.add('active');
    }

    stopSoundWaveAnimation() {
        const soundWave = document.getElementById('sound-wave');
        soundWave.classList.remove('active');
    }

    nextPronunciationPhrase() {
        this.pronunciationIndex++;
        this.loadNextPronunciationPhrase();
    }

    updatePronunciationScore() {
        document.getElementById('pronunciation-score').textContent = Math.round(this.pronunciationScore);
    }

    endPronunciationTest() {
        const attempts = this.userStats.pronunciationAttempts || 0;
        const correct = this.userStats.pronunciationCorrect || 0;
        const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
        
        alert(`Pronunciation test complete!\n\nFinal Score: ${Math.round(this.pronunciationScore)}\nAccuracy: ${accuracy}%\nPhrases completed: ${this.pronunciationIndex}`);
        
        this.navigateToScreen('home-screen');
        this.updateUI();
    }

    showPronunciationError(message) {
        document.getElementById('recognized-text').textContent = message;
        document.getElementById('accuracy-display').innerHTML = `
            <div style="color: #dc2626; font-weight: 600;">
                ⚠️ ${message}
            </div>
        `;
    }

    showPronunciationFeedback(message, type = 'info') {
        const color = type === 'error' ? '#dc2626' : '#6b7280';
        document.getElementById('recognized-text').innerHTML = `
            <span style="color: ${color};">${message}</span>
        `;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ThaiLearningApp();
});

// Make sure voices are loaded for speech synthesis
if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => {
        // Voices are now loaded
    };
}