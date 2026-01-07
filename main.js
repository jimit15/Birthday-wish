// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
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
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
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
                const closingTime = 21; // 9 PM
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
                const closingTime = 19; // 7 PM
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
    
    statusElement.textContent = message;
    statusElement.className = `status ${statusClass}`;
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

// Display Frames
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
    
    filteredFrames.forEach(frame => {
        const frameCard = document.createElement('div');
        frameCard.className = 'frame-card';
        frameCard.setAttribute('data-category', frame.category);
        
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
    });
}

// Filter Buttons for Frames
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Display filtered frames
            displayFrames(filterValue);
        });
    });
}

// Initialize frames display
displayFrames();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
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

// Add active class to nav links based on scroll position
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

window.addEventListener('scroll', highlightNavOnScroll);

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .frame-card, .testimonial-card, .category-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card, .frame-card, .testimonial-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initial animation call
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Phone touch optimization
document.addEventListener('touchstart', function() {}, {passive: true});

// Make all buttons and links have proper cursor on touch devices
document.querySelectorAll('button, a').forEach(el => {
    el.style.cursor = 'pointer';
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateStoreStatus();
    displayFrames();
    highlightNavOnScroll();
    animateOnScroll();
});

// Book Eye Test Button Action
document.querySelectorAll('.btn-primary[href="#contact"]').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.getAttribute('href') === '#contact') {
            e.preventDefault();
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Show a booking message after delay
                setTimeout(() => {
                    const bookingMessage = `To book an eye test:\n\n📞 Call: 70693 43403\n📱 WhatsApp: +91 70693 43403\n\n📍 Visit: Suraj Chashma Ghar, Nikol\n\n⏰ Timing:\nMon-Sat: 9 AM - 9 PM\nSun: 9 AM - 7 PM\nLunch Break: 1 PM - 2 PM`;
                    alert(bookingMessage);
                }, 800);
            }
        }
    });
});






