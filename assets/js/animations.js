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
    'fade-down': 'animate-fade-down',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'zoom-in': 'animate-zoom-in',
    'zoom-out': 'animate-zoom-out',
    'rotate-in': 'animate-rotate-in',
    'flip-left': 'animate-flip-left',
    'flip-right': 'animate-flip-right',
    'bounce': 'animate-bounce',
    'pulse': 'animate-pulse',
    'shake': 'animate-shake',
    'rubber-band': 'animate-rubber-band'
  };

  // Progressive loading animations
  let animationQueue = [];
  let isProcessingQueue = false;

  // Initialize animations on page load
  function initAnimations() {
    // Add animation styles to head
    addAnimationStyles();

    // Initialize Hero animations first
    initHeroAnimations();

    // Observe all elements with data-aos attribute
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    elementsToAnimate.forEach((element, index) => {
      const animationType = element.getAttribute('data-aos');
      const delay = element.getAttribute('data-aos-delay') || (index * 100);
      
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
    
    // Initialize progressive content loading
    initProgressiveAnimations();
    
    // Initialize scroll-triggered animations
    initScrollAnimations();
    
    // Initialize data-loaded animations
    initDataLoadedAnimations();
  }

  // Initialize Hero animations after page load
  function initHeroAnimations() {
    const hero = document.querySelector('#hero');
    const heroTitle = hero?.querySelector('h1.hero-title-delayed');
    const heroSubtitle = hero?.querySelector('h2');
    const heroText = hero?.querySelector('p');
    const heroButtons = hero?.querySelector('.text-center');
    const heroImage = hero?.querySelector('.hero-img img');
    
    if (!hero) return;

    // Delay hero title animation until after page load
    setTimeout(() => {
      if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        heroTitle.style.transition = 'all 1s ease-out';
        
        // Add typewriter effect to the title span
        setTimeout(() => {
          const typewriterSpan = heroTitle.querySelector('.typewriter-text');
          if (typewriterSpan) {
            typewriterSpan.classList.add('animate-type-reveal');
          }
        }, 500);
      }
    }, 1000); // Wait 1 second after page load

    // Particle effect background
    createParticleEffect(hero);
    
    // Floating animation for hero image with mouse tracking
    if (heroImage) {
      initMouseParallax(heroImage);
    }
    
    // Button hover enhancements
    const buttons = heroButtons?.querySelectorAll('a');
    buttons?.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px) scale(1.05)';
        button.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
      });
    });
  }

  // Create floating particles in hero background
  function createParticleEffect(container) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(230, 167, 44, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        animation: floatParticle ${Math.random() * 10 + 5}s infinite linear;
        z-index: 0;
      `;
      container.appendChild(particle);
    }
    
    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent += `
      @keyframes floatParticle {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Mouse parallax effect
  function initMouseParallax(element) {
    document.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * 0.01;
      const deltaY = (e.clientY - centerY) * 0.01;
      
      element.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px) rotate(${deltaX * 0.1}deg)`;
    });
  }

  // Reveal text word by word
  function revealTextByWords(element, delay) {
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = '';
    
    words.forEach((word, index) => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = 'all 0.6s ease-out';
      element.appendChild(span);
      
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, index * delay);
    });
  }

  // Progressive animations for content loading
  function initProgressiveAnimations() {
    // Animate sections progressively
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.style.transition = 'all 0.6s ease-out';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Stagger animate navigation items
    const navItems = document.querySelectorAll('.navbar ul li');
    navItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'all 0.4s ease-out';
      }, index * 100 + 500);
    });

    // Animate logo with typewriter effect
    const logoText = document.querySelector('.logo span');
    if (logoText) {
      logoText.classList.add('typewriter');
      setTimeout(() => {
        logoText.classList.add('animate-in');
      }, 800);
    }
  }

  // Scroll-triggered advanced animations
  function initScrollAnimations() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
      lastScrollTop = scrollTop;

      // Parallax effect for hero background
      const hero = document.querySelector('.hero');
      if (hero && scrollTop < window.innerHeight) {
        hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
      }

      // Reveal elements on scroll with direction-based animations
      const revealElements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('revealed');
          if (scrollDirection === 'down') {
            element.classList.add('animate-slide-up');
          } else {
            element.classList.add('animate-slide-down');
          }
          element.classList.add('animate-in');
        }
      });
    });
  }

  // Data-loaded specific animations
  function initDataLoadedAnimations() {
    // Simulate data loading completion
    setTimeout(() => {
      triggerDataLoadedAnimations();
    }, 1500);
  }

  function triggerDataLoadedAnimations() {
    // Animate all cards with stagger effect
    const cards = document.querySelectorAll('.services_portfolio-card, .service-card, .pricing .box');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-zoom-in', 'animate-in');
        card.style.animationDelay = '0s';
      }, index * 150);
    });

    // Animate numbers/counters
    animateNumbers();
    
    // Animate charts or progress bars
    animateProgressBars();
    
    // Text reveal animations
    animateTextReveal();
    
    // Icon animations
    animateIcons();
    
    // Image loading animations
    animateImageLoading();
  }

  // Animate numbers and counters
  function animateNumbers() {
    const numbers = document.querySelectorAll('.count-box span, .pricing .price');
    numbers.forEach(number => {
      const finalValue = number.textContent.replace(/\D/g, '');
      if (finalValue) {
        animateCountUp(number, 0, parseInt(finalValue), 2000);
      }
    });
  }

  function animateCountUp(element, start, end, duration) {
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, start, end - start, duration);
      
      element.textContent = Math.floor(run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        element.textContent = end;
      }
    }
    
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
  }

  // Animate progress bars
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar, .skill .progress-bar-wrap');
    progressBars.forEach((bar, index) => {
      setTimeout(() => {
        const width = bar.getAttribute('data-width') || '90%';
        bar.style.width = width;
        bar.style.transition = 'width 2s ease-out';
      }, index * 300);
    });
  }

  // Text reveal animations
  function animateTextReveal() {
    const headings = document.querySelectorAll('h1, h2.section-heading, .hero h1');
    headings.forEach((heading, index) => {
      setTimeout(() => {
        heading.classList.add('text-reveal', 'animate-in');
      }, index * 500 + 1000);
    });
  }

  // Icon animations
  function animateIcons() {
    const icons = document.querySelectorAll('.service-box .icon, .feature-box i, .info-box i');
    icons.forEach((icon, index) => {
      setTimeout(() => {
        icon.classList.add('animate-rotate-in', 'animate-in');
      }, index * 200 + 800);
    });
  }

  // Image loading animations with lazy loading
  function animateImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('animate-zoom-in', 'animate-in');
      });
    });
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

      @keyframes fadeDown {
        from {
          opacity: 0;
          transform: translateY(-30px);
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

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes zoomIn {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes zoomOut {
        from {
          opacity: 0;
          transform: scale(1.2);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes rotateIn {
        from {
          opacity: 0;
          transform: rotate(-180deg) scale(0.8);
        }
        to {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }
      }

      @keyframes flipLeft {
        from {
          opacity: 0;
          transform: perspective(400px) rotateY(-90deg);
        }
        to {
          opacity: 1;
          transform: perspective(400px) rotateY(0deg);
        }
      }

      @keyframes flipRight {
        from {
          opacity: 0;
          transform: perspective(400px) rotateY(90deg);
        }
        to {
          opacity: 1;
          transform: perspective(400px) rotateY(0deg);
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

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }

      @keyframes shake {
        0%, 100% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(-5px);
        }
        75% {
          transform: translateX(5px);
        }
      }

      @keyframes rubberBand {
        from {
          transform: scale3d(1, 1, 1);
        }
        30% {
          transform: scale3d(1.25, 0.75, 1);
        }
        40% {
          transform: scale3d(0.75, 1.25, 1);
        }
        50% {
          transform: scale3d(1.15, 0.85, 1);
        }
        65% {
          transform: scale3d(0.95, 1.05, 1);
        }
        75% {
          transform: scale3d(1.05, 0.95, 1);
        }
        to {
          transform: scale3d(1, 1, 1);
        }
      }

      /* Text reveal animation */
      @keyframes textReveal {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      @keyframes typewriter {
        from {
          width: 0;
        }
        to {
          width: 100%;
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

      .animate-fade-down {
        opacity: 0;
        transform: translateY(-30px);
      }

      .animate-fade-down.animate-in {
        animation: fadeDown 0.8s ease-out forwards;
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

      .animate-slide-up {
        opacity: 0;
        transform: translateY(40px);
      }

      .animate-slide-up.animate-in {
        animation: slideUp 0.8s ease-out forwards;
      }

      .animate-slide-down {
        opacity: 0;
        transform: translateY(-40px);
      }

      .animate-slide-down.animate-in {
        animation: slideDown 0.8s ease-out forwards;
      }

      .animate-zoom-in {
        opacity: 0;
        transform: scale(0.8);
      }

      .animate-zoom-in.animate-in {
        animation: zoomIn 0.8s ease-out forwards;
      }

      .animate-zoom-out {
        opacity: 0;
        transform: scale(1.2);
      }

      .animate-zoom-out.animate-in {
        animation: zoomOut 0.8s ease-out forwards;
      }

      .animate-rotate-in {
        opacity: 0;
        transform: rotate(-180deg) scale(0.8);
      }

      .animate-rotate-in.animate-in {
        animation: rotateIn 1s ease-out forwards;
      }

      .animate-flip-left {
        opacity: 0;
        transform: perspective(400px) rotateY(-90deg);
      }

      .animate-flip-left.animate-in {
        animation: flipLeft 0.8s ease-out forwards;
      }

      .animate-flip-right {
        opacity: 0;
        transform: perspective(400px) rotateY(90deg);
      }

      .animate-flip-right.animate-in {
        animation: flipRight 0.8s ease-out forwards;
      }

      .animate-bounce {
        animation: bounce 2s infinite;
      }

      .animate-bounce.animate-in {
        animation: bounce 2s infinite;
      }

      .animate-pulse {
        animation: pulse 2s infinite;
      }

      .animate-shake {
        animation: shake 0.8s ease-out;
      }

      .animate-rubber-band {
        animation: rubberBand 1s;
      }

      /* Progressive reveal animations */
      .text-reveal {
        overflow: hidden;
        white-space: nowrap;
      }

      .text-reveal.animate-in {
        animation: textReveal 2s steps(40) forwards;
      }

      .typewriter {
        overflow: hidden;
        white-space: nowrap;
        border-right: 2px solid var(--secondary-color);
      }

      .typewriter.animate-in {
        animation: typewriter 3s steps(40) forwards, blink-cursor 1s infinite;
      }

      @keyframes blink-cursor {
        50% {
          border-color: transparent;
        }
      }

      /* Stagger animations */
      .stagger-animation > * {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
      }

      .stagger-animation.animate-in > * {
        opacity: 1;
        transform: translateY(0);
      }

      .stagger-animation.animate-in > *:nth-child(1) { transition-delay: 0.1s; }
      .stagger-animation.animate-in > *:nth-child(2) { transition-delay: 0.2s; }
      .stagger-animation.animate-in > *:nth-child(3) { transition-delay: 0.3s; }
      .stagger-animation.animate-in > *:nth-child(4) { transition-delay: 0.4s; }
      .stagger-animation.animate-in > *:nth-child(5) { transition-delay: 0.5s; }
      .stagger-animation.animate-in > *:nth-child(6) { transition-delay: 0.6s; }
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

  // Additional initialization after full page load for delayed hero title
  window.addEventListener('load', function() {
    const heroTitle = document.querySelector('h1.hero-title-delayed');
    if (heroTitle) {
      setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        heroTitle.style.transition = 'all 1.2s ease-out';
        
        // Add typewriter effect after title appears
        setTimeout(() => {
          const typewriterSpan = heroTitle.querySelector('.typewriter-text');
          if (typewriterSpan) {
            typewriterSpan.classList.add('animate-type-reveal');
          }
        }, 800);
      }, 500);
    }
  });

})();
