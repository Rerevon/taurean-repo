// Initialize AOS (Animate On Scroll) Library
AOS.init({
  duration: 800,
  once: true,
  offset: 100
});

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('backToTop');

// Navigation functionality
class Navigation {
  constructor() {
    this.init();
  }

  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleSmoothScrolling();
    this.highlightActiveSection();
  }

  // Handle navbar background change on scroll
  handleScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTopBtn.classList.add('visible');
      } else {
        navbar.classList.remove('scrolled');
        backToTopBtn.classList.remove('visible');
      }
    });
  }

  // Handle mobile menu toggle
  handleMobileMenu() {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Handle smooth scrolling for anchor links
  handleSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Highlight active section in navigation
  highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 120;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
}

// Back to top functionality
class BackToTop {
  constructor() {
    this.init();
  }

  init() {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Loading animations for images
class ImageLoader {
  constructor() {
    this.init();
  }

  init() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      if (img.complete) {
        this.handleImageLoad(img);
      } else {
        img.addEventListener('load', () => this.handleImageLoad(img));
        img.addEventListener('error', () => this.handleImageError(img));
      }
    });
  }

  handleImageLoad(img) {
    img.classList.add('fade-in');
    img.style.opacity = '1';
  }

  handleImageError(img) {
    // Fallback for broken images
    img.style.display = 'none';
    console.warn(`Failed to load image: ${img.src}`);
  }
}

// Statistics counter animation
class StatsCounter {
  constructor() {
    this.init();
  }

  init() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateNumber(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    statNumbers.forEach(number => {
      observer.observe(number);
    });
  }

  animateNumber(element) {
    const finalNumber = element.textContent.replace(/\D/g, '');
    const increment = finalNumber / 50;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= finalNumber) {
        element.textContent = element.textContent.replace(finalNumber, finalNumber);
        clearInterval(timer);
      } else {
        const displayNumber = Math.floor(current);
        element.textContent = element.textContent.replace(/\d+/, displayNumber);
      }
    }, 30);
  }
}

// Performance optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.optimizeScrollEvents();
  }

  lazyLoadImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.remove('loading');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  optimizeScrollEvents() {
    let ticking = false;

    function updateScrollEffects() {
      // Add any scroll-based effects here
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    });
  }
}

// Contact form enhancement (if needed in future)
class ContactForm {
  constructor() {
    this.init();
  }

  init() {
    // Enhancement for future contact forms
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', this.handleSubmit.bind(this));
    });
  }

  handleSubmit(e) {
    // Add form validation and submission logic here
    console.log('Form submitted');
  }
}

// Theme toggle (optional feature)
class ThemeToggle {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme();
    // Could add theme toggle button in future
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }
}

// Error handling and fallbacks
class ErrorHandler {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('error', this.handleError.bind(this));
    window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
  }

  handleError(event) {
    console.error('JavaScript error:', event.error);
    // Could send error reports to analytics
  }

  handlePromiseRejection(event) {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
  }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all classes
  new Navigation();
  new BackToTop();
  new ImageLoader();
  new StatsCounter();
  new PerformanceOptimizer();
  new ContactForm();
  new ThemeToggle();
  new ErrorHandler();

  // Add loading state removal
  document.body.classList.add('loaded');

  // Console message for developers
  console.log('%c🎓 The Taurean Schools - Website Loaded Successfully!', 
    'color: #4ebb4e; font-size: 16px; font-weight: bold;');
  console.log('%cDeveloped with ❤️ for educational excellence', 
    'color: #7f8c8d; font-style: italic;');
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Export functions for global access if needed
window.TaureanSchool = {
  Navigation,
  BackToTop,
  ImageLoader,
  StatsCounter,
  PerformanceOptimizer,
  ContactForm,
  ThemeToggle,
  ErrorHandler
};
