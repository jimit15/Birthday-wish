// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-nav a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// Product Data
const products = [
    {
        id: 1,
        name: "Classic Rectangle Frames",
        category: "men",
        price: "₹1,499",
        image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Trendy Round Glasses",
        category: "women",
        price: "₹1,899",
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80"
    },
    {
        id: 3,
        name: "Kids Colorful Frames",
        category: "kids",
        price: "₹999",
        image: "https://images.unsplash.com/photo-1612810806695-30f7a8258391?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Aviator Sunglasses",
        category: "sunglasses",
        price: "₹2,199",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Modern Square Frames",
        category: "men",
        price: "₹1,699",
        image: "https://images.unsplash.com/photo-1583292650899-5c7c36f921c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Cat-Eye Glasses",
        category: "women",
        price: "₹2,299",
        image: "https://images.unsplash.com/photo-1556306535-38febf6783e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Flexible Kids Frames",
        category: "kids",
        price: "₹1,199",
        image: "https://images.unsplash.com/photo-1552880987-9c3d8d1b71e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Wayfarer Sunglasses",
        category: "sunglasses",
        price: "₹1,899",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

// Product Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const productsGrid = document.querySelector('.products-grid');

function displayProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3>${product.name}</h3>
                <div class="product-price">${product.price}</div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Initialize products
displayProducts();

// Add event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Display filtered products
        displayProducts(filterValue);
    });
});

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
        }
    });
});

// Update Opening Hours Dynamically
function updateOpeningHours() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hour + minutes / 60;
    
    let isOpen = false;
    let closingTime = "9:00 PM";
    
    // Monday-Saturday: 10 AM - 9 PM, Sunday: 11 AM - 8 PM
    if (day >= 1 && day <= 6) { // Monday to Saturday
        isOpen = currentTime >= 10 && currentTime < 21;
    } else { // Sunday
        isOpen = currentTime >= 11 && currentTime < 20;
        closingTime = "8:00 PM";
    }
    
    // Update hero section
    const heroTimeElement = document.querySelector('.hero-info .info-item:nth-child(2) p');
    if (heroTimeElement) {
        heroTimeElement.textContent = isOpen 
            ? `Open Now - Closes ${closingTime}` 
            : `Closed - Opens Tomorrow at ${day === 0 ? '11:00 AM' : '10:00 AM'}`;
    }
    
    // Update contact section
    const contactTimeElement = document.querySelector('.contact-card:nth-child(2) .contact-details');
    if (contactTimeElement) {
        const statusElement = document.createElement('p');
        statusElement.innerHTML = `<strong>Status:</strong> <span style="color: ${isOpen ? '#57c5b6' : '#ff8a65'}">${isOpen ? 'Open Now' : 'Closed Now'}</span>`;
        contactTimeElement.appendChild(statusElement);
    }
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', updateOpeningHours);

// Add active class to nav links based on scroll position
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Initialize the highlight on load
highlightNavOnScroll();

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .product-card, .testimonial-card');
    
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
document.querySelectorAll('.service-card, .product-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
// Initial call to animate elements already in view
animateOnScroll();

// Simple form submission handler (for demo purposes)
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
                
                // Show a booking message
                setTimeout(() => {
                    alert('To book an eye test, please call us at 070693 43403 or visit our store during opening hours.');
                }, 800);
            }
        }
    });
});