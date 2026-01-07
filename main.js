// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
    }
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Appointment Form Submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            
            // Create WhatsApp message
            const message = `Hello Suraj Chashma Ghar!%0A%0AI would like to book an appointment.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A%0AThank you!`;
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/917069343403?text=${message}`, '_blank');
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('Thank you! Opening WhatsApp to confirm your appointment.');
        });
    }
    
    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .category-card, .review-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Business hour status indicator
    function updateBusinessStatus() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hours * 60 + minutes;
        
        let isOpen = false;
        let statusMessage = '';
        
        // Check if it's Sunday
        if (day === 0) {
            // Sunday hours: 9 AM to 7 PM
            if (currentTime >= 9*60 && currentTime < 19*60) {
                // Check lunch break (1 PM to 2 PM)
                if (currentTime >= 13*60 && currentTime < 14*60) {
                    isOpen = false;
                    statusMessage = 'Closed for lunch (will reopen at 2:00 PM)';
                } else {
                    isOpen = true;
                    statusMessage = 'Open - Closes at 7:00 PM';
                }
            } else {
                isOpen = false;
                statusMessage = 'Closed - Opens tomorrow at 9:00 AM';
            }
        } 
        // Check if it's Monday to Saturday
        else if (day >= 1 && day <= 6) {
            // Monday to Saturday hours: 9 AM to 9 PM
            if (currentTime >= 9*60 && currentTime < 21*60) {
                // Check lunch break (1 PM to 2 PM)
                if (currentTime >= 13*60 && currentTime < 14*60) {
                    isOpen = false;
                    statusMessage = 'Closed for lunch (will reopen at 2:00 PM)';
                } else {
                    isOpen = true;
                    statusMessage = 'Open - Closes at 9:00 PM';
                }
            } else {
                isOpen = false;
                statusMessage = 'Closed - Opens at 9:00 AM';
            }
        }
        
        // Create or update status indicator
        let statusElement = document.getElementById('businessStatus');
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.id = 'businessStatus';
            statusElement.style.cssText = `
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                padding: 10px;
                text-align: center;
                font-weight: 500;
                z-index: 999;
                background-color: ${isOpen ? '#10b981' : '#ef4444'};
                color: white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            `;
            document.body.appendChild(statusElement);
        }
        
        statusElement.innerHTML = `
            <i class="fas ${isOpen ? 'fa-store' : 'fa-store-slash'}"></i>
            ${statusMessage}
        `;
        statusElement.style.backgroundColor = isOpen ? '#10b981' : '#ef4444';
    }
    
    // Initialize business status
    updateBusinessStatus();
    // Update every minute
    setInterval(updateBusinessStatus, 60000);
});





