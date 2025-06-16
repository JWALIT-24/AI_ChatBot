const chatContent = document.getElementById("chatbox");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function createMessageElement(message, fromUser) {
  const messageElement = document.createElement("div");
  messageElement.className = `chat-message ${fromUser ? "user-message" : "assistant-message"}`;
  messageElement.textContent = message;
  return messageElement;
}

async function fetchResponse(userMessage) {
  try {
    const response = await fetch("https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQm5IZkJDMlNyYUVUTjIyZVN3UWFNX3BFTU85SWpCM2NUMUk3T2dxejhLSzBhNWNMMXNzZlp3c09BSTR6YW1Sc1BmdGNTVk1GY0liT1RoWDZZX1lNZlZ0Z1dqd3c9PQ==", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: userMessage
      })
    });

    const data = await response.json();

    if (data.status === "success") {
      return data.text;
    } else {
      console.error("Error:", data);
      return "An error occurred. Try again.";
    }
  } catch (error) {
    console.error("Network error:", error);
    return "An error occurred. Check your network.";
  }
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  chatContent.appendChild(createMessageElement(userMessage, true));
  userInput.value = "";

  const botResponse = await fetchResponse(userMessage);
  chatContent.appendChild(createMessageElement(botResponse, false));
  chatContent.scrollTop = chatContent.scrollHeight;
});
