export function initFooter(options = {}) {
    const containerId = options.containerId || "footer-container";
    const footerPath = options.footerPath || "footer/footer.html";
    const slowFactor = options.slowFactor || 0.5;

    const footerContainer = document.getElementById(containerId);
    if (!footerContainer) return;

    fetch(footerPath)
        .then(resp => resp.text())
        .then(html => {
            footerContainer.innerHTML = html;

            const footer = footerContainer.querySelector("footer.page-footer");
            if (!footer) return;

            const hiddenHeight = footer.offsetHeight;

            if (hiddenHeight >= window.innerHeight) {
                console.log("Footer height exceeds or equals viewport height.");
                footer.style.position = "relative";
                return;
            }

            const cuttingRatio = 1 / slowFactor;
            const heightToBePulled = hiddenHeight * slowFactor;

            // Add padding-bottom dynamically
            document.body.style.paddingBottom = `${hiddenHeight}px`;

            const scrollableHeight = document.body.scrollHeight - window.innerHeight;
            const initialTranslatedY = hiddenHeight - heightToBePulled;
            const threshold = scrollableHeight - hiddenHeight; // start sliding when near bottom

            let initialTranslated = false;

            window.addEventListener("scroll", () => {
                // Initial hidden transform

                const scrollY = window.scrollY;

                if (scrollY > scrollableHeight * 0.1 && initialTranslated == false) {
                    // Footer starts fully below viewport
                    footer.style.transform = `translateY(-${hiddenHeight}px)`; // fully hidden
                    initialTranslated = true;
                    footer.style.visibility = "visible";
                }

                if (scrollY >= threshold) {
                    const delta = scrollY - threshold;
                    const translateY = Math.max(delta * slowFactor, 0);
                    // starts at hiddenHeight, reduces toward 0
                    footer.style.transform = `translateY(-${initialTranslatedY + translateY}px)`;
                } else {
                    // fully hidden
                    footer.style.transform = `translateY(-${hiddenHeight - heightToBePulled}px)`;
                }
            });
        })
        .catch(err => console.error("Error loading footer:", err));
}