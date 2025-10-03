document.getElementById("generate").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value.trim();
  const resultDiv = document.getElementById("result");

  if (!prompt) {
    resultDiv.innerHTML = "⚠️ Please enter a prompt first.";
    return;
  }

  resultDiv.innerHTML = "⏳ Generating your letter...";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_OPENROUTER_API_KEY", // your key
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-extension-or-website.com", // optional but recommended
        "X-Title": "TypeLetter" // optional but recommended
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // OpenRouter model
        messages: [
  { 
    role: "system", 
    content: `You are a helpful letter-writing assistant. 

    FORMAL LETTER RULES:
    1. Always include the "From" address block at the top (sender details).
    2. Then include the "Date".
    3. Then include the "To" address block (recipient details).
    4. Then include a clear "Subject" line.
    5. After subject, always start with "Respected Sir/Madam" (never use "Dear").
    6. Then write the body of the letter in a polite and professional tone.
    7. End with "Yours sincerely" or "Yours faithfully" and sender’s name.

    INFORMAL LETTER RULES:
    - Skip From/To/Subject.
    - Start with casual greetings like "Hi", "Hello", "Bro", "Buddy", or "Dear".
    - Keep the body simple and friendly.
    - End with any casual closing like "Cheers", "Take care", etc.

    GENERAL RULES:
    - Always correct grammar and spelling.
    - Ensure letter structure is neat and readable.`
  },
  { role: "user", content: prompt }
]

      })
    });

    const data = await response.json();
    console.log(data); // Debug: check full API response in console

    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
      const cleanText = data.choices[0].message.content.normalize("NFKD");
      resultDiv.innerHTML = `<pre>${cleanText}</pre>`;
      document.getElementById("copy").style.display = "block";
    } else if (data.error && data.error.message) {
      resultDiv.innerHTML = `❌ API Error: ${data.error.message}`;
    } else {
      resultDiv.innerHTML = "⚠️ No response from the API.";
    }

  } catch (err) {
    resultDiv.innerHTML = "❌ Error: " + err.message;
  }
});

const copyBtn = document.getElementById("copy");

copyBtn.addEventListener("click", () => {
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.innerText = "Copied!";
    setTimeout(() => (copyBtn.innerText = "Copy Letter"), 1500);
  });
});