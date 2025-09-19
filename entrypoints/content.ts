export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_idle",
  main() {
    console.log("Ad blocker content script started.");

    let lastUserClick = 0;
    let clickedElement: HTMLElement | null = null;
    let suspiciousRedirectCount = 0;

    const MALICIOUS_DOMAINS: string[] = [
      "betting",
      "casino",
      "porn",
      "xxx",
      "adult",
      "sex",
      "cam",
      "dating",
      "hookup",
      "ads",
      "popads",
      "propellerads",
      "exoclick",
      "juicyads",
      "trafficjunky",
    ];

    const LEGITIMATE_POPUPS_INDICATORS: string[] = [
      "login",
      "signin",
      "register",
      "signup",
      "modal",
      "dialog",
      "overlay",
      "lightbox",
      "cookie",
      "consent",
      "privacy",
      "terms",
    ];

    const AD_SELECTORS: string[] = [
      // Google Ads
      "ins.adsbygoogle",
      'iframe[src*="googlesyndication"]',
      'iframe[src*="googleadservices"]',
      'iframe[src*="doubleclick"]',

      // Generic ad patterns
      'iframe[src*="ads"]',
      "[data-ad]",
      "[data-ads]",
      "[data-ad-slot]",

      // Class based selectors
      'div[class*="ad-"]',
      'div[class*="ads-"]',
      'div[class*="advertisement"]',
      'div[class*="banner"]',
      'div[class*="popup"]',
      'div[class*="overlay"]',
      ".ad-banner",
      ".ad-container",
      ".advertisement",
      ".sponsored",

      // ID based selectors
      'div[id*="ad-"]',
      'div[id*="ads-"]',
      'div[id*="popup"]',
      "#advertisement",
      "#banner",

      // Common ad networks
      'iframe[src*="propellerads"]',
      'iframe[src*="exoclick"]',
      'iframe[src*="juicyads"]',
      'iframe[src*="trafficjunky"]',
      'iframe[src*="popads"]',
    ];

    document.addEventListener(
      "click",
      (e) => {
        lastUserClick = Date.now();
        clickedElement = e.target as HTMLElement;
      },
      true
    );

    const userJustClicked = () => {
      return Date.now() - lastUserClick < 1500;
    };

    const isLegitimateClick = (e: HTMLElement | null): boolean => {
      if (!e) return false;

      // manual check to confirm if it is a download link
      const href =
        e.getAttribute("href") || e.closest("a")?.getAttribute("href") || "";

      if (
        href.includes("download") ||
        href.includes(".mkv") ||
        href.includes(".zip") ||
        href.includes(".avi") ||
        href.includes(".mp4")
      ) {
        return true;
      }

      const text = e.textContent?.toLowerCase() || "";
      const legitimateKeywords = [
        "download",
        "login",
        "sign in",
        "register",
        "buy",
        "purchase",
        "cart",
        "checkout",
      ];
      return legitimateKeywords.some((keyword) => text.includes(keyword));
    };

    const isLegitimatePopup = (element: HTMLElement): boolean => {
      const content = element.textContent?.toLowerCase() || "";
      const className = element.className?.toLowerCase() || "";
      const id = element.id?.toLowerCase() || "";

      return LEGITIMATE_POPUPS_INDICATORS.some(
        (indicator) =>
          content.includes(indicator) ||
          className.includes(indicator) ||
          id.includes(indicator)
      );
    };

    const adBlock = () => {
      let blockedCount = 0;

      AD_SELECTORS.forEach((selector) => {
        try {
          const ads = document.querySelectorAll(selector);
          console.log(`Found ${ads.length} ads for selector: ${selector}`);

          ads.forEach((ad) => {
            const element = ad as HTMLElement;

            if (isLegitimatePopup(element)) {
              console.log(`Skipping legitimate element: ${selector}`);
              return;
            }

            element.remove();
            blockedCount++;
          });
        } catch (error) {
          console.log(`Error with ${selector}`);
        }
      });

      removeCustomPopups();
    };

    const isMaliciousUrl = (url: string): boolean => {
      try {
        const UrlObj = new URL(url);
        const domain = UrlObj.hostname.toLowerCase();
        const path = UrlObj.pathname.toLowerCase();
        const search = UrlObj.search.toLowerCase();

        // check domains against common malicious patterns
        const isDomainSuspicious = MALICIOUS_DOMAINS.some((pattern) =>
          domain.includes(pattern)
        );

        // check suspicious URL patterns
        const hasSuspiciousParams =
          search.includes("popup") ||
          search.includes("redirect") ||
          search.includes("affiliate");

        const suspiciousTlds = [".tk", ".ml", ".ga", ".cf", ".pw"];
        const hasSuspiciousTld = suspiciousTlds.some((tld) =>
          domain.endsWith(tld)
        );

        return isDomainSuspicious || hasSuspiciousParams || hasSuspiciousTld;
      } catch {
        return false;
      }
    };

    const observer = new MutationObserver((mutations) => {
      let hasNewNodes = false;

      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          hasNewNodes = true;
        }

        if (hasNewNodes) {
          adBlock();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Intercept navigation attempts
    window.addEventListener("beforeunload", (e) => {
      if (userJustClicked() && isLegitimateClick(clickedElement)) {
        console.log("Allowing legitimate navigation");
        return;
      }

      if (!userJustClicked()) {
        console.log("Blocked suspicious redirect.");
        e.preventDefault();
      }
    });

    // intercept JS based redirects
    const originAssign = window.location.assign;
    const originReplace = window.location.replace;

    window.location.assign = function (url: string) {
      if (isMaliciousUrl(url)) {
        console.log("Blocked redirect to", url);
      }

      if (!userJustClicked() || !isLegitimateClick(clickedElement)) {
        console.log("Blocked JS redirect to:", url);
        suspiciousRedirectCount++;
        return;
      }
      originAssign.call(window.location, url);
    };

    window.location.replace = function (url: string) {
      if (isMaliciousUrl(url)) {
        console.log("Blocked malicious JS replace to:", url);
        return;
      }

      if (!userJustClicked() || !isLegitimateClick(clickedElement)) {
        console.log("Blocked suspicious JS replace to:", url);
        return;
      }

      originReplace.call(window.location, url);
    };

    // remove suspicious iframes
    const removeSuspiciousIframesAndScripts = () => {
      const iframes = document.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        const src = iframe.src.toLowerCase();
        if (isMaliciousUrl(src)) {
          iframe.remove();
        }
      });

      const scripts = document.querySelectorAll("script[src]");
      scripts.forEach((script) => {
        const src = (script as HTMLScriptElement).src.toLowerCase();
        if (isMaliciousUrl(src)) {
          script.remove();
        }
      });
    };

    // remove popups banners
    const removeCustomPopups = () => {
      const popups = document.querySelectorAll("div, iframe");

      popups.forEach((el) => {
        const style = window.getComputedStyle(el);

        if (
          (style.position === "fixed" || style.position === "absolute") &&
          parseInt(style.zIndex) > 1000 &&
          el.clientHeight > window.innerHeight * 0.5
        ) {
          el.remove();
        }
      });
    };

    // Remove click hijacking
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a") as HTMLAnchorElement;

      if (link && link.href) {
        if (isMaliciousUrl(link.href)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    });

    setInterval(removeCustomPopups, 2000);
    setInterval(adBlock, 10000);
    setInterval(removeSuspiciousIframesAndScripts, 8000);

    // cleanup function for observer
    window.addEventListener("beforeunload", () => {
      observer.disconnect();
    });
  },
});
