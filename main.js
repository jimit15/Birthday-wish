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

// Store Status and Opening Hours
function updateStoreStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hour + minutes / 60;
    
    const statusElement = document.getElementById('storeStatus');
    let isOpen = false;
    let message = '';
    let statusClass = '';
    
    // Check if it's lunch break (1 PM to 2 PM daily)
    const isLunchBreak = currentTime >= 13 && currentTime < 14;
    
    if (isLunchBreak) {
        message = '⏸️ Lunch Break (1:00 PM - 2:00 PM)';
        statusClass = 'lunch-break';
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
    
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `status ${statusClass}`;
    }
    
    // Update hero section status
    const heroStatusElement = document.querySelector('.hero-info .info-item:nth-child(2) p');
    if (heroStatusElement) {
        if (isLunchBreak) {
            heroStatusElement.innerHTML = `Open Today • <span style="color:#ff9800">Lunch Break (1-2 PM)</span>`;
        } else if (isOpen) {
            heroStatusElement.innerHTML = `Open Today • <span style="color:#4CAF50">Open Now</span>`;
        } else {
            heroStatusElement.innerHTML = `Open Today • <span style="color:#f44336">Closed Now</span>`;
        }
    }
}

// Initialize store status
updateStoreStatus();
// Update every minute
setInterval(updateStoreStatus, 60000);

// Frame Data with all categories and subtypes
const frames = [
    // Men's Frames
    { id: 1, name: "Classic Rectangle", category: "men", subtype: "plastic", price: "₹1,499", image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Modern Square", category: "men", subtype: "metal", price: "₹1,699", image: "https://images.unsplash.com/photo-1583292650899-5c7c36f921c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Slim Metal Frame", category: "men", subtype: "metal", price: "₹2,199", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Rimless Executive", category: "men", subtype: "rimeless", price: "₹2,499", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    
    // Women's Frames
    { id: 5, name: "Trendy Cat-Eye", category: "women", subtype: "plastic", price: "₹1,899", image: "https://images.unsplash.com/photo-1556306535-38febf6783e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Elegant Round", category: "women", subtype: "metal", price: "₹2,299", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 7, name: "Designer Oval", category: "women", subtype: "plastic", price: "₹1,999", image: "https://images.unsplash.com/photo-1572248364230-7f412885f2da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 8, name: "Rimless Fashion", category: "women", subtype: "rimeless", price: "₹2,799", image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    
    // Kids Frames
    { id: 9, name: "Colorful Plastic", category: "kids", subtype: "plastic", price: "₹999", image: "https://images.unsplash.com/photo-1552880987-9c3d8d1b71e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 10, name: "Flexible Metal", category: "kids", subtype: "metal", price: "₹1,199", image: "https://images.unsplash.com/photo-1612810806695-30f7a8258391?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 11, name: "Disney Character", category: "kids", subtype: "plastic", price: "₹1,499", image: "https://images.unsplash.com/photo-1559570278-eb8d71d06403?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 12, name: "Sports Flexible", category: "kids", subtype: "plastic", price: "₹1,299", image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    
    // Sunglasses
    { id: 13, name: "Aviator Sunglasses", category: "sunglasses", subtype: "metal", price: "₹2,199", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 14, name: "Wayfarer Classic", category: "sunglasses", subtype: "plastic", price: "₹1,899", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 15, name: "Polarized Sports", category: "sunglasses", subtype: "plastic", price: "₹2,499", image: "https://images.unsplash.com/photo-1556306535-0d09aec3c8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { id: 16, name: "Designer Fashion", category: "sunglasses", subtype: "metal", price: "₹2,999", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
];

// Display Frames
function displayFrames(filter = 'all') {
    const framesGrid = document.querySelector('.frames-grid');
    if (!framesGrid) return;
    
    framesGrid.innerHTML = '';
    
    const filteredFrames = filter === 'all' 
        ? frames 
        : frames.filter(frame => {
            if (['men', 'women', 'kids', 'sunglasses'].includes(filter)) {
                return frame.category === filter;
            } else if (['plastic', 'metal', 'rimeless'].includes(filter)) {
                return frame.subtype === filter;
            }
            return false;
        });
    
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
        frameCard.setAttribute('data-subtype', frame.subtype);
        
        // Get category display name
        let categoryDisplay = '';
        switch(frame.category) {
            case 'men': categoryDisplay = 'Men'; break;
            case 'women': categoryDisplay = 'Women'; break;
            case 'kids': categoryDisplay = 'Kids'; break;
            case 'sunglasses': categoryDisplay = 'Sunglasses'; break;
        }
        
        // Get subtype display name
        let subtypeDisplay = '';
        switch(frame.subtype) {
            case 'plastic': subtypeDisplay = 'Plastic'; break;
            case 'metal': subtypeDisplay = 'Metal'; break;
            case 'rimeless': subtypeDisplay = 'Rimless'; break;
        }
        
        frameCard.innerHTML = `
            <div class="frame-image">
                <img src="${frame.image}" alt="${frame.name}" loading="lazy">
            </div>
            <div class="frame-info">
                <div class="frame-category">${categoryDisplay}</div>
                <h3>${frame.name}</h3>
                <div class="frame-type">
                    <span class="type-tag">${subtypeDisplay}</span>
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

// Star Rating System for Feedback
const stars = document.querySelectorAll('.star-rating .star');
const selectedRatingElement = document.getElementById('selected-rating');
let selectedRating = 0;

if (stars.length > 0) {
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            selectedRating = value;
            
            // Update display
            stars.forEach(s => s.classList.remove('active'));
            for (let i = 0; i < value; i++) {
                stars[i].classList.add('active');
            }
            
            if (selectedRatingElement) {
                selectedRatingElement.textContent = value;
            }
        });
        
        // Hover effect
        star.addEventListener('mouseover', () => {
            const value = parseInt(star.getAttribute('data-value'));
            stars.forEach((s, index) => {
                if (index < value) {
                    s.style.color = '#ffc107';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
        
        star.addEventListener('mouseout', () => {
            stars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.style.color = '#ffc107';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
    });
}

// Feedback Form Submission
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        if (selectedRating === 0) {
            alert('Please select a rating by clicking on the stars');
            return;
        }
        
        if (!name || !phone) {
            alert('Please fill in your name and phone number');
            return;
        }
        
        // Create feedback message
        const feedbackMessage = `New Feedback Received:\n\nName: ${name}\nPhone: ${phone}\nRating: ${selectedRating}/5\nFeedback: ${message || 'No additional feedback'}`;
        
        // In a real application, you would send this to a server
        // For demo, we'll show a success message
        alert(`Thank you for your feedback, ${name}! Your ${selectedRating}-star rating has been recorded. We appreciate your time.`);
        
        // Reset form
        feedbackForm.reset();
        stars.forEach(s => s.classList.remove('active'));
        selectedRating = 0;
        if (selectedRatingElement) {
            selectedRatingElement.textContent = '0';
        }
        
        // Log feedback (in real app, send to server)
        console.log(feedbackMessage);
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

// Prevent zoom on double-tap (but allow pinch zoom)
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateStoreStatus();
    displayFrames();
    highlightNavOnScroll();
    animateOnScroll();
});
// ... Your existing code ...

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateStoreStatus();
    displayFrames();
    highlightNavOnScroll();
    animateOnScroll();
});

// ===== ADD LOCATION FUNCTIONS HERE =====
// ... Paste all location functions here ...

// Then ADD this to call the location function:
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization
    updateStoreStatus();
    displayFrames();
    highlightNavOnScroll();
    animateOnScroll();
    
    // ADD THIS LINE to call location function
    getUserLocation();
    
    // Update location button (if you have one)
    const updateLocationBtn = document.getElementById('updateLocation');
    if (updateLocationBtn) {
        updateLocationBtn.addEventListener('click', getUserLocation);
    }
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
                    const bookingMessage = `To book an eye test:\n\n📞 Call: 070693 43403\n📱 WhatsApp: +91 70693 43403\n\n📍 Visit: 27, Murtidham Park, Nikol\n\n⏰ Timing:\nMon-Sat: 9 AM - 9 PM\nSun: 9 AM - 7 PM\nLunch Break: 1 PM - 2 PM`;
                    alert(bookingMessage);
                }, 800);
            }
        }
    });
})
// ===== STORE LOCATION FUNCTIONS =====

// Get user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                
                // Calculate distance to store
                const distance = calculateDistance(
                    userLat, userLon, 
                    23.0505735, 72.6699662
                );
                
                // Display user location with distance
                displayUserLocation(userLat, userLon, distance);
                
                // Store for later use
                localStorage.setItem('userLocation', JSON.stringify({
                    lat: userLat,
                    lon: userLon,
                    timestamp: Date.now()
                }));
            },
            function(error) {
                console.error("Error getting location:", error);
                // Fallback to store location
                displayStoreLocation();
            }
        );
    } else {
        console.log("Geolocation not supported");
        displayStoreLocation();
    }
}

// Calculate distance between two coordinates (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 100) / 100; // Round to 2 decimals
}

// Display user location with distance to store
function displayUserLocation(lat, lon, distance) {
    const locationElement = document.getElementById('storeLocation');
    
    if (locationElement) {
        locationElement.innerHTML = `
            <div class="location-info">
                <h4>📍 Your Location</h4>
                <p><strong>Your Coordinates:</strong> ${lat.toFixed(6)}, ${lon.toFixed(6)}</p>
                <p><strong>Distance to Store:</strong> ${distance} km</p>
                <a href="https://maps.google.com/?q=${lat},${lon}" 
                   target="_blank" class="map-link">
                   View Your Location
                </a>
            </div>
        `;
    }
}

// Display store location (hardcoded)
function displayStoreLocation() {
    const storeLat = 23.0505735;
    const storeLon = 72.6699662;
    const storeAddress = "27, Murtidham Park, Nikol, Ahmedabad";
    
    const locationElement = document.getElementById('storeLocation');
    
    if (locationElement) {
        locationElement.innerHTML = `
            <div class="location-info">
                <h4>📍 Our Store Location</h4>
                <p><strong>Address:</strong> ${storeAddress}</p>
                <p><strong>Coordinates:</strong> ${storeLat}, ${storeLon}</p>
                <div class="location-buttons">
                    <a href="https://maps.google.com/?q=${storeLat},${storeLon}" 
                       target="_blank" class="map-link">
                       🗺️ View on Google Maps
                    </a>
                    <a href="https://maps.app.goo.gl/6uK4AEnSwHb2jwLi8" 
                       target="_blank" class="map-link">
                       📍 Get Directions
                    </a>
                    <button onclick="getUserLocation()" class="map-link">
                       📍 Find My Location
                    </button>
                </div>
            </div>
        `;
    }
}

// Initialize location on page load
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code
    updateStoreStatus();
    displayFrames();
    highlightNavOnScroll();
    animateOnScroll();
    
    // Initialize store location display
    displayStoreLocation();
    
    // Add location button to contact section
    addLocationButton();
});

// Add location button dynamically
function addLocationButton() {
    const contactSection = document.getElementById('contact');
    if (contactSection && !document.getElementById('locationBtn')) {
        const locationBtn = document.createElement('button');
        locationBtn.id = 'locationBtn';
        locationBtn.className = 'btn-primary';
        locationBtn.innerHTML = '📍 Find Store Location';
        locationBtn.style.marginTop = '10px';
        locationBtn.onclick = function() {
            getUserLocation();
            // Scroll to location display
            const locationElement = document.getElementById('storeLocation');
            if (locationElement) {
                locationElement.scrollIntoView({ behavior: 'smooth' });
            }
        };
        
        // Add to contact section
        contactSection.appendChild(locationBtn);
    }
}
// ===== END OF LOCATION FUNCTIONS =====


