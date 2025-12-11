# Quick Setup Guide

## Step-by-Step Setup Instructions

### 1. Prerequisites Check
- [ ] Node.js v16+ installed (`node --version`)
- [ ] MongoDB Atlas account or local MongoDB
- [ ] OpenAI API key
- [ ] Gmail account with App Password

### 2. Get OpenAI API Key
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create new secret key
5. Copy and save it securely

### 3. Setup Gmail for Email Features
1. Enable 2-Factor Authentication:
   - Go to Google Account → Security
   - Enable 2-Step Verification

2. Create App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password

3. Enable IMAP:
   - Go to Gmail Settings → Forwarding and POP/IMAP
   - Enable IMAP access

### 4. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../client
npm install
```

### 5. Configure Environment Variables

Copy `.env.example` to `backend/.env` and fill in:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=sk-your-key-here
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
SMTP_FROM=your_email@gmail.com
IMAP_USER=your_email@gmail.com
IMAP_PASS=your_16_char_app_password
```

### 6. Start the Application

Terminal 1 (Backend):
```bash
cd backend
node server.js
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

### 7. Test the Application

1. Open http://localhost:3000
2. Add a vendor (use your own email for testing)
3. Create an RFP with natural language
4. Check that email was sent
5. Reply to the email as a vendor
6. Check if proposal appears automatically
7. Use "Compare with AI" to see recommendations

## Troubleshooting

### Email Not Sending
- Verify SMTP credentials in .env
- Check if App Password is correct (no spaces)
- Ensure 2FA is enabled on Gmail

### Email Not Receiving
- Verify IMAP credentials
- Check if IMAP is enabled in Gmail settings
- Look for errors in backend console

### AI Not Working
- Verify OpenAI API key is valid
- Check if you have credits in OpenAI account
- Look for API errors in backend console

### Database Connection Failed
- Verify MongoDB URI is correct
- Check if IP is whitelisted in MongoDB Atlas
- Ensure network connectivity

## Testing Without Email

If you don't want to set up email:
1. Leave email fields as placeholders in .env
2. Use "Add Manual Proposal" button in RFP details
3. Paste sample vendor response text
4. System will still parse and compare proposals

## Sample Data for Testing

### Sample RFP Input:
```
I need to procure laptops and monitors for our new office. Budget is $50,000 total. 
Need delivery within 30 days. We need 20 laptops with 16GB RAM, Intel i7 processor, 
and 512GB SSD. Also need 15 monitors that are 27-inch, 4K resolution. 
Payment terms should be net 30, and we need at least 1 year warranty on all items.
```

### Sample Vendor Response:
```
Thank you for your RFP. We can provide:
- 20 Dell Latitude laptops with 16GB RAM, i7-12th gen, 512GB SSD at $1,200 each = $24,000
- 15 Dell 27" 4K monitors at $400 each = $6,000
Total: $30,000

Delivery: 20 business days
Warranty: 2 years on laptops, 1 year on monitors
Payment Terms: Net 30 accepted
```

## Next Steps

1. Create multiple vendors
2. Send RFPs to real email addresses
3. Test the full workflow
4. Explore AI comparison features
5. Check the demo video for reference
