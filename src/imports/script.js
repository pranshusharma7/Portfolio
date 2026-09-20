/* =========================================================
   PRANSHU SHARMA — PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       MOBILE MENU
       ========================================================= */
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (mobileMenu.classList.contains("open")) {
                    icon.classList.remove("bx-menu");
                    icon.classList.add("bx-x");
                } else {
                    icon.classList.remove("bx-x");
                    icon.classList.add("bx-menu");
                }
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("bx-x");
                    icon.classList.add("bx-menu");
                }
            });
        });
    }


    /* =========================================================
       THEME TOGGLE
       ========================================================= */
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector("i");
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            if (themeIcon) {
                themeIcon.classList.remove("bx-moon");
                themeIcon.classList.add("bx-sun");
            }
        }

        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");

            if (themeIcon) {
                if (isLight) {
                    themeIcon.classList.remove("bx-moon");
                    themeIcon.classList.add("bx-sun");
                    localStorage.setItem("portfolio-theme", "light");
                } else {
                    themeIcon.classList.remove("bx-sun");
                    themeIcon.classList.add("bx-moon");
                    localStorage.setItem("portfolio-theme", "dark");
                }
            }
        });
    }


    /* =========================================================
       SCROLL REVEAL
       ========================================================= */
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(el => el.classList.add("visible"));
    }


    /* =========================================================
       ACTIVE NAVIGATION
       ========================================================= */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNav() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();


    /* =========================================================
       CURSOR GLOW
       ========================================================= */
    const cursorGlow = document.querySelector(".cursor-glow");

    if (cursorGlow) {
        window.addEventListener("mousemove", event => {
            cursorGlow.style.left = `${event.clientX}px`;
            cursorGlow.style.top = `${event.clientY}px`;
        });
    }


    /* =========================================================
       PROJECT IMAGE PARALLAX (3D TILT EFFECT)
       ========================================================= */
    const projectImages = document.querySelectorAll(".project-image");

    projectImages.forEach(image => {
        image.addEventListener("mousemove", event => {
            const rect = image.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateY = ((x / rect.width) - 0.5) * 4;
            const rotateX = ((y / rect.height) - 0.5) * -4;

            image.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        image.addEventListener("mouseleave", () => {
            image.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
        });
    });


    /* =========================================================
       HEADER SHADOW ON SCROLL
       ========================================================= */
    const header = document.querySelector(".header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                header.style.boxShadow = "0 20px 60px rgba(0,0,0,.4)";
            } else {
                header.style.boxShadow = "0 15px 50px rgba(0,0,0,.25)";
            }
        });
    }


    /* =========================================================
       BUTTON RIPPLE EFFECT
       ========================================================= */
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {
        button.addEventListener("click", function(event) {
            const ripple = document.createElement("span");
            ripple.style.position = "absolute";
            ripple.style.width = "10px";
            ripple.style.height = "10px";
            ripple.style.borderRadius = "50%";
            ripple.style.background = "rgba(255,255,255,.4)";
            ripple.style.transform = "translate(-50%, -50%)";
            ripple.style.pointerEvents = "none";

            const rect = button.getBoundingClientRect();
            ripple.style.left = `${event.clientX - rect.left}px`;
            ripple.style.top = `${event.clientY - rect.top}px`;

            button.style.position = "relative";
            button.style.overflow = "hidden";
            button.appendChild(ripple);

            ripple.animate(
                [
                    { width: "10px", height: "10px", opacity: 1 },
                    { width: "300px", height: "300px", opacity: 0 }
                ],
                {
                    duration: 600,
                    easing: "ease-out"
                }
            );

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    /* =========================================================
       CONTACT FORM HANDLING (AJAX Email to Inbox)
       ========================================================= */
    const toggleFormBtn = document.getElementById("toggleContactFormBtn");
    const contactForm = document.getElementById("contactForm");
    const contactFormContainer = document.getElementById("contactFormContainer");
    const formStatus = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");

    if (toggleFormBtn && contactFormContainer) {
        toggleFormBtn.addEventListener("click", () => {
            contactFormContainer.scrollIntoView({ behavior: "smooth", block: "center" });
            const nameInput = document.getElementById("senderName");
            if (nameInput) {
                setTimeout(() => nameInput.focus(), 400);
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("senderName").value.trim();
            const email = document.getElementById("senderEmail").value.trim();
            const subject = document.getElementById("senderSubject").value.trim();
            const message = document.getElementById("senderMessage").value.trim();

            if (!name || !email || !message) {
                showStatus("Please fill in all required fields.", "error");
                return;
            }

            // Set loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="btn-text">Sending...</span>
                    <i class="bx bx-loader-alt bx-spin"></i>
                `;
            }

            // Recipient email (can be updated by user)
            const recipientEmail = "pranshukumar30072006@gmail.com";

            // Check if user is opening file directly (file:// protocol)
            if (window.location.protocol === "file:") {
                showStatus(
                    `<strong>Notice:</strong> Aapne page ko file:// se open kiya hai. Email send karne ke liye page ko local server (<strong>http://localhost:8080</strong>) ya live website se open karein.`,
                    "error"
                );
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span class="btn-text">Send Message</span>
                        <i class="bx bx-send"></i>
                    `;
                }
                return;
            }

            try {
                const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        _subject: `New Portfolio Message: ${subject || "Inquiry"} from ${name}`,
                        message: message,
                        _captcha: "false"
                    })
                });

                const data = await response.json();

                if (data && (data.success === "true" || data.success === true)) {
                    showStatus(
                        `Thank you, <strong>${escapeHtml(name)}</strong>! Your message has been sent successfully. I will get back to you shortly.`,
                        "success"
                    );
                    contactForm.reset();
                } else if (data && data.message && data.message.toLowerCase().includes("activation")) {
                    showStatus(
                        `⚠️ <strong>Action Required:</strong> FormSubmit ne <strong>${recipientEmail}</strong> par ek <em>'Activate Form'</em> email bheja hai. Apne Gmail ke <strong>Inbox / Spam</strong> folder mein jakar ek baar click kar dein, uske baad saare messages direct deliver hone lagenge!`,
                        "success"
                    );
                    contactForm.reset();
                } else {
                    const errorMsg = data && data.message ? data.message : "Could not send message.";
                    showStatus(
                        `${errorMsg} You can also email directly at <a href="mailto:${recipientEmail}" style="text-decoration:underline;color:inherit;">${recipientEmail}</a>`,
                        "error"
                    );
                }
            } catch (err) {
                console.error("Form submit error:", err);
                showStatus(
                    `Network error. You can also email me directly at <a href="mailto:${recipientEmail}" style="text-decoration:underline;color:inherit;">${recipientEmail}</a>`,
                    "error"
                );
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span class="btn-text">Send Message</span>
                        <i class="bx bx-send"></i>
                    `;
                }
            }
        });
    }

    function showStatus(message, type) {
        if (!formStatus) return;
        formStatus.className = `form-status ${type}`;
        formStatus.innerHTML = `
            <i class="bx ${type === "success" ? "bx-check-circle" : "bx-error-circle"}" style="font-size: 1.8rem;"></i>
            <span>${message}</span>
        `;
        formStatus.style.display = "flex";

        if (type === "success") {
            setTimeout(() => {
                formStatus.style.display = "none";
            }, 8000);
        }
    }

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    /* =========================================================
       SCROLL PROGRESS BAR
       ========================================================= */
    const progressBar = document.getElementById("scrollProgressBar");
    if (progressBar) {
        window.addEventListener("scroll", () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${progress}%`;
        });
    }

    /* =========================================================
       DYNAMIC HERO TYPING ROLE
       ========================================================= */
    const typedRole = document.getElementById("typedRole");
    if (typedRole) {
        const roles = [
            "Full Stack Developer",
            "MERN Stack Specialist",
            "Creative Web Architect",
            "JavaScript & React Dev"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;

        function typeLoop() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typedRole.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 45;
            } else {
                typedRole.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 105;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingDelay = 2200; // Pause at end of text
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingDelay = 500;
            }

            setTimeout(typeLoop, typingDelay);
        }

        setTimeout(typeLoop, 800);
    }

    /* =========================================================
       QUICK COPY EMAIL TO CLIPBOARD
       ========================================================= */
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", () => {
            const emailToCopy = copyEmailBtn.getAttribute("data-email") || "pranshukumar30072006@gmail.com";
            navigator.clipboard.writeText(emailToCopy).then(() => {
                copyEmailBtn.classList.add("copied");
                setTimeout(() => {
                    copyEmailBtn.classList.remove("copied");
                }, 2200);
            }).catch(() => {
                // Fallback prompt if clipboard API fails
                prompt("Copy to clipboard: Ctrl+C, Enter", emailToCopy);
            });
        });
    }

    /* =========================================================
       BACK TO TOP FLOATING BUTTON
       ========================================================= */
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =========================================================
       CONSOLE WELCOME MESSAGE
       ========================================================= */
    console.log(
        "%cHey! 👋 Welcome to Pranshu's Portfolio.",
        "color:#ff4d5a;font-size:16px;font-weight:bold;"
    );
    console.log(
        "%cBuilt with HTML, CSS & JavaScript.",
        "color:#888;font-size:12px;"
    );

});