/* ==========================================================================
   Portfolio Interactivity Script - Logamoorthy D
   ========================================================================== */

let activeRoles = [
  'Full Stack Developer Intern',
  'Creator of My Work Hub',
  'Cyber Security Student',
  'Python & Java Developer',
  'Frontend & UI/UX Enthusiast'
];

let skillObserver = null;

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavbar();
  initScrollAnimations();
  initCopyButtons();
  initContactForm();
  initResumeModal();
  initProjectModals();
  initDynamicContent();
});

/* --------------------------------------------------------------------------
   1. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = activeRoles[roleIndex % activeRoles.length];

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
  skillObserver = new IntersectionObserver((entries) => {
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
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

/* --------------------------------------------------------------------------
   8. Dynamic Content Loader (Decap CMS Content Hydration)
   -------------------------------------------------------------------------- */
async function initDynamicContent() {
  try {
    const res = await fetch('data/content.json?v=' + Date.now());
    if (!res.ok) return;
    const data = await res.json();
    applyDynamicContent(data);
  } catch (err) {
    console.info('Using static fallback content (local or unchanged):', err.message);
  }
}

function applyDynamicContent(data) {
  if (!data) return;

  // 1. Hero & Profile
  if (data.hero) {
    const h = data.hero;
    if (h.badge) {
      const badgeEl = document.getElementById('hero-badge-text');
      if (badgeEl) badgeEl.textContent = h.badge;
    }
    if (h.name) {
      const nameEl = document.getElementById('hero-name');
      if (nameEl) nameEl.textContent = h.name;
      const cardNameEl = document.getElementById('card-name');
      if (cardNameEl) cardNameEl.textContent = h.name;
    }
    if (h.bio) {
      const bioEl = document.getElementById('hero-bio');
      if (bioEl) bioEl.innerHTML = escapeAndFormatBio(h.bio);
    }
    if (h.roles && Array.isArray(h.roles) && h.roles.length > 0) {
      activeRoles = h.roles;
    }
    if (h.graduationYear) {
      const el = document.getElementById('stat-grad-year');
      if (el) { el.setAttribute('data-target', h.graduationYear); el.innerText = h.graduationYear; }
    }
    if (h.internshipCount) {
      const el = document.getElementById('stat-internship');
      if (el) { el.setAttribute('data-target', h.internshipCount); el.innerText = h.internshipCount; }
    }
    if (h.languagesCount) {
      const el = document.getElementById('stat-languages');
      if (el) { el.setAttribute('data-target', h.languagesCount); el.innerText = h.languagesCount; }
    }
    if (h.profileRole) {
      const el = document.getElementById('card-role');
      if (el) el.textContent = h.profileRole;
    }
    if (h.institutionShort) {
      const el = document.getElementById('card-institution');
      if (el) el.textContent = h.institutionShort;
    }
    if (h.resumePdf) {
      const pdfPath = h.resumePdf.startsWith('/') ? h.resumePdf.slice(1) : h.resumePdf;
      const heroDownload = document.getElementById('hero-resume-download');
      if (heroDownload) heroDownload.setAttribute('href', pdfPath);
      const modalDownload = document.getElementById('modal-resume-download');
      if (modalDownload) modalDownload.setAttribute('href', pdfPath);
      const modalOpen = document.getElementById('modal-resume-open');
      if (modalOpen) modalOpen.setAttribute('href', pdfPath);
      const resumeFrame = document.getElementById('resume-frame');
      if (resumeFrame) resumeFrame.setAttribute('src', `${pdfPath}#toolbar=0&navpanes=0`);
    }
  }

  // 2. Contact
  if (data.contact) {
    const c = data.contact;
    if (c.email) {
      const el = document.getElementById('email-text');
      if (el) el.textContent = c.email;
      const cardEl = document.getElementById('card-email');
      if (cardEl) cardEl.textContent = c.email;
    }
    if (c.phone) {
      const el = document.getElementById('phone-text');
      if (el) el.textContent = c.phone;
    }
    if (c.location) {
      const el = document.getElementById('location-text');
      if (el) el.textContent = c.location;
      const cardEl = document.getElementById('card-location');
      if (cardEl) cardEl.textContent = c.location;
    }
  }

  // 3. About & Education
  if (data.about) {
    const a = data.about;
    const summaryContainer = document.getElementById('about-summary-container');
    if (summaryContainer && (a.summary1 || a.summary2)) {
      summaryContainer.innerHTML = '';
      if (a.summary1) {
        const p1 = document.createElement('p');
        p1.textContent = a.summary1;
        summaryContainer.appendChild(p1);
      }
      if (a.summary2) {
        const p2 = document.createElement('p');
        p2.textContent = a.summary2;
        summaryContainer.appendChild(p2);
      }
    }
    if (a.languagesSpoken && Array.isArray(a.languagesSpoken)) {
      const langContainer = document.getElementById('about-languages-container');
      if (langContainer) {
        langContainer.innerHTML = a.languagesSpoken.map(lang => 
          `<div class="skill-tag"><i class="fa-solid fa-language"></i> ${escapeHtml(lang.name)} (${escapeHtml(lang.proficiency)})</div>`
        ).join('');
      }
    }
    if (a.education) {
      const ed = a.education;
      const degEl = document.getElementById('edu-degree');
      if (degEl && ed.degree) degEl.textContent = ed.degree;
      const instEl = document.getElementById('edu-institution');
      if (instEl && ed.institution) instEl.textContent = ed.institution;
      const badgeEl = document.getElementById('edu-badge');
      if (badgeEl && ed.badge) badgeEl.textContent = ed.badge;
      const descEl = document.getElementById('edu-description');
      if (descEl && ed.description) descEl.textContent = ed.description;
    }
  }

  // 4. Experience
  if (data.experience && Array.isArray(data.experience) && data.experience.length > 0) {
    const expTimeline = document.getElementById('experience-timeline');
    if (expTimeline) {
      expTimeline.innerHTML = data.experience.map(item => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="glass-card">
            <div class="exp-role">${escapeHtml(item.role)}</div>
            <div class="exp-company"><i class="fa-solid fa-building"></i> ${escapeHtml(item.company)}</div>
            <div class="exp-date"><i class="fa-regular fa-calendar-check"></i> ${escapeHtml(item.date)}</div>
            
            <ul class="exp-bullets">
              ${(item.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join('')}
            </ul>

            <div class="tags-wrapper" style="margin-top: 1.2rem;">
              ${(item.tags || []).map(t => `<span class="skill-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // 5. Featured Projects
  if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
    const projGrid = document.getElementById('projects-grid');
    if (projGrid) {
      projGrid.innerHTML = data.projects.map(proj => `
        <div class="glass-card project-card">
          <div class="project-banner">
            <span class="project-badge">${escapeHtml(proj.badge || 'Project')}</span>
            <i class="fa-solid fa-cubes-stacked"></i>
          </div>

          <h3 class="project-title">${escapeHtml(proj.title)}</h3>
          <div class="project-subtitle">${escapeHtml(proj.subtitle || '')}</div>
          <p class="project-desc">${escapeHtml(proj.description || '')}</p>

          <div class="tags-wrapper" style="margin-bottom: 1.5rem;">
            ${(proj.tags || []).map(t => `<span class="skill-tag">${escapeHtml(t)}</span>`).join('')}
          </div>

          <div class="project-links">
            ${proj.liveUrl ? `<a href="${encodeURI(proj.liveUrl)}" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ''}
            <button class="btn btn-outline btn-sm" id="workhub-demo-btn" title="View Project Details">
              <i class="fa-solid fa-circle-info"></i> Details
            </button>
            ${proj.githubUrl ? `<a href="${encodeURI(proj.githubUrl)}" target="_blank" class="btn btn-outline btn-sm"><i class="fa-brands fa-github"></i> Code</a>` : ''}
          </div>
        </div>
      `).join('');

      // Re-attach modal listeners
      initProjectModals();
    }
  }

  // 6. Skills Matrix
  if (data.skills) {
    const s = data.skills;
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
      const progLangs = (s.programmingLanguages || []).map(item => `
        <div class="skill-bar-wrapper">
          <div class="skill-info"><span>${escapeHtml(item.name)}</span><span>${escapeHtml(item.progress)}</span></div>
          <div class="skill-progress-bg"><div class="skill-progress-fill" data-progress="${escapeHtml(item.progress)}"></div></div>
        </div>
      `).join('');

      const frontend = (s.frontendDevelopment || []).map(item => `
        <div class="skill-bar-wrapper">
          <div class="skill-info"><span>${escapeHtml(item.name)}</span><span>${escapeHtml(item.progress)}</span></div>
          <div class="skill-progress-bg"><div class="skill-progress-fill" data-progress="${escapeHtml(item.progress)}"></div></div>
        </div>
      `).join('');

      const tools = (s.tools || []).map(t => `
        <div class="skill-tag"><i class="fa-solid fa-check"></i> ${escapeHtml(t)}</div>
      `).join('');

      skillsGrid.innerHTML = `
        <div class="glass-card skill-category">
          <div class="category-title">
            <i class="fa-solid fa-laptop-code"></i> Programming Languages
          </div>
          ${progLangs}
        </div>

        <div class="glass-card skill-category">
          <div class="category-title">
            <i class="fa-solid fa-cubes"></i> Frontend Development
          </div>
          ${frontend}
        </div>

        <div class="glass-card skill-category">
          <div class="category-title">
            <i class="fa-solid fa-toolbox"></i> Tools & Security
          </div>
          <div class="tags-wrapper" style="margin-top: 0.5rem;">
            ${tools}
          </div>
        </div>
      `;

      // Re-observe dynamic skill bars
      if (skillObserver) {
        document.querySelectorAll('.skill-progress-fill').forEach(fill => skillObserver.observe(fill));
      }
    }
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAndFormatBio(bio) {
  if (!bio) return '';
  return escapeHtml(bio).replace(/My Work Hub/g, '<strong>My Work Hub</strong>');
}
