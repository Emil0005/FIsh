/**
 * BRINQ Mountain Trout & Seafood - Interactive Features & 3D Tilt Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  init3DPackageTilt();
  initProductFilters();
  initLanguage();
});

/* --------------------------------------------------------------------------
   Sticky Navbar & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = mobileToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Dual Flagship Species Switcher & 3D Interactive Fan Tilt
   -------------------------------------------------------------------------- */
let currentActiveSpecies = 'karmrakhayt';

function switchHeroSpecies(species) {
  if (species === currentActiveSpecies) return;
  currentActiveSpecies = species;

  const tabKarmrakhayt = document.getElementById('tabKarmrakhayt');
  const tabIshkhan = document.getElementById('tabIshkhan');
  const cardKarmrakhayt = document.getElementById('cardKarmrakhayt');
  const cardIshkhan = document.getElementById('cardIshkhan');
  const inspectText = document.getElementById('heroInspectText');

  if (species === 'karmrakhayt') {
    tabKarmrakhayt?.classList.add('active');
    tabIshkhan?.classList.remove('active');

    cardKarmrakhayt?.classList.remove('is-back');
    cardKarmrakhayt?.classList.add('is-front');

    cardIshkhan?.classList.remove('is-front');
    cardIshkhan?.classList.add('is-back');

    if (inspectText) {
      inspectText.textContent = 'Mountain Trout (Karmrakhayt) • Click for Wholesale Specs';
    }
  } else {
    tabIshkhan?.classList.add('active');
    tabKarmrakhayt?.classList.remove('active');

    cardIshkhan?.classList.remove('is-back');
    cardIshkhan?.classList.add('is-front');

    cardKarmrakhayt?.classList.remove('is-front');
    cardKarmrakhayt?.classList.add('is-back');

    if (inspectText) {
      inspectText.textContent = 'Royal Trout (Ishkhan) • Click for Wholesale Specs';
    }
  }

  // Reset 3D tilt transform after switch
  if (cardKarmrakhayt) {
    cardKarmrakhayt.style.animationPlayState = 'running';
  }
  if (cardIshkhan) {
    cardIshkhan.style.animationPlayState = 'running';
  }
}

function handleCardClick(clickedSpecies) {
  if (clickedSpecies !== currentActiveSpecies) {
    switchHeroSpecies(clickedSpecies);
  } else {
    openSpecModal('hero-' + clickedSpecies);
  }
}

function openActiveSpeciesModal() {
  openSpecModal('hero-' + currentActiveSpecies);
}

function init3DPackageTilt() {
  const wrap = document.getElementById('heroPackWrap');
  if (!wrap) return;

  // Track mouse movements over wrapper
  wrap.addEventListener('mousemove', (e) => {
    const activeCard = wrap.querySelector('.hero-pack-3d-card.is-front');
    if (!activeCard) return;

    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 11;

    activeCard.style.animationPlayState = 'paused';
    activeCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -6px, 35px)`;
  });

  wrap.addEventListener('mouseleave', () => {
    const activeCard = wrap.querySelector('.hero-pack-3d-card.is-front');
    if (!activeCard) return;

    activeCard.style.transform = '';
    setTimeout(() => {
      activeCard.style.animationPlayState = 'running';
    }, 150);
  });
}

/* --------------------------------------------------------------------------
   Product Category Filtering
   -------------------------------------------------------------------------- */
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const catHeaders = document.querySelectorAll('.product-category-header');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.split(' ').includes(filter) || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });

      catHeaders.forEach(header => {
        const headerCat = header.getAttribute('data-category') || '';
        if (filter === 'all' || headerCat.split(' ').includes(filter) || headerCat.includes(filter)) {
          header.style.display = 'flex';
          setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
          }, 10);
        } else {
          header.style.opacity = '0';
          header.style.transform = 'translateY(15px)';
          setTimeout(() => {
            header.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Product Technical Specs Modal Data
   -------------------------------------------------------------------------- */
const productSpecsData = {
  'hero-karmrakhayt': {
    title: 'Whole Karmrakhayt (Gutted, Skin-Pack on Ice)',
    category: 'High-Altitude Mountain Trout',
    img: 'images/karmrakhayt_hero_tray_cutout.png',
    desc: 'Our signature mountain trout, grown in natural cold spring raceways. Available whole gutted with head-on in crystal-clear skin pack trays resting on ice.',
    specs: [
      { key: 'Latin Name', value: 'Salmo trutta fario (Armenian Mountain Trout)' },
      { key: 'Origin', value: 'High-Altitude Mountain Springs, Armenia (1,800m+)' },
      { key: 'Sizes Available', value: '350-500g, 500-700g per piece' },
      { key: 'Packaging Formats', value: 'Thermoform Vacuum Skin-Pack Tray with Cardboard Sleeve' },
      { key: 'Chilled Shelf Life', value: '12 days at 0°C to +2°C' },
      { key: 'Frozen Shelf Life', value: '18 months at -18°C (Flash-frozen at source)' },
      { key: 'Master Case', value: '10 trays per export carton (Approx 4.5kg - 6kg)' },
      { key: 'Certifications', value: 'HACCP, ISO 22000, Veterinary Export Health Certificate' }
    ]
  },
  'hero-ishkhan': {
    title: 'Whole Royal Trout / Ishkhan (Gutted, Skin-Pack / MAP)',
    category: 'Royal Armenian Highland Trout',
    img: 'images/ishkhan_pack_perfect_cutout.png',
    desc: 'The historic "Prince of Fish" (Salmo ischchan), endemic to Armenian highland waters. Renowned for its silvery-pearl scales, tender velvety marbling, delicate sweetness, and royal culinary pedigree.',
    specs: [
      { key: 'Latin Name', value: 'Salmo ischchan (Armenian Highland / Sevan Trout)' },
      { key: 'Origin', value: 'Highland Glacial Spring Pools, Armenia' },
      { key: 'Sizes Available', value: '450-700g, 700-1100g, 1.2kg+ gourmet caliber' },
      { key: 'Packaging Formats', value: 'Modified Atmosphere (MAP) Tray / High-Barrier Skin Pack' },
      { key: 'Chilled Shelf Life', value: '12 days at 0°C to +2°C' },
      { key: 'Culinary Texture', value: 'Delicate fine-flaked flesh with natural velvety marbling' },
      { key: 'Master Case', value: '8-10 trays per export carton' },
      { key: 'Certifications', value: 'HACCP, ISO 22000, State Veterinary Export Health Certificate' }
    ]
  },
  'whole-karmrakhayt': {
    title: 'Whole Karmrakhayt (Gutted, Skin-Pack on Ice)',
    category: 'High-Altitude Mountain Trout',
    img: 'images/new_whole_gutted.png',
    desc: 'Our signature mountain trout, grown in natural cold spring raceways. Available whole gutted with head-on in crystal-clear skin pack trays resting on ice.',
    specs: [
      { key: 'Latin Name', value: 'Salmo trutta fario (Armenian Mountain Trout)' },
      { key: 'Origin', value: 'High-Altitude Mountain Springs, Armenia (1,800m+)' },
      { key: 'Sizes Available', value: '350-500g, 500-700g per piece' },
      { key: 'Packaging Formats', value: 'Thermoform Vacuum Skin-Pack Tray with Cardboard Sleeve' },
      { key: 'Chilled Shelf Life', value: '12 days at 0°C to +2°C' },
      { key: 'Frozen Shelf Life', value: '18 months at -18°C (Flash-frozen at source)' },
      { key: 'Master Case', value: '10 trays per export carton (Approx 4.5kg - 6kg)' },
      { key: 'Certifications', value: 'HACCP, ISO 22000, Veterinary Export Health Certificate' }
    ]
  },
  'whole-ishkhan': {
    title: 'Whole Royal Trout / Ishkhan (Gutted, Skin-Pack / MAP)',
    category: 'Royal Armenian Highland Trout',
    img: 'images/product_whole_trout_premium.png',
    desc: 'The historic "Prince of Fish" (Salmo ischchan), endemic to Armenian highland waters. Renowned for its silvery-pearl scales, tender velvety marbling, delicate sweetness, and royal culinary pedigree.',
    specs: [
      { key: 'Latin Name', value: 'Salmo ischchan (Armenian Highland / Sevan Trout)' },
      { key: 'Origin', value: 'Highland Glacial Spring Pools, Armenia' },
      { key: 'Sizes Available', value: '450-700g, 700-1100g, 1.2kg+ gourmet caliber' },
      { key: 'Packaging Formats', value: 'Modified Atmosphere (MAP) Tray / High-Barrier Skin Pack' },
      { key: 'Chilled Shelf Life', value: '12 days at 0°C to +2°C' },
      { key: 'Culinary Texture', value: 'Delicate fine-flaked flesh with natural velvety marbling' },
      { key: 'Master Case', value: '8-10 trays per export carton' },
      { key: 'Certifications', value: 'HACCP, ISO 22000, State Veterinary Export Health Certificate' }
    ]
  },
  'butterfly-trout': {
    title: 'Butterfly Split Trout (Bone-In, Ready to Grill)',
    category: 'Gourmet Specialty Cut',
    img: 'images/product_butterfly_trout_premium.png',
    desc: 'Opened flat in butterfly style for even heat penetration on wood grills, broilers, or skillets. Crisps evenly on skin while flesh stays tender and succulent.',
    specs: [
      { key: 'Cut Type', value: 'Butterfly Split (Bone-In, Gutted)' },
      { key: 'Pack Weight', value: '400g - 600g per skin-pack tray' },
      { key: 'Preparation Time', value: 'Cooks in 6–8 minutes on high heat' },
      { key: 'Packaging Type', value: 'Vacuum Skin Barrier with Header Card' },
      { key: 'Storage Temp', value: 'Chilled: 0°C to +2°C | Frozen: -18°C' }
    ]
  },
  'trout-fillet': {
    title: 'Royal Trout Fillet (Skin-On, PBO)',
    category: 'Royal Trout (Ishkhan) Cuts',
    img: 'images/product_trout_fillet_new.png',
    desc: 'Hand-trimmed fillets from Royal Ishkhan trout with skin intact for crisp searing. Vibrant coral-pink flesh with delicate velvety marbling.',
    specs: [
      { key: 'Cut Type', value: 'Trim C/D, Pin-Bone Out (PBO), Skin-On' },
      { key: 'Net Weight', value: '200g - 400g per retail tray' },
      { key: 'Packaging Type', value: 'High-barrier thermoform skin pack with sleeve band' },
      { key: 'Omega-3 Content', value: 'Approx. 2.1g per 100g portion' },
      { key: 'Culinary Use', value: 'Pan-sear, oven bake, cedar plank grill' },
      { key: 'Storage Temp', value: 'Chilled: 0°C to +2°C | Frozen: -18°C' },
      { key: 'Master Case', value: '12 packs per master carton' }
    ]
  },
  'karmrakhayt-fillet': {
    title: 'Karmrakhayt Mountain Trout Fillet (Skin-On, PBO)',
    category: 'Flagship Mountain Trout Cuts',
    img: 'images/product_karmrakhayt_fillet_premium.png',
    desc: 'Pure glacial mountain trout fillet (Salmo trutta fario) with authentic crimson speckled skin intact. Clean, firm flaking texture with natural cold-spring minerality.',
    specs: [
      { key: 'Latin Name', value: 'Salmo trutta fario (Armenian Mountain Trout)' },
      { key: 'Cut Type', value: 'Skin-On, Hand-Trimmed, Pin-Bone Out (PBO)' },
      { key: 'Net Weight', value: '250g - 450g per retail skin-pack tray' },
      { key: 'Packaging Type', value: 'High-barrier thermoform skin pack with luxury sleeve band' },
      { key: 'Culinary Use', value: 'Crispy skin pan-sear, cedar plank broil, alpine herb butter poach' },
      { key: 'Storage Temp', value: 'Chilled: 0°C to +2°C | Frozen: -18°C' },
      { key: 'Shelf Life', value: '12 days chilled / 12 months flash-frozen' }
    ]
  },
  'trout-portions': {
    title: 'Royal Trout Portions (Center-Cut)',
    category: 'Royal Trout (Ishkhan) Precision Portions',
    img: 'images/product_trout_portions_premium.png',
    desc: 'Calibrated weight Ishkhan center-cuts designed for portion-controlled food service and luxury retail convenience.',
    specs: [
      { key: 'Portion Weights', value: '2x 150g (300g total) or 4x 120g (480g total)' },
      { key: 'Packaging', value: 'Leak-proof skin pack with luxury cardboard sleeve band' },
      { key: 'Allergens', value: 'Contains Fish. 100% Gluten-Free' },
      { key: 'Preparation Time', value: 'Ready to cook in 6–8 minutes' },
      { key: 'Target Markets', value: 'Supermarkets, boutique grocers, airline catering' }
    ]
  },
  'trout-steak': {
    title: 'Royal Trout Steak (Cross-Cut)',
    category: 'Royal Trout (Ishkhan) Prime Cuts',
    img: 'images/product_trout_steak_premium.png',
    desc: 'Cross-cut Royal Ishkhan steaks with central bone for locked-in succulence and delicate rich flavor. Ideal for high-heat pan searing and char-grilling.',
    specs: [
      { key: 'Cut Type', value: 'Cross-cut steak, bone-in, skin-on' },
      { key: 'Net Weight', value: '300g - 500g per retail pack' },
      { key: 'Packaging Type', value: 'Thermoform vacuum skin-pack with premium sleeve band' },
      { key: 'Culinary Use', value: 'Charcoal grill, cast iron sear, oven broil' },
      { key: 'Storage Temp', value: 'Chilled: 0°C to +2°C | Frozen: -18°C' },
      { key: 'Shelf Life', value: '12 days chilled / 12 months frozen' }
    ]
  },
  'trout-roe-jar': {
    title: 'BRINQ Trout Roe (Glass Jar with Box)',
    category: 'Luxury Line',
    img: 'images/product_trout_roe_new.png',
    desc: 'Luminous orange-red caviar pearls gently extracted and lightly salted (Malossol < 3.2%). Packaged in a luxury gold-rim glass jar with presentation box.',
    specs: [
      { key: 'Egg Diameter', value: '3.8mm – 4.5mm (Large uniform grain)' },
      { key: 'Salt Content', value: 'Malossol (< 3.2% pure marine salt)' },
      { key: 'Packaging', value: 'Vacuum glass jars (100g / 200g) with outer box' },
      { key: 'Shelf Life', value: '12 months at -2°C to +2°C' },
      { key: 'Color & Texture', value: 'Bright radiant ruby-orange, crisp gentle pop on palate' }
    ]
  },
  'shrimp-hoso': {
    title: 'Vannamei Shrimp (HOSO Whole)',
    category: 'Shellfish Selection • Whole Shrimp',
    img: 'images/shrimp_hoso_whole.png',
    desc: 'Raw frozen whole Vannamei shrimp with head and shell intact. Preserves peak oceanic sweetness and deep culinary richness.',
    specs: [
      { key: 'Product Form', value: 'Head-On, Shell-On (HOSO), Raw Frozen' },
      { key: 'Caliber', value: 'HOSO 30/40 count per kg' },
      { key: 'Packaging', value: '1 kg Retail Stand-Up Pouch | 10 kg (10x1kg) Master Case' },
      { key: 'Freezing / Glaze', value: 'IQF Individually Frozen | Glazing 5–6%' },
      { key: 'Origin', value: 'Product of India' },
      { key: 'Storage Temp', value: 'Keep frozen at -18°C or below' }
    ]
  },
  'shrimp-hlso': {
    title: 'Vannamei Shrimp (HLSO Headless)',
    category: 'Shellfish Selection • Grill & BBQ',
    img: 'images/shrimp_hlso_bbq.png',
    desc: 'Headless shell-on shrimp engineered for open flame, charcoal grills, and barbecues to protect meat from drying.',
    specs: [
      { key: 'Product Form', value: 'Headless, Shell-On (HLSO), Raw Frozen' },
      { key: 'Calibers Available', value: '16/20, 21/25, 26/30 count per lb' },
      { key: 'Packaging', value: '1 kg Retail Stand-Up Pouch | 10 kg Master Case' },
      { key: 'Glaze Level', value: 'Protective water glaze 5–6%' },
      { key: 'Culinary Use', value: 'Ideal for Charcoal Grill, Teppanyaki, and BBQ skewers' },
      { key: 'Storage Temp', value: 'Keep frozen at -18°C' }
    ]
  },
  'shrimp-pdto': {
    title: 'Vannamei Shrimp (PDTO Tail-On)',
    category: 'Shellfish Selection • Ready to Cook',
    img: 'images/shrimp_pdto_tail_on.png',
    desc: 'Peeled and deveined with tail segment intact for premium fine dining presentation, tempura, and cocktail platters.',
    specs: [
      { key: 'Product Form', value: 'Peeled, Deveined, Tail-On (PDTO), Raw Frozen' },
      { key: 'Calibers Available', value: '16/20, 21/25, 26/30, 31/40 count per lb' },
      { key: 'Packaging', value: '1 kg Pouch with product window | 10 kg Master Case' },
      { key: 'Preparation', value: 'Ready to cook directly without peeling' },
      { key: 'Glaze Level', value: 'Glazing 5–6%' },
      { key: 'Storage Temp', value: 'Keep frozen at -18°C' }
    ]
  },
  'shrimp-pd': {
    title: 'Vannamei Shrimp (PD Tail-Off)',
    category: 'Shellfish Selection • 100% Edible Meat',
    img: 'images/shrimp_pd_tail_off.png',
    desc: 'Completely peeled and deveined with tail removed for effortless cooking in pastas, risottos, salads, and poke bowls.',
    specs: [
      { key: 'Product Form', value: 'Peeled, Deveined, Tail-Off (PD), Raw Frozen' },
      { key: 'Caliber', value: 'PD 31/40 count per lb' },
      { key: 'Packaging', value: '1 kg Retail Stand-Up Pouch | 10 kg Master Case' },
      { key: 'Yield', value: '100% net edible yield, zero kitchen prep time' },
      { key: 'Glaze Level', value: 'Glazing 5–6%' },
      { key: 'Storage Temp', value: 'Keep frozen at -18°C' }
    ]
  },
  'box-whole-gutted': {
    title: 'Whole Gutted Karmrakhayt (5 kg Master Box)',
    category: 'High-Altitude Trout • Foodservice & Wholesale',
    img: 'images/box_whole_gutted_5kg.png',
    desc: 'Calibrated whole gutted mountain trout packed in heavy-duty export master cartons with protective poly liner. Ideal for fishmongers, fresh retail counters, and high-volume culinary operations.',
    specs: [
      { key: 'Cut & Style', value: 'Cleaned, Head-On, Gills & Viscera Removed' },
      { key: 'Net Weight', value: '5.0 kg fixed weight carton' },
      { key: 'Piece Count', value: '20–25 pcs per box (calibrated)' },
      { key: 'Packaging', value: 'Heavy-duty waxed corrugated carton with food-grade poly liner' },
      { key: 'Storage', value: 'Chilled 0–2°C (12 days) or Frozen -18°C (18 months)' },
      { key: 'Origin', value: 'Pristine Mountain Springs, Armenian Highlands' },
      { key: 'Palletization', value: '72 boxes per Euro pallet (360 kg net)' },
      { key: 'Certifications', value: 'HACCP, ISO 22000, Veterinary Export Health Certificate' }
    ]
  },
  'box-butterfly-cut': {
    title: 'Butterfly Cut Karmrakhayt (5 kg Master Box)',
    category: 'Gourmet Cut • Chef\'s Bulk Pack',
    img: 'images/box_butterfly_cut_5kg.png',
    desc: 'Bone-removed butterfly cut mountain trout opened flat and layered between food-safe release sheets. Ready to season and grill directly with zero kitchen prep time.',
    specs: [
      { key: 'Cut & Style', value: 'Butterfly Split, Bone Removed, Ready to Cook' },
      { key: 'Net Weight', value: '5.0 kg fixed weight carton' },
      { key: 'Piece Count', value: '10–15 pcs per box' },
      { key: 'Packaging', value: 'Foodservice master carton with protective interleaving' },
      { key: 'Storage', value: 'Chilled 0–2°C or Frozen -18°C' },
      { key: 'Culinary Use', value: 'Grill, broiler, pan-fry, or banquet service' },
      { key: 'Origin', value: 'Pristine Mountain Springs, Armenian Highlands' },
      { key: 'Certifications', value: 'HACCP, ISO 22000, Veterinary Export Health Certificate' }
    ]
  },
  'box-fillets': {
    title: 'Skin-On Boneless Fillets (5 kg Master Box)',
    category: 'Fresh Cuts • HORECA & Retail',
    img: 'images/box_fillets_5kg.png',
    desc: 'Precision pin-bone removed skin-on mountain trout fillets layered for chef convenience. High yield, zero trim waste, and uniform cooking characteristics.',
    specs: [
      { key: 'Cut & Style', value: 'Skin-On, Boneless, Pin-Bone Out (PBO)' },
      { key: 'Net Weight', value: '5.0 kg fixed weight carton' },
      { key: 'Piece Count', value: '20–25 fillets per box' },
      { key: 'Packaging', value: 'Interleaved master carton with protective barrier film' },
      { key: 'Storage', value: 'Chilled 0–2°C or Frozen -18°C' },
      { key: 'Kitchen Yield', value: '100% usable edible yield' },
      { key: 'Origin', value: 'Pristine Mountain Springs, Armenian Highlands' },
      { key: 'Certifications', value: 'HACCP, ISO 22000, Veterinary Export Health Certificate' }
    ]
  }
};

function openSpecModal(productId) {
  const modal = document.getElementById('specModal');
  const modalContent = document.getElementById('modalContent');
  const item = productSpecsData[productId];

  if (!item) return;

  let tableRows = item.specs.map(s => `
    <tr>
      <th>${s.key}</th>
      <td>${s.value}</td>
    </tr>
  `).join('');

  modalContent.innerHTML = `
    <div class="modal-header-meta">
      <span class="product-cat">${item.category}</span>
      <h2>${item.title}</h2>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 8px;">${item.desc}</p>
    </div>
    <div style="border-radius: 8px; overflow: hidden; margin-bottom: 20px; background: #08121d; display: flex; justify-content: center; align-items: center; max-height: 280px;">
      <img src="${item.img}" alt="${item.title}" style="max-height: 280px; width: auto; object-fit: contain;">
    </div>
    <h4 style="color: #ffffff; font-family: var(--font-heading); margin-bottom: 10px;">Technical & Logistics Specifications</h4>
    <table class="modal-spec-table">
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <div style="display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap;">
      <a href="#inquiry" onclick="closeSpecModal()" class="btn btn-primary" style="flex: 1;">
        Inquire for Wholesale Pricing
      </a>
      <button onclick="closeSpecModal()" class="btn btn-glass">Close</button>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSpecModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close')) {
    return;
  }
  const modal = document.getElementById('specModal');
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

/* --------------------------------------------------------------------------
   B2B Form Submit
   -------------------------------------------------------------------------- */
function handleInquirySubmit(e) {
  e.preventDefault();
  const form = document.getElementById('inquiryForm');
  const successBox = document.getElementById('formSuccessMessage');

  const interests = [];
  form.querySelectorAll('input[name="productInterest"]:checked').forEach(cb => {
    interests.push(cb.value);
  });

  const payload = {
    name: document.getElementById('contactName').value,
    company: document.getElementById('companyName').value,
    email: document.getElementById('contactEmail').value,
    phone: document.getElementById('contactPhone').value,
    buyerType: document.getElementById('buyerType').value,
    interests: interests,
    message: document.getElementById('inquiryMessage').value,
    timestamp: new Date().toISOString()
  };

  console.log('Wholesale Inquiry Submitted:', payload);
  try {
    localStorage.setItem('brinq_last_inquiry', JSON.stringify(payload));
  } catch (err) { }

  successBox.style.display = 'block';
  form.reset();

  setTimeout(() => {
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}


/* --------------------------------------------------------------------------
   Language Switcher (English / Chinese)
   -------------------------------------------------------------------------- */

const i18nData = {
  en: {
    // Top bar
    badge_farm:        'FARM DIRECT PRODUCER',
    top_bar_desc:      'High-Altitude Mountain Springs • 100% Traceable • Flash-Frozen & Chilled at Source',
    top_bar_cta:       'B2B Wholesale Inquiries →',

    // Navbar
    nav_about:         'About',
    nav_how:           'How We Grow',
    nav_cuts:          'Signature Cuts',
    nav_products:      'Products & Packaging',
    nav_standards:     'Quality Standards',
    nav_partner:       'Partner With Us',

    // Hero
    hero_sub:          'Two Glacial Legends. Grown with Care. Harvested at Peak Purity.',
    badge_altitude:    'High Altitude Origin',
    badge_water:       'Crystal Clear Waters',
    badge_nutrition:   'Natural Nutrition',
    badge_quality:     'Premium Quality',
    hero_cta_products: 'Explore All Products',
    hero_cta_wholesale:'Wholesale Inquiries',

    // Trust ribbon
    ribbon_h1: 'High-Altitude Springs',
    ribbon_p1: 'Continuous natural mountain water flow rich in dissolved oxygen.',
    ribbon_h2: 'Controlled Natural Growth',
    ribbon_p2: 'Non-GMO feed, zero growth promoters, natural swimming in strong currents.',
    ribbon_h3: 'Flash-Packed at Source',
    ribbon_p3: 'Harvested, filleted, and sealed within hours directly beside the raceways.',
    ribbon_h4: 'Global Cold-Chain Export',
    ribbon_p4: 'Certified HACCP & ISO 22000 compliance for international retail & HORECA.',

    // About
    about_subtitle:    'ROOTED IN ARMENIA. CONNECTED TO THE WORLD.',
    about_title:       'From Origin<br>to Ocean.',
    mvp_mission_label: 'OUR MISSION',
    mvp_vision_label:  'OUR VISION',
    mvp_promise_label: 'OUR PROMISE',

    // How We Grow
    grow_subtitle:  'THE PRODUCER JOURNEY',
    grow_title:     'How We Grow Our Fish',

    // Signature Cuts
    cuts_subtitle:  'FARM-DIRECT PACKAGING FORMATS',
    cuts_title:     'Three Signature Cuts. Sealed at Source.',

    // Products
    products_subtitle:   'RETAIL & HORECA PACKAGING',
    products_title:      'Our Complete Product Portfolio',

    // Filters
    filter_all:          'All Products',
    filter_karmrakhayt:  'Mountain Trout (Karmrakhayt)',
    filter_ishkhan:      'Royal Trout (Ishkhan)',
    filter_boxes:        'Wholesale 5kg Boxes',
    filter_seafood:      'Caviar & Seafood',

    // Category headers
    cat_karmrakhayt: 'Mountain Trout (Karmrakhayt)',
    cat_ishkhan:     'Royal Trout (Ishkhan)',
    cat_boxes:       'Wholesale 5kg Master Boxes',
    cat_seafood:     'Caviar & Selected Seafood',

    // Product titles
    prod_whole_gutted:    'Whole Gutted Trout',
    prod_karm_fillet:     'Karmrakhayt Fillet (Skin-On, PBO)',
    prod_butterfly:       'Butterfly Split (Opened)',
    prod_whole_ishkhan:   'Whole Royal Trout (Ishkhan)',
    prod_ishkhan_fillet:  'Royal Trout Fillet (Skin-On, PBO)',
    prod_ishkhan_portions:'Royal Trout Portions',
    prod_ishkhan_steak:   'Royal Trout Steak',
    prod_box_whole:       'Whole Gutted Trout (5 kg Master Box)',
    prod_box_butterfly:   'Butterfly Cut Trout (5 kg Master Box)',
    prod_box_fillets:     'Skin-On Fillets Trout (5 kg Master Box)',
    prod_roe:             'BRINQ Trout Roe (Premium Glass Jar)',
    prod_shrimp_hoso:     'Vannamei Shrimp (HOSO Whole)',
    prod_shrimp_hlso:     'Vannamei Shrimp (HLSO Headless)',
    prod_shrimp_pdto:     'Vannamei Shrimp (PDTO Tail-On)',
    prod_shrimp_pd:       'Vannamei Shrimp (PD Tail-Off)',

    // Standards
    standards_subtitle: 'CERTIFIED EXCELLENCE',
    standards_title:    'Strict Standards for Global Markets',
    std_haccp:          'HACCP Certified',
    std_iso:            'ISO 22000 Food Safety',
    std_sustainable:    'Sustainable Aquaculture',
    std_coldchain:      'Unbroken Cold Chain',

    // Inquiry / Form
    inquiry_subtitle:   'COMMERCIAL COOPERATION',
    inquiry_title:      'Partner Directly with the Producer',
    contact_desk:       'Direct Trade Desk:',
    form_title:         'Request Wholesale Catalog & Pricing',
    form_sub:           'Fill out the details below. Our export sales manager will reply within 24 hours.',
    form_name:          'Your Name *',
    form_company:       'Company / Organization *',
    form_email:         'Business Email *',
    form_phone:         'Phone / WhatsApp',
    form_category:      'Business Category',
    form_message:       'Estimated Volume & Target Market',
    form_submit:        'Submit Wholesale Request',

    // Hero narrative
    hero_narrative: `We breed, raise, and pack Armenia's two iconic high-altitude species—<strong>Mountain Trout (Karmrakhayt)</strong> and <strong>Royal Trout (Ishkhan)</strong>—directly at our cold glacial spring pools. 100% natural mountain water flow, zero added hormones, non-GMO feed, and hermetically sealed in protective skin-pack trays within hours of swimming.`,

    // Brand story
    brand_lead:    'The story of BRINQ begins in Armenia — a land of majestic mountains, cold waters, and a rich tradition of aquaculture.',
    brand_body1:   'Our inspiration is <strong>Karmrahayt</strong>, Armenian mountain trout distinguished by its characteristic red spots and raised in pristine highland aquaculture. It represents our ambition to introduce distinctive Armenian seafood products to international markets.',
    brand_body2:   'But our vision reaches far beyond one product or one country. At BRINQ, we believe that exceptional seafood deserves access to global markets, wherever it originates. Our ambition is to connect producers, processors, importers, and distributors through reliable international trading partnerships.',
    brand_tagline: '"Our journey begins in Armenia. Our vision reaches across the world."',

    // MVP card paragraphs
    mvp_mission_p: 'To connect quality seafood with global markets through reliability, transparency, and professional supply chain management.',
    mvp_vision_p:  'To become a recognized global B2B seafood brand, trusted by producers and buyers worldwide.',
    mvp_promise_p: 'Clear origins. Defined specifications. Commitment to every partnership — from the first inquiry to the final delivery.',

    // Brand identity pills
    pill_origins_label: 'BRINQ Origins',
    pill_origins_sub:   'Karmrahayt · Rainbow Trout',
    pill_global_label:  'BRINQ Global',
    pill_global_sub:    'Shrimp · Salmon · Squid · Whitefish',

    // Footer
    footer_farm:     'The Farm',
    footer_products: 'Products',
    footer_b2b:      'B2B & Partners',
  },

  zh: {
    // Top bar
    badge_farm:        '直接来自养殖场',
    top_bar_desc:      '高海拔山泉水源 • 100% 全程可追溯 • 源头急冻及冷藏',
    top_bar_cta:       'B2B 批发询价 →',

    // Navbar
    nav_about:         '关于我们',
    nav_how:           '养殖过程',
    nav_cuts:          '招牌切割',
    nav_products:      '产品与包装',
    nav_standards:     '质量标准',
    nav_partner:       '成为合作伙伴',

    // Hero
    hero_sub:          '两种冰川珍品。精心养殖。在最佳纯净度时收获。',
    badge_altitude:    '高海拔原产地',
    badge_water:       '晶莹清澈的泉水',
    badge_nutrition:   '天然营养',
    badge_quality:     '顶级品质',
    hero_cta_products: '探索所有产品',
    hero_cta_wholesale:'批发询价',

    // Trust ribbon
    ribbon_h1: '高海拔山泉',
    ribbon_p1: '持续天然高山泉水流，富含溶解氧。',
    ribbon_h2: '自然生长管控',
    ribbon_p2: '非转基因饲料，零促生长剂，在强水流中自然游动。',
    ribbon_h3: '源头急速封装',
    ribbon_p3: '收割后数小时内直接在养殖池旁完成分割与密封。',
    ribbon_h4: '全球冷链出口',
    ribbon_p4: 'HACCP 及 ISO 22000 认证，符合国际零售及餐饮行业标准。',

    // About
    about_subtitle:    '根植亚美尼亚，连接全球市场。',
    about_title:       '从源头<br>到餐桌。',
    mvp_mission_label: '我们的使命',
    mvp_vision_label:  '我们的愿景',
    mvp_promise_label: '我们的承诺',

    // How We Grow
    grow_subtitle:  '生产者的旅程',
    grow_title:     '我们如何养殖鱼类',

    // Signature Cuts
    cuts_subtitle:  '直供农场包装格式',
    cuts_title:     '三款招牌切割。源头密封。',

    // Products
    products_subtitle:   '零售及餐饮包装',
    products_title:      '我们的完整产品目录',

    // Filters
    filter_all:          '全部产品',
    filter_karmrakhayt:  '山地鳟（卡尔马哈特）',
    filter_ishkhan:      '皇家鳟（伊什汗）',
    filter_boxes:        '5公斤批发装',
    filter_seafood:      '鱼子酱 & 精选海鲜',

    // Category headers
    cat_karmrakhayt: '山地鳟（卡尔马哈特）',
    cat_ishkhan:     '皇家鳟（伊什汗）',
    cat_boxes:       '5公斤批发主箱',
    cat_seafood:     '鱼子酱 & 精选海鲜',

    // Product titles
    prod_whole_gutted:    '整条去内脏鳟鱼',
    prod_karm_fillet:     '卡尔马哈特鱼柳（带皮，去骨）',
    prod_butterfly:       '蝴蝶切（展开式）',
    prod_whole_ishkhan:   '整条皇家鳟（伊什汗）',
    prod_ishkhan_fillet:  '皇家鳟鱼柳（带皮，去骨）',
    prod_ishkhan_portions:'皇家鳟精切份',
    prod_ishkhan_steak:   '皇家鳟鱼排',
    prod_box_whole:       '整条去内脏鳟鱼（5公斤主箱）',
    prod_box_butterfly:   '蝴蝶切鳟鱼（5公斤主箱）',
    prod_box_fillets:     '带皮鱼柳鳟鱼（5公斤主箱）',
    prod_roe:             'BRINQ 鳟鱼子（高档玻璃瓶）',
    prod_shrimp_hoso:     '凡纳滨对虾（带头带壳，整虾）',
    prod_shrimp_hlso:     '凡纳滨对虾（去头带壳）',
    prod_shrimp_pdto:     '凡纳滨对虾（去壳去沙线带尾）',
    prod_shrimp_pd:       '凡纳滨对虾（全熟去壳去尾）',

    // Standards
    standards_subtitle: '认证卓越品质',
    standards_title:    '严格标准，面向全球市场',
    std_haccp:          'HACCP 认证',
    std_iso:            'ISO 22000 食品安全',
    std_sustainable:    '可持续水产养殖',
    std_coldchain:      '不间断冷链',

    // Inquiry / Form
    inquiry_subtitle:   '商业合作',
    inquiry_title:      '直接与生产商合作',
    contact_desk:       '直接贸易联系：',
    form_title:         '申请批发目录及报价',
    form_sub:           '请填写以下信息，我们的出口销售经理将在24小时内回复。',
    form_name:          '您的姓名 *',
    form_company:       '公司 / 机构 *',
    form_email:         '商务邮箱 *',
    form_phone:         '电话 / WhatsApp',
    form_category:      '业务类别',
    form_message:       '预计采购量及目标市场',
    form_submit:        '提交批发申请',

    // Hero narrative
    hero_narrative: `我们直接在高寒山地冰泉养殖池旁，繁育、养殖并包装亚美尼亚两大标志性高海拔鱼种——<strong>山地鳟（卡尔马哈特）</strong>与<strong>皇家鳟（伊什汗）</strong>。100% 天然山泉水循环，零激素，非转基因饲料，收获后数小时内即在保护性透明贴体托盘中密封完成。`,

    // Brand story
    brand_lead:    'BRINQ 的故事始于亚美尼亚——一片雄伟山脉、清澈冷泉与深厚水产养殖传统交织的土地。',
    brand_body1:   '我们的灵感来源是<strong>卡尔马哈特</strong>，这是一种以独特红斑著称的亚美尼亚山地鳟，在洁净的高地水产养殖环境中生长。它代表着我们将独特亚美尼亚海鲜产品引入国际市场的雄心。',
    brand_body2:   '但我们的愿景远不止于一种产品或一个国家。在 BRINQ，我们相信卓越的海鲜应该能够进入全球市场，无论其产地何处。我们的目标是通过可靠的国际贸易合作，将生产商、加工商、进口商和经销商紧密相连。',
    brand_tagline: '"我们的旅程始于亚美尼亚，我们的愿景延伸至全世界。"',

    // MVP card paragraphs
    mvp_mission_p: '通过可靠性、透明度和专业的供应链管理，将优质海鲜与全球市场连接起来。',
    mvp_vision_p:  '成为全球公认的 B2B 海鲜品牌，赢得全球生产商与买家的信赖。',
    mvp_promise_p: '清晰的产品溯源。明确的产品规格。对每段合作的承诺——从第一次询价到最终交货。',

    // Brand identity pills
    pill_origins_label: 'BRINQ 本源',
    pill_origins_sub:   '卡尔马哈特 · 彩虹鳟',
    pill_global_label:  'BRINQ 全球',
    pill_global_sub:    '对虾 · 三文鱼 · 鱿鱼 · 白肉鱼',

    // Footer
    footer_farm:     '养殖场',
    footer_products: '产品',
    footer_b2b:      'B2B & 合作伙伴',
  }
};

let currentLang = 'en';

function initLanguage() {
  const saved = localStorage.getItem('brinq_lang');
  if (saved && (saved === 'en' || saved === 'zh')) {
    setLanguage(saved);
  }
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'zh') return;
  currentLang = lang;
  localStorage.setItem('brinq_lang', lang);

  const translations = i18nData[lang];

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] !== undefined) {
      el.innerHTML = translations[key];
    }
  });

  // Update active state on switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update <html lang> attribute for accessibility
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}
