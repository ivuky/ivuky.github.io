// ========== GALLERY SLIDER (only if elements exist) ==========
if (document.getElementById('prevSlide') && document.getElementById('nextSlide')) {
    const galleryImages = [
        "img/slider/1.PNG",
        "img/slider/2.PNG",
        "img/slider/3.PNG",
        "img/slider/4.PNG",
        "img/slider/5.PNG",
        "img/slider/6.PNG",
        "img/slider/7.PNG",
        "img/slider/8.PNG"
    ];

    let currentIdx = 2;
    const leftImgEl = document.getElementById('leftImg');
    const centerImgEl = document.getElementById('centerImg');
    const rightImgEl = document.getElementById('rightImg');
    const leftItemDiv = document.querySelector('.gallery-item[data-role="left"]');
    const centerItemDiv = document.querySelector('.gallery-item[data-role="center"]');
    const rightItemDiv = document.querySelector('.gallery-item[data-role="right"]');

    function getWrappedIndex(i) {
        return ((i % galleryImages.length) + galleryImages.length) % galleryImages.length;
    }

    function updateGallery() {
        const leftIdx = getWrappedIndex(currentIdx - 1);
        const centerIdx = getWrappedIndex(currentIdx);
        const rightIdx = getWrappedIndex(currentIdx + 1);

        if (leftImgEl) leftImgEl.src = galleryImages[leftIdx];
        if (centerImgEl) centerImgEl.src = galleryImages[centerIdx];
        if (rightImgEl) rightImgEl.src = galleryImages[rightIdx];

        if (leftImgEl) leftImgEl.alt = `Mediterranean view left`;
        if (centerImgEl) centerImgEl.alt = `Lagoonica focus`;
        if (rightImgEl) rightImgEl.alt = `Seaside terrace`;

        if (leftItemDiv) {
            leftItemDiv.classList.add('side');
            leftItemDiv.classList.remove('center');
        }
        if (centerItemDiv) {
            centerItemDiv.classList.add('center');
            centerItemDiv.classList.remove('side');
        }
        if (rightItemDiv) {
            rightItemDiv.classList.add('side');
            rightItemDiv.classList.remove('center');
        }
    }

    function animateSlideTransition() {
        const track = document.getElementById('galleryTrack');
        if (!track) return;
        track.style.transition = 'transform 0.25s ease-out';
        track.style.transform = 'translateX(4px)';
        setTimeout(() => { track.style.transform = 'translateX(0px)'; }, 80);
        setTimeout(() => { track.style.transition = ''; }, 300);
    }

    function nextSlide() {
        currentIdx = getWrappedIndex(currentIdx + 1);
        updateGallery();
        animateSlideTransition();
    }

    function prevSlide() {
        currentIdx = getWrappedIndex(currentIdx - 1);
        updateGallery();
        animateSlideTransition();
    }

    function handleLeftClick() {
        currentIdx = getWrappedIndex(currentIdx - 1);
        updateGallery();
        animateSlideTransition();
    }

    function handleRightClick() {
        currentIdx = getWrappedIndex(currentIdx + 1);
        updateGallery();
        animateSlideTransition();
    }

    document.getElementById('prevSlide').addEventListener('click', prevSlide);
    document.getElementById('nextSlide').addEventListener('click', nextSlide);
    if (leftItemDiv) leftItemDiv.addEventListener('click', handleLeftClick);
    if (rightItemDiv) rightItemDiv.addEventListener('click', handleRightClick);

    // Swipe support (only if slider container exists)
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        let touchStartX = 0, touchEndX = 0;
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const delta = touchEndX - touchStartX;
            if (Math.abs(delta) > 50) {
                delta > 0 ? prevSlide() : nextSlide();
            }
        });
    }

    updateGallery();
}

// ========== MAP (Leaflet) ==========
if (document.getElementById('mapContainer')) {
    const map = L.map('mapContainer').setView([43.522002, 15.986167], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    L.marker([43.522002, 15.986167]).addTo(map)
        .bindPopup('<b>Lagoonica</b><br/>First row by the sea<br><br>Uvala Luka 57<br>22203 Rogoznica')
        .openPopup();
}

// ========== FORM SUBMIT ==========
const form = document.getElementById('inquiryForm');
if (form) {
    form.addEventListener('submit', function(e) {
        const name = document.getElementById('name')?.value.trim();
        if (!name) {
            e.preventDefault();
            alert("Please share your name so we can reply.");
        }
        // Otherwise, let the form submit normally to FormSubmit
    });
}

// ========== SMOOTH SCROLL ==========
// ========== SMOOTH SCROLL ==========
document.querySelectorAll('.nav-links a, .btn-outline, .btn-secondary, .btn-primary, .logo-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const hash = this.getAttribute('href');
        if (!hash || hash === '#') return;

        // Cross‑page links: let the browser navigate normally
        if (hash.startsWith('../') || hash.startsWith('/') || hash.startsWith('http')) {
            return;
        }

        // Same‑page hash links: smooth scroll if target exists
        if (hash.startsWith('#')) {
            e.preventDefault();
            const targetId = hash.substring(1);
            const targetElem = document.getElementById(targetId);
            if (targetElem) {
                targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ========== TESTIMONIALS CAROUSEL (only if elements exist) ==========
if (document.getElementById('testimonialText') && document.getElementById('testimonialAuthor')) {
    const testimonials = [
        {
            text: "We spent a week at Lagoonica and it was pure bliss. The balcony view is breathtaking, and the apartment has everything you need. Truly a hidden gem in Rogoznica!",
            author: "— Elena & Marco, Italy",
            stars: 5
        },
        {
            text: "Our dog Bella loved the garden and the nearby beach. The hosts left a lovely welcome gift and were so helpful. We're already planning to come back next year!",
            author: "— Sarah & Tom, UK",
            stars: 5
        },
        {
            text: "Sun all day, private BBQ, and the sound of waves… we couldn't ask for more. The apartment is stylish and spotless. Highly recommended!",
            author: "— Luka, Croatia",
            stars: 5
        },
        {
            text: "The location is unbeatable – first row to the sea, yet quiet and peaceful. Perfect for a relaxing holiday. The terrace is our favorite spot.",
            author: "— Anne & Peter, Germany",
            stars: 4
        }
    ];

    let currentTestimonial = 0;
    const testimonialText = document.getElementById('testimonialText');
    const testimonialAuthor = document.getElementById('testimonialAuthor');
    const testimonialStars = document.getElementById('testimonialStars');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    const dotsContainer = document.getElementById('testimonialDots');

    function updateTestimonial(index) {
        const t = testimonials[index];
        testimonialText.style.transition = 'opacity 0.2s';
        testimonialAuthor.style.transition = 'opacity 0.2s';
        testimonialStars.style.transition = 'opacity 0.2s';
        testimonialText.style.opacity = '0';
        testimonialAuthor.style.opacity = '0';
        testimonialStars.style.opacity = '0';

        setTimeout(() => {
            testimonialText.textContent = t.text;
            testimonialAuthor.textContent = t.author;
            let starsHtml = '';
            for (let i = 0; i < 5; i++) {
                starsHtml += i < t.stars ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
            }
            testimonialStars.innerHTML = starsHtml;

            testimonialText.style.opacity = '1';
            testimonialAuthor.style.opacity = '1';
            testimonialStars.style.opacity = '1';
        }, 200);

        document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentTestimonial);
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        updateTestimonial(currentTestimonial);
    }

    if (dotsContainer) {
        testimonials.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (i === currentTestimonial) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(i));
            dotsContainer.appendChild(dot);
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    updateTestimonial(0);
}

// ========== MOBILE MENU TOGGLE (common to all pages) ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
}
