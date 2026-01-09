import { waitFor } from "./utils.js";

export async function initFooter(options = {}) {
  const containerId = options.containerId || "footer-container";
  const footerPath = options.footerPath || "footer/footer.html";
  const slowFactor = options.slowFactor || 0.5;

  const footerContainer = document.getElementById(containerId);
  if (!footerContainer) return null;

  try {
    // 1️⃣ Fetch HTML
    const resp = await fetch(footerPath);
    const html = await resp.text();
    footerContainer.innerHTML = html;

    // 2️⃣ Select footer
    const footer = footerContainer.querySelector("footer.page-footer");
    if (!footer) return null;

    // 3️⃣ Initial hidden state
    footer.style.visibility = "visible";
    footer.style.opacity = "0";
    footer.style.transform = `translate3d(0, ${footer.offsetHeight}px, 0)`;
    footer.style.willChange = "transform, opacity";
    footerContainer.style.minHeight = `${footer.offsetHeight + 10}px`;

    console.log("Footer offset height:", footer.offsetHeight);

    // 4️⃣ Wait until footer has real height
    await waitFor(() => footer.offsetHeight > 0);

    // 5️⃣ Start animation
    requestAnimationFrame(() => {
      footer.style.opacity = "1";

      const hiddenHeight = footer.offsetHeight;
      const heightToBePulled = hiddenHeight * slowFactor;
      const scrollableHeight =
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) -
        window.innerHeight;

      const threshold = scrollableHeight - hiddenHeight;
      const initialTranslatedY = hiddenHeight - heightToBePulled;
      let initialTranslated = false;


      console.log(
        "Container initial → x:%s y:%s w:%s h:%s",
        footer.getBoundingClientRect().left.toFixed(1),
        footer.getBoundingClientRect().top.toFixed(1),
        footer.getBoundingClientRect().width.toFixed(1),
        footer.getBoundingClientRect().height.toFixed(1)
      );
      console.log("Footer initial position:", footer.style.top);
      console.log("Footer initialized translated Y:", initialTranslatedY);

      const getScrollY = () =>
        window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

      window.addEventListener("scroll", () => {
        const scrollY = getScrollY();

              console.log(
        "Container initial → x:%s y:%s w:%s h:%s",
        footer.getBoundingClientRect().left.toFixed(1),
        footer.getBoundingClientRect().top.toFixed(1),
        footer.getBoundingClientRect().width.toFixed(1),
        footer.getBoundingClientRect().height.toFixed(1)
      );
      
        if (scrollY > scrollableHeight * 0.1 && !initialTranslated) {
          footer.style.transform = `translate3d(0, ${hiddenHeight}px, 0)`;
          initialTranslated = true;
        }

        if (scrollY >= threshold) {
          const delta = scrollY - threshold;
          const translateY = Math.max(delta * slowFactor, 0);
          const currentTranslateY = initialTranslatedY + translateY;

          footer.style.transform = `translate3d(0, -${currentTranslateY}px, 0)`;
          footer.style.zIndex = translateY / initialTranslatedY > 0.5 ? "100000" : "0";
        } else {
          footer.style.transform = `translate3d(0, -${hiddenHeight - heightToBePulled}px, 0)`;
          footer.style.zIndex = "0";
        }
      });
    });

    return footer; // ✅ Now your await waits until footer exists
  } catch (err) {
    console.error("Error loading footer:", err);
    return null;
  }
}
