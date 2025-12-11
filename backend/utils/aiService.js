const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
  console.error('ERROR: GEMINI_API_KEY not set in .env file');
  console.error('Please get a free API key from https://makersuite.google.com/app/apikey');
  console.error('Then add it to backend/.env as GEMINI_API_KEY=your_key_here');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function parseRfpWithAI(buyerText) {
  try {
    const prompt = `Extract structured information from this procurement request. Return ONLY valid JSON with this exact structure:
{
  "title": "brief title",
  "items": [{"name": "item name", "quantity": number, "specifications": "specs"}],
  "budget": "budget amount",
  "deliveryTimeline": "timeline",
  "paymentTerms": "payment terms",
  "warranty": "warranty requirements",
  "additionalRequirements": "other requirements"
}

Request: ${buyerText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini AI error:', error);
    // Fallback for any error
    return {
      title: "Manual RFP Processing Required",
      items: [{ name: "Please process manually", quantity: 1, specifications: "AI processing failed" }],
      budget: "TBD",
      deliveryTimeline: "TBD",
      paymentTerms: "TBD",
      warranty: "TBD",
      additionalRequirements: buyerText
    };
  }
}

async function parseProposalWithAI(emailBody, rfpContext) {
  try {
    const prompt = `Extract vendor proposal details from this email. Return ONLY valid JSON:
{
  "price": "total price",
  "deliveryTime": "delivery timeline",
  "warranty": "warranty offered",
  "paymentTerms": "payment terms",
  "additionalNotes": "other relevant info"
}

RFP Context: ${JSON.stringify(rfpContext)}
Email: ${emailBody}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini AI error:', error);
    return {
      price: "Manual review required",
      deliveryTime: "TBD",
      warranty: "TBD",
      paymentTerms: "TBD",
      additionalNotes: emailBody
    };
  }
}

async function compareProposals(rfp, proposals) {
  try {
    const prompt = `Analyze these vendor proposals for an RFP and provide recommendations.

RFP: ${JSON.stringify(rfp.parsed)}

Proposals:
${proposals.map((p, i) => `Vendor ${i + 1} (${p.vendorEmail}): ${JSON.stringify(p.parsed)}`).join("\n")}

Return ONLY valid JSON:
{
  "recommendations": [
    {
      "vendorEmail": "email",
      "score": number (0-100),
      "strengths": ["strength1", "strength2"],
      "weaknesses": ["weakness1"],
      "summary": "brief summary"
    }
  ],
  "bestChoice": "email of recommended vendor",
  "reasoning": "why this vendor is best"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini AI error:', error);
    return {
      recommendations: proposals.map(p => ({
        vendorEmail: p.vendorEmail,
        score: 50,
        strengths: ["Manual review required"],
        weaknesses: ["AI analysis unavailable"],
        summary: "Please review manually - AI processing failed"
      })),
      bestChoice: proposals[0]?.vendorEmail || "none",
      reasoning: "Manual comparison required due to AI processing error"
    };
  }
}

module.exports = { parseRfpWithAI, parseProposalWithAI, compareProposals };