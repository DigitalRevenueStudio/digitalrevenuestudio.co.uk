/*
  DIGITAL REVENUE STUDIO: SITE UPDATES
  ---------------------------------------------------------------
  This is the file to edit for day-to-day news. Save it, upload it
  to GitHub, and the Home page studio news, the Portfolio carousel and the
  brand pages update.

  Rules:
  - Keep the quote marks and commas exactly as they are.
  - Dates are written "YYYY-MM-DD", or "YYYY-MM" when only the month is known.
  - Newest dates show first.
  - brand is one of: drs, ma, wos, fathom, ac, die
  - featured: true puts the item in the Portfolio News & Updates carousel (brand news).
  - studio: true puts the item in the Home page Studio News & Updates carousel
    (our own news: new tools, new clients, website changes). An item can have
    both flags. Optional: tag (short label such as "New tool") and img (a Digit
    picture shown beside the text on the Home carousel).
  - To remove an item, delete everything from its { to its },
  - New WOS gift codes: add them here as well as in the tracker and the
    wiki ticker, and only once the rewards are confirmed.
*/
window.DRS = {

  brandNames: {
    drs: "Digital Revenue Studio",
    ma: "Mavericks Adventures",
    wos: "Whiteout Survival Wiki",
    fathom: "Fathom Guides",
    ac: "Atker Consultancy",
    die: "Digital Income Experiment"
  },

  updates: [
    { date: "2026-10-29", brand: "wos", featured: true, img: "img/digit-clipboard.webp",
      title: "New guide: Wild Brawl",
      text: "An F2P-first guide to the free-for-all event: the missions, supply trucks and airdrops, Same-Gen or Cross-Gen queues, and tactics for the buildings.",
      url: "/wos-guide-wild-brawl", cta: "Read the guide" },

    { date: "2026-10-29", brand: "wos", featured: true, img: "img/digit-wand.webp",
      title: "Wiki refresh: Experts, Labyrinth and new chat templates",
      text: "The Experts guide now covers Gareth and Justus with a revised F2P order, the Labyrinth guide adds community feedback and alternative ratios, and the R4 templates gain Foundry and Canyon, Labyrinth, recruitment key and safety messages.",
      url: "/wos-guide-experts", cta: "See the Experts guide" },

    { date: "2026-10-28", brand: "drs", studio: true, tag: "New free tool", img: "img/digit-shop.webp",
      title: "DRS Prompt Studio Free is live",
      text: "Turn a task, an audience and a tone into a clear, copy-ready prompt for the AI assistant you already use. It runs in your browser, needs no sign-up and nothing is sent anywhere.",
      url: "/drs-prompt-studio-free", cta: "Try it free" },

    { date: "2026-10-28", brand: "drs", studio: true, tag: "New tools", img: "img/digit-shop.webp",
      title: "Prompt Studio Plus and the Faceless Content Workflow",
      text: "Plus adds six learning modes, 96 visual presets and reusable context profiles (\u00a312). The Faceless Content Workflow plans short-form content without you being on camera (\u00a315). Both are one-off purchases.",
      url: "/drs-shop-drs#products", cta: "See the tools" },

    { date: "2026-10-28", brand: "drs", studio: true, tag: "New directory", img: "img/digit-shop.webp",
      title: "The DRS Tools Directory and Navigator Monthly",
      text: "A searchable directory of 533 AI and digital tools for \u00a39, plus a membership that adds 3 to 6 selected tools or updates every month. \u00a39 for the first payment, then \u00a34.99 a month. Cancel any time.",
      url: "/drs-shop-drs#products", cta: "See the directory" },

    { date: "2026-10-28", brand: "wos", studio: true, tag: "New free tools", img: "img/digit-clipboard.webp",
      title: "Hero Advisor and Bear Hunt Generator for Whiteout Survival",
      text: "Two free browser tools for players: a plain invest, skip or stick answer for every new hero, and a drafted Bear Hunt rally plan from the heroes and troops you own.",
      url: "/wos-hero-advisor", cta: "Try the Hero Advisor" },

    { date: "2026-10-27", brand: "drs", studio: true, tag: "Studio news", img: "img/digit-services.webp",
      title: "Website revamp underway",
      text: "A refreshed look for the whole studio site is rolling out in stages, starting with a new shop and new tool pages. Some things may move around while we finish.",
      url: "/drs-shop-drs", cta: "Browse the new shop" },

    { date: "2026-10-08", brand: "fathom", studio: true, tag: "New client", img: "img/digit-portfolio.webp",
      title: "Fathom Guides joins the DRS family",
      text: "We are the branding and content partner for Fathom Guides: Whiteout Survival guides, a live gift code and news site, and a Minecraft survival manual.",
      url: "/drs-case-study-fathom", cta: "Read the case study" },

    { date: "2026-10-28", brand: "wos", featured: true, img: "img/digit-clipboard.webp",
      title: "New free tool: the Hero Advisor",
      text: "Load your roster, choose how much you spend and get a plain invest, skip or stick answer for every new hero. It runs in your browser and nothing is uploaded.",
      url: "/wos-hero-advisor", cta: "Try the Hero Advisor" },

    { date: "2026-10-28", brand: "wos", featured: true, img: "img/digit-jigsaw.webp",
      title: "New free tool: the Bear Hunt Generator",
      text: "Tell it which heroes you own and how many troops you can send. It drafts a Bear Hunt rally plan: who leads, who joins and how to split your troops.",
      url: "/wos-bear-generator", cta: "Build a Bear setup" },

    { date: "2026-10-28", brand: "wos", featured: true, img: "img/digit-wand.webp",
      title: "Hero Guide by Generation is live",
      text: "A full guide for every hero from Gen 1 to Gen 17, with star targets for free to play, low and higher spenders. Gen 18 follows once its details are confirmed.",
      url: "/wos-guide-hero-generations", cta: "Open the Hero Guide" },

    { date: "2026-10-28", brand: "wos", featured: true, img: "img/digit-wos-gift.webp",
      title: "Gift code tracker refreshed",
      text: "WOS1025, VIP1021, WOS1018 and SPORTSDAY26 have moved to Expired. Four older codes stay on the active list with a note that they may have ended.",
      url: "/wos-wiki-gift-code-tracker", cta: "Check the gift codes" },

    { date: "2026-10-25", brand: "wos", featured: true,
      title: "New gift code: WOS1025",
      text: "5 x 100 Gems, a 3-day frame, 2 x 100 VIP XP and 10 x 5-minute Speedups.",
      url: "/wos-wiki-gift-code-tracker", cta: "Get the gift codes" },

    { date: "2026-10-23", brand: "wos", featured: true,
      title: "Recruitment and alliance notice templates",
      text: "Thirteen new copy and paste messages for recruiting, welcoming members, rules reminders, activity checks and gift code announcements.",
      url: "/wos-r4-resources", cta: "See the templates" },

    { date: "2026-10-22", brand: "wos", featured: true,
      title: "21 new R4 and R5 chat templates",
      text: "Daily checklist, hero and rally guides, Alliance Championship, Crazy Joe, Silverfrost Shop, Wild Brawl tips and chat art, now sorted into tabs.",
      url: "/wos-r4-resources", cta: "See the templates" },

    { date: "2026-10-21", brand: "wos", featured: true,
      title: "October 20 update explained",
      text: "Mergeventure, the Expedition Arena, gifting and the new Expert Justus, with the key dates in one place.",
      url: "/wos-news-october-2026-update", cta: "Read the update" },

    { date: "2026-10-18", brand: "wos", featured: true,
      title: "New gift code: WOS1018",
      text: "5 x 100 Gems, a 3-day frame, 2 x 100 VIP XP and 10 x 5-minute Speedups.",
      url: "/wos-wiki-gift-code-tracker", cta: "Get the gift codes" },

    { date: "2026-10-12", brand: "wos", featured: true,
      title: "New gift code: SPORTSDAY26",
      text: "500 Gems, 30K Hero XP, three 1-hour speedups and resources. Added to the tracker.",
      url: "/wos-wiki-gift-code-tracker", cta: "Get the gift codes" },

    { date: "2026-10-10", brand: "wos",
      title: "New gift code: INS400K",
      text: "1,000 Gems, 2 Mythic Hero Shards, 8 one-hour Training Speedups and resources.",
      url: "/wos-wiki-gift-code-tracker", cta: "Get the gift codes" },

    { date: "2026-10-09", brand: "wos",
      title: "New gift code: HangulDay2026",
      text: "1,000 Gems, a Mythic Hero Shard, 5 x 10 Chief Stamina and resources.",
      url: "/wos-wiki-gift-code-tracker", cta: "Get the gift codes" },

    { date: "2026-10-08", brand: "fathom", featured: true,
      title: "Fathom Guides is live",
      text: "Whiteout Survival guides, a live gift code and news site, and a Minecraft survival manual. We are its branding and content partner.",
      url: "/drs-case-study-fathom", cta: "Read the case study" },

    { date: "2026-04", brand: "wos",
      title: "Flame and Fangs guide added",
      text: "How to earn Crystallite Cores with the bonus cores trick, what to spend them on and a chat schedule template.",
      url: "/wos-guide-flame-and-fangs", cta: "Read the guide" },

    { date: "2026-04", brand: "wos",
      title: "April 2026 update explained",
      text: "Flame Tech, T12 troops and the Icefire Warhymn League, and what they mean for free players.",
      url: "/wos-blog-13-april-update", cta: "Read the post" },

    { brand: "wos",
      title: "SvS research day: Day 2 or Day 5?",
      text: "Why alliances disagree about when to spend research speed-ups in SvS prep, and how to decide for your state.",
      url: "/wos-blog-14-svs-research-day", cta: "Read the post" },

    { date: "2026-10", brand: "ac", featured: true,
      title: "Tactical Leadership Companion is published",
      text: "Atker's first book is live in hardback, Kindle and a printable edition, with the branding and delivery built through DRS.",
      url: "/drs-blog-12-tlc-launch", cta: "Read the story" },

    { date: "2026-10", brand: "ma", featured: true,
      title: "Where is Maverick? sells outside the UK",
      text: "Every copy had gone to a UK reader until now. The first order from further afield is a small milestone worth marking.",
      url: "/drs-blog-11-ma-international", cta: "Read the story" }
  ],

  /* Evergreen blog picks (no longer shown on the Home page; kept for any page that uses a data-posts list). */
  posts: [
    { label: "Studio guide", title: "The free tool stack we use to build digital brands",
      text: "Every tool we use across our brands, all free or freemium, and what each one is for.",
      url: "/drs-blog-01-tool-stack" },
    { label: "Case study", title: "How one Reddit post became a 323,000-view gaming wiki",
      text: "From zero presence to a growing free-to-play wiki, built on free tools by listening to what players asked for.",
      url: "/drs-blog-03-wos-build" },
    { label: "Guide", title: "How to sell digital products online: a step-by-step guide",
      text: "From choosing your product to making your first sale, the process we followed.",
      url: "/drs-blog-09-how-to-sell-digital-products" }
  ]
};
