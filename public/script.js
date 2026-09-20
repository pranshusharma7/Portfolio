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
/* =========================================================
   ADDED FEATURES — preloader, command palette,
   count-up stats, magnetic buttons
   (script is loaded at end of <body>, DOM is ready)
   ========================================================= */
(function () {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- PRELOADER ---------- */
    const preloader = document.getElementById("preloader");
    const preloaderBar = document.getElementById("preloaderBar");
    if (preloader && preloaderBar) {
        let pct = 0;
        const tick = setInterval(() => {
            pct = Math.min(100, pct + Math.random() * 18 + 6);
            preloaderBar.style.width = pct + "%";
            if (pct >= 100) clearInterval(tick);
        }, 130);
        const finish = () => {
            preloaderBar.style.width = "100%";
            setTimeout(() => preloader.classList.add("done"), 350);
            setTimeout(() => preloader.remove(), 1100);
        };
        window.addEventListener("load", () => setTimeout(finish, 500));
        // Safety fallback so it never hangs
        setTimeout(finish, 3500);
    }

    /* ---------- COUNT-UP STATS ---------- */
    const counters = document.querySelectorAll(".count-up");
    const runCounter = (el) => {
        const target = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        const pad = parseInt(el.dataset.pad || "0", 10);
        if (reduceMotion) {
            el.textContent = String(Math.round(target)).padStart(pad, "0") + suffix;
            return;
        }
        const dur = 1400;
        const start = performance.now();
        const step = (now) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = Math.round(target * eased);
            el.textContent = String(val).padStart(pad, "0") + suffix;
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    if ("IntersectionObserver" in window && counters.length) {
        const co = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    runCounter(e.target);
                    co.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach((c) => co.observe(c));
    } else {
        counters.forEach(runCounter);
    }

    /* ---------- MAGNETIC BUTTONS ---------- */
    if (!reduceMotion && !window.matchMedia("(pointer: coarse)").matches) {
        document.querySelectorAll(".btn-primary").forEach((btn) => {
            btn.classList.add("magnetic");
            btn.addEventListener("mousemove", (e) => {
                const r = btn.getBoundingClientRect();
                const mx = e.clientX - r.left - r.width / 2;
                const my = e.clientY - r.top - r.height / 2;
                btn.style.transform = `translate(${mx * 0.18}px, ${my * 0.3 - 4}px)`;
            });
            btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
        });
    }

    /* ---------- COMMAND PALETTE ---------- */
    const overlay = document.getElementById("cmdkOverlay");
    const input = document.getElementById("cmdkInput");
    const list = document.getElementById("cmdkList");
    const trigger = document.getElementById("cmdkBtn");

    if (overlay && input && list) {
        const COMMANDS = [
            { icon: "bx-home-alt", label: "Home", hint: "section", action: () => go("#home") },
            { icon: "bx-user", label: "About", hint: "section", action: () => go("#about") },
            { icon: "bx-been-here", label: "Services", hint: "section", action: () => go("#services") },
            { icon: "bx-code-block", label: "Skills", hint: "section", action: () => go("#skills") },
            { icon: "bx-briefcase-alt", label: "Projects", hint: "section", action: () => go("#projects") },
            { icon: "bx-award", label: "Certifications", hint: "section", action: () => go("#certifications") },
            { icon: "bx-envelope", label: "Contact", hint: "section", action: () => go("#contact") },
            { icon: "bx-moon", label: "Toggle theme", hint: "action", action: () => document.getElementById("themeToggle")?.click() },
            { icon: "bx-copy", label: "Copy email address", hint: "action", action: () => document.getElementById("copyEmailBtn")?.click() },
            { icon: "bxl-github", label: "Open GitHub", hint: "link", action: () => window.open("https://github.com/pranshusharma7", "_blank") },
            { icon: "bxl-linkedin", label: "Open LinkedIn", hint: "link", action: () => window.open("https://www.linkedin.com/in/pranshu-kumar-6742a4323/", "_blank") },
            { icon: "bx-file", label: "View Resume", hint: "link", action: () => window.open("Pranshu_Kumar_Resume_.pdf", "_blank") },
        ];
        let filtered = COMMANDS.slice();
        let activeIdx = 0;

        function go(hash) {
            close();
            document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }

        function render() {
            if (!filtered.length) {
                list.innerHTML = '<li class="cmdk-empty">No matching commands.</li>';
                return;
            }
            list.innerHTML = filtered.map((c, i) =>
                `<li class="cmdk-item ${i === activeIdx ? "active" : ""}" data-i="${i}">
                    <i class="bx ${c.icon}"></i>
                    <span>${c.label}</span>
                    <span class="cmdk-hint">${c.hint}</span>
                </li>`).join("");
            list.querySelectorAll(".cmdk-item").forEach((li) => {
                li.addEventListener("mouseenter", () => { activeIdx = +li.dataset.i; highlight(); });
                li.addEventListener("click", () => filtered[+li.dataset.i].action());
            });
        }
        function highlight() {
            list.querySelectorAll(".cmdk-item").forEach((li, i) =>
                li.classList.toggle("active", i === activeIdx));
        }
        function filter() {
            const q = input.value.trim().toLowerCase();
            filtered = COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.hint.includes(q));
            activeIdx = 0;
            render();
        }
        function open() {
            overlay.classList.add("open");
            input.value = "";
            filter();
            setTimeout(() => input.focus(), 40);
        }
        function close() { overlay.classList.remove("open"); }

        trigger?.addEventListener("click", open);
        input.addEventListener("input", filter);
        overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

        input.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); activeIdx = (activeIdx + 1) % filtered.length; highlight(); }
            else if (e.key === "ArrowUp") { e.preventDefault(); activeIdx = (activeIdx - 1 + filtered.length) % filtered.length; highlight(); }
            else if (e.key === "Enter") { e.preventDefault(); filtered[activeIdx]?.action(); }
        });

        document.addEventListener("keydown", (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                overlay.classList.contains("open") ? close() : open();
            } else if (e.key === "Escape" && overlay.classList.contains("open")) {
                close();
            }
        });

        render();
    }
})();

/* =========================================================
   PREMIUM POLISH — spotlight, staggered reveal, confetti
   ========================================================= */
(function () {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = !window.matchMedia("(pointer: coarse)").matches;

    /* ---------- CARD SPOTLIGHT (cursor follow) ---------- */
    if (fine) {
        document.querySelectorAll(".skill-card, .certification-card").forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const r = card.getBoundingClientRect();
                card.style.setProperty("--mx", (e.clientX - r.left) + "px");
                card.style.setProperty("--my", (e.clientY - r.top) + "px");
            });
        });
    }

    /* ---------- STAGGERED REVEAL (skills grid) ---------- */
    if (!reduceMotion) {
        document.querySelectorAll(".skills-grid .skill-card").forEach((card, i) => {
            card.style.transitionDelay = (i % 4) * 70 + "ms";
        });
    }

    /* ---------- CONFETTI ON EMAIL COPY ---------- */
    const copyBtn = document.getElementById("copyEmailBtn");
    if (copyBtn && !reduceMotion) {
        const COLORS = ["#ff4d5a", "#ff8a5b", "#45d483", "#7928ca", "#00dfd8", "#f7df1e"];
        copyBtn.addEventListener("click", () => {
            const r = copyBtn.getBoundingClientRect();
            const ox = r.left + r.width / 2;
            const oy = r.top + r.height / 2;
            for (let i = 0; i < 26; i++) {
                const p = document.createElement("span");
                p.className = "confetti-piece";
                p.style.left = ox + "px";
                p.style.top = oy + "px";
                p.style.background = COLORS[i % COLORS.length];
                document.body.appendChild(p);
                const angle = Math.random() * Math.PI - Math.PI / 2 - Math.PI / 4;
                const dist = 70 + Math.random() * 130;
                const dx = Math.cos(angle) * dist * (Math.random() < 0.5 ? -1 : 1);
                const dy = -Math.abs(Math.sin(angle) * dist) - 40;
                p.animate(
                    [
                        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
                        { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random() * 540}deg)`, opacity: 1, offset: 0.7 },
                        { transform: `translate(${dx * 1.1}px, ${dy + 220}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
                    ],
                    { duration: 1100 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" }
                );
                setTimeout(() => p.remove(), 1700);
            }
        });
    }
})();
