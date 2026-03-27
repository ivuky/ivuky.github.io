// ========== GALLERY DATA ==========
const images = [
    // Indoor (no subcategories)
    { src: "../img/gallery/indoor1.jpeg", alt: "Living room with sea view", category: "indoor", subcategory: null, caption: "Spacious living area" },
    { src: "../img/gallery/indoor2.jpeg", alt: "Cozy bedroom", category: "indoor", subcategory: null, caption: "Master bedroom" },
    { src: "../img/gallery/indoor3.jpeg", alt: "Modern kitchen", category: "indoor", subcategory: null, caption: "Fully equipped kitchen" },

    // Outdoor – Balcony & View
    { src: "../img/gallery/balcony1.jpeg", alt: "Balcony with sea view", category: "outdoor", subcategory: "balcony", caption: "Morning coffee with a view" },
    { src: "../img/gallery/balcony2.png", alt: "Sunset from balcony", category: "outdoor", subcategory: "balcony", caption: "Golden hour" },
    { src: "../img/gallery/balcony3.jpeg", alt: "Relaxing on balcony", category: "outdoor", subcategory: "balcony", caption: "Your private retreat" },

    // Outdoor – Garden
    { src: "../img/gallery/garden1.jpeg", alt: "Stone BBQ terrace", category: "outdoor", subcategory: "garden", caption: "BBQ evenings" },
    { src: "../img/gallery/garden2.jpeg", alt: "Olive trees", category: "outdoor", subcategory: "garden", caption: "Mediterranean garden" },
    { src: "../img/gallery/garden3.jpeg", alt: "Garden seating", category: "outdoor", subcategory: "garden", caption: "Al fresco dining" },

    // Beach & Sea (no subcategories)
    { src: "../img/gallery/beach1.jpeg", alt: "Crystal clear water", category: "beach", subcategory: null, caption: "Steps to the sea" },
    { src: "../img/gallery/beach2.jpeg", alt: "Rogoznica coast", category: "beach", subcategory: null, caption: "Pristine beaches" },
    { src: "../img/gallery/beach3.jpeg", alt: "Kayaking", category: "beach", subcategory: null, caption: "Explore the coastline" },
    { src: "../img/gallery/beach4.jpeg", alt: "Cocktails at beach", category: "beach", subcategory: null, caption: "Sipping on sunshine" },

    // Surroundings with subcategories
    { src: "../img/gallery/surroundings/rogoznica1.jpeg", alt: "Rogoznica waterfront", category: "surroundings", subcategory: "town1", caption: "Rogoznica waterfront" },
    { src: "../img/gallery/surroundings/rogoznica2.jpeg", alt: "Promenade walk", category: "surroundings", subcategory: "town1", caption: "Promenade walk" },
    { src: "../img/gallery/surroundings/rogoznica3.jpeg", alt: "Marina Frapa", category: "surroundings", subcategory: "town1", caption: "Marina Frapa" },

    { src: "../img/gallery/surroundings/razanj1.png", alt: "Ražanj", category: "surroundings", subcategory: "town2", caption: "A peaceful fishing village" },
    { src: "../img/gallery/surroundings/razanj2.jpeg", alt: "Ražanj restaurants", category: "surroundings", subcategory: "town2", caption: "Local restaurants " },

    { src: "../img/gallery/surroundings/kopara1.jpeg", alt: "Kopara nature trail", category: "surroundings", subcategory: "nature", caption: "Kopara nature trail" },
    { src: "../img/gallery/surroundings/kopara2.jpeg", alt: "Coastal hiking", category: "surroundings", subcategory: "nature", caption: "Coastal hiking" },
    { src: "../img/gallery/surroundings/lavander1.jpeg", alt: "Lavender Labyrinth", category: "surroundings", subcategory: "nature", caption: "Lavender Labyrinth" },
    { src: "../img/gallery/surroundings/lavander2.jpeg", alt: "Viewpoints at the top", category: "surroundings", subcategory: "nature", caption: "Viewpoints at the top" },
    { src: "../img/gallery/surroundings/dragon-eye.jpeg", alt: "Dragon's Eye Lake", category: "surroundings", subcategory: "nature", caption: "Dragon's Eye Lake" },
    { src: "../img/gallery/surroundings/movar.jpeg", alt: "Sunset at Movar", category: "surroundings", subcategory: "nature", caption: "Sunset at Movar" },

    { src: "../img/gallery/surroundings/culture1.jpeg", alt: "Summer concerts", category: "surroundings", subcategory: "culture", caption: "Summer concerts" },
    { src: "../img/gallery/surroundings/culture2.jpeg", alt: "Fishermen's nights", category: "surroundings", subcategory: "culture", caption: "Fishermen's nights" },
    { src: "../img/gallery/surroundings/culture3.jpeg", alt: "Boat regattas", category: "surroundings", subcategory: "culture", caption: "Boat regattas" },
    { src: "../img/gallery/surroundings/culture4.jpeg", alt: "Taxi boat", category: "surroundings", subcategory: "culture", caption: "Taxi boat" },
];

// ---------- FILTER LOGIC ----------
let activeCategory = "all";
let activeSubcategory = null;

// Define subcategories for categories that have them
const subCategoryMap = {
    outdoor: [
        { id: "balcony", label: "Balcony & View" },
        { id: "garden", label: "Garden" }
    ],
    surroundings: [
        { id: "town1", label: "Rogoznica & Marina Frapa " },
        { id: "town2", label: "Ražanj" },
        { id: "nature", label: "Nature & Trails" },
        { id: "culture", label: "Local Culture" }
    ]
};

// Render filter buttons (main categories)
function renderFilters() {
    const categories = ["all", "indoor", "outdoor", "beach", "surroundings"];
    const filterBar = document.getElementById("filterBar");
    filterBar.innerHTML = categories.map(cat => `
        <button class="filter-btn ${activeCategory === cat ? 'active' : ''}" data-category="${cat}">
            ${cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
    `).join("");

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            activeCategory = btn.dataset.category;
            activeSubcategory = null;
            renderFilters();
            renderSubFilters();
            renderGallery();
        });
    });
}

// Render sub-filters if the current category has them
function renderSubFilters() {
    const subFilterBar = document.getElementById("subFilterBar");
    const subCategories = subCategoryMap[activeCategory];
    
    if (subCategories && subCategories.length) {
        subFilterBar.style.display = "flex";
        subFilterBar.innerHTML = subCategories.map(sub => `
            <button class="sub-filter-btn ${activeSubcategory === sub.id ? 'active' : ''}" data-sub="${sub.id}">
                ${sub.label}
            </button>
        `).join("");
        document.querySelectorAll(".sub-filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                activeSubcategory = btn.dataset.sub;
                renderSubFilters();
                renderGallery();
            });
        });
    } else {
        subFilterBar.style.display = "none";
        activeSubcategory = null;
    }
}

// Render gallery grid
function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    let filtered = [...images];

    if (activeCategory !== "all") {
        filtered = filtered.filter(img => img.category === activeCategory);
    }
    if (activeSubcategory) {
        filtered = filtered.filter(img => img.subcategory === activeSubcategory);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-results">No images found. Please check back later.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(img => `
        <div class="gallery-card">
            <img src="${img.src}" alt="${img.alt}" loading="lazy">
            <div class="caption">${img.caption}</div>
        </div>
    `).join("");
}

// Initialise
renderFilters();
renderSubFilters();
renderGallery();