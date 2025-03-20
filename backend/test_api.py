from dotenv import load_dotenv
import os
import requests

load_dotenv()  # Load environment variables from .env

API_KEY = os.getenv("HF_API_KEY")

if not API_KEY:
    print("Error: API key not found. Make sure it's set in the .env file.")
    exit()

headers = {"Authorization": f"Bearer {API_KEY}"}
response = requests.get("https://huggingface.co/api/whoami-v2", headers=headers)

print("Response Status Code:", response.status_code)
print("Response Text:", response.text)
