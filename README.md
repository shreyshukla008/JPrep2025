# 📚 JPrep – PYQ Management & Learning Platform

**JPrep** is a full-stack role-based platform designed to streamline uploading, verifying, managing, and downloading Previous Year Question Papers (PYQs) and their solutions. It uses Google Drive for storage, Tesseract.js for automated verification, and supports students, teachers, guests, and admins with tailored access.

---

## 📸 Screenshots (Replace with real images later)

### Login Page  
![Login](https://via.placeholder.com/800x400.png?text=Login+Page)

### Dashboard View  
![Dashboard](https://via.placeholder.com/800x400.png?text=Dashboard+View)

### Multi-Step Upload Flow  
![Upload](https://via.placeholder.com/800x400.png?text=Upload+Process)

### Admin Panel  
![Admin](https://via.placeholder.com/800x400.png?text=Admin+Panel)

---

## 🎯 Features

- ✅ Role-based access for Students, Teachers, Admins, and Guests
- 📤 Multi-step upload system with file + metadata inputs
- 🧠 Tesseract.js OCR-based auto-verification for PYQs
- ⚠️ Unverified uploads flagged for manual admin review
- 📁 Google Drive integration for secure file storage and access
- 🧾 Direct PDF viewing and downloading (via MongoDB links)
- 🟨 Star favorite subjects for easy access
- 🚪 Guest mode access with limited viewing
- ⏱️ 3-year data retention policy
- 🧑‍💼 Admin controls for verification, subject creation, and user roles

---

## 🚀 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Redux
- React Router (tab-style navigation)
- Firebase Authentication (Google login)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (secure auth with cookies)
- Google Drive API (service account)
- Tesseract.js (OCR engine)
- Firebase Admin SDK

### Deployment
- **Frontend**: Vercel
- **Backend**: Azure App Service
- **Database**: MongoDB Atlas
- **File Storage**: Google Drive

---

## 👤 User Roles

| Role      | Permissions |
|-----------|-------------|
| **Student** | View/download question papers, star subjects |
| **Teacher** | Upload new solutions |
| **Admin**   | Full access: approve uploads, manage users, manage subjects |
| **Guest**   | Limited access to question papers (read-only, no starring/uploading) |

---

## 📥 Upload & Verification Flow

1. User uploads a question paper and selects metadata (subject, exam type, year).
2. Backend runs OCR with Tesseract.js to extract data and compare with database.
3. If matched with existing data → `verified: true`
4. If unmatched or unclear → `verified: false` → flagged for admin verification.
5. Admin can manually verify or reject flagged papers.

---

## 🔐 Authentication Flow

- **Manual email/password login**
- **Google login via Firebase**
- **JWT-based tokens stored in cookies**
- **Multi-session support**
- **Secure logout** and session expiration

---

## 📁 File Storage (Google Drive)

- All PDFs stored in a structured Google Drive account (service account)
- Folder hierarchy:


---

## 📈 Future Roadmap

- 📊 Admin analytics dashboard (downloads/views per subject)
- 📷 Support image uploads and auto PDF conversion
- 📥 Bulk uploads by teachers/admins
- 🧑‍🏫 Teacher-specific dashboards
- 🧹 Auto-cleanup of expired content (3-year policy)
- 🔎 Smarter search and subject suggestion engine

---

## 👨‍💻 Author

**Shrey Shukla**  
_MERN Stack Developer | CS Undergrad | Tech Enthusiast_  
[LinkedIn](https://www.linkedin.com/in/shreyshukla) • [GitHub](https://github.com/shreyshukla)

---

## 📃 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

> _Built with ❤️ for learners, by learner._