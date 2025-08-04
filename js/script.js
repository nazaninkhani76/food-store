// آدرس API غذاها از سایت themealdb
const apiUrl = "https://www.themealdb.com/api/json/v1/1/";
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

let mealData = [];
// ------------------------------------------------------ تابع دریافت غذاها از API ------------------------------------------------------
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
      return meal;
    });
    console.log(mealData);
    displayFood(mealData);
  } catch (error) {
    console.log("Error:", error);
  }
}
// ------------------------------------------------------ نمایش لیست غذاها در HTML ---------------------------------------------------
function displayFood(meals) {
  productList.innerHTML = "";
  meals.forEach((meal) => {
    const mealItem = `
             <div class="product-card">
            <!-- لایک -->
            <span class="heart-icon">🤍</span>

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
              <button>
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

// ------------------------------------------------------ محدودیت  کاراکتر---------------------------------------------------

function characterLimit(selector, maxLength) {
  document.querySelectorAll(selector).forEach((el) => {
    const fullText = el.textContent.trim();
    if (fullText.length > maxLength) {
      el.textContent = fullText.slice(0, maxLength) + "...";
    }
  });
}

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

// ------------------------------------------------------ دریافت غذا بر اساس منطقه جغرافیایی -------------------------------------------
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

// ------------------------------------------------------ قسمت سرچ --------------------------------------------------------------------
// تابع جستجو: غذاهایی که نامشان شامل "query" باشد را از API دریافت می‌کند
async function getFetchSearch(query) {
  try {
    const response = await fetch(`${apiUrl}search.php?s=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP ERROR! Status:${response.status}`);
    }

    const data = await response.json();
    // console.log(data);

    // اگر غذایی با این نام وجود نداشت، پیام نمایش داده شود
    if (!data.meals) {
      // searchResultEl.style.display = "block";
      searchResultEl.classList.add("show");
      searchResultEl.textContent = `No products found for "${query}"`;
      return;
    }

    // پاک کردن پیام قبلی (در صورت وجود)
    searchResultEl.textContent = "";

    // افزودن قیمت تصادفی به هر غذا
    mealData = data.meals.map((meal) => {
      meal.price = Math.floor(Math.random() * (60 - 5 + 1)) + 5;
      return meal;
    });

    console.log(mealData);

    // نمایش غذاها در صفحه
    displayFood(mealData);
  } catch (error) {
    console.log("Error:", error);
  }
}

//  سابمیت فرم جستجو
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = document.querySelector("#search-input").value;

  // اگر ورودی وجود داشت، جستجو کن؛ در غیر این صورت همه غذاها را نمایش بده
  if (query) {
    getFetchSearch(query);
  } else {
    getFetchProduct();
  }
});

// اگر کاربر فیلد سرچ را خالی کرد، پیام خطا پاک شود
if (searchInput) {
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      searchResultEl.textContent = "";
    }
  });
}

// ------------------------------------------------------ کپی کردن منو --------------------------------------------------------------------
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
// ------------------------------------------------------ سبدخرید--------------------------------------------------------------------
cartIcon.addEventListener("click", () => {
  modal.classList.add("open");
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
});
// ------------------------------------------------------ بستن منو هنگام تغییر سایز صفحه------------------------------------------------
window.addEventListener("resize", () => {
  if (window.innerWidth > 834) {
    burgerMenu.classList.remove("active");
  }
});
// ---------------------------------------------------- بررسی وضعیت ورود کاربر و نمایش منو -----------------------------------------------
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

// ------------------------------------------------------ اجرای اولیه-----------------------------------------------

window.addEventListener("load", () => {
  getFetchProduct();
  manageAuth();
});
