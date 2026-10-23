/*
  DIGITAL REVENUE STUDIO: SITE UPDATES
  ---------------------------------------------------------------
  This is the file to edit for day-to-day news. Save it, upload it
  to GitHub, and the Home page news, the Portfolio carousel and the
  brand pages update.

  Rules:
  - Keep the quote marks and commas exactly as they are.
  - Dates are written "YYYY-MM-DD", or "YYYY-MM" when only the month is known.
  - Newest dates show first.
  - brand is one of: drs, ma, wos, fathom, ac, die
  - featured: true puts the item in the Portfolio news carousel.
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
    { date: "2026-10-23", brand: "wos", featured: true,
      title: "Recruitment and alliance notice templates",
      text: "Thirteen new copy and paste messages for recruiting, welcoming members, rules reminders, activity checks and gift code announcements.",
      url: "wos-r4-resources.html", cta: "See the templates" },

    { date: "2026-10-22", brand: "wos", featured: true,
      title: "21 new R4 and R5 chat templates",
      text: "Daily checklist, hero and rally guides, Alliance Championship, Crazy Joe, Silverfrost Shop, Wild Brawl tips and chat art, now sorted into tabs.",
      url: "wos-r4-resources.html", cta: "See the templates" },

    { date: "2026-10-21", brand: "wos", featured: true,
      title: "October 20 update explained",
      text: "Mergeventure, the Expedition Arena, gifting and the new Expert Justus, with the key dates in one place.",
      url: "wos-news-october-2026-update.html", cta: "Read the update" },

    { date: "2026-10-18", brand: "wos", featured: true,
      title: "New gift code: WOS1018",
      text: "5 x 100 Gems, a 3-day frame, 2 x 100 VIP XP and 10 x 5-minute Speedups.",
      url: "wos-wiki-gift-code-tracker.html", cta: "Get the gift codes" },

    { date: "2026-10-12", brand: "wos", featured: true,
      title: "New gift code: SPORTSDAY26",
      text: "500 Gems, 30K Hero XP, three 1-hour speedups and resources. Added to the tracker.",
      url: "wos-wiki-gift-code-tracker.html", cta: "Get the gift codes" },

    { date: "2026-10-10", brand: "wos",
      title: "New gift code: INS400K",
      text: "1,000 Gems, 2 Mythic Hero Shards, 8 one-hour Training Speedups and resources.",
      url: "wos-wiki-gift-code-tracker.html", cta: "Get the gift codes" },

    { date: "2026-10-09", brand: "wos",
      title: "New gift code: HangulDay2026",
      text: "1,000 Gems, a Mythic Hero Shard, 5 x 10 Chief Stamina and resources.",
      url: "wos-wiki-gift-code-tracker.html", cta: "Get the gift codes" },

    { date: "2026-10-08", brand: "fathom", featured: true,
      title: "Fathom Guides is live",
      text: "Whiteout Survival guides, a live gift code and news site, and a Minecraft survival manual. We are its branding and content partner.",
      url: "drs-case-study-fathom.html", cta: "Read the case study" },

    { date: "2026-04", brand: "wos",
      title: "Flame and Fangs guide added",
      text: "How to earn Crystallite Cores with the bonus cores trick, what to spend them on and a chat schedule template.",
      url: "wos-guide-flame-and-fangs.html", cta: "Read the guide" },

    { date: "2026-04", brand: "wos",
      title: "April 2026 update explained",
      text: "Flame Tech, T12 troops and the Icefire Warhymn League, and what they mean for free players.",
      url: "wos-blog-13-april-update.html", cta: "Read the post" },

    { brand: "wos",
      title: "SvS research day: Day 2 or Day 5?",
      text: "Why alliances disagree about when to spend research speed-ups in SvS prep, and how to decide for your state.",
      url: "wos-blog-14-svs-research-day.html", cta: "Read the post" },

    { date: "2026-10", brand: "ac", featured: true,
      title: "Tactical Leadership Companion is published",
      text: "Atker's first book is live in hardback, Kindle and a printable edition, with the branding and delivery built through DRS.",
      url: "drs-blog-12-tlc-launch.html", cta: "Read the story" },

    { date: "2026-10", brand: "ma", featured: true,
      title: "Where is Maverick? sells outside the UK",
      text: "Every copy had gone to a UK reader until now. The first order from further afield is a small milestone worth marking.",
      url: "drs-blog-11-ma-international.html", cta: "Read the story" }
  ],

  /* Evergreen reads shown in "From the blog" on the Home page. */
  posts: [
    { label: "Studio guide", title: "The free tool stack we use to build digital brands",
      text: "Every tool we use across our brands, all free or freemium, and what each one is for.",
      url: "drs-blog-01-tool-stack.html" },
    { label: "Case study", title: "How one Reddit post became a 323,000-view gaming wiki",
      text: "From zero presence to a growing free-to-play wiki, built on free tools by listening to what players asked for.",
      url: "drs-blog-03-wos-build.html" },
    { label: "Guide", title: "How to sell digital products online: a step-by-step guide",
      text: "From choosing your product to making your first sale, the process we followed.",
      url: "drs-blog-09-how-to-sell-digital-products.html" }
  ]
};
