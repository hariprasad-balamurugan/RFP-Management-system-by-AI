# Getting Started - First Time Setup

This guide will help you set up and run the AI-Powered RFP Management System for the first time.

## ⏱️ Estimated Time: 15-20 minutes

## Step 1: Prerequisites (5 minutes)

### Check Node.js Installation

```bash
node --version
# Should show v16.x.x or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

### Get Required API Keys

#### 1. OpenAI API Key (Required)

1. Go to https://platform.openai.com/
2. Sign up or log in
3. Click on your profile → "View API Keys"
4. Click "Create new secret key"
5. Copy and save the key (starts with `sk-`)
6. **Important**: Add $5-10 credit to your account

#### 2. Gmail App Password (Optional, for email features)

1. Go to your Google Account settings
2. Security → 2-Step Verification (enable if not already)
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and your device
5. Click "Generate"
6. Copy the 16-character password (no spaces)

#### 3. MongoDB Atlas (Already configured)

The project already has a MongoDB connection string. You can:

- Use the existing one (already in .env)
- Or create your own at https://www.mongodb.com/cloud/atlas

## Step 2: Install Dependencies (3 minutes)

### Backend

```bash
cd backend
npm install
```

Wait for installation to complete (~2 minutes)

### Frontend

```bash
cd ../client
npm install
```

Wait for installation to complete (~2 minutes)

## Step 3: Configure Environment (2 minutes)

### Edit Backend .env File

Open `backend/.env` and update:

```env
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rfp

# REQUIRED: Add your OpenAI API key
OPENAI_API_KEY=sk-your-actual-key-here

# OPTIONAL: For email features
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
SMTP_FROM=your_email@gmail.com

IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=your_email@gmail.com
IMAP_PASS=your_16_char_app_password
```

**Minimum Required**: Only `OPENAI_API_KEY` is required. Email is optional.

## Step 4: Seed Sample Data (1 minute)

```bash
cd backend
npm run seed
```

This adds 3 sample vendors to the database.

## Step 5: Start the Application (2 minutes)

### Terminal 1 - Backend

```bash
cd backend
npm start
```

You should see:

```
Server running on port 8000
Connected to MongoDB
Email receiver connected (or "not configured - skipping")
```

### Terminal 2 - Frontend

```bash
cd client
npm start
```

Browser should automatically open to http://localhost:3000

## Step 6: Verify Setup (2 minutes)

### Check Backend Health

Open http://localhost:8000/api/health in browser

Should show:

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:00:00.000Z"
}
```

### Check Frontend

You should see the dashboard with three feature cards.

## Step 7: Test Basic Functionality (5 minutes)

### Test 1: View Vendors

1. Click "Vendors" in navbar
2. You should see 3 sample vendors

### Test 2: Create Your First RFP

1. Click "Create RFP" in navbar
2. Paste this text:

```
I need to procure 10 laptops for our development team. Budget is $15,000.
Need delivery within 3 weeks. Laptops should have 16GB RAM, Intel i7 processor,
and 512GB SSD. Payment terms: Net 30. Warranty: 1 year minimum.
```

3. Select 1-2 vendors
4. Click "Create & Send RFP"
5. Wait for AI to process (~3 seconds)
6. You should see structured RFP preview

### Test 3: View RFP

1. Click "RFPs" in navbar
2. You should see your created RFP
3. Click "View Details & Proposals"

### Test 4: Add Manual Proposal

1. Click "Add Manual Proposal"
2. Enter email: `vendor1@test.com`
3. Paste this proposal:

```
We can provide 10 Dell Latitude laptops with 16GB RAM, i7-11th gen, 512GB SSD.
Price: $1,200 per unit = $12,000 total
Delivery: 2 weeks
Warranty: 2 years
Payment Terms: Net 30 accepted
```

4. Click "Submit"
5. Proposal should appear with AI-parsed details

### Test 5: AI Comparison

1. Add another proposal with different vendor
2. Click "Compare with AI"
3. You should see scores and recommendations

## 🎉 Success!

If all tests passed, your system is working correctly!

## Next Steps

1. **Add Real Vendors**: Add vendors with real email addresses
2. **Configure Email**: Set up email to test full workflow
3. **Explore Features**: Try creating different types of RFPs
4. **Read Documentation**: Check README.md for detailed info

## Troubleshooting

### Backend won't start

- Check if port 8000 is already in use
- Verify MongoDB connection string
- Check Node.js version (must be 16+)

### Frontend won't start

- Check if port 3000 is already in use
- Try deleting `node_modules` and running `npm install` again
- Clear browser cache

### AI not working

- Verify OpenAI API key is correct
- Check if you have credits in OpenAI account
- Look for error messages in backend console

### Email not working

- This is optional - system works without email
- Use "Add Manual Proposal" feature instead
- Check SETUP_GUIDE.md for detailed email setup

## Quick Commands Reference

```bash
# Start backend
cd backend && npm start

# Start frontend
cd client && npm start

# Seed vendors
cd backend && npm run seed

# Check health
curl http://localhost:8000/api/health
```

## Need Help?

1. Review `SETUP_GUIDE.md` for detailed setup
2. Check `TESTING_GUIDE.md` for testing procedures
3. Review backend console for error messages

## What's Next?

- **For Demo**: Follow `DEMO_SCRIPT.md`
- **For Development**: Check `ARCHITECTURE.md`
- **For Testing**: See `TESTING_GUIDE.md`
- **For Submission**: Use `SUBMISSION_CHECKLIST.md`

---

**Congratulations!** You've successfully set up the AI-Powered RFP Management System! 🚀
