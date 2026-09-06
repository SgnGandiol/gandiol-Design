# Refonte visuelle - Gandiol Design

## Référence
https://www.authenticom.com/product/recordrecharge

## Direction retenue
- **Thème** : Hybride sombre/clair par section (alternance de sections noir/anthracite et sections claires, comme la référence)
- **Typographie** : titres XXL, condensés, tout en majuscules, très impactants
- **Accent** : une seule couleur d'accent forte (au lieu de vert+or partout actuellement)
- **Structure** : storytelling par sections plein écran (problème → preuve → services → portfolio avant/après → CTA)
- **Portfolio** : présenté façon "avant/après" (comme les cartes données sales/propres de la référence)
- **Assets réutilisables** : photos portfolio existantes (`assets/img/portfolio/*.webp`) + photo équipe (`assets/img/team/01.jpg`) — pas besoin de nouvelle séance photo
- **Animations** : CSS pur uniquement (pas de JS), cohérent avec le nettoyage déjà fait

## Étapes

- [x] Maquette (artifact HTML) : hero + 2-3 sections clés dans le nouveau style, avec les vrais contenus/textes de Gandiol Design
- [x] Validation de la maquette (direction hybride sombre/clair retenue)
- [x] Refonte hero (typo XXL, accent unique, CTA, carte "preuve" au lieu de l'illustration générique)
- [x] Refonte section "à qui s'adresse Gandiol Design" (grille personas numérotée)
- [x] Refonte section Services (cartes façon fiche technique, 6 métiers)
- [x] Section réalisations en grille sombre (vraies images portfolio)
- [x] Section preuve/chiffres ("Ce qui nous distingue")
- [x] CTA final plein écran + footer sombre restructuré
- [x] Vérification mobile (menu hamburger testé fonctionnel, empilement des sections, pas de débordement horizontal)
- [x] `index.html` et `style.css` entièrement réécrits (plus de Bootstrap/AOS/Swiper/GLightbox/Isotope/PureCounter/Remixicon — tout était mort code, ~38KB de JS/CSS inutile supprimés)
- [x] Rebuild `style.min.css` (13,8 Ko minifié, contre 38 Ko avant)

## Notes techniques
- Polices : Bebas Neue (titres), Literata (texte), Space Mono (labels/eyebrows/chiffres)
- Emojis retirés des titres, remplacés par le système de numérotation/eyebrow Space Mono
- `main.js` nettoyé des appels aux librairies supprimées (Swiper, Isotope, GLightbox, PureCounter, AOS)
- Vendor folders (bootstrap, swiper, glightbox, isotope-layout, purecounter, remixicon, aos) laissés sur disque mais plus référencés — suppression possible en nettoyage futur si souhaité
- Reste ouvert : le chevauchement occasionnel du bouton WhatsApp flottant avec un CTA en bas de hero sur mobile (mineur, comportement standard des boutons flottants)

## Bugs déjà corrigés (avant la refonte)
- [x] Menu mobile inaccessible (toggle hors écran)
- [x] Lien "Contact" mort (pointait vers une section supprimée)
- [x] `style.min.css` périmé par rapport à `style.css`
- [x] Script GLightbox pointant vers un fichier inexistant
- [x] Suppression du moteur d'animation JS custom → remplacé par CSS pur (AOS, typewriter, hero flottant, pulse/bounce)
