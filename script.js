/**
 * BRINQ Mountain Trout & Seafood - Interactive Features & 3D Tilt Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  init3DPackageTilt();
  initProductFilters();

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
