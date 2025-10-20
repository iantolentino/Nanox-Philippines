// basic interactivity: mobile nav toggle, smooth scroll, simple form feedback
document.addEventListener('DOMContentLoaded', function() {
  // nav toggle
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  navToggle && navToggle.addEventListener('click', function() {
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    if (mainNav.style.display === 'block') {
      mainNav.style.display = '';
    } else {
      mainNav.style.display = 'block';
    }
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        if (window.innerWidth <= 720 && mainNav) mainNav.style.display = '';
      }
    });
  });

  // basic form submit handling (prevents redirect when testing locally)
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', function(e){
      // If you're using Netlify, remove preventDefault so Netlify handles the POST.
      e.preventDefault();
      status.textContent = 'Thank you — message captured (local demo).';
      form.reset();
    });
  }
});
