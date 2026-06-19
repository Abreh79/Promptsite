// PromptSite Main Interactive Frontend Script

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  // Terminal / Playground Elements
  const btnGenerate = document.getElementById('btn-generate');
  const heroPromptInput = document.getElementById('hero-prompt');
  const presetBtns = document.querySelectorAll('.preset-btn');
  
  const tabTerminal = document.getElementById('tab-terminal');
  const tabPreview = document.getElementById('tab-preview');
  const mockAddress = document.getElementById('mock-address');
  
  const terminalContent = document.getElementById('terminal-content');
  const previewContent = document.getElementById('preview-content');
  const iframeSimulator = document.getElementById('iframe-simulator');
  
  // Pricing Elements
  const toggleOnetime = document.getElementById('toggle-onetime');
  const toggleAnnual = document.getElementById('toggle-annual');
  const pricingNote = document.getElementById('pricing-subscription-note');
  
  // Contact Form Elements
  const contactForm = document.getElementById('contact-form');
  const formSuccessModal = document.getElementById('form-success-modal');
  const submitFormBtn = document.getElementById('submit-form-btn');
  
  // Chatbot Elements
  const toggleChatBtn = document.getElementById('toggle-chat-btn');
  const closeChatBtn = document.getElementById('close-chat-btn');
  const chatbotPanel = document.getElementById('chatbot-panel');
  const chatbotScreen = document.getElementById('chatbot-screen');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const quickSuggestBtns = document.querySelectorAll('.quick-suggest-btn');

  // --- Mobile Menu Toggle ---
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // --- Portfolio Filtering ---
  const filterBtns = document.querySelectorAll('.portfolio-filter');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active style
      filterBtns.forEach(b => {
        b.classList.remove('bg-brand-600', 'text-white');
        b.classList.add('bg-slate-900', 'text-slate-400', 'border', 'border-slate-800');
      });
      btn.classList.add('bg-brand-600', 'text-white');
      btn.classList.remove('bg-slate-900', 'text-slate-400', 'border', 'border-slate-800');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --- Pricing Frequency Toggle ---
  if (toggleOnetime && toggleAnnual) {
    toggleOnetime.addEventListener('click', () => {
      toggleOnetime.classList.add('bg-brand-600', 'text-white');
      toggleOnetime.classList.remove('text-slate-400');
      toggleAnnual.classList.remove('bg-brand-600', 'text-white');
      toggleAnnual.classList.add('text-slate-400');
      
      pricingNote.classList.add('hidden');
      updatePricingPrices(false);
    });

    toggleAnnual.addEventListener('click', () => {
      toggleAnnual.classList.add('bg-brand-600', 'text-white');
      toggleAnnual.classList.remove('text-slate-400');
      toggleOnetime.classList.remove('bg-brand-600', 'text-white');
      toggleOnetime.classList.add('text-slate-400');
      
      pricingNote.classList.remove('hidden');
      updatePricingPrices(true);
    });
  }

  function updatePricingPrices(withMaintenance) {
    const basicPriceEl = document.querySelector('#pricing div:nth-child(1) span.text-5xl');
    const standardPriceEl = document.querySelector('#pricing div:nth-child(2) span.text-5xl');
    const premiumPriceEl = document.querySelector('#pricing div:nth-child(3) span.text-5xl');

    if (withMaintenance) {
      if (basicPriceEl) basicPriceEl.innerHTML = '$499<span class="text-sm font-semibold text-slate-400">/mo</span>';
      if (standardPriceEl) standardPriceEl.innerHTML = '$1,499<span class="text-sm font-semibold text-slate-400">/mo</span>';
      if (premiumPriceEl) premiumPriceEl.innerHTML = '$4,999<span class="text-sm font-semibold text-slate-400">/mo</span>';
    } else {
      if (basicPriceEl) basicPriceEl.textContent = '$499';
      if (standardPriceEl) standardPriceEl.textContent = '$1,499';
      if (premiumPriceEl) premiumPriceEl.textContent = '$4,999';
    }
  }

  // --- Global function to select tier from cards ---
  window.selectPricingTier = function(tierName) {
    const tierSelect = document.getElementById('form-tier');
    if (tierSelect) {
      tierSelect.value = tierName;
    }
  };

  // --- Interactive Terminal Simulator (Cognitive Engine) ---
  const previewTemplates = {
    photographer: `
      <div class="h-full bg-slate-950 text-slate-100 flex flex-col p-6 overflow-y-auto">
        <header class="flex justify-between items-center border-b border-slate-900 pb-4">
          <span class="font-mono text-sm tracking-widest font-bold uppercase">AETHER CAPTURE</span>
          <nav class="flex gap-4 text-xs text-slate-400">
            <span class="hover:text-white cursor-pointer">Work</span>
            <span class="hover:text-white cursor-pointer">About</span>
            <span class="hover:text-white cursor-pointer">Inquire</span>
          </nav>
        </header>
        <main class="flex-grow flex flex-col items-center justify-center text-center mt-12 space-y-4">
          <span class="text-[10px] tracking-wider bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-full font-bold">FINE ART PHOTOGRAPHY</span>
          <h1 class="text-3xl font-extrabold tracking-tight">Capturing silence and light.</h1>
          <p class="text-xs text-slate-500 max-w-sm">Bespoke cinematic photography tailored to high-end weddings, editorials, and timeless travel moments.</p>
          <div class="grid grid-cols-3 gap-2 w-full max-w-sm mt-6">
            <div class="aspect-square bg-slate-900 rounded-lg flex items-center justify-center border border-slate-850 text-slate-600 text-lg hover:border-brand-500 transition-colors"><i class="fa-solid fa-camera"></i></div>
            <div class="aspect-square bg-slate-900 rounded-lg flex items-center justify-center border border-slate-850 text-slate-600 text-lg hover:border-brand-500 transition-colors"><i class="fa-solid fa-mountain"></i></div>
            <div class="aspect-square bg-slate-900 rounded-lg flex items-center justify-center border border-slate-850 text-slate-600 text-lg hover:border-brand-500 transition-colors"><i class="fa-solid fa-images"></i></div>
          </div>
          <button class="mt-8 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-glow-indigo">Book Session</button>
        </main>
      </div>
    `,
    coffee: `
      <div class="h-full bg-[#1c1613] text-[#f7f2ed] flex flex-col p-6 overflow-y-auto font-serif">
        <header class="flex justify-between items-center border-b border-[#302621] pb-4">
          <span class="font-bold tracking-tight text-sm text-[#e6c9a8]">☕ BEAN & BREW</span>
          <nav class="flex gap-4 text-xs text-[#c9b7a7] font-sans">
            <span class="hover:text-white cursor-pointer">Menu</span>
            <span class="hover:text-white cursor-pointer">Our Beans</span>
            <span class="hover:text-white cursor-pointer">Book Table</span>
          </nav>
        </header>
        <main class="flex-grow flex flex-col items-center justify-center text-center mt-10 space-y-4 font-sans">
          <span class="text-[10px] tracking-wider bg-[#e6c9a8]/10 text-[#e6c9a8] px-2.5 py-1 rounded-full font-bold">EST. 2026</span>
          <h1 class="text-3xl font-extrabold font-serif text-[#e6c9a8] tracking-tight">Artisanal coffee brewed with passion.</h1>
          <p class="text-xs text-[#c9b7a7] font-sans max-w-sm">Sourcing ethically grown, micro-lot coffee beans from Colombia and Ethiopia, roasted daily in house.</p>
          
          <div class="w-full max-w-sm bg-[#28211d] rounded-xl p-4 border border-[#3e322d] text-left space-y-2 mt-6">
            <div class="flex justify-between text-xs border-b border-[#3d322c] pb-1.5">
              <span>Ethiopian Yirgacheffe Pourover</span>
              <span class="font-bold text-[#e6c9a8]">$5.25</span>
            </div>
            <div class="flex justify-between text-xs border-b border-[#3d322c] pb-1.5">
              <span>Velvet Nitro Cold Brew</span>
              <span class="font-bold text-[#e6c9a8]">$4.75</span>
            </div>
            <div class="flex justify-between text-xs pb-0.5">
              <span>Organic Matcha Tea Latte</span>
              <span class="font-bold text-[#e6c9a8]">$5.00</span>
            </div>
          </div>
          <button class="mt-8 px-5 py-2.5 bg-[#e6c9a8] hover:bg-[#ebd5bd] text-[#1c1613] rounded-xl text-xs font-bold transition-all">Reserve Cozy Table</button>
        </main>
      </div>
    `,
    saas: `
      <div class="h-full bg-slate-950 text-slate-100 flex flex-col p-6 overflow-y-auto">
        <header class="flex justify-between items-center border-b border-slate-900 pb-4">
          <div class="flex items-center gap-1.5">
            <span class="h-5 w-5 bg-emerald-500 rounded-md flex items-center justify-center text-[10px] text-slate-950 font-black">📈</span>
            <span class="font-bold text-xs tracking-tight">Apex Analytics</span>
          </div>
          <nav class="flex gap-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            <span class="hover:text-white cursor-pointer">Features</span>
            <span class="hover:text-white cursor-pointer">Pricing</span>
            <span class="hover:text-white cursor-pointer">Demo</span>
          </nav>
        </header>
        <main class="flex-grow flex flex-col items-center justify-center text-center mt-12 space-y-4">
          <span class="text-[10px] tracking-wider bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold uppercase">v3.4 Production Ready</span>
          <h1 class="text-3xl font-extrabold tracking-tight">Scale your SaaS metrics with AI.</h1>
          <p class="text-xs text-slate-500 max-w-sm">Integrate Apex in seconds. Automatically ingest database metrics, predict churn, and optimize pricing tiers live.</p>
          
          <!-- Miniature Analytics Card -->
          <div class="w-full max-w-sm bg-slate-900 rounded-xl p-4 border border-slate-800 text-left grid grid-cols-2 gap-4 mt-6">
            <div class="p-2 border border-slate-850 rounded-lg">
              <span class="text-[10px] text-slate-500 font-semibold block">MONTHLY RECURRING REVENUE</span>
              <span class="text-lg font-bold text-white">$42,910</span>
              <span class="text-[9px] text-emerald-400 block mt-1"><i class="fa-solid fa-arrow-up mr-0.5"></i> +12.4%</span>
            </div>
            <div class="p-2 border border-slate-850 rounded-lg">
              <span class="text-[10px] text-slate-500 font-semibold block">ACTIVE CUSTOMERS</span>
              <span class="text-lg font-bold text-white">1,489</span>
              <span class="text-[9px] text-emerald-400 block mt-1"><i class="fa-solid fa-arrow-up mr-0.5"></i> +8.1%</span>
            </div>
          </div>
          <button class="mt-8 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-extrabold transition-all shadow-glow-emerald">Start Free Trial</button>
        </main>
      </div>
    `
  };

  // Preset Buttons click handlers
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.getAttribute('data-prompt');
      heroPromptInput.value = prompt;
    });
  });

  // Global triggers for hover items in portfolio
  window.simulateAether = function() {
    heroPromptInput.value = "A stunning showcase portfolio for a premium wedding photographer featuring smooth parallax sections and a booking form.";
    document.getElementById('playground').scrollIntoView({ behavior: 'smooth' });
    triggerSimulatorFlow('photographer');
  }

  window.simulateCoffee = function() {
    heroPromptInput.value = "A coffee shop website with a warm rustic layout, elegant interactive menu, and live address map integration.";
    document.getElementById('playground').scrollIntoView({ behavior: 'smooth' });
    triggerSimulatorFlow('coffee');
  }

  window.simulateCarebot = function() {
    heroPromptInput.value = "A dark-themed modern SaaS dashboard landing page with interactive mock analytics and responsive onboarding flow.";
    document.getElementById('playground').scrollIntoView({ behavior: 'smooth' });
    triggerSimulatorFlow('saas');
  }

  if (btnGenerate) {
    btnGenerate.addEventListener('click', () => {
      const promptText = heroPromptInput.value.trim();
      if (!promptText) {
        alert('Please enter a description or click one of the presets first!');
        return;
      }
      
      // Determine template to show based on keyword matching
      let templateKey = 'saas'; // Default
      const lower = promptText.toLowerCase();
      if (lower.includes('photo') || lower.includes('camera') || lower.includes('wedding') || lower.includes('portfolio') || lower.includes('aether')) {
        templateKey = 'photographer';
      } else if (lower.includes('coffee') || lower.includes('shop') || lower.includes('menu') || lower.includes('rustic') || lower.includes('brew')) {
        templateKey = 'coffee';
      }
      
      triggerSimulatorFlow(templateKey);
    });
  }

  function triggerSimulatorFlow(templateKey) {
    // 1. Reset terminal, switch to terminal tab
    tabTerminal.click();
    terminalContent.innerHTML = `
      <div class="text-slate-500">// Welcome to PromptSite Interactive Engine</div>
      <div class="text-slate-400">engine@promptsite:~$ <span class="text-slate-300">await promptsite.initialize()</span></div>
      <div class="text-slate-500">Initializing cognitive compilers... [OK]</div>
      <div class="text-slate-500">Standing by for user request... [OK]</div>
    `;

    // 2. Queue printing lines (simulating AI execution logs)
    const logs = [
      { text: `engine@promptsite:~$ compile --prompt="${heroPromptInput.value.slice(0, 35)}..."`, color: 'text-slate-200' },
      { text: '[AI Architect] Initializing prompt parsing pipeline...', color: 'text-brand-400' },
      { text: '[AI Architect] Ingesting intent parameters: responsive-design, aesthetic-styling, grid-layout.', color: 'text-brand-400' },
      { text: '[System] Creating draft blueprint specifications... DONE', color: 'text-slate-400' },
      { text: '[System] Provisioning production web compiler sandbox...', color: 'text-slate-400' },
      { text: '[Tailwind CSS Engine] Optimizing style design utilities...', color: 'text-cyan-400' },
      { text: '[Vite Node Bundle] Bundling component elements...', color: 'text-amber-400' },
      { text: '[System] Successfully generated sandbox server site!', color: 'text-accent-emerald font-bold' },
      { text: 'engine@promptsite:~$ serve --sandbox-port=3000', color: 'text-slate-200' },
      { text: '[Express Server] Serving interactive blueprint live on port 3000...', color: 'text-slate-500' }
    ];

    let delay = 300;
    logs.forEach((log, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = log.color;
        line.textContent = log.text;
        terminalContent.appendChild(line);
        terminalContent.scrollTop = terminalContent.scrollHeight;

        // If it's the last line, enable preview, and transition to live preview tab!
        if (index === logs.length - 1) {
          setTimeout(() => {
            tabPreview.removeAttribute('disabled');
            tabPreview.click();
            // Inject correct template
            iframeSimulator.innerHTML = previewTemplates[templateKey];
          }, 800);
        }
      }, delay);
      delay += 400; // Fast and dynamic typing speed simulation
    });
  }

  // --- Terminal / Preview Tab Controller ---
  if (tabTerminal && tabPreview) {
    tabTerminal.addEventListener('click', () => {
      tabTerminal.classList.add('bg-slate-800', 'text-white');
      tabTerminal.classList.remove('text-slate-400');
      tabPreview.classList.remove('bg-slate-800', 'text-white');
      tabPreview.classList.add('text-slate-400');
      
      terminalContent.classList.remove('hidden');
      previewContent.classList.add('hidden');
      mockAddress.classList.add('hidden');
    });

    tabPreview.addEventListener('click', () => {
      if (tabPreview.hasAttribute('disabled')) return;
      
      tabPreview.classList.add('bg-slate-800', 'text-white');
      tabPreview.classList.remove('text-slate-400');
      tabTerminal.classList.remove('bg-slate-800', 'text-white');
      tabTerminal.classList.add('text-slate-400');
      
      previewContent.classList.remove('hidden');
      terminalContent.classList.add('hidden');
      mockAddress.classList.remove('hidden');
    });
  }


  // --- Floating Chatbot Controller ---
  if (toggleChatBtn && closeChatBtn && chatbotPanel) {
    toggleChatBtn.addEventListener('click', () => {
      // Toggle visibility classes
      if (chatbotPanel.classList.contains('hidden')) {
        chatbotPanel.classList.remove('hidden');
        setTimeout(() => {
          chatbotPanel.classList.remove('opacity-0', 'translate-y-4', 'scale-95');
        }, 50);
        // Hide pulse notification badge
        const badge = toggleChatBtn.querySelector('.absolute');
        if (badge) badge.classList.add('hidden');
      } else {
        closeChatPanel();
      }
    });

    closeChatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeChatPanel();
    });
  }

  function closeChatPanel() {
    chatbotPanel.classList.add('opacity-0', 'translate-y-4', 'scale-95');
    setTimeout(() => {
      chatbotPanel.classList.add('hidden');
    }, 300);
  }

  // Add event listener to quick suggestion buttons inside chatbot
  quickSuggestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.trim();
      chatbotInput.value = text;
      chatbotForm.dispatchEvent(new Event('submit'));
    });
  });

  // Chat Submission Handler (Communicating with Real Backend `/api/chat`)
  if (chatbotForm) {
    chatbotForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = chatbotInput.value.trim();
      if (!message) return;

      // 1. Add user message to chatbot screen
      addChatMessage(message, 'user');
      chatbotInput.value = '';

      // 2. Add temporary typing indicator
      const typingId = addChatTypingIndicator();

      try {
        // 3. Post to backend `/api/chat`
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });

        const data = await response.json();
        removeChatTypingIndicator(typingId);

        if (response.ok) {
          // 4. Print response message
          addChatMessage(data.reply, 'bot');

          // If action tells us to recommend a pricing tier
          if (data.action === 'recommend_tier' && data.recommendedTier) {
            addChatMessageAction(`Apply Spec & Pre-fill form (${data.recommendedTier} Tier)`, () => {
              applyChatSpecToForm(data.recommendedTier, message);
            });
          }
        } else {
          addChatMessage("Oops! I encountered an error. Could you try asking me again?", 'bot');
        }

      } catch (err) {
        console.error('Chat error:', err);
        removeChatTypingIndicator(typingId);
        addChatMessage("I'm having trouble connecting to the server. Please check your connection and try again.", 'bot');
      }
    });
  }

  function addChatMessage(text, sender) {
    const msgContainer = document.createElement('div');
    msgContainer.className = sender === 'user' 
      ? 'flex gap-2 items-start max-w-[85%] ml-auto justify-end' 
      : 'flex gap-2 items-start max-w-[85%]';
    
    const senderIcon = sender === 'user' ? '👤' : '🤖';
    const bgClass = sender === 'user' 
      ? 'bg-brand-600 text-white p-2.5 rounded-l-xl rounded-br-xl' 
      : 'bg-slate-900 border border-slate-800 text-slate-300 p-2.5 rounded-r-xl rounded-bl-xl';

    msgContainer.innerHTML = sender === 'user'
      ? `
          <div class="${bgClass} leading-relaxed break-words">${text}</div>
          <div class="h-6 w-6 rounded bg-brand-600 flex items-center justify-center text-[10px] text-white">${senderIcon}</div>
        `
      : `
          <div class="h-6 w-6 rounded bg-slate-900 border border-slate-850 flex items-center justify-center text-[10px]">${senderIcon}</div>
          <div class="${bgClass} leading-relaxed break-words whitespace-pre-line">${text}</div>
        `;

    chatbotScreen.appendChild(msgContainer);
    chatbotScreen.scrollTop = chatbotScreen.scrollHeight;
  }

  function addChatTypingIndicator() {
    const id = 'typing-' + Date.now();
    const typingContainer = document.createElement('div');
    typingContainer.id = id;
    typingContainer.className = 'flex gap-2 items-start max-w-[85%]';
    typingContainer.innerHTML = `
      <div class="h-6 w-6 rounded bg-slate-900 border border-slate-850 flex items-center justify-center text-[10px]">🤖</div>
      <div class="bg-slate-900 border border-slate-800 text-slate-400 p-2.5 rounded-r-xl rounded-bl-xl flex items-center gap-1">
        <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
      </div>
    `;
    chatbotScreen.appendChild(typingContainer);
    chatbotScreen.scrollTop = chatbotScreen.scrollHeight;
    return id;
  }

  function removeChatTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  }

  function addChatMessageAction(label, callbackName) {
    const btnContainer = document.createElement('div');
    btnContainer.className = 'pl-8 flex mt-1';
    
    const actionBtn = document.createElement('button');
    actionBtn.className = 'px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg transition-colors shadow-glow-indigo text-[10px]';
    actionBtn.textContent = label;
    
    actionBtn.addEventListener('click', () => {
      callbackName();
      actionBtn.setAttribute('disabled', 'true');
      actionBtn.className = 'px-3 py-1.5 bg-slate-800 text-slate-500 font-bold rounded-lg text-[10px] cursor-not-allowed';
      actionBtn.textContent = 'Applied Spec ✓';
    });

    btnContainer.appendChild(actionBtn);
    chatbotScreen.appendChild(btnContainer);
    chatbotScreen.scrollTop = chatbotScreen.scrollHeight;
  }

  function applyChatSpecToForm(tier, userMsg) {
    // Fill the contact form elements
    const descField = document.getElementById('form-description');
    const selectField = document.getElementById('form-tier');
    
    if (selectField) selectField.value = tier;
    if (descField) {
      descField.value = `I described this project to PromptBot:\n"${userMsg}"\n\nPlease construct a professional spec blueprint matching these details.`;
    }

    // Attempt to automatically match integration checkboxes based on keywords
    const lowerMsg = userMsg.toLowerCase();
    const checkboxMap = {
      ecommerce: ['shop', 'ecommerce', 'store', 'sell', 'stripe', 'product', 'cart'],
      booking: ['booking', 'calendar', 'schedule', 'appointment', 'reservations'],
      chatbot: ['ai', 'chatbot', 'bot', 'gpt', 'openai'],
      voice: ['voice', 'agent', 'speech', 'voice agent'],
      portals: ['portal', 'login', 'auth', 'member', 'accounts'],
      database: ['database', 'mysql', 'postgres', 'sqlite', 'data']
    };

    Object.keys(checkboxMap).forEach(key => {
      const keywords = checkboxMap[key];
      const checkbox = document.querySelector(`input[name="integration"][value="${key}"]`);
      if (checkbox) {
        const matches = keywords.some(word => lowerMsg.includes(word));
        checkbox.checked = matches;
      }
    });

    // Close chat and scroll to form beautifully
    closeChatPanel();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- Main Contact Form Submission Handler (Communicating with `/api/contact`) ---
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Select loading state
      submitFormBtn.setAttribute('disabled', 'true');
      submitFormBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin mr-2"></i> Registering Project Brief...';

      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const description = document.getElementById('form-description').value;
      const url = document.getElementById('form-url').value;
      const tier = document.getElementById('form-tier').value;
      
      const selectedIntegrations = [];
      document.querySelectorAll('input[name="integration"]:checked').forEach(box => {
        selectedIntegrations.push(box.value);
      });

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            description,
            url,
            tier,
            integrations: selectedIntegrations
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Success state
          formSuccessModal.classList.remove('hidden');
          formSuccessModal.classList.add('flex');
        } else {
          alert('Error: ' + (data.error || 'Server error occurred. Please try again.'));
          resetSubmitBtn();
        }

      } catch (err) {
        console.error('Submit error:', err);
        alert('Failed to send inquiry. Please check your network connection and try again.');
        resetSubmitBtn();
      }
    });
  }

  function resetSubmitBtn() {
    submitFormBtn.removeAttribute('disabled');
    submitFormBtn.innerHTML = 'Submit Project Brief <i class="fa-solid fa-paper-plane ml-2"></i>';
  }

  window.resetContactForm = function() {
    if (contactForm) contactForm.reset();
    formSuccessModal.classList.add('hidden');
    formSuccessModal.classList.remove('flex');
    resetSubmitBtn();
  };

});
