// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
if (mobileMenu && navMenu) {
    const toggle = () => {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        const expanded = mobileMenu.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', expanded);
    };
    mobileMenu.addEventListener('click', toggle);
    mobileMenu.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') toggle(); });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });
}

// Lightbox gallery (works with placeholder blocks; replace placeholders with images or background images later)
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lightbox-image');
const lbTitle = document.getElementById('lightbox-title');
const lbDesc = document.getElementById('lightbox-desc');
const lbClose = document.getElementById('lightbox-close');

function openLightbox(title, desc, src) {
    lbTitle.textContent = title || '';
    lbDesc.textContent = desc || '';
    // if an image src is provided, set as background; otherwise use the placeholder styles
    if (src) {
        lbImage.style.backgroundImage = `url('${src}')`;
        lbImage.style.backgroundSize = 'cover';
        lbImage.style.backgroundPosition = 'center';
    } else {
        lbImage.style.backgroundImage = '';
        lbImage.style.background = 'linear-gradient(135deg,#667eea,#764ba2)';
    }
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

// Attach click/keyboard handlers to gallery items
if (gallery) {
    gallery.querySelectorAll('.photo').forEach(item => {
        const title = item.dataset.title || '';
        const desc = item.dataset.desc || '';
        // future: you can add data-src attribute with real image path
        const src = item.dataset.src || null;
        item.addEventListener('click', () => openLightbox(title, desc, src));
        item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(title, desc, src); });
    });
}

if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// Contact form (simple client-side feedback)
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        if (!name || !email) {
            alert('Please enter your name and email.');
            return;
        }

        // If the form has a custom endpoint set (data-endpoint) or global FORM_ENDPOINT, submit to it via fetch.
        const endpoint = form.dataset.endpoint || window.FORM_ENDPOINT || (form.getAttribute('action') && form.getAttribute('action') !== '#') ? form.getAttribute('action') : null;

        if (endpoint) {
            // Send as multipart/form-data so services like Formspree accept it.
            const fd = new FormData(form);
            // ensure form-name exists for Netlify
            if (!fd.has('form-name')) fd.append('form-name', form.getAttribute('id') || 'contactForm');
            fetch(endpoint, { method: 'POST', body: fd })
                .then(resp => {
                    // Some providers return 200/201; Formspree may return 200 with JSON
                    const submitMsg = document.createElement('div');
                    submitMsg.className = 'form-feedback';
                    submitMsg.textContent = 'Thanks! Your message was sent. We will contact you shortly.';
                    form.appendChild(submitMsg);
                    setTimeout(() => { submitMsg.remove(); form.reset(); }, 2500);
                })
                .catch(err => {
                    alert('There was a problem sending your message. Try again or contact directly at katphotographyservices@gmail.com');
                    console.error(err);
                });
            return;
        }

        // If no endpoint: Netlify-style submissions can work when data-netlify="true" and form posts directly (no JS).
        // Fallback to client-side feedback when offline/no endpoint
        const submitMsg = document.createElement('div');
        submitMsg.className = 'form-feedback';
        submitMsg.textContent = 'Thanks! Your message was received locally. Configure an endpoint to accept submissions.';
        form.appendChild(submitMsg);
        setTimeout(() => { submitMsg.remove(); form.reset(); }, 2500);
    });
}

// Theme toggle: persist preference in localStorage
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(theme){
    if(theme === 'dark'){
        document.documentElement.setAttribute('data-theme','dark');
        if(themeToggle) themeToggle.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        if(themeToggle) themeToggle.textContent = '🌙';
    }
}
// initialize
const savedTheme = localStorage.getItem('kat_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

if(themeToggle){
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('kat_theme', next);
    });
}

// Update lightbox to prefer img src if data-src missing
function openLightbox(title, desc, src) {
    lbTitle.textContent = title || '';
    lbDesc.textContent = desc || '';
    if(!src){
        // try to find an <img> inside the clicked element (caller should pass it, but fallback here)
        const active = document.activeElement;
        if(active && active.tagName === 'DIV' && active.querySelector('img')){
            src = active.querySelector('img').getAttribute('src');
        }
    }
    if (src) {
        lbImage.style.backgroundImage = `url('${src}')`;
        lbImage.style.backgroundSize = 'cover';
        lbImage.style.backgroundPosition = 'center';
        lbImage.style.backgroundRepeat = 'no-repeat';
    } else {
        lbImage.style.backgroundImage = '';
        lbImage.style.background = 'linear-gradient(135deg,#667eea,#764ba2)';
    }
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}