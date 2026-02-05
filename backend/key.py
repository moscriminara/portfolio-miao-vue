from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests

app = Flask(__name__)
CORS(app)

ACCESS_KEY = os.environ.get("a0473987-3dee-4379-a631-d92429e66dc2")

@app.route('/sendRequest', methods=["POST"])
def Key():
    try:
        email = request.form.get("email")
        message = request.form.get("message")

        print("Received", email, message)

        Data = {
            "access_key": ACCESS_KEY,
            "email": email,
            "message": message
        }
        res = requests.post(
            "https://api.web3forms.com/submit",
            data=Data
        )

        print("Web3Forms status", res.status_code)
        print("Web3Forms response", res.text)
        print("I can never believe that this shit requires a membership to send through backend.")

        return {
            "success": True,
            "result": res.json()
        }
    
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5500)