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

            const heightToBePulled = hiddenHeight * slowFactor;

            // Add padding-bottom dynamically
            footerContainer.style.minHeight = `${hiddenHeight}px`;

            const scrollableHeight = document.body.scrollHeight - window.innerHeight;
            const initialTranslatedY = hiddenHeight - heightToBePulled;
            const threshold = scrollableHeight - hiddenHeight; // start sliding when near bottom

            let initialTranslated = false;

            window.addEventListener("scroll", () => {
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
                    const currentTranslateY = initialTranslatedY + translateY;
                    
                    // Update transform
                    footer.style.transform = `translateY(-${currentTranslateY}px)`;
                    
                    // 动态调整 z-index：当 footer 拉出超过 50% 时提升 z-index
                    const pullProgress = translateY / initialTranslatedY; // 0 到 1
                    if (pullProgress > 0.5) {
                        footer.style.zIndex = "100000";
                    } else {
                        footer.style.zIndex = "0";
                    }
                } else {
                    // fully hidden
                    footer.style.transform = `translateY(-${hiddenHeight - heightToBePulled}px)`;
                    footer.style.zIndex = "0"; // 隐藏时保持低 z-index
                }
            });
        })
        .catch(err => console.error("Error loading footer:", err));
}