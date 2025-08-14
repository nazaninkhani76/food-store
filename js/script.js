//  تعریف ثابت‌ها و متغیرها (Selectors, API url, state variables)
const apiUrl = "https://www.themealdb.com/api/json/v1/1/"; // آدرس API غذاها از سایت themealdb
const notification = document.querySelector("#notification");
const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const burgerMenu = document.querySelector("#burger-menu");
const mainMenu = document.querySelector("#main-menu ul");
const burgerMenuList = document.querySelector("#burger-menu ul");
const cartIcon = document.querySelector("#cart-icon");
const closeCart = document.querySelector("#close-cart");
const modal = document.querySelector("#modal");
const productList = document.querySelector("#product-list");
const searchForm = document.querySelector("#form");
const searchResultEl = document.querySelector("#searchQuery");
const authSection = document.querySelector("#user-section");
const searchInput = document.querySelector("#search-input");
const backToTopBtn = document.querySelector("#back-to-top");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout-button");
const loginReminder = document.querySelector("#login-reminder");
const cartItems = document.querySelector("#cart-items");
const searchResultsDropdown = document.querySelector("#search-results");
const searchResultsList = document.querySelector("#search-results-list");
const searchBtn = document.querySelector("#search-btn");

// ============================================================  متغیرهای وضعیت =========================================================
let mealData = []; // لیست غذاها
let favouriteList = []; // لیست علاقه‌مندی‌ها
let cart = []; // سبد خرید

// ============================================================  توابع کمکی ============================================================

//نمایش نوتیفیکیشن به کاربر
function showNotification(message, type = "success") {
  notification.textContent = message;
  notification.classList.remove("hidden", "error");
  notification.classList.add("show");

  if (type === "error") {
    notification.classList.add("error");
  }
  setTimeout(() => {
    notification.classList.remove("show", "error");
    notification.classList.add("hidden");
    notification.textContent = "";
  }, 3000);
}

// محدودیت کاراکتر
function characterLimit(selector, maxLength) {
  document.querySelectorAll(selector).forEach((el) => {
    const fullText = el.textContent.trim();
    if (fullText.length > maxLength) {
      el.textContent = fullText.slice(0, maxLength) + "...";
    }
  });

  // محدودیت 60 کاراکتر توضیحات محصول
  // document.querySelectorAll(".product_desc").forEach((p) => {
  //   const fullText = p.textContent.trim();
  //   // console.log(fullText.length)
  //   const maxLength = 50;
  //   if (fullText.length > maxLength) {
  //     p.textContent = fullText.slice(0, maxLength) + "...";
  //   }
  // });

  // محدودیت 60 کاراکتر عنوان محصول
  // document.querySelectorAll(".product-title").forEach((p) => {
  //   const fullText = p.textContent.trim();
  //   // console.log(fullText.length)
  //   const maxLength = 30;
  //   if (fullText.length > maxLength) {
  //     p.textContent = fullText.slice(0, maxLength) + "...";
  //   }
  // });
}

// ================================================ نمایش غذا) توابع دریافت داده از API) ================================================
// ------تابع دریافت غذاها از API-------
async function getFetchProduct() {
  try {
    const response = await fetch(`${apiUrl}search.php?s=`);
    if (!response.ok) {
      throw new Error(`HTTP ERROR! Status:${response.status}`);
    }
    const data = await response.json();
    // ایجاد ویژگی قیمت
    mealData = data.meals.map((meal) => {
      meal.price = Math.floor(Math.random() * (60 - 5 + 1)) + 5;
      meal.quantity = 1;
      return meal;
    });
    console.log(mealData);
    displayFood(mealData);
  } catch (error) {
    console.log("Error:", error);
  }
}

// ===================================================== جزییات توابع نمایش غذا==========================================================
// -----نمایش لیست غذاها در HTML---------
function displayFood(meals) {
  productList.innerHTML = "";
  meals.forEach((meal) => {
    const isFav = favouriteList.some((p) => p.id === meal.idMeal);

    // تعیین کلاس آیکون لایک/دیسلایک
    const heartIconClass = isFav ? "❤️" : "🤍";

    // ایجاد آیتم محصول
    const mealItem = `
      <div class="product-card" data-id="${meal.idMeal}" id="product-card">
        
        <!-- لایک -->
<span class="heart-icon ${isFav ? "" : "unliked"}">${heartIconClass}</span>

            <!-- عکس محصول-->
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

            <!-- اسم + توضیحات محصول-->
            <div class="product-info">
              <h3 class="product-title">${meal.strMeal}</h3>
              <p class="product_desc">
                ${meal.strInstructions}
              </p>
            </div>

            <!-- قیمت + سبدخرید محصول-->
            <div class="product__card__icon">
              <!-- قیمت -->
              <p>${meal.price} $</p>

              <!-- سبد خرید -->
              <button onclick="addToCard('${meal.idMeal}', '${
      meal.strMeal
    }', '${meal.price}', '${meal.strMealThumb}', ${meal.quantity})">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
    
    `;
    productList.innerHTML += mealItem;

    // محدودیت  کاراکتر-
    characterLimit(".product_desc", 50);
    characterLimit(".product-title", 30);
  });
}
// ==========================================منطقه جغرافیایی) سرچ توابع دریافت داده از API) ===========================================

//  -----دریافت غذا بر اساس منطقه جغرافیایی------
async function getFetchProductRegion(value) {
  try {
    const response = await fetch(`${apiUrl}filter.php?a=${value}`);
    if (!response.ok) {
      throw new Error(`HTTP ERROR! Status:${response.status}`);
    }
    const data = await response.json();
    if (!data.meals) {
      throw new Error("غذایی برای این منطقه پیدا نشد.");
    }
    // ایجاد ویژگی قیمت
    mealData = data.meals.map((meal) => {
      meal.price = Math.floor(Math.random() * (60 - 5 + 1)) + 5;
      return meal;
    });
    displayFood(mealData);
  } catch (error) {
    console.log("Error:", error);
  }
}

document.querySelectorAll(".region-filters div").forEach((btn) => {
  btn.addEventListener("click", function () {
    // پاک کردن کلاس از همه دکمه‌ها (یعنی فقط یکی فعال باشه)
    document.querySelectorAll(".region-filters div").forEach((el) => {
      el.classList.remove("active-region");
    });

    // فعال‌کردن دکمه فعلی
    btn.classList.add("active-region");

    // دریافت غذاها از منطقه کلیک‌شده
    const region = btn.dataset.region;
    getFetchProductRegion(region);
  });
});
// ================================================== سرچ) توابع دریافت داده از API) ===================================================
// =======================  تابع Debounce =======================
let timer;
function debounceSearch(e) {
  const query = e.target.value.trim();

  clearTimeout(timer); // هر بار تایپ، تایمر قبلی رو لغو کن

  if (query === "") {
    // اگر خالی بود، همه چیز رو جمع کن
    searchResultsDropdown.classList.add("hidden");
    searchResultsList.innerHTML = "";
    searchResultEl.classList.remove("show");
    searchResultEl.innerHTML = "";
    return;
  }

  // نشان دادن لودینگ
  searchResultsDropdown.classList.remove("hidden");
  searchResultsList.innerHTML = "";
  searchResultsList.style.display = "none";
  searchResultEl.classList.add("show");
  searchResultEl.innerHTML = `<div class="loading">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>  <p>Loading…</p>
</div>`;

  // بعد از 300ms مکث، سرچ کن
  timer = setTimeout(() => {
    getFetchSearch(query);
  }, 300);
}

// لیسنر تایپ
searchInput.addEventListener("input", (e) => {
  debounceSearch(e);
  document.querySelector("#header-search-overlay").classList.add("overlay");
});
// =================== قسمت submit form ==================
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  searchResultsDropdown.classList.add("hidden");

  if (query) {
    getFetchSearch(query);
  } else {
    getFetchProduct();
  }
});
// ======================= search API=======================

async function getFetchSearch(query) {
  try {
    const response = await fetch(`${apiUrl}search.php?s=${query}`);
    if (!response.ok) throw new Error(`HTTP ERROR! Status: ${response.status}`);

    const data = await response.json();

    if (!data.meals) {
      searchResultsList.innerHTML = "";
      searchResultEl.classList.add("show");
      searchResultEl.innerHTML = `<p>No results found</p>`;
      return;
    }
    searchResultEl.classList.remove("show");
    searchResultsList.style.display = "grid";

    // تعریف یک متغیر خالی برای جمع‌آوری آیتم‌ها
    let itemsHTML = "";

    // ساخت آیتم‌ها با forEach
    data.meals.slice(0, 5).forEach((meal) => {
      itemsHTML += `
     
    <div class="search-results-item">
      <div>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      </div>
      <p>${meal.strMeal}</p>
    </div>
  `;
    });

    // یک بار اضافه کردن همه آیتم‌ها
    searchResultsList.innerHTML = itemsHTML;
    searchResultsDropdown.classList.remove("hidden");
    searchResultsList.style.display = "grid";

    searchResultEl.innerHTML = "";
    searchResultEl.classList.remove("show");
  } catch (error) {
    searchResultEl.classList.add("show");
    searchResultEl.innerHTML = `<p>Error fetching results</p>`;
    console.log("Error:", error);
  }
}
// اسکرول به لیست محصولات
searchResultsList.addEventListener("click", (e) => {
  const item = e.target.closest(".search-results-item");
  if (!item) return;
  document.querySelector("#header-search-overlay").classList.remove("overlay");

  productList.scrollIntoView({ behavior: "smooth" });
  // searchResultsDropdown.classList.add("hidden");
  // searchInput.value = "";
});
// =================================================== localStorage ================================================================
// علاقه مندی
function saveFavListToLocalStorage() {
  localStorage.setItem("favourite", JSON.stringify(favouriteList));
}

function loadFavListFromLocalStorage() {
  /** 
 * const load = localStorage.getItem("favourite");
    if (load) {
      users = JSON.parse(load);
      console.log(result);
    } else {
      users = [];
    }
*/
  favouriteList = JSON.parse(localStorage.getItem("favourite")) || [];
  updateFavoriteList();
}

// سبدخرید
function saveUserCart(cart) {
  const username = localStorage.getItem("loggedUser");
  localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
}
function loadUserCart() {
  const username = localStorage.getItem("loggedUser");
  return JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
  //وقتی می‌خوای یک مقدار یا نتیجه از تابع بگیری و خارج از تابع استفاده کنی.
}
// ====================================================== توابع علاقه‌مندی‌ها ===========================================================

// --------- قسمت علاقه مندی ----------

// add to fav
function addToFavourite(product) {
  if (!favouriteList.some((p) => p.id === product.id)) {
    favouriteList.push(product);
    updateFavoriteList();
    saveFavListToLocalStorage();
  }
}
// remove from fav
function removeFromFavourite(id) {
  favouriteList = favouriteList.filter((p) => p.id !== id);
  updateFavoriteList();
  saveFavListToLocalStorage();
}

// update favoriteList
function updateFavoriteList() {
  const favNote = document.querySelector("#fav-note");
  const favProducts = document.querySelector("#fav-products");
  if (favouriteList.length === 0) {
    favNote.classList.remove("hidden"); // اگر خالی بود، پیام نشان داده شود
  } else {
    favNote.classList.add("hidden"); // اگر محصول داشت، پیام مخفی شود
  }
  favProducts.innerHTML = "";

  favouriteList.forEach((product) => {
    const favItem = `<!-- محصول -->
            <div class="product-card">
              <!-- عکس محصول-->
              <img src="${product.image}" alt="${product.title}" />

              <!-- اسم + توضیحات محصول-->
              <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
              </div>
            </div>`;
    favProducts.innerHTML += favItem;
  });
  // console.log("لیست علاقه مندی", favouriteList);
}
// like & unlike
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("heart-icon")) {
    // console.log("heart icon clicked");
    const heartIcon = e.target;
    const productCard = heartIcon.closest(".product-card");
    const product = {
      title: productCard.querySelector("h3").textContent,
      image: productCard.querySelector("img").src,
      id: productCard.dataset.id,
    };
    // console.log(productCard);
    if (heartIcon.classList.contains("unliked")) {
      heartIcon.classList.remove("unliked");
      heartIcon.innerHTML = "❤️";
      addToFavourite(product);
      showNotification(`${product.title} add to Favourite List`);
    } else {
      heartIcon.classList.add("unliked");
      heartIcon.innerHTML = "🤍";
      removeFromFavourite(product.id);
      showNotification(`${product.title} remove From Favourite List`);
    }
    updateFavoriteList();
  }
});

// ========================================================  توابع سبد خرید ==========================================================
//--------قسمت اضافه کردن به سبد خرید----------
function addToCard(id, title, price, picture, quantity) {
  quantity = Number(quantity) || 1; // همیشه عدد میشه، پیش‌فرض 1
  price = Number(price); // اگه price هم گاهی رشته باشه

  const cart = loadUserCart();
  const existingProduct = cart.find((p) => p.id === id);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id, title, price, picture, quantity });
  }

  saveUserCart(cart);
  updatecart();
  showNotification(`"${title}" has been added to the cart.`);
}
// ------ سبدخرید----------
cartIcon.addEventListener("click", () => {
  modal.classList.add("open");
  displayCartInModal();
});
closeCart.addEventListener("click", () => {
  modal.classList.remove("open");
});
window.addEventListener("click", (e) => {
  // بستن با کلیک بیرون از منو و دکمه باز کردن

  if (
    !burgerMenu.contains(e.target) &&
    !openMenu.contains(e.target) &&
    burgerMenu.classList.contains("active")
  ) {
    burgerMenu.classList.remove("active");
  }
  // بستن مدال با کلیک

  if (e.target.classList.contains("modal")) {
    modal.classList.remove("open");
  }
  // بستن dropdown
  if (
    !searchResultsDropdown.contains(e.target) &&
    !searchInput.contains(e.target)
  ) {
    searchResultsDropdown.classList.add("hidden");
  }
  // خالی کردن input
  if (
    !searchBtn.contains(e.target) &&
    !searchResultsDropdown.contains(e.target) &&
    !searchInput.contains(e.target)
  ) {
    searchInput.value = "";
  }
  // overlay
  if (
    document.querySelector("#header-search-overlay").contains(e.target) &&
    !searchBtn.contains(e.target) &&
    !searchResultsDropdown.contains(e.target) &&
    !searchInput.contains(e.target)
  ) {
    document
      .querySelector("#header-search-overlay")
      .classList.remove("overlay");
  }
});
// ======================================================== توابع نمایش جزییات سبدخرید================================================
// ---------نمایش جزییات سبد خرید -----------
function displayCartInModal() {
  const cart = loadUserCart();
  console.log("سبد خرید", cart);
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = `   <tr>
      <td colspan="6">Your shopping cart is empty.</td>
    </tr>`;
    cartTotal.innerHTML = `<h3>Total Amount : 0 $</h3>`;
    checkoutButton.classList.add("hidden");
    return;
  }
  let total = 0; // مجموع قیمت سبد خرید
  cart.forEach((item, index) => {
    // console.log("table ", item);
    const productItem = `  
           <tr>
                <td><img src="${item.picture}" alt="${item.title}"></td>
                <td>${item.title}</td>
                <td>${item.price} $</td>
                <td class="quantity-controls">
                  <div>
                    <button onclick="changeQuantity(${index},-1)">-</button>
                    ${item.quantity} 
                    <button onclick="changeQuantity(${index},1)">+</button>
                  </div>
                </td>
                <td>${item.price * item.quantity} $</td>
                <td>
                  <button class="removeFromCart" onclick="removeFromCart(${index})" >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>`;
    cartItems.innerHTML += productItem;

    // نمایش مجموع کل قیمت ها
    total += item.price * item.quantity;
    cartTotal.innerHTML = `<h3>Total Amount : ${total}$</h3>`;

    // نمایش و عدم نمایش قسمت لاگین در سبد خرید
    const token = localStorage.getItem("token");
    if (token) {
      loginReminder.classList.add("hidden");
      checkoutButton.classList.remove("hidden");
    } else {
      loginReminder.classList.remove("hidden");
      checkoutButton.classList.add("hidden");
    }
  });
}
//--------  بروزرسانی و نمایش تعداد آیتم‌های ایکون سبد خرید-------------
function updatecart() {
  const cart = loadUserCart();
  // return cart.reduce((sum, item) => sum + Number(item.quantity), 0);
  const countCart = cart.reduce((sum, item) => {
    return sum + Number(item.quantity);
  }, 0);
  document.querySelector("#cart-count").innerHTML = countCart;
  return countCart;
}
// ------- افزایش و کاهش تعداد محصول سبد خرید----------
// x=5
// delta=1
// x-delta=5-1=4
// x+delta=5+1=6
function changeQuantity(index, delta) {
  const cart = loadUserCart();
  if (cart[index].quantity + delta > 0) {
    cart[index].quantity += delta;
  } else {
    removeFromCart(index);
  }
  saveUserCart(cart);
  displayCartInModal();
  updatecart();
}
// --------------- حذف محصول از سبد خرید---------------
function removeFromCart(index) {
  const cart = loadUserCart();
  cart.splice(index, 1);

  saveUserCart(cart);
  displayCartInModal();
  updatecart();
}

// ===================================================== مدیریت رویدادها ===========================================================
// ---------------- کپی کردن منو ----------------
burgerMenuList.innerHTML = mainMenu.innerHTML;

// باز کردن منوی موبایل
openMenu.addEventListener("click", () => {
  burgerMenu.classList.add("active");
  document.body.classList.add("no-scroll"); // اسکرول صفحه غیر فعال می‌شود
});

// بستن منوی موبایل
closeMenu.addEventListener("click", () => {
  burgerMenu.classList.remove("active");
  document.body.classList.remove("no-scroll"); // اسکرول صفحه فعال می‌شود
});

// ---------- بستن منو هنگام تغییر سایز صفحه-------------
window.addEventListener("resize", () => {
  if (window.innerWidth > 834) {
    burgerMenu.classList.remove("active");
  }
});
// --------------- اسکرول به بالای صفحه---------------------
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }
});
//دکمه top
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

// ====================================================== 10. مدیریت وضعیت کاربر ======================================================
// --------- بررسی وضعیت ورود کاربر و نمایش منو -------------
function manageAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    const username = localStorage.getItem("loggedUser");

    // نمایش منوی کاربر لاگین‌شده
    authSection.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 user-icon"
              id="userIcon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <p>${username}</p>
            <div class="user-logout hidden" id="userLogout">
              <button id="logoutButton" style="background-color: transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>`;
    // نمایش پروفایل خروج
    authSection.addEventListener("click", () => {
      document.querySelector("#userLogout").classList.toggle("hidden");
    });
    // حذف دکمه ورود /ثبت نام
    document.querySelector("#btn-signin").classList.add("hidden");
    document.querySelector("#btn-login").classList.add("hidden");

    // دکمه خروج
    document.querySelector("#logoutButton").addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");
      location.reload();
    });
  } else {
    // نمایش لینک‌های ورود/ثبت‌نام برای کاربر مهمان
    document.querySelector("#btn-signin").classList.remove("hidden");
    document.querySelector("#btn-login").classList.remove("hidden");
    authSection.classList.add("hidden");
  }
}

// =========================================================== 11. اجرای اولیه =======================================================
window.addEventListener("load", () => {
  getFetchProduct();
  loadFavListFromLocalStorage();
  manageAuth();
  updateFavoriteList();
  updatecart();
});
