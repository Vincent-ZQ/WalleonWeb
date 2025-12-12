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

            // ⚡ 初始完全隐藏在屏幕外，opacity 0，保证 iOS 渲染
            footer.style.visibility = "visible";
            footer.style.opacity = "0";
            footer.style.transform = `translate3d(0, ${footer.offsetHeight}px, 0)`; // 隐藏在屏幕外
            footer.style.willChange = "transform, opacity";

            // 父容器增加最小高度，保证参与布局
            footerContainer.style.minHeight = `${footer.offsetHeight + 10}px`;

            // requestAnimationFrame 强制渲染，iOS 会显示
            requestAnimationFrame(() => {
                footer.style.opacity = "1";

                const hiddenHeight = footer.offsetHeight;
                const heightToBePulled = hiddenHeight * slowFactor;
                const scrollableHeight = Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight
                ) - window.innerHeight;
                const initialTranslatedY = hiddenHeight - heightToBePulled;
                const threshold = scrollableHeight - hiddenHeight;
                let initialTranslated = false;

                // iOS 兼容滚动值
                const getScrollY = () =>
                    window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

                // 滚动事件控制抽屉慢慢滑出
                window.addEventListener("scroll", () => {
                    const scrollY = getScrollY();

                    if (scrollY > scrollableHeight * 0.1 && !initialTranslated) {
                        // Footer 初始完全隐藏在底部
                        footer.style.transform = `translate3d(0, ${hiddenHeight}px, 0)`;
                        initialTranslated = true;
                    }

                    if (scrollY >= threshold) {
                        const delta = scrollY - threshold;
                        const translateY = Math.max(delta * slowFactor, 0);
                        const currentTranslateY = initialTranslatedY + translateY;

                        footer.style.transform = `translate3d(0, -${currentTranslateY}px, 0)`;

                        const pullProgress = translateY / initialTranslatedY;
                        footer.style.zIndex = pullProgress > 0.5 ? "100000" : "0";
                    } else {
                        footer.style.transform = `translate3d(0, -${hiddenHeight - heightToBePulled}px, 0)`;
                        footer.style.zIndex = "0";
                    }
                });
            });
        })
        .catch(err => console.error("Error loading footer:", err));
}
