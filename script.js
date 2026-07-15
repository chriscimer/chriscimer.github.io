(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const navigationLinks = document.querySelectorAll(".main-nav a");

  const openMenu = () => {
    if (!menuButton || !navigation) return;

    navigation.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.textContent = "Close";
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    if (!menuButton || !navigation) return;

    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu";
    document.body.style.overflow = "";
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100) closeMenu();
    });
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealElements = document.querySelectorAll(
      [
        ".manifest-inner",
        ".collections-intro",
        ".collection-heading",
        ".story-image",
        ".story-statement",
        ".collection-closing",
        ".bespoke-copy",
        ".bespoke-image",
        ".designer-portrait",
        ".designer-copy",
        ".process-heading",
        ".process-list li",
        ".contact-inner"
      ].join(",")
    );

    revealElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(34px)";
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.animate(
            [
              { opacity: 0, transform: "translateY(34px)" },
              { opacity: 1, transform: "translateY(0)" }
            ],
            {
              duration: 850,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards"
            }
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -7% 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  const heroImage = document.querySelector(".hero-media img");

  if (
    heroImage &&
    !prefersReducedMotion &&
    window.matchMedia("(min-width: 900px)").matches
  ) {
    let ticking = false;

    const updateHero = () => {
      const scrollPosition = Math.min(window.scrollY, window.innerHeight);
      const movement = scrollPosition * 0.08;
      const scale = 1 + (scrollPosition / window.innerHeight) * 0.025;

      heroImage.style.transform = `translateY(${movement}px) scale(${scale})`;
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHero);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });

      history.replaceState(null, "", targetId);
    });
  });

  const currentYear = new Date().getFullYear();

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(currentYear);
  });
})();
