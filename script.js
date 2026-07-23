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
      <div class="metric-card glass-panel">
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
          <div class="skill-card">
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
      <div class="project-card glass-panel" data-id="${p.id}">
        <span class="project-badge">${p.badge}</span>
        <div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="tech-tags">
            ${p.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="project-footer">
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link">
            <i data-lucide="github"></i>
            <span>GitHub Repo</span>
          </a>
          <button class="btn btn-outline view-details-btn" data-id="${p.id}" style="padding: 6px 14px; font-size: 0.8rem;">
            Details
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();

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
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <i data-lucide="github"></i>
            <span>View Source Code on GitHub</span>
          </a>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
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
      <button class="code-tab ${idx === 0 ? 'active' : ''}" data-id="${s.id}">
        ${s.file}
      </button>
    `).join('');

    renderCodeSnippet(portfolioData.codeSnippets[0].id);

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
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-card glass-panel">
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
});
