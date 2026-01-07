// Wait for page to load
window.addEventListener('load', function() {
    // Hide loading animation
    const loading = document.querySelector('.loading-animation');
    if (loading) {
        loading.classList.add('loaded');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
    
    // Initialize animations
    initAnimations();
});

// Initialize GSAP animations
function initAnimations() {
    // Initialize GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate hero section
        gsap.from('.hero-text h2', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: "power4.out"
        });
        
        gsap.from('.hero-text p', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            delay: 0.5,
            ease: "power2.out"
        });
        
        gsap.from('.hero-btns', {
            duration: 1,
            y: 30,
            opacity: 0,
            delay: 1,
            ease: "back.out(1.7)"
        });
        
        // Animate service cards on scroll
        gsap.utils.toArray('.service-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
        
        // Animate frame cards
        gsap.utils.toArray('.frame-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
            });
        });
        
        // Animate testimonial cards
        gsap.utils.toArray('.testimonial-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                x: -100,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        });
        
        // Animate contact section
        gsap.from('.contact-card', {
            scrollTrigger: {
                trigger: '.contact',
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
        });
        
        // Parallax effect for hero background
        gsap.to('.hero-background', {
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            y: 100,
            ease: "none"
        });
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        // Animate menu items
        const menuItems = document.querySelectorAll('.mobile-nav a');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in-text');
        });
    });
}

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-nav a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// Store Status Update
function updateStoreStatus() {
    const statusElement = document.getElementById('storeStatus');
    if (!statusElement) return;
    
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hour + minutes / 60;
    
    let isOpen = false;
    let message = '';
    let statusClass = '';
    
    const isLunchBreak = currentTime >= 13 && currentTime < 14;
    
    if (isLunchBreak) {
        message = '⏸️ Lunch Break (1:00 PM - 2:00 PM)';
        statusClass = 'lunch';
    } else {
        if (day >= 1 && day <= 6) {
            if (currentTime >= 9 && currentTime < 21) {
                isOpen = true;
                const closingTime = 21;
                const timeLeft = closingTime - currentTime;
                const hoursLeft = Math.floor(timeLeft);
                const minutesLeft = Math.round((timeLeft - hoursLeft) * 60);
                
                message = '✅ Open Now';
                if (hoursLeft < 2) {
                    message += ` (Closes in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`;
                    if (minutesLeft > 0) {
                        message += ` ${minutesLeft} min`;
                    }
                    message += ')';
                } else {
                    message += ' - Closes 9:00 PM';
                }
                statusClass = 'open';
            } else {
                message = '❌ Closed Now';
                if (currentTime < 9) {
                    message += ' - Opens at 9:00 AM';
                } else {
                    message += ' - Opens Tomorrow at 9:00 AM';
                }
                statusClass = 'closed';
            }
        } else {
            if (currentTime >= 9 && currentTime < 19) {
                isOpen = true;
                const closingTime = 19;
                const timeLeft = closingTime - currentTime;
                const hoursLeft = Math.floor(timeLeft);
                const minutesLeft = Math.round((timeLeft - hoursLeft) * 60);
                
                message = '✅ Open Now';
                if (hoursLeft < 2) {
                    message += ` (Closes in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`;
                    if (minutesLeft > 0) {
                        message += ` ${minutesLeft} min`;
                    }
                    message += ')';
                } else {
                    message += ' - Closes 7:00 PM';
                }
                statusClass = 'open';
            } else {
                message = '❌ Closed Now';
                if (currentTime < 9) {
                    message += ' - Opens at 9:00 AM';
                } else {
                    message += ' - Opens Tomorrow at 9:00 AM';
                }
                statusClass = 'closed';
            }
        }
    }
    
    // Add animation to status change
    statusElement.style.opacity = '0';
    statusElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        statusElement.textContent = message;
        statusElement.className = `status ${statusClass}`;
        
        // Animate in
        statusElement.style.transition = 'all 0.3s ease';
        statusElement.style.opacity = '1';
        statusElement.style.transform = 'translateY(0)';
    }, 200);
}

// Initialize store status
updateStoreStatus();
setInterval(updateStoreStatus, 60000);

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter-animation');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const element = counter.querySelector('.stat-number');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        // Start counter when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counter.classList.add('animated');
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Frame Data
const frames = [
    { id: 1, name: "Classic Rectangle Frame", category: "men", type: ["Plastic"], price: "₹1,499", image: "https://images.unsplash.com/photo-1583292650899-5c7c36f921c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Modern Square Frame", category: "men", type: ["Metal"], price: "₹1,899", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Executive Rimless", category: "men", type: ["Rimless"], price: "₹2,299", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Cat-Eye Designer Frame", category: "women", type: ["Plastic", "Designer"], price: "₹1,799", image: "https://images.unsplash.com/photo-1556306535-38febf6783e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Elegant Round Frame", category: "women", type: ["Metal"], price: "₹2,199", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Fashion Oval Frame", category: "women", type: ["Plastic"], price: "₹1,699", image: "https://images.unsplash.com/photo-1572248364230-7f412885f2da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 7, name: "Colorful Kids Frame", category: "kids", type: ["Plastic", "Flexible"], price: "₹999", image: "https://images.unsplash.com/photo-1552880987-9c3d8d1b71e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 8, name: "Disney Character Frame", category: "kids", type: ["Plastic"], price: "₹1,299", image: "https://images.unsplash.com/photo-1612810806695-30f7a8258391?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 9, name: "UV Protection Aviator", category: "sunglasses", type: ["Metal", "UV Protection"], price: "₹1,999", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 10, name: "Wayfarer Sunglasses", category: "sunglasses", type: ["Plastic", "UV Protection"], price: "₹1,599", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 11, name: "Polarized Sports Goggles", category: "sunglasses", type: ["Plastic", "Sports"], price: "₹2,499", image: "https://images.unsplash.com/photo-1556306535-0d09aec3c8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 12, name: "Designer Sunglasses", category: "sunglasses", type: ["Metal", "Designer"], price: "₹2,999", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
];

// Display Frames with Animation
function displayFrames(filter = 'all') {
    const framesGrid = document.querySelector('.frames-grid');
    if (!framesGrid) return;
    
    framesGrid.innerHTML = '';
    
    const filteredFrames = filter === 'all' 
        ? frames 
        : frames.filter(frame => frame.category === filter);
    
    if (filteredFrames.length === 0) {
        framesGrid.innerHTML = `
            <div class="no-frames">
                <i class="fas fa-glasses"></i>
                <p>No frames found in this category. Visit our store to see complete collection.</p>
                <a href="#contact" class="btn-primary">Visit Store</a>
            </div>
        `;
        return;
    }
    
    filteredFrames.forEach((frame, index) => {
        const frameCard = document.createElement('div');
        frameCard.className = 'frame-card';
        frameCard.setAttribute('data-category', frame.category);
        frameCard.style.animationDelay = `${index * 0.1}s`;
        
        let categoryDisplay = '';
        switch(frame.category) {
            case 'men': categoryDisplay = 'Men'; break;
            case 'women': categoryDisplay = 'Women'; break;
            case 'kids': categoryDisplay = 'Kids'; break;
            case 'sunglasses': categoryDisplay = 'Sunglasses'; break;
        }
        
        frameCard.innerHTML = `
            <div class="frame-image">
                <img src="${frame.image}" alt="${frame.name}" loading="lazy" class="hover-zoom">
            </div>
            <div class="frame-info">
                <div class="frame-category">${categoryDisplay}</div>
                <h3>${frame.name}</h3>
                <div class="frame-type">
                    ${frame.type.map(t => `<span class="type-tag">${t}</span>`).join('')}
                </div>
                <div class="frame-price">${frame.price}</div>
            </div>
        `;
        
        // Add hover animation
        frameCard.addEventListener('mouseenter', () => {
            frameCard.style.transform = 'translateY(-10px)';
        });
        
        frameCard.addEventListener('mouseleave', () => {
            frameCard.style.transform = 'translateY(0)';
        });
        
        framesGrid.appendChild(frameCard);
    });
}

// Filter Buttons with Animation
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            
            // Add active class to clicked button with animation
            button.classList.add('active');
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 300);
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Animate out old frames
            const framesGrid = document.querySelector('.frames-grid');
            if (framesGrid) {
                framesGrid.style.opacity = '0';
                framesGrid.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    displayFrames(filterValue);
                    
                    // Animate in new frames
                    setTimeout(() => {
                        framesGrid.style.transition = 'all 0.5s ease';
                        framesGrid.style.opacity = '1';
                        framesGrid.style.transform = 'translateY(0)';
                    }, 50);
                }, 300);
            }
        });
    });
}

// Testimonial Slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(100px)';
        card.style.display = 'none';
        
        if (i === index) {
            setTimeout(() => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, 50);
            }, 300);
        }
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Back to Top Button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Animate scroll
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        }
    });
});

// Add active class to nav links
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}` || (href === '#home' && currentSection === '')) {
            link.classList.add('active');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateStoreStatus();
    displayFrames();
    animateCounters();
    highlightNavOnScroll();
    initScrollAnimations();
    showTestimonial(0);
    
    // Initialize animations after a short delay
    setTimeout(initAnimations, 500);
});

window.addEventListener('scroll', highlightNavOnScroll);

// Book Eye Test Button Animation
document.querySelectorAll('.btn-primary[href="#contact"]').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.getAttribute('href') === '#contact') {
            e.preventDefault();
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Show animated booking message
                setTimeout(() => {
                    const bookingMessage = `To book an eye test:\n\n📞 Call: 70693 43403\n📱 WhatsApp: +91 70693 43403\n\n📍 Visit: Suraj Chashma Ghar, Nikol\n\n⏰ Timing:\nMon-Sat: 9 AM - 9 PM\nSun: 9 AM - 7 PM\nLunch Break: 1 PM - 2 PM`;
                    alert(bookingMessage);
                }, 800);
            }
        }
    });
});

// Add hover effect to all buttons
document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});




