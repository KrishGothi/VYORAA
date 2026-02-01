/*
 * VYORAA - main.js
 * Confidential Creative Partner
 *
 * SECTIONS:
 * 1. PRELOADER
 * 2. GLOWING CURSOR
 * 3. MOBILE NAVIGATION
 * 4. ACTIVE NAV LINK HIGHLIGHTING
 * 5. SCROLL-FADE ANIMATIONS
 * 6. PAGE TRANSITIONS
 * 7. PARTICLE.JS (Multi-instance)
 * 8. NAV LINK TEXT SCRAMBLE
 * 9. MAGNETIC BUTTONS
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PRELOADER ---
    const preloader = document.getElementById('preloader');
    window.onload = () => {
        if (preloader) {
            preloader.classList.add('loaded');
        }
    };

    // --- 2. GLOWING CURSOR ---
    const cursorOuter = document.querySelector('.glow-cursor-outer');
    const cursorInner = document.querySelector('.glow-cursor-inner');
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .hamburger');
    let mouseX = 0, mouseY = 0, outerX = 0, outerY = 0, innerX = 0, innerY = 0;
    const outerEase = 0.1, innerEase = 0.7;
    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    function updateCursor() {
        outerX += (mouseX - outerX) * outerEase;
        outerY += (mouseY - outerY) * outerEase;
        cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;
        innerX += (mouseX - innerX) * innerEase;
        innerY += (mouseY - innerY) * innerEase;
        cursorInner.style.transform = `translate(${innerX}px, ${innerY}px)`;
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('hovered');
            cursorInner.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('hovered');
            cursorInner.classList.remove('hovered');
        });
    });

    // --- 3. MOBILE NAVIGATION ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // --- 4. ACTIVE NAV LINK HIGHLIGHTING ---
    const currentPath = window.location.pathname.split('/').pop();
    const activePage = currentPath === '' ? 'index.html' : currentPath;
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === activePage) {
            link.classList.add('active');
        }
    });
    
    // --- 5. SCROLL-FADE ANIMATIONS (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeElements.forEach(el => { observer.observe(el); });

    // --- 6. PAGE TRANSITIONS ---
    const allInternalLinks = document.querySelectorAll('a');
    allInternalLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !link.hasAttribute('target')) {
            link.addEventListener('click', e => {
                if (link.href === window.location.href) { e.preventDefault(); return; }
                if (link.hostname === window.location.hostname) {
                    e.preventDefault();
                    document.body.classList.add('fade-out');
                    setTimeout(() => { window.location.href = link.href; }, 300);
                }
            });
        }
    });

    // --- 7. PARTICLE.JS (Multi-instance) ---
    
    // Base config
    const particlesBaseConfig = {
        
        // ---------------------------------
        // THIS IS THE FIX:
        // This tells the library to render *inside* its container,
        // not as a full-screen fixed element.
        fullScreen: {
            enable: false 
        },
        // ---------------------------------
        
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#e50914" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 2, random: true, anim: { enable: false } },
            line_linked: { enable: true, distance: 150, color: "#b0b0b0", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 0.5, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false }, resize: true },
            modes: { grab: { distance: 140, line_opacity: 0.5 } }
        },
        retina_detect: true,
        background: { color: "transparent" }
    };

    // Config for Home (denser)
    const particlesHomeConfig = { ...particlesBaseConfig };

    // Config for other Pages (sparser)
    const particlesPageConfig = JSON.parse(JSON.stringify(particlesBaseConfig)); // Deep clone
    particlesPageConfig.particles.number.value = 40;
    particlesPageConfig.interactivity.modes.grab.distance = 100;
    particlesPageConfig.particles.line_linked.opacity = 0.1;
    particlesPageConfig.particles.opacity.value = 0.2;


    // Initialize particles
    const particlesHome = document.getElementById('particles-home');
    const particlesPages = document.querySelectorAll('#particles-page'); // Can be multiple

    if (particlesHome) {
        tsParticles.load('particles-home', particlesHomeConfig);
    }
    
    if (particlesPages.length > 0) {
        particlesPages.forEach((el, i) => {
            const uniqueId = `particles-page-${i}`;
            el.setAttribute('id', uniqueId);
            tsParticles.load(uniqueId, particlesPageConfig);
        });
    }

    // --- 8. NAV LINK TEXT SCRAMBLE ---
    const scrambleElements = document.querySelectorAll('.nav-link');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    scrambleElements.forEach(el => {
        let interval = null;
        const originalText = el.dataset.text;
        el.addEventListener('mouseenter', () => {
            let iteration = 0;
            clearInterval(interval);
            interval = setInterval(() => {
                el.innerText = el.innerText.split("")
                    .map((letter, index) => {
                        if(index < iteration) { return originalText[index]; }
                        return letters[Math.floor(Math.random() * letters.length)]
                    })
                    .join("");
                if(iteration >= originalText.length){ clearInterval(interval); }
                iteration += 1 / 3;
            }, 30);
        });
        el.addEventListener('mouseleave', () => {
            clearInterval(interval);
            el.innerText = originalText;
        });
    });

    // --- 9. MAGNETIC BUTTONS ---
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    const magneticStrength = 0.4;
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * magneticStrength}px, ${y * magneticStrength}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

});
/*
 VYORAA — main.js
 Portfolio Video Controller
*/

/* REPLACE THE BOTTOM SECTION OF YOUR main.js WITH THIS
   Portfolio Video Modal Logic
*/

document.addEventListener("DOMContentLoaded", () => {
    
    // Select elements
    const modal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalPlayer");
    const closeBtn = document.getElementById("closeModal");
    const triggers = document.querySelectorAll(".video-trigger");

    // Debugging check
    if(!modal || !modalVideo || !closeBtn) {
        console.error("VYORAA ERROR: Modal elements not found. Check HTML IDs.");
        return;
    }

    // Open Modal
    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const videoSrc = trigger.getAttribute("data-video");
            
            if (videoSrc) {
                console.log("Opening video:", videoSrc);
                modal.classList.add("active"); // Show modal via CSS class
                modalVideo.src = videoSrc;
                modalVideo.play();
            } else {
                console.error("No video source found on this item.");
            }
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove("active");
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.src = ""; // Clear source to stop buffering
    };

    // Close Events
    closeBtn.addEventListener("click", closeModal);
    
    // Close if clicking outside video
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});