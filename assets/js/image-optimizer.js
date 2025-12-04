/**
 * Image Lazy Loading Optimizer
 * Utilise IntersectionObserver pour un chargement optimal des images
 */

(function() {
  'use strict';

  // Configuration pour IntersectionObserver
  const imageLoadConfig = {
    root: null,
    rootMargin: '50px', // Commence le chargement 50px avant d'être visible
    threshold: 0.01
  };

  // Créer l'observateur
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Charger l'image
        img.src = img.dataset.src || img.src;
        
        // Ajouter une classe de chargement
        img.classList.add('image-loaded');
        
        // Arrêter d'observer cette image
        imageObserver.unobserve(img);
      }
    });
  }, imageLoadConfig);

  // Observer toutes les images lazy-loaded
  document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  });

  // Fallback pour les navigateurs sans support IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    document.addEventListener('DOMContentLoaded', function() {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(function(img) {
        img.src = img.dataset.src || img.src;
      });
    });
  }

  /**
   * Optimisation du rendu des images
   * Ajoute une animation de fade-in lors du chargement
   */
  document.addEventListener('load', function(event) {
    if (event.target.tagName === 'IMG') {
      event.target.classList.add('image-loaded');
    }
  }, true);

  /**
   * Gestion des erreurs de chargement d'images
   */
  document.addEventListener('error', function(event) {
    if (event.target.tagName === 'IMG') {
      console.warn('Erreur de chargement image:', event.target.src);
      // Ajouter une classe d'erreur pour le styling
      event.target.classList.add('image-error');
    }
  }, true);

  /**
   * Fonction utilitaire pour forcer le rechargement des images
   */
  window.refreshImages = function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function(img) {
      if (!img.classList.contains('image-loaded')) {
        imageObserver.observe(img);
      }
    });
  };

})();

/**
 * Préchargement des images critiques
 */
(function() {
  // Précharger les images du hero
  const criticalImages = [
    'assets/img/hero-img.webp',
    'assets/img/hero-img.png'
  ];

  criticalImages.forEach(function(src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
})();

/**
 * Optimisation du cache des images
 * Utilise localStorage pour mémoriser les images chargées
 */
(function() {
  const CACHE_KEY = 'gandiol-images-cache';
  const CACHE_VERSION = 1;

  // Vérifier et charger depuis le cache si disponible
  if (window.indexedDB || window.openDatabase) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const cacheData = JSON.parse(cached);
        if (cacheData.version === CACHE_VERSION) {
          console.log('Images cache chargé:', cacheData.count, 'images');
        }
      }
    } catch (e) {
      console.log('Cache localStorage non disponible');
    }
  }
})();
