const Handlebars = require("handlebars");

const template = `
<html>
  <head>
    <style>
      body { font-family: Arial; line-height: 1.6; color: #333; }
      h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
      .section { margin: 20px 0; padding: 15px; background: #f8f9fa; border-left: 4px solid #3498db; }
      .section h3 { margin-top: 0; color: #2c3e50; }
      table { width: 100%; border-collapse: collapse; margin: 10px 0; }
      th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
      th { background: #3498db; color: white; }
    </style>
  </head>
  <body>
    <h1>{{title}}</h1>
    <p><strong>Date Issued:</strong> {{date}}</p>

    <div class="section">
      <h3>Items Requested</h3>
      <table>
        <tr><th>Item</th><th>Quantity</th><th>Specifications</th></tr>
        {{#each items}}
        <tr><td>{{name}}</td><td>{{quantity}}</td><td>{{specifications}}</td></tr>
        {{/each}}
      </table>
    </div>

    <div class="section">
      <h3>Budget & Timeline</h3>
      <p><strong>Budget:</strong> {{budget}}</p>
      <p><strong>Delivery Timeline:</strong> {{deliveryTimeline}}</p>
    </div>

    <div class="section">
      <h3>Terms & Conditions</h3>
      <p><strong>Payment Terms:</strong> {{paymentTerms}}</p>
      <p><strong>Warranty Requirements:</strong> {{warranty}}</p>
    </div>

    {{#if additionalRequirements}}
    <div class="section">
      <h3>Additional Requirements</h3>
      <p>{{additionalRequirements}}</p>
    </div>
    {{/if}}
  </body>
</html>
`;

function renderRfp(parsed) {
  const h = Handlebars.compile(template);
  return h({
    title: parsed.title || "Request for Proposal",
    date: new Date().toLocaleDateString(),
    items: parsed.items || [],
    budget: parsed.budget || "Not specified",
    deliveryTimeline: parsed.deliveryTimeline || "Not specified",
    paymentTerms: parsed.paymentTerms || "Not specified",
    warranty: parsed.warranty || "Not specified",
    additionalRequirements: parsed.additionalRequirements || "",
  });
}

module.exports = { renderRfp };
