# Demo Script for Video Recording

## Introduction (30 seconds)
"Hello! I'm demonstrating an AI-Powered RFP Management System that streamlines the procurement process from RFP creation to vendor selection using artificial intelligence."

## 1. Dashboard Overview (30 seconds)
- Show the landing page
- Explain the three main features:
  - Create RFPs with natural language
  - Manage vendor database
  - Compare proposals with AI

## 2. Vendor Management (1 minute)
- Navigate to Vendors page
- Show existing vendors (if seeded)
- Add a new vendor:
  - Name: "Premium Tech Supplies"
  - Email: your_test_email@gmail.com
  - Company: "Premium Tech Supplies"
  - Specialization: "IT Hardware"
- Show the vendor list

## 3. Create RFP with AI (2 minutes)
- Navigate to "Create RFP"
- Paste this natural language input:
```
I need to procure laptops and monitors for our new office. Budget is $50,000 total. 
Need delivery within 30 days. We need 20 laptops with 16GB RAM, Intel i7 processor, 
and 512GB SSD. Also need 15 monitors that are 27-inch, 4K resolution. 
Payment terms should be net 30, and we need at least 1 year warranty on all items.
```
- Select 2-3 vendors
- Click "Create & Send RFP"
- Show the AI-parsed structured data in the preview
- Explain how AI extracted:
  - Items with quantities
  - Budget and timeline
  - Payment terms and warranty

## 4. View RFP List (30 seconds)
- Navigate to "RFPs"
- Show the created RFP with status "sent"
- Click "View Details & Proposals"

## 5. Add Manual Proposal (2 minutes)
- Click "Add Manual Proposal"
- Use vendor email: vendor1@example.com
- Paste this proposal:
```
Thank you for your RFP. We can provide:
- 20 Dell Latitude laptops with 16GB RAM, i7-12th gen, 512GB SSD at $1,200 each = $24,000
- 15 Dell 27" 4K monitors at $400 each = $6,000
Total: $30,000

Delivery: 20 business days
Warranty: 2 years on laptops, 1 year on monitors
Payment Terms: Net 30 accepted
```
- Submit and show AI parsed the proposal automatically

- Add second proposal with different vendor:
```
We can fulfill your requirements:
Laptops: 20 units HP EliteBook, 16GB RAM, i7, 512GB SSD - $1,100 each = $22,000
Monitors: 15 units LG 27" 4K - $450 each = $6,750
Total Price: $28,750

Delivery Time: 25 days
Warranty: 1 year standard on all items
Payment: Net 30 days
```

## 6. AI Comparison (2 minutes)
- Click "Compare with AI"
- Show the AI analysis:
  - Scores for each vendor
  - Strengths and weaknesses
  - Best choice recommendation
  - Detailed reasoning
- Explain how AI evaluated:
  - Price competitiveness
  - Delivery timeline
  - Warranty terms
  - Overall value

## 7. Code Walkthrough (2 minutes)

### Backend Structure
- Show `backend/` folder structure
- Open `utils/aiService.js`:
  - Explain `parseRfpWithAI` function
  - Show prompt engineering approach
  - Explain `compareProposals` function

### AI Integration
- Show how OpenAI API is called
- Explain temperature settings (0.3 for extraction, 0.5 for comparison)
- Show JSON schema in prompts

### Email Integration
- Open `utils/emailReceiver.js`
- Explain IMAP listener
- Show how RFP ID is extracted from subject
- Explain automatic proposal creation

### Frontend
- Show `Components/` structure
- Open `RfpDetails.jsx`
- Explain proposal display and comparison UI

## 8. Email Workflow Demo (1 minute)
- Show sent email in Gmail (if configured)
- Explain RFP ID in subject line
- Show how vendors would reply
- Explain automatic parsing (mention it's running in background)

## Conclusion (30 seconds)
"This system demonstrates how AI can transform procurement by:
- Converting natural language to structured RFPs
- Automatically parsing vendor responses
- Providing intelligent recommendations
- Reducing manual work by 70-80%

The complete code, documentation, and setup instructions are available in the GitHub repository. Thank you!"

## Total Time: ~10 minutes

## Tips for Recording
1. Have all data pre-seeded
2. Test the flow once before recording
3. Keep browser at 100% zoom
4. Close unnecessary tabs
5. Use a clean browser profile
6. Have sample text ready to paste
7. Speak clearly and at moderate pace
8. Highlight key AI features
9. Show actual code, not just UI
10. End with GitHub repo link on screen
