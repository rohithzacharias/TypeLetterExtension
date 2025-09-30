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
        "Authorization": "Bearer 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",  // paste your key here
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",  // <--- here you tell it to use GPT-3.5
        messages: [
          { role: "system", content: "You are a helpful letter-writing assistant. Detect if the request should be formal or casual and generate a well-structured letter." },
          { role: "user", content: prompt }
        ]
      })
    });
    const data = await response.json();
    console.log(data); // Debug: log the API response

    if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
      // If you want to strip non-printable/emoji characters:
      // const cleanText = data.choices[0].message.content.replace(/[^\x20-\x7E\n]/g, "");
      // If you want to keep emojis but make them safe:
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