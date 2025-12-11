# System Flow Diagrams

## Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                              │
└─────────────────────────────────────────────────────────────────┘

Step 1: VENDOR SETUP
User → Vendors Page → Add Vendor → Save to DB
                                      ↓
                              [Vendor Created]

Step 2: RFP CREATION
User → Create RFP Page → Type Natural Language
                              ↓
                    "I need 20 laptops..."
                              ↓
                    POST /api/rfp
                              ↓
                    Backend: aiService.parseRfpWithAI()
                              ↓
                    OpenAI API Call
                              ↓
                    Structured JSON Response
                              ↓
                    Save to MongoDB
                              ↓
                    Generate HTML Template
                              ↓
                    Send Emails to Selected Vendors
                              ↓
                    [RFP Created & Sent]

Step 3: VENDOR RESPONSE
Vendor → Receives Email → Replies with Quote
                              ↓
                    Email arrives in inbox
                              ↓
                    IMAP Listener detects new email
                              ↓
                    Extract RFP ID from subject
                              ↓
                    Fetch RFP from DB
                              ↓
                    aiService.parseProposalWithAI()
                              ↓
                    OpenAI API Call
                              ↓
                    Structured Proposal Data
                              ↓
                    Save to MongoDB
                              ↓
                    [Proposal Auto-Created]

Step 4: COMPARISON
User → RFP Details Page → Click "Compare with AI"
                              ↓
                    GET /api/proposals/rfp/:id/compare
                              ↓
                    Fetch RFP + All Proposals
                              ↓
                    aiService.compareProposals()
                              ↓
                    OpenAI API Call
                              ↓
                    Analysis with Scores & Recommendations
                              ↓
                    Update Proposals with Scores
                              ↓
                    [Comparison Results Displayed]

Step 5: DECISION
User → Reviews Recommendations → Makes Decision
```

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     DATA FLOW                                 │
└──────────────────────────────────────────────────────────────┘

FRONTEND (React)
    │
    │ HTTP Request
    ↓
BACKEND (Express)
    │
    ├─→ Controllers (Business Logic)
    │       │
    │       ├─→ AI Service (OpenAI)
    │       │       │
    │       │       └─→ GPT-3.5 API
    │       │
    │       ├─→ Email Service
    │       │       │
    │       │       ├─→ SMTP (Send)
    │       │       └─→ IMAP (Receive)
    │       │
    │       └─→ Models (Data Access)
    │               │
    │               └─→ MongoDB
    │
    └─→ Response (JSON)
```

## RFP Creation Flow (Detailed)

```
┌─────────────────────────────────────────────────────────────┐
│              RFP CREATION DETAILED FLOW                      │
└─────────────────────────────────────────────────────────────┘

1. USER INPUT
   ┌─────────────────────────────────────┐
   │ "I need 20 laptops with 16GB RAM,   │
   │  budget $25,000, delivery 30 days,  │
   │  payment net 30, warranty 1 year"   │
   └─────────────────────────────────────┘
                    ↓
2. FRONTEND PROCESSING
   CreateRfp.jsx
   - Collect input
   - Select vendors
   - Call API
                    ↓
3. API CALL
   POST /api/rfp
   {
     buyerText: "...",
     vendorIds: ["id1", "id2"]
   }
                    ↓
4. BACKEND CONTROLLER
   rfpController.createRfp()
   - Validate input
   - Call AI service
                    ↓
5. AI PARSING
   aiService.parseRfpWithAI()
   
   Prompt:
   "Extract structured information...
    Return ONLY valid JSON..."
                    ↓
6. OPENAI API
   GPT-3.5-turbo
   Temperature: 0.3
   
   Returns:
   {
     title: "Laptop Procurement",
     items: [{
       name: "laptops",
       quantity: 20,
       specifications: "16GB RAM"
     }],
     budget: "$25,000",
     deliveryTimeline: "30 days",
     paymentTerms: "Net 30",
     warranty: "1 year"
   }
                    ↓
7. HTML GENERATION
   renderRfp.js
   - Use Handlebars template
   - Generate professional HTML
                    ↓
8. DATABASE SAVE
   MongoDB
   - Save RFP document
   - Link to vendors
                    ↓
9. EMAIL SENDING
   sendEmail.js
   - Fetch vendor emails
   - Send via SMTP
   - Include RFP ID in subject
                    ↓
10. RESPONSE
    Return to frontend:
    {
      rfp: {...},
      parsed: {...},
      html: "..."
    }
                    ↓
11. UI UPDATE
    - Show success message
    - Display preview
    - Redirect to RFP list
```

## Email Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                   EMAIL WORKFLOW                             │
└─────────────────────────────────────────────────────────────┘

SENDING (Outbound)
─────────────────
System → SMTP Server → Vendor Inbox

Email Format:
┌────────────────────────────────────┐
│ Subject: RFP: Laptop Procurement   │
│          (RFP ID: 507f1f77bcf...)  │
│                                    │
│ [Professional HTML Template]       │
│                                    │
│ Items, Budget, Timeline, Terms     │
│                                    │
│ Reply to this email with quote     │
└────────────────────────────────────┘

RECEIVING (Inbound)
───────────────────
Vendor Reply → IMAP Server → System Inbox
                                    ↓
                        IMAP Listener (Background)
                                    ↓
                        Parse Email
                                    ↓
                        Extract RFP ID from Subject
                                    ↓
                        Match to RFP in Database
                                    ↓
                        AI Parse Email Body
                                    ↓
                        Create Proposal Record
                                    ↓
                        [Auto-Added to System]
```

## AI Comparison Flow

```
┌─────────────────────────────────────────────────────────────┐
│              AI COMPARISON FLOW                              │
└─────────────────────────────────────────────────────────────┘

1. USER ACTION
   Click "Compare with AI"
                    ↓
2. API CALL
   GET /api/proposals/rfp/:id/compare
                    ↓
3. FETCH DATA
   - Get RFP details
   - Get all proposals for RFP
                    ↓
4. PREPARE CONTEXT
   RFP Requirements:
   {
     items: [...],
     budget: "$25,000",
     deliveryTimeline: "30 days",
     ...
   }
   
   Proposals:
   [
     {vendor: "A", price: "$24,000", delivery: "20 days"},
     {vendor: "B", price: "$26,000", delivery: "15 days"},
     {vendor: "C", price: "$23,000", delivery: "35 days"}
   ]
                    ↓
5. AI ANALYSIS
   aiService.compareProposals()
   
   Prompt:
   "Analyze these proposals for an RFP.
    Consider: price, delivery, warranty, terms.
    Return scores, strengths, weaknesses,
    and recommend best vendor."
                    ↓
6. OPENAI API
   GPT-3.5-turbo
   Temperature: 0.5 (higher for reasoning)
   
   Returns:
   {
     recommendations: [
       {
         vendorEmail: "A",
         score: 85,
         strengths: ["Competitive price", "Fast delivery"],
         weaknesses: ["Standard warranty"],
         summary: "Good balance of price and speed"
       },
       {
         vendorEmail: "B",
         score: 75,
         strengths: ["Fastest delivery"],
         weaknesses: ["Over budget"],
         summary: "Premium option, higher cost"
       },
       {
         vendorEmail: "C",
         score: 70,
         strengths: ["Lowest price"],
         weaknesses: ["Slow delivery"],
         summary: "Budget option, longer wait"
       }
     ],
     bestChoice: "A",
     reasoning: "Vendor A offers the best combination..."
   }
                    ↓
7. UPDATE DATABASE
   - Save scores to proposals
   - Save summaries
                    ↓
8. RETURN RESULTS
   Send comparison to frontend
                    ↓
9. UI DISPLAY
   - Show scores with badges
   - Display strengths/weaknesses
   - Highlight best choice
   - Show reasoning
```

## Component Interaction

```
┌─────────────────────────────────────────────────────────────┐
│            FRONTEND COMPONENT FLOW                           │
└─────────────────────────────────────────────────────────────┘

App.js (Router)
    │
    ├─→ Navbar (Always visible)
    │
    ├─→ Dashboard (/)
    │       │
    │       └─→ Feature cards with navigation
    │
    ├─→ VendorManagement (/vendors)
    │       │
    │       ├─→ List vendors
    │       ├─→ Add vendor form
    │       ├─→ Edit vendor
    │       └─→ Delete vendor
    │
    ├─→ CreateRfp (/create-rfp)
    │       │
    │       ├─→ Text input
    │       ├─→ Vendor selection
    │       ├─→ API call
    │       └─→ Preview display
    │
    ├─→ RfpList (/rfps)
    │       │
    │       ├─→ Fetch all RFPs
    │       └─→ Display as cards
    │               │
    │               └─→ Click → RfpDetails
    │
    └─→ RfpDetails (/rfp/:id)
            │
            ├─→ Display RFP HTML
            ├─→ List proposals
            ├─→ Add manual proposal
            └─→ Compare button
                    │
                    └─→ Show AI comparison
```

## Database Relationships

```
┌─────────────────────────────────────────────────────────────┐
│              DATABASE SCHEMA RELATIONSHIPS                   │
└─────────────────────────────────────────────────────────────┘

┌──────────┐
│   RFP    │
│──────────│
│ _id      │◄────────┐
│ title    │         │
│ parsed   │         │ Many-to-One
│ html     │         │
│ vendors[]│─────┐   │
│ status   │     │   │
└──────────┘     │   │
                 │   │
                 │   │
                 ↓   │
            ┌─────────┐      ┌──────────┐
            │ Vendor  │      │ Proposal │
            │─────────│      │──────────│
            │ _id     │      │ _id      │
            │ name    │      │ rfpId    │───┘
            │ email   │◄─────│ vendorId │
            │ company │      │ parsed   │
            └─────────┘      │ aiScore  │
                             └──────────┘

Relationships:
- RFP has many Vendors (vendorsSent array)
- RFP has many Proposals (rfpId reference)
- Proposal belongs to one RFP
- Proposal may belong to one Vendor (optional)
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────┐
│                ERROR HANDLING FLOW                           │
└─────────────────────────────────────────────────────────────┘

User Action
    ↓
Frontend Component
    ↓
try {
    API Call
        ↓
    Backend Controller
        ↓
    try {
        Business Logic
            ↓
        [Success]
            ↓
        Return 200 OK
    }
    catch (error) {
        Log error
            ↓
        Return 400/500 with error message
    }
}
catch (error) {
    Show alert to user
        ↓
    Log to console
        ↓
    Keep UI functional
}

Error Types:
- Validation errors → 400 Bad Request
- Not found → 404 Not Found
- Server errors → 500 Internal Server Error
- AI API errors → Caught and logged
- Email errors → Graceful degradation
```

## Security Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  SECURITY MEASURES                           │
└─────────────────────────────────────────────────────────────┘

Environment Variables
    ↓
.env file (not in git)
    ↓
Loaded by dotenv
    ↓
Used in code
    ↓
Never exposed to frontend

CORS Configuration
    ↓
Only allow localhost:3000
    ↓
Prevent unauthorized access

Input Validation
    ↓
Frontend: HTML5 validation
    ↓
Backend: Schema validation
    ↓
Sanitize before DB save

Email Security
    ↓
App passwords (not real passwords)
    ↓
TLS encryption
    ↓
Secure SMTP/IMAP connections
```

This completes the system flow documentation!
