// Flat Branch Pub & Brewing Concept Landing Page - Interactive Logic Engine

// 1. MENU CATEGORY TAB SWITCHER
function switchMenuTab(category) {
    // List of all categories
    const categories = ['beers', 'fare', 'pizzas'];
    
    categories.forEach(cat => {
        const tabBtn = document.getElementById(`tab-${cat}`);
        const grid = document.getElementById(`grid-${cat}`);
        
        if (cat === category) {
            // Activate Tab styling
            tabBtn.className = "px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 bg-brick text-white";
            // Show Grid with a smooth fade in
            grid.classList.remove('hidden');
            grid.style.opacity = '0';
            setTimeout(() => {
                grid.style.opacity = '1';
            }, 50);
        } else {
            // Deactivate Tab styling
            tabBtn.className = "px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-pubdark-muted hover:text-white transition-all duration-300";
            // Hide Grid
            grid.classList.add('hidden');
        }
    });
}

// 2. BREWBOT CONCIERGE SIMULATOR (AI INTERACTIVE PANEL)
let chatState = {
    step: 'idle', // idle, booking_guests, booking_datetime, booking_contact, booking_processing
    bookingData: {
        guests: '',
        datetime: '',
        name: '',
        phone: ''
    }
};

const chatMessagesContainer = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');

// Append a message to the chat screen
function appendChatMessage(sender, text, isHtml = false) {
    const bubbleWrapper = document.createElement('div');
    
    if (sender === 'bot') {
        bubbleWrapper.className = "flex gap-3 max-w-[85%] animate-fade-in";
        bubbleWrapper.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-brick flex-shrink-0 flex items-center justify-center text-mustard text-xs">
                <i class="fa-solid fa-robot"></i>
            </div>
            <div class="p-3.5 rounded-lg rounded-tl-none bg-pubdark-card border border-pubdark-border text-xs text-gray-200 leading-relaxed space-y-2">
                ${isHtml ? text : `<p>${escapeHtml(text)}</p>`}
            </div>
        `;
    } else {
        bubbleWrapper.className = "flex gap-3 max-w-[85%] ml-auto justify-end animate-fade-in";
        bubbleWrapper.innerHTML = `
            <div class="p-3.5 rounded-lg rounded-tr-none bg-forest text-white text-xs leading-relaxed">
                <p>${escapeHtml(text)}</p>
            </div>
            <div class="w-8 h-8 rounded-full bg-pubdark-border flex-shrink-0 flex items-center justify-center text-forest-light text-xs border border-pubdark-border">
                <i class="fa-solid fa-user"></i>
            </div>
        `;
    }
    
    chatMessagesContainer.appendChild(bubbleWrapper);
    
    // Auto-scroll to bottom of messages
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// Append a typing indicator
function appendTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'chat-typing-indicator';
    indicator.className = "flex gap-3 max-w-[85%] animate-pulse";
    indicator.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-brick flex-shrink-0 flex items-center justify-center text-mustard text-xs">
            <i class="fa-solid fa-robot animate-bounce"></i>
        </div>
        <div class="p-3.5 rounded-lg rounded-tl-none bg-pubdark-card border border-pubdark-border text-xs text-pubdark-muted italic flex items-center gap-1.5">
            BrewBot is typing<span class="typing"></span>
        </div>
    `;
    chatMessagesContainer.appendChild(indicator);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// Remove the typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Escape HTML utility to prevent XSS in simulated inputs
function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

// Simulate AI response with natural delay
function simulateBotResponse(text, isHtml = false, delay = 1000) {
    appendTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        appendChatMessage('bot', text, isHtml);
    }, delay);
}

// HANDLE TEXT MESSAGE SUBMISSION
function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    // Clear Input
    chatInput.value = '';
    
    // Append User Message
    appendChatMessage('user', text);
    
    // Process context-specific input
    processUserText(text);
}

function handleInputKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// MAIN USER TEXT PROCESSING ENGINE (Simulated NLP)
function processUserText(text) {
    const lowerText = text.toLowerCase();
    
    // If inside table booking state machine
    if (chatState.step !== 'idle') {
        handleBookingWorkflow(text);
        return;
    }
    
    // Keywords matching
    if (lowerText.includes('beer') || lowerText.includes('drink') || lowerText.includes('tap') || lowerText.includes('ale') || lowerText.includes('stout')) {
        simulateBotResponse(`🍻 <strong>Our Craft Beer Recommendations:</strong><br><br>
            • Looking for something iconic? Try our famous <strong>Green Chili Beer</strong> (5.2% ABV) — crisp, golden ale infused with hand-roasted mild green chilies.<br><br>
            • In the mood for something smooth and sweet? Our <strong>Honey Wheat</strong> (4.8% ABV) is brewed with 100% natural Missouri honey.<br><br>
            • Want deep, rich flavors? Our creamy <strong>Oatmeal Stout</strong> (5.5% ABV) is heavily roasted with chocolate malt and coffee aromas.<br><br>
            Would you like to book a table to try them on tap? Just say "book a table"!`, true, 1200);
    } 
    else if (lowerText.includes('veggie') || lowerText.includes('vegetarian') || lowerText.includes('gluten') || lowerText.includes('diet')) {
        simulateBotResponse(`🌱 <strong>Dietary & Vegetarian Offerings:</strong><br><br>
            We love welcoming guests with special dietary desires! We have several vegetarian favorites:<br><br>
            • <strong>Soft Pub Pretzel Sticks</strong> served with warm Pub Light cheese dip and spicy mustard.<br><br>
            • Our <strong>Four Cheese & Basil Wood-Fired Pizza</strong> topped with fresh basil and cold-pressed olive oil.<br><br>
            • <strong>Custom salads and burgers</strong> can also be substituted with plant-based patties upon request!<br><br>
            Let me know if you'd like to book a table tonight!`, true, 1100);
    }
    else if (lowerText.includes('event') || lowerText.includes('trivia') || lowerText.includes('tuesday') || lowerText.includes('music') || lowerText.includes('thursday') || lowerText.includes('brunch') || lowerText.includes('sunday')) {
        simulateBotResponse(`📅 <strong>Weekly Events Calendar:</strong><br><br>
            • <strong>Trivia Tuesdays (7:00 PM):</strong> Pack the pub! Five rounds of trivia, prizes, and $14 pitchers of Pub Light.<br><br>
            • <strong>Acoustic Patio Live (Thursdays 6-9 PM):</strong> Local acoustic musicians on Columbia's best outdoor patio.<br><br>
            • <strong>Brewer's Brunch (Sundays 10 AM - 2 PM):</strong> Waffles, sausage skillets, bottomless mimosas, and $4.50 Honey Wheat drafts.<br><br>
            Would you like to reserve a spot for any of these events?`, true, 1200);
    }
    else if (lowerText.includes('book') || lowerText.includes('reserve') || lowerText.includes('reservation') || lowerText.includes('table') || lowerText.includes('seat')) {
        chatState.step = 'booking_guests';
        simulateBotResponse(`📝 <strong>Table Booking Concierge:</strong><br><br>
            I would love to help you reserve a table at the pub! First, <strong>how many guests</strong> will be in your party? (e.g., 2, 4, 6)`, true, 900);
    }
    else if (lowerText.includes('hour') || lowerText.includes('open') || lowerText.includes('close') || lowerText.includes('time')) {
        simulateBotResponse(`⏰ <strong>Our Operating Hours:</strong><br><br>
            We are open 7 days a week:<br>
            • <strong>Monday - Sunday:</strong> 11:00 AM – 11:00 PM<br>
            *(Note: Our kitchen serves fresh food until 10:00 PM daily, but our bar on-tap beers keep flowing until closing time!)*`, true, 900);
    }
    else if (lowerText.includes('address') || lowerText.includes('location') || lowerText.includes('where') || lowerText.includes('park') || lowerText.includes('columbia')) {
        simulateBotResponse(`📍 <strong>Location & Parking:</strong><br><br>
            You can find us right in the heart of historic downtown Columbia, MO:<br>
            <strong>115 S 9th St, Columbia, MO 65201</strong><br><br>
            Parking is available in the Cherry Street parking garage adjacent to our patio, as well as metered street parking all along Ninth Street.`, true, 1100);
    }
    else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey') || lowerText.includes('greetings')) {
        simulateBotResponse(`Hi there! I am BrewBot. 🤖 How can I help you today? I can share menu recommendations, tell you about trivia night, or reserve a table!`, false, 800);
    }
    else {
        // Fallback generic response
        simulateBotResponse(`I hear you! That sounds great. To help you best, I can:
            - Book a table reservation (say "book a table")
            - Recommend beers (say "suggest a beer")
            - Share vegetarian options (say "veggie foods")
            - Tell you about events (say "trivia night")
            
            What would you like to explore?`, false, 1100);
    }
}

// HANDLE QUICK RECOMMENDATION BUTTONS (ONE-CLICK)
function handleQuickReply(type) {
    if (chatState.step !== 'idle') {
        // Cancel active booking and switch if button clicked
        chatState.step = 'idle';
    }
    
    let userText = '';
    
    if (type === 'suggest_beer') {
        userText = "Can you suggest an award-winning craft beer?";
    } else if (type === 'veggie') {
        userText = "Do you have any vegetarian or dietary dishes?";
    } else if (type === 'events') {
        userText = "What events are happening this week?";
    } else if (type === 'book') {
        userText = "I'd like to reserve a table!";
    }
    
    // Append user message bubble
    appendChatMessage('user', userText);
    
    // Simulate prompt response
    processUserText(userText);
}

// AI TABLE BOOKING WORKFLOW STATE MACHINE
function handleBookingWorkflow(text) {
    const cleanText = text.trim();
    
    if (chatState.step === 'booking_guests') {
        // Extract number of guests
        const num = parseInt(cleanText.match(/\d+/));
        if (num > 0) {
            chatState.bookingData.guests = num;
            chatState.step = 'booking_datetime';
            simulateBotResponse(`Great! A table for <strong>${num} guests</strong>. <br><br><strong>What date and time</strong> would you like for your reservation? (e.g., "Tonight at 7:00 PM" or "Friday at 6:30 PM")`, true, 1000);
        } else {
            simulateBotResponse(`I couldn't quite catch the number of guests. Could you please specify just the number of guests? (e.g., 2, 4, 8)`, false, 800);
        }
    } 
    
    else if (chatState.step === 'booking_datetime') {
        chatState.bookingData.datetime = cleanText;
        chatState.step = 'booking_contact';
        simulateBotResponse(`Got it! Reservation set for <strong>${cleanText}</strong>.<br><br>Lastly, what <strong>name and mobile phone number</strong> should we use for your instant text confirmation? (e.g., "Alex, 573-555-0199")`, true, 1000);
    } 
    
    else if (chatState.step === 'booking_contact') {
        // Store name and phone
        chatState.bookingData.name = cleanText;
        chatState.step = 'booking_processing';
        
        appendTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            
            // Generate a random confirmation code
            const confCode = 'FB-' + Math.floor(100000 + Math.random() * 900000);
            
            // Build visual confirmation receipt HTML card (sleek and modern, no blocky boxes)
            const receiptHtml = `
                <div class="p-5 rounded-lg border border-forest bg-pubdark-bg space-y-4 shadow-xl text-xs animate-fade-in">
                    <div class="text-center border-b border-pubdark-border pb-3.5 space-y-1">
                        <div class="text-forest-light font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-1.5">
                            <i class="fa-solid fa-circle-check"></i> Reservation Confirmed!
                        </div>
                        <p class="text-[10px] text-pubdark-muted">Flat Branch Pub & Brewing — Columbia, MO</p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-y-3.5 text-gray-300">
                        <div>
                            <span class="block text-[10px] text-pubdark-muted uppercase font-bold tracking-wider">Confirmation #</span>
                            <span class="font-mono text-sm text-white font-bold">${confCode}</span>
                        </div>
                        <div>
                            <span class="block text-[10px] text-pubdark-muted uppercase font-bold tracking-wider">Guest Party</span>
                            <span class="font-medium text-white">${chatState.bookingData.guests} Guests</span>
                        </div>
                        <div>
                            <span class="block text-[10px] text-pubdark-muted uppercase font-bold tracking-wider">Date & Time</span>
                            <span class="font-medium text-white">${chatState.bookingData.datetime}</span>
                        </div>
                        <div>
                            <span class="block text-[10px] text-pubdark-muted uppercase font-bold tracking-wider">Reserved For</span>
                            <span class="font-medium text-white truncate max-w-[120px] inline-block">${chatState.bookingData.name}</span>
                        </div>
                    </div>
                    
                    <div class="border-t border-dashed border-pubdark-border/80 pt-3.5 space-y-2 text-center text-[11px] text-gray-400">
                        <p class="flex items-center justify-center gap-1.5 text-forest-light font-medium">
                            <i class="fa-solid fa-comment-sms"></i> SMS confirmation sent to phone!
                        </p>
                        <p class="text-[10px] leading-relaxed">Please arrive 10 minutes early. Your table will be held for up to 15 minutes past reservation time.</p>
                    </div>
                </div>
                
                <p class="text-[11px] text-pubdark-muted">Feel free to ask me anything else, or type "book a table" to make another reservation!</p>
            `;
            
            appendChatMessage('bot', receiptHtml, true);
            
            // Reset booking machine state
            chatState.step = 'idle';
            chatState.bookingData = { guests: '', datetime: '', name: '', phone: '' };
            
        }, 1800);
    }
}

// 3. PRICING TIER SMOOTH-SCROLL & SELECT PRE-FILL
function selectPitchTier(tier) {
    const formSection = document.getElementById('claim-concept');
    const selectElement = document.getElementById('form-tier');
    const descElement = document.getElementById('form-desc');
    
    // Set form select dropdown value
    if (tier === 'Standard') {
        selectElement.value = 'Standard';
        descElement.value = "I am interested in claiming the Standard Website Concept ($1,499) for my business. I'd love to see how we can customize the menu items and style it!";
    } else if (tier === 'Premium') {
        selectElement.value = 'Premium';
        descElement.value = "I want to claim the Premium AI Website Concept ($4,999) featuring the BrewBot conversational booking system. Please contact me with details on how we can deploy this!";
    }
    
    // Smooth scroll down to the inquiry form
    formSection.scrollIntoView({ behavior: 'smooth' });
}

// 4. INQUIRY CONTACT FORM SUBMISSION (Real Integration with server /api/contact)
function submitInquiry(event) {
    event.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const company = document.getElementById('form-company').value || 'Flat Branch Pub & Brewing Pitch';
    const tier = document.getElementById('form-tier').value;
    const description = document.getElementById('form-desc').value;
    
    const feedbackDiv = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    
    // Update button to loading state
    submitBtn.disabled = true;
    btnText.innerText = "Submitting Inquiry...";
    btnIcon.className = "fa-solid fa-circle-notch animate-spin";
    
    // Payload matches existing backend server.js requirements
    const payload = {
        name: name,
        email: email,
        description: `Company: ${company}\n\nGoals: ${description}`,
        tier: tier === 'Custom' ? 'Standard' : tier, // map Custom to Standard or keep track
        url: window.location.href,
        integrations: tier === 'Premium' ? ['AI Chatbot', 'SMS Booking Alerts'] : []
    };
    
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // Reset loading state
        submitBtn.disabled = false;
        btnText.innerText = "Submit Request & Claim Concept";
        btnIcon.className = "fa-solid fa-paper-plane";
        
        if (data.success) {
            // Show custom elegant success card
            feedbackDiv.className = "p-4 rounded-lg text-xs font-semibold bg-forest/15 border border-forest text-forest-light leading-relaxed animate-fade-in mb-6";
            feedbackDiv.innerHTML = `
                <div class="flex items-start gap-2">
                    <span class="mt-0.5"><i class="fa-solid fa-circle-check text-base"></i></span>
                    <div>
                        <h4 class="font-bold text-white mb-0.5">Thank You, Your Pitch Inquiry Has Been Saved!</h4>
                        <p>${data.message}</p>
                    </div>
                </div>
            `;
            feedbackDiv.classList.remove('hidden');
            
            // Clear inputs
            document.getElementById('contact-form').reset();
        } else {
            // Show error
            feedbackDiv.className = "p-4 rounded-lg text-xs font-semibold bg-brick/10 border border-brick text-brick-light leading-relaxed animate-fade-in mb-6";
            feedbackDiv.innerHTML = `
                <div class="flex items-start gap-2">
                    <span class="mt-0.5"><i class="fa-solid fa-circle-xmark text-base"></i></span>
                    <div>
                        <h4 class="font-bold text-white mb-0.5">Submission Failed</h4>
                        <p>${data.error || 'Something went wrong. Please check your fields.'}</p>
                    </div>
                </div>
            `;
            feedbackDiv.classList.remove('hidden');
        }
    })
    .catch(err => {
        console.error('Error submitting inquiry:', err);
        submitBtn.disabled = false;
        btnText.innerText = "Submit Request & Claim Concept";
        btnIcon.className = "fa-solid fa-paper-plane";
        
        feedbackDiv.className = "p-4 rounded-lg text-xs font-semibold bg-brick/10 border border-brick text-brick-light leading-relaxed animate-fade-in mb-6";
        feedbackDiv.innerHTML = `
            <div class="flex items-start gap-2">
                <span class="mt-0.5"><i class="fa-solid fa-triangle-exclamation text-base"></i></span>
                <div>
                    <h4 class="font-bold text-white mb-0.5">Network Error</h4>
                    <p>Unable to connect to the server. Please check your connection and try again.</p>
                </div>
            </div>
        `;
        feedbackDiv.classList.remove('hidden');
    });
}
