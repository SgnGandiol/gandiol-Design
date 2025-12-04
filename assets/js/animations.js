/**
 * Custom Animations - Load after page ready
 * Replaces AOS with smooth scroll animations
 */

(function() {
  "use strict";

  // Animation observer configuration
  const observerConfig = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerConfig);

  // Animation classes and their styles
  const animations = {
    'fade-up': 'animate-fade-up',
    'fade-in': 'animate-fade-in',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    'zoom-in': 'animate-zoom-in',
    'bounce': 'animate-bounce'
  };

  // Initialize animations on page load
  function initAnimations() {
    // Add animation styles to head
    addAnimationStyles();

    // Observe all elements with data-aos attribute
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    elementsToAnimate.forEach(element => {
      const animationType = element.getAttribute('data-aos');
      const delay = element.getAttribute('data-aos-delay') || '0';
      
      // Set animation type
      element.classList.add(animations[animationType] || 'animate-fade-in');
      
      // Set delay
      if (delay !== '0') {
        element.style.animationDelay = (parseInt(delay) / 1000) + 's';
      }
      
      // Observe element
      observer.observe(element);
    });

    // Animate header on scroll
    animateHeader();
  }

  // Add animation keyframes to document
  function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes slideLeft {
        from {
          opacity: 0;
          transform: translateX(-40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideRight {
        from {
          opacity: 0;
          transform: translateX(40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes zoomIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      /* Animation classes */
      .animate-fade-up {
        opacity: 0;
        transform: translateY(30px);
      }

      .animate-fade-up.animate-in {
        animation: fadeUp 0.8s ease-out forwards;
      }

      .animate-fade-in {
        opacity: 0;
      }

      .animate-fade-in.animate-in {
        animation: fadeIn 0.8s ease-out forwards;
      }

      .animate-slide-left {
        opacity: 0;
        transform: translateX(-40px);
      }

      .animate-slide-left.animate-in {
        animation: slideLeft 0.8s ease-out forwards;
      }

      .animate-slide-right {
        opacity: 0;
        transform: translateX(40px);
      }

      .animate-slide-right.animate-in {
        animation: slideRight 0.8s ease-out forwards;
      }

      .animate-zoom-in {
        opacity: 0;
        transform: scale(0.9);
      }

      .animate-zoom-in.animate-in {
        animation: zoomIn 0.8s ease-out forwards;
      }

      .animate-bounce {
        animation: bounce 2s infinite;
      }

      .animate-bounce.animate-in {
        animation: bounce 2s infinite;
      }
    `;
    document.head.appendChild(style);
  }

  // Animate header on scroll
  function animateHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  }

  // Add hover animations for buttons
  function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-get-started, .btn-read-more, .btn-buy');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
      });
      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // Add portfolio hover animations
  function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-wrap');
    portfolioItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        if (img) img.style.transform = 'scale(1.05)';
      });
      item.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
      });
    });
  }

  // Add team member hover animations
  function initTeamAnimations() {
    const teamMembers = document.querySelectorAll('.team .member');
    teamMembers.forEach(member => {
      member.addEventListener('mouseenter', function() {
        const img = this.querySelector('.member-img img');
        if (img) img.style.transform = 'scale(1.1)';
        const social = this.querySelector('.social');
        if (social) social.style.opacity = '1';
      });
      member.addEventListener('mouseleave', function() {
        const img = this.querySelector('.member-img img');
        if (img) img.style.transform = 'scale(1)';
        const social = this.querySelector('.social');
        if (social) social.style.opacity = '0';
      });
    });
  }

  // Add testimonial swipe animations
  function initTestimonialAnimations() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    testimonialItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
      });
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
      });
    });
  }

  // Counter animation (count up numbers)
  function animateCounters() {
    const counters = document.querySelectorAll('.count-box span');
    const speed = 200;

    const runCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-purecounter'));
      if (!target) return;

      let current = 0;
      const increment = target / speed;

      const updateCount = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current).toString().padStart(2, '0');
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      updateCount();
    };

    // Observe counters section
    const countsSection = document.querySelector('.counts');
    if (countsSection) {
      const countsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            counters.forEach(counter => {
              animateCounters();
            });
            countsObserver.unobserve(entry.target);
          }
        });
      }, observerConfig);

      countsObserver.observe(countsSection);
    }
  }

  // Initialize all animations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(initAnimations, 100);
      initButtonAnimations();
      initPortfolioAnimations();
      initTeamAnimations();
      initTestimonialAnimations();
      animateCounters();
    });
  } else {
    setTimeout(initAnimations, 100);
    initButtonAnimations();
    initPortfolioAnimations();
    initTeamAnimations();
    initTestimonialAnimations();
    animateCounters();
  }

})();
