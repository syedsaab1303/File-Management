
# 📁 File Management System – Node.js Backend API

This is a backend-only project for a hierarchical file and folder management system with versioning support, built as part of a Node.js developer assignment.

---

## 🚀 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- express-validator (Input validation)
- Morgan (Logging)
- Postman (API testing)

---

## Project Architecture

backend/ │ ├── config/ → MongoDB & JWT configs ├── controllers/ → API route logic ├── middleware/ → JWT auth & error handler ├── models/ → User, Folder, Document schemas ├── routes/ → Auth, Folder, Document routes ├── utils/ → Folder path builder, helpers ├── validations/ → All input validations ├── app.js → Express app setup ├── server.js → Entry point └── .env → Environment variables


---

## 🧠 Key Features

- User registration & login (JWT)
- Create, rename, delete folders (with hierarchy)
- Upload & version documents
- Filter documents by title/content
- Get folder path (`Root/SubFolder/...`)
- Get document version history
- Total document count per user

---

## 🔄 Versioning Logic

- Document initially created without file.
- First version upload = `1.0`
- Later versions = `1.1`, `2.0`, etc.
- Each version stores separate file URL.

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo and go to backend
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/file_management
JWT_SECRET=your_jwt_secret

# 4. Run MongoDB locally or use Atlas

# 5. Start server
npm run dev

📘 Postman collection included: FileManagementSystem_Postman_Collection.json
