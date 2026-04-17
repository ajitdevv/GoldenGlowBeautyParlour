# 🚀 Admin Dashboard System

A production-ready **Admin Dashboard** built with React, featuring real-time data handling, authentication, filtering, pagination, charts, and optimized UI performance.

---

## 🔗 Live Link

👉 https://admin-dashboard-rose-tau-43.vercel.app/

---

## 📌 Features

* 🔐 Authentication (Cookie-based login system)
* 📊 Dashboard for managing deals, reports, and contacts
* 🔍 Advanced filtering (type, status, priority, user)
* 📄 Pagination for handling large datasets
* ⚡ Optimized performance using `useMemo` and `React.memo`
* 🔄 Retry system for failed API requests
* ⏳ Skeleton loaders for better UX
* 🔔 Toast notifications (success, loading, error)
* 🎛️ Theme toggle (Light / Dark mode)
* 📱 Fully responsive design (mobile + tablet + desktop)
* 🧱 Sidebar navigation (large screens)
* 🍔 Hamburger menu (small screens)
* 📊 Data visualization using Chart.js (Revenue & Category graphs)
* 🔒 Protected routes (admin-only access)

---

## 🧠 Tech Stack

### Frontend

* React
* Tailwind CSS
* React Router DOM
* react-hot-toast (Notifications)
* Lucide React (Icons)
* Chart.js
* react-chartjs-2

## ⚠️ Backend Note

- This project uses pre-built backend APIs and Database.
  
- The frontend architecture, API integration, state management, performance optimization, and UI/UX implementation are fully developed by me.
 
### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Deployment

* Vercel (Frontend)

---

## 📁 Project Structure

```
src/
│
├── apis/                 # API calls
│   ├── data/
│   ├── product.js
│   ├── updatedata.js
│   └── deletedata.js
│
├── assets/               # Images / static files
│   └── logoAj.png
│
├── componentpreant/      # Layout components
│   ├── AccountBar.jsx
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   └── TotalCards.jsx
│
├── components/           # Reusable UI components
│   ├── Account.jsx
│   ├── AddCompanieForm.jsx
│   ├── AddDealFrom.jsx
│   ├── Button.jsx
│   ├── CategoryChart.jsx
│   ├── CompanyCard.jsx
│   ├── ContactCard.jsx
│   ├── DealCard.jsx
│   ├── DesablePopUp.jsx
│   ├── FilterBar.jsx
│   ├── HeadingSubheading.jsx
│   ├── HomeCard.jsx
│   ├── RevenueGraph.jsx
│   ├── SearchFunclity.jsx
│   └── Themetoggle.jsx
│
├── Pages/                # Main pages
│   ├── AdminInfo.jsx
│   ├── CompanieDeatil.jsx
│   ├── Companys.jsx
│   ├── Contacts.jsx
│   ├── DealFullView.jsx
│   ├── Deals.jsx
│   ├── Deshboard.jsx
│   ├── Footer.jsx
│   ├── login.jsx
│   ├── ReportFullView.jsx
│   ├── Reports.jsx
│   └── Setting.jsx
│
├── routes/               # Routing & layout
│   ├── AdminLayout.jsx
│   └── protectedroutes.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/ajitdevv/GoldenGlowBeautyParlour
cd YOUR-REPO
```

### 2️⃣ Install Dependencies

```
npm install
```

### 3️⃣ Run Project

```
npm run dev
```

---

## 🔐 Authentication Flow

* User logs in → backend sets **HTTP-only cookie**
* Protected routes verify authentication
* Unauthorized users are redirected to login

---

## 📊 Key Functionalities

### Deals Management

* Add new deals
* View deal details
* Dynamic routing for each deal

### Reports System

* Filter by type, status, priority
* Search by user
* Optimized filtering logic

### Contacts System

* Sorted listing
* Card-based UI
* Performance optimized rendering

### Dashboard Analytics

* Revenue Graph (Chart.js)
* Category Distribution Chart
* Summary cards (TotalCards)

---

## 🚀 Performance Optimizations

* `useMemo` → prevents unnecessary calculations
* `React.memo` → avoids unnecessary re-renders
* Efficient state management
* Optimized filtering + pagination pipeline

---

## ⚠️ Challenges Faced

* Managing filter + pagination together
* Avoiding unnecessary re-renders in large lists
* Structuring API requests correctly
* Handling async states (loading, error, retry)

---

## 📚 Learning Outcomes

* Real-world dashboard architecture
* API integration & error handling
* Performance optimization in React
* Authentication using cookies
* Scalable component design
* Data visualization using Chart.js

---

## 📸 Screenshots

> 

---

## 🧑‍💻 Author

**Ajeet Bairwa (Ajit Dev)**
Frontend Developer

---

## ⭐ Future Improvements

* Global search with debounce
* Role-based access control
* Backend pagination
* Advanced analytics dashboard

---

## 📜 License

This project is licensed under the MIT License.
