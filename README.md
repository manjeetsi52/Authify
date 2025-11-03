Perfect 👍 — here’s your **visually polished and GitHub-optimized** version of the `README.md`.
I’ve refined:

* Section hierarchy and spacing
* Icon usage and headings
* Tables, badges, and visual layout
* Added subtle visual separators for readability

---

```markdown
# 🔐 Authify — Modern Authentication System

A **full-stack authentication and authorization system** built with **React.js** and **Node.js**, featuring secure **JWT-based authentication**, **Google OAuth**, and **comprehensive user management**.

<div align="center">

![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

</div>

---

## 🚀 Live Demo

**Frontend:** [https://authify-client-19tc.onrender.com](https://authify-client-19tc.onrender.com)  
**Backend API:** [https://authify-server-c1zn.onrender.com](https://authify-server-c1zn.onrender.com)

---

## ✨ Features Overview

### 🔐 Authentication
- User Registration & Login (JWT-secured)
- Google OAuth 2.0 Integration
- Protected Routes with Auth Guards
- Persistent Session Management

### 📧 Email Verification
- Email-based Account Verification
- MJML Templated Emails
- Resend Verification Link

### 🔒 Security & Validation
- Zod-based Validation
- Secure Cookies (HTTP-only)
- Input Sanitization (XSS & Injection Protection)
- Password Hashing (bcrypt)

### 👤 User Management
- Edit Profile (Name, Email, Password)
- Profile Picture Upload via Cloudinary
- Set/Change Password for OAuth Users

### 🎨 User Experience
- Mobile-First Responsive UI
- Toast Notifications
- Smooth Transitions & Loading States
- Modern Design Aesthetic

---

## 🧱 Tech Stack

### 🖥️ Frontend
- ⚛️ **React 18 + Vite**
- 🎨 **CSS Modules**
- 🌐 **React Router**
- 🧠 **Context API**
- 🔗 **Fetch API**

### ⚙️ Backend
- 🟢 **Node.js + Express.js**
- 🗄️ **MongoDB + Mongoose**
- 🔑 **JWT + Google OAuth 2.0**
- ☁️ **Cloudinary for File Uploads**
- ✉️ **Nodemailer (MJML templates)**
- 🧩 **Zod Validation**

---

## 🗂️ Project Structure

### 📦 Frontend
```

authify-client/
├── src/
│   ├── components/
│   │   ├── footer/
│   │   ├── header/
│   │   └── ui/             # Input, Password, Skeleton
│   ├── pages/
│   │   ├── auth/           # Login, Register, Forgot Password
│   │   ├── dashboard/
│   │   └── profile/
│   ├── context/
│   ├── hooks/
│   └── utils/

```

### 🧩 Backend
```

authify-server/
├── controllers/
│   ├── AuthControllers/
│   ├── EmailControllers/
│   └── ProfileUpdate/
├── models/
├── middleware/
├── routes/
├── services/
├── validations/
└── lib/

````

---

## ⚡ Quick Start

### Prerequisites
- Node.js **v16+**
- MongoDB (Atlas or local)
- Cloudinary account
- Google OAuth credentials

### 🧰 Installation

1️⃣ **Clone the repository**
```bash
git clone https://github.com/manjeetsi52/Authify.git
cd Authify
````

2️⃣ **Setup Backend**

```bash
cd authify-server
npm install
cp .env.example .env
npm run dev
```

3️⃣ **Setup Frontend**

```bash
cd authify-client
npm install
cp .env.example .env
npm run dev
```

---

## ⚙️ Environment Variables

### 🗝️ Backend (`.env`)

```env
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLIENT_URL=https://authify-client-19tc.onrender.com
```

### 🖥️ Frontend (`.env`)

```env
VITE_API_BASE_URL=https://authify-server-c1zn.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

---

## 🧾 API Endpoints

| Category     | Endpoint                       | Method | Description                  |
| ------------ | ------------------------------ | ------ | ---------------------------- |
| **Auth**     | `/api/register`                | POST   | Register new user            |
|              | `/api/login`                   | POST   | Login existing user          |
|              | `/api/logout`                  | POST   | Logout user                  |
|              | `/api/auth/me`                 | GET    | Get current user             |
|              | `/api/auth/google`             | POST   | Google OAuth login           |
| **Email**    | `/api/send-verification-email` | POST   | Send verification email      |
|              | `/api/verify-email`            | POST   | Verify user email            |
| **Password** | `/api/forgot-password`         | POST   | Request password reset       |
|              | `/api/reset-password`          | POST   | Reset password               |
|              | `/api/change-password`         | POST   | Change password              |
| **Profile**  | `/api/profile/image`           | PUT    | Update profile image         |
|              | `/api/set-password`            | POST   | Set password for OAuth users |

---

## 🔧 Example Implementations

### 🧩 Secure Login with JWT

```javascript
const login = async (credentials) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include' // store HTTP-only cookies
  });
  return res.json();
};
```

### ✅ Zod Validation Example

```javascript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
  name: z.string().min(2, 'Min 2 characters')
});
```

### 🖼️ Cloudinary Upload Example

```javascript
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'authify_uploads');

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });
  return res.json();
};
```

---

## 🔒 Security Highlights

* 🔐 HTTP-only cookies for JWT storage
* ⚔️ Input sanitization (XSS & SQL injection prevention)
* 🔑 Secure password hashing (bcrypt)
* 🚫 Rate limiting on auth routes
* 🧱 CORS + CSRF protection

---

## 📱 Responsive UI Design

The application adapts seamlessly to all devices:

* Flexible grid layout
* Touch-friendly inputs
* Adaptive modals and buttons
* Optimized for both dark & light environments

---

## ☁️ Deployment

Deployed on **Render**:

* Auto-deploys on push
* Managed MongoDB Atlas instance
* Cloudinary CDN for images

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open a Pull Request 🚀

---

## 📄 License

Licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 💙 Built with React.js & Node.js

[🐞 Report Bug](https://github.com/manjeetsi52/Authify/issues) • [🌟 Request Feature](https://github.com/manjeetsi52/Authify/issues)

</div>
```

---

Would you like me to **add a short “Screenshots” section** (with layout placeholders for Login, Dashboard, and Profile) to make it even more visually engaging for your GitHub page?
