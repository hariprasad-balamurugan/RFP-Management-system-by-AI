# Quick Reference Card

## 🚀 Start Commands

```bash
# Backend (Terminal 1)
cd backend
npm start

# Frontend (Terminal 2)
cd client
npm start
```

## 🔑 Required Environment Variables

```env
OPENAI_API_KEY=sk-your-key-here
MONGO_URI=mongodb+srv://...
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
IMAP_USER=your_email@gmail.com
IMAP_PASS=your_app_password
```

## 📡 API Endpoints Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/rfp` | Create RFP |
| GET | `/api/rfp` | List RFPs |
| GET | `/api/rfp/:id` | Get RFP |
| POST | `/api/vendors` | Create vendor |
| GET | `/api/vendors` | List vendors |
| PUT | `/api/vendors/:id` | Update vendor |
| DELETE | `/api/vendors/:id` | Delete vendor |
| POST | `/api/proposals` | Create proposal |
| GET | `/api/proposals/rfp/:id` | Get proposals |
| GET | `/api/proposals/rfp/:id/compare` | Compare proposals |

## 🧪 Test Sample Data

### RFP Creation Text:
```
I need to procure laptops and monitors for our new office. Budget is $50,000 total. 
Need delivery within 30 days. We need 20 laptops with 16GB RAM and 15 monitors 27-inch. 
Payment terms should be net 30, and we need at least 1 year warranty.
```

### Vendor Proposal Text:
```
We can provide:
- 20 Dell laptops with 16GB RAM at $1,200 each = $24,000
- 15 Dell 27" monitors at $400 each = $6,000
Total: $30,000
Delivery: 20 business days
Warranty: 2 years
Payment Terms: Net 30
```

## 🛠️ Useful Commands

```bash
# Seed sample vendors
cd backend
npm run seed

# Check backend health
curl http://localhost:8000/api/health

# View MongoDB data (if using local)
mongosh
use rfp
db.rfps.find()
db.vendors.find()
db.proposals.find()
```

## 📂 Key Files

| File | Purpose |
|------|---------|
| `backend/server.js` | Entry point |
| `backend/utils/aiService.js` | AI integration |
| `backend/utils/emailReceiver.js` | IMAP listener |
| `client/src/App.js` | React router |
| `client/src/Components/CreateRfp.jsx` | RFP creation |
| `client/src/Components/RfpDetails.jsx` | Proposals & comparison |

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Email not sending | Check SMTP credentials, enable App Password |
| Email not receiving | Verify IMAP enabled, check console logs |
| AI not working | Verify OpenAI API key, check credits |
| DB connection failed | Check MongoDB URI, whitelist IP |
| Port already in use | Kill process: `npx kill-port 8000` |

## 📊 Project Stats

- **Backend**: 8 routes, 3 models, 3 controllers
- **Frontend**: 6 components, 1 service
- **AI Calls**: 3 types (RFP parse, proposal parse, compare)
- **Database**: 3 collections (RFPs, Vendors, Proposals)

## 🎯 User Flow

1. **Add Vendors** → Vendors page
2. **Create RFP** → Create RFP page → Select vendors
3. **View RFP** → RFPs page → Click RFP
4. **Add Proposals** → Manual or wait for email
5. **Compare** → Click "Compare with AI"

## 🔗 Important Links

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Health Check: http://localhost:8000/api/health
- OpenAI Dashboard: https://platform.openai.com/usage
- MongoDB Atlas: https://cloud.mongodb.com

## 💡 Tips

- Use your own email as vendor for testing
- Manual proposal entry works without email setup
- AI parsing works best with clear, structured text
- Check backend console for email listener status
- Refresh RFP details page to see new proposals

## 📝 Documentation Files

- `README.md` - Complete documentation
- `SETUP_GUIDE.md` - Setup instructions
- `ARCHITECTURE.md` - Technical details
- `TESTING_GUIDE.md` - Testing procedures
- `DEMO_SCRIPT.md` - Video demo guide
- `PROJECT_SUMMARY.md` - Overview
