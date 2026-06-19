document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. Responsive Navigation Menu
       ========================================= */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navbar').querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* =========================================
       Header Scroll Effect
       ========================================= */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================
       2. Smooth Scrolling
       ========================================= */
    // Implementing JS-based smooth scrolling to fulfill the requirement
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================================
       3. Back to Top Button
       ========================================= */
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* =========================================
       4. Form Validation
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Name Validation: tidak boleh kosong
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('error');
            nameError.textContent = 'Nama tidak boleh kosong.';
            isValid = false;
        } else {
            nameInput.classList.remove('error');
            nameError.textContent = '';
        }

        // Email Validation: harus valid
        if (emailInput.value.trim() === '') {
            emailInput.classList.add('error');
            emailError.textContent = 'Email tidak boleh kosong.';
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailInput.classList.add('error');
            emailError.textContent = 'Format email tidak valid.';
            isValid = false;
        } else {
            emailInput.classList.remove('error');
            emailError.textContent = '';
        }

        // Message Validation: minimal 10 karakter
        if (messageInput.value.trim().length < 10) {
            messageInput.classList.add('error');
            messageError.textContent = 'Pesan minimal 10 karakter.';
            isValid = false;
        } else {
            messageInput.classList.remove('error');
            messageError.textContent = '';
        }

        if (isValid) {
            // Simulate form submission
            formSuccess.style.display = 'block';
            contactForm.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 3000);
        }
    });

    /* =========================================
       5. Skills Progress Animation
       ========================================= */
    const progressFills = document.querySelectorAll('.progress-fill');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                fill.style.width = fill.getAttribute('data-width');
                skillObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    progressFills.forEach(fill => {
        skillObserver.observe(fill);
    });

    /* =========================================
       6. Project Modal Logic
       ========================================= */
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');
    
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalTags = document.getElementById('modalTags');
    const modalDesc = document.getElementById('modalDesc');

    // Dummy descriptions mapped by project titles
    const projectDescriptions = {
        'VeloCart - E-Commerce Dashboard': 'VeloCart is a comprehensive e-commerce admin dashboard designed to help store owners track their sales, manage inventory, and analyze customer behavior in real-time. Built with a focus on usability and clean data visualization.',
        'Wanderlust - Travel Booking': 'Wanderlust is a modern travel booking platform that offers users an intuitive interface to search for flights, hotels, and holiday packages. It features a stunning visual design with seamless booking flows.',
        'FluxFlow - Task Manager': 'FluxFlow is a Kanban-style task management application designed for agile teams. It allows users to create boards, organize tasks into columns, and collaborate effectively with real-time updates.',
        'SkyPulse - Weather App': 'SkyPulse provides accurate and beautiful weather forecasts. It uses real-time API data to show current conditions, hourly forecasts, and dynamic backgrounds based on the weather.'
    };

    projectCards.forEach(card => {
        card.style.cursor = 'pointer'; // Make it look clickable
        card.addEventListener('click', () => {
            const imgSrc = card.querySelector('img').src;
            const title = card.querySelector('.project-title').textContent;
            const tagsHTML = card.querySelector('.project-tags').innerHTML;
            
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalTags.innerHTML = tagsHTML;
            modalDesc.textContent = projectDescriptions[title] || 'A beautifully crafted project focusing on user experience and clean code.';
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

});
