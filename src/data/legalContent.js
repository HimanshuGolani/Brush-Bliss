// Structured legal content for the standalone policy pages.
// Each document carries its own last-updated date and version history so
// the pages stay honest and auditable. The site itself is a static Vite
// build with no user accounts, no forms, no analytics scripts and no
// cookies of its own — the policies below reflect that reality and note
// what *would* happen if a channel were added later.

export const legalContact = {
  email: "soniyadlakhwani@gmail.com",
  phone: "+91 98765 43210",
  address: "Brush&Bliss, Studio 4 / 12-C, Palm Grove Society, Jaipur - 302001, Rajasthan, India",
};

export const legalDocs = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "August 15, 2026",
    version: "1.0",
    summary:
      "Brush&Bliss is a small, home-grown art studio. We don't run ads, we " +
      "don't profile you, and this website doesn't plant cookies or share a " +
      "single pixel of yours with third parties. The only information we hold " +
      "is what you choose to share with us when you email about a commission or " +
      "enquiry — and we keep it only as long as it takes to sort things out. " +
      "Read on for the full picture.",

    sections: [
      {
        heading: "1. Who We Are",
        content:
          "Brush&Bliss is an independent art studio based in Jaipur, India. " +
          "When we say \"we\", \"us\" or \"our\", we mean the artist(s) operating " +
          "brushandbliss.com. This policy explains what little information we " +
          "collect and why.",
      },
      {
        heading: "2. Information We Collect",
        content:
          "This website is static and contains no forms, logins, accounts, " +
          "analytics scripts or advertising trackers. We collect nothing " +
          "automatically while you browse.\n\nThe only information we receive is " +
          "what you give us directly:\n\n" +
          "- Email enquiries sent via the mailto: links on the site. These go to " +
          "our inbox and may include your name, email address, phone number, the " +
          "subject of your commission and any files or photos you attach.\n" +
          "- Instagram. If you message or interact with us on Instagram, that " +
          "interaction is governed by Instagram's own privacy policy.\n\n" +
          "We never sell, rent or trade your contact details.",
      },
      {
        heading: "3. How We Use Your Information",
        content:
          "We use the information you share to:\n\n" +
          "- Respond to your enquiry about a piece or custom order.\n" +
          "- Communicate with you about your commission (materials, timeline, " +
          "pricing, photos).\n" +
          "- Deliver or arrange delivery of finished artwork.\n" +
          "- Send you a receipt or invoice where relevant.\n\n" +
          "We only use your data for these specific, consented purposes. We " +
          "don't keep marketing lists or send newsletters unless you explicitly " +
          "ask to be added to one.",
      },
      {
        heading: "4. Cookies & Tracking",
        content:
          "This site does not set any cookies, web beacons or similar tracking " +
          "technologies. We use no analytics services (no Google Analytics, no " +
          "Plausible, no Meta pixel).\n\nYour browser may store a couple of " +
          "technical values on its own — for example, whether you've asked for " +
          "reduced motion — but those are browser/OS settings, not cookies we " +
          "place or read. See our separate Cookie Policy for the full breakdown " +
          "(/cookies.html).",
      },
      {
        heading: "5. Third-Party Services",
        content:
          "Because this is a static site, your browser may load a few " +
          "third-party resources:\n\n" +
          "- Google Fonts (Cormorant Garamond and Jost) — loaded only for " +
          "typography. Google receives your IP address as part of serving any " +
          "font file, in line with their own privacy policy.\n" +
          "- Social/Instagram links — these point to external sites governed by " +
          "their own terms and policies.\n\n" +
          "We have no embedded content (no YouTube, no maps, no chat widgets) " +
          "and no advertising partners.",
      },
      {
        heading: "6. Data Retention",
        content:
          "We keep any information you share with us for as long as is " +
          "reasonably necessary to respond to your enquiry, fulfil a " +
          "commission, honour a legal obligation or resolve a dispute — usually " +
          "no longer than two years after our last contact, unless a longer " +
          "retention period is required by law.\n\nFinished commission records " +
          "(photos, specifications) may be retained longer for our portfolio " +
          "and tax records, but these are stripped of any personally " +
          "identifiable detail you haven't consented to reuse.",
      },
      {
        heading: "7. Your Rights",
        content:
          "You have the right to:\n\n" +
          "- Ask what personal information we hold about you.\n" +
          "- Request a copy, correction or deletion of that information.\n" +
          "- Withdraw any consent you've given.\n" +
          "- Object to or restrict our processing of your data.\n\n" +
          "To make any of these requests, just email us at the address in " +
          "section 9. We aim to respond within 30 days. These rights are " +
          "subject to local law (India's Digital Personal Data Protection Act, " +
          "GDPR where applicable, and your local consumer-protection statutes).",
      },
      {
        heading: "8. International Transfers",
        content:
          "Information you share with us is processed in India. By contacting " +
          "us you consent to that transfer. The website is hosted by a provider " +
          "outside India; data transferred there is subject to those providers' " +
          "own safeguards.",
      },
      {
        heading: "9. Contact Us",
        content:
          `Email: ${legalContact.email}\nPhone: ${legalContact.phone}\nMail: ${legalContact.address}`,
      },
    ],

    versionHistory: [
      {
        version: "1.0",
        date: "August 15, 2026",
        changes: [
          "Initial version of the Privacy Policy.",
          "Documents the static, cookie-free nature of the website.",
          "Outlines data collected via email enquiries only.",
          "States the two-year retention guideline and user rights.",
        ],
      },
    ],
  },

  terms: {
    title: "Terms of Service",
    lastUpdated: "August 15, 2026",
    version: "1.0",
    summary:
      "These terms cover how the brushandbliss.com website works and how " +
      "custom orders are handled. We're an art studio, not a marketplace — " +
      "you're commissioning handmade pieces directly from us, so the timeline " +
      "and final result always need a bit of flexibility and patience.",

    sections: [
      {
        heading: "1. Acceptance of Terms",
        content:
          "By accessing or using brushandbliss.com (the \"Site\"), you agree to " +
          "be bound by these Terms of Service and our Privacy Policy. If you " +
          "don't agree, please don't use the Site. These terms form a legal " +
          "agreement between you and Brush&Bliss.",
      },
      {
        heading: "2. Services",
        content:
          "The Site showcases handcrafted Indian art — resin, mandala, tanjore, " +
          "fabric, canvas, texture work, and home decor — and allows you to " +
          "enquire about pieces or request custom commissions. We may update, " +
          "modify or discontinue any part of the Site or services at any time " +
          "without notice, though we'll try to give you a heads-up where it " +
          "materially affects you.",
      },
      {
        heading: "3. Custom Orders & Pricing",
        content:
          "Each piece is hand-finished and made to order unless stated " +
          "otherwise. To place a custom order, contact us with your brief and " +
          "we'll confirm scope, materials, timeline and price in writing. A " +
          "deposit is normally required to begin work; the balance is due " +
          "before delivery or collection. Prices quoted include GST where " +
          "applicable but exclude shipping unless stated. All prices are in " +
          "Indian Rupees unless otherwise agreed.\n\nBecause every piece is " +
          "handmade, minor variations in colour, texture and finish are part " +
          "of its character, not defects.",
      },
      {
        heading: "4. Payments",
        content:
          "Payments are handled directly between you and Brush&Bliss via the " +
          "method we agree (bank transfer, UPI, cash on delivery where " +
          "applicable, or another agreed method). We don't process card " +
          "payments or store payment information on this Site. Your payment " +
          "confirmation is your receipt.\n\nAll sales are final once a piece " +
          "has shipped or been collected, unless the item is faulty. Custom " +
          "or made-to-order pieces cannot be returned or cancelled once work " +
          "has begun, except by mutual agreement.",
      },
      {
        heading: "5. Shipping & Delivery",
        content:
          "We ship within India. Delivery timeframes are estimates only and " +
          "start from when full payment clears and the piece is ready — never " +
          "from the order date. Handmade pieces need careful packing, so " +
          "please allow extra time, especially around holidays.\n\nYou're " +
          "responsible for providing an accurate delivery address and for any " +
          "damage caused by incorrect details you supplied. Ownership of a " +
          "piece transfers to you once it's delivered and payment has cleared, " +
          "but any risk remains with us until you (or your authorised " +
          "recipient) have accepted it.\n\nFor collection, pieces must be " +
          "picked up within seven days of us notifying you they're ready; " +
          "otherwise a daily storage fee may apply.",
      },
      {
        heading: "6. Intellectual Property",
        content:
          "All content on this Site — photos, text, logos, the mandala motif, " +
          "designs and copy — is the property of Brush&Bliss and protected by " +
          "copyright, trademark and other applicable laws, unless credited to " +
          "another artist.\n\nYou may browse and share individual pages for " +
          "personal, non-commercial use, but you may not reproduce, distribute, " +
          "modify, display or create derivative works from the Site's content " +
          "without our prior written permission.\n\nThe underlying artwork " +
          "concept remains with the artist even after sale; purchasing a piece " +
          "does not grant you reproduction rights, though we're always happy " +
          "to discuss commissions or licensed reproductions.",
      },
      {
        heading: "7. Your Responsibilities",
        content:
          "When contacting us or placing an order, you agree to:\n\n" +
          "- Provide accurate name, contact and order information.\n" +
          "- Communicate clearly about your requirements and respond to our " +
          "queries in reasonable time.\n" +
          "- Pay agreed amounts on schedule.\n" +
          "- Use the Site lawfully and not attempt to interfere with it.\n\n" +
          "If you're submitting photos or reference material for a custom " +
          "commission, you represent that you have the right to share them.",
      },
      {
        heading: "8. Acceptable Use",
        content:
          "You agree not to:\n\n" +
          "- Use the Site in any way that could damage, disable or impair it.\n" +
          "- Attempt to gain unauthorised access to any part of the Site or its " +
          "systems.\n" +
          "- Send spam, harassment or any message that is unlawful, abusive, " +
          "defamatory or misleading.\n" +
          "- Use any content or data you collect from us for competing " +
          "purposes.\n\nWe reserve the right to suspend or terminate access if " +
          "we believe these terms have been breached.",
      },
      {
        heading: "9. Disclaimer of Warranties",
        content:
          "The Site and all content are provided \"as is\" without warranties of " +
          "any kind, either express or implied. We do not warrant that the Site " +
          "will be uninterrupted, secure or error-free, or that defects will be " +
          "corrected.\n\nWhile we aim for accurate colour reproduction, we can't " +
          "guarantee that what you see on your screen exactly matches the " +
          "finished piece — every monitor differs.\n\nNothing on this Site " +
          "constitutes advice — legal, financial, artistic or otherwise. If you " +
          "need advice, get it from a qualified professional.",
      },
      {
        heading: "10. Limitation of Liability",
        content:
          "To the fullest extent permitted by law, Brush&Bliss excludes all " +
          "liability for any direct, indirect, incidental, special, " +
          "consequential or punitive damages — including loss of profits, data, " +
          "use, savings or business opportunity — arising out of or in " +
          "connection with:\n\n" +
          "- Your use of (or inability to use) the Site;\n" +
          "- Any content or materials on the Site;\n" +
          "- A commissioned piece (whether delivered or not);\n" +
          "- Third-party links or services.\n\nThis includes any liability we " +
          "might otherwise have for breach of contract, tort (including " +
          "negligence) or otherwise. Our total aggregate liability to you for " +
          "any claim relating to the Site or these terms shall not exceed the " +
          "amount paid by you to us in the twelve months preceding the claim, " +
          "or INR 5,000, whichever is higher.",
      },
      {
        heading: "11. Indemnification",
        content:
          "You agree to indemnify, defend and hold harmless Brush&Bliss and its " +
          "affiliates, officers, directors, employees and agents from and " +
          "against any claims, liabilities, damages, losses, costs or expenses " +
          "(including reasonable attorneys' fees) arising out of your breach of " +
          "these Terms or your violation of any law or the rights of a third " +
          "party.",
      },
      {
        heading: "12. Governing Law",
        content:
          "These Terms are governed by and construed in accordance with the laws " +
          "of India, without regard to conflict-of-law principles. Any dispute " +
          "arising out of or in connection with these Terms or the Site shall be " +
          "subject to the exclusive jurisdiction of the courts in Jaipur, " +
          "Rajasthan, India.\n\nIf any provision is found to be invalid, the " +
          "remaining provisions remain in full force and effect.",
      },
      {
        heading: "13. Changes to These Terms",
        content:
          "We may revise these Terms from time to time. When we do, we'll " +
          "update the \"Last updated\" date at the top and add a summary of the " +
          "changes to this document's version history. Your continued use of the " +
          "Site after any change constitutes acceptance of the new terms.",
      },
      {
        heading: "14. Contact",
        content: `Questions about these Terms? Email ${legalContact.email}.`,
      },
    ],

    versionHistory: [
      {
        version: "1.0",
        date: "August 15, 2026",
        changes: [
          "Initial version of the Terms of Service.",
          "Covers service descriptions, custom-order workflow, payments and delivery.",
          "Sets out intellectual-property, acceptable-use and liability terms.",
          "Specifies Indian law and Jaipur jurisdiction.",
        ],
      },
    ],
  },

  cookies: {
    title: "Cookie Policy",
    lastUpdated: "August 15, 2026",
    version: "1.0",
    summary:
      "This site doesn't set any cookies of its own. We don't track you, " +
      "profile you, or drop marketing pixels. Your browser holds a couple of " +
      "technical settings on its own (like your reduced-motion preference), " +
      "but those aren't cookies we control. What follows is the full, " +
      "transparent breakdown — current as of the date above.",

    sections: [
      {
        heading: "1. What Are Cookies?",
        content:
          "Cookies are small text files stored in your browser when you visit a " +
          "website. They're widely used to make sites work or to help site owners " +
          "understand how visitors move through a site.\n\nYou can control or " +
          "delete cookies through your browser settings at any time.",
      },
      {
        heading: "2. Cookies We Use",
        content:
          "The short version: we don't use any.\n\nThis is a static website built " +
          "with Vite. It contains no login system, no shopping cart, no analytics " +
          "and no advertising. We do not set, request, read or rely on any cookie " +
          "at all:\n\n" +
          "- No strictly necessary cookies (the site works fine without them).\n" +
          "- No performance or analytics cookies (no GA, Plausible, Fathom, etc.).\n" +
          "- No functionality cookies (no social plugins, no video embeds).\n" +
          "- No advertising or targeting cookies (no Meta, Google Ads, etc.).\n\n" +
          "The only third-party resources loaded are Google Fonts (for " +
          "typography). Font files may be cached by your browser, but Google " +
          "does not set cookies on this Site for that purpose.",
      },
      {
        heading: "3. Browser-Set Technical Data",
        content:
          "Your browser may remember a few of its own settings while you visit:\n\n" +
          "- The `prefers-reduced-motion` preference, which this site honours by " +
          "disabling smooth scrolling and animations.\n" +
          "- Scroll position and tab state, stored locally by the browser.\n\n" +
          "These are managed by your browser or operating system, not by " +
          "Brush&Bliss, and are cleared when you close the tab or adjust your " +
          "system settings.",
      },
      {
        heading: "4. How to Control Cookies",
        content:
          "Since we set no cookies, there's nothing to turn off here. But if you " +
          "want broader control over your browsing:\n\n" +
          "- Browser settings. All modern browsers let you block, review or " +
          "delete cookies. See Chrome, Safari, Firefox or Edge preferences.\n" +
          "- Do Not Track. We honour any DNT signal by simply continuing to do " +
          "nothing — we don't track.\n" +
          "- Incognito / private browsing. Visiting in private mode prevents " +
          "any persistent local storage from remaining after you close the " +
          "window.\n\nBecause this site does not set cookies, these controls " +
          "have no effect on your experience here — they're listed for your " +
          "general awareness.",
      },
      {
        heading: "5. Updates to This Cookie Policy",
        content:
          "If we ever add cookies or tracking (for example, to support a future " +
          "newsletter or analytics service), we'll update this policy, refresh " +
          "the \"Last updated\" date and — where required — ask for your consent " +
          "before any non-essential cookie is set. You'll always find the current " +
          "version here.",
      },
      {
        heading: "6. Contact",
        content: `Questions about cookies? Email ${legalContact.email}.`,
      },
    ],

    versionHistory: [
      {
        version: "1.0",
        date: "August 15, 2026",
        changes: [
          "Initial version of the Cookie Policy.",
          "Documents the cookie-free, static nature of the website.",
          "Explains browser-set technical data (reduced-motion preference).",
        ],
      },
    ],
  },
};

export const legalNav = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
  { id: "cookies", label: "Cookie Policy" },
];
