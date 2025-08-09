# Meal Ordering Web App (Demo)

This is a web application that fetches meal data from TheMealDB API and allows users to browse, search, filter by region, manage favorites, and add meals to a shopping cart. It also includes user authentication simulation, responsive menus, notifications, and persistent storage via `localStorage`.

---

## JavaScript Overview

The main JavaScript file handles:

- Fetching meal data from the API, adding random prices, and displaying meals dynamically.
- Implementing a favorites system where users can add/remove meals, with persistence via `localStorage`.
- Managing a shopping cart where users can add meals, adjust quantities, remove items, and view total price — all saved per user in `localStorage`.
- Handling search input and region filters to dynamically update meal listings.
- Managing a responsive burger menu for mobile navigation.
- Simulating user login state by storing tokens in `localStorage`, with UI changes for logged-in/out users.
- Displaying notifications for user actions (e.g., adding to favorites or cart).
- Showing a “Back to Top” button after scrolling a certain distance.
- Handling UI updates for cart icon count, favorite list visibility, and product description truncation.
- Gracefully handling API errors and providing user feedback.

---

## Features and Functionalities

- **Fetch Meals from API:** Retrieves meal data from TheMealDB API, including meal name, image, and instructions.
- **Random Pricing:** Each meal is assigned a random price between 5 and 60 dollars for demonstration.
- **Search Functionality:** Users can search meals by name with real-time API fetching and feedback if no results found.
- **Region Filter:** Filter meals based on selected geographic regions, dynamically updating the meal list.
- **Favorites List:**  
  - Users can add or remove meals to/from a favorites list by toggling a heart icon.  
  - Favorites are saved in `localStorage` and persist across sessions.  
  - Favorites section updates dynamically.
- **Shopping Cart:**  
  - Add meals to the cart with adjustable quantities.  
  - Cart state is saved per user in `localStorage`.  
  - View cart details in a modal with product images, titles, prices, and total amount.  
  - Increase, decrease, or remove items directly from the cart modal.
- **Responsive Mobile Menu:** A burger menu opens/closes smoothly on mobile devices.
- **User Authentication UI:**  
  - Simulates login state using a token in `localStorage`.  
  - Displays user info and logout button when logged in.  
  - Shows login/signup buttons when logged out.
- **Notifications:** Shows brief notifications for key user actions such as adding to favorites or cart.
- **Back to Top Button:** Appears after scrolling down for easy navigation back to the top.
- **UI Updates:** Automatically updates cart icon count, favorites list, and meal display based on user interaction.
- **Data Persistence:** Uses `localStorage` for saving favorites, cart data, and authentication token, keeping state across page reloads.
- **Error Handling:** Gracefully handles API errors and shows meaningful console messages or UI feedback.

---
/project-root
├── index.html
├── style.css
├── script.js          <-- Main JavaScript file (this code)
└── README.md          <-- This file

---

## How to Use

1. Clone or download the repository.
2. Open `index.html` in a modern web browser.
3. Browse meals, use search and region filters.
4. Add meals to favorites or cart.
5. Simulate login by adding a token manually to `localStorage` (for demo purposes).
6. Manage your cart and enjoy the UI features.

---

## Contact

Feel free to reach out:

- GitHub: https://github.com/mohammadkhani76/food-store 
- Email: nazanin.khani2@gmail.com

---

**Thank you for visiting my project!**