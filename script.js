/* ============================================
   CYBER FIT - Premium Fitness Website Scripts
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // PRELOADER
    // ==========================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 2000);
    });
    
    // ==========================================
    // CUSTOM CURSOR
    // ==========================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    
    if (cursor && cursorFollower && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor animation
        function animateCursor() {
            // Cursor follows mouse directly
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.left = cursorX - 6 + 'px';
            cursor.style.top = cursorY - 6 + 'px';
            
            // Follower has more lag
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX - 20 + 'px';
            cursorFollower.style.top = followerY - 20 + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .program-card, .pricing-card, .trainer-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('hover');
            });
        });
    }
    
    // ==========================================
    // NAVIGATION
    // ==========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // ==========================================
    // HERO PARTICLES
    // ==========================================
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }
    
    // ==========================================
    // ANIMATED COUNTER
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(counter);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => counterObserver.observe(num));
    
    // ==========================================
    // SCROLL ANIMATIONS (AOS-like)
    // ==========================================
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => animationObserver.observe(el));
    
    // ==========================================
    // PRICING TOGGLE
    // ==========================================
    const pricingToggle = document.getElementById('pricing-toggle');
    const toggleLabels = document.querySelectorAll('.toggle-label');
    const priceAmounts = document.querySelectorAll('.pricing-price .amount');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            const isYearly = this.checked;
            
            toggleLabels.forEach(label => {
                label.classList.remove('active');
                if ((isYearly && label.dataset.period === 'yearly') || 
                    (!isYearly && label.dataset.period === 'monthly')) {
                    label.classList.add('active');
                }
            });
            
            priceAmounts.forEach(amount => {
                const monthly = amount.getAttribute('data-monthly');
                const yearly = amount.getAttribute('data-yearly');
                amount.textContent = isYearly ? yearly : monthly;
            });
        });
    }
    
    // ==========================================
    // TESTIMONIALS SLIDER
    // ==========================================
    const testimonialTrack = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sliderDotsContainer = document.getElementById('slider-dots');
    
    if (testimonialTrack && prevBtn && nextBtn) {
        const testimonials = testimonialTrack.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        let slidesPerView = 3;
        
        // Determine slides per view based on screen size
        function updateSlidesPerView() {
            if (window.innerWidth <= 768) {
                slidesPerView = 1;
            } else if (window.innerWidth <= 992) {
                slidesPerView = 2;
            } else {
                slidesPerView = 3;
            }
            updateSlider();
            createDots();
        }
        
        // Create dots
        function createDots() {
            sliderDotsContainer.innerHTML = '';
            const totalDots = Math.ceil(testimonials.length / slidesPerView);
            
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === currentSlide) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                sliderDotsContainer.appendChild(dot);
            }
        }
        
        // Update slider position
        function updateSlider() {
            const cardWidth = testimonials[0].offsetWidth + 30; // Including gap
            testimonialTrack.style.transform = `translateX(-\${currentSlide * cardWidth * slidesPerView}px)`;
            
            // Update dots
            const dots = sliderDotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            const maxSlide = Math.ceil(testimonials.length / slidesPerView) - 1;
            currentSlide = Math.max(0, Math.min(index, maxSlide));
            updateSlider();
        }
        
        // Next slide
        nextBtn.addEventListener('click', () => {
            const maxSlide = Math.ceil(testimonials.length / slidesPerView) - 1;
            currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
            updateSlider();
        });
        
        // Previous slide
        prevBtn.addEventListener('click', () => {
            const maxSlide = Math.ceil(testimonials.length / slidesPerView) - 1;
            currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
            updateSlider();
        });
        
        // Initialize
        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        
        // Auto-play
        let autoPlay = setInterval(() => {
            const maxSlide = Math.ceil(testimonials.length / slidesPerView) - 1;
            currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
            updateSlider();
        }, 5000);
        
        // Pause on hover
        testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoPlay));
        testimonialTrack.addEventListener('mouseleave', () => {
            autoPlay = setInterval(() => {
                const maxSlide = Math.ceil(testimonials.length / slidesPerView) - 1;
                currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
                updateSlider();
            }, 5000);
        });
    }
    
    // ==========================================
    // CONTACT FORM
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

             // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual endpoint)
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll be in touch soon.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ==========================================
    // NOTIFICATION SYSTEM
    // ==========================================
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' 
                        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
                        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
                    }
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
        `;
        
        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00f0ff, #7b2dff)' : 'linear-gradient(135deg, #ff4444, #ff0066)'};
            padding: 3px;
            border-radius: 12px;
            animation: slideIn 0.3s ease forwards;
            max-width: 400px;
        `;
        
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            background: #12121a;
            padding: 16px 20px;
            border-radius: 10px;
        `;
        
        const icon = notification.querySelector('.notification-icon');
        icon.style.cssText = `
            color: ${type === 'success' ? '#00f0ff' : '#ff4444'};
            flex-shrink: 0;
        `;
        
        const messageEl = notification.querySelector('.notification-message');
        messageEl.style.cssText = `
            color: #e0e0e8;
            font-size: 0.95rem;
            flex: 1;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #8a8a9a;
            cursor: pointer;
            padding: 0;
            flex-shrink: 0;
            transition: color 0.2s ease;
        `;
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Close button functionality
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // PARALLAX EFFECT ON HERO
    // ==========================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = heroSection.querySelector('.hero-content');
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }
    
    // ==========================================
    // TILT EFFECT ON CARDS
    // ==========================================
    const tiltCards = document.querySelectorAll('.program-card, .pricing-card, .trainer-card');
    
    if (window.innerWidth > 992) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
    
    // ==========================================
    // MAGNETIC BUTTONS
    // ==========================================
    const magneticButtons = document.querySelectorAll('.btn-primary, .nav-cta');
    
    if (window.innerWidth > 992) {
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // ==========================================
    // LAZY LOADING IMAGES
    // ==========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // ==========================================
    // VIDEO MODAL (for "Watch Video" button)
    // ==========================================
    const videoBtn = document.querySelector('.btn-secondary');
    
    if (videoBtn) {
        videoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-overlay"></div>
                <div class="video-modal-content">
                    <button class="video-modal-close">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                    <div class="video-placeholder">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        <p>VIDEO PLACEHOLDER</p>
                        <span>Replace with your video embed code</span>
                    </div>
                </div>
            `;
            
            // Styles
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 100000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            `;
            
            const overlay = modal.querySelector('.video-modal-overlay');
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
            `;
            
            const content = modal.querySelector('.video-modal-content');
            content.style.cssText = `
                position: relative;
                width: 90%;
                max-width: 900px;
                aspect-ratio: 16/9;
                background: #12121a;
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.1);
            `;
            
            const closeBtn = modal.querySelector('.video-modal-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -50px;
                right: 0;
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                z-index: 10;
            `;
            
            const placeholder = modal.querySelector('.video-placeholder');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #4a4a5a;
                gap: 15px;
            `;
            
            placeholder.querySelector('p').style.cssText = `
                font-family: 'Orbitron', sans-serif;
                font-size: 1.2rem;
                letter-spacing: 0.1em;
            `;
            
            placeholder.querySelector('span').style.cssText = `
                font-size: 0.9rem;
                opacity: 0.7;
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Close modal
            const closeModal = () => {
                modal.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = '';
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', closeModal);
            
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    }
    
    // ==========================================
    // CONSOLE WELCOME MESSAGE
    // ==========================================
    console.log('%c CYBER FIT ', 'background: linear-gradient(135deg, #00f0ff, #7b2dff); color: #0a0a0f; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Premium Online Fitness Training ', 'color: #00f0ff; font-size: 14px;');
    console.log('%c Built with passion 💪 ', 'color: #8a8a9a; font-size: 12px;');
    
});

// ==========================================
// RANDOM WINDOW LIGHTS
// ==========================================
function randomWindowLights() {
    const skylineSvg = document.querySelector('.hero-skyline svg');
    if (!skylineSvg) return;
    
    // Create random lit windows
    const buildings = [
        { x: 105, y: 125, w: 45, h: 170 },
        { x: 355, y: 105, w: 50, h: 190 },
        { x: 625, y: 65, w: 55, h: 230 },
        { x: 695, y: 85, w: 45, h: 210 },
        { x: 810, y: 95, w: 30, h: 200 },
        { x: 855, y: 95, w: 30, h: 200 },
        { x: 1025, y: 105, w: 25, h: 190 },
        { x: 1145, y: 125, w: 40, h: 170 },
        { x: 1310, y: 115, w: 40, h: 180 },
        { x: 1485, y: 135, w: 25, h: 160 },
    ];
    
    // Add random bright windows
    buildings.forEach(building => {
        const numLitWindows = Math.floor(Math.random() * 8) + 3;
        
        for (let i = 0; i < numLitWindows; i++) {
            const windowEl = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            
            // Random position within building
            const winX = building.x + Math.random() * (building.w - 6);
            const winY = building.y + Math.random() * (building.h - 10);
            
            windowEl.setAttribute('x', winX);
            windowEl.setAttribute('y', winY);
            windowEl.setAttribute('width', '5');
            windowEl.setAttribute('height', '8');
            windowEl.setAttribute('fill', Math.random() > 0.7 ? '#00ffff' : '#ffde59');
            windowEl.setAttribute('opacity', Math.random() * 0.5 + 0.5);
            windowEl.classList.add('lit-window');
            
            // Random flicker animation
            windowEl.style.animation = `windowOn ${Math.random() * 5 + 3}s infinite ease-in-out`;
            windowEl.style.animationDelay = `${Math.random() * 5}s`;
            
            skylineSvg.querySelector('g:last-of-type').appendChild(windowEl);
        }
    });
}

// Run after page loads
document.addEventListener('DOMContentLoaded', randomWindowLights);

// Occasionally toggle some windows on/off
setInterval(() => {
    const litWindows = document.querySelectorAll('.lit-window');
    if (litWindows.length > 0) {
        const randomWindow = litWindows[Math.floor(Math.random() * litWindows.length)];
        const currentOpacity = parseFloat(randomWindow.getAttribute('opacity'));
        randomWindow.setAttribute('opacity', currentOpacity > 0.5 ? '0.2' : '0.8');
    }
}, 2000);