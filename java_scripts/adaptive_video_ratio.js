export function initAdaptiveVideoRatio(options = {}) {

  navBarContainer = document.querySelector(".nav-bar-container");
  const backgroundImgContainer = document.querySelector(".initial-background-container");
  const video = document.getElementById("header-bg-video");

  function adjustLayout() {
    // Resize background container according to navbar
    const navBarHeight = navBarContainer.offsetHeight;
    // backgroundImgContainer.style.height = (window.innerHeight - navBarHeight) + "px";

    // Wait until video metadata is loaded before using videoWidth/videoHeight
    if (video.videoWidth && video.videoHeight) {
      const videoRatio = video.videoWidth / video.videoHeight;
      const containerRatio = backgroundImgContainer.offsetWidth / backgroundImgContainer.offsetHeight;

      if (videoRatio > containerRatio) {
        // Video is wider → match container height
        video.style.width = "auto";
        video.style.height = "100%";
      } else {
        // Video is taller → match container width
        video.style.width = "100%";
        video.style.height = "auto";
      }
    }
  }

  // When video metadata is ready, do the first adjustment
  video.addEventListener("loadedmetadata", adjustLayout);

  // Initial call (in case metadata loads late)
  window.addEventListener("load", adjustLayout);

  // Recalculate on window resize
  window.addEventListener("resize", adjustLayout);

}