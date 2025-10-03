# ✍️ TypeLetter – Chrome Extension

**TypeLetter** is a lightweight Chrome Extension that generates professional or casual letters instantly based on a simple prompt.  
Just type what you need (e.g., *"Leave application for 3 days due to fever"* or *"Birthday invitation for my friend"*), and the extension will automatically detect the tone (formal or casual) and produce a well-structured letter.

---

## 🚀 Features
- 📝 **Prompt to Letter** – Enter any request and get a ready-to-use letter.  
- 🎯 **Tone Detection** – Automatically decides if the letter should be *formal* or *casual*.  
- ⚡ **Powered by GPT-3.5** – Uses OpenRouter API for high-quality letter generation.  
- 📋 **One-Click Copy** – Copy the generated letter instantly.  
- 🎨 **Simple UI** – Minimal, distraction-free design.  

---

## 📂 Project Structure
TypeLetter/

├── manifest.json # Chrome extension config

├── popup.html # User interface

├── popup.js # API call + logic

├── style.css # Extension styling

├── train_bart.py # Training model

├── train_classifier.py # To classify Formal and Informal Letters

└── 📂 icons 
     ├──icon16.png
     
     ├──icon48.png
     
     └──icon128.png

---

## 🛠️ Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/TypeLetter.git
   cd TypeLetter
2. Open Chrome and go to:
chrome://extensions/

3. Enable Developer mode (top right).

4. Click Load unpacked and select the TypeLetter folder.

5. The extension will appear in your toolbar. 🎉

