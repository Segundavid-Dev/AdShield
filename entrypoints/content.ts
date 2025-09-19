export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_idle",
  main() {
    console.log("Ad blocker content script started.");

    let lastUserClick = 0;

    document.addEventListener("click", () => {
      lastUserClick = Date.now();
    });

    const userJustClicked = () => {
      return Date.now() - lastUserClick < 2000;
    };

    // Intercept navigation attempts
    window.addEventListener("beforeunload", (e) => {
      if (!userJustClicked()) {
        console.log("Blocked suspicious redirect.");
        e.preventDefault();
      }
    });

    // intercept JS-based redirects
    const originAssign = window.location.assign;
    window.location.assign = function (url: string) {
      if (!userJustClicked()) {
        console.log("Blocked JS redirect to:", url);
      } else {
        originAssign.call(window.location, url);
      }
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

    setInterval(removePopups, 1000);
  },
});
