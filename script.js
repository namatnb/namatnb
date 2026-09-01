// script.js - Mobile nav, form handling, and small enhancements

// Editable contact email placeholder
const CONTACT_EMAIL = 'yourname@example.com'; // <-- edit this value to change the mailto link

document.addEventListener('DOMContentLoaded', () => {
  // Set dynamic year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Update mailto link
  const mailtoLink = document.getElementById('mailto-link');
  if (mailtoLink) {
    mailtoLink.href = `mailto:${CONTACT_EMAIL}`;
    mailtoLink.textContent = CONTACT_EMAIL;
  }

  // Nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when clicking a nav link (mobile)
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }));
  }

  // Smooth focus for skip-links and anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({behavior: 'smooth', block: 'start'});
          el.focus({preventScroll:true});
        }
      }
    });
  });

  // Contact form handling
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';

      const name = (form.querySelector('#name') || {}).value || '';
      const from = (form.querySelector('#email') || {}).value || '';
      const message = (form.querySelector('#message') || {}).value || '';

      // Basic validation
      if (name.trim().length < 2) { status.textContent = 'Please enter your name.'; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) { status.textContent = 'Please enter a valid email.'; return; }
      if (message.trim().length < 8) { status.textContent = 'Please enter a brief message (8+ characters).'; return; }

      // Create mailto link so user can send via their email client
      const subject = encodeURIComponent(`Website contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${from}\n\nMessage:\n${message}`);
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

      // Open mail client
      window.location.href = mailto;

      // Show temporary status
      if (status) {
        status.textContent = 'Opening your email client...';
        setTimeout(() => { status.textContent = ''; form.reset(); }, 3000);
      }
    });
  }

  // Small accessibility: ensure focusable sections
  document.querySelectorAll('main section').forEach(s => s.setAttribute('tabindex', '-1'));
});
