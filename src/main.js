(async () => {
  // Generate text with Gemini 2.0 Flash
  const chat_resp = await puter.ai.chat(
    "Generate a recipe of spanish omelette",
    true,
    { model: "gemini-2.0-flash", stream: true }
  );
  puter.print("<h1>Gemini 2.0 Flash:</h1>");
  for await (const part of chat_resp) {
    puter.print(part?.text?.replaceAll("\n", "<br>"));
  }

  // Generate image with DALL-E 3
  puter.ai.txt2img("A picture of a cat.", true).then((image) => {
    document.body.appendChild(image);
  });
})();
