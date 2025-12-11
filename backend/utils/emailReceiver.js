const Imap = require("imap");
const { simpleParser } = require("mailparser");
const Proposal = require("../models/Proposal");
const RFP = require("../models/RFP");
const { parseProposalWithAI } = require("./aiService");

function startEmailListener() {
  if (!process.env.IMAP_USER || process.env.IMAP_USER.includes("your_email")) {
    console.log("Email receiver not configured - skipping");
    return;
  }

  const imap = new Imap({
    user: process.env.IMAP_USER,
    password: process.env.IMAP_PASS,
    host: process.env.IMAP_HOST || "imap.gmail.com",
    port: parseInt(process.env.IMAP_PORT || "993"),
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  });

  function openInbox(cb) {
    imap.openBox("INBOX", false, cb);
  }

  imap.once("ready", () => {
    console.log("Email receiver connected");
    openInbox((err, box) => {
      if (err) throw err;
      
      imap.on("mail", () => {
        const f = imap.seq.fetch(box.messages.total + ":*", {
          bodies: "",
          struct: true,
        });

        f.on("message", (msg) => {
          msg.on("body", (stream) => {
            simpleParser(stream, async (err, parsed) => {
              if (err) {
                console.error("Parse error:", err);
                return;
              }

              try {
                const subject = parsed.subject || "";
                const rfpIdMatch = subject.match(/RFP ID: ([a-f0-9]{24})/i);
                
                if (rfpIdMatch) {
                  const rfpId = rfpIdMatch[1];
                  const rfp = await RFP.findById(rfpId);
                  
                  if (rfp) {
                    const emailBody = parsed.text || parsed.html || "";
                    const parsedProposal = await parseProposalWithAI(emailBody, rfp.parsed);
                    
                    await Proposal.create({
                      rfpId,
                      vendorEmail: parsed.from.value[0].address,
                      rawEmail: emailBody,
                      parsed: parsedProposal,
                    });
                    
                    console.log(`Proposal received from ${parsed.from.value[0].address}`);
                  }
                }
              } catch (error) {
                console.error("Error processing email:", error);
              }
            });
          });
        });
      });
    });
  });

  imap.once("error", (err) => {
    console.error("IMAP error:", err);
  });

  imap.connect();
}

module.exports = { startEmailListener };
