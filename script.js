/* ==========================================================================
   Portfolio Interactivity Script - Logamoorthy D
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavbar();
  initScrollAnimations();
  initCopyButtons();
  initContactForm();
  initResumeModal();
  initProjectModals();
});

/* --------------------------------------------------------------------------
   1. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const roles = [
    'Full Stack Developer Intern',
    'Creator of My Work Hub',
    'Cyber Security Student',
    'Python & Java Developer',
    'Frontend & UI/UX Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   2. Navbar Scroll & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Sticky Scroll Class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting on scroll
    let currentSection = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });

    // Close menu when link clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Scroll Intersection Animations (Counters & Skill Bars)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  // Stat Counters Animation
  const counters = document.querySelectorAll('.counter');
  let animatedCounters = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedCounters) {
        animatedCounters = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const speed = target / 30; // Step ratio

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              setTimeout(updateCount, 40);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) counterObserver.observe(statsSection);

  // Skill Bar Progress Animation
  const skillFills = document.querySelectorAll('.skill-progress-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const progress = fill.getAttribute('data-progress');
        fill.style.width = progress;
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach(fill => skillObserver.observe(fill));
}

/* --------------------------------------------------------------------------
   4. One-Click Quick Copy for Email & Phone
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  const emailText = document.getElementById('email-text')?.innerText;
  const phoneText = document.getElementById('phone-text')?.innerText;

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy email.');
      });
    });
  }

  if (copyPhoneBtn && phoneText) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(phoneText).then(() => {
        showToast('Phone number copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy phone number.');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   5. Interactive Contact Form & Toast
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('user-name').value.trim();
    
    // Simulate submission
    showToast(`Thank you, ${name}! Your message has been sent successfully.`);
    form.reset();
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* --------------------------------------------------------------------------
   6. Resume Preview Modal
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtn = document.getElementById('open-modal-btn');
  const closeBtn = document.getElementById('close-modal-btn');

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   7. Project Modals (My Work Hub)
   -------------------------------------------------------------------------- */
function initProjectModals() {
  const workhubModal = document.getElementById('workhub-modal');
  const workhubDemoBtn = document.getElementById('workhub-demo-btn');
  const closeWorkhubModal = document.getElementById('close-workhub-modal');

  if (!workhubModal) return;

  if (workhubDemoBtn) {
    workhubDemoBtn.addEventListener('click', () => {
      workhubModal.classList.add('active');
    });
  }

  if (closeWorkhubModal) {
    closeWorkhubModal.addEventListener('click', () => {
      workhubModal.classList.remove('active');
    });
  }

  workhubModal.addEventListener('click', (e) => {
    if (e.target === workhubModal) {
      workhubModal.classList.remove('active');
    }
  });
}
