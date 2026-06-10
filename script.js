document.addEventListener("DOMContentLoaded", () => {
    // 1. Current Year for Footer
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Theme Toggle (Light / Dark)
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector("i");
        const themeText = themeToggleBtn.querySelector("span");

        const savedTheme = localStorage.getItem("portfolio-theme");
        if (savedTheme === "light") {
            document.body.setAttribute("data-theme", "light");
            themeIcon.className = "bx bx-moon";
            themeText.textContent = "Dark Mode";
        }

        themeToggleBtn.addEventListener("click", () => {
            if (document.body.getAttribute("data-theme") === "light") {
                document.body.removeAttribute("data-theme");
                localStorage.setItem("portfolio-theme", "dark");
                themeIcon.className = "bx bx-sun";
                themeText.textContent = "Light Mode";
            } else {
                document.body.setAttribute("data-theme", "light");
                localStorage.setItem("portfolio-theme", "light");
                themeIcon.className = "bx bx-moon";
                themeText.textContent = "Dark Mode";
            }
        });
    }

    // 3. Typewriter Effect
    const words = ["User Experiences", "Design Systems", "Digital Products", "Meaningful Solutions"];
    let i = 0;
    let isDeleting = false;
    let text = "";
    
    const typeWriterElement = document.getElementById("typewriter");
    if (typeWriterElement) {
        typeWriterElement.insertAdjacentHTML('afterend', '<span class="cursor">|</span>');

        function typeEffect() {
            if (!words || words.length === 0) return;
            
            const currentWord = words[i];
            
            if (isDeleting) {
                text = currentWord.substring(0, text.length - 1);
            } else {
                text = currentWord.substring(0, text.length + 1);
            }
            
            typeWriterElement.textContent = text;
            
            let typeSpeed = 80;
            
            if (isDeleting) typeSpeed /= 2;
            
            if (!isDeleting && text === currentWord) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && text === "") {
                isDeleting = false;
                i = (i + 1) % words.length;
                typeSpeed = 400; // Pause before new word
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();
    }

    // 4. Interactive Cursor Background Spotlight Glow
    const spotlight = document.getElementById("spotlight");
    if (spotlight) {
        window.addEventListener("mousemove", (e) => {
            spotlight.style.left = `${e.clientX}px`;
            spotlight.style.top = `${e.clientY}px`;
        });
    }

    // 5. Case Study Modal System
    const openModalBtns = document.querySelectorAll(".open-modal-btn");
    const modalOverlays = document.querySelectorAll(".modal-overlay");
    const closeModalBtns = document.querySelectorAll(".modal-close-btn");

    function closeAllModals() {
        modalOverlays.forEach(modal => {
            modal.classList.remove("active");
        });
        document.body.style.overflow = "";
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            closeAllModals();
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllModals();
        }
    });

    // 6. Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPosition = window.scrollY || window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop - 280) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // 7. Scroll Reveal Animations (Intersection Observer)
    const revealElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.1 });

        const targets = document.querySelectorAll('.section, .project-card, .skill-group-card, .cert-card, .process-step, .cv-card');
        targets.forEach((target, index) => {
            // Apply subtle layout delays for staggered items in grids
            let delay = 0;
            if (target.classList.contains('project-card') || 
                target.classList.contains('skill-group-card') || 
                target.classList.contains('process-step') || 
                target.classList.contains('cert-card')) {
                delay = (index % 3) * 0.08;
            }
            target.style.transitionDelay = `${delay}s`;
            target.classList.add('reveal');
            observer.observe(target);
        });
    };

    revealElements();

    // 8. Contact Form Feedback Mocking
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Allow form to submit naturally but show responsive success banner
            setTimeout(() => {
                submitBtn.textContent = '✓ Message Sent!';
                submitBtn.style.background = '#10B981'; // Green color indicator
                submitBtn.style.color = '#FFFFFF';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }, 3000);
            }, 1000);
        });
    }
});
