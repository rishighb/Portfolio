document.addEventListener("DOMContentLoaded", () => {
    // Current Year for Footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // Theme Toggle
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

    // Typewriter Effect
    const words = ["ML Models", "ETL Pipelines", "Data Insights", "Scalable Apps"];
    let i = 0;
    let timer;
    let isDeleting = false;
    let text = "";
    
    const typeWriterElement = document.getElementById("typewriter");
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
        
        let typeSpeed = 100;
        
        if (isDeleting) typeSpeed /= 2;
        
        if (!isDeleting && text === currentWord) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && text === "") {
            isDeleting = false;
            i = (i + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();

    // Active Navigation Highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 250) {
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

    // Add this inside your DOMContentLoaded listener
    const revealElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active"); // re-animate on scroll
                }
            });
        }, { threshold: 0.15 });

        const targets = document.querySelectorAll('.section, .project-card, .skill-category, .cert-card');
        targets.forEach((target, index) => {
            target.style.transitionDelay = `${index * 0.1}s`;
            target.classList.add('reveal');
            observer.observe(target);
        });
    };

    revealElements();

    // Contact Form Submission Handler
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // FormSubmit.co will handle the actual submission
            // This gives visual feedback to the user
            setTimeout(() => {
                submitBtn.textContent = '✓ Message Sent!';
                submitBtn.style.backgroundColor = '#4ade80';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }
});
