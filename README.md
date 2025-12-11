# AI-Powered RFP Management System

A modern web application that streamlines the procurement process using AI to automate RFP creation, vendor management, proposal parsing, and intelligent comparison.

## 🎥 Demo Video

**[📹 Watch Demo Video Here](your-video-link-here)**

*Note: Replace the link above with your actual demo video URL before submission*

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Design Decisions](#design-decisions)
- [AI Tools Usage](#ai-tools-usage)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### 1. AI-Powered RFP Creation
- Natural language input for procurement needs
- OpenAI GPT-3.5 automatically structures RFPs with:
  - Items with quantities and specifications
  - Budget and timeline
  - Payment terms and warranty requirements
- Professional HTML template generation

### 2. Vendor Management
- Full CRUD operations for vendor database
- Store vendor details: name, email, company, specialization
- Easy vendor selection when creating RFPs

### 3. Automated Email Workflow
- **Sending**: Automatically email RFPs to selected vendors via SMTP
- **Receiving**: IMAP listener automatically captures vendor responses
- RFP ID tracking in email subjects for automatic matching

### 4. AI-Powered Proposal Parsing
- Automatically extracts structured data from vendor emails:
  - Price quotes
  - Delivery timelines
  - Warranty terms
  - Payment conditions
- Manual proposal entry option for testing

### 5. Intelligent Proposal Comparison
- AI analyzes all proposals against RFP requirements
- Provides:
  - Numerical scores (0-100)
  - Strengths and weaknesses analysis
  - Best vendor recommendation with reasoning
  - Detailed summaries for each proposal

## 🛠 Tech Stack

### Frontend
- **React 19.2** - UI framework
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - Styling and responsive design
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database (via Mongoose ODM)
- **OpenAI API** - AI/LLM integration
- **Nodemailer** - SMTP email sending
- **IMAP** - Email receiving
- **Mailparser** - Email parsing
- **Handlebars** - HTML templating

### Key Libraries
- `mongoose` - MongoDB object modeling
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `openai` - OpenAI API client

## 📦 Prerequisites

- **Node.js**: v16 or higher
- **MongoDB**: Atlas account or local MongoDB instance
- **OpenAI API Key**: From [OpenAI Platform](https://platform.openai.com/)
- **Email Account**: Gmail or similar with SMTP/IMAP access
  - For Gmail: Enable 2FA and create an [App Password](https://support.google.com/accounts/answer/185833)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd RPF
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create/edit `backend/.env`:

```env
# Server Configuration
PORT=8000

# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rfp

# OpenAI API Key (REQUIRED)
OPENAI_API_KEY=sk-your-openai-api-key-here

# SMTP Configuration (for sending RFPs)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
SMTP_FROM=your_email@gmail.com

# IMAP Configuration (for receiving proposals)
IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=your_email@gmail.com
IMAP_PASS=your_app_password_here
```

### Email Setup Instructions

#### For Gmail:
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the 16-character password
3. Use this App Password for both `SMTP_PASS` and `IMAP_PASS`

#### For Other Providers:
- Update `SMTP_HOST`, `SMTP_PORT`, `IMAP_HOST`, `IMAP_PORT` accordingly
- Ensure IMAP access is enabled in your email settings

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
node server.js
```
Server runs on `http://localhost:8000`

### Start Frontend Development Server
```bash
cd client
npm start
```
Frontend runs on `http://localhost:3000`

### Verify Setup
- Backend health check: `http://localhost:8000/api/health`
- Frontend should open automatically in browser

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api
```

### RFP Endpoints

#### Create RFP
```http
POST /rfp
Content-Type: application/json

{
  "buyerText": "I need 20 laptops with 16GB RAM...",
  "vendorIds": ["vendor_id_1", "vendor_id_2"]
}

Response: 201 Created
{
  "rfp": {
    "_id": "rfp_id",
    "title": "Laptop Procurement",
    "parsed": { ... },
    "html": "<html>...",
    "status": "sent"
  }
}
```

#### Get All RFPs
```http
GET /rfp

Response: 200 OK
[
  {
    "_id": "rfp_id",
    "title": "Laptop Procurement",
    "status": "sent",
    "createdAt": "2024-01-15T10:00:00Z",
    "vendorsSent": [...]
  }
]
```

#### Get RFP by ID
```http
GET /rfp/:id

Response: 200 OK
{
  "_id": "rfp_id",
  "title": "Laptop Procurement",
  "parsed": { ... },
  "html": "<html>..."
}
```

### Vendor Endpoints

#### Create Vendor
```http
POST /vendors
Content-Type: application/json

{
  "name": "Tech Supplies Inc",
  "email": "vendor@example.com",
  "phone": "+1234567890",
  "company": "Tech Supplies Inc",
  "specialization": "IT Hardware"
}

Response: 201 Created
```

#### Get All Vendors
```http
GET /vendors

Response: 200 OK
[
  {
    "_id": "vendor_id",
    "name": "Tech Supplies Inc",
    "email": "vendor@example.com",
    ...
  }
]
```

#### Update Vendor
```http
PUT /vendors/:id
Content-Type: application/json

{ "name": "Updated Name" }

Response: 200 OK
```

#### Delete Vendor
```http
DELETE /vendors/:id

Response: 200 OK
{ "message": "Vendor deleted" }
```

### Proposal Endpoints

#### Create Proposal (Manual)
```http
POST /proposals
Content-Type: application/json

{
  "rfpId": "rfp_id",
  "vendorEmail": "vendor@example.com",
  "rawEmail": "We can provide 20 laptops for $25,000..."
}

Response: 201 Created
```

#### Get Proposals for RFP
```http
GET /proposals/rfp/:rfpId

Response: 200 OK
[
  {
    "_id": "proposal_id",
    "vendorEmail": "vendor@example.com",
    "parsed": {
      "price": "$25,000",
      "deliveryTime": "15 days",
      "warranty": "2 years"
    }
  }
]
```

#### Compare Proposals with AI
```http
GET /proposals/rfp/:rfpId/compare

Response: 200 OK
{
  "recommendations": [
    {
      "vendorEmail": "vendor@example.com",
      "score": 85,
      "strengths": ["Competitive pricing", "Fast delivery"],
      "weaknesses": ["Limited warranty"],
      "summary": "Good overall value..."
    }
  ],
  "bestChoice": "vendor@example.com",
  "reasoning": "Best combination of price and delivery time"
}
```

### Error Responses

All endpoints return errors in this format:
```json
{
  "error": "Error message description"
}
```

Common status codes:
- `400` - Bad Request (missing/invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

## 🎯 Design Decisions

### 1. Data Modeling

#### RFP Schema
```javascript
{
  title: String,
  buyerText: String,  // Original natural language input
  parsed: {           // AI-structured data
    items: [{ name, quantity, specifications }],
    budget: String,
    deliveryTimeline: String,
    paymentTerms: String,
    warranty: String,
    additionalRequirements: String
  },
  html: String,       // Rendered email template
  vendorsSent: [ObjectId],  // References to Vendor model
  status: String,     // 'draft' or 'sent'
  createdAt: Date
}
```

**Rationale**: Separating `buyerText` (raw input) from `parsed` (structured) allows us to preserve original intent while enabling structured queries and comparisons.

#### Vendor Schema
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  company: String,
  specialization: String,
  createdAt: Date
}
```

**Rationale**: Simple, focused schema for vendor master data. Email is unique to prevent duplicates.

#### Proposal Schema
```javascript
{
  rfpId: ObjectId (ref: RFP),
  vendorId: ObjectId (ref: Vendor),
  vendorEmail: String,
  rawEmail: String,   // Original email content
  parsed: {           // AI-extracted data
    price: String,
    deliveryTime: String,
    warranty: String,
    paymentTerms: String,
    additionalNotes: String
  },
  aiScore: Number,    // 0-100 score from comparison
  aiSummary: String,  // AI-generated summary
  createdAt: Date
}
```

**Rationale**: Links proposals to RFPs and vendors. Stores both raw and parsed data for transparency and debugging.

### 2. AI Integration Strategy

#### Why OpenAI GPT-3.5?
- **Cost-effective**: Cheaper than GPT-4 for structured extraction tasks
- **Fast**: Low latency for real-time user experience
- **Reliable**: Consistent JSON output with proper prompting

#### Prompt Engineering Approach
1. **Explicit JSON Schema**: Prompts specify exact JSON structure expected
2. **Low Temperature (0.3)**: Reduces creativity, increases consistency
3. **Context Injection**: For proposal parsing, we include RFP context to improve accuracy

Example prompt structure:
```
Extract structured information from this procurement request. 
Return ONLY valid JSON with this exact structure:
{ "title": "...", "items": [...], ... }

Request: [user input]
```

#### Where AI is Used
1. **RFP Creation**: Natural language → Structured data
2. **Proposal Parsing**: Email text → Structured quote
3. **Comparison**: Multiple proposals → Scored recommendations

### 3. Email Architecture

#### Sending (SMTP)
- Uses Nodemailer with Gmail SMTP
- Embeds RFP ID in subject line: `RFP: Title (RFP ID: 123abc)`
- Includes reply instructions in email footer

#### Receiving (IMAP)
- Background listener monitors inbox
- Extracts RFP ID from subject using regex
- Automatically creates Proposal records
- Runs AI parsing on email body

**Trade-off**: IMAP polling vs webhooks
- Chose IMAP for simplicity and no external service dependencies
- Webhooks (e.g., SendGrid) would be more scalable for production

### 4. Frontend Architecture

#### Component Structure
```
App (Router)
├── Navbar
├── Dashboard (landing page)
├── CreateRfp (form + AI parsing)
├── RfpList (all RFPs)
├── RfpDetails (single RFP + proposals + comparison)
└── VendorManagement (CRUD)
```

#### State Management
- Local component state with `useState`
- No Redux/Context needed for single-user app
- API calls centralized in `Services/Api.js`

**Rationale**: Keep it simple. Single-user app doesn't need complex state management.

### 5. Error Handling

- Backend: Try-catch blocks with descriptive error messages
- Frontend: Alert dialogs for user feedback (simple but effective)
- Email failures: Graceful degradation (RFP still created if email fails)

## 🤖 AI Tools Usage

### Tools Used During Development

#### 1. **GitHub Copilot**
- **Usage**: Code completion and boilerplate generation
- **Helped With**:
  - React component structure
  - Express route handlers
  - Mongoose schema definitions
  - Repetitive CRUD operations
- **Impact**: Reduced development time by ~30% for boilerplate code

#### 2. **ChatGPT (GPT-4)**
- **Usage**: Architecture planning and problem-solving
- **Helped With**:
  - Designing MongoDB schemas
  - Prompt engineering for OpenAI API
  - Email parsing logic with IMAP
  - Bootstrap layout suggestions
- **Notable Prompts**:
  - "Design a MongoDB schema for an RFP management system with vendors and proposals"
  - "Write a prompt for GPT-3.5 to extract structured data from procurement requests"
  - "How to set up IMAP listener in Node.js to auto-process emails"

#### 3. **Amazon Q Developer** (Current Session)
- **Usage**: Full implementation assistance
- **Helped With**:
  - Complete project structure setup
  - Backend API implementation
  - Frontend component creation
  - Documentation writing
  - Best practices and error handling

### What I Learned

1. **AI for Structured Extraction**: 
   - Learned that explicit JSON schemas in prompts dramatically improve consistency
   - Temperature settings matter: 0.3 for extraction, 0.5+ for creative tasks

2. **Email Automation**:
   - IMAP is more complex than SMTP but essential for two-way communication
   - Email subject line parsing is fragile; need robust regex patterns

3. **Prompt Engineering**:
   - "Return ONLY valid JSON" prevents AI from adding explanatory text
   - Including context (RFP details) in proposal parsing improves accuracy

4. **Development Workflow**:
   - AI tools excel at boilerplate but require human oversight for business logic
   - Always test AI-generated code, especially error handling paths

### Code Generated vs. Written

- **AI-Generated**: ~60% (boilerplate, CRUD operations, component structure)
- **Human-Written**: ~40% (business logic, AI prompts, integration, debugging)

## ⚠️ Known Limitations

1. **Email Receiving**:
   - IMAP listener requires continuous server connection
   - May miss emails if server is down
   - No retry mechanism for failed parsing

2. **AI Parsing Accuracy**:
   - Depends on vendor email format
   - May struggle with heavily formatted or PDF-only responses
   - No attachment parsing (PDFs, Excel files)

3. **Scalability**:
   - Single-user design (no authentication)
   - IMAP polling not suitable for high-volume scenarios
   - No caching layer for API responses

4. **Error Recovery**:
   - Limited retry logic for API failures
   - No transaction support for multi-step operations

5. **Testing**:
   - No automated tests (unit/integration)
   - Manual testing only

## 🚀 Future Enhancements

### Short-term
1. **Attachment Support**: Parse PDF/Excel proposals
2. **Email Templates**: Customizable RFP email templates
3. **Proposal Notifications**: Real-time alerts when proposals arrive
4. **Export Features**: Download comparison reports as PDF

### Medium-term
1. **User Authentication**: Multi-user support with JWT
2. **Role-Based Access**: Buyer, approver, admin roles
3. **Approval Workflow**: Multi-stage RFP approval process
4. **Vendor Portal**: Self-service portal for vendors to submit proposals

### Long-term
1. **Advanced Analytics**: Historical pricing trends, vendor performance
2. **Contract Management**: Post-award contract tracking
3. **Integration APIs**: Connect with ERP/procurement systems
4. **Machine Learning**: Predict best vendors based on historical data

## 📝 License

This project is for educational/demonstration purposes.

## 👤 Author

[Your Name]

## 🙏 Acknowledgments

- OpenAI for GPT API
- MongoDB Atlas for database hosting
- Bootstrap team for UI components
