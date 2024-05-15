function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // --- SETUP START ---
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.defaults({ scroller: "#main" });
  // --- SETUP END --

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function navbarAnimation() {
  gsap.to("#nav-part1 svg", {
    transform: "translateY(-100%)",
    ScrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0%",
      end: "top -5%",
      scrub: true,
    },
  });
  gsap.to("#nav-part1 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    ScrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0%",
      end: "top -5%",
      scrub: true,
    },
  });
}
function videoAnimation() {
  var video = document.querySelector("#video-container");
  var playbtn = document.querySelector("#play");
  video.addEventListener("mouseenter", function () {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
      duration: 1,
    });
  });
  video.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0,

      duration: 1,
    });
  });

  video.addEventListener("mousemove", function (details) {
    gsap.to(playbtn, {
      left: details.x - 80,
      top: details.y - 80,
    });
  });
}

function loadingAnimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    duration: 0.8,
    delay: 0.9,
    stagger: 0.3,
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.9,
    duration: 0.5,
  });
}
function cursorAnimation() {
  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mousemove", function (dets) {
      gsap.to("#cursor", {
        top: dets.y,
        left: dets.x,
        transform: "translate(-50%,-50%)scale(1)",
      });
    });
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to("#cursor", {
        top: dets.y,
        left: dets.x,
        transform: "translate(-50%,-50%)scale(0)",
      });
    });
  });
}
locomotiveAnimation();
navbarAnimation();
videoAnimation();
loadingAnimation();
cursorAnimation();
