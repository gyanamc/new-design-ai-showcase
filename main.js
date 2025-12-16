const tools = [
  {
    id: 'ama-bot',
    name: 'AMA Bot',
    icon: '💬',
    desc: 'Chat with an SBI Card advisor bot. RAG + prompt orchestration.',
    tags: ['chat', 'rag', 'sbi card'],
    category: 'chat',
    status: 'featured',
    href: 'tool-ama-bot.html',
  },
  {
    id: 'voice-assistant',
    name: 'Voice Assistant',
    icon: '🎤',
    desc: 'Press and speak to ask questions. ElevenLabs voice + backend.',
    tags: ['voice', 'realtime', 'assistant'],
    category: 'voice',
    status: 'featured',
    href: 'tool-voice-assistant.html',
  },
  {
    id: 'prompt-agent',
    name: 'Prompt Agent',
    icon: '💡',
    desc: 'Generate high-quality prompts with guided structure.',
    tags: ['prompt', 'chat'],
    category: 'chat',
    status: 'featured',
    href: 'tool-prompt-agent.html',
  },
  {
    id: 'rewrite-resume',
    name: 'Rewrite Resume',
    icon: '📄',
    desc: 'AI-powered resume optimization with keywords and instructions.',
    tags: ['documents', 'resume', 'ats'],
    category: 'documents',
    status: 'new',
    href: 'tool-rewrite-resume.html',
  },
  {
    id: 'email-agent',
    name: 'Email Agent',
    icon: '📨',
    desc: 'AI replies to support queries using policy guardrails.',
    tags: ['email', 'automation'],
    category: 'automation',
    href: 'tool-email-agent.html',
  },
];

const gridEl = document.getElementById('toolGrid');
const searchInput = document.getElementById('searchInput');
const filterChips = document.querySelectorAll('.filter-chip');
const metricTools = document.getElementById('metric-tools');

metricTools.textContent = tools.length;

function renderCards(filter = 'all', term = '') {
  gridEl.innerHTML = '';
  const q = term.trim().toLowerCase();
  const filtered = tools.filter((tool) => {
    const matchesFilter = filter === 'all' || tool.category === filter;
    const matchesSearch =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.desc.toLowerCase().includes(q) ||
      tool.tags.some((t) => t.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  filtered.forEach((tool) => {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = tool.href;

    if (tool.status === 'featured') {
      card.innerHTML += '<span class="badge featured">Featured</span>';
    } else if (tool.status === 'new') {
      card.innerHTML += '<span class="badge new">New</span>';
    }

    card.innerHTML += `
      <div class="card-icon">${tool.icon}</div>
      <h3 class="card-title">${tool.name}</h3>
      <p class="card-desc">${tool.desc}</p>
      <div class="tags">
        ${tool.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="card-actions">
        <span class="link">Open →</span>
        <span class="tag" style="border:none;background:rgba(255,255,255,0.05);">${tool.category}</span>
      </div>
    `;
    gridEl.appendChild(card);
  });

  if (filtered.length === 0) {
    gridEl.innerHTML = '<p style="color:var(--muted);grid-column:1/-1;">No tools found. Try another search.</p>';
  }
}

filterChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    filterChips.forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    renderCards(chip.dataset.filter, searchInput.value);
  });
});

searchInput.addEventListener('input', (e) => {
  const activeFilter = document.querySelector('.filter-chip.active')?.dataset.filter || 'all';
  renderCards(activeFilter, e.target.value);
});

renderCards();

