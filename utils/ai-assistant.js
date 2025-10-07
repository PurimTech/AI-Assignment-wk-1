const messages = [
  "Hi, I'm your AI tutor! Need help with your next lesson?",
  "Great job! Keep up the excellent work!",
  "Remember to take breaks while learning.",
  "You're making amazing progress!",
  "Learning is a journey, not a race.",
  "Every lesson completed is a step forward!",
  "Need a hint? Just ask!",
  "You're doing fantastic! Keep going!",
];

let isOpen = false;

export function initAIAssistant() {
  const assistantHTML = `
    <div class="ai-assistant" id="aiAssistant">
      <button class="ai-assistant-trigger" id="aiTrigger" aria-label="Open AI Assistant">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="pulse-dot"></span>
      </button>

      <div class="ai-assistant-popup" id="aiPopup">
        <div class="ai-assistant-header">
          <div class="ai-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
              <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
              <path d="M9 15c1 1 3 1 4 0"></path>
            </svg>
          </div>
          <div>
            <h4>AI Learning Assistant</h4>
            <p>Always here to help</p>
          </div>
          <button class="close-popup" id="closePopup" aria-label="Close">×</button>
        </div>
        <div class="ai-assistant-body" id="aiBody">
          <div class="ai-message">
            <div class="message-bubble bot">
              ${messages[0]}
            </div>
          </div>
        </div>
        <div class="ai-assistant-footer">
          <button class="ai-quick-btn" data-action="tip">💡 Get a tip</button>
          <button class="ai-quick-btn" data-action="encourage">🎉 Motivate me</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', assistantHTML);

  const trigger = document.getElementById('aiTrigger');
  const popup = document.getElementById('aiPopup');
  const closeBtn = document.getElementById('closePopup');
  const quickBtns = document.querySelectorAll('.ai-quick-btn');

  trigger.addEventListener('click', togglePopup);
  closeBtn.addEventListener('click', togglePopup);

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      addMessage(randomMessage);
    });
  });
}

function togglePopup() {
  const popup = document.getElementById('aiPopup');
  isOpen = !isOpen;
  popup.classList.toggle('open');
}

function addMessage(text) {
  const body = document.getElementById('aiBody');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'ai-message';
  messageDiv.innerHTML = `<div class="message-bubble bot">${text}</div>`;
  body.appendChild(messageDiv);
  body.scrollTop = body.scrollHeight;
}

export function sendAIMessage(message) {
  if (!isOpen) {
    togglePopup();
  }
  setTimeout(() => {
    addMessage(message);
  }, 300);
}
