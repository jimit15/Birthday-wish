// Mobile Menu Toggle with Animation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        
        // Add animation class to mobile menu
        if (mobileNav.classList.contains('active')) {
            mobileNav.style.animation = 'slideInBottom 0.3s ease-out forwards';
            
            // Animate menu items with delay
            const menuItems = document.querySelectorAll('.mobile-nav li');
            menuItems.forEach((item, index) => {
                item.style.animation = `slideInLeft 0.3s ease-out ${index * 0.1}s forwards`;
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
            });
        } else {
            mobileNav.style.animation = 'fadeOut 0.3s ease-out forwards';
        }
    });
}

// Close mobile menu when clicking a link with animation
const mobileLinks = document.querySelectorAll('.mobile-nav a');
mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Add click animation to link
        link.style.animation = 'pulse 0.3s ease-out';
        
        setTimeout(() => {
            link.style.animation = '';
            mobileNav.classList.remove('active');
            mobileNav.style.animation = 'fadeOut 0.3s ease-out forwards';
        }, 300);
    });
});

// Store Status Update with Animation
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
    
    // Check if it's lunch break (1 PM to 2 PM daily)
    const isLunchBreak = currentTime >= 13 && currentTime < 14;
    
    if (isLunchBreak) {
        message = '⏸️ Lunch Break (1:00 PM - 2:00 PM)';
        statusClass = 'lunch';
    } else {
        // Regular hours check
        if (day >= 1 && day <= 6) { // Monday to Saturday
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
        } else { // Sunday
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
    
    // Add animation when status changes
    if (statusElement.textContent !== message) {
        statusElement.style.animation = 'shake 0.5s ease-out';
        setTimeout(() => {
            statusElement.style.animation = '';
        }, 500);
    }
    
    statusElement.textContent = message;
    statusElement.className = `status ${statusClass} animate-glow`;
}

// Initialize store status
updateStoreStatus();
// Update every minute
setInterval(updateStoreStatus, 60000);

// Frame Data
const frames = [
    // Men's Frames
    { 
        id: 1, 
        name: "Classic Rectangle Frame", 
        category: "men", 
        type: ["Plastic"], 
        price: "₹1,499", 
        image: "https://images.unsplash.com/photo-1583292650899-5c7c36f921c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 2, 
        name: "Modern Square Frame", 
        category: "men", 
        type: ["Metal"], 
        price: "₹1,899", 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 3, 
        name: "Executive Rimless", 
        category: "men", 
        type: ["Rimless"], 
        price: "₹2,299", 
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    
    // Women's Frames
    { 
        id: 4, 
        name: "Cat-Eye Designer Frame", 
        category: "women", 
        type: ["Plastic", "Designer"], 
        price: "₹1,799", 
        image: "https://images.unsplash.com/photo-1556306535-38febf6783e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 5, 
        name: "Elegant Round Frame", 
        category: "women", 
        type: ["Metal"], 
        price: "₹2,199", 
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 6, 
        name: "Fashion Oval Frame", 
        category: "women", 
        type: ["Plastic"], 
        price: "₹1,699", 
        image: "https://images.unsplash.com/photo-1572248364230-7f412885f2da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    
    // Kids Frames
    { 
        id: 7, 
        name: "Colorful Kids Frame", 
        category: "kids", 
        type: ["Plastic", "Flexible"], 
        price: "₹999", 
        image: "https://images.unsplash.com/photo-1552880987-9c3d8d1b71e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 8, 
        name: "Disney Character Frame", 
        category: "kids", 
        type: ["Plastic"], 
        price: "₹1,299", 
        image: "https://images.unsplash.com/photo-1612810806695-30f7a8258391?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    
    // Sunglasses
    { 
        id: 9, 
        name: "UV Protection Aviator", 
        category: "sunglasses", 
        type: ["Metal", "UV Protection"], 
        price: "₹1,999", 
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 10, 
        name: "Wayfarer Sunglasses", 
        category: "sunglasses", 
        type: ["Plastic", "UV Protection"], 
        price: "₹1,599", 
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 11, 
        name: "Polarized Sports Goggles", 
        category: "sunglasses", 
        type: ["Plastic", "Sports"], 
        price: "₹2,499", 
        image: "https://images.unsplash.com/photo-1556306535-0d09aec3c8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    },
    { 
        id: 12, 
        name: "Designer Sunglasses", 
        category: "sunglasses", 
        type: ["Metal", "Designer"], 
        price: "₹2,999", 
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    }
];

// Display Frames with Animation
function displayFrames(filter = 'all') {
    const framesGrid = document.querySelector('.frames-grid');
    if (!framesGrid) return;
    
    framesGrid.style.opacity = '0';
    framesGrid.style.transform = 'scale(0.9)';
    framesGrid.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    setTimeout(() => {
        framesGrid.innerHTML = '';
        
        const filteredFrames = filter === 'all' 
            ? frames 
            : frames.filter(frame => frame.category === filter);
        
        if (filteredFrames.length === 0) {
            framesGrid.innerHTML = `
                <div class="no-frames animate-scale">
                    <i class="fas fa-glasses"></i>
                    <p>No frames found in this category. Visit our store to see complete collection.</p>
                    <a href="#contact" class="btn-primary">Visit Store</a>
                </div>
            `;
        } else {
            filteredFrames.forEach((frame, index) => {
                const frameCard = document.createElement('div');
                frameCard.className = 'frame-card';
                frameCard.setAttribute('data-category', frame.category);
                frameCard.style.animationDelay = `${index * 0.1}s`;
                frameCard.style.opacity = '0';
                frameCard.style.transform = 'translateY(20px)';
                
                // Get category display name
                let categoryDisplay = '';
                switch(frame.category) {
                    case 'men': categoryDisplay = 'Men'; break;
                    case 'women': categoryDisplay = 'Women'; break;
                    case 'kids': categoryDisplay = 'Kids'; break;
                    case 'sunglasses': categoryDisplay = 'Sunglasses'; break;
                }
                
                frameCard.innerHTML = `
                    <div class="frame-image">
                        <img src="${frame.image}" alt="${frame.name}" loading="lazy">
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
                
                framesGrid.appendChild(frameCard);
                
                // Animate each frame card with delay
                setTimeout(() => {
                    frameCard.style.opacity = '1';
                    frameCard.style.transform = 'translateY(0)';
                    frameCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                }, index * 100);
            });
        }
        
        // Animate frames grid container
        setTimeout(() => {
            framesGrid.style.opacity = '1';
            framesGrid.style.transform = 'scale(1)';
        }, 300);
        
    }, 200);
}

// Filter Buttons for Frames with Animation
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.animation = 'pulse 0.3s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Display filtered frames
            displayFrames(filterValue);
        });
        
        // Add hover animation
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px)';
                this.style.transition = 'transform 0.2s ease';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Initialize frames display
displayFrames();

// Smooth Scrolling for Navigation Links with Animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.animation = 'pulse 0.3s ease-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Add pulse animation to target section
            targetElement.style.animation = 'pulse 0.5s ease-out';
            setTimeout(() => {
                targetElement.style.animation = '';
            }, 500);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileNav.style.animation = 'fadeOut 0.3s ease-out forwards';
            }
        }
    });
});

// Add active class to nav links based on scroll position with animation
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
        const href = link.getAttribute('href');
        const isActive = href === `#${currentSection}` || (href === '#home' && currentSection === '');
        
        if (isActive && !link.classList.contains('active')) {
            // Add animation when link becomes active
            link.classList.remove('active');
            setTimeout(() => {
                link.classList.add('active');
            }, 10);
        } else if (!isActive && link.classList.contains('active')) {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Animate elements on scroll with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes based on element type
            if (entry.target.classList.contains('service-card')) {
                entry.target.classList.add('animate-scale');
            } else if (entry.target.classList.contains('frame-card')) {
                entry.target.classList.add('animate-slide-bottom');
            } else if (entry.target.classList.contains('testimonial-card')) {
                entry.target.classList.add('animate-slide-left');
            } else if (entry.target.classList.contains('category-card')) {
                entry.target.classList.add('animate-scale');
            } else if (entry.target.classList.contains('feature')) {
                entry.target.classList.add('animate-slide-left');
            }
        }
    });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe all elements that should animate on scroll
    document.querySelectorAll('.service-card, .frame-card, .testimonial-card, .category-card, .feature').forEach(el => {
        observer.observe(el);
    });
    
    // Initial animation setup
    highlightNavOnScroll();
    
    // Add animation to page load
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// Phone touch optimization with animations
document.addEventListener('touchstart', function() {}, {passive: true});

// Make all buttons and links have proper cursor on touch devices
document.querySelectorAll('button, a').forEach(el => {
    el.style.cursor = 'pointer';
    
    // Add hover effect animation
    el.addEventListener('mouseenter', function() {
        if (this.classList.contains('btn-primary') || this.classList.contains('btn-secondary')) {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        }
    });
    
    el.addEventListener('mouseleave', function() {
        if (this.classList.contains('btn-primary') || this.classList.contains('btn-secondary')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Book Eye Test Button Action with Enhanced Animation
document.querySelectorAll('.btn-primary[href="#contact"]').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.getAttribute('href') === '#contact') {
            e.preventDefault();
            
            // Add special animation to button
            button.style.animation = 'pulse 0.5s ease-out';
            setTimeout(() => {
                button.style.animation = '';
            }, 500);
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                // Add highlight animation to contact section
                contactSection.style.animation = 'glow 2s ease-out';
                setTimeout(() => {
                    contactSection.style.animation = '';
                }, 2000);
                
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Show a booking message after delay with animation
                setTimeout(() => {
                    const bookingMessage = `To book an eye test:\n\n📞 Call: 70693 43403\n📱 WhatsApp: +91 70693 43403\n\n📍 Visit: Suraj Chashma Ghar, Nikol\n\n⏰ Timing:\nMon-Sat: 9 AM - 9 PM\nSun: 9 AM - 7 PM\nLunch Break: 1 PM - 2 PM`;
                    
                    // Create animated modal instead of alert
                    const modal = document.createElement('div');
                    modal.className = 'booking-modal animate-scale';
                    modal.innerHTML = `
                        <div class="modal-content">
                            <h3>📞 Book Eye Test</h3>
                            <p>${bookingMessage.replace(/\n/g, '<br>')}</p>
                            <button class="btn-primary close-modal">OK</button>
                        </div>
                    `;
                    modal.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 2000;
                    `;
                    modal.querySelector('.modal-content').style.cssText = `
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        max-width: 400px;
                        text-align: center;
                        animation: scaleIn 0.3s ease-out;
                    `;
                    
                    document.body.appendChild(modal);
                    
                    // Close modal
                    modal.querySelector('.close-modal').addEventListener('click', () => {
                        modal.style.animation = 'fadeOut 0.3s ease-out forwards';
                        setTimeout(() => {
                            document.body.removeChild(modal);
                        }, 300);
                    });
                    
                    // Close on outside click
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            modal.style.animation = 'fadeOut 0.3s ease-out forwards';
                            setTimeout(() => {
                                document.body.removeChild(modal);
                            }, 300);
                        }
                    });
                }, 1000);
            }
        }
    });
});

// Add floating button animations
const floatButtons = document.querySelectorAll('.float-btn');
floatButtons.forEach((btn, index) => {
    btn.style.animationDelay = `${index * 0.1}s`;
});

// Add hover animation to all cards
document.querySelectorAll('.service-card, .frame-card, .testimonial-card, .category-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add animation to rating badge
const ratingBadge = document.querySelector('.rating-badge');
if (ratingBadge) {
    ratingBadge.addEventListener('mouseenter', () => {
        ratingBadge.style.animation = 'pulse 0.5s ease-out';
    });
    
    ratingBadge.addEventListener('animationend', () => {
        ratingBadge.style.animation = '';
    });
}

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.animation = 'scaleIn 0.3s ease-out';
    });
});

// Add keyboard navigation with animation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        mobileNav.style.animation = 'fadeOut 0.3s ease-out forwards';
    }
});

// Initialize everything with animation
window.addEventListener('load', () => {
    // Remove loading screen after page loads
    const loadingScreen = document.querySelector('.loading');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 500);
    }
    
    // Animate hero section on load
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.animation = 'fadeIn 1s ease-out';
    }
});







