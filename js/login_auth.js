// ارجاع به فرم و فیلدها
const loginForm = document.querySelector("#loginForm");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const notification = document.querySelector("#notification");

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

// افزودن رویداد ارسال فرم لاگین
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("user")) || [];

  const userValid = users.find(
    (user) =>
      user.username === username.value && user.password === password.value
  );

  if (userValid) {
    // ساخت توکن
    const token = btoa(
      JSON.stringify({
        username: username.value,
        exp: Date.now() + 1000 * 60 * 60 * 24, // انقضا: 1 روز
      })
    );
    localStorage.setItem("token", token);
    localStorage.setItem("loggedUser", username.value);

    showNotification("Login is successful!");
    window.location.href = "index.html";
  } else {
    showNotification("Username or password is incorrect.", "error");
  }
});
