/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;

    const navbar =
        document.getElementById("navbar");

    const themeToggle =
        document.getElementById("themeToggle");

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const scrollTop =
        document.getElementById("scrollTop");

    const typingText =
        document.getElementById("typingText");

    const year =
        document.getElementById("year");

    const projectCards =
        document.querySelectorAll(".project-card");


    /* =====================================================
       YEAR
    ====================================================== */

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        body.classList.add("light-theme");
    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");

        if (!icon) return;

        if (
            body.classList.contains(
                "light-theme"
            )
        ) {

            icon.className =
                "fas fa-moon";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        } else {

            icon.className =
                "fas fa-sun";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }
    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                body.classList.toggle(
                    "light-theme"
                );

                const currentTheme =
                    body.classList.contains(
                        "light-theme"
                    )
                        ? "light"
                        : "dark";

                localStorage.setItem(
                    "portfolio-theme",
                    currentTheme
                );

                updateThemeIcon();
            }
        );
    }


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                navMenu.classList.toggle(
                    "active"
                );

                const icon =
                    menuToggle.querySelector("i");

                const isOpen =
                    navMenu.classList.contains(
                        "active"
                    );

                if (icon) {

                    icon.className =
                        isOpen
                            ? "fas fa-xmark"
                            : "fas fa-bars";
                }

                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close menu"
                        : "Open menu"
                );
            }
        );


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );

                    const icon =
                        menuToggle.querySelector("i");

                    if (icon) {
                        icon.className =
                            "fas fa-bars";
                    }

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open menu"
                    );
                }
            );

        });
    }


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ====================================================== */

    function handleNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );
        }
    }


    window.addEventListener(
        "scroll",
        handleNavbar,
        { passive: true }
    );

    handleNavbar();


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top
                        + window.scrollY
                        - navbarHeight
                        + 1;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            );
        });


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    function updateActiveNav() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.id;
            }
        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            const href =
                link.getAttribute(
                    "href"
                );

            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );
            }
        });
    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       TYPING EFFECT
    ====================================================== */

    const roles = [
        "Software Developer",
        "Java Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Problem Solver"
    ];

    let roleIndex = 0;
    let characterIndex = 0;

    let isDeleting = false;

    let typingSpeed = 90;


    function typeRole() {

        if (!typingText) return;

        const currentRole =
            roles[roleIndex];

        if (!isDeleting) {

            characterIndex++;

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );

            typingSpeed = 90;

            if (
                characterIndex ===
                currentRole.length
            ) {

                typingSpeed = 1800;
                isDeleting = true;
            }

        } else {

            characterIndex--;

            typingText.textContent =
                currentRole.substring(
                    0,
                    characterIndex
                );

            typingSpeed = 50;

            if (characterIndex === 0) {

                isDeleting = false;

                roleIndex =
                    (roleIndex + 1) %
                    roles.length;

                typingSpeed = 400;
            }
        }

        setTimeout(
            typeRole,
            typingSpeed
        );
    }


    typeRole();


    /* =====================================================
       CREATIVE PROJECT 3D TILT
    ====================================================== */

    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                /*
                 * Disable 3D effect on
                 * smaller screens.
                 */

                if (
                    window.innerWidth <=
                    768
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                /*
                 * Keep the tilt subtle.
                 * This makes it look
                 * premium rather than
                 * like a game card.
                 */

                const rotateY =
                    (
                        (x - centerX) /
                        centerX
                    ) * 4;

                const rotateX =
                    (
                        (centerY - y) /
                        centerY
                    ) * 4;


                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );


                card.style.transform = `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    scale(1.01)
                `;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

                card.style.setProperty(
                    "--mouse-x",
                    "50%"
                );

                card.style.setProperty(
                    "--mouse-y",
                    "50%"
                );
            }
        );


        /*
         * Touch devices:
         * keep cards static and clean.
         */

        card.addEventListener(
            "touchstart",
            () => {

                card.style.transform =
                    "scale(0.995)";

            },
            { passive: true }
        );


        card.addEventListener(
            "touchend",
            () => {

                card.style.transform =
                    "";

            },
            { passive: true }
        );

    });


    /* =====================================================
       SCROLL TOP
    ====================================================== */

    function handleScrollTop() {

        if (!scrollTop) return;

        if (window.scrollY > 500) {

            scrollTop.classList.add(
                "show"
            );

        } else {

            scrollTop.classList.remove(
                "show"
            );
        }
    }


    window.addEventListener(
        "scroll",
        handleScrollTop,
        { passive: true }
    );

    handleScrollTop();


    if (scrollTop) {

        scrollTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =====================================================
       REVEAL ANIMATION
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-content, " +
            ".about-stats, " +
            ".skills-container, " +
            ".project-card, " +
            ".contact-wrapper, " +
            ".contact-socials"
        );


    revealElements.forEach(
        element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity 0.7s ease, " +
                "transform 0.7s ease";
        }
    );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );
        }
    );


    /* =====================================================
       PROJECT IMAGE PARALLAX
    ====================================================== */

    projectCards.forEach(card => {

        const image =
            card.querySelector(
                ".project-image img"
            );

        if (!image) return;


        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <=
                    768
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;

                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                const moveX =
                    (x - 0.5) * 8;

                const moveY =
                    (y - 0.5) * 8;


                image.style.transform = `
                    scale(1.09)
                    translate(
                        ${moveX}px,
                        ${moveY}px
                    )
                `;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "";
            }
        );

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ====================================================== */

    projectCards.forEach(card => {

        card.setAttribute(
            "tabindex",
            "0"
        );

        card.addEventListener(
            "focus",
            () => {

                if (
                    window.innerWidth >
                    768
                ) {

                    card.style.transform =
                        `
                        perspective(1200px)
                        translateY(-6px)
                        scale(1.005)
                        `;
                }
            }
        );


        card.addEventListener(
            "blur",
            () => {

                card.style.transform =
                    "";
            }
        );

    });


    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                768 &&
                navMenu
            ) {

                navMenu.classList.remove(
                    "active"
                );

                if (menuToggle) {

                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );

                    if (icon) {

                        icon.className =
                            "fas fa-bars";
                    }
                }
            }

        }
    );

});