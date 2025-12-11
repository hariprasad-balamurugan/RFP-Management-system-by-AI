function parseBuyerText(text) {
  const parsed = {};

  const firstLine = text.split("\n").find((l) => l.trim().length) || text;
  parsed.title = firstLine.split(".")[0].slice(0, 100).trim();

  const techMatch = text.match(/\b(MERN|Mongo|Express|React|Node|MongoDB)\b/i);
  if (techMatch) parsed.tech = "MERN stack required";

  const scale = text.match(
    /(\d{1,3}(,\d{3})*|\d+)\s*(concurrent users|users|visitors)/i
  );
  if (scale) parsed.scale = scale[0];

  const integrations = [];
  if (/stripe/i.test(text)) integrations.push("Stripe");
  if (/erp/i.test(text)) integrations.push("ERP Integration");
  if (integrations.length) parsed.integrations = integrations;

  const timeline = text.match(/(\d+)\s*(weeks|months|days)/i);
  if (timeline) parsed.timeline = timeline[0];

  const budget = text.match(/\$?\s*([0-9]{1,3}(?:,[0-9]{3})+|[0-9]+)(k|K)?/);
  if (budget) parsed.budget = budget[0];

  const support = text.match(/support.*\d+\s*(months|weeks)/i);
  if (support) parsed.support = support[0];

  const evaluation = text.match(/(experience|SLA|price|delivery|references)/gi);
  if (evaluation) parsed.evaluation = [...new Set(evaluation)].join(", ");

  const contact = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (contact) parsed.contact = contact[0];

  parsed.specs = text;

  return parsed;
}

module.exports = { parseBuyerText };
