/**
 * Gooby Tech - Client Scripts
 */

(function () {
  'use strict';

  // 1. Theme Management
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const expanded = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // 3. Tech Stack Tab Switching
  const tabButtons = document.querySelectorAll('.tech-tab-btn');
  const techItems = document.querySelectorAll('.tech-item');

  if (tabButtons.length > 0 && techItems.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        techItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Code Block Copy Buttons
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach(pre => {
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.innerText = 'Copy';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    
    // Inline styling for the copy button
    copyBtn.style.position = 'absolute';
    copyBtn.style.top = '0.5rem';
    copyBtn.style.right = '0.5rem';
    copyBtn.style.fontSize = '0.75rem';
    copyBtn.style.padding = '0.2rem 0.5rem';
    copyBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    copyBtn.style.color = '#94a3b8';
    copyBtn.style.border = '1px solid rgba(255, 255, 255, 0.15)';
    copyBtn.style.borderRadius = '4px';
    copyBtn.style.cursor = 'pointer';

    copyBtn.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      const textToCopy = code ? code.innerText : pre.innerText;
      try {
        await navigator.clipboard.writeText(textToCopy);
        copyBtn.innerText = 'Copied!';
        copyBtn.style.color = '#10B981';
        setTimeout(() => {
          copyBtn.innerText = 'Copy';
          copyBtn.style.color = '#94a3b8';
        }, 2000);
      } catch (err) {
        copyBtn.innerText = 'Error';
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(copyBtn);
  });

  // 5. Contact Form Submission (if on contact page)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const action = contactForm.getAttribute('action');
      if (!action || action === '#' || action === '') {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value || '';
        const email = document.getElementById('contact-email')?.value || '';
        const project = document.getElementById('contact-details')?.value || '';
        const service = document.getElementById('contact-service')?.value || 'Engineering Inquiry';

        const mailtoUrl = `mailto:hello@goobytech.com?subject=${encodeURIComponent(`[New Project Inquiry] ${service} - ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nProject Details:\n${project}`)}`;
        window.location.href = mailtoUrl;
      }
    });
  }

})();
