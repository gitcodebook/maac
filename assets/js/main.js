
(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// course card section
const myCourses = [
  {
    title: "VISUAL ARTS & DESIGN",
    img: "assets/img/courses/course-1.1.jpg", short: "Master storytelling through animation.",
    long: "India’s media and entertainment industry is booming, seeking skilled professionals in visual arts and design. To enter, acquire the right skills and get professional training in digital content creation."
  },

  {
    title: "VISUAL EFFECTS (VFX)",
    img: "assets/img/courses/course-2.jpg", short: "Develop visual effects skills for film & TV.",
    long: "A career in VFX is highly sought after, bringing fantasy worlds to life. MAAC Raipur exclusive VFX courses can transform you into a skilled professional, enhancing your abilities and building your career. "
  },
  {
    title: "3D ANIMATION",
    img: "assets/img/courses/course-3.jpg", short: "Expertise in game design & rendering.", long: "The animation industry is rewarding but demanding, driven by innovation, and skilled professionals. To build a successful career in this dynamic field, join the Animation and Filmmaking course."
  },
  {
    title: "AUGMENTED & VIRTUAL REALITY",
    img: "assets/img/courses/course-4.jpg", short: "Learn visual communication & illustration.",
    long: "MAAC Raipur Digital Design courses teach you to effectively use images, words, symbols, and letters to communicate, ensuring your message reaches the right audience at the right time."
  },
  {
    title: "DEGITAL DESIGN & DEVELOPMENT",
    img: "assets/img/courses/course-5.jpg", short: "Master UI/UX and web development.",
    long: "MAAC Raipur Digital Design courses train you to use images, words, symbols, and letters for effective communication, ensuring the right message reaches the right audience at the right time."
  },
  {
    title: "BROADCASTING & FILMMAKING",
    img: "assets/img/courses/course-6.jpg", short: "Explore direction and cinematography.",
    long: "Broadcast media has vast potential. MAAC Raipur course provides hands-on training with broadcasting tools, preparing you for roles in newsrooms or TV and film studios, focusing on both radio and VFX."
  }
];

function initCourseGrid() {
  const grid = document.getElementById('courseGridContainer');

  grid.innerHTML = myCourses.map(c => `
    <div class="course-card">
      <div class="course-image">
        <img src="${c.img}" alt="${c.title}">
      </div>
      <div class="course-overlay">
        <h3>${c.title}</h3>
        <div class="short-info"><p>${c.short}</p></div>
        <div class="long-info"><p>${c.long}</p></div>
        <div class="btn-wrap">
          <button class="animated-button">
            <span class="btn-fill"></span>
            <span class="btn-text">View Details</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Execute on load
initCourseGrid();


// borchure donload section

// 1. Open Modal when "View Details" is clicked
// Update your existing button event listener:
document.addEventListener('click', function(e) {
  if (e.target && (e.target.classList.contains('animated-button') || e.target.closest('.animated-button'))) {
    document.getElementById('brochureModal').style.display = 'block';
  }
});

// 2. Close Modal
document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('brochureModal').style.display = 'none';
});

// 3. Handle Form Submission
document.getElementById('brochureForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Stop page from refreshing
  
  // Collect Data (You can send this to your email or database here)
  const leadData = {
    name: document.getElementById('userName').value,
    email: document.getElementById('userEmail').value,
    phone: document.getElementById('userPhone').value,
    course: document.getElementById('userCourse').value
  };
  
  console.log("New Lead Captured:", leadData);

  // Switch View
  document.getElementById('formContainer').style.display = 'none';
  document.getElementById('downloadContainer').style.display = 'block';
});


// our recuitar section 
const recruiterLogos = [
  { name: "Red Chillies", url: "assets/img/clients/client-1.jpg" },
  { name: "Amazon", url: "assets/img/clients/client-2.jpg" },
  { name: "Tata TextTiles", url: "assets/img/clients/client-3.jpg" },
  { name: "VistaPrint", url: "assets/img/clients/client-4.jpg" },
  { name: "Technicolor", url: "assets/img/clients/client-5.jpg" },
  { name: "Crazy Lad", url: "assets/img/clients/client-6.jpg" },
  { name: "Blue Ocean", url: "assets/img/clients/client-7.jpg" },
  { name: "Shades & Motion", url: "assets/img/clients/client-8.jpg" },
  { name: "Manobal", url: "assets/img/clients/client-9.jpg" },
  { name: "DNEG", url: "assets/img/clients/client-10.jpg" },
  { name: "Digi Tonz", url: "assets/img/clients/client-11.jpg" },
  { name: "Splat", url: "assets/img/clients/client-12.jpg" }
];

function initRecruiterGrid() {
  const grid = document.getElementById('recruiterLogoGrid');

  grid.innerHTML = recruiterLogos.map(logo => `
    <div class="logo-item">
      <img src="${logo.url}" alt="${logo.name}" title="${logo.name}">
    </div>
  `).join('');
}

// Call this along with your course grid function
initRecruiterGrid();



// student feedback section
const feedbackVideos = [
  { id: "NQS6zzArqvU", name: "Abhijit Suryavanshi" },
  { id: "-hRFTKVHSSE", name: "Mandeep Singh Randhawa" },
  { id: "GxaGadSZcoc", name: "Jonathon Baldrey" },
  { id: "-WMcS_QXBAM", name: "Sai Tharun" },
  { id: "mUTxh8IhsSY", name: "Prince Chaurasia" },
  { id: "jhFVt3I_xnY", name: "Vaibhav Soni" }
];

function initFeedbackGrid() {
  const container = document.getElementById('feedbackGrid');

  container.innerHTML = feedbackVideos.map(vid => `
    <div class="video-card">
      <div class="video-container">
        <iframe 
          src="https://www.youtube.com/embed/${vid.id}" 
          title="${vid.name} Feedback" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      <div class="play-overlay">
        <div class="play-button"></div>
      </div>
    </div>
  `).join('');
}

initFeedbackGrid();