// Thai Language Learning Data

// Vocabulary with spaced repetition metadata
const thaiVocabulary = [
    // Basic Greetings & Politeness
    {
        id: 1,
        thai: "สวัสดี",
        english: "Hello",
        phonetic: "sà-wàt-dii",
        tones: ["mid", "low", "mid"],
        category: "greetings",
        difficulty: 1,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 2,
        thai: "ขอบคุณ",
        english: "Thank you",
        phonetic: "khɔ̀ɔp-khun",
        tones: ["falling", "mid"],
        category: "greetings",
        difficulty: 1,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 3,
        thai: "ครับ",
        english: "Yes (male polite particle)",
        phonetic: "khráp",
        tones: ["high"],
        category: "greetings",
        difficulty: 1,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 4,
        thai: "ค่ะ",
        english: "Yes (female polite particle)",
        phonetic: "khâ",
        tones: ["falling"],
        category: "greetings",
        difficulty: 1,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 5,
        thai: "ขอโทษ",
        english: "Excuse me / Sorry",
        phonetic: "khɔ̌ɔ-thôot",
        tones: ["rising", "high"],
        category: "greetings",
        difficulty: 2,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },

    // Numbers
    {
        id: 6,
        thai: "หนึ่ง",
        english: "One",
        phonetic: "nɯ̀ng",
        tones: ["falling"],
        category: "numbers",
        difficulty: 2,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 7,
        thai: "สอง",
        english: "Two",
        phonetic: "sɔ̌ɔng",
        tones: ["rising"],
        category: "numbers",
        difficulty: 2,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 8,
        thai: "สาม",
        english: "Three",
        phonetic: "sǎam",
        tones: ["rising"],
        category: "numbers",
        difficulty: 2,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },

    // Business Vocabulary
    {
        id: 9,
        thai: "ประชุม",
        english: "Meeting",
        phonetic: "pra-chum",
        tones: ["mid", "mid"],
        category: "business",
        difficulty: 3,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 10,
        thai: "บริษัท",
        english: "Company",
        phonetic: "bɔɔ-ri-sàt",
        tones: ["mid", "mid", "low"],
        category: "business",
        difficulty: 3,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 11,
        thai: "ลูกค้า",
        english: "Customer",
        phonetic: "lûuk-kháa",
        tones: ["high", "high"],
        category: "business",
        difficulty: 3,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 12,
        thai: "เงิน",
        english: "Money",
        phonetic: "ngən",
        tones: ["mid"],
        category: "business",
        difficulty: 2,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },

    // Food & Dining
    {
        id: 13,
        thai: "อาหาร",
        english: "Food",
        phonetic: "aa-hǎan",
        tones: ["mid", "rising"],
        category: "food",
        difficulty: 2,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 14,
        thai: "น้ำ",
        english: "Water",
        phonetic: "náam",
        tones: ["high"],
        category: "food",
        difficulty: 1,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    },
    {
        id: 15,
        thai: "ข้าว",
        english: "Rice",
        phonetic: "khâaw",
        tones: ["falling"],
        category: "food",
        difficulty: 2,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        reviewCount: 0
    }
];

// Conversation phrases organized by category
const conversationPhrases = {
    everyday: [
        {
            id: 1,
            thai: "คุณเป็นอย่างไรบ้าง",
            english: "How are you?",
            phonetic: "khun pen yàang-rai bâang",
            tones: ["mid", "mid", "falling", "mid", "falling"],
            context: "Common greeting after hello"
        },
        {
            id: 2,
            thai: "ผมสบายดีครับ",
            english: "I'm fine (male speaker)",
            phonetic: "phǒm sa-baai dii khráp",
            tones: ["rising", "mid", "mid", "mid", "high"],
            context: "Response to 'how are you'"
        },
        {
            id: 3,
            thai: "คุณชื่ออะไร",
            english: "What's your name?",
            phonetic: "khun chɯ̂ɯ a-rai",
            tones: ["mid", "falling", "mid", "mid"],
            context: "Getting to know someone"
        },
        {
            id: 4,
            thai: "ผมชื่อ...",
            english: "My name is... (male)",
            phonetic: "phǒm chɯ̂ɯ...",
            tones: ["rising", "falling"],
            context: "Introducing yourself"
        },
        {
            id: 5,
            thai: "ดิฉันชื่อ...",
            english: "My name is... (female)",
            phonetic: "di-chǎn chɯ̂ɯ...",
            tones: ["mid", "rising", "falling"],
            context: "Introducing yourself"
        },
        {
            id: 6,
            thai: "คุณมาจากไหน",
            english: "Where are you from?",
            phonetic: "khun maa jàak nǎi",
            tones: ["mid", "mid", "falling", "rising"],
            context: "Learning about someone's origin"
        },
        {
            id: 7,
            thai: "ห้องน้ำอยู่ที่ไหน",
            english: "Where is the bathroom?",
            phonetic: "hɔ̂ng-náam yùu thîi-nǎi",
            tones: ["falling", "high", "falling", "falling", "rising"],
            context: "Essential phrase for travelers"
        },
        {
            id: 8,
            thai: "ราคาเท่าไหร่",
            english: "How much does it cost?",
            phonetic: "raa-khaa thâw-rài",
            tones: ["mid", "mid", "falling", "falling"],
            context: "Shopping and bargaining"
        }
    ],
    business: [
        {
            id: 1,
            thai: "ยินดีที่ได้รู้จัก",
            english: "Nice to meet you",
            phonetic: "yin-dii thîi dâi rúu-jàk",
            tones: ["mid", "mid", "falling", "falling", "high", "falling"],
            context: "Professional introduction"
        },
        {
            id: 2,
            thai: "เรามีประชุมเมื่อไหร่",
            english: "When do we have a meeting?",
            phonetic: "rao mii pra-chum mɯ̂a-rài",
            tones: ["mid", "mid", "mid", "mid", "falling", "falling"],
            context: "Scheduling meetings"
        },
        {
            id: 3,
            thai: "ผมต้องไปประชุม",
            english: "I need to go to a meeting",
            phonetic: "phǒm tɔ̂ng pai pra-chum",
            tones: ["rising", "falling", "mid", "mid", "mid"],
            context: "Explaining your schedule"
        },
        {
            id: 4,
            thai: "โครงการนี้สำคัญมาก",
            english: "This project is very important",
            phonetic: "khrohng-gaan níi sǎm-khan mâak",
            tones: ["mid", "mid", "high", "rising", "high", "high"],
            context: "Discussing work priorities"
        },
        {
            id: 5,
            thai: "กรุณาส่งอีเมลให้ผม",
            english: "Please send me an email",
            phonetic: "ga-ru-naa sòng ii-meel hâi phǒm",
            tones: ["mid", "mid", "mid", "falling", "mid", "mid", "falling", "rising"],
            context: "Communication requests"
        },
        {
            id: 6,
            thai: "ผมจะติดต่อกลับ",
            english: "I will contact you back",
            phonetic: "phǒm jà tìt-tɔ̀ɔ glàp",
            tones: ["rising", "falling", "falling", "falling", "falling"],
            context: "Follow-up communication"
        },
        {
            id: 7,
            thai: "งบประมาณเท่าไหร่",
            english: "What's the budget?",
            phonetic: "ngóp-pra-maan thâw-rài",
            tones: ["high", "mid", "mid", "falling", "falling"],
            context: "Financial discussions"
        },
        {
            id: 8,
            thai: "เราต้องเสร็จภายในสัปดาห์นี้",
            english: "We need to finish within this week",
            phonetic: "rao tɔ̂ng sèt phaai-nai sàp-daa níi",
            tones: ["mid", "falling", "falling", "mid", "mid", "low", "mid", "high"],
            context: "Deadline discussions"
        }
    ]
};

// Tone recognition exercises
const toneExercises = [
    {
        id: 1,
        thai: "กา",
        english: "crow",
        phonetic: "gaa",
        correctTone: "mid",
        difficulty: 1
    },
    {
        id: 2,
        thai: "ก่า",
        english: "to kill",
        phonetic: "gàa",
        correctTone: "low",
        difficulty: 1
    },
    {
        id: 3,
        thai: "ก้า",
        english: "to step",
        phonetic: "gâa",
        correctTone: "falling",
        difficulty: 1
    },
    {
        id: 4,
        thai: "ก๊า",
        english: "(informal particle)",
        phonetic: "gáa",
        correctTone: "high",
        difficulty: 1
    },
    {
        id: 5,
        thai: "ก๋า",
        english: "(rare tone example)",
        phonetic: "gǎa",
        correctTone: "rising",
        difficulty: 1
    },
    {
        id: 6,
        thai: "มา",
        english: "to come",
        phonetic: "maa",
        correctTone: "mid",
        difficulty: 2
    },
    {
        id: 7,
        thai: "หมา",
        english: "dog",
        phonetic: "mǎa",
        correctTone: "rising",
        difficulty: 2
    },
    {
        id: 8,
        thai: "ไหม",
        english: "silk / question particle",
        phonetic: "mǎi",
        correctTone: "rising",
        difficulty: 3
    },
    {
        id: 9,
        thai: "ใหม่",
        english: "new",
        phonetic: "mài",
        correctTone: "falling",
        difficulty: 3
    },
    {
        id: 10,
        thai: "ไม่",
        english: "no/not",
        phonetic: "mâi",
        correctTone: "falling",
        difficulty: 2
    }
];

// Tone information for educational purposes
const toneInfo = {
    mid: {
        name: "Mid Tone",
        description: "Flat, neutral tone like saying 'ah' normally",
        symbol: "◯",
        color: "#6b7280"
    },
    low: {
        name: "Low Tone",
        description: "Lower than mid tone, like a disappointed 'oh'",
        symbol: "◌̀",
        color: "#374151"
    },
    falling: {
        name: "Falling Tone",
        description: "Starts high and falls down, like 'oh!' in surprise",
        symbol: "◌̂",
        color: "#ef4444"
    },
    high: {
        name: "High Tone",
        description: "Higher than mid tone, like asking 'what?'",
        symbol: "◌́",
        color: "#f59e0b"
    },
    rising: {
        name: "Rising Tone",
        description: "Starts low and rises up, like 'huh?' questioning",
        symbol: "◌̌",
        color: "#10b981"
    }
};

// Categories for organizing content
const categories = {
    greetings: "Greetings & Politeness",
    numbers: "Numbers",
    business: "Business",
    food: "Food & Dining",
    travel: "Travel",
    family: "Family",
    time: "Time & Dates"
};

// Pronunciation test phrases - combining vocabulary and conversation phrases
const pronunciationPhrases = [
    // Basic greetings and common phrases
    {
        id: 1,
        thai: "สวัสดีครับ",
        english: "Hello (male)",
        phonetic: "sà-wàt-dii khráp",
        difficulty: 1,
        category: "greetings"
    },
    {
        id: 2,
        thai: "สวัสดีค่ะ",
        english: "Hello (female)",
        phonetic: "sà-wàt-dii khâ",
        difficulty: 1,
        category: "greetings"
    },
    {
        id: 3,
        thai: "ขอบคุณครับ",
        english: "Thank you (male)",
        phonetic: "khɔ̀ɔp-khun khráp",
        difficulty: 1,
        category: "greetings"
    },
    {
        id: 4,
        thai: "ขอบคุณค่ะ",
        english: "Thank you (female)",
        phonetic: "khɔ̀ɔp-khun khâ",
        difficulty: 1,
        category: "greetings"
    },
    {
        id: 5,
        thai: "ขอโทษครับ",
        english: "Excuse me (male)",
        phonetic: "khɔ̌ɔ-thôot khráp",
        difficulty: 2,
        category: "greetings"
    },
    {
        id: 6,
        thai: "คุณชื่ออะไร",
        english: "What's your name?",
        phonetic: "khun chɯ̂ɯ a-rai",
        difficulty: 2,
        category: "conversation"
    },
    {
        id: 7,
        thai: "ผมชื่อจอห์น",
        english: "My name is John (male)",
        phonetic: "phǒm chɯ̂ɯ jɔɔn",
        difficulty: 2,
        category: "conversation"
    },
    {
        id: 8,
        thai: "คุณเป็นอย่างไรบ้าง",
        english: "How are you?",
        phonetic: "khun pen yàang-rai bâang",
        difficulty: 3,
        category: "conversation"
    },
    {
        id: 9,
        thai: "ผมสบายดีครับ",
        english: "I'm fine (male)",
        phonetic: "phǒm sa-baai dii khráp",
        difficulty: 2,
        category: "conversation"
    },
    {
        id: 10,
        thai: "ห้องน้ำอยู่ที่ไหน",
        english: "Where is the bathroom?",
        phonetic: "hɔ̂ng-náam yùu thîi-nǎi",
        difficulty: 3,
        category: "practical"
    },
    {
        id: 11,
        thai: "ราคาเท่าไหร่",
        english: "How much does it cost?",
        phonetic: "raa-khaa thâw-rài",
        difficulty: 3,
        category: "practical"
    },
    {
        id: 12,
        thai: "ผมต้องไปประชุม",
        english: "I need to go to a meeting",
        phonetic: "phǒm tɔ̂ng pai pra-chum",
        difficulty: 4,
        category: "business"
    },
    {
        id: 13,
        thai: "ยินดีที่ได้รู้จัก",
        english: "Nice to meet you",
        phonetic: "yin-dii thîi dâi rúu-jàk",
        difficulty: 4,
        category: "business"
    },
    {
        id: 14,
        thai: "กรุณาส่งอีเมลให้ผม",
        english: "Please send me an email",
        phonetic: "ga-ru-naa sòng ii-meel hâi phǒm",
        difficulty: 5,
        category: "business"
    },
    {
        id: 15,
        thai: "เรามีประชุมเมื่อไหร่",
        english: "When do we have a meeting?",
        phonetic: "rao mii pra-chum mɯ̂a-rài",
        difficulty: 4,
        category: "business"
    }
];

// Export all data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        thaiVocabulary,
        conversationPhrases,
        toneExercises,
        toneInfo,
        categories,
        pronunciationPhrases
    };
}