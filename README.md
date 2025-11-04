🧠 AI Chatbot (Flask + React)

A simple chatbot using Flask (Python) for the backend and React with ChatScope UI Kit for the frontend.
It supports Google Gemini and Groq APIs — switch easily between them using an .env file.

UI Library used: [ChatScope React Component](https://chatscope.io/storybook/react/?path=/story/components-chatcontainer--with-toolbox)

🚀 Features

Modern Chat UI using @chatscope/chat-ui-kit-react

Connects to Google Gemini or Groq AI

Easy provider switching via .env

Simple Flask API (/chat) for message handling

⚠️ The UI isn’t that great — feel free to make it look better than mine 😅

⚙️ Installation
1. Clone & Setup
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

2. Backend (Flask)
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt

3. Frontend (React)
cd ../frontend
npm install
npm install @chatscope/chat-ui-kit-react @chatscope/chat-ui-kit-styles

🔑 Environment Setup

Create a .env file inside backend/:

GEMINI_API_KEY=*****************************************   # Paste your Google API key
GROK_API_KEY=*************************************         # Paste your Groq API key
CHAT_PROVIDER=groq                                         # Choose: groq or google


Don’t commit your .env file to GitHub.

▶️ Run the Project
Start Backend
cd backend
python app.py


Backend runs at http://127.0.0.1:5000

Start Frontend
cd frontend
npm run dev


Frontend runs at http://localhost:5173

💬 How It Works

User sends a message from React chat UI.

Flask API receives it and calls the selected LLM (Gemini or Groq).

Response returns to frontend and displays in chat window.


If the chatbot doesn’t impress you, it’s not the AI’s fault — it’s just shy 😄
Make it smarter, make it prettier, and make it yours! 🚀

