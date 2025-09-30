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

    if (data.choices && data.choices.length > 0) {
      resultDiv.innerHTML = `<pre>${data.choices[0].message.content}</pre>`;
      document.getElementById("copy").style.display = "block";
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