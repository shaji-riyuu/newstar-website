// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navMenu) navMenu.classList.toggle('active');
    });
}

// Keyboard navigation for hamburger menu
if (hamburger) {
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active');
        }
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    if (link) {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations with staggered delays
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation with staggered delays
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const badges = document.querySelectorAll('.badge');
    
    // Service cards - staggered delay
    serviceCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.dataset.delay = index * 100; // 100ms stagger
        observer.observe(el);
    });
    
    // Testimonial cards - staggered delay
    testimonialCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.dataset.delay = index * 150; // 150ms stagger
        observer.observe(el);
    });
    
    // Badges - staggered delay
    badges.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.dataset.delay = index * 100; // 100ms stagger
        observer.observe(el);
    });
});

// Phone number click tracking (for analytics if needed)
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('Phone call initiated:', this.getAttribute('href'));
    });
});

// WhatsApp click tracking (for analytics if needed)
document.querySelectorAll('a[href^="https://wa.me"]').forEach(whatsappLink => {
    whatsappLink.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('WhatsApp message initiated:', this.getAttribute('href'));
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #1565C0 !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Prevent form submission if any forms are added later
document.addEventListener('submit', (e) => {
    if (e.target.tagName === 'FORM') {
        e.preventDefault();
        // Handle form submission here if needed
    }
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.href) return; // Skip if it's a link
        
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Lazy loading for images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        if (img) {
            imageObserver.observe(img);
        }
    });
}

// WhatsApp Popup Functionality
const whatsappTrigger = document.getElementById('whatsapp-trigger');
const whatsappPopup = document.getElementById('whatsapp-popup');
const whatsappClose = document.getElementById('whatsapp-close');
let popupAutoOpened = false;

// Toggle popup
function toggleWhatsAppPopup() {
    console.log('toggleWhatsAppPopup called, whatsappPopup:', whatsappPopup);
    if (whatsappPopup) {
        whatsappPopup.classList.toggle('active');
        console.log('Active class toggled, current classes:', whatsappPopup.className);
        
        // If popup is opened manually, don't auto-open later
        if (whatsappPopup.classList.contains('active')) {
            popupAutoOpened = true;
            console.log('Popup opened manually, setting popupAutoOpened to true');
        }
    } else {
        console.log('ERROR: whatsappPopup element not found!');
    }
}

// Close popup
function closeWhatsAppPopup() {
    if (whatsappPopup) {
        whatsappPopup.classList.remove('active');
    }
}

// WhatsApp trigger click handler
if (whatsappTrigger) {
    whatsappTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        toggleWhatsAppPopup();
    });
}

// Close button click handler
if (whatsappClose) {
    whatsappClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeWhatsAppPopup();
    });
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    if (whatsappPopup && whatsappTrigger && 
        whatsappPopup.classList.contains('active') && 
        !whatsappPopup.contains(e.target) && 
        !whatsappTrigger.contains(e.target)) {
        closeWhatsAppPopup();
    }
});

// Auto-open popup after 5 seconds if not manually opened
setTimeout(() => {
    if (!popupAutoOpened && whatsappPopup) {
        whatsappPopup.classList.add('active');
        popupAutoOpened = true;
        
        // Auto-close after 10 seconds if no interaction
        setTimeout(() => {
            if (whatsappPopup && whatsappPopup.classList.contains('active')) {
                closeWhatsAppPopup();
            }
        }, 10000);
    }
}, 5000);

// Keyboard navigation for popup
if (whatsappTrigger) {
    whatsappTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleWhatsAppPopup();
        }
    });
}

if (whatsappClose) {
    whatsappClose.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeWhatsAppPopup();
        }
    });
}

// Close popup with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && whatsappPopup && whatsappPopup.classList.contains('active')) {
        closeWhatsAppPopup();
    }
});

// Console welcome message
console.log('%c\u2728 New Star AC & Fridge Services', 'font-size: 20px; font-weight: bold; color: #1565C0;');
console.log('%cProfessional AC and Refrigerator Services in Vadodara', 'font-size: 14px; color: #666;');
console.log('%c\ud83d\udcde Call: +91 98249 34351 | \ud83d\udcac WhatsApp: +91 98249 34351', 'font-size: 12px; color: #666;');