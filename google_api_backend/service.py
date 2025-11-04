from abc import ABC, abstractmethod
import os
import requests
from dotenv import load_dotenv
from google import genai
from google.genai import types
from groq import Groq


load_dotenv()


class ChatService(ABC):
    @abstractmethod
    def get_response(self, message: str) -> str:
        pass
    
    
    
class GoogleAIService(ChatService):
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_API_KEY")
        self.client = genai.Client(api_key=self.api_key)
        
    def get_response(self, message: str) -> str:
            response = self.client.models.generate_content(
              model="gemini-2.0-flash",
              contents=[
                types.Content(
                    role="user",
                    parts=[types.Part.from_text(text=message)]
                )
            ]
        )
        
            return response.text
        
class GrokService(ChatService):
    def __init__(self):
        self.api_key = os.getenv("GROK_API_KEY")
        self.client = Groq(api_key=self.api_key)
        
    def get_response(self, message: str) -> str:
            response = self.client.chat.completions.create(
            model="openai/gpt-oss-20b",  
            messages=[
                {"role": "system", "content": "You are Grok, a witty AI assistant."},
                {"role": "user", "content": message}
            ],
        )
            return response.choices[0].message.content
            
            
            
            
            
            
            
            
            
            
class ChatServiceFactory:
    @staticmethod
    def create_service() -> ChatService:
        provider = os.getenv("CHAT_PROVIDER", "google").lower()
        if provider == "groq":
            return GrokService()
        elif provider == "google":
            return GoogleAIService()
        else:
            raise ValueError(f"Unsupported CHAT_PROVIDER: {provider}")