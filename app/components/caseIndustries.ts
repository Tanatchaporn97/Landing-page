// Case-study taxonomy shared by the brand page's "See the Work in Action" explorer and the
// Success Stories pages: one industry + one content type per case (by slug).
export const INDUSTRIES = ["Food & Beverage", "Beauty & Skincare", "Healthcare", "Pet Care", "Household", "Home Appliances", "Media & Entertainment", "Retail", "Finance & Fintech", "Technology & Electronics"];

export const CLASSIFY: Record<string, { industry: string; value: string }> = {
  "nissin":          { industry: "Food & Beverage",          value: "Product Launch" },     // new flavour launch
  "guss-damn-good":  { industry: "Food & Beverage",          value: "Product Launch" },     // new co-created flavour
  "auntie-annes":    { industry: "Food & Beverage",          value: "Always-on Content" },  // 15+ months of TikTok content
  "watsons":         { industry: "Beauty & Skincare",        value: "Product Review" },     // fast-turnaround KOL/KOC reviews
  "ahc":             { industry: "Beauty & Skincare",        value: "Event Activation" },   // Skin Game event
  "boots":           { industry: "Beauty & Skincare",        value: "Product Launch" },     // new scent
  "scotch":          { industry: "Beauty & Skincare",        value: "Product Launch" },     // new bird's-nest mask
  "ldc-dental":      { industry: "Healthcare",               value: "Product Review" },     // clear-aligner service reviews
  "siangpure":       { industry: "Healthcare",               value: "New Market Entry" },   // Indian market
  "truemoney":       { industry: "Finance & Fintech",        value: "Niche Community" },    // highly specific health topic
  "optimum-hi-pro":  { industry: "Pet Care",                 value: "Niche Community" },    // koi keepers
  "smart-heart":     { industry: "Pet Care",                 value: "Niche Community" },    // fandom
  "bobbi-dog":       { industry: "Pet Care",                 value: "Always-on Content" },  // year plan
  "mom-choice":      { industry: "Pet Care",                 value: "Always-on Content" },  // year plan
  "d-nee":           { industry: "Household",                value: "Product Review" },     // mom & family creator reviews
  "fineline":        { industry: "Household",                value: "Product Review" },     // care storytelling → add to cart
  "teepol":          { industry: "Household",                value: "Product Review" },     // single-KOL product integration
  "daikin":          { industry: "Home Appliances",          value: "Product Review" },     // explaining air-con tech
  "mitsubishi-heavy-duty": { industry: "Home Appliances", value: "Product Review" },  // entertainment + tech-reviewer content
  "viu":             { industry: "Media & Entertainment",     value: "Niche Community" },   // Isan local audience
  "cp-all":          { industry: "Retail",                   value: "Event Activation" },   // education forum
  "mega-bangna":     { industry: "Retail",                   value: "Event Activation" },   // Halloween event
  "lh-bank-genie-ai": { industry: "Finance & Fintech",        value: "Event Activation" },  // presenter launch event + GENIE AI
  "lh-bank-lhb-you": { industry: "Finance & Fintech",        value: "Product Review" },    // digital savings account explainers
  "ghbank-s-em":     { industry: "Finance & Fintech",        value: "Niche Community" },   // self-employed home buyers
  "ghbank-pet-lifestyle": { industry: "Finance & Fintech",        value: "Niche Community" },   // pet owners looking for a home
  "oppo-find-x9-ais": { industry: "Technology & Electronics", value: "Product Launch" },  // new phone launch, camera-led TikTok content
  "jbl-launch-event": { industry: "Technology & Electronics", value: "Event Activation" },  // launch event, creators onsite
  "jbl-flip7-charge6": { industry: "Technology & Electronics", value: "Product Review" },  // lifestyle, fashion & music creators
};

/** A case's industry, falling back to the story's own label for slugs not classified yet. */
export const industryOf = (slug: string, fallback = "") => CLASSIFY[slug]?.industry ?? fallback;
