
# SIZU 2.0

### Your AI Companion. Your Digital Universe.

SIZU 2.0 is a browser-based AI companion project designed to combine intelligent conversations, a humanoid robotic character, voice interaction, and web-powered information into one futuristic experience.

Created by **Pranav**.

---

## Project Vision

The goal of SIZU is to create a natural, expressive and intelligent AI companion with a premium humanoid interface.

SIZU is being developed as a mobile-friendly web application, with the possibility of future Android app development.

## Planned Features

- AI-powered conversations using Groq.
- Natural Hindi, English and Hinglish communication.
- Expressive 2D humanoid robot character.
- Character emotions and animations.
- Voice input through microphone.
- Spoken AI responses.
- Conversation context and memory.
- Web search for current information.
- Responsive mobile-friendly interface.
- Secure backend API architecture.

*Some features are still under development.*

## Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Fastify
- Groq SDK

### AI
- Groq API
- AI-powered conversational model
- Browser search capabilities

### Deployment
- Render

## Project Structure

```text
SIZU-2.0/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── character.js
│   ├── voice.js
│   └── app.js
│
├── backend/
│   ├── package.json
│   ├── server.js
│   └── .env.example
│
├── .gitignore
├── render.yaml
└── README.md
```

## Getting Started

### Requirements

- Node.js 20 or newer
- npm
- Groq API key

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Open the project folder:

```bash
cd SIZU-2.0
```

Install backend dependencies:

```bash
cd backend
npm install
```

### Environment Configuration

Create a `.env` file inside the backend folder.

Add:

```env
GROQ_API_KEY=YOUR_REAL_GROQ_API_KEY
PORT=3000
```

Replace `YOUR_REAL_GROQ_API_KEY` with your actual API key.

**IMPORTANT:** Never upload your real `.env` file or API key to GitHub.

### Run SIZU

Inside the backend folder, run:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Security

- API keys are stored in backend environment variables.
- Secrets must never be committed to GitHub.
- Backend requests use rate limiting.
- User messages are validated before processing.

## Development Status

<details>
<summary>Current development progress</summary>

- [x] Initial repository structure
- [x] Frontend interface foundation
- [x] Humanoid character foundation
- [x] Voice interaction foundation
- [x] Backend foundation
- [ ] Complete AI integration and testing
- [ ] Persistent conversation memory
- [ ] Complete voice integration
- [ ] Full character animation system
- [ ] Deployment and production testing

</details>

## Creator

**Pranav**

Project: SIZU 2.0

---

*Built with curiosity, creativity and a vision for the future.*
# sizu-third-prototype-