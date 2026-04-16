/* ════════════════════════════════════════════════
   ACO CLIM — JavaScript
   ════════════════════════════════════════════════ */


/* ── Header scroll effect ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── Mobile hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navList   = document.getElementById('navList');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navList.classList.toggle('open');
});

// Close menu on nav link click
navList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navList.classList.remove('open');
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const highlightNav = () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
};
window.addEventListener('scroll', highlightNav, { passive: true });

/* ── Scroll-reveal with IntersectionObserver ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger cards in a grid
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 100;
        });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Counter animation for hero stats ── */
const animateCounters = () => {
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
};

// Trigger counters when hero stats enter view
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  const statsObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  statsObserver.observe(statsEl);
}

/* ── Service card expand (click for mobile / touch devices) ── */
const serviceCards = document.querySelectorAll('.service-card');
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    if (!isTouchDevice() && window.innerWidth > 900) return; // desktop uses CSS hover
    const isActive = card.classList.contains('active');
    serviceCards.forEach(c => c.classList.remove('active'));
    if (!isActive) card.classList.add('active');
  });
});

/* ── Smooth anchor scroll with offset for fixed header ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── 3D tilt effect on cards (desktop only) ── */
const tiltCards = document.querySelectorAll('.testimonial-card, .why-card, .contact-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 900) return;
    const rect  = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Parallax on hero orbs ── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const orbBlue = document.querySelector('.orb-blue');
  const orbRed  = document.querySelector('.orb-red');
  if (orbBlue) orbBlue.style.transform = `translateY(${scrollY * 0.15}px)`;
  if (orbRed)  orbRed.style.transform  = `translateY(${-scrollY * 0.1}px)`;
}, { passive: true });

/* ── Image sliders inside service cards ── */
document.querySelectorAll('[data-slider]').forEach(slider => {
  const track  = slider.querySelector('.slider-track');
  const imgs   = track.querySelectorAll('img');
  const dotsEl = slider.querySelector('.slider-dots');
  const prev   = slider.querySelector('.slider-prev');
  const next   = slider.querySelector('.slider-next');
  const total  = imgs.length;
  let current  = 0;
  let timer    = null;

  // Build dots
  const dots = Array.from({ length: total }, (_, i) => {
    const d = document.createElement('button');
    d.className = 'slider-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Image ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
    return d;
  });

  // Hide controls when only 1 image
  if (total <= 1) {
    prev.style.display = 'none';
    next.style.display = 'none';
    dotsEl.style.display = 'none';
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(() => goTo(current + 1), 3200);
  }
  function stopAuto() {
    clearInterval(timer);
  }

  prev.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); startAuto(); });
  next.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); startAuto(); });

  // Auto-play only while card is hovered / active
  const card = slider.closest('.service-card');
  card.addEventListener('mouseenter', startAuto);
  card.addEventListener('mouseleave', stopAuto);
  // For touch/mobile active cards
  const cardObserver = new MutationObserver(() => {
    card.classList.contains('active') ? startAuto() : stopAuto();
  });
  cardObserver.observe(card, { attributes: true, attributeFilter: ['class'] });
});

/* ── Why-Us full carousel ── */
(function () {
  const carousel  = document.getElementById('whyCarousel');
  if (!carousel) return;

  const track     = carousel.querySelector('.why-carousel-track');
  const slides    = Array.from(carousel.querySelectorAll('.why-carousel-slide'));
  const dotsWrap  = document.getElementById('whyDots');
  const counter   = document.getElementById('whyCounter');
  const caption   = document.getElementById('whyCaption');
  const prevBtn   = document.getElementById('whyPrev');
  const nextBtn   = document.getElementById('whyNext');
  const total     = slides.length;
  let   current   = 0;
  let   timer     = null;

  const captions  = [
    'Installation de climatiseurs',
    'Systèmes CVC industriels',
    'Maintenance & entretien',
    'Système de ventilation 3D',
    'Contrôle & vérification manomètres',
    'Installation climatiseur',
    'Réseaux de ventilation',
    'Chaufferie moderne',
    'Technicien CVC en intervention',
    'Conduits de ventilation en toiture'
  ];

  // Build dots
  const dots = slides.map((_, i) => {
    const d = document.createElement('button');
    d.className = 'why-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsWrap.appendChild(d);
    return d;
  });

  function goTo(index) {
    slides[current].classList.remove('is-active');
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides[current].classList.add('is-active');
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    counter.textContent = `${current + 1} / ${total}`;
    caption.textContent  = captions[current] || '';
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 3500);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', resetTimer);

  // Touch swipe support
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? current + 1 : current - 1); resetTimer(); }
  }, { passive: true });

  // Init
  goTo(0);
  resetTimer();
})();

/* ── Service icon micro-animation on hover ── */
document.querySelectorAll('.service-card').forEach(card => {
  const icon = card.querySelector('.service-icon');
  if (!icon) return;
  card.addEventListener('mouseenter', () => {
    icon.style.animation = 'iconSpin 0.5s ease';
  });
  card.addEventListener('animationend', () => {
    icon.style.animation = '';
  }, { once: true });
});

/* ── Contact form: show/hide entreprise field + mailto submit ── */
(function () {
  const form           = document.getElementById('contactForm');
  if (!form) return;

  const entrepriseGroup = document.getElementById('entrepriseGroup');
  const entrepriseInput = document.getElementById('cf-entreprise');
  const radios          = form.querySelectorAll('input[name="type"]');

  radios.forEach(r => {
    r.addEventListener('change', () => {
      const isEntreprise = r.value === 'Entreprise' && r.checked;
      entrepriseGroup.style.display = isEntreprise ? 'flex' : 'none';
      entrepriseInput.required = isEntreprise;
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom        = document.getElementById('cf-nom').value.trim();
    const ville      = document.getElementById('cf-ville').value.trim();
    const type       = form.querySelector('input[name="type"]:checked').value;
    const entreprise = entrepriseInput.value.trim();
    const message    = document.getElementById('cf-message').value.trim();

    if (!nom || !ville || !message) return;
    if (type === 'Entreprise' && !entreprise) {
      entrepriseInput.focus();
      return;
    }

    const subject = encodeURIComponent('Nouvelle demande de contact – ACO CLIM');
    let body = `Nom & Prénom : ${nom}\nVille : ${ville}\nType : ${type}`;
    if (type === 'Entreprise') body += `\nEntreprise : ${entreprise}`;
    body += `\n\nMessage :\n${message}`;

    window.location.href = `mailto:acoclim.contact@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  });
})();
