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

    // return true;

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

    // remove popups banners
    function removePopups() {
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
    }

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

    setInterval(removePopups, 2000);
  },
});
