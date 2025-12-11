# Testing Guide

## Manual Testing Checklist

### Prerequisites
- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] MongoDB connected
- [ ] OpenAI API key configured
- [ ] Email credentials configured (optional)

## Test Scenarios

### 1. Vendor Management

#### Test 1.1: Create Vendor
**Steps**:
1. Navigate to "Vendors" page
2. Click "Add Vendor"
3. Fill in form:
   - Name: "Test Vendor 1"
   - Email: "test1@example.com"
   - Phone: "+1234567890"
   - Company: "Test Company"
   - Specialization: "IT Hardware"
4. Click "Add"

**Expected**: 
- Success alert shown
- Vendor appears in table
- Form resets

#### Test 1.2: Edit Vendor
**Steps**:
1. Click "Edit" on any vendor
2. Change name to "Updated Vendor"
3. Click "Update"

**Expected**:
- Success alert shown
- Table shows updated name

#### Test 1.3: Delete Vendor
**Steps**:
1. Click "Delete" on any vendor
2. Confirm deletion

**Expected**:
- Confirmation dialog appears
- Vendor removed from table

### 2. RFP Creation

#### Test 2.1: Create RFP with AI Parsing
**Steps**:
1. Navigate to "Create RFP"
2. Paste sample text:
```
I need to procure 50 office chairs and 10 desks for our new office. 
Budget is $15,000. Need delivery within 2 weeks. 
Chairs should be ergonomic with lumbar support. 
Desks should be height-adjustable, 60 inches wide. 
Payment terms: Net 30. Warranty: 2 years minimum.
```
3. Select 2 vendors
4. Click "Create & Send RFP"

**Expected**:
- Loading indicator shown
- AI parses text into structured format
- Preview shows formatted RFP
- Success alert appears
- Redirects to RFP list

**Verify AI Parsing**:
- [ ] Title extracted correctly
- [ ] Items array has 2 items (chairs, desks)
- [ ] Quantities correct (50, 10)
- [ ] Budget: "$15,000"
- [ ] Timeline: "2 weeks"
- [ ] Payment terms: "Net 30"
- [ ] Warranty: "2 years"

#### Test 2.2: Create RFP Without Vendors
**Steps**:
1. Create RFP without selecting vendors
2. Submit

**Expected**:
- RFP created with status "draft"
- No emails sent
- Can still view RFP

### 3. RFP List & Details

#### Test 3.1: View RFP List
**Steps**:
1. Navigate to "RFPs"

**Expected**:
- All RFPs displayed as cards
- Shows title, date, status, vendor count
- "View Details" button on each card

#### Test 3.2: View RFP Details
**Steps**:
1. Click "View Details & Proposals" on any RFP

**Expected**:
- RFP details displayed with formatted HTML
- Proposals section shown
- "Add Manual Proposal" button visible
- "Compare with AI" button (if proposals exist)

### 4. Proposal Management

#### Test 4.1: Add Manual Proposal
**Steps**:
1. On RFP details page, click "Add Manual Proposal"
2. Enter vendor email: "vendor1@test.com"
3. Paste proposal text:
```
We can provide:
- 50 ergonomic office chairs at $200 each = $10,000
- 10 height-adjustable desks at $400 each = $4,000
Total: $14,000

Delivery: 10 business days
Warranty: 3 years on all items
Payment: Net 30 accepted
```
4. Click "Submit"

**Expected**:
- Success alert shown
- Form closes
- Proposal appears in list
- AI parsed fields correctly:
  - Price: "$14,000"
  - Delivery: "10 business days"
  - Warranty: "3 years"
  - Payment: "Net 30"

#### Test 4.2: Add Second Proposal
**Steps**:
1. Add another proposal with different vendor:
```
Our quote:
Chairs: 50 units @ $180 each = $9,000
Desks: 10 units @ $450 each = $4,500
Total Price: $13,500

Delivery Time: 15 days
Warranty: 2 years standard
Payment Terms: Net 30
```

**Expected**:
- Second proposal added successfully
- Both proposals visible

### 5. AI Comparison

#### Test 5.1: Compare Proposals
**Steps**:
1. With 2+ proposals, click "Compare with AI"
2. Wait for analysis

**Expected**:
- Loading indicator shown
- Comparison card appears with:
  - Best choice recommendation
  - Reasoning explanation
  - Detailed analysis for each vendor
  - Scores (0-100)
  - Strengths and weaknesses
- Proposal cards updated with scores

**Verify AI Analysis**:
- [ ] Scores are reasonable (0-100)
- [ ] Best choice identified
- [ ] Reasoning makes sense
- [ ] Strengths/weaknesses relevant
- [ ] Considers price, delivery, warranty

#### Test 5.2: Compare with Single Proposal
**Steps**:
1. Try comparing with only 1 proposal

**Expected**:
- Still works
- Provides analysis of single proposal

### 6. Email Integration (If Configured)

#### Test 6.1: Email Sending
**Steps**:
1. Create RFP with your own email as vendor
2. Check inbox

**Expected**:
- Email received
- Subject contains RFP ID
- HTML formatted properly
- Reply instructions included

#### Test 6.2: Email Receiving
**Steps**:
1. Reply to RFP email with proposal
2. Wait 1-2 minutes
3. Refresh RFP details page

**Expected**:
- Proposal automatically created
- AI parsed email content
- Proposal visible in list

### 7. Navigation & UI

#### Test 7.1: Navigation Bar
**Steps**:
1. Click each nav link

**Expected**:
- All links work
- Active page highlighted
- No broken routes

#### Test 7.2: Dashboard
**Steps**:
1. Navigate to home page

**Expected**:
- Three feature cards displayed
- "How It Works" section visible
- All buttons functional

### 8. Error Handling

#### Test 8.1: Invalid API Key
**Steps**:
1. Set invalid OpenAI API key
2. Try creating RFP

**Expected**:
- Error alert shown
- Descriptive error message
- App doesn't crash

#### Test 8.2: Network Error
**Steps**:
1. Stop backend server
2. Try any action

**Expected**:
- Error alert shown
- Frontend remains functional

#### Test 8.3: Invalid Email
**Steps**:
1. Create vendor with invalid email format
2. Submit

**Expected**:
- HTML5 validation prevents submission
- Or backend returns 400 error

### 9. Edge Cases

#### Test 9.1: Empty RFP Text
**Steps**:
1. Try creating RFP with empty text

**Expected**:
- Form validation prevents submission

#### Test 9.2: Very Long RFP Text
**Steps**:
1. Paste 5000+ character text
2. Create RFP

**Expected**:
- AI still parses correctly
- No timeout errors

#### Test 9.3: Ambiguous RFP Text
**Steps**:
1. Create RFP with vague text: "I need some stuff"

**Expected**:
- AI does best effort parsing
- May have "Not specified" fields
- Still creates valid RFP

#### Test 9.4: Special Characters
**Steps**:
1. Use text with special chars: $, €, %, &, <, >

**Expected**:
- Characters handled correctly
- No XSS vulnerabilities
- HTML renders properly

## API Testing with Postman/cURL

### Test API Endpoints Directly

#### Create RFP
```bash
curl -X POST http://localhost:8000/api/rfp \
  -H "Content-Type: application/json" \
  -d '{
    "buyerText": "Need 10 laptops, budget $10000, delivery 30 days",
    "vendorIds": []
  }'
```

#### Get All Vendors
```bash
curl http://localhost:8000/api/vendors
```

#### Create Vendor
```bash
curl -X POST http://localhost:8000/api/vendors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test Vendor",
    "email": "api@test.com",
    "specialization": "Testing"
  }'
```

#### Get Proposals for RFP
```bash
curl http://localhost:8000/api/proposals/rfp/{rfpId}
```

#### Compare Proposals
```bash
curl http://localhost:8000/api/proposals/rfp/{rfpId}/compare
```

## Performance Testing

### Load Test Scenarios

1. **Create 10 RFPs rapidly**
   - Expected: All succeed, no timeouts

2. **Create 50 vendors**
   - Expected: Database handles load

3. **Compare 10 proposals**
   - Expected: AI responds within 10 seconds

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (if on Mac)

## Mobile Responsiveness

Test on:
- [ ] Mobile phone (portrait)
- [ ] Mobile phone (landscape)
- [ ] Tablet
- [ ] Desktop (various sizes)

## Known Issues to Verify

1. **Email Delay**: IMAP may take 1-2 minutes to detect new emails
2. **AI Parsing**: May not be 100% accurate with unusual formats
3. **Long Text**: Very long proposals may be truncated by AI

## Test Data Cleanup

After testing:
```bash
# Connect to MongoDB and clear test data
use rfp
db.rfps.deleteMany({})
db.vendors.deleteMany({})
db.proposals.deleteMany({})
```

Or use seed script to reset:
```bash
cd backend
npm run seed
```

## Automated Testing (Future)

Recommended test frameworks:
- **Backend**: Jest + Supertest
- **Frontend**: React Testing Library + Jest
- **E2E**: Cypress or Playwright

Sample test structure:
```
backend/
  tests/
    unit/
      aiService.test.js
      emailService.test.js
    integration/
      rfp.test.js
      vendor.test.js
      proposal.test.js

client/
  src/
    Components/
      __tests__/
        CreateRfp.test.jsx
        VendorManagement.test.jsx
```
