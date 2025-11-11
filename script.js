// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved user preference or use color scheme preference
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}

// Toggle dark/light mode
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const closeNav = document.querySelector('.close-nav');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.add('active');
});

closeNav.addEventListener('click', () => {
    navLinks.classList.remove('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
    });
});

// Animate elements when scrolled into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .skills-bar');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }
    });
};

// Enhanced scroll animations with IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.fade-in, .skills-bar').forEach(el => {
    observer.observe(el);
});

window.addEventListener('load', () => {
    document.querySelectorAll('.fade-in, .skills-bar').forEach(el => {
        el.classList.add('animate');
    });
});