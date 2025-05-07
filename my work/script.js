document.addEventListener('DOMContentLoaded', function () {
  // Navigation toggle for mobile
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.header__nav-link');

  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('header__nav--open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    navMenu.classList.remove('header__nav--open');
    navToggle.setAttribute('aria-expanded', false);
  }));

  // Team slider logic
  const slider = document.querySelector('.team__slider');
  const members = Array.from(document.querySelectorAll('.team__member'));
  const prevBtn = document.querySelector('.team__slider-prev');
  const nextBtn = document.querySelector('.team__slider-next');
  const dotsContainer = document.querySelector('.team__slider-dots');

  let currentSlide = 0;
  let membersPerSlide = getMembersPerSlide();
  let totalSlides = Math.ceil(members.length / membersPerSlide);

  function getMembersPerSlide() {
    return window.innerWidth <= 700 ? 1 : 4;
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.className = 'team__slider-dot';
      if (i === currentSlide) dot.classList.add('team__slider-dot--active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    membersPerSlide = getMembersPerSlide();
    totalSlides = Math.ceil(members.length / membersPerSlide);
    // Hide all
    members.forEach(m => m.style.display = 'none');
    // Show current
    for (let i = 0; i < membersPerSlide; i++) {
      const idx = currentSlide * membersPerSlide + i;
      if (members[idx]) members[idx].style.display = '';
    }
    // Update dots
    createDots();
    // Disable/enable buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
  }

  function goToSlide(slide) {
    currentSlide = Math.max(0, Math.min(slide, totalSlides - 1));
    updateSlider();
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  window.addEventListener('resize', () => {
    const newMembersPerSlide = getMembersPerSlide();
    if (newMembersPerSlide !== membersPerSlide) {
      currentSlide = 0;
      updateSlider();
    }
  });

  // Initialize
  updateSlider();

  // FAQ accordion logic
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq__question');
    btn.addEventListener('click', () => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      } else {
        faqItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });
}); 