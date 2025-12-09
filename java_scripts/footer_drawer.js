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

            // Add padding-bottom dynamically
            document.body.style.paddingBottom = `${hiddenHeight}px`;

            // Initial hidden transform
            footer.style.transform = `translateY(${hiddenHeight / cuttingRatio}px)`;

            const scrollableHeight = document.body.scrollHeight - window.innerHeight;
            const threshold = scrollableHeight - hiddenHeight / cuttingRatio / slowFactor;

            window.addEventListener("scroll", () => {
                const scrollY = window.scrollY;

                if (scrollY >= threshold) {
                    const delta = scrollY - threshold;
                    const translateY = Math.max(hiddenHeight / cuttingRatio - delta * slowFactor, 0);
                    footer.style.transform = `translateY(${translateY}px)`;
                } else {
                    footer.style.transform = `translateY(${hiddenHeight / cuttingRatio}px)`;
                }
            });
        })
        .catch(err => console.error("Error loading footer:", err));
}