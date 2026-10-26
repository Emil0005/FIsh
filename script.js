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
      inspectText.textContent = (currentLang === 'zh')
        ? (i18nData.zh.inspect_text || '山地冷泉鳟（卡尔马哈特）• 点击查看批发出口规格')
        : 'Mountain Trout (Karmrakhayt) • Click for Wholesale Specs';
    }
  } else {
    tabIshkhan?.classList.add('active');
    tabKarmrakhayt?.classList.remove('active');

    cardIshkhan?.classList.remove('is-back');
    cardIshkhan?.classList.add('is-front');

    cardKarmrakhayt?.classList.remove('is-front');
    cardKarmrakhayt?.classList.add('is-back');

    if (inspectText) {
      inspectText.textContent = (currentLang === 'zh')
        ? (i18nData.zh.inspect_text_ishkhan || '皇家鳟（伊什汗）• 点击查看批发出口规格')
        : 'Royal Trout (Ishkhan) • Click for Wholesale Specs';
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

const productSpecsDataZh = {
  "hero-karmrakhayt": {
    "title": "整条去内脏卡尔马哈特（冰鲜贴体托盘装）",
    "category": "高海拔山地冷泉鳟",
    "img": "images/karmrakhayt_hero_tray_cutout.png",
    "desc": "我们的招牌高山冷泉鳟鱼，在天然冰川冷泉流水池中生长。整条去内脏保留鱼头，置于高透明度贴体托盘中，可置于冰上优雅陈列。",
    "specs": [
      {
        "key": "学名",
        "value": "Salmo trutta fario（亚美尼亚高山鳟）"
      },
      {
        "key": "原产地",
        "value": "亚美尼亚高海拔高山冰泉水域（海拔1,800米以上）"
      },
      {
        "key": "供货规格",
        "value": "每条 350-500克、500-700克"
      },
      {
        "key": "包装形式",
        "value": "热成型高阻隔真空贴体托盘配专属纸板腰封"
      },
      {
        "key": "冷藏保质期",
        "value": "0°C 至 +2°C 环境下 12 天"
      },
      {
        "key": "冷冻保质期",
        "value": "-18°C 环境下 18 个月（源头速冻锁鲜）"
      },
      {
        "key": "外箱包装",
        "value": "每出口纸箱 10 托盘（净重约 4.5kg - 6kg）"
      },
      {
        "key": "权威认证",
        "value": "HACCP、ISO 22000、官方兽医出口卫生证书"
      }
    ]
  },
  "hero-ishkhan": {
    "title": "整条塞凡皇家鳟 / 伊什汗（去内脏·贴体 / MAP气调）",
    "category": "亚美尼亚尊贵皇家高山鳟",
    "img": "images/ishkhan_pack_perfect_cutout.png",
    "desc": "亚美尼亚高地水域特有的历史传奇“鱼中王子”（Salmo ischchan）。以银亮珍珠鳞片、细腻大理石油花、清甜回甘与皇家尊贵血统闻名于世。",
    "specs": [
      {
        "key": "学名",
        "value": "Salmo ischchan（亚美尼亚高山塞凡湖鳟）"
      },
      {
        "key": "原产地",
        "value": "亚美尼亚高地冰川活泉水池"
      },
      {
        "key": "供货规格",
        "value": "450-700克、700-1100克、1.2公斤以上特大名厨规格"
      },
      {
        "key": "包装形式",
        "value": "MAP气调锁鲜托盘 / 高阻隔真空贴体托盘"
      },
      {
        "key": "冷藏保质期",
        "value": "0°C 至 +2°C 环境下 12 天"
      },
      {
        "key": "肉质口感",
        "value": "细腻薄片状鱼肉，带天然丝绒般大理石油花"
      },
      {
        "key": "外箱包装",
        "value": "每出口纸箱 8-10 托盘"
      },
      {
        "key": "权威认证",
        "value": "HACCP、ISO 22000、国家兽医出口检疫卫生证书"
      }
    ]
  },
  "whole-karmrakhayt": {
    "title": "整条去内脏卡尔马哈特（冰鲜贴体托盘装）",
    "category": "高海拔山地冷泉鳟",
    "img": "images/new_whole_gutted.png",
    "desc": "我们的招牌高山冷泉鳟鱼，在天然冰川冷泉流水池中生长。整条去内脏保留鱼头，置于高透明度贴体托盘中，可置于冰上优雅陈列。",
    "specs": [
      {
        "key": "学名",
        "value": "Salmo trutta fario（亚美尼亚高山鳟）"
      },
      {
        "key": "原产地",
        "value": "亚美尼亚高海拔高山冰泉水域（海拔1,800米以上）"
      },
      {
        "key": "供货规格",
        "value": "每条 350-500克、500-700克"
      },
      {
        "key": "包装形式",
        "value": "热成型高阻隔真空贴体托盘配专属纸板腰封"
      },
      {
        "key": "冷藏保质期",
        "value": "0°C 至 +2°C 环境下 12 天"
      },
      {
        "key": "冷冻保质期",
        "value": "-18°C 环境下 18 个月（源头速冻锁鲜）"
      },
      {
        "key": "外箱包装",
        "value": "每出口纸箱 10 托盘（净重约 4.5kg - 6kg）"
      },
      {
        "key": "权威认证",
        "value": "HACCP、ISO 22000、官方兽医出口卫生证书"
      }
    ]
  },
  "whole-ishkhan": {
    "title": "整条塞凡皇家鳟 / 伊什汗（去内脏·贴体 / MAP气调）",
    "category": "亚美尼亚尊贵皇家高山鳟",
    "img": "images/product_whole_trout_premium.png",
    "desc": "亚美尼亚高地水域特有的历史传奇“鱼中王子”（Salmo ischchan）。以银亮珍珠鳞片、细腻大理石油花、清甜回甘与皇家尊贵血统闻名于世。",
    "specs": [
      {
        "key": "学名",
        "value": "Salmo ischchan（亚美尼亚高山塞凡湖鳟）"
      },
      {
        "key": "原产地",
        "value": "亚美尼亚高地冰川活泉水池"
      },
      {
        "key": "供货规格",
        "value": "450-700克、700-1100克、1.2公斤以上特大名厨规格"
      },
      {
        "key": "包装形式",
        "value": "MAP气调锁鲜托盘 / 高阻隔真空贴体托盘"
      },
      {
        "key": "冷藏保质期",
        "value": "0°C 至 +2°C 环境下 12 天"
      },
      {
        "key": "肉质口感",
        "value": "细腻薄片状鱼肉，带天然丝绒般大理石油花"
      },
      {
        "key": "外箱包装",
        "value": "每出口纸箱 8-10 托盘"
      },
      {
        "key": "权威认证",
        "value": "HACCP、ISO 22000、国家兽医出口检疫卫生证书"
      }
    ]
  },
  "butterfly-trout": {
    "title": "蝴蝶切展平带骨鳟鱼（解冻即烤）",
    "category": "名厨高定特色切割",
    "img": "images/product_butterfly_trout_premium.png",
    "desc": "蝴蝶式平铺展平切割，带骨结构受热均匀，非常适合果木炭烤、明火焗烤或铸铁煎锅。鱼皮均匀酥脆焦香，鱼肉鲜嫩多汁。",
    "specs": [
      {
        "key": "切割形态",
        "value": "蝴蝶展开切（保留脊骨，去内脏）"
      },
      {
        "key": "单包净重",
        "value": "每贴体托盘 400克 - 600克"
      },
      {
        "key": "烹饪耗时",
        "value": "高温烹饪仅需 6–8 分钟"
      },
      {
        "key": "包装类型",
        "value": "高阻隔贴体真空托盘配卡头挂牌"
      },
      {
        "key": "贮存温度",
        "value": "冷藏：0°C 至 +2°C | 冷冻：-18°C"
      }
    ]
  },
  "trout-fillet": {
    "title": "皇家鳟无骨鱼柳（带皮·去肌间细刺）",
    "category": "皇家鳟（伊什汗）名贵精切",
    "img": "images/product_trout_fillet_new.png",
    "desc": "精选皇家伊什汗鳟鱼纯手工精修鱼柳，保留完整鱼皮用于酥脆香煎。深珊瑚粉红鱼肉，带有细腻丝绒油花。",
    "specs": [
      {
        "key": "切割级别",
        "value": "Trim C/D 级修整，手工拔刺（PBO），保留鱼皮"
      },
      {
        "key": "零售规格",
        "value": "每零售托盘净重 200克 - 400克"
      },
      {
        "key": "包装形态",
        "value": "高阻隔热成型真空贴体托盘配品牌纸套腰封"
      },
      {
        "key": "欧米伽-3含量",
        "value": "每 100克鱼肉约含 2.1克高活性 Omega-3"
      },
      {
        "key": "推荐料理",
        "value": "香煎脆皮、烤箱烘焙、雪松木板烟熏炙烤"
      },
      {
        "key": "贮存温度",
        "value": "冷藏：0°C 至 +2°C | 冷冻：-18°C"
      },
      {
        "key": "外箱规格",
        "value": "每主出口纸箱 12 包"
      }
    ]
  },
  "karmrakhayt-fillet": {
    "title": "卡尔马哈特高山鳟鱼柳（带皮·去肌间刺）",
    "category": "高山旗舰鳟鱼招牌精切",
    "img": "images/product_karmrakhayt_fillet_premium.png",
    "desc": "纯正冰川高山冷泉鳟鱼柳（Salmo trutta fario），保留天然金色赤斑鱼皮。肉质紧实弹牙，富含清冽高山活泉矿物原香。",
    "specs": [
      {
        "key": "学名",
        "value": "Salmo trutta fario（亚美尼亚高山鳟）"
      },
      {
        "key": "分割形态",
        "value": "带皮，纯手工修剪，拔除肌间细刺（PBO）"
      },
      {
        "key": "净重规格",
        "value": "每零售贴体托盘 250克 - 450克"
      },
      {
        "key": "包装形式",
        "value": "高阻隔热成型贴体包装配轻奢纸套腰封"
      },
      {
        "key": "推荐料理",
        "value": "酥脆鱼皮香煎、雪松木烤板慢烤、高山香草黄油低温慢浸"
      },
      {
        "key": "贮存温度",
        "value": "冷藏：0°C 至 +2°C | 冷冻：-18°C"
      },
      {
        "key": "保质期限",
        "value": "冷藏 12 天 / 源头急冻 12 个月"
      }
    ]
  },
  "trout-portions": {
    "title": "皇家鳟定重中心切份",
    "category": "皇家鳟（伊什汗）高精定重规格",
    "img": "images/product_trout_portions_premium.png",
    "desc": "克重精准校准的伊什汗中段厚切，专为星级餐饮精准控本与高端生鲜商超便捷烹饪而生。",
    "specs": [
      {
        "key": "单份克重",
        "value": "2块x 150克（共300克）或 4块x 120克（共480克）"
      },
      {
        "key": "包装形式",
        "value": "防漏真空贴体包装配精美纸套腰封"
      },
      {
        "key": "致敏原提示",
        "value": "含有鱼类成分。100% 不含麸质（Gluten-Free）"
      },
      {
        "key": "烹饪耗时",
        "value": "开袋即可烹饪，仅需 6–8 分钟"
      },
      {
        "key": "目标买家",
        "value": "高端超级市场、精品生鲜超市、国际航空配餐"
      }
    ]
  },
  "trout-steak": {
    "title": "皇家鳟带骨厚切鱼排段",
    "category": "皇家鳟（伊什汗）特级厚切",
    "img": "images/product_trout_steak_premium.png",
    "desc": "带中心脊骨横切的皇家伊什汗鳟鱼排，锁住深层骨髓汁液与丰富鲜味。极为适宜高温铁板香煎、炭火直烤与慢炖。",
    "specs": [
      {
        "key": "切割形态",
        "value": "横切鱼排，保留脊骨，保留鱼皮"
      },
      {
        "key": "单包净重",
        "value": "每零售包装 300克 - 500克"
      },
      {
        "key": "包装形式",
        "value": "热成型真空贴体托盘配高端纸套腰封"
      },
      {
        "key": "推荐料理",
        "value": "炭火烧烤、铸铁锅高温香煎、烤箱高温快烤"
      },
      {
        "key": "贮存温度",
        "value": "冷藏：0°C 至 +2°C | 冷冻：-18°C"
      },
      {
        "key": "保质期限",
        "value": "冷藏 12 天 / 冷冻 12 个月"
      }
    ]
  },
  "trout-roe-jar": {
    "title": "BRINQ 尊贵高山鳟鱼子酱（金边玻璃瓶礼盒装）",
    "category": "轻奢尊享系列",
    "img": "images/product_trout_roe_new.png",
    "desc": "璀璨橙红晶莹鱼子颗粒，温和轻柔手工萃取，极低盐度马洛索尔轻盐渍（Malossol < 3.2%）。奢华金边玻璃瓶装配专属展示礼盒。",
    "specs": [
      {
        "key": "颗粒直径",
        "value": "3.8毫米 – 4.5毫米（均匀大颗粒顶级分级）"
      },
      {
        "key": "盐度指标",
        "value": "马洛索尔轻盐工艺（< 3.2% 纯净海盐）"
      },
      {
        "key": "包装规格",
        "value": "真空水晶玻璃瓶（100克 / 200克）配外层展示硬盒"
      },
      {
        "key": "保质期限",
        "value": "-2°C 至 +2°C 温度下 12 个月"
      },
      {
        "key": "色泽口感",
        "value": "鲜亮通透的红宝石橙色，舌尖轻抿即可感受优雅爆浆感"
      }
    ]
  },
  "shrimp-hoso": {
    "title": "凡纳滨对虾 / 南美白对虾（HOSO 带头带壳整虾）",
    "category": "进口甲壳类精选 • 完整整虾",
    "img": "images/shrimp_hoso_whole.png",
    "desc": "新鲜捕捞速冻带头带壳整虾。最大程度保留虾膏天然浓醇甘甜与海洋清新原香，适用于整只盐烤、刺身拼盘与海鲜大餐。",
    "specs": [
      {
        "key": "产品形态",
        "value": "带头带壳（HOSO），生冻"
      },
      {
        "key": "规格大小",
        "value": "HOSO 30/40 尾/公斤"
      },
      {
        "key": "包装规格",
        "value": "1公斤零售自立袋 | 10公斤（10x1公斤）坚固主箱"
      },
      {
        "key": "速冻与冰衣",
        "value": "IQF 单体速冻 | 精准水冰衣 5–6%"
      },
      {
        "key": "原产地",
        "value": "印度进口产地"
      },
      {
        "key": "贮存温度",
        "value": "保存在 -18°C 或更低温度的冷冻库中"
      }
    ]
  },
  "shrimp-hlso": {
    "title": "凡纳滨对虾 / 南美白对虾（HLSO 去头带壳烧烤段）",
    "category": "进口甲壳类精选 • 烧烤炭火专研",
    "img": "images/shrimp_hlso_bbq.png",
    "desc": "去头保留虾壳与尾部完整。专为明火、炭火烤架及日式铁板烧设计，坚固原壳在高温下保护虾肉不干柴、多汁弹牙。",
    "specs": [
      {
        "key": "产品形态",
        "value": "去头带壳（HLSO），生冻"
      },
      {
        "key": "可选规格",
        "value": "16/20、21/25、26/30 尾/磅"
      },
      {
        "key": "包装规格",
        "value": "1公斤零售自立袋 | 10公斤坚固主箱"
      },
      {
        "key": "保护冰衣",
        "value": "均匀保鲜水冰衣 5–6%"
      },
      {
        "key": "推荐料理",
        "value": "极其适合炭火烤串、日式铁板烧与户外BBQ"
      },
      {
        "key": "贮存温度",
        "value": "冷冻贮存温度 -18°C"
      }
    ]
  },
  "shrimp-pdto": {
    "title": "凡纳滨对虾 / 南美白对虾（PDTO 去壳去肠线留尾）",
    "category": "进口甲壳类精选 • 免剥即烹",
    "img": "images/shrimp_pdto_tail_on.png",
    "desc": "手工完全去壳并剔除背部肠线，保留整齐优雅虾尾。专供高端西餐开胃菜、日式天妇罗、大蒜黄油香煎与鸡尾酒冷盘。",
    "specs": [
      {
        "key": "产品形态",
        "value": "去壳去肠线留尾（PDTO），生冻"
      },
      {
        "key": "可选规格",
        "value": "16/20、21/25、26/30、31/40 尾/磅"
      },
      {
        "key": "包装规格",
        "value": "1公斤配高清透视视窗自立袋 | 10公斤主箱"
      },
      {
        "key": "厨房处理",
        "value": "解冻后直接烹饪，无需二次剥壳去线"
      },
      {
        "key": "保护冰衣",
        "value": "冰衣占比 5–6%"
      },
      {
        "key": "贮存温度",
        "value": "冷冻贮存温度 -18°C"
      }
    ]
  },
  "shrimp-pd": {
    "title": "凡纳滨对虾 / 南美白对虾（PD 纯虾仁·去壳去尾去肠线）",
    "category": "进口甲壳类精选 • 100% 净肉率",
    "img": "images/shrimp_pd_tail_off.png",
    "desc": "彻底剥净虾壳、虾尾并清除肠线。100% 鲜嫩纯净可食净虾肉，海鲜意面、西班牙烩饭、轻食沙拉与波奇饭即刻开烹。",
    "specs": [
      {
        "key": "产品形态",
        "value": "去壳去尾去肠线（PD 纯虾仁），生冻"
      },
      {
        "key": "规格大小",
        "value": "PD 31/40 尾/磅"
      },
      {
        "key": "包装规格",
        "value": "1公斤零售自立袋 | 10公斤主箱"
      },
      {
        "key": "食材出率",
        "value": "100% 净肉出成率，厨房后厨零初加工时间"
      },
      {
        "key": "保护冰衣",
        "value": "冰衣占比 5–6%"
      },
      {
        "key": "贮存温度",
        "value": "冷冻贮存温度 -18°C"
      }
    ]
  },
  "box-whole-gutted": {
    "title": "整条去内脏山地鳟（5公斤批发主箱）",
    "category": "高山冷泉鳟 • 餐饮批发大宗规格",
    "img": "images/box_whole_gutted_5kg.png",
    "desc": "整条去腮洗净去内脏的高山鳟鱼，按克重精准校准分级，整齐码放于重型出口外箱中，内覆食品级加厚聚乙烯防护内衬。专供高端生鲜零售柜台与大型餐饮中央厨房。",
    "specs": [
      {
        "key": "切割加工",
        "value": "清洗剖净，保留头尾，去鳃去内脏"
      },
      {
        "key": "净重规格",
        "value": "5.0公斤定重出口标准纸箱"
      },
      {
        "key": "单箱条数",
        "value": "每箱 20–25 条（定标校准）"
      },
      {
        "key": "包装类型",
        "value": "加厚防水重型瓦楞纸箱配食品级聚乙烯内衬"
      },
      {
        "key": "贮存保鲜",
        "value": "冷藏 0–2°C（12天）或冷冻 -18°C（18个月）"
      },
      {
        "key": "原产地",
        "value": "亚美尼亚高地纯净高山冰川冷泉"
      },
      {
        "key": "打托码放",
        "value": "标准欧标托盘每托 72 箱（净重 360 公斤）"
      },
      {
        "key": "权威认证",
        "value": "HACCP、ISO 22000、官方兽医出口卫生证书"
      }
    ]
  },
  "box-butterfly-cut": {
    "title": "蝴蝶切去骨山地鳟（5公斤名厨大宗主箱）",
    "category": "高定精切 • 名厨大宗批发装",
    "img": "images/box_butterfly_cut_5kg.png",
    "desc": "去除中脊骨的蝴蝶展开式高山鳟鱼，展平分层码放，每层覆以食品级隔纸。即拆即烤、零后厨加工损耗，宴席与大型餐饮出品极速。",
    "specs": [
      {
        "key": "切割加工",
        "value": "蝴蝶式展平，去除中骨，解冻即烹"
      },
      {
        "key": "净重规格",
        "value": "5.0公斤定重出口标准纸箱"
      },
      {
        "key": "单箱片数",
        "value": "每箱 10–15 片"
      },
      {
        "key": "包装类型",
        "value": "餐饮级主纸箱，内置食品接触级防粘隔离纸"
      },
      {
        "key": "贮存保鲜",
        "value": "冷藏 0–2°C 或冷冻 -18°C"
      },
      {
        "key": "推荐料理",
        "value": "炭火烧烤、烤箱焗烤、铁板香煎、大型宴席出品"
      },
      {
        "key": "原产地",
        "value": "亚美尼亚高地纯净高山冰川冷泉"
      },
      {
        "key": "权威认证",
        "value": "HACCP、ISO 22000、官方兽医出口卫生证书"
      }
    ]
  },
  "box-fillets": {
    "title": "无骨带皮高山鳟鱼柳（5公斤餐饮与商超主箱）",
    "category": "新鲜精切 • HORECA 餐饮与生鲜商超专供",
    "img": "images/box_fillets_5kg.png",
    "desc": "纯手工精准剔除肌间刺的带皮高山鳟鱼柳，隔层码放方便主厨取用。净肉率高达100%，零多余边角废料损耗，烹饪受热均匀一致。",
    "specs": [
      {
        "key": "切割加工",
        "value": "带皮无骨，纯手工拔除肌间细刺（PBO）"
      },
      {
        "key": "净重规格",
        "value": "5.0公斤定重出口标准纸箱"
      },
      {
        "key": "单箱片数",
        "value": "每箱 20–25 片鱼柳"
      },
      {
        "key": "包装类型",
        "value": "分层防粘隔离主箱配高阻隔内衬膜"
      },
      {
        "key": "贮存保鲜",
        "value": "冷藏 0–2°C 或冷冻 -18°C"
      },
      {
        "key": "出成效率",
        "value": "100% 可食净肉率，零厨房损耗"
      },
      {
        "key": "原产地",
        "value": "亚美尼亚高地纯净高山冰川冷泉"
      },
      {
        "key": "权威认证",
        "value": "HACCP、ISO 22000、官方兽医出口卫生证书"
      }
    ]
  }
};

let currentOpenModalId = null;

function openSpecModal(productId) {
  currentOpenModalId = productId;
  const modal = document.getElementById('specModal');
  const modalContent = document.getElementById('modalContent');
  const data = (currentLang === 'zh' && typeof productSpecsDataZh !== 'undefined')
    ? productSpecsDataZh
    : productSpecsData;
  const item = data[productId] || productSpecsData[productId];

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
    <h4 style="color: #ffffff; font-family: var(--font-heading); margin-bottom: 10px;">
      ${currentLang === 'zh' ? '技术与物流出口规格' : 'Technical & Logistics Specifications'}
    </h4>
    <table class="modal-spec-table">
      <tbody>
        ${tableRows}
      </tbody>
    </table>
    <div style="display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap;">
      <a href="#inquiry" onclick="closeSpecModal()" class="btn btn-primary" style="flex: 1;">
        ${currentLang === 'zh' ? '获取批发采购报价咨询' : 'Inquire for Wholesale Pricing'}
      </a>
      <button onclick="closeSpecModal()" class="btn btn-glass">
        ${currentLang === 'zh' ? '关闭' : 'Close'}
      </button>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSpecModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('modal-close')) {
    return;
  }
  currentOpenModalId = null;
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
   Language Switcher (English / Chinese - Full Internationalization)
   -------------------------------------------------------------------------- */

const i18nData = {
  en: {
  "badge_farm": "FARM DIRECT PRODUCER",
  "top_bar_desc": "High-Altitude Mountain Springs • 100% Traceable • Flash-Frozen & Chilled at Source",
  "top_bar_cta": "B2B Wholesale Inquiries &rarr;",
  "nav_about": "About",
  "nav_how": "How We Grow",
  "nav_cuts": "Signature Cuts",
  "nav_products": "Products & Packaging",
  "nav_standards": "Quality Standards",
  "nav_partner": "Partner With Us",
  "hero_sub": "Two Glacial Legends. Grown with Care. Harvested at Peak Purity.",
  "hero_narrative": "We breed, raise, and pack Armenia's two iconic high-altitude species—<strong>Mountain Trout (Karmrakhayt)</strong> and <strong>Royal Trout (Ishkhan)</strong>—directly at our cold glacial spring pools. 100% natural mountain water flow, zero added hormones, non-GMO feed, and hermetically sealed in protective skin-pack trays within hours of swimming.",
  "badge_altitude": "High Altitude Origin",
  "badge_water": "Crystal Clear Waters",
  "badge_nutrition": "Natural Nutrition",
  "badge_quality": "Premium Quality",
  "hero_cta_products": "Explore All Products",
  "hero_cta_wholesale": "Wholesale Inquiries",
  "hotspot_karm_h": "Glacial Mountain Trout (Karmrakhayt)",
  "hotspot_karm_p": "Firm muscle density, golden-speckled skin • 0% antibiotics",
  "hotspot_skin_h": "Thermoform Skin Pack",
  "hotspot_skin_p": "Airtight vacuum film • 0% leakage • Retail Ready",
  "hotspot_origin_h": "1,800m+ Mountain Origin",
  "hotspot_origin_p": "Traceable direct from high-altitude springs",
  "hotspot_ishkhan_h": "Sevan Royal Trout (Ishkhan)",
  "hotspot_ishkhan_p": "\"Prince of Fish\" • Velvety marbling & delicate flavor",
  "hotspot_map_h": "Modified Atmosphere (MAP) Pack",
  "hotspot_map_p": "Preserves fresh whole trout aroma & texture",
  "hotspot_heritage_h": "Historic Royal Heritage",
  "hotspot_heritage_p": "Endemic Armenian salmonid raised in glacial waters",
  "inspect_text": "Mountain Trout (Karmrakhayt) • Click for Wholesale Specs",
  "inspect_text_ishkhan": "Royal Trout (Ishkhan) • Click for Wholesale Specs",
  "ribbon_h1": "High-Altitude Springs",
  "ribbon_p1": "Continuous natural mountain water flow rich in dissolved oxygen.",
  "ribbon_h2": "Controlled Natural Growth",
  "ribbon_p2": "Non-GMO feed, zero growth promoters, natural swimming in strong currents.",
  "ribbon_h3": "Flash-Packed at Source",
  "ribbon_p3": "Harvested, filleted, and sealed within hours directly beside the raceways.",
  "ribbon_h4": "Global Cold-Chain Export",
  "ribbon_p4": "Certified HACCP & ISO 22000 compliance for international retail & HORECA.",
  "about_subtitle": "ROOTED IN ARMENIA. CONNECTED TO THE WORLD.",
  "about_title": "From Origin<br>to Ocean.",
  "brand_lead": "The story of BRINQ begins in Armenia — a land of majestic mountains, cold waters, and a rich tradition of aquaculture.",
  "brand_body1": "Our inspiration is <strong>Karmrahayt</strong>, Armenian mountain trout distinguished by its characteristic red spots and raised in pristine highland aquaculture. It represents our ambition to introduce distinctive Armenian seafood products to international markets.",
  "brand_body2": "But our vision reaches far beyond one product or one country. At BRINQ, we believe that exceptional seafood deserves access to global markets, wherever it originates. Our ambition is to connect producers, processors, importers, and distributors through reliable international trading partnerships.",
  "brand_tagline": "\"Our journey begins in Armenia. Our vision reaches across the world.\"",
  "mvp_mission_label": "OUR MISSION",
  "mvp_mission_p": "To connect quality seafood with global markets through reliability, transparency, and professional supply chain management.",
  "mvp_vision_label": "OUR VISION",
  "mvp_vision_p": "To become a recognized global B2B seafood brand, trusted by producers and buyers worldwide.",
  "mvp_promise_label": "OUR PROMISE",
  "mvp_promise_p": "Clear origins. Defined specifications. Commitment to every partnership — from the first inquiry to the final delivery.",
  "pill_origins_label": "BRINQ Origins",
  "pill_origins_sub": "Karmrahayt · Rainbow Trout",
  "pill_global_label": "BRINQ Global",
  "pill_global_sub": "Shrimp · Salmon · Squid · Whitefish",
  "grow_subtitle": "THE PRODUCER JOURNEY",
  "grow_title": "How We Grow Our Fish",
  "grow_desc": "Unlike trading companies that purchase from anonymous third-party sources, BRINQ controls every phase of life. From egg incubation in cold springs to processing beside our pools, our closed-loop farm guarantees unmatched taste and firm texture.",
  "proc1_tag": "PRISTINE WATER SOURCE",
  "proc1_h": "Glacial Mountain Springs",
  "proc1_p": "Our pools receive an uninterrupted flow of natural high-altitude mountain water. Constant cold temperatures (8°C – 12°C year-round) provide peak natural dissolved oxygen.",
  "proc1_li1": "Naturally filtered through ancient volcanic basalt rock",
  "proc1_li2": "Gravity-fed continuous fresh flow (no recycled water)",
  "proc1_li3": "Zero industrial or agricultural runoff",
  "proc2_tag": "ETHICAL REARING",
  "proc2_h": "Hatchery & Slow Natural Maturation",
  "proc2_p": "We incubate select roe in our own mountain hatchery. Fish grow slowly against strong water currents, developing firm, resilient muscle tone without excessive soft belly fat.",
  "proc2_li1": "Low stocking density for stress-free swimming",
  "proc2_li2": "Active muscle development against natural currents",
  "proc2_li3": "Certified pedigree mountain trout (Karmrakhayt)",
  "proc3_tag": "100% CLEAN NUTRITION",
  "proc3_h": "Certified Eco-Nutrition & Zero Additives",
  "proc3_p": "Our fish are fed only non-GMO, certified sustainable marine and plant proteins rich in natural astaxanthin and EPA/DHA Omega-3s. We never use antibiotics or growth hormones.",
  "proc3_li1": "100% Non-GMO, fully traceable feed ingredients",
  "proc3_li2": "Natural vibrant coral-pink flesh color",
  "proc3_li3": "Clean, subtly sweet flavor without earthy pond smell",
  "proc4_tag": "AT-SOURCE PACKING",
  "proc4_h": "Humane Harvest & Immediate Sealing",
  "proc4_p": "Our packing facility sits directly adjacent to our spring pools. Cold-harvested fish are processed, hand-trimmed, and sealed under thermoform vacuum in under 3 hours.",
  "proc4_li1": "Hermetic skin-pack trays locking in cellular juices",
  "proc4_li2": "Flash-frozen at source or chilled for live-fresh export",
  "proc4_li3": "Zero delay between swimming and sealing",
  "cmp_title": "The BRINQ Difference: Why Being the Grower Matters",
  "cmp_brinq_badge": "GROWN & PACKED BY BRINQ",
  "cmp_ordinary_badge": "Ordinary Commercial Fish",
  "cmp_b1": "<span class=\"icon check\">&check;</span> <strong>100% Flowing Mountain Springs</strong> with maximum natural oxygen",
  "cmp_b2": "<span class=\"icon check\">&check;</span> <strong>Grown by us from egg to harvest</strong> for complete traceability",
  "cmp_b3": "<span class=\"icon check\">&check;</span> <strong>Packed on-site at the farm</strong> within hours of harvest",
  "cmp_b4": "<span class=\"icon check\">&check;</span> <strong>Zero muddy aftertaste:</strong> clean, sweet, firm mountain flesh",
  "cmp_b5": "<span class=\"icon check\">&check;</span> <strong>Zero hormones, zero antibiotics, non-GMO feed</strong>",
  "cmp_o1": "<span class=\"icon cross\">&times;</span> Stagnant or recycled pond waters with low oxygenation",
  "cmp_o2": "<span class=\"icon cross\">&times;</span> Anonymous broker supply chains with zero farm traceability",
  "cmp_o3": "<span class=\"icon cross\">&times;</span> Fish transported live for days before centralized slaughter",
  "cmp_o4": "<span class=\"icon cross\">&times;</span> Common earthy/muddy flavor requiring heavy seasoning",
  "cmp_o5": "<span class=\"icon cross\">&times;</span> High stocking density, routine preventive pharmaceuticals",
  "cuts_subtitle": "FARM-DIRECT PACKAGING FORMATS",
  "cuts_title": "Three Signature Cuts. Sealed at Source.",
  "cuts_desc": "Harvested from our cold glacial spring pools and hermetically vacuum-sealed within hours. Whether your customers prefer traditional whole fish, fast high-heat grilling, or precision portion plating, each format is sealed directly at our mountain facility.",
  "cut1_title": "Whole Gutted Trout",
  "cut1_tag": "THE PURIST'S PRESENTATION",
  "cut1_narrative": "Carefully cleaned, gutted, and packed with head and tail intact. Retains the trout's natural golden speckling, firm body structure, and pristine glacial aroma.",
  "cut2_title": "Butterfly Split (Opened)",
  "cut2_tag": "FIRE & CHARCOAL READY",
  "cut2_narrative": "Spatchcocked, opened flat with bone-in structure for fast, even heat conductivity. The flesh is fully exposed for searing and flame smoke while skin crisps evenly.",
  "cut3_title": "Portioned Cuts & Fillets",
  "cut3_tag": "PRECISION PLATING",
  "cut3_narrative": "Hand-trimmed center-cut portions and steak cuts with skin intact for crisp searing. Calibrated weights guarantee exact food cost control for retail grocers and restaurant kitchens.",
  "btn_wholesale": "WHOLESALE SPECIFICATIONS",
  "label_weight": "WEIGHT CALIBER",
  "label_packaging": "PACKAGING",
  "label_culinary": "CULINARY METHOD",
  "label_shelf": "SHELF LIFE",
  "label_speed": "COOKING SPEED",
  "label_prep": "PREPARATION",
  "products_subtitle": "RETAIL & HORECA PACKAGING",
  "products_title": "Our Complete Product Portfolio",
  "products_desc": "Engineered for international retail display, extended freshness, and effortless culinary preparation. Each cut is presented in dedicated protective packaging.",
  "filter_all": "All Products",
  "filter_karmrakhayt": "Mountain Trout (Karmrakhayt)",
  "filter_ishkhan": "Royal Trout (Ishkhan)",
  "filter_boxes": "Wholesale 5kg Boxes",
  "filter_seafood": "Caviar & Seafood",
  "cat_karmrakhayt": "Mountain Trout (Karmrakhayt)",
  "cat_sub_karmrakhayt": "Glacial Cold-Spring Trout (Salmo trutta fario) in Skin-Pack Retail Trays",
  "cat_ishkhan": "Royal Trout (Ishkhan)",
  "cat_sub_ishkhan": "Historic Armenian \"Prince of Fish\" (Salmo ischchan) with Velvety Marbling",
  "cat_boxes": "Wholesale 5kg Master Boxes",
  "cat_sub_boxes": "Poly-Lined Heavy Duty Export Cartons for Foodservice, Catering & Seafood Counters",
  "cat_seafood": "Caviar & Selected Seafood",
  "cat_sub_seafood": "Malossol Mountain Trout Roe Pearls & Wild-Caught Ocean Shellfish",
  "prod_whole_gutted": "Whole Gutted Trout",
  "pdesc_whole_gutted": "Carefully cleaned, gutted, and packed with head and tail intact. Retains the trout's natural golden speckling, firm body structure, and pristine glacial aroma.",
  "prod_karm_fillet": "Karmrakhayt Fillet (Skin-On, PBO)",
  "pdesc_karm_fillet": "Boneless, hand-trimmed mountain trout fillet featuring natural golden-crimson speckled skin. Delicate mineral notes and pristine cold-spring flavor.",
  "prod_butterfly": "Butterfly Split (Opened)",
  "pdesc_butterfly": "Spatchcocked, opened flat with bone-in structure for fast, even heat conductivity. The flesh is fully exposed for searing and flame smoke while skin crisps evenly.",
  "prod_whole_ishkhan": "Whole Royal Trout (Ishkhan)",
  "pdesc_whole_ishkhan": "Armenia's historic \"Prince of Fish\" (Salmo ischchan). Velvety marbling, delicate refined sweetness, and tender flakes. Hermetically packed in protective skin / MAP trays.",
  "prod_ishkhan_fillet": "Royal Trout Fillet (Skin-On, PBO)",
  "pdesc_ishkhan_fillet": "Pin-bones removed with surgical precision. Deep salmon-pink flesh with skin intact for a crispy sear and delicate velvety marbling.",
  "prod_ishkhan_portions": "Royal Trout Portions",
  "pdesc_ishkhan_portions": "Hand-trimmed center-cut portions with skin intact for crisp searing. Calibrated weights guarantee exact portion cost control for retail and gourmet kitchens.",
  "prod_ishkhan_steak": "Royal Trout Steak",
  "pdesc_ishkhan_steak": "Master cross-cut trout steaks with central bone and silvery skin for rich, flavorful searing, grilling, and braising in gourmet preparations.",
  "prod_box_whole": "Whole Gutted Trout (5 kg Master Box)",
  "pdesc_box_whole": "Carefully gutted and cleaned head-on mountain trout, layered in heavy-duty poly-lined export cartons. 20–25 calibrated fish ready for retail seafood counters or high-volume kitchens.",
  "prod_box_butterfly": "Butterfly Cut Trout (5 kg Master Box)",
  "pdesc_box_butterfly": "Bone-removed butterfly cut mountain trout opened flat and interleaved with food-safe sheets. Designed for rapid grilling, broiling, and banquet foodservice with zero kitchen waste.",
  "prod_box_fillets": "Skin-On Fillets Trout (5 kg Master Box)",
  "pdesc_box_fillets": "Boneless, skin-on mountain trout fillets featuring distinctive crimson spotting. Calibrated and interleaved for fast portion handling and consistent cooking in hospitality operations.",
  "prod_roe": "BRINQ Trout Roe (Premium Glass Jar)",
  "pdesc_roe": "Luminous orange-red caviar pearls gently extracted and lightly salted (Malossol &lt; 3.2%). Packaged in a luxury gold-rim glass jar with presentation box.",
  "prod_shrimp_hoso": "Vannamei Shrimp (HOSO Whole)",
  "pdesc_shrimp_hoso": "Raw frozen whole shrimp with head and shell intact. Preserves rich natural sweetness and delicate ocean aroma for whole roasting and seafood platters.",
  "prod_shrimp_hlso": "Vannamei Shrimp (HLSO Headless)",
  "pdesc_shrimp_hlso": "Head removed with protective shell and tail intact. Specifically designed for high-heat charcoal grills and open fire to lock in succulent juices.",
  "prod_shrimp_pdto": "Vannamei Shrimp (PDTO Tail-On)",
  "pdesc_shrimp_pdto": "Peeled and deveined with tail segment intact for sophisticated culinary presentation. Perfect for tempura, wok tossing, garlic butter sauté, and cocktails.",
  "prod_shrimp_pd": "Vannamei Shrimp (PD Tail-Off)",
  "pdesc_shrimp_pd": "Fully peeled, deveined, with tail removed. 100% tender edible meat ready for instant cooking in gourmet risottos, creamy pastas, salads, poke bowls, and soups.",
  "badge_purist": "THE PURIST'S PRESENTATION",
  "badge_flagship": "FLAGSHIP MOUNTAIN",
  "badge_fire": "FIRE & CHARCOAL READY",
  "badge_royal": "ROYAL HERITAGE",
  "badge_royal_cut": "ROYAL CUT",
  "badge_precision": "PRECISION PLATING",
  "badge_prime": "PRIME CUT",
  "badge_master_box": "5KG MASTER BOX",
  "badge_luxury": "LUXURY LINE",
  "badge_grill_bbq": "GRILL & BBQ",
  "badge_ideal_bbq": "IDEAL FOR BBQ",
  "badge_ready_cook": "READY TO COOK",
  "badge_edible_yield": "100% EDIBLE YIELD",
  "pcat_karmrakhayt": "Mountain Trout (Karmrakhayt)",
  "pcat_chef_grill": "Gourmet Cut • Chef's Grill Cut",
  "pcat_ishkhan": "Royal Trout (Ishkhan)",
  "pcat_karm_foodservice": "Mountain Trout (Karmrakhayt) • Foodservice",
  "pcat_chef_bulk": "Gourmet Cut • Chef's Bulk Pack",
  "pcat_horeca_retail": "Fresh Cuts • HORECA & Retail",
  "pcat_caviar": "Delicacy / Caviar",
  "pcat_shellfish": "Shellfish Selection",
  "storage_12d": "12 Days Chilled (0°–2°C)",
  "storage_12d_12m": "Shelf Life: 12 days fresh / 12 mo frozen",
  "storage_6_8m": "6–8 mins high heat",
  "storage_chilled_frozen": "Chilled 0–2°C / Frozen -18°C",
  "storage_pan_sear": "Pan Sear • Poach • Bake",
  "storage_grill_pan": "Grill • Pan Fry • Broil",
  "storage_caviar": "Storage: -2°C to +2°C",
  "storage_shrimp_hoso": "Storage: -18°C (Glaze 5–6%)",
  "storage_shrimp_hlso": "Storage: -18°C (IQF Frozen)",
  "storage_shrimp_pdto": "Storage: -18°C (Ready to Cook)",
  "storage_shrimp_pd": "Storage: -18°C (Zero Prep)",
  "btn_view_specs": "View Specs",
  "fmt_pill": "INDUSTRIAL PACKAGING SPECIFICATIONS",
  "fmt_title": "Engineered Packaging Solutions for Global Commerce",
  "fmt_desc": "We supply retail-ready branded units, private label OEM, and master cold-chain export packs engineered for international distribution.",
  "fmt1_tag": "VACUUM SKIN (VSP)",
  "fmt1_h": "Thermoform Skin Pack",
  "fmt1_p": "Ultra-clear multi-layer barrier film vacuum-molded directly to fish contours. 0% drip loss, 2.5x longer chilled shelf-life, and pristine vertical presentation.",
  "fmt2_tag": "RETAIL SLEEVE",
  "fmt2_h": "Branded Sleeve Bands",
  "fmt2_p": "FSC-certified rigid cardboard sleeves with soft-touch matte lamination and metallic foiling. Features multilingual barcodes, nutrition panels, and culinary guides.",
  "fmt3_tag": "BARRIER POUCH",
  "fmt3_h": "Barrier Stand-Up Pouches",
  "fmt3_p": "Heavy-duty nitrogen-flushed barrier pouches with anti-fog product viewing window, easy-tear notches, and hermetic press-to-close zip seals for frozen shellfish.",
  "fmt4_tag": "EXPORT LOGISTICS",
  "fmt4_h": "Insulated Master Cartons",
  "fmt4_p": "Export-ready poly-lined outer cartons equipped with thermal insulation barriers, internal dividers, and gel ice packs engineered for international air freight.",
  "fmt_tag_leak": "0% Leakage",
  "fmt_tag_evoh": "Multi-Layer EVOH",
  "fmt_tag_vert": "Vertical Display",
  "fmt_tag_fsc": "FSC Certified",
  "fmt_tag_foil": "Soft-Touch Foil",
  "fmt_tag_gs1": "GS1 Barcode",
  "fmt_tag_zip": "Resealable Zip",
  "fmt_tag_window": "Anti-Fog Window",
  "fmt_tag_gas": "Gas Flushed",
  "fmt_tag_thermal": "Thermal Foil",
  "fmt_tag_air": "Air Freight ISO",
  "fmt_tag_temp": "-18°C / 0–2°C",
  "standards_subtitle": "CERTIFIED EXCELLENCE",
  "standards_title": "Strict Standards for Global Markets",
  "standards_desc": "Our high-altitude facility operates under rigorous international safety protocols, ensuring seamless customs clearance, veterinary health compliance, and premium retail presentation.",
  "std_haccp": "HACCP Certified",
  "std_haccp_p": "Continuous biological and physical hazard critical control points verified throughout production.",
  "std_iso": "ISO 22000 Food Safety",
  "std_iso_p": "Internationally audited food safety management system covering farm, processing, and cold storage.",
  "std_sustainable": "Sustainable Aquaculture",
  "std_sustainable_p": "Gravity-flow water management, sediment separation, and eco-friendly biological footprint.",
  "std_coldchain": "Unbroken Cold Chain",
  "std_coldchain_p": "Real-time GPS and temperature dataloggers inside every export pallet and air cargo consignment.",
  "inquiry_subtitle": "COMMERCIAL COOPERATION",
  "inquiry_title": "Partner Directly with the Producer",
  "inquiry_p": "Whether you represent a national supermarket chain, a boutique seafood distributor, an airline caterer, or a premium restaurant group, BRINQ delivers consistent volume, strict grading, and export reliability.",
  "benefit1_h": "Direct Farm Pricing",
  "benefit1_p": "Cut out trading intermediaries and deal directly with the aquaculture source.",
  "benefit2_h": "Flexible Packaging & Private Label",
  "benefit2_p": "Available under the BRINQ brand or customized private label specifications.",
  "benefit3_h": "Scheduled Air & Reefer Shipments",
  "benefit3_p": "Weekly scheduled shipments with full veterinary and export documentation.",
  "contact_desk": "Direct Trade Desk:",
  "contact_email_lbl": "Email:",
  "contact_phone_lbl": "Phone / WhatsApp:",
  "contact_location_lbl": "Farm Location:",
  "contact_location_val": "High-Altitude Mountain Springs, Armenia",
  "form_title": "Request Wholesale Catalog & Pricing",
  "form_sub": "Fill out the details below. Our export sales manager will reply within 24 hours.",
  "form_name": "Your Name *",
  "form_company": "Company / Organization *",
  "form_email": "Business Email *",
  "form_phone": "Phone / WhatsApp",
  "form_category": "Business Category",
  "form_interest_label": "Products of Interest",
  "form_message": "Estimated Volume & Target Market",
  "form_submit": "Submit Wholesale Request",
  "form_success": "✓ Thank you! Your request has been logged. Our export director will contact you promptly.",
  "opt_retail": "Supermarket / Retail Chain",
  "opt_horeca": "HORECA (Hotel / Restaurant Group)",
  "opt_distributor": "Seafood Importer / Distributor",
  "opt_private_label": "Private Label Partner",
  "opt_other": "Other Commercial Inquiry",
  "chk_whole_trout": "Whole Karmrakhayt",
  "chk_trout_fillets": "Trout Fillets (Skin-On)",
  "chk_trout_portions": "Butterfly Portions",
  "chk_trout_caviar": "Trout Roe (Caviar)",
  "chk_seafood": "Salmon & Seafood",
  "ph_name": "e.g. David Melikyan",
  "ph_company": "e.g. Metro Foodservice LLC",
  "ph_email": "buyer@company.com",
  "ph_phone": "+1 (555) 000-0000",
  "ph_message": "Tell us your target destination, expected monthly volume (e.g. 2 tons/month), or questions...",
  "footer_desc": "Pure mountain waters. Exceptional taste. We operate closed-loop high-altitude aquaculture facilities delivering farm-direct trout, roe, and premium seafood across the globe.",
  "footer_farm": "The Farm",
  "footer_products": "Products",
  "footer_b2b": "B2B & Partners",
  "footer_how_we_grow": "How We Grow Fish",
  "footer_spring_water": "Spring Water Source",
  "footer_nutrition_health": "Nutrition & Health",
  "footer_sustainability": "Sustainability",
  "footer_prod_whole": "Whole Karmrakhayt",
  "footer_prod_fillet": "Trout Fillets (Skin-On)",
  "footer_prod_butterfly": "Butterfly Portions",
  "footer_prod_caviar": "Trout Roe (Caviar)",
  "footer_prod_seafood": "Selected Seafood",
  "footer_b2b_wholesale": "Wholesale Orders",
  "footer_b2b_oem": "Private Label OEM",
  "footer_b2b_logistics": "Export Logistics",
  "footer_copy": "© 2026 BRINQ Seafood. All rights reserved. Pure taste, a wider world.",
  "footer_privacy": "Privacy Policy",
  "footer_safety": "Food Safety Protocols",
  "footer_terms": "Terms of Supply"
},
  zh: {
  "badge_farm": "养殖场源头直供",
  "top_bar_desc": "高海拔冰川山泉 • 100% 全程可追溯 • 源头急冻锁鲜与冷藏直运",
  "top_bar_cta": "B2B 批发大宗询价 &rarr;",
  "nav_about": "关于品牌",
  "nav_how": "生态养殖",
  "nav_cuts": "招牌精切",
  "nav_products": "产品与包装",
  "nav_standards": "质量认证",
  "nav_partner": "商务合作",
  "hero_sub": "两大高山冰川传奇。生态悉心养育。于峰值纯净时刻捕捞收获。",
  "hero_narrative": "我们直接在亚美尼亚纯净冰川高山泉水池旁，繁育、养殖并加工包装两大标志性高海拔名贵鱼种——<strong>山地冷泉鳟（卡尔马哈特）</strong>与<strong>皇家鳟（伊什汗）</strong>。100%天然高山活泉水流，零激素添加，非转基因饲料，捕捞游动后数小时内即在保护性透明贴体托盘中完成气密密封。",
  "badge_altitude": "高海拔原始源头",
  "badge_water": "冰川晶澈活泉",
  "badge_nutrition": "100%纯天然营养",
  "badge_quality": "国际特级品质",
  "hero_cta_products": "探索完整产品线",
  "hero_cta_wholesale": "批发合作咨询",
  "hotspot_karm_h": "冰川山地冷泉鳟（卡尔马哈特）",
  "hotspot_karm_p": "紧实高弹肉质，天然金色赤红斑纹鱼皮 • 0%抗生素",
  "hotspot_skin_h": "热成型真空贴体托盘",
  "hotspot_skin_p": "气密高阻隔贴体膜 • 0%滴液渗漏 • 零售货架专选",
  "hotspot_origin_h": "1,800米+ 高海拔天然高山原产地",
  "hotspot_origin_p": "直接引自高海拔冰川活泉，全程100%可追溯",
  "hotspot_ishkhan_h": "塞凡湖皇家鳟（伊什汗）",
  "hotspot_ishkhan_p": "“鱼中王子” • 丝绒般细腻油花与清甜口感",
  "hotspot_map_h": "气调锁鲜（MAP）包装",
  "hotspot_map_p": "完整保留鲜鳟鱼天然原香与弹嫩质感",
  "hotspot_heritage_h": "尊贵皇家传承",
  "hotspot_heritage_p": "亚美尼亚特有冰川冷水鲑科名种",
  "inspect_text": "山地冷泉鳟（卡尔马哈特）• 点击查看批发出口规格",
  "inspect_text_ishkhan": "皇家鳟（伊什汗）• 点击查看批发出口规格",
  "ribbon_h1": "高海拔冰川冷泉",
  "ribbon_p1": "终年恒温纯净高山活泉涌流，溶解氧极高。",
  "ribbon_h2": "自然缓慢生长",
  "ribbon_p2": "非转基因饲料，零促生长剂，强劲天然水流中自主畅游育肌。",
  "ribbon_h3": "源头现场极速封装",
  "ribbon_p3": "收割后数小时内直接在养殖池旁完成手工修整与高阻隔密封。",
  "ribbon_h4": "全球全程冷链出口",
  "ribbon_p4": "HACCP 与 ISO 22000 严格认证，符合国际高端零售与餐饮严苛标准。",
  "about_subtitle": "扎根亚美尼亚 · 联通全球商贸",
  "about_title": "源于高山纯境<br>跃入全球海洋。",
  "brand_lead": "BRINQ 的传奇始于亚美尼亚——一片拥有雄伟山峦、纯净冰泉与深厚水产养殖文化的神奇高地。",
  "brand_body1": "我们的灵感源自<strong>卡尔马哈特</strong>（Karmrahayt），这种以独特赤金红斑著称的亚美尼亚高山鳟，成长于纯净的高海拔冷泉水域中。它代表着我们将独具特色的亚美尼亚高端冷水水产带向国际舞台的宏大雄心。",
  "brand_body2": "然而我们的宏图远不止于单一产地。在 BRINQ，我们坚信卓越品质的海鲜应能无界送达全球市场。我们的使命是通过高度可靠的国际贸易桥梁，将原产地生产商、现代加工厂、进口商与顶级分销商紧密相连。",
  "brand_tagline": "“我们的征程始于亚美尼亚，我们的愿景触达全世界。”",
  "mvp_mission_label": "我们的使命",
  "mvp_mission_p": "凭借卓越可靠性、全程透明度与专业冷链供应链管理，将优质海鲜安全送达全球各大主要市场。",
  "mvp_vision_label": "我们的愿景",
  "mvp_vision_p": "成为享誉全球的B2B水产海鲜标杆品牌，赢得全球生产商、买家与主厨的持久信赖。",
  "mvp_promise_label": "我们的承诺",
  "mvp_promise_p": "清晰原产地追溯、严苛规格分选。认真对待每项合作承诺——从最初询价到最终平稳交付。",
  "pill_origins_label": "BRINQ 本源系列",
  "pill_origins_sub": "卡尔马哈特 · 皇家彩虹鳟",
  "pill_global_label": "BRINQ 全球精选",
  "pill_global_sub": "优质对虾 · 尊贵三文鱼 · 鱿鱼 · 白肉深海鱼",
  "grow_subtitle": "源头生产者的执着旅程",
  "grow_title": "我们如何培育出顶尖品质的鱼类",
  "grow_desc": "不同于从匿名第三方渠道采购转售的中间贸易商，BRINQ 全程自主把控鱼类的每一个生命周期。从高山冷泉中的鱼卵孵化，到养殖池旁的就地深加工，全闭环产业链确保了无出其右的鲜美口感与弹韧肉质。",
  "proc1_tag": "纯净高山活泉源头",
  "proc1_h": "冰川高山天然泉水",
  "proc1_p": "养殖水池全年不间断引入天然高海拔山地冷泉。常年8°C至12°C的恒定低温环境，带来极高饱和度的天然溶解氧。",
  "proc1_li1": "穿透远古火山玄武岩天然深层过滤",
  "proc1_li2": "重力自然流动式补水（绝不使用循环再利用死水）",
  "proc1_li3": "远离现代工业与农业污染，纯净零杂质",
  "proc2_tag": "人道生态繁育",
  "proc2_h": "自营孵化与缓慢自然成熟",
  "proc2_p": "我们在高山自建孵化场精心孵育严选鱼卵。鱼苗在强劲山泉水流中逆流自然游动成长，练就紧实坚韧的肌纤维质感，绝无过剩虚浮脂肪。",
  "proc2_li1": "超低放养密度，保障鱼群低压力畅游成长",
  "proc2_li2": "在天然激流中塑造紧致弹性的肌肉组织",
  "proc2_li3": "经官方纯正血统认证的高山鳟（卡尔马哈特）",
  "proc3_tag": "100% 洁净生态营养",
  "proc3_h": "认证生态饲料 & 零人工添加剂",
  "proc3_p": "我们仅投喂经可持续认证的非转基因海洋与植物蛋白，富含天然虾青素与高活性 EPA/DHA 欧米伽-3。坚决杜绝任何抗生素与促生长激素。",
  "proc3_li1": "100%非转基因、来源全程可追溯的优质饲料配方",
  "proc3_li2": "天然孕育出诱人的鲜亮珊瑚粉红鱼肉色泽",
  "proc3_li3": "口感纯净清甜微甘，绝无池塘土腥味与泥腥味",
  "proc4_tag": "源头就地保鲜封装",
  "proc4_h": "人道捕捞 & 数小时内极速密封",
  "proc4_p": "我们的现代化加工包装车间紧邻高山活泉养殖池。冰冷捕捞出水的鲜鱼在3小时内完成去鳞剖洗、精细修边与热成型高真空锁鲜密封。",
  "proc4_li1": "高阻隔贴体托盘紧锁鲜鱼肌理细胞汁液",
  "proc4_li2": "源头急速冷冻或冷藏控温，供全球活鲜空运出口",
  "proc4_li3": "出水游动至密封封装零周转等待延迟",
  "cmp_title": "BRINQ 的本质差异：为什么源头养殖者至关重要",
  "cmp_brinq_badge": "BRINQ 源头养殖与加工封装",
  "cmp_ordinary_badge": "普通商业化散养/转手商品鱼",
  "cmp_b1": "<span class=\"icon check\">&check;</span> <strong>100% 高山奔流活泉</strong>，富含充沛天然溶解氧",
  "cmp_b2": "<span class=\"icon check\">&check;</span> <strong>从鱼卵孵化到捕捞收获全程自营</strong>，实现100%透明可追溯",
  "cmp_b3": "<span class=\"icon check\">&check;</span> <strong>养殖场现场直营车间包装</strong>，捕捞出水后数小时内密封",
  "cmp_b4": "<span class=\"icon check\">&check;</span> <strong>零泥腥气与土腥异味：</strong>肉质清甜、细嫩紧实、回味纯净",
  "cmp_b5": "<span class=\"icon check\">&check;</span> <strong>零激素添加、零抗生素残留、严格非转基因生态饲喂</strong>",
  "cmp_o1": "<span class=\"icon cross\">&times;</span> 停滞死水或循环沉淀塘养殖，溶解氧含量极低",
  "cmp_o2": "<span class=\"icon cross\">&times;</span> 匿名中间商倒手采购链条，产地农场根本无法溯源",
  "cmp_o3": "<span class=\"icon cross\">&times;</span> 活鱼经长途颠簸运输数日后才集中宰杀，品质严重受损",
  "cmp_o4": "<span class=\"icon cross\">&times;</span> 普遍带有浓烈泥土腥味，烹饪时需大量浓烈香料掩盖",
  "cmp_o5": "<span class=\"icon cross\">&times;</span> 养殖密度极高，常态化滥用预防性抗生素与化学制剂",
  "cuts_subtitle": "产地直供多重包装形态",
  "cuts_title": "三大招牌精切规格 · 源头锁鲜密封",
  "cuts_desc": "直接自冰冷清澈的高山泉水池捕捞，并在数小时内完成高科技真空贴体密封。无论您的买家偏好传统完整全鱼、高效炭火快烤，还是米其林标准的精准分量摆盘，各种规格均在我们的高山直营基地封装完成。",
  "cut1_title": "整条去内脏山地鳟",
  "cut1_tag": "至纯主义者的完美呈现",
  "cut1_narrative": "精心剖洗去净内脏，保留完整头尾与天然体型。鱼身自然呈现金橙相间的耀眼红斑，肌肉紧实坚挺，散发纯净冷泉清新香气。",
  "cut2_title": "蝴蝶切剖片（展开式）",
  "cut2_tag": "炭火烧烤与铁板理想之选",
  "cut2_narrative": "专业去脊骨蝴蝶式展平，受热均匀穿透快。鱼肉完整舒展接受炭火烟熏与高温封边，鱼皮酥脆焦香，鱼肉鲜嫩多汁。",
  "cut3_title": "精品分段份量与鱼柳",
  "cut3_tag": "主厨高定精准摆盘",
  "cut3_narrative": "手工细致修剪的中段厚切与无骨带皮鱼排。克重精准标定，为高端生鲜连锁与星级餐厅后厨提供精确的每份菜品成本核算。",
  "btn_wholesale": "查看批发技术规格",
  "label_weight": "规格克重",
  "label_packaging": "包装形态",
  "label_culinary": "推荐烹饪",
  "label_shelf": "保质期限",
  "label_speed": "烹饪耗时",
  "label_prep": "加工处理",
  "products_subtitle": "国际零售与高端餐饮专属规格",
  "products_title": "BRINQ 完整产品线目录",
  "products_desc": "专为国际高档零售陈列、持久新鲜锁味与高效厨房出品而设计。每种精切规格均配有专属高阻隔防护包装。",
  "filter_all": "全部产品系列",
  "filter_karmrakhayt": "山地冷泉鳟（卡尔马哈特）",
  "filter_ishkhan": "皇家尊贵鳟（伊什汗）",
  "filter_boxes": "批发大宗5kg主箱",
  "filter_seafood": "鱼子酱与精选海鲜",
  "cat_karmrakhayt": "山地冷泉鳟（卡尔马哈特）",
  "cat_sub_karmrakhayt": "纯净冰川高山泉水鳟鱼（Salmo trutta fario），透明贴体零售托盘封装",
  "cat_ishkhan": "皇家尊贵鳟（伊什汗）",
  "cat_sub_ishkhan": "亚美尼亚历史悠久的传奇“鱼中王子”（Salmo ischchan），丝绒般细腻油花与尊贵风味",
  "cat_boxes": "批发大宗 5kg 坚固主箱",
  "cat_sub_boxes": "食品级聚乙烯内衬重型加厚出口纸箱，专供生鲜餐饮、连锁商超与海鲜专柜",
  "cat_seafood": "尊贵鱼子酱与精选进口海鲜",
  "cat_sub_seafood": "低盐微咸马洛索尔冷泉鳟鱼子酱与严选深海野生贝类对虾",
  "prod_whole_gutted": "整条去内脏山地冷泉鳟",
  "pdesc_whole_gutted": "精心剖洗去内脏，保留完整头尾。保留鳟鱼天然金色赤红斑纹、紧实肌理与高山冰泉纯净清甜风味。",
  "prod_karm_fillet": "卡尔马哈特无骨鱼柳（带皮·去肌间刺）",
  "pdesc_karm_fillet": "无骨手工精修山地鳟鱼柳，保留天然金色赤斑鱼皮。富含高山冷泉矿物清甜回味，肉质紧密弹牙。",
  "prod_butterfly": "蝴蝶切剖片鳟鱼（展开式）",
  "pdesc_butterfly": "展开式平铺刀工，骨骼架构经专业处理，受热极其均匀。肉面全面接触炭火烟熏焦香，鱼皮均匀起酥。",
  "prod_whole_ishkhan": "整条塞凡皇家鳟（伊什汗）",
  "pdesc_whole_ishkhan": "亚美尼亚享有盛誉的历史“鱼中王子”（Salmo ischchan）。丝绒大理石油花纹理，清甜柔嫩。采用贴体/MAP高阻隔托盘封装。",
  "prod_ishkhan_fillet": "皇家鳟无骨鱼柳（带皮·PBO去刺）",
  "pdesc_ishkhan_fillet": "外科手术级精密度手工拔除肌间细刺。深珊瑚粉红鱼肉，保留完整鱼皮，极易煎出香脆外皮与多汁嫩肉。",
  "prod_ishkhan_portions": "皇家鳟定重中心切份",
  "pdesc_ishkhan_portions": "手工精修中心段份量，保留鱼皮用于酥脆香煎。严格标定克重，保障商超零售与高档餐饮精准控本。",
  "prod_ishkhan_steak": "皇家鳟带骨厚切牛排排段",
  "pdesc_ishkhan_steak": "大师级横切厚段，保留中心骨与银亮鱼皮，锁住丰富骨髓脂香，极适宜炭烤、铸铁锅高温香煎与慢炖。",
  "prod_box_whole": "整条去内脏鳟鱼（5公斤批发主箱）",
  "pdesc_box_whole": "整条洗净去内脏，分层排列于加厚聚乙烯内衬出口专用纸箱中。每箱20–25条定标规格，直接供应海鲜柜台与大型厨房。",
  "prod_box_butterfly": "蝴蝶切去骨鳟鱼（5公斤批发主箱）",
  "pdesc_box_butterfly": "去骨蝴蝶切平铺，每层覆以食品级隔纸。即拆即烤、零后厨加工损耗，宴会与大型餐饮出品神速。",
  "prod_box_fillets": "带皮无骨鳟鱼柳（5公斤批发主箱）",
  "pdesc_box_fillets": "无骨带皮高山鳟鱼柳，鲜亮红斑显眼。定重隔层摆放，极易抓取分装，在连锁酒店与高档餐厅中表现出众。",
  "prod_roe": "BRINQ 尊贵高山鳟鱼子酱（水晶玻璃金边瓶）",
  "pdesc_roe": "璀璨橙红晶莹鱼子颗粒，温和轻柔手工萃取，极低盐度马洛索尔盐渍（< 3.2%）。奢华金边玻璃瓶装配专属礼盒。",
  "prod_shrimp_hoso": "南美白对虾（HOSO 带头带壳整虾）",
  "pdesc_shrimp_hoso": "新鲜捕捞单冻整虾，保留完整虾头与原壳。完美锁住天然甘甜与深海原香，适用于整只盐烤、刺身与海鲜大拼盘。",
  "prod_shrimp_hlso": "南美白对虾（HLSO 去头带壳烧烤段）",
  "pdesc_shrimp_hlso": "去头保留虾壳与尾部完整。专为高温炭火烧烤、日式铁板烧量身打造，原壳护肉不干柴、饱满多汁。",
  "prod_shrimp_pdto": "南美白对虾（PDTO 去壳去肠线留尾）",
  "pdesc_shrimp_pdto": "手工全剥去壳并剔除背部肠线，保留整齐虾尾。高端法餐、日料天妇罗、蒜蓉香煎与鸡尾酒虾开胃冷盘首选。",
  "prod_shrimp_pd": "南美白对虾（PD 纯虾仁·去壳去尾去肠线）",
  "pdesc_shrimp_pd": "彻底剥壳除尾挑除肠线。100%纯净净虾肉，免解冻免切洗直接下锅，意面、烩饭、鲜虾沙拉与海鲜浓汤秒级出餐。",
  "badge_purist": "至纯主义者的完美呈现",
  "badge_flagship": "高山旗舰鱼种",
  "badge_fire": "炭火烧烤与铁板专选",
  "badge_royal": "尊贵皇家传承",
  "badge_royal_cut": "皇家名贵精切",
  "badge_precision": "主厨精准定重摆盘",
  "badge_prime": "特级骨香厚切",
  "badge_master_box": "5KG 出口批发主箱",
  "badge_luxury": "轻奢尊享系列",
  "badge_grill_bbq": "炭烤与烧烤专选",
  "badge_ideal_bbq": "高温烤炉理想之选",
  "badge_ready_cook": "免洗免挑开袋即烹",
  "badge_edible_yield": "100% 纯净可食净肉率",
  "pcat_karmrakhayt": "山地冷泉鳟（卡尔马哈特）",
  "pcat_chef_grill": "名厨特色切割 · 烧烤专研",
  "pcat_ishkhan": "皇家尊贵鳟（伊什汗）",
  "pcat_karm_foodservice": "山地冷泉鳟 · 大型餐饮批发线",
  "pcat_chef_bulk": "名厨大宗装 · 零厨余损耗",
  "pcat_horeca_retail": "高档生鲜切品 · 酒店与零售专柜",
  "pcat_caviar": "珍馐美馔 · 高端鱼子酱",
  "pcat_shellfish": "进口精选贝壳与冷水海鲜",
  "storage_12d": "冷藏 0°–2°C 保鲜 12 天",
  "storage_12d_12m": "保质期：冷藏 12 天 / 源头急冻 12 个月",
  "storage_6_8m": "高温快速烹饪 6–8 分钟",
  "storage_chilled_frozen": "冷藏 0–2°C / 冷冻 -18°C",
  "storage_pan_sear": "香煎 · 低温慢煮 · 烤箱烘焙",
  "storage_grill_pan": "炭烤 · 铸铁香煎 · 烤炉快焗",
  "storage_caviar": "贮藏温度：-2°C 至 +2°C",
  "storage_shrimp_hoso": "冷冻贮存：-18°C（精控保护冰衣 5–6%）",
  "storage_shrimp_hlso": "冷冻贮存：-18°C（IQF 单体速冻）",
  "storage_shrimp_pdto": "冷冻贮存：-18°C（解冻即烹）",
  "storage_shrimp_pd": "冷冻贮存：-18°C（后厨零准备时间）",
  "btn_view_specs": "查看详细规格",
  "fmt_pill": "国际工业级包装技术规范",
  "fmt_title": "专为全球跨国贸易研发的高性能包装解决方案",
  "fmt_desc": "我们提供零售即陈列品牌装、贴牌OEM代工、以及经严密温控测试的国际冷链出口大宗主箱。",
  "fmt1_tag": "真空贴体（VSP）技术",
  "fmt1_h": "热成型真空贴体托盘",
  "fmt1_p": "多层超透明高阻隔膜紧密贴合鱼体自然曲线。0%汁液渗漏，冷藏货架期延长2.5倍，支持立体垂直悬挂陈列。",
  "fmt2_tag": "品牌零售封套",
  "fmt2_h": "专属定制纸板封套腰封",
  "fmt2_p": "FSC环保森林认证加厚硬质纸卡，哑光触感覆膜搭配烫金工艺。标配多语言追溯条形码、营养成分表及多语种烹饪指引。",
  "fmt3_tag": "高阻隔自立袋",
  "fmt3_h": "抗穿刺气调充氮自立袋",
  "fmt3_p": "高韧性充氮保鲜阻隔袋，配防雾高清透光视窗、防滑易撕豁口与气密按压自封拉链，专为冷冻海鲜贝类设计。",
  "fmt4_tag": "跨国冷链出口物流",
  "fmt4_h": "恒温绝热加厚出口主箱",
  "fmt4_p": "出口专用聚乙烯内衬坚固外箱，内置高效相变冰排与航天级铝箔保温隔热层，完全适配跨国空运冷链要求。",
  "fmt_tag_leak": "0% 滴液渗漏",
  "fmt_tag_evoh": "多层 EVOH 超高阻隔",
  "fmt_tag_vert": "支持垂直立式陈列",
  "fmt_tag_fsc": "FSC 绿色森林认证",
  "fmt_tag_foil": "柔触感金属烫印",
  "fmt_tag_gs1": "GS1 国际通用条码",
  "fmt_tag_zip": "可反复密闭保鲜拉链",
  "fmt_tag_window": "防雾高清透视窗",
  "fmt_tag_gas": "高纯度充氮气调防氧化",
  "fmt_tag_thermal": "航天级热反射绝热箔",
  "fmt_tag_air": "ISO 航空冷链专用认证",
  "fmt_tag_temp": "全程温控 -18°C / 0–2°C",
  "standards_subtitle": "官方权威质检认证",
  "standards_title": "通行全球主要市场的严苛品控标准",
  "standards_desc": "我们的高海拔水产养殖与深加工基地在国际最高标准的食品安全体系下运作，确保海关快速通关放行、官方兽医检疫合规、以及终端高端零售的完美呈现。",
  "std_haccp": "HACCP 关键控制点体系认证",
  "std_haccp_p": "对全生产流程实施严苛的生物、化学与物理潜在危害监控，确保关键控制点100%受控。",
  "std_iso": "ISO 22000 国际食品安全管理认证",
  "std_iso_p": "获得国际第三方权威独立审计，严格覆盖生态养殖场、洁净加工车间与超低温冷库。",
  "std_sustainable": "生态可持续循环水产养殖",
  "std_sustainable_p": "重力自然水流梯级管理、沉积物物理分离净化，极低生态足迹，保护高原脆弱生态。",
  "std_coldchain": "不间断全程数智冷链",
  "std_coldchain_p": "每个出口托盘与空运批次均配备实时 GPS 定位与高精度全程温度数据记录黑匣子。",
  "inquiry_subtitle": "商业采购与大宗合作",
  "inquiry_title": "直接与养殖源头生产商建立战略合作",
  "inquiry_p": "无论您代表大型全国性跨国商超连锁、精品高端海鲜进口经销商、国际航空公司配餐集团，还是高端连锁餐饮名店，BRINQ 都能稳定保障充足货源配额、严苛分级品控与可靠准时的出口交付。",
  "benefit1_h": "一手养殖场源头直销价格",
  "benefit1_p": "全面剔除中间贸易多重加价环节，直接与高山水产养殖真正生产源头深度对接。",
  "benefit2_h": "柔性定制包装与贴牌代工 (OEM)",
  "benefit2_p": "支持 BRINQ 自有高端品牌供应，亦可根据客户品牌规范进行专属定制贴牌加工。",
  "benefit3_h": "每周正规定期空运与冷藏海运班期",
  "benefit3_p": "每周固定批次规律排期发货，随货附赠全套官方兽医卫生证书与出口原产地证明。",
  "contact_desk": "国际贸易直联柜台：",
  "contact_email_lbl": "电子邮箱：",
  "contact_phone_lbl": "电话 / WhatsApp：",
  "contact_location_lbl": "基地地址：",
  "contact_location_val": "亚美尼亚高海拔冰川高山泉水基地",
  "form_title": "索取批发报价单与出口产品目录",
  "form_sub": "请在下方提交您的具体采购需求。我们的国际出口销售总监将在24小时内与您取得联系。",
  "form_name": "您的姓名 *",
  "form_company": "公司 / 商业机构名称 *",
  "form_email": "企业商务邮箱 *",
  "form_phone": "联系电话 / WhatsApp / 微信",
  "form_category": "企业业务形态类别",
  "form_interest_label": "感兴趣的产品类别",
  "form_message": "预计采购规模与目标销售市场",
  "form_submit": "立即提交大宗采购申请",
  "form_success": "✓ 提交成功！您的采购申请已安全登记。我们的国际出口总监将很快与您取得联系。",
  "opt_retail": "大型超级市场 / 生鲜零售连锁",
  "opt_horeca": "HORECA（星级酒店 / 餐饮连锁集团）",
  "opt_distributor": "海鲜进口商 / 区域一级批发分销商",
  "opt_private_label": "贴牌加工 (OEM) / 自有品牌定制伙伴",
  "opt_other": "其他商业及特种供应链咨询",
  "chk_whole_trout": "整条山地冷泉鳟（卡尔马哈特）",
  "chk_trout_fillets": "高山鳟无骨鱼柳（带皮）",
  "chk_trout_portions": "名厨特色蝴蝶切与定重段",
  "chk_trout_caviar": "尊贵高山冷泉鳟鱼子酱",
  "chk_seafood": "高品质三文鱼与严选海鲜",
  "ph_name": "例如：王伟 / David Melikyan",
  "ph_company": "例如：华润万家采购部 / Metro Foodservice LLC",
  "ph_email": "buyer@company.com",
  "ph_phone": "+86 138 0000 0000 / 电话或微信号",
  "ph_message": "请告知您的目标收货口岸/城市、预估月采购量（如：每月2吨、40尺冻柜）或任何特殊要求...",
  "footer_desc": "高山纯净水源，非凡原生态口感。我们经营闭环高海拔水产养殖基地，向全球直供高山冷水鲜鳟、珍贵鱼子酱及深海精选海鲜。",
  "footer_farm": "高山养殖场",
  "footer_products": "产品体系",
  "footer_b2b": "B2B 商务合作",
  "footer_how_we_grow": "鱼类生态养殖过程",
  "footer_spring_water": "冰川天然冷泉水源",
  "footer_nutrition_health": "天然生态营养与健康",
  "footer_sustainability": "高原生态可持续性",
  "footer_prod_whole": "整条去内脏卡尔马哈特",
  "footer_prod_fillet": "无骨带皮鳟鱼柳",
  "footer_prod_butterfly": "特色蝴蝶切剖片",
  "footer_prod_caviar": "马洛索尔高山鳟鱼子酱",
  "footer_prod_seafood": "严选深海贝类海鲜对虾",
  "footer_b2b_wholesale": "大宗批发订单采购",
  "footer_b2b_oem": "自有品牌贴牌代工 (OEM)",
  "footer_b2b_logistics": "跨国冷链物流运输",
  "footer_copy": "© 2026 BRINQ Seafood. 版权所有。源于高山纯境，跃入全球海洋。",
  "footer_privacy": "隐私保护政策",
  "footer_safety": "食品安全与检疫规范",
  "footer_terms": "商业供货标准条款"
}
};

let currentLang = 'en';

function initLanguage() {
  const saved = localStorage.getItem('brinq_lang');
  if (saved && (saved === 'en' || saved === 'zh')) {
    setLanguage(saved);
  } else {
    setLanguage('en');
  }
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'zh') return;
  currentLang = lang;
  localStorage.setItem('brinq_lang', lang);

  const t = i18nData[lang];

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Update all form inputs/textareas with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // Update hero inspect pill text dynamically
  const inspectText = document.getElementById('heroInspectText');
  if (inspectText) {
    if (currentActiveSpecies === 'karmrakhayt') {
      inspectText.textContent = t.inspect_text;
    } else {
      inspectText.textContent = t.inspect_text_ishkhan;
    }
  }

  // Update active state on switcher buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Update <html lang> attribute for accessibility
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // If a modal is open, re-render it in the new language
  if (currentOpenModalId) {
    openSpecModal(currentOpenModalId);
  }
}
