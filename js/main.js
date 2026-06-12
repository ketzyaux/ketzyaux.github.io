/**
 * Ketzya UX — Portfolio · Main JS
 * Navbar scroll, mobile menu, scroll reveal
 */
document.addEventListener('DOMContentLoaded', () => {
  /* ──────────────────────────────────────────────
     NAVBAR — scroll shadow
     ────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar.classList.toggle('navbar--scrolled', y > 60);
    lastScrollY = y;
  }, { passive: true });

  /* ──────────────────────────────────────────────
     MOBILE MENU
     ────────────────────────────────────────────── */
  const toggle = document.querySelector('.navbar__toggle');
  const navLinks = document.getElementById('nav-links');

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('active');
    navLinks.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ──────────────────────────────────────────────
     ACTIVE NAV LINK on scroll
     ────────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const links = navLinks?.querySelectorAll('a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links?.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));

  /* ──────────────────────────────────────────────
     SCROLL REVEAL
     ────────────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObs.observe(el));

  /* ──────────────────────────────────────────────
     DYNAMIC YEAR
     ────────────────────────────────────────────── */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ──────────────────────────────────────────────
     COPY EMAIL
     ────────────────────────────────────────────── */
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  if (copyBtn && toast) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('ketzya.ux@gmail.com').then(() => {
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }

  /* ──────────────────────────────────────────────
     IMAGE MODAL (Lightbox)
     ────────────────────────────────────────────── */
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('image-modal-img');
  const closeBtn = document.querySelector('.image-modal__close');
  
  if (modal && modalImg && closeBtn) {
    document.querySelectorAll('img.case-main-image').forEach(img => {
      img.addEventListener('click', function() {
        modal.classList.add('show');
        modalImg.src = this.src;
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });
  }
});
