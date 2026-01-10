document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu on click

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .publication-card, .timeline-item, .industry-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add class for animation when in view
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.in-view').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });

    // Modal Logic
    const abstractModal = document.getElementById('abstract-modal');
    const citationModal = document.getElementById('citation-modal');
    const modalAbstractText = document.getElementById('modal-abstract-text');
    const modalBibtexText = document.getElementById('modal-bibtex-text');
    const closeModals = document.querySelectorAll('.close-modal');
    const showAbstractBtns = document.querySelectorAll('.show-abstract');
    const showCitationBtns = document.querySelectorAll('.show-citation');
    const copyCitationBtn = document.getElementById('copy-citation-btn');

    // Open Abstract Modal
    showAbstractBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const abstract = btn.getAttribute('data-abstract');
            modalAbstractText.innerHTML = abstract;
            openModal(abstractModal);
        });
    });

    // Open Citation Modal
    showCitationBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const bibtex = btn.getAttribute('data-bibtex');
            modalBibtexText.textContent = bibtex;
            openModal(citationModal);
        });
    });

    function openModal(modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Close Modals (X button)
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            if (abstractModal.classList.contains('show')) closeModal(abstractModal);
            if (citationModal && citationModal.classList.contains('show')) closeModal(citationModal);
        });
    });

    // Close on Click Outside
    window.addEventListener('click', (e) => {
        if (e.target === abstractModal) closeModal(abstractModal);
        if (e.target === citationModal) closeModal(citationModal);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (abstractModal.classList.contains('show')) closeModal(abstractModal);
            if (citationModal && citationModal.classList.contains('show')) closeModal(citationModal);
        }
    });

    // Copy Citation Logic
    if (copyCitationBtn) {
        copyCitationBtn.addEventListener('click', () => {
            const bibtex = modalBibtexText.textContent;
            navigator.clipboard.writeText(bibtex).then(() => {
                const originalText = copyCitationBtn.innerHTML;
                copyCitationBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyCitationBtn.style.background = 'var(--secondary-color)'; // visual feedback

                setTimeout(() => {
                    copyCitationBtn.innerHTML = originalText;
                    copyCitationBtn.style.background = ''; // reset
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }
    // Announcement Popup Logic
    const announcementPopup = document.getElementById('announcement-popup');
    const closePopupBtn = document.querySelector('.close-popup');
    const viewPaperBtn = document.querySelector('.btn-popup');

    // Check if announcement has been shown
    if (!localStorage.getItem('arrest_announced')) {
        setTimeout(() => {
            announcementPopup.classList.add('show');
        }, 1500); // 1.5s delay for effect
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            announcementPopup.classList.remove('show');
            localStorage.setItem('arrest_announced', 'true');
        });
    }

    if (viewPaperBtn) {
        viewPaperBtn.addEventListener('click', () => {
            announcementPopup.classList.remove('show');
            localStorage.setItem('arrest_announced', 'true');
        });
    }
});
