# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │   RFPs   │  │ Vendors  │  │Proposals │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                         ↓ HTTP/REST API                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │RFP Controller│  │Vendor Ctrl   │  │Proposal Ctrl │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         ↓                  ↓                  ↓              │
│  ┌──────────────────────────────────────────────────┐      │
│  │              Business Logic Layer                 │      │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │      │
│  │  │AI Service│  │Email Send│  │Email Recv│       │      │
│  │  └──────────┘  └──────────┘  └──────────┘       │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   MongoDB    │    │  OpenAI API  │    │ Email Server │
│   Database   │    │   (GPT-3.5)  │    │ (SMTP/IMAP)  │
└──────────────┘    └──────────────┘    └──────────────┘
```

## Data Flow

### 1. RFP Creation Flow
```
User Input (Natural Language)
    ↓
Frontend: CreateRfp Component
    ↓ POST /api/rfp
Backend: rfpController.createRfp()
    ↓
AI Service: parseRfpWithAI()
    ↓ API Call
OpenAI: Extract structured data
    ↓ JSON Response
Backend: Save to MongoDB
    ↓
Email Service: sendRfpEmail()
    ↓ SMTP
Vendor Email Inbox
    ↓
Frontend: Display success + preview
```

### 2. Proposal Receiving Flow
```
Vendor replies to email
    ↓ IMAP
Email Receiver: Background listener
    ↓
Extract RFP ID from subject
    ↓
Fetch RFP from MongoDB
    ↓
AI Service: parseProposalWithAI()
    ↓ API Call
OpenAI: Extract quote details
    ↓ JSON Response
Backend: Create Proposal in MongoDB
    ↓
Frontend: Auto-refresh shows new proposal
```

### 3. Comparison Flow
```
User clicks "Compare with AI"
    ↓ GET /api/proposals/rfp/:id/compare
Backend: proposalController.compareProposalsForRfp()
    ↓
Fetch RFP + All Proposals from MongoDB
    ↓
AI Service: compareProposals()
    ↓ API Call
OpenAI: Analyze and score proposals
    ↓ JSON Response
Backend: Update proposals with scores
    ↓
Frontend: Display recommendations
```

## Database Schema

### Collections

#### RFPs
```javascript
{
  _id: ObjectId,
  title: String,
  buyerText: String,
  parsed: {
    items: [{
      name: String,
      quantity: Number,
      specifications: String
    }],
    budget: String,
    deliveryTimeline: String,
    paymentTerms: String,
    warranty: String,
    additionalRequirements: String
  },
  html: String,
  vendorsSent: [ObjectId], // refs Vendor
  status: String, // 'draft' | 'sent'
  createdAt: Date
}
```

#### Vendors
```javascript
{
  _id: ObjectId,
  name: String,
  email: String, // unique
  phone: String,
  company: String,
  specialization: String,
  createdAt: Date
}
```

#### Proposals
```javascript
{
  _id: ObjectId,
  rfpId: ObjectId, // ref RFP
  vendorId: ObjectId, // ref Vendor (optional)
  vendorEmail: String,
  rawEmail: String,
  parsed: {
    price: String,
    deliveryTime: String,
    warranty: String,
    paymentTerms: String,
    additionalNotes: String
  },
  aiScore: Number, // 0-100
  aiSummary: String,
  createdAt: Date
}
```

### Relationships
- RFP → Vendors (Many-to-Many via vendorsSent array)
- RFP → Proposals (One-to-Many)
- Vendor → Proposals (One-to-Many, optional)

## API Endpoints

### RFP Routes (`/api/rfp`)
- `POST /` - Create RFP with AI parsing
- `GET /` - List all RFPs
- `GET /:id` - Get single RFP

### Vendor Routes (`/api/vendors`)
- `POST /` - Create vendor
- `GET /` - List all vendors
- `PUT /:id` - Update vendor
- `DELETE /:id` - Delete vendor

### Proposal Routes (`/api/proposals`)
- `POST /` - Create proposal (manual)
- `GET /rfp/:rfpId` - Get proposals for RFP
- `GET /rfp/:rfpId/compare` - AI comparison

## AI Integration Points

### 1. RFP Parsing
**Function**: `parseRfpWithAI(buyerText)`
**Model**: GPT-3.5-turbo
**Temperature**: 0.3 (low for consistency)
**Input**: Natural language procurement request
**Output**: Structured JSON with items, budget, terms

### 2. Proposal Parsing
**Function**: `parseProposalWithAI(emailBody, rfpContext)`
**Model**: GPT-3.5-turbo
**Temperature**: 0.3
**Input**: Email text + RFP context
**Output**: Structured quote data

### 3. Proposal Comparison
**Function**: `compareProposals(rfp, proposals)`
**Model**: GPT-3.5-turbo
**Temperature**: 0.5 (higher for reasoning)
**Input**: RFP + all proposals
**Output**: Scores, strengths, weaknesses, recommendation

## Email Integration

### SMTP (Sending)
- **Library**: Nodemailer
- **Protocol**: SMTP over TLS
- **Port**: 587
- **Features**:
  - HTML email templates
  - RFP ID in subject line
  - Reply instructions

### IMAP (Receiving)
- **Library**: imap + mailparser
- **Protocol**: IMAP over TLS
- **Port**: 993
- **Features**:
  - Background listener
  - Auto-parse new emails
  - RFP ID extraction
  - Automatic proposal creation

## Security Considerations

### Current Implementation
- Environment variables for secrets
- CORS enabled for localhost:3000
- MongoDB connection with authentication
- No sensitive data in logs

### Production Recommendations
- Add JWT authentication
- Implement rate limiting
- Use HTTPS only
- Sanitize user inputs
- Add request validation middleware
- Implement API key rotation
- Add audit logging

## Scalability Considerations

### Current Limitations
- Single-user design
- IMAP polling (not scalable)
- No caching layer
- Synchronous AI calls

### Scaling Strategies
1. **Horizontal Scaling**:
   - Load balancer for multiple backend instances
   - Redis for session management
   - Message queue for email processing

2. **Email Processing**:
   - Replace IMAP with webhook-based service (SendGrid, Mailgun)
   - Queue-based processing (Bull, RabbitMQ)
   - Separate microservice for email handling

3. **AI Optimization**:
   - Cache common parsing results
   - Batch AI requests
   - Use streaming for large responses
   - Consider fine-tuned models

4. **Database**:
   - Add indexes on frequently queried fields
   - Implement read replicas
   - Use aggregation pipelines for analytics

## Error Handling Strategy

### Backend
- Try-catch blocks in all async functions
- Descriptive error messages
- HTTP status codes (400, 404, 500)
- Console logging for debugging

### Frontend
- Alert dialogs for user feedback
- Loading states during API calls
- Error boundaries (future enhancement)

### Email
- Graceful degradation if email fails
- RFP still created even if send fails
- Manual proposal entry as fallback

## Monitoring & Logging

### Current
- Console logs for key events
- Email send/receive confirmations
- AI API call logging

### Recommended for Production
- Structured logging (Winston, Pino)
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Email delivery tracking
- AI usage metrics
