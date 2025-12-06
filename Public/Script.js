const form = document.getElementById("logo-form");
const resultBox = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  resultBox.innerHTML = `
    <div class="loading">
        <div class="spinner"></div>
        <p>Dein Logo wird erstellt...</p>
    </div>
  `;

  const brand = document.getElementById("brand").value;
  const style = document.getElementById("style").value;

  try {
    const response = await fetch("/generate-logo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brand, style }),
    });

    const data = await response.json();

    if (!data.image) {
      resultBox.innerHTML = `<p class="error">Fehler beim Generieren. API-Key richtig?</p>`;
      return;
    }

    resultBox.innerHTML = `
      <img src="data:image/png;base64,${data.image}" class="logo-output">
    `;
  } catch (error) {
    resultBox.innerHTML = `<p class="error">Serverfehler.</p>`;
  }
});
