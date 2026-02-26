<p align="center">
  <img src="public/nayi-disha-logo.png" alt="Nayi Disha Logo" width="120" />
</p>

<h1 align="center">🎓 Nayi Disha — AI-Powered Adaptive Learning Platform</h1>

<p align="center">
  <em>A new direction for personalized education</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?logo=google" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Firebase-Auth-FFCA28?logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss" alt="Tailwind" />
</p>

---

## 📖 What is Nayi Disha?

**Nayi Disha** (Hindi for *"New Direction"*) is an AI-powered personalized learning platform that creates custom study roadmaps and adaptive quizzes for any subject you want to learn — from programming languages to history, economics, or even ancient philosophy.

### The Problem It Solves

Traditional online learning has these issues:

| Problem | How Nayi Disha Fixes It |
|---------|----------------------|
| **One-size-fits-all courses** — everyone gets the same content regardless of their level | AI generates a **personalized roadmap** based on YOUR skill level and goals |
| **Static quizzes** — same difficulty for everyone, no adaptation | **Adaptive difficulty** — questions get harder when you're doing well, easier when you struggle |
| **No structure** — just random YouTube videos or articles | **Structured modules** — a clear learning path from beginner to advanced |
| **No progress tracking** — hard to know what you've actually learned | **Progress dashboard** — track scores, completion rates, and time spent per subject |
| **Boring UI** — most educational platforms look outdated | **Premium dark-themed UI** — modern, animated, and engaging interface |

---

## 🤔 How is This Different from ChatGPT / Gemini?

You might ask: *"Can't I just ask ChatGPT to generate a quiz for me?"*

Yes, but here's why Nayi Disha is fundamentally different:

### 1. 🧠 Adaptive Intelligence, Not Static Responses

When you ask ChatGPT for quiz questions, you get **10 random questions at the same difficulty level**. That's it. There's no memory, no adaptation, no tracking.

**Nayi Disha uses a Rolling Window Algorithm:**
- It watches your **last 3 answers** in real-time
- If you got 3 in a row correct → difficulty increases to **Hard**
- If you got 2+ wrong → difficulty drops to **Easy**
- This happens **automatically, mid-quiz**, without you doing anything

```
You answer: ✅ ✅ ✅ → Next question: 🔴 HARD
You answer: ✅ ❌ ❌ → Next question: 🟢 EASY  
You answer: ✅ ❌ ✅ → Next question: 🟡 MEDIUM
```

ChatGPT can't do this because it doesn't have a feedback loop within a single conversation.

### 2. 🗺️ Structured Learning Paths, Not Random Answers

ChatGPT gives you information in a flat, unstructured way. Nayi Disha creates a **complete roadmap**:

```
Subject: Machine Learning
├── Module 1: Python Basics (Beginner)
│   ├── Variables & Data Types
│   ├── Functions & Loops
│   └── Quiz (Adaptive)
├── Module 2: Linear Algebra (Intermediate)
│   ├── Matrices & Vectors
│   ├── Eigenvalues
│   └── Quiz (Adaptive)
├── Module 3: Neural Networks (Advanced)
│   └── ...
└── Final Assessment
```

Each module builds on the previous one. The roadmap is tailored to YOUR goal (e.g., "I want to become a Data Scientist" vs "I just want to understand ML basics").

### 3. 📊 Persistent Memory & Progress Tracking

ChatGPT forgets everything when you close the tab. Nayi Disha **remembers**:
- Every quiz you've taken
- Your scores per subject
- Which topics you're strong/weak in
- Your learning streak and time investment

### 4. 🎯 Goal-Oriented Learning

You don't just "learn Python." You tell Nayi Disha:
- **What** you want to learn (Python, Economics, History)
- **Your current level** (Beginner, Intermediate, Advanced)
- **Your goal** (Get a job, Pass an exam, Learn for fun)

The AI tailors everything to YOUR specific goal.

---

## ✨ Features

### 🟢 Live Features (Available Now)

#### 1. AI-Generated Personalized Roadmaps
The platform uses **Google Gemini 2.5 Flash** to generate a complete study roadmap based on your subject, skill level, and learning goals. Each roadmap contains structured modules with topics, key concepts, and estimated completion times.

#### 2. Adaptive Quiz Engine
The core feature. Each quiz:
- Generates questions **on-the-fly** using Gemini AI (not from a fixed question bank)
- Adapts difficulty in **real-time** based on your performance
- Evaluates answers server-side for accuracy
- Ends after **10 questions** with a detailed score report

#### 3. Progress Dashboard
A premium dashboard showing:
- **Overall stats** — total quizzes, average score, subjects studied, time spent
- **Per-subject breakdown** — drill down into each subject's performance
- **Recent activity** — timeline of your latest quiz attempts
- **Pass/fail rates** — see which subjects need more work

#### 4. Google Authentication
Secure sign-in via Google using Firebase Authentication. Your progress is tied to your account, so you can access it from any device.

#### 5. Premium UI/UX
- Dark glassmorphic theme with purple gradients
- Smooth animations powered by Framer Motion
- Fully responsive design (desktop, tablet, mobile)
- Interactive roadmap visualization

### 🟡 Coming Soon

#### 6. 🤖 AI Study Chatbot
An intelligent chatbot companion that:
- Answers questions about your current study topic in real-time
- Explains concepts you got wrong in quizzes
- Provides additional examples and analogies
- Acts as a 24/7 personal tutor you can ask anything
- Remembers your learning context (what subject, module, and difficulty level you're at)

#### 7. 🏆 Certification System
Earn verifiable certificates upon completing learning paths:
- Beautiful, auto-generated PDF certificates with your name, subject, score, and completion date
- Unique certificate ID for verification
- Share certificates on LinkedIn or download them
- Requirements: Complete all modules in a roadmap with 80%+ average score
- Certificate design matches the premium Nayi Disha brand aesthetic

---

## 🏗️ How It Works — Behind the Scenes

This section explains the technical architecture for anyone curious about what happens under the hood.

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                        │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Landing  │  │ Subject  │  │ Roadmap  │  │Progress │ │
│  │  Page    │→ │Selection │→ │  Page    │→ │Dashboard│ │
│  └──────────┘  └──────────┘  └────┬─────┘  └─────────┘ │
│                                    │                     │
│                              ┌─────▼─────┐              │
│                              │   Quiz    │              │
│                              │ Interface │              │
│                              └─────┬─────┘              │
└────────────────────────────────────┼────────────────────┘
                                     │ API Calls
                              ┌──────▼──────┐
                              │   Express   │
                              │  Backend    │
                              │  (Node.js)  │
                              └──────┬──────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
              ┌──────────┐   ┌──────────┐    ┌──────────┐
              │ Gemini   │   │ Firebase │    │Supabase/ │
              │ AI API   │   │  Auth    │    │LocalStore│
              │(Google)  │   │          │    │          │
              └──────────┘   └──────────┘    └──────────┘
```

### The Complete User Journey

Here's exactly what happens from the moment a user opens the app:

#### Step 1: Landing Page → Authentication
The user lands on a modern, animated landing page built with React and Framer Motion. They click "Get Started" and sign in using Google (Firebase Authentication). Firebase returns a user token, and the app syncs the user profile to the database.

#### Step 2: Subject Selection
The user picks what they want to learn. The selection screen shows popular subjects with icons and descriptions. The chosen subject is saved to `localStorage` for the quiz flow to use later.

#### Step 3: Skill Level & Goal Selection
Two more screens ask:
- **Skill level**: Beginner, Intermediate, or Advanced
- **Learning goal**: Career switch, Exam prep, Skill enhancement, etc.

These choices are critical — they're sent to Gemini AI to customize the roadmap.

#### Step 4: AI Roadmap Generation
**This is where the magic happens.**

The backend sends a carefully crafted prompt to **Google Gemini 2.5 Flash AI**:

```
"Generate a structured learning roadmap for [subject] 
at [level] level for someone whose goal is [goal]. 
Include modules with titles, topics, key concepts, 
and estimated time."
```

Gemini returns a JSON object with 5-8 modules, each containing:
- Module title and description
- 4-5 specific topics per module
- Key concepts and learning objectives
- Estimated completion time

The roadmap is displayed as an interactive, visual learning path.

#### Step 5: Taking a Quiz (The Adaptive Engine)

When the user starts a module quiz, here's what happens for **each question**:

```
1. Frontend requests a new question from the backend
2. Backend checks the user's last 3 answers (Rolling Window)
3. Backend calculates the appropriate difficulty (easy/medium/hard)
4. Backend asks Gemini AI to generate ONE question at that difficulty
5. Gemini returns the question with 4 options + correct answer
6. Backend stores the correct answer and sends the question to frontend
7. User selects an answer and submits
8. Backend verifies the answer (server-side, not client-side)
9. Backend updates the adaptive algorithm
10. Repeat until 10 questions are completed
```

**Why server-side verification?** To prevent cheating. The correct answer is never sent to the browser until after the user submits. ChatGPT can't do this — the answer is right there in the conversation.

#### Step 6: Quiz Completion & Progress Saving
When the quiz finishes (after 10 questions):
- Final accuracy, time spent, and pass/fail status are calculated
- The attempt is saved to persistent storage with subject, module, and score data
- Old in-progress quiz data is cleared so the next quiz starts fresh
- User is redirected back to the roadmap with a completion status

#### Step 7: Progress Dashboard
The progress page aggregates all quiz attempts and displays:
- Overview cards with total stats
- Per-subject expandable cards with detailed breakdowns
- Recent activity table showing the latest quiz attempts

### The Adaptive Algorithm — Explained Simply

The quiz difficulty adjustment uses a **Rolling Window Algorithm**. Think of it like a teacher watching your last 3 answers:

```
Window = [last 3 answers]

If 3/3 correct  → "Student is ready for harder questions"  → HARD
If 0-1/3 correct → "Student needs easier questions"        → EASY  
Otherwise        → "Keep it at medium"                      → MEDIUM
```

This is different from a fixed algorithm because:
- It reacts **instantly** (only looks at the last 3, not all answers)
- It's **forgiving** (one wrong answer doesn't immediately drop difficulty)
- It **challenges growth** (consistent performance pushes you up)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | Component-based UI framework |
| **Vite** | Lightning-fast build tool and dev server |
| **TailwindCSS** | Utility-first CSS framework for styling |
| **Framer Motion** | Smooth animations and page transitions |
| **React Router v6** | Client-side navigation and routing |
| **Lucide React** | Beautiful icon library |
| **Firebase SDK** | Google authentication |
| **Supabase JS** | Database client for user data |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js + Express** | REST API server |
| **Google Gemini 2.5 Flash** | AI model for roadmap & quiz generation |
| **@google/generative-ai** | Official Gemini SDK |
| **CORS + Helmet** | Security middleware |

### Infrastructure
| Service | Purpose |
|---------|---------| 
| **Firebase** | Authentication (Google OAuth) |
| **Supabase** | PostgreSQL database for user profiles |
| **localStorage** | Quiz attempts & progress data storage | 

---
  
## 📁 Project Structure

```
AdaptiveLearning/
├── backend/                    # Express.js API server
│   ├── controllers/
│   │   ├── roadmapController.js    # Roadmap generation logic
│   │   └── quizController.js       # Quiz Q&A + evaluation logic
│   ├── services/
│   │   └── geminiService.js        # Gemini AI integration
│   ├── utils/
│   │   ├── adaptiveAlgorithm.js    # Rolling window difficulty engine
│   │   └── sessionStore.js         # In-memory quiz session storage
│   ├── routes/
│   │   ├── roadmapRoutes.js        # /api/roadmap/* endpoints
│   │   └── quizRoutes.js           # /api/quiz/* endpoints
│   └── server.js                   # Express app entry point
│
├── src/                        # React frontend
│   ├── config/
│   │   ├── firebase.js             # Firebase auth configuration
│   │   └── supabase.js             # Supabase client setup
│   ├── contexts/
│   │   └── AuthContext.jsx         # Global authentication state
│   ├── services/
│   │   ├── api.js                  # Backend API client
│   │   └── userService.js          # User data & progress service
│   ├── pages/
│   │   ├── landing-page/           # Hero, features, navbar
│   │   ├── auth/                   # Login / Signup page
│   │   ├── subject-selection/      # Choose what to learn
│   │   ├── skill-level-selection/  # Choose difficulty level
│   │   ├── goal-selection/         # Choose learning goal
│   │   ├── ai-generated-roadmap/   # Interactive roadmap display
│   │   ├── module-quiz-interface/  # Adaptive quiz with live feedback
│   │   ├── progress/               # Progress tracking dashboard
│   │   ├── features/               # Features showcase page
│   │   └── solution/               # Solution overview page
│   ├── components/
│   │   ├── ui/                     # Reusable UI components (Button, Header)
│   │   ├── ProtectedRoute.jsx      # Auth-guarded route wrapper
│   │   └── AppIcon.jsx             # Dynamic Lucide icon loader
│   └── routes.jsx                  # App routing configuration
│
├── public/                     # Static assets
├── .env                        # Environment variables (frontend)
├── package.json                # Frontend dependencies
└── vite.config.js              # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **Google Gemini API Key** ([Get one free](https://aistudio.google.com/app/apikey))
- A **Firebase project** with Google Auth enabled
- A **Supabase project** (optional, for user profile storage)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/AdaptiveLearning.git
cd AdaptiveLearning

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd backend
npm install
cd ..
```

### Configuration

#### Frontend Environment Variables (`.env` in root)
```env
VITE_API_URL=http://localhost:5000/api

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Supabase (optional)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

#### Backend Environment Variables (`backend/.env`)
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

### Running the Application

You need **two terminals** — one for the backend, one for the frontend:

```bash
# Terminal 1: Start the backend
cd backend
npm start
# → Server running on http://localhost:5000

# Terminal 2: Start the frontend
npm start
# → App running on http://localhost:5173
```

Open `http://localhost:5173` in your browser and you're ready!

---

## 🔌 API Endpoints

### Roadmap
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/roadmap/generate` | Generate a personalized learning roadmap |

### Quiz
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/quiz/question` | Generate next adaptive question |
| `POST` | `/api/quiz/evaluate` | Submit and verify an answer |
| `POST` | `/api/quiz/report` | Get module completion report |
| `GET`  | `/api/quiz/progress/:sessionId/:moduleId` | Get current quiz progress |

---

## 🗺️ Roadmap & Future Plans

- [x] AI-generated personalized roadmaps
- [x] Adaptive quiz engine with rolling window algorithm
- [x] Google authentication
- [x] Progress tracking dashboard
- [x] Premium dark-themed responsive UI
- [ ] 🤖 AI Study Chatbot — real-time study companion
- [ ] 🏆 Certification — downloadable PDF certificates
- [ ] 📧 Weekly progress email reports
- [ ] 🏅 Gamification — badges, streaks, XP points
- [ ] 📱 Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ by the Nayi Disha team
</p>
