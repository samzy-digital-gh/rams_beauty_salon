/* === RAMSTOUCH BEAUTY — SCRIPT v2.0 === */

document.addEventListener('DOMContentLoaded', () => {

  // ─── MOBILE MENU ──────────────────────────────────────────
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu');
  const menuOverlay = document.querySelector('.menu-overlay');

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.classList.toggle('open', !isOpen);
    mobileMenu.classList.toggle('open', !isOpen);
    menuOverlay.classList.toggle('open', !isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);
    document.querySelectorAll('.mobile-menu a').forEach(link =>
      link.addEventListener('click', toggleMenu)
    );
  }

  // ─── NAV SCROLL SHADOW ────────────────────────────────────
  const nav = document.querySelector('.salon-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ─── SCROLL REVEAL ────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0');
          setTimeout(() => entry.target.classList.add('visible'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ─── STATS COUNTER ────────────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count);
          const suffix = entry.target.dataset.suffix || '';
          animateCount(entry.target, target, suffix);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  function animateCount(el, target, suffix) {
    let current = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  // ─── FAQ ACCORDION ────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ─── GALLERY FILTER ───────────────────────────────────────
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  // ─── LIGHTBOX ─────────────────────────────────────────────
  const lightbox      = document.querySelector('.lightbox');
  const lightboxImg   = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  if (lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  // ─── WHATSAPP FORMS ───────────────────────────────────────
  const waForms = document.querySelectorAll('.wa-form');
  const PHONE   = '233271977814';

  waForms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const get = id => (form.querySelector(`[name="${id}"]`) || {}).value || '';

      const name    = get('name');
      const service = get('service');
      const date    = get('date');
      const time    = get('time');
      const phone   = get('phone');
      const message = get('message');

      let text = `Hello Ramstouch Beauty! My name is ${name}.`;
      if (phone)   text += ` My phone: ${phone}.`;
      if (service) text += ` I am interested in: *${service}*.`;
      if (date)    text += ` Preferred date: ${date}`;
      if (time)    text += ` at ${time}.`;
      if (message) text += ` Additional info: ${message}`;

      const banner = form.querySelector('.success-banner');
      if (banner) {
        banner.style.display = 'block';
        setTimeout(() => banner.style.display = 'none', 6000);
      }

      window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`, '_blank');
    });
  });

  // ─── ACTIVE NAV LINK ──────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
