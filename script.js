/** MODERN HAMBURGER MENU **/ 
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a, .mobile-nav-link');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
      const href = link.getAttribute('href');
      if (href && href !== '#') window.location.href = href;
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Prevent menu from closing when clicking inside it
  mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

// Navbar solid background on scroll (home + inner pages with transparent nav)
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

// TEAMS //

document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".sidebar ul li");
  const members = document.querySelectorAll(".team-member");

  menuItems.forEach(item => {
      item.addEventListener("click", () => {
          const active = document.querySelector(".sidebar .active");
          if (active) active.classList.remove("active");
          item.classList.add("active");
          const targetGroup = item.getAttribute("data-target");
          members.forEach(member => {
              if (member.getAttribute("data-group") === targetGroup) {
                  member.style.display = "block";
              } else {
                  member.style.display = "none";
              }
          });
      });
  });
});

// Team tabs (About page): Core Group / Board of Directors
document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".team-tab-btn");
  const panels = document.querySelectorAll(".team-group[data-team]");
  if (!tabBtns.length || !panels.length) return;

  function showPanel(teamId) {
    panels.forEach(p => {
      const isMatch = p.getAttribute("data-team") === teamId;
      p.classList.toggle("team-group--hidden", !isMatch);
      p.setAttribute("aria-hidden", isMatch ? "false" : "true");
    });
    tabBtns.forEach(btn => {
      const isActive = btn.getAttribute("data-team") === teamId;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      showPanel(btn.getAttribute("data-team"));
    });
  });
});

const contactForm = document.querySelector(".form-container");
if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = {
        firstname: document.querySelector('input[placeholder="Firstname"]').value,
        lastname: document.querySelector('input[placeholder="Lastname"]').value,
        email: document.querySelector('input[placeholder="Email"]').value,
        subject: document.querySelector('input[placeholder="Subject"]').value,
        message: document.querySelector('textarea[placeholder="Message"]').value
    };

    fetch("https://script.google.com/home/projects/1biNxMbwX_Tzgt5IMQDE5P_9Xf5SpUrj_w1NsootwSQSSVRhM0yREB9_f/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => alert("Message sent!"))
    .catch(error => console.error("Error:", error));
});
}

const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');

        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Filter product cards
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (target === 'all' || category === target) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Read more / Read less (works for either `.more-text` spans or clamped containers)
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const target = button.previousElementSibling;
        if (!target) return;

        const moreText = (typeof target.querySelector === 'function') ? target.querySelector('.more-text') : null;

        // Variant A: explicit hidden span
        if (moreText) {
            const isOpen = moreText.style.display === 'inline';
            moreText.style.display = isOpen ? 'none' : 'inline';
            button.textContent = isOpen ? 'Read more' : 'Read less';
            return;
        }

        // Variant B: toggle expanded class on the container element
        target.classList.toggle('expanded');
        button.textContent = target.classList.contains('expanded') ? 'Read less' : 'Read more';
    });
});

// Get elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

// Open Lightbox on image click
if (lightbox && lightboxImg) {
document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
    });
});
}

// Close Lightbox
if (closeLightbox && lightbox) {
closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});
}

// Also close if clicked outside the image
if (lightbox) {
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
}

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in, .fade-in-right, .fade-in-left");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optional: unobserve after animation triggers once
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  });

if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
AOS.init();
}

// Profile gallery (Company Profile page and About page)
(function () {
    // About page: fixed list of company profile images 1–18 (.webp)
    var aboutProfileSrcs = [];
    for (var n = 1; n <= 18; n++) {
        aboutProfileSrcs.push('Images/updated company profile (1)-' + n + '.webp');
    }

    function buildSrcList(index) {
        var idx = String(index);
        return [
            'Images/pic' + idx + '.png',
            'Images/pic ' + idx + '.png',
            'Images/pic' + idx + '.jpg',
            'Images/pic ' + idx + '.jpg',
            'Images/pic' + idx + ' (1).png',
            'Images/pic' + (index === 1 ? '1 (1)' : ' ' + idx + ' (1)') + '.png',
            'Images/' + idx + '.png',
            'Images/' + idx + '.jpg'
        ];
    }
    function tryLoad(list, onSuccess) {
        if (!list || !list.length) return;
        var src = list.shift();
        var probe = new Image();
        probe.onload = function () { onSuccess(src); };
        probe.onerror = function () { tryLoad(list, onSuccess); };
        probe.src = src;
    }
    function addImageToGallery(galleryEl, src, index) {
        var wrap = document.createElement('figure');
        wrap.className = 'profile-card';
        var img = document.createElement('img');
        img.alt = 'Company profile page ' + (index != null ? index + 1 : '');
        img.loading = 'lazy';
        img.decoding = 'async';
        img.src = src;
        img.addEventListener('click', function () { openLightbox(src, index); });
        wrap.appendChild(img);
        galleryEl.appendChild(wrap);
    }
    function buildGallery(galleryEl, useAboutProfileImages) {
        if (!galleryEl) return;
        var lightbox = document.getElementById('lightbox');
        var lightboxImg = document.getElementById('lightbox-img');
        var closeBtn = document.querySelector('.close-lightbox');
        var prevBtn = document.getElementById('lightbox-prev');
        var nextBtn = document.getElementById('lightbox-next');
        var counterEl = document.getElementById('lightbox-counter');
        var currentIndex = 0;
        var srcList = [];

        function showSlide(index) {
            if (!srcList.length) return;
            currentIndex = (index + srcList.length) % srcList.length;
            if (lightboxImg) lightboxImg.src = srcList[currentIndex];
            if (counterEl) counterEl.textContent = (currentIndex + 1) + ' / ' + srcList.length;
        }
        function openLightbox(src, index) {
            if (!lightbox || !lightboxImg) return;
            if (useAboutProfileImages && srcList.length) {
                currentIndex = index != null ? index : srcList.indexOf(src);
                if (currentIndex < 0) currentIndex = 0;
                lightboxImg.src = srcList[currentIndex];
                if (counterEl) counterEl.textContent = (currentIndex + 1) + ' / ' + srcList.length;
            } else {
                lightboxImg.src = src;
                if (counterEl) counterEl.textContent = '';
            }
            lightbox.style.display = 'flex';
            lightbox.setAttribute('aria-hidden', 'false');
        }
        function closeLightbox() {
            if (!lightbox) return;
            lightbox.style.display = 'none';
            lightbox.setAttribute('aria-hidden', 'true');
        }
        if (useAboutProfileImages) {
            srcList = aboutProfileSrcs.slice();
            aboutProfileSrcs.forEach(function (src, idx) { addImageToGallery(galleryEl, src, idx); });
            if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); showSlide(currentIndex - 1); });
            if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); showSlide(currentIndex + 1); });
            document.addEventListener('keydown', function keyHandler(e) {
                if (lightbox.style.display !== 'flex') return;
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
                if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
            });
        } else {
            for (var i = 1; i <= 22; i++) {
                tryLoad(buildSrcList(i), function (src) { addImageToGallery(galleryEl, src, null); });
            }
        }
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
    }
    document.addEventListener('DOMContentLoaded', function () {
        var aboutGallery = document.getElementById('about-profile-gallery');
        var profileGallery = document.getElementById('profile-gallery');
        if (aboutGallery) buildGallery(aboutGallery, true);
        if (profileGallery) buildGallery(profileGallery, false);
    });
})();

async function loadFacebookFeed() {
  const updatesFeedEl = document.getElementById("updates-feed");
  const loader = document.getElementById("loader");

  // If we're not on the Updates page (elements not present), skip safely
  if (!updatesFeedEl || !loader) {
    console.log("Updates elements not found");
    return;
  }

  console.log("Loading updates for mobile...");

  try {
    // Load from local JSON file instead of RSS
    console.log('Attempting to fetch updates from JSON...');
    const res = await fetch('./data/updates.json');
    console.log('Fetch response status:', res.status);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const updates = await res.json();
    console.log('Successfully loaded updates:', updates);

    loader.style.display = "none";
    updatesFeedEl.innerHTML = ""; // Clear old content

    console.log("Found", updates.length, "updates from JSON");

    updates.forEach((update, index) => {
      const { title, date, image, excerpt, sourceUrl } = update;
      
      console.log(`Update ${index + 1}:`, { title, date, hasImage: !!image });

      const card = document.createElement("article");
      card.className = "update-card";

      // Format date for display
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      card.innerHTML = `
        <div class="modern-card-header">
          ${image ? `<div class="modern-image-container"><img src="${image}" alt="${title}" class="modern-image" onerror="this.style.display='none'"></div>` : `<div class="modern-placeholder"><div class="placeholder-icon">📱</div><div class="placeholder-text">Update</div></div>`}
          <div class="modern-overlay">
            <div class="modern-badge">Update</div>
          </div>
        </div>
        <div class="modern-card-content">
          <div class="modern-title">${title}</div>
          ${excerpt ? `<div class="modern-description">${excerpt}</div>` : ''}
          <div class="modern-actions">
            <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="modern-button">
              <svg class="modern-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>View Post</span>
            </a>
          </div>
        </div>
      `;
      
      // Make entire card clickable
      card.addEventListener('click', (e) => {
        // Don't trigger if clicking on the button
        if (e.target.closest('.modern-button')) return;
        
        // Open the source URL
        if (sourceUrl) {
          window.open(sourceUrl, '_blank', 'noopener,noreferrer');
        }
      });
      
      // Add keyboard accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View update: ${title}`);
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (sourceUrl) {
            window.open(sourceUrl, '_blank', 'noopener,noreferrer');
          }
        }
      });
      
      updatesFeedEl.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading updates:", error);
    if (loader) loader.style.display = "none";
    
    // Fallback: Create some hardcoded updates if JSON fails
    console.log("Creating fallback updates...");
    const fallbackUpdates = [
      {
        id: "fallback-1",
        title: "Industrial Engineering, IT & Computer Science Students OJT at Tabuko Energy",
        date: "2025-01-25",
        image: "Images/update_photos/ojt.jpg",
        excerpt: "Our INDUSTRIAL ENGINEERING, INFORMATION TECHNOLOGY & COMPUTER SCIENCE Students doing their ON THE JOB TRAININGS at TABUKO ENERGY NETWORK CORP.",
        sourceUrl: "https://www.facebook.com/share/p/18kAfpcGMZ/"
      },
      {
        id: "fallback-2", 
        title: "Space Heater Control Panel for Cummins Generator Set",
        date: "2025-01-24",
        image: "Images/update_photos/heater.jpg",
        excerpt: "SPACE HEATER CONTROL PANEL FOR CUMMINS GENERATOR SET - Professional installation and setup of heating control systems.",
        sourceUrl: "https://www.facebook.com/share/p/19iE1Bt8jd/"
      },
      {
        id: "fallback-3",
        title: "Pioneer Adhesive 4th Automatic 10AMPS Battery Charger Panel Assembly",
        date: "2025-01-23",
        image: "Images/update_photos/adhesive.jpg",
        excerpt: "PIONEER ADHESIVE 4TH AUTOMATIC 10AMPS BATTERY CHARGER PANEL ASSY - Advanced battery charging system installation.",
        sourceUrl: "https://www.facebook.com/share/p/1NYzRBgdHU/"
      }
    ];
    
    if (updatesFeedEl) {
      updatesFeedEl.innerHTML = "";
      fallbackUpdates.forEach((update, index) => {
        const { title, image, excerpt, sourceUrl } = update;
        
        const card = document.createElement("article");
        card.className = "update-card";
        
        card.innerHTML = `
          <div class="modern-card-header">
            ${image ? `<div class="modern-image-container"><img src="${image}" alt="${title}" class="modern-image" onerror="this.style.display='none'"></div>` : `<div class="modern-placeholder"><div class="placeholder-icon">📱</div><div class="placeholder-text">Update</div></div>`}
            <div class="modern-overlay">
              <div class="modern-badge">Update</div>
            </div>
          </div>
          <div class="modern-card-content">
            <div class="modern-title">${title}</div>
            ${excerpt ? `<div class="modern-description">${excerpt}</div>` : ''}
            <div class="modern-actions">
              <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="modern-button">
                <svg class="modern-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>View Post</span>
              </a>
            </div>
          </div>
        `;
        
        card.addEventListener('click', (e) => {
          if (e.target.closest('.modern-button')) return;
          if (sourceUrl) {
            window.open(sourceUrl, '_blank', 'noopener,noreferrer');
          }
        });
        
        updatesFeedEl.appendChild(card);
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Only attempt to load the feed if the container exists on the page
  if (document.getElementById("updates-feed")) {
    // Immediate load for mobile
    loadFacebookFeed();
    // Also try again after a short delay
    setTimeout(() => {
      loadFacebookFeed();
    }, 500);
  }
  initTraditionalCarousel();
  removeAutoScrollElements();
});

// Also try on window load as backup
window.addEventListener('load', () => {
  if (document.getElementById("updates-feed")) {
    loadFacebookFeed();
  }
});

// Remove any auto-scroll elements
function removeAutoScrollElements() {
  // Remove any elements with auto-scroll related classes or IDs
  const autoElements = document.querySelectorAll(
    '.auto-scroll-indicator, .auto-play-indicator, #autoPlayIndicator, #auto-scroll-indicator, [class*="auto-scroll"], [class*="auto-play"]'
  );
  
  autoElements.forEach(element => {
    element.remove();
  });
  
  // Also remove any elements that might contain "Auto-scrolling" text
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    if (element.textContent && element.textContent.includes('Auto-scrolling')) {
      element.remove();
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      }
  });
});

// Toggle Description Panel with slide-in animation
function toggleDescription(event, btn) {
  event.preventDefault();
  const serviceCard = btn.closest('.service-card');
  const panel = serviceCard.querySelector('.description-panel');
  
  if (panel.classList.contains('active')) {
      closeDescriptionPanel(panel);
  } else {
      // Close any other open panels first
      document.querySelectorAll('.description-panel.active').forEach(openPanel => {
          closeDescriptionPanel(openPanel);
      });
      
      // Slide in the panel
      panel.classList.add('active');
  }
}

function closeDescriptionPanel(panelOrBtn) {
  let panel;
  
  if (panelOrBtn && panelOrBtn.classList && panelOrBtn.classList.contains('panel-close')) {
      // Called from close button - find the parent panel
      panel = panelOrBtn.closest('.description-panel');
  } else if (panelOrBtn && panelOrBtn.classList && panelOrBtn.classList.contains('description-panel')) {
      // Called with panel directly
      panel = panelOrBtn;
  } else {
      // Find any active panel
      panel = document.querySelector('.description-panel.active');
  }
  
  if (panel) {
      panel.classList.remove('active');
  }
}

// Logo carousel navigation (shows 2 logos at a time)
function updateCarouselButtons(carousel) {
  const container = carousel.querySelector('.client-logo-container');
  const items = container.querySelectorAll('.client-item');
  const active = container.querySelector('.client-item.active');
  const currentIndex = Array.from(items).indexOf(active);
  const prevBtn = carousel.querySelector('.prev-btn');
  const nextBtn = carousel.querySelector('.next-btn');
  
  // Hide previous button when at start (index 0 or 1)
  if (currentIndex === 0 || currentIndex === 1) {
      prevBtn.style.visibility = 'hidden';
  } else {
      prevBtn.style.visibility = 'visible';
  }
  
  // Hide next button when at the last visible pair
  if (currentIndex >= items.length - 2) {
      nextBtn.style.visibility = 'hidden';
  } else {
      nextBtn.style.visibility = 'visible';
  }
}

function nextLogo(button) {
  const carousel = button.closest('.logo-carousel');
  const container = carousel.querySelector('.client-logo-container');
  const items = container.querySelectorAll('.client-item');
  const active = container.querySelector('.client-item.active');
  const currentIndex = Array.from(items).indexOf(active);
  const nextIndex = (currentIndex + 2) % items.length;
  
  active.classList.remove('active');
  items[nextIndex].classList.add('active');
  
  updateCarouselButtons(carousel);
}

function previousLogo(button) {
  const carousel = button.closest('.logo-carousel');
  const container = carousel.querySelector('.client-logo-container');
  const items = container.querySelectorAll('.client-item');
  const active = container.querySelector('.client-item.active');
  const currentIndex = Array.from(items).indexOf(active);
  const prevIndex = (currentIndex - 2 + items.length) % items.length;
  
  active.classList.remove('active');
  items[prevIndex].classList.add('active');
  
  updateCarouselButtons(carousel);
}

// Initialize carousel buttons on page load
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.logo-carousel').forEach(carousel => {
      updateCarouselButtons(carousel);
  });

  // Image Modal Functionality
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.getElementsByClassName('modal-close')[0];

  // Add click event to all product images
  document.querySelectorAll('.product-figure img').forEach(img => {
      img.addEventListener('click', function() {
          modal.style.display = 'block';
          modalImg.src = this.src;
          modalCaption.innerHTML = this.alt;
      });
  });

  // Close modal when clicking the X button
  closeBtn.onclick = function() {
      modal.style.display = 'none';
  }

  // Close modal when clicking outside the image
  modal.onclick = function() {
      modal.style.display = 'none';
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.style.display === 'block') {
          modal.style.display = 'none';
      }
  });

  // Simple Card Gallery Functionality
  const galleryModal = document.getElementById('galleryModal');
  const galleryMainImage = document.getElementById('galleryMainImage');
  const thumbnailContainer = document.getElementById('thumbnailContainer');
  const galleryCloseBtn = document.querySelector('.gallery-close');
  const galleryPrevBtn = document.getElementById('galleryPrevBtn');
  const galleryNextBtn = document.getElementById('galleryNextBtn');

  // Gallery data for each simple card
  const galleryData = {
      'MAIN BREAKER INSTALLATION & REBARRING': [
          'tabuko_photos/q1.png',
          'tabuko_photos/q2.png',
          'tabuko_photos/q3.png',
          'tabuko_photos/q4.png',
          'tabuko_photos/q5.png',
          'tabuko_photos/q6.png',
          'tabuko_photos/q7.png',
          'tabuko_photos/q8.png'
      ],
      'Preventive Maintenance Service of ATS': [
          'tabuko_photos/pms1.jpg',
          'tabuko_photos/pms2.jpg',
          'tabuko_photos/pms3.jpg',
          'tabuko_photos/pms4.jpg',
          'tabuko_photos/pms5.jpg',
          'tabuko_photos/pms6.jpg',
          'tabuko_photos/pms7.jpg',
          'tabuko_photos/pms8.jpg'
      ],
      'Fabrication of GenSet Power House Canopy': [
          'tabuko_photos/genset1.png',
          'tabuko_photos/genset2.png',
          'tabuko_photos/genset3.png',
          'tabuko_photos/genset4.png',
          'tabuko_photos/genset5.png',
          'tabuko_photos/genset6.png',
          'tabuko_photos/genset7.png',
          'tabuko_photos/genset8.png'
      ],
      'Repair & Reconditioning': [
          'tabuko_photos/repair1.png',
          'tabuko_photos/repair2.png',
          'tabuko_photos/repair3.png',
          'tabuko_photos/repair4.png',
          'tabuko_photos/repair5.png',
          'tabuko_photos/repair6.png',
      ],
      'Replacement of Defective Engine Controller': [
          'tabuko_photos/replacement1.jpg',
          'tabuko_photos/replacement2.jpg',
          'tabuko_photos/replacement3.jpg',
          'tabuko_photos/replacement4.jpg',
          'tabuko_photos/replacement5.jpg',
          'tabuko_photos/replacement6.jpg',
          'tabuko_photos/replacement7.jpg',
          'tabuko_photos/replacement8.jpg'
      ],
      'Troubleshooting & Maintenance': [
          'tabuko_photos/1.png',
          'tabuko_photos/2.png',
          'tabuko_photos/3.png',
          'tabuko_photos/4.png',
          'tabuko_photos/7.jpg',
          'tabuko_photos/6.png',
          'tabuko_photos/5.png',
          'tabuko_photos/8.png',
          'tabuko_photos/9.png'
      ],
      'Preventive Maintenance': [
          'tabuko_photos/ek1.jpg',
          'tabuko_photos/ek2.jpg',
          'tabuko_photos/ek3.jpg',
          'tabuko_photos/ek4.jpg',
          'tabuko_photos/ek5.jpg',
          'tabuko_photos/ek6.jpg',
          'tabuko_photos/ek7.jpg',
          'tabuko_photos/ek8.jpg'
      ],
       'Upgrading of Analog Engine Controller to Digital': [
          'tabuko_photos/analog1.jpg',
          'tabuko_photos/analog2.jpg',
          'tabuko_photos/analog3.jpg',
          'tabuko_photos/analog4.jpg',
          'tabuko_photos/analog5.jpg',
          'tabuko_photos/analog6.jpg',
          'tabuko_photos/analog7.jpg',
          'tabuko_photos/analog8.jpg'
      ],
      'Supply Delivery and Installation of Engine Controller': [
          'tabuko_photos/mmda1.jpg',
          'tabuko_photos/mmda2.jpg',
          'tabuko_photos/mmda9.jpg',
          'tabuko_photos/mmda4.jpg',
          'tabuko_photos/mmda5.jpg',
          'tabuko_photos/mmda6.jpg',
          'tabuko_photos/mmda7.jpg',
          'tabuko_photos/mmda8.jpg'
      ]

  };

  let currentGallery = [];
  let currentImageIndex = 0;

  // Add click event to simple card images
  document.querySelectorAll('.simple-card-image').forEach(img => {
      img.addEventListener('click', function() {
          const cardTitle = this.closest('.simple-card').querySelector('h3').textContent;
          currentGallery = galleryData[cardTitle] || [this.src];
          currentImageIndex = 0;
          
          openGallery();
          updateGalleryImage();
      });
  });

  function openGallery() {
      galleryModal.style.display = 'block';
      createThumbnails();
  }

  function createThumbnails() {
      thumbnailContainer.innerHTML = '';
      
      currentGallery.forEach((imageSrc, index) => {
          const thumbnail = document.createElement('img');
          thumbnail.src = imageSrc;
          thumbnail.className = 'thumbnail';
          if (index === 0) thumbnail.classList.add('active');
          
          thumbnail.addEventListener('click', () => {
              currentImageIndex = index;
              updateGalleryImage();
          });
          
          thumbnailContainer.appendChild(thumbnail);
      });
  }

  function updateGalleryImage() {
      galleryMainImage.src = currentGallery[currentImageIndex];
      
      // Update active thumbnail
      document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
          thumb.classList.toggle('active', index === currentImageIndex);
      });
  }

  function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
      updateGalleryImage();
  }

  function prevImage() {
      currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
      updateGalleryImage();
  }

  // Gallery navigation
  galleryNextBtn.addEventListener('click', nextImage);
  galleryPrevBtn.addEventListener('click', prevImage);

  // Close gallery modal
  galleryCloseBtn.onclick = function() {
      galleryModal.style.display = 'none';
  }

  galleryModal.onclick = function(e) {
      if (e.target === galleryModal) {
          galleryModal.style.display = 'none';
      }
  };

  // Keyboard navigation
  document.addEventListener('keydown', function(event) {
      if (galleryModal.style.display === 'block') {
          if (event.key === 'Escape') {
              galleryModal.style.display = 'none';
          } else if (event.key === 'ArrowRight') {
              nextImage();
          } else if (event.key === 'ArrowLeft') {
              prevImage();
          }
      }
  });

  // Card Pagination Functionality
  let currentCardSet = 0;
  const allCards = [
      { img: 'tabuko_photos/breakerinstallation.png', title: 'MAIN BREAKER INSTALLATION & REBARRING', desc: 'DOST' },
      { img: 'tabuko_photos/pmsats.jpg', title: 'Preventive Maintenance Service of ATS', desc: 'Coast Boracay Hotel' },
      { img: 'tabuko_photos/genset.jpg', title: 'Fabrication of GenSet Power House Canopy', desc: 'Murata' },
      { img: 'tabuko_photos/repair.jpg', title: 'Repair & Reconditioning', desc: 'National Grid of the Philippines' },
      { img: 'tabuko_photos/replacement.jpg', title: 'Replacement of Defective Engine Controller', desc: 'Philippine National Oil Company Bataan' },
      { img: 'tabuko_photos/troubleshoot.jpg', title: 'Troubleshooting & Maintenance', desc: 'Philippine National Oil Company Bataan' },
      { img: 'tabuko_photos/ek.jpg', title: 'Preventive Maintenance', desc: 'Enchanted Kingdom' },
      { img: 'tabuko_photos/analog.jpg', title: 'Upgrading of Analog Engine Controller to Digital', desc: 'National Grid of the Philippines' },
      { img: 'tabuko_photos/mmda3.jpg', title: 'Supply Delivery and Installation of Engine Controller', desc: 'Metropolitan Manila Development Authority' }
  ];

  // determine how many cards should be visible per page based on viewport width
  function getCardsPerSet() {
      // breakpoints roughly match the CSS grid adjustments
      if (window.innerWidth <= 900) {
          return 2;   // mobile / small tablet
      }
      return 4;       // default desktop
  }

  function showNextCards() {
      const totalSets = Math.ceil(allCards.length / getCardsPerSet());
      
      if (currentCardSet < totalSets - 1) {
          currentCardSet++;
          updateCardDisplay();
      }
  }

  function showPreviousCards() {
      if (currentCardSet > 0) {
          currentCardSet--;
          updateCardDisplay();
      }
  }

  function updateCardDisplay() {
      const cardsContainer = document.querySelector('.simple-cards-grid');
      const cards = cardsContainer.querySelectorAll('.simple-card');
      const perSet = getCardsPerSet();
      const totalSets = Math.ceil(allCards.length / perSet);
      if (currentCardSet >= totalSets) {
          currentCardSet = totalSets - 1;
      }
      const startIndex = currentCardSet * perSet;

      // show/hide navigation buttons based on current set
      const prevNav = document.querySelector('.card-navigation .prev-btn');
      const nextNav = document.querySelector('.card-navigation .next-btn');
      if (prevNav) {
          prevNav.style.visibility = currentCardSet === 0 ? 'hidden' : 'visible';
      }
      if (nextNav) {
          nextNav.style.visibility = currentCardSet >= totalSets - 1 ? 'hidden' : 'visible';
      }

      cards.forEach((card, i) => {
          const cardIndex = startIndex + i;
          if (cardIndex < allCards.length && i < perSet) {
              const cardData = allCards[cardIndex];
              const img = card.querySelector('.simple-card-image');
              const title = card.querySelector('h3');
              const desc = card.querySelector('p');

              img.src = cardData.img;
              img.alt = `Project ${cardIndex + 1}`;
              title.textContent = cardData.title;
              desc.textContent = cardData.desc;
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  }

  // initialize card display and expose controls globally
  updateCardDisplay();
  window.showNextCards = showNextCards;
  window.showPreviousCards = showPreviousCards;

  // reflow if viewport size changes so number per set may change
  window.addEventListener('resize', updateCardDisplay);

  // reveal observer for animations
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in').forEach(el => {
      revealObserver.observe(el);
  });

  // nav shadow on scroll
  window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (window.pageYOffset > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
  });
});

function openVideoModal() {
  document.getElementById('videoModal').style.display = 'flex';
  const video = document.querySelector('#videoModal video');
  if (video) {
      video.play();
  }
}

function closeVideoModal() {
  document.getElementById('videoModal').style.display = 'none';
  const video = document.querySelector('#videoModal video');
  if (video) {
      video.pause();
      video.currentTime = 0;
  }
}

// Close modal when clicking outside the content
window.onclick = function(event) {
  const modal = document.getElementById('videoModal');
  if (event.target == modal) {
      closeVideoModal();
  }
}

// Automatic carousel functionality
let currentSlide = 0;
let totalSlides = 0;
let cardsPerView = 3;
let autoPlayInterval = null;
let lastPostCount = 0;

function initTraditionalCarousel() {
  const updatesGrid = document.getElementById('updates-feed');
  const indicators = document.getElementById('carouselIndicators');
  
  if (!updatesGrid) return;

  // Wait for cards to load, then initialize
  setTimeout(() => {
    setupCarousel();
  }, 1000);
  
  // Fallback: Try to initialize again after 2 seconds if no cards found
  setTimeout(() => {
    const cards = updatesGrid.querySelectorAll('.update-card');
    if (cards.length > 0 && totalSlides === 0) {
      console.log('Fallback: Re-initializing carousel...');
      setupCarousel();
    }
  }, 2000);
  
  // Additional fallback after 5 seconds
  setTimeout(() => {
    const cards = updatesGrid.querySelectorAll('.update-card');
    if (cards.length > 0) {
      console.log('Final fallback: Setting up carousel...');
      setupCarousel();
    }
  }, 5000);

  function setupCarousel() {
    const cards = updatesGrid.querySelectorAll('.update-card');
    console.log('Setting up carousel with', cards.length, 'cards');
    if (cards.length === 0) {
      console.log('No cards found, skipping carousel setup');
      return;
    }

    // Check if new posts were added
    if (cards.length > lastPostCount) {
      currentSlide = 0; // Reset to first slide for new posts
      lastPostCount = cards.length;
    }

    // Calculate cards per view based on screen size
    updateCardsPerView();
    
    // Calculate total slides
    totalSlides = Math.ceil(cards.length / cardsPerView);
    
    // Create infinite loop by duplicating cards
    createInfiniteLoop();
    
    // Create indicators
    createIndicators();
    
    // Start continuous auto-play
    startContinuousAutoPlay();
    console.log('Infinite carousel initialized with', totalSlides, 'slides');
  }

  function createInfiniteLoop() {
    const cards = updatesGrid.querySelectorAll('.update-card');
    if (cards.length === 0) return;

    // Clone all cards and append them for seamless loop
    const clonedCards = Array.from(cards).map(card => card.cloneNode(true));
    clonedCards.forEach(clonedCard => {
      clonedCard.classList.add('cloned-card');
      updatesGrid.appendChild(clonedCard);
    });

    // Set initial position to show first set of cards
    const cardWidth = cards[0].offsetWidth;
    const gap = 32;
    updatesGrid.style.transform = `translateX(0px)`;
  }

  function updateCardsPerView() {
    const containerWidth = window.innerWidth;
    if (containerWidth < 480) {
      cardsPerView = 1;
    } else if (containerWidth < 768) {
      cardsPerView = 1;
    } else if (containerWidth < 1024) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
    console.log('Cards per view set to:', cardsPerView, 'for width:', containerWidth);
  }

  function createIndicators() {
    if (!indicators) return;
    
    indicators.innerHTML = '';
    
    // Limit to maximum 5 dots for better mobile experience
    const maxDots = Math.min(totalSlides, 5);
    
    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      if (i === (currentSlide % maxDots)) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => {
        // Calculate which slide to go to based on dot position
        const targetSlide = Math.floor((currentSlide / totalSlides) * totalSlides) + i;
        goToSlide(targetSlide % totalSlides);
      });
      
      indicators.appendChild(dot);
    }
    
    // Page indicator removed for cleaner look
  }

  function updateCarousel() {
    const cards = updatesGrid.querySelectorAll('.update-card:not(.cloned-card)');
    if (cards.length === 0) return;

    // Add sliding class for smooth animation
    updatesGrid.classList.add('sliding');

    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem gap
    const translateX = -(currentSlide * (cardWidth + gap) * cardsPerView);
    
    // Apply smooth transform
    updatesGrid.style.transform = `translateX(${translateX}px)`;
    
    // Add slide animations to visible cards
    const allCards = updatesGrid.querySelectorAll('.update-card');
    allCards.forEach((card, index) => {
      const isVisible = index >= currentSlide * cardsPerView && 
                       index < (currentSlide + 1) * cardsPerView;
      
      if (isVisible) {
        card.classList.add('slide-in');
        card.classList.remove('slide-out');
      } else {
        card.classList.add('slide-out');
        card.classList.remove('slide-in');
      }
    });
    
    // Handle infinite loop reset
    if (currentSlide >= totalSlides) {
      setTimeout(() => {
        console.log('Resetting to start for infinite loop');
        updatesGrid.style.transition = 'none';
        updatesGrid.style.transform = 'translateX(0px)';
        currentSlide = 0;
        setTimeout(() => {
          updatesGrid.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
      }, 1200);
    }
    
    // Remove sliding class after animation
    setTimeout(() => {
      updatesGrid.classList.remove('sliding');
    }, 1500);
    
    // Update indicators
    if (indicators) {
      const dots = indicators.querySelectorAll('.carousel-dot');
      const maxDots = Math.min(totalSlides, 5);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === (currentSlide % maxDots));
      });
      
      // Page indicator removed
    }
  }

  function nextSlideInfinite() {
    const cards = updatesGrid.querySelectorAll('.update-card:not(.cloned-card)');
    if (cards.length === 0) return;

    const cardWidth = cards[0].offsetWidth;
    const gap = 16; // Reduced gap for mobile
    const slideWidth = (cardWidth + gap) * cardsPerView;
    
    currentSlide++;
    
    // Calculate the new position
    const newPosition = -(currentSlide * slideWidth);
    updatesGrid.style.transform = `translateX(${newPosition}px)`;
    
    console.log(`Infinite slide ${currentSlide}, position: ${newPosition}px, total slides: ${totalSlides}, cardWidth: ${cardWidth}`);
    
    // If we've moved past all original slides, reset to beginning
    if (currentSlide >= totalSlides) {
      setTimeout(() => {
        console.log('Resetting to start for infinite loop');
        currentSlide = 0;
        updatesGrid.style.transition = 'none';
        updatesGrid.style.transform = 'translateX(0px)';
        setTimeout(() => {
          updatesGrid.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
      }, 1200);
    }
    
    // Update indicators
    if (indicators) {
      const dots = indicators.querySelectorAll('.carousel-dot');
      const maxDots = Math.min(totalSlides, 5);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === (currentSlide % maxDots));
      });
      
      // Page indicator removed
    }
  }

  function nextSlide() {
    console.log(`Moving from slide ${currentSlide} to ${currentSlide + 1}`);
    currentSlide++;
    updateCarousel();
  }

  function prevSlide() {
    console.log(`Moving from slide ${currentSlide} to ${(currentSlide - 1 + totalSlides) % totalSlides}`);
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
    resetAutoPlay();
  }

  function startContinuousAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    console.log('Starting continuous infinite carousel...');
    autoPlayInterval = setInterval(() => {
      console.log('Auto-moving to next slide...');
      nextSlideInfinite();
    }, 5000); // 5 seconds for continuou  s movement
  }

  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    console.log('Starting auto-play carousel...');
    autoPlayInterval = setInterval(() => {
      console.log('Auto-moving to next slide...');
      nextSlide();
    }, 4000); // 4 seconds for more dynamic movement
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    setTimeout(startContinuousAutoPlay, 1000); // Resume after 1 second
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      resetAutoPlay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      resetAutoPlay();
    }
  });

  // Enhanced touch/swipe support for mobile
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let hasMoved = false;

  updatesGrid.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
    hasMoved = false;
    stopAutoPlay();
    console.log('Touch start at:', startX, startY);
  });

  updatesGrid.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = Math.abs(currentX - startX);
    const diffY = Math.abs(currentY - startY);
    
    // Only prevent default if it's a horizontal swipe
    if (diffX > diffY && diffX > 10) {
      e.preventDefault();
      hasMoved = true;
    }
  });

  updatesGrid.addEventListener('touchend', (e) => {
    if (!isDragging || !hasMoved) {
      isDragging = false;
      return;
    }
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = Math.abs(startY - endY);
    const threshold = 30; // Reduced threshold for better sensitivity

    console.log('Touch end at:', endX, 'diffX:', diffX, 'diffY:', diffY);

    // Only trigger if it's a horizontal swipe
    if (Math.abs(diffX) > threshold && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        console.log('Swipe left - next slide');
        nextSlide();
      } else {
        console.log('Swipe right - prev slide');
        prevSlide();
      }
    }
    
    isDragging = false;
    hasMoved = false;
    setTimeout(startContinuousAutoPlay, 3000); // Resume after 3 seconds
  });

  // Add click handlers for manual navigation
  updatesGrid.addEventListener('click', (e) => {
    const rect = updatesGrid.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const centerX = rect.width / 2;
    
    if (clickX > centerX) {
      console.log('Click right side - next slide');
      nextSlide();
    } else {
      console.log('Click left side - prev slide');
      prevSlide();
    }
  });

  // Pause on hover
  updatesGrid.addEventListener('mouseenter', stopAutoPlay);
  updatesGrid.addEventListener('mouseleave', () => {
    startContinuousAutoPlay();
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    updateCardsPerView();
    totalSlides = Math.ceil(updatesGrid.querySelectorAll('.update-card').length / cardsPerView);
    currentSlide = Math.min(currentSlide, totalSlides - 1);
    createIndicators();
    updateCarousel();
  });

  // Check for new posts every 30 seconds
  setInterval(() => {
    const cards = updatesGrid.querySelectorAll('.update-card');
    if (cards.length > lastPostCount) {
      currentSlide = 0; // Reset to first slide for new posts
      lastPostCount = cards.length;
      setupCarousel();
    }
  }, 30000);
}

//VIdeo Carousel
const videos = document.querySelectorAll('.slide');
const fills = document.querySelectorAll('.progress-fill');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;
let rafId = null;

function resetProgress() {
  fills.forEach(f => f.style.width = '0%');
}

function stopProgress() {
  cancelAnimationFrame(rafId);
}

function startProgress(video, fill) {
  stopProgress();

  function update() {
    if (video.paused || video.ended) return;

    const percent = (video.currentTime / video.duration) * 100;
    fill.style.width = percent + '%';
    rafId = requestAnimationFrame(update);
  }

  rafId = requestAnimationFrame(update);
}

function showSlide(i) {
  stopProgress();
  resetProgress();

  videos.forEach((v, idx) => {
    v.classList.toggle('active', idx === i);
    v.pause();
    v.currentTime = 0;
  });

  const video = videos[i];

  function playVideo() {
    video.play();
    startProgress(video, fills[i]);
  }

  if (video.readyState >= 1) {
    // Metadata already loaded
    playVideo();
  } else {
    // Wait until metadata loads
    video.addEventListener('loadedmetadata', playVideo, { once: true });
  }

  video.onended = () => {
    index = (index + 1) % videos.length;
    showSlide(index);
  };
}


nextBtn.onclick = () => {
  index = (index + 1) % videos.length;
  showSlide(index);
};

prevBtn.onclick = () => {
  index = (index - 1 + videos.length) % videos.length;
  showSlide(index);
};

showSlide(index);