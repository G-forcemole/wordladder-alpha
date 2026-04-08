# Product Requirements Document (PRD)
## Project: Word Ladder Alpha (Standalone Web App)

---

## 1. Objective
Build a standalone web application that allows users to play Word Ladder puzzles using pre-generated ladders. The goal is to rapidly distribute the app for testing, gather feedback, and validate the concept for research purposes.

---

## 2. Target Users
- K–4 students (future target)
- Researchers / educators
- General alpha testers

---

## 3. Scope (Alpha Version)

### Included
- Random Word Ladder selection from JSON
- Interactive gameplay UI
- Input validation (one-letter difference)
- Step-by-step progression
- Reset / new puzzle functionality

### Not Included
- User accounts
- Backend/database
- Score saving
- Analytics dashboard
- Ladder generation algorithm

---

## 4. Tech Stack
- Frontend: React (Vite)
- Hosting: Vercel (Hobby/free)
- Data: Local JSON file
- Styling: Tailwind CSS

---

## 5. Core Features

### 5.1 Puzzle Loading
- Random ladder selected on load
- Ladder contains:
  - start_word
  - end_word
  - steps
  - difficulty
  - word_length

### 5.2 Gameplay Rules
- Change one letter at a time
- Words must be valid
- Same length maintained

### 5.3 Input Handling
- Validate:
  - Length
  - One-letter difference
- Provide feedback:
  - Correct → proceed
  - Incorrect → error message

### 5.4 Game State
- Track:
  - current step
  - user path
  - completion status

### 5.5 Completion
- Show success message
- Option to play again

### 5.6 Reset
- “New Puzzle” button resets game

---

## 6. Data Structure (Example)

```json
[
  {
    "id": 1,
    "start_word": "cold",
    "end_word": "warm",
    "steps": ["cold", "cord", "word", "ward", "warm"],
    "difficulty": "easy",
    "word_length": 4
  }
]
```

---

## 7. Component Structure

- App
  - Header
  - GameBoard
    - StartWord
    - Progress
    - InputBox
    - Feedback
  - Controls
    - NewGameButton
  - CompletionModal

---

## 8. State Management

- currentLadder
- currentStep
- userPath
- status (playing | success)

---

## 9. Core Logic

### Random Selection
```js
function getRandomLadder(ladders) {
  return ladders[Math.floor(Math.random() * ladders.length)];
}
```

### One Letter Difference
```js
function isOneLetterDiff(a, b) {
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diff++;
  }
  return diff === 1;
}
```

---

## 10. UI/UX Requirements
- Clean and minimal design
- Large readable text
- Clear instructions
- Immediate feedback

---

## 11. Responsiveness
- Desktop-first
- Mobile-friendly

---

## 12. Feedback Collection
- Include link to Google Form or survey

---

## 13. Deployment
- Push to GitHub
- Deploy via Vercel
- Share public link

---

## 14. Testing
- Validate gameplay logic
- Handle edge cases
- Test UI responsiveness

---

## 15. Risks
- Data visible in frontend
- No persistence
- Limited analytics

---

## 16. Future Enhancements
- Backend integration
- User accounts
- Analytics
- Leaderboards
- Dynamic ladder generation
