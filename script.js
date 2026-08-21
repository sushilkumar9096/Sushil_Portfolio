// ==========================================================================
// SUSHILKUMAR KUCHAME PORTFOLIO - INTERACTIVE SCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Set Current Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==========================================================================
  // MOTION PRIMITIVES ENGINE IMPLEMENTATION
  // ==========================================================================
  const MotionPrimitives = {
    initAll() {
      const safeRun = (fn) => { try { fn.call(this); } catch (e) { console.warn('Motion Primitive Warning:', e); } };
      safeRun(this.initSpotlight);
      safeRun(this.initTilt);
      safeRun(this.initMagnetic);
      safeRun(this.initRoleMorphing);
      safeRun(this.initScrollReveal);
      safeRun(this.initAnimatedCounters);
      safeRun(this.initKineticCanvas);
    },

    // 1. Cursor Spotlight Primitive
    initSpotlight() {
      const elements = document.querySelectorAll('.motion-spotlight');
      elements.forEach(el => {
        if (el.dataset.spotlightInit) return;
        el.dataset.spotlightInit = 'true';

        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          el.style.setProperty('--mouse-x', `${x}px`);
          el.style.setProperty('--mouse-y', `${y}px`);
        });
      });
    },

    // 2. 3D Tilt Primitive
    initTilt() {
      const elements = document.querySelectorAll('.motion-tilt');
      elements.forEach(el => {
        if (el.dataset.tiltInit) return;
        el.dataset.tiltInit = 'true';

        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -8;
          const rotateY = ((x - centerX) / centerX) * 8;
          
          el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
      });
    },

    // 3. Magnetic Attraction Primitive
    initMagnetic() {
      const elements = document.querySelectorAll('.motion-magnetic');
      elements.forEach(el => {
        if (el.dataset.magneticInit) return;
        el.dataset.magneticInit = 'true';

        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const deltaX = (e.clientX - centerX) * 0.35;
          const deltaY = (e.clientY - centerY) * 0.35;

          el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate3d(0, 0, 0)';
        });
      });
    },

    // 4. Role Morphing Text Typewriter
    initRoleMorphing() {
      const morphEl = document.getElementById('role-morph');
      if (!morphEl) return;

      const roles = [
        "ASP.NET Core Web API",
        "Full Stack .NET 8",
        "Clean Architecture",
        "C# & SQL Server"
      ];
      let roleIdx = 0;
      let charIdx = roles[0].length;
      let isDeleting = false;

      function typeLoop() {
        const currentRole = roles[roleIdx];
        
        if (isDeleting) {
          charIdx--;
          morphEl.textContent = currentRole.substring(0, charIdx);
        } else {
          charIdx++;
          morphEl.textContent = currentRole.substring(0, charIdx);
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx === currentRole.length) {
          speed = 2200;
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          speed = 400;
        }

        setTimeout(typeLoop, speed);
      }

      setTimeout(typeLoop, 2000);
    },

    // 5. Scroll Reveal IntersectionObserver
    initScrollReveal() {
      const reveals = document.querySelectorAll('.motion-reveal, .motion-reveal-left, .motion-reveal-right');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, { threshold: 0.1 });

      reveals.forEach(el => observer.observe(el));
    },

    // 6. Animated Count-Up Numbers
    initAnimatedCounters() {
      const counters = document.querySelectorAll('.metric-value');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            const rawText = entry.target.textContent.trim();
            const match = rawText.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
            if (match) {
              const prefix = match[1];
              const targetNum = parseFloat(match[2]);
              const suffix = match[3];
              const isDecimal = match[2].includes('.');
              if (isNaN(targetNum)) return;
              
              let currentNum = 0;
              const duration = 1500;
              const steps = 40;
              const increment = targetNum / steps;
              const intervalTime = duration / steps;

              const counterTimer = setInterval(() => {
                currentNum += increment;
                if (currentNum >= targetNum) {
                  currentNum = targetNum;
                  clearInterval(counterTimer);
                }
                entry.target.textContent = `${prefix}${isDecimal ? currentNum.toFixed(2) : Math.round(currentNum)}${suffix}`;
              }, intervalTime);
            }
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(el => observer.observe(el));
    },

    // 7. Kinetic Background Canvas Mesh
    initKineticCanvas() {
      const canvas = document.getElementById('motion-canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      let mouse = { x: width / 2, y: height / 2 };

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });

      const particleCount = Math.min(Math.floor(width / 20), 65);
      const particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'
        });
      }

      function renderCanvas() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();

          // Connect nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // Cursor attraction line
          const cdx = mouse.x - p.x;
          const cdy = mouse.y - p.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.35 * (1 - cdist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        requestAnimationFrame(renderCanvas);
      }

      renderCanvas();
    }
  };

  // ------------------------------------------------------------------------
  // 1. Navbar Scroll Effect & Mobile Drawer
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Populate Metrics Cards (About Section)
  // ------------------------------------------------------------------------
  const metricsGrid = document.getElementById('metrics-grid');
  if (metricsGrid && portfolioData.personal.metrics) {
    metricsGrid.innerHTML = portfolioData.personal.metrics.map(m => `
      <div class="metric-card glass-panel motion-spotlight motion-tilt motion-reveal">
        <div class="metric-value">${m.value}</div>
        <div class="metric-label">${m.label}</div>
      </div>
    `).join('');
  }

  // ------------------------------------------------------------------------
  // 3. Render Skills Matrix with Tabs
  // ------------------------------------------------------------------------
  const skillsTabs = document.getElementById('skills-tabs');
  const skillsContent = document.getElementById('skills-content');

  function renderSkills(category) {
    const list = portfolioData.skills[category] || [];
    if (!skillsContent) return;

    skillsContent.innerHTML = `
      <div class="skills-grid">
        ${list.map(s => `
          <div class="skill-card motion-spotlight motion-reveal">
            <div class="skill-head">
              <div class="skill-name">
                <i data-lucide="${s.icon}"></i>
                <span>${s.name}</span>
              </div>
              <span class="skill-pct">${s.level}%</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-fill" style="width: ${s.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    MotionPrimitives.initSpotlight();
    MotionPrimitives.initScrollReveal();
  }

  if (skillsTabs) {
    renderSkills('backend'); // Default category

    skillsTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      skillsTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-tab');
      renderSkills(category);
    });
  }

  // ------------------------------------------------------------------------
  // 4. Render Showcase Projects & Filters
  // ------------------------------------------------------------------------
  const projectsGrid = document.getElementById('projects-grid');
  const projectFilters = document.getElementById('project-filters');

  function renderProjects(filterCategory = 'all') {
    if (!projectsGrid) return;

    const filtered = filterCategory === 'all'
      ? portfolioData.projects
      : portfolioData.projects.filter(p => p.category === filterCategory);

    projectsGrid.innerHTML = filtered.map(p => `
      <div class="project-card glass-panel motion-spotlight motion-tilt motion-reveal" data-id="${p.id}">
        <span class="project-badge">${p.badge}</span>
        <div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="tech-tags">
            ${p.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="project-footer">
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link motion-magnetic">
            <i data-lucide="github"></i>
            <span>GitHub Repo</span>
          </a>
          <button class="btn btn-outline view-details-btn motion-magnetic" data-id="${p.id}" style="padding: 6px 14px; font-size: 0.8rem;">
            Details
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
    MotionPrimitives.initSpotlight();
    MotionPrimitives.initTilt();
    MotionPrimitives.initMagnetic();
    MotionPrimitives.initScrollReveal();

    // Attach click listeners to detail buttons
    projectsGrid.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openProjectModal(id);
      });
    });
  }

  if (projectsGrid) {
    renderProjects('all');

    if (projectFilters) {
      projectFilters.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        projectFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-filter');
        renderProjects(cat);
      });
    }
  }

  // ------------------------------------------------------------------------
  // 5. Project Detail Modal Overlay
  // ------------------------------------------------------------------------
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  function openProjectModal(id) {
    const project = portfolioData.projects.find(p => p.id === id);
    if (!project || !modalBody || !modalOverlay) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="project-badge" style="position: static; display: inline-block; margin-bottom: 10px;">${project.badge}</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 10px;">${project.title}</h2>
        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 20px;">${project.longDescription}</p>
        
        <h4 style="font-family: var(--font-heading); margin-bottom: 10px; color: var(--primary-cyan);">Technologies & Frameworks</h4>
        <div class="tech-tags" style="margin-bottom: 25px;">
          ${project.techStack.map(t => `<span class="tag" style="font-size: 0.85rem; padding: 6px 12px;">${t}</span>`).join('')}
        </div>
        
        <div style="display: flex; gap: 15px;">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary motion-magnetic">
            <i data-lucide="github"></i>
            <span>View Source Code on GitHub</span>
          </a>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    MotionPrimitives.initMagnetic();
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
  }

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. Live Code Terminal Preview (VS Code Style)
  // ------------------------------------------------------------------------
  const codeTabs = document.getElementById('code-tabs');
  const codeDisplay = document.getElementById('code-display');
  const copyCodeBtn = document.getElementById('copy-code-btn');
  let currentSnippetId = 'controller';

  function renderCodeTabs() {
    if (!codeTabs) return;

    codeTabs.innerHTML = portfolioData.codeSnippets.map((s, idx) => `
      <button class="code-tab ${idx === 0 ? 'active' : ''} motion-magnetic" data-id="${s.id}">
        ${s.file}
      </button>
    `).join('');

    renderCodeSnippet(portfolioData.codeSnippets[0].id);
    MotionPrimitives.initMagnetic();

    codeTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.code-tab');
      if (!btn) return;

      codeTabs.querySelectorAll('.code-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const id = btn.getAttribute('data-id');
      renderCodeSnippet(id);
    });
  }

  function renderCodeSnippet(id) {
    const snippet = portfolioData.codeSnippets.find(s => s.id === id);
    if (!snippet || !codeDisplay) return;

    currentSnippetId = id;
    codeDisplay.textContent = snippet.code;
  }

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const snippet = portfolioData.codeSnippets.find(s => s.id === currentSnippetId);
      if (snippet) {
        navigator.clipboard.writeText(snippet.code).then(() => {
          const span = copyCodeBtn.querySelector('span');
          const originalText = span.textContent;
          span.textContent = 'Copied!';
          setTimeout(() => {
            span.textContent = originalText;
          }, 2000);
        });
      }
    });
  }

  renderCodeTabs();

  // ------------------------------------------------------------------------
  // 7. Render Experience & Education Timeline
  // ------------------------------------------------------------------------
  const timelineTrack = document.getElementById('timeline-track');
  if (timelineTrack && portfolioData.timeline) {
    timelineTrack.innerHTML = portfolioData.timeline.map(item => `
      <div class="timeline-item motion-reveal">
        <div class="timeline-marker"></div>
        <div class="timeline-card glass-panel motion-spotlight motion-tilt">
          <span class="timeline-period">${item.period}</span>
          <h3 class="timeline-role">${item.role}</h3>
          <h4 class="timeline-org">${item.organization}</h4>
          ${item.score ? `<div class="timeline-score">${item.score}</div>` : ''}
          <p class="timeline-desc">${item.description}</p>
        </div>
      </div>
    `).join('');
  }

  // ------------------------------------------------------------------------
  // 8. Contact Form Handling
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i data-lucide="check-circle"></i><span>Message Sent Successfully!</span>';
      submitBtn.style.background = '#10b981';

      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        if (window.lucide) lucide.createIcons();
      }, 3000);
    });
  }

  // Initialize Motion Primitives Engine
  MotionPrimitives.initAll();
});

