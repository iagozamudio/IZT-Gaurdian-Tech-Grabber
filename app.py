import os
import requests
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# The Guardian API base URL and key
GUARDIAN_API_URL = "https://content.guardianapis.com/search"
GUARDIAN_API_KEY = "test"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/news")
def get_news():
    params = {
        "section": "technology",
        "order-by": "newest",
        "api-key": GUARDIAN_API_KEY,
        "show-fields": "thumbnail,trailText,byline",
        "page-size": 12
    }
    try:
        response = requests.get(GUARDIAN_API_URL, params=params)
        response.raise_for_status()
        data = response.json()
        articles = data.get("response", {}).get("results", [])
        return jsonify({"status": "success", "articles": articles})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
