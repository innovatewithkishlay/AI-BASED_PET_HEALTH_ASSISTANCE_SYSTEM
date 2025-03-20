import requests
import os

API_URL = "https://api-inference.huggingface.co/models/Junjun21/pet-care-chat-bot"
HEADERS = {"Authorization": f"Bearer {os.getenv('HF_API_KEY')}"}

def query(payload):
    response = requests.post(API_URL, headers=HEADERS, json=payload)
    return response.json()

test_input = {"inputs": "How do I take care of my dog's diet?"}
output = query(test_input)
print(output)
