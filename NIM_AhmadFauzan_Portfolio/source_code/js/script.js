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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

        if (nameInput.value.trim() === '') {
            nameInput.classList.add('error');
            nameError.textContent = 'Nama tidak boleh kosong.';
            isValid = false;
        } else {
            nameInput.classList.remove('error');
            nameError.textContent = '';
        }

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

        if (messageInput.value.trim().length < 10) {
            messageInput.classList.add('error');
            messageError.textContent = 'Pesan minimal 10 karakter.';
            isValid = false;
        } else {
            messageInput.classList.remove('error');
            messageError.textContent = '';
        }

        if (isValid) {
            formSuccess.style.display = 'block';
            contactForm.reset();
            
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 3000);
        }
    });

    /* =========================================
       5. Filter Tabs Interaction
       ========================================= */
    const filterTabs = document.querySelectorAll('.filter-tabs span');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
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

    const projectDescriptions = {
        'ShopHub - E-Commerce Platform': 'ShopHub is a comprehensive full-stack e-commerce platform built with React and Node.js. It features secure payment integration, a powerful admin panel for inventory management, and real-time order tracking for customers.',
        'TripMate - Travel Companion': 'TripMate is a travel planning application that helps users create detailed itineraries, track their travel budget, and get real-time weather information for any destination worldwide.',
        'TaskFlow - Project Manager': 'TaskFlow is a collaborative project management tool designed for agile teams. It features real-time updates, team chat functionality, and comprehensive progress tracking dashboards.',
        'WeatherNow - Forecast App': 'WeatherNow provides accurate weather forecasts with beautiful visualizations. It integrates with the OpenWeather API to deliver 7-day forecasts, interactive weather maps, and location-based severe weather alerts.'
    };

    projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const imgSrc = card.querySelector('img').src;
            const title = card.querySelector('.project-title').textContent;
            const tagsHTML = card.querySelector('.project-tags').innerHTML;
            
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalTags.innerHTML = tagsHTML;
            modalDesc.textContent = projectDescriptions[title] || 'A well-crafted project showcasing modern web development practices and clean design principles.';
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

});
