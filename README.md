# 📰 IZT Guardian Tech Grabber

A sleek, premium web application that fetches the latest technology news from **The Guardian** and lets you share articles directly to **LinkedIn** — built with Python Flask, vanilla HTML, CSS, and JavaScript.

![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?style=flat&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## ✨ Features

- 📡 **Live Tech News** — Fetches the 12 latest technology articles from The Guardian API
- 🔄 **One-Click Refresh** — Reload articles anytime with a smooth spinner animation
- 💀 **Skeleton Loaders** — Animated placeholder cards while content is loading
- 🔗 **LinkedIn Sharing** — Share any article directly to LinkedIn with a single click
- 🌗 **Auto Light/Dark Mode** — Adapts to your OS theme preference automatically
- 📱 **Responsive Design** — Works beautifully on desktop, tablet, and mobile
- 🔒 **Secure Proxy** — API key is never exposed to the browser

---

## 🖼 Preview

| Light Mode | Dark Mode |
|---|---|
| *(adapts to your system)* | *(adapts to your system)* |

---

## 🏗 Project Structure

```
IZT-Gaurdian-Tech-Grabber/
├── app.py                  # Flask backend & Guardian API proxy
├── requirements.txt        # Python dependencies
├── .gitignore
├── README.md
├── templates/
│   └── index.html          # Main HTML layout
└── static/
    ├── css/
    │   └── style.css       # Styling & theming
    └── js/
        └── script.js       # Frontend logic & rendering
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- `pip` (Python package manager)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/iagozamudio/IZT-Gaurdian-Tech-Grabber.git
cd IZT-Gaurdian-Tech-Grabber
```

**2. Create and activate a virtual environment** *(recommended)*
```bash
# macOS/Linux
python -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

**3. Install dependencies**
```bash
pip install -r requirements.txt
```

**4. Run the application**
```bash
python app.py
```

**5. Open your browser and navigate to:**
```
http://127.0.0.1:5000
```

---

## 🔑 API Key

This app uses [The Guardian Open Platform API](https://open-platform.theguardian.com/).

By default, it uses the free **`test`** API key which has rate limits. To get a free production key:

1. Visit [open-platform.theguardian.com/access/](https://open-platform.theguardian.com/access/)
2. Register for a free Developer key
3. Replace the key in `app.py`:
```python
# app.py
GUARDIAN_API_KEY = "your-api-key-here"
```

---

## 🔄 How It Works

```
Browser  →  Flask (/api/news)  →  The Guardian API
                                         ↓
Browser  ←  Flask (JSON)       ←  Article Data
```

The Flask server acts as a **secure proxy** — the browser never directly calls The Guardian API, which keeps your API key private. When you click **Post** on an article, LinkedIn's native share dialog opens in a new tab, pre-filled with the article URL — no LinkedIn API setup required.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Flask |
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| News Source | [The Guardian Open Platform API](https://open-platform.theguardian.com/) |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |
| Sharing | LinkedIn Share API (URL-based) |

---

## 📦 Dependencies

```
Flask==3.0.0
requests==2.31.0
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Iago Zamudio**
- GitHub: [@iagozamudio](https://github.com/iagozamudio)
- LinkedIn: [linkedin.com/in/iagozamudio](https://www.linkedin.com/in/iagozamudio)

---

*Built with ❤️ using Python Flask and The Guardian API*
