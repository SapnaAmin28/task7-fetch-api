# Task 7 – Fetch & Display Data

This project fetches user data from a public REST API and displays it in a styled grid using the **Fetch API** with `async/await`.  
It also demonstrates **error handling**, a **reload option**, and a **simulate error** button.

---

## 🔹 Features
- Fetches data from:  
  [`https://jsonplaceholder.typicode.com/users`](https://jsonplaceholder.typicode.com/users)
- Displays:
  - Name
  - Email (clickable)
  - Address (street, suite, city, zipcode)
  - Phone
  - Company
  - Website (clickable)
- Buttons:
  - **Load Users** → fetch & display data
  - **Reload** → fetch again
  - **Clear** → remove results
  - **Simulate Error** → intentionally fetch from wrong URL to test error handling
- Shows **loading spinner** and **status message**
- Handles **network errors** and **invalid responses**
- Clean dark UI with responsive design

---

## 🛠️ Tech Used
- **HTML5**
- **CSS3** (custom styling)
- **JavaScript (ES6)** → Fetch API, Promises, async/await, DOM manipulation

---

## 🚀 How to Run
### Option A — VS Code Live Server
1. Open the folder in **VS Code**  
2. Right-click `index.html` → **Open with Live Server**  
3. The app opens in your browser

### Option B — Python simple server
```bash
cd task7_fetch_api
python -m http.server 5500
