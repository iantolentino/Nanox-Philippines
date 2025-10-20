// Modernized with smooth animations and enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      
      if (mainNav.style.display === 'flex') {
        mainNav.style.display = 'none';
        navToggle.innerHTML = '☰';
      } else {
        mainNav.style.display = 'flex';
        navToggle.innerHTML = '✕';
      }
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.style.display = 'none';
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '☰';
      }
    });
  }

  // Smooth scroll for internal links with offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile nav if open
        if (window.innerWidth <= 768 && mainNav) {
          mainNav.style.display = 'none';
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.innerHTML = '☰';
        }
      }
    });
  });

  // Form handling with better UX
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        if (status) {
          status.textContent = 'Thank you for your message! We\'ll get back to you soon.';
          status.style.color = '#1e88e5';
        }
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Add scroll effect to header
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255,255,255,0.98)';
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      header.style.background = 'rgba(255,255,255,0.95)';
      header.style.boxShadow = 'none';
    }
  });

  // Add intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.card, .product, .badge').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
