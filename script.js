/* =============================================
   DEV PATEL PORTFOLIO — script.js
   Features: Dark mode | Typewriter | Scroll
   Animations | Skill bars | Project filter
   Contact form validation | GitHub API
============================================= */

/* ========================
   THEME (DARK MODE)
======================== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        themeIcon.className = 'fa-solid fa-moon';
    }
}

/* ========================
   SCROLL PROGRESS BAR
======================== */
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
}, { passive: true });

/* ========================
   NAVBAR SCROLL EFFECT
======================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

/* ========================
   ACTIVE NAV LINK ON SCROLL
======================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ========================
   HAMBURGER MENU
======================== */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ========================
   TYPEWRITER EFFECT
======================== */
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'Aspiring AI/ML Engineer',
    'Web Developer',
    'Backend Developer',
    'ML Enthusiast',
    'Problem Solver',
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

// Add cursor span
const cursor = document.createElement('span');
cursor.className = 'typewriter-cursor';
typewriterEl.parentElement.appendChild(cursor);

function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 50 : 90;

    if (!isDeleting && charIdx === currentPhrase.length) {
        speed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 300;
    }

    setTimeout(type, speed);
}

setTimeout(type, 800);

/* ========================
   SCROLL REVEAL
======================== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ========================
   ANIMATED SKILL BARS
======================== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target;
            const width = fill.getAttribute('data-width');
            fill.style.width = width + '%';
            skillObserver.unobserve(fill);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ========================
   SKILLS TABS FILTER
======================== */
const skillTabs = document.querySelectorAll('.skill-tab');
const skillItems = document.querySelectorAll('.skill-item');

skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.getAttribute('data-target');

        skillItems.forEach(item => {
            const categories = item.getAttribute('data-category') || '';
            if (target === 'all' || categories.includes(target)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        // Trigger skill bar animation for newly visible items
        document.querySelectorAll('.skill-item:not(.hidden) .skill-fill').forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.width = '0%';
            setTimeout(() => { fill.style.width = width + '%'; }, 100);
        });
    });
});

/* ========================
   PROJECTS FILTER
======================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cardFilter = card.getAttribute('data-filter') || '';
            if (filter === 'all' || cardFilter === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.4s ease both';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

/* ========================
   BACK TO TOP BUTTON
======================== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========================
   CONTACT FORM VALIDATION
======================== */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitIcon = document.getElementById('submitIcon');
const formSuccess = document.getElementById('formSuccess');

function validateField(id, errorId, validator) {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);
    const group = input.closest('.form-group');
    const msg = validator(input.value.trim());

    if (msg) {
        group.classList.add('error');
        error.textContent = msg;
        return false;
    } else {
        group.classList.remove('error');
        error.textContent = '';
        return true;
    }
}

const validators = {
    contactName: v => !v ? 'Name is required.' : v.length < 2 ? 'Name is too short.' : null,
    contactEmail: v => !v ? 'Email is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email.' : null,
    contactSubject: v => !v ? 'Subject is required.' : null,
    contactMessage: v => !v ? 'Message is required.' : v.length < 10 ? 'Message is too short (min 10 chars).' : null,
};

// Live validation on blur
[
    ['contactName', 'nameError'],
    ['contactEmail', 'emailError'],
    ['contactSubject', 'subjectError'],
    ['contactMessage', 'messageError'],
].forEach(([id, errId]) => {
    document.getElementById(id).addEventListener('blur', () => {
        validateField(id, errId, validators[id]);
    });
    document.getElementById(id).addEventListener('input', () => {
        const group = document.getElementById(id).closest('.form-group');
        if (group.classList.contains('error')) {
            validateField(id, errId, validators[id]);
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField('contactName', 'nameError', validators['contactName']);
    const isEmailValid = validateField('contactEmail', 'emailError', validators['contactEmail']);
    const isSubjectValid = validateField('contactSubject', 'subjectError', validators['contactSubject']);
    const isMessageValid = validateField('contactMessage', 'messageError', validators['contactMessage']);

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) return;

    // Simulate sending
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitIcon.className = 'fa-solid fa-spinner fa-spin';

    setTimeout(() => {
        submitBtn.disabled = false;
        submitText.textContent = 'Send Message';
        submitIcon.className = 'fa-solid fa-paper-plane';
        formSuccess.classList.add('show');
        contactForm.reset();

        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }, 1500);
});

/* ========================
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
======================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = target.offsetTop - (window.innerWidth <= 900 ? 68 : 68);
        window.scrollTo({ top: offset, behavior: 'smooth' });
    });
});

/* ========================
   GITHUB API (Optional)
   Replace 'devpatel' with real username
======================== */
async function fetchGitHubData(username) {
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) return;
        const data = await res.json();

        const ghname = document.getElementById('gh-name');
        const ghbio = document.getElementById('gh-bio');
        const ghrepos = document.getElementById('gh-repos');
        const ghfollows = document.getElementById('gh-followers');
        const ghfollowing = document.getElementById('gh-following');

        if (ghname) ghname.textContent = '@' + data.login;
        if (ghbio && data.bio) ghbio.textContent = data.bio;
        if (ghrepos) ghrepos.textContent = data.public_repos;
        if (ghfollows) ghfollows.textContent = data.followers;
        if (ghfollowing) ghfollowing.textContent = data.following;
    } catch (err) {
        // Silently fail — placeholder values remain
    }
}

fetchGitHubData('dev18sep-del');

/* ========================
   RESUME — Opens resume.html
======================== */
const resumeBtn = document.getElementById('resumeBtn');
if (resumeBtn) {
    resumeBtn.setAttribute('href', 'resume.html');
    resumeBtn.setAttribute('target', '_blank');
}

/* ========================
   HERO BADGE — subtle entrance
======================== */
window.addEventListener('load', () => {
    document.querySelectorAll('.fade-in').forEach((el, i) => {
        el.style.animationDelay = (i * 0.1) + 's';
    });
});
