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
    }

    navigateToModule(module) {
        switch (module) {
            case 'flashcards':
                this.startFlashcardSession();
                break;
            case 'tones':
                this.startToneRecognition();
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
            streak: 0,
            points: 0,
            lastStudyDate: null
        };
    }

    saveStats() {
        this.userStats.points = this.userStats.cardsReviewed * 5 + this.userStats.toneCorrect * 10;
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