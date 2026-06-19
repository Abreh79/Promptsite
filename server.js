const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');

// Ensure inquiries.json exists
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
}

// API endpoint for contact/quote submissions
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, description, url, tier, integrations } = req.body;
    
    if (!name || !email || !description) {
      return res.status(400).json({ success: false, error: 'Please fill in all required fields (Name, Email, Description).' });
    }
    
    const newInquiry = {
      id: Date.now().toString(),
      name,
      email,
      description,
      url: url || '',
      tier: tier || 'Basic',
      integrations: integrations || [],
      timestamp: new Date().toISOString()
    };
    
    const inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf8'));
    inquiries.push(newInquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
    
    return res.status(200).json({ success: true, message: 'Thank you! Your request has been received. Our team will contact you shortly.' });
  } catch (err) {
    console.error('Error saving inquiry:', err);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// API endpoint for chatbot simulation
app.post('/api/chat', (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const lowerMessage = message.toLowerCase();
    let reply = '';
    let action = null;
    let recommendedTier = null;
    
    // Simple but highly intelligent rule-based agent for website consulting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      reply = "Hello! I'm PromptBot, your AI Website Consultant. Tell me about the website you want to build, or share a link you'd like to use as a reference, and I'll help you spec it out!";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
      reply = "Our pricing is transparent and tiered based on complexity:\n\n" +
              "• **Basic ($499+)**: Perfect for landing pages, portfolios, or simple business sites. (1-2 days delivery)\n" +
              "• **Standard ($1,499+)**: Best for multi-page business sites, complete e-commerce stores, custom blogs, or booking/scheduling systems. (3-5 days delivery)\n" +
              "• **Premium ($4,999+)**: Ideal for advanced sites with AI integrations (like chatbots, voice agents), custom user portals, SaaS MVPs, and complex backend databases. (1-2 weeks delivery)\n\n" +
              "Which one of these matches your project goals, or would you like me to recommend one based on your description?";
    } else if (lowerMessage.includes('shop') || lowerMessage.includes('ecommerce') || lowerMessage.includes('store') || lowerMessage.includes('sell') || lowerMessage.includes('stripe') || lowerMessage.includes('product') || lowerMessage.includes('cart')) {
      recommendedTier = 'Standard';
      reply = "Awesome! An e-commerce or store setup fits perfectly under our **Standard Tier ($1,499+)**. This includes full product listings, a shopping cart, secure payment checkout with Stripe or PayPal, custom order tracking, and a clean admin panel to manage inventory. Would you like me to apply this tier and pre-fill a specification sheet for you?";
      action = 'recommend_tier';
    } else if (lowerMessage.includes('ai') || lowerMessage.includes('chatbot') || lowerMessage.includes('bot') || lowerMessage.includes('voice') || lowerMessage.includes('gpt') || lowerMessage.includes('agent') || lowerMessage.includes('openai')) {
      recommendedTier = 'Premium';
      reply = "Incredible choice! Integrating AI (like custom conversational chatbots, voice agents, or smart scheduling agents) is our specialty and falls under the **Premium Tier ($4,999+)**. We'll build bespoke LLM-powered integrations tailored to your business, complete with memory, custom system prompts, and beautiful interactive interfaces. Shall I set this up as your project specification?";
      action = 'recommend_tier';
    } else if (lowerMessage.includes('booking') || lowerMessage.includes('calendar') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment') || lowerMessage.includes('reservations')) {
      recommendedTier = 'Standard';
      reply = "An interactive booking or scheduling system is a great way to automate your workflow! We build custom reservation calendars and appointment flows in our **Standard Tier ($1,499+)**. It'll sync with Google Calendar or your internal database and even support deposit payments. Would you like to use this tier for your quote?";
      action = 'recommend_tier';
    } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('landing page') || lowerMessage.includes('resume') || lowerMessage.includes('simple') || lowerMessage.includes('personal') || lowerMessage.includes('one page')) {
      recommendedTier = 'Basic';
      reply = "A beautiful personal site or single-page landing falls perfectly into our **Basic Tier ($499+)**. We'll craft a fast, responsive, and stunning single-page site with a contact form and modern animations. Should I prepare a Basic spec sheet for you?";
      action = 'recommend_tier';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('get started') || lowerMessage.includes('order') || lowerMessage.includes('submit')) {
      reply = "Perfect! I can help you get started right now. I've pre-filled a spec sheet with our conversation. Just scroll down to the contact form, check the details, and hit submit, or click 'Apply Spec' here in our chat!";
      action = 'show_form';
    } else {
      reply = "That sounds like an exciting project! To give you the best advice, could you tell me a bit more? For instance:\n" +
              "1. What is the main goal of the site (e.g. showcasing a portfolio, selling products, booking appointments)?\n" +
              "2. Do you need any special features, like an AI assistant, user login, or custom database integration?";
    }
    
    return res.status(200).json({ reply, action, recommendedTier });
  } catch (err) {
    console.error('Error in chat endpoint:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fallback to index.html for SPA-like routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`PromptSite Marketing Web Server running on port ${PORT}...`);
});
