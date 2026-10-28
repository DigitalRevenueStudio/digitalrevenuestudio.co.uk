/*
  DIGITAL REVENUE STUDIO: LINKS
  ---------------------------------------------------------------
  Every brand button on the Home and Portfolio pages reads its link
  from here. Change a link once and it updates everywhere.

  Rules:
  - Keep the quote marks and commas exactly as they are.
  - Pages on this site are written without the domain, for example "/drs-case-study-ma".
  - Links to other websites start with https://
  - Amazon links are marked as sponsored automatically.
  - To change a button label, edit the "label" next to its link.
*/
window.DRS_LINKS = {

  brands: {

    ma: {
      caseStudy: "/drs-case-study-ma",
      site:      "https://www.mavericksadventures.co.uk",
      social:    { instagram: "https://www.instagram.com/MaverickAdventure5/", facebook: "https://www.facebook.com/profile.php?id=61587747405766", tiktok: "https://www.tiktok.com/@mavericks.adventu1", pinterest: "https://uk.pinterest.com/digitalrevenuestudio/mavericks-adventures/", youtube: "", x: "", threads: "", linkedin: "" },   /* add each full profile link here; empty ones show greyed out */
      promo:     { label: "Buy the book", url: "https://amzn.to/4628qPf" }
    },

    wos: {
      caseStudy: "/drs-case-study-wos",
      site:      "/drs-wos-wiki",
      social:    { instagram: "https://www.instagram.com/digital.revenuestudio/", facebook: "https://www.facebook.com/profile.php?id=61586853106276", tiktok: "https://www.tiktok.com/@digitalrevenuestu", pinterest: "https://uk.pinterest.com/digitalrevenuestudio/whiteout-survival-wiki/", reddit: "https://www.reddit.com/user/digitalrevenuestudio/" },   /* instagram, facebook and tiktok are the DRS profiles */
      promo:     { label: "Get the gift codes", url: "/wos-wiki-gift-code-tracker" }
    },

    die: {
      caseStudy: "/drs-case-study-exp",
      site:      "/drs-case-study-exp",
      promo:     { label: "Visit the shop", url: "https://payhip.com/DigitalRevenueStudio" }
    },

    ac: {
      caseStudy: "/drs-case-study-ac",
      site:      "https://atker.co.uk",
      social:    { facebook: "https://www.facebook.com/profile.php?id=61594920369975", instagram: "https://www.instagram.com/atker_consultancy/", linkedin: "https://www.linkedin.com/company/112338345/", pinterest: "https://uk.pinterest.com/digitalrevenuestudio/atker-consultancy-services/" },
      promo:     { label: "Buy the TLC book", url: "https://atker.co.uk/tlc" }
    },

    fathom: {
      caseStudy: "/drs-case-study-fathom",
      site:      "https://fathomguides.github.io/",
      social:    { instagram: "https://www.instagram.com/fathomguides/", facebook: "https://www.facebook.com/profile.php?id=61594810988435", tiktok: "https://www.tiktok.com/@fathomguides", pinterest: "https://uk.pinterest.com/digitalrevenuestudio/fathom-guides/" },
      promo:     { label: "Shop the guides", url: "https://fathomguides.github.io/shop.html" }
    }

  },

  /* Other links used across the site */
  other: {
    kofi:      "https://ko-fi.com/digitalrevenuestudio",
    payhip:    "https://payhip.com/DigitalRevenueStudio",
    wiki:      "/drs-wos-wiki",
    codes:     "/wos-wiki-gift-code-tracker",
    services:  "/drs-services",
    signup:    "/drs-signup",
    blog:      "/drs-blog",
    portfolio: "/portfolio",
    social: {
      instagram: "https://www.instagram.com/digital.revenuestudio/",
      facebook:  "https://www.facebook.com/profile.php?id=61586853106276",
      tiktok:    "https://www.tiktok.com/@digitalrevenuestu",
      pinterest: "https://uk.pinterest.com/digitalrevenuestudio/",
      reddit:    "https://www.reddit.com/user/digitalrevenuestudio/"
    }
  }
};
