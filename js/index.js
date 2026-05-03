document.addEventListener("DOMContentLoaded", function () {
  const loremIbsuLumSlides = Array.from(document.querySelectorAll(".lorem-ibsu-lum-hero-slide"));
  const loremIbsuLumPrevSlide = document.getElementById("lorem-ibsu-lum-prev-slide");
  const loremIbsuLumNextSlide = document.getElementById("lorem-ibsu-lum-next-slide");
  const loremIbsuLumDots = document.getElementById("lorem-ibsu-lum-hero-dots");
  const loremIbsuLumCategoryItems = Array.from(document.querySelectorAll(".lorem-ibsu-lum-category-item"));
  const loremIbsuLumFeaturedGrid = document.getElementById("lorem-ibsu-lum-featured-products");
  const loremIbsuLumFeaturedCount = document.getElementById("lorem-ibsu-lum-featured-count");

  const loremIbsuLumFeaturedProducts = [
    {
      id: "Samsung Galaxy S25 Ultra",
      category: "phones",
      price: "67,500 EGP",
      image: "../images/products/1.png",
      description: "Titanium Black, 12GB RAM, 256GB, 5G",
    },
    {
      id: "Samsung Galaxy S25 Ultra Grey",
      category: "phones",
      price: "67,000 EGP",
      image: "../images/products/3.png",
      description: "Titanium Grey, 12GB RAM, 256GB, 5G",
    },
    {
      id: "Apple iPhone 16 Pro Max",
      category: "phones",
      price: "90,000 EGP",
      image: "../images/products/4.png",
      description: "Desert Titanium, 256GB, 5G with FaceTime",
    },
    {
      id: "Apple iPhone 17 Pro Max",
      category: "phones",
      price: "110,000 EGP",
      image: "../images/products/2.png",
      description: "Orange, 256GB, 5G with FaceTime",
    },
    {
      id: "MacBook Pro",
      category: "laptops",
      price: "1,999 EGP",
      image: "../images/products/macbook-pro.png",
      description: "Portable performance for work and study",
    },
    {
      id: "PS5 Controller",
      category: "controllers",
      price: "70 EGP",
      image: "../images/products/ps5-controller.png",
      description: "Wireless controller for console and PC gaming",
    },
    {
      id: "Webcam",
      category: "cameras",
      price: "95 EGP",
      image: "../images/products/webcam.png",
      description: "Clear video for meetings and streaming",
    },
    {
      id: "SmartWatch",
      category: "wearables",
      price: "200 EGP",
      image: "../images/products/watch.png",
      description: "Daily fitness and notification companion",
    },
    {
      id: "Charging Cable",
      category: "accessories",
      price: "12 EGP",
      image: "../images/products/charging-cable.png",
      description: "Durable cable for phones, tablets, and daily carry",
    },
  ];

  const loremIbsuLumCategoryMap = {
    accessories: ["accessories", "phone accessories", "computer accessories"],
    all: ["all"],
  };

  let loremIbsuLumActiveSlide = 0;
  let loremIbsuLumActiveCategory = "all";
  let loremIbsuLumSlideTimer;

  function loremIbsuLumShowSlide(nextIndex) {
    if (!loremIbsuLumSlides.length) return;

    loremIbsuLumActiveSlide = (nextIndex + loremIbsuLumSlides.length) % loremIbsuLumSlides.length;

    loremIbsuLumSlides.forEach(function (slide, index) {
      slide.classList.toggle("is-active", index === loremIbsuLumActiveSlide);
    });

    if (loremIbsuLumDots) {
      Array.from(loremIbsuLumDots.children).forEach(function (dot, index) {
        dot.classList.toggle("is-active", index === loremIbsuLumActiveSlide);
      });
    }
  }

  function loremIbsuLumStartSlider() {
    window.clearInterval(loremIbsuLumSlideTimer);
    loremIbsuLumSlideTimer = window.setInterval(function () {
      loremIbsuLumShowSlide(loremIbsuLumActiveSlide + 1);
    }, 6000);
  }

  function loremIbsuLumSetupHeroSlider() {
    if (loremIbsuLumSlides.length < 2) return;

    if (loremIbsuLumDots) {
      loremIbsuLumDots.innerHTML = "";
      loremIbsuLumSlides.forEach(function (_, index) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Show slide ${index + 1}`);
        dot.addEventListener("click", function () {
          loremIbsuLumShowSlide(index);
          loremIbsuLumStartSlider();
        });
        loremIbsuLumDots.appendChild(dot);
      });
    }

    loremIbsuLumPrevSlide?.addEventListener("click", function () {
      loremIbsuLumShowSlide(loremIbsuLumActiveSlide - 1);
      loremIbsuLumStartSlider();
    });

    loremIbsuLumNextSlide?.addEventListener("click", function () {
      loremIbsuLumShowSlide(loremIbsuLumActiveSlide + 1);
      loremIbsuLumStartSlider();
    });

    loremIbsuLumShowSlide(0);
    loremIbsuLumStartSlider();
  }

  function loremIbsuLumMatchesCategory(product) {
    if (loremIbsuLumActiveCategory === "all") return true;

    const categoryAliases = loremIbsuLumCategoryMap[loremIbsuLumActiveCategory] || [loremIbsuLumActiveCategory];
    return categoryAliases.includes(product.category);
  }

  function loremIbsuLumRenderFeaturedProducts() {
    if (!loremIbsuLumFeaturedGrid) return;

    const visibleProducts = loremIbsuLumFeaturedProducts.filter(loremIbsuLumMatchesCategory);

    loremIbsuLumFeaturedGrid.innerHTML = visibleProducts
      .map(function (product) {
        const detailsUrl = `product-details.html?id=${encodeURIComponent(product.id)}`;

        return `
          <article class="lorem-ibsu-lum-product-card">
            <a class="lorem-ibsu-lum-product-media" href="${detailsUrl}" aria-label="View ${product.id}">
              <img src="${product.image}" alt="${product.id}" />
            </a>
            <div class="lorem-ibsu-lum-product-content">
              <span class="lorem-ibsu-lum-product-category">${product.category}</span>
              <h3>${product.id}</h3>
              <p>${product.description}</p>
              <strong>${product.price}</strong>
            </div>
          </article>
        `;
      })
      .join("");

    if (loremIbsuLumFeaturedCount) {
      loremIbsuLumFeaturedCount.textContent = `${visibleProducts.length} products`;
    }
  }

  function loremIbsuLumSetupCategories() {
    loremIbsuLumCategoryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        loremIbsuLumActiveCategory = item.dataset.category || "all";

        loremIbsuLumCategoryItems.forEach(function (categoryItem) {
          categoryItem.classList.toggle("is-active", categoryItem === item);
        });

        loremIbsuLumRenderFeaturedProducts();
      });
    });
  }

  loremIbsuLumSetupHeroSlider();
  loremIbsuLumSetupCategories();
  loremIbsuLumRenderFeaturedProducts();
});
