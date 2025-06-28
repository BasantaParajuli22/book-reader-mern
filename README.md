# 📚 Book Reader App – Node.js + Express

This is a RESTful backend API built with **Node.js**, **Express**, and **MongoDB** for a **Book Reader Application**. It supports features like user authentication, book and chapter management, commenting, liking, and filtering.

---

## 🚀 Features

### 🔐 Authentication
- Users can **register** and **login** using email and password.
- JWT-based **authentication** and **authorization**.
- Admin account is pre-initialized during DB setup.

### 📚 Book Management
- **Admin** can perform full CRUD (Create, Read, Update, Delete) operations on **books**.
- **Public users** can:
  - View all books
  - Search by keyword
  - Filter by genre/status
  - Use query-based filtering

### 📖 Chapter Management
- Each book has multiple chapters.
- Admin can:
  - Add, update, delete chapters
  - Delete all chapters of a book
- Users can:
  - View individual chapters
  - Navigate chapters (previous/next)
  - Filter chapters
  - View top 3 chapters of a book

### 💬 Commenting System
- Authenticated users can:
  - Post comments on chapters
  - Reply to other users' comments
  - Update or delete their own comments
  - Like/unlike comments
- Comments support filtering and retrieval per chapter

### ❤️ Like System
- Users can like/unlike:
  - Books
  - Chapters
  - Comments

---

## 🛠️ Setup & Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/BasantaParajuli22/book-reader-app.git
   cd book-reader-app
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file and set the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the app**  
   ```bash
   npm run dev
   ```

---

## 🧩 Database Initialization

- On server start, the database will be initialized with:
  - A set of **predefined books and chapters**
  - One **admin user** for management

---

## 🔐 Admin Capabilities

Admin has access to full CRUD operations:

### Books
- `POST /books` – Create book
- `PUT /books/:id` – Update book
- `DELETE /books/:id` – Delete book
- `DELETE /books` – Delete all books

### Chapters
- `POST /chapters/book/:bookId` – Create chapter
- `PUT /chapters/book/:bookId/:chapterId` – Update chapter
- `DELETE /chapters/book/:bookId/:chapterId` – Delete chapter
- `DELETE /chapters/book/:bookId` – Delete all chapters of a book

---

## 👥 User Capabilities

- **Register/Login** via `/auth/register` and `/auth/login`
- View books and chapters
- Filter/search books and chapters
- Post comments and replies
- Like/unlike books, chapters, and comments
- Update/delete own comments

---

## 📂 API Routes Overview

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and receive JWT |

### Books
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/books` | Public |
| GET | `/books/count` | Public |
| GET | `/books/search` | Public |
| GET | `/books/filter` | Public |
| GET | `/books/query` | Public |
| GET | `/books/:id` | Public |
| POST/PUT/DELETE | `/books` | Admin only |

### Chapters
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/chapters/book/:bookId` | Public |
| GET | `/chapters/book/:bookId/top3` | Public |
| GET | `/chapters/book/:bookId/:chapterId` | Public |
| GET | `/chapters/book/:bookId/:chapterId/nav` | Public |
| POST/PUT/DELETE | `/chapters/book/:bookId` | Admin only |

### Comments & Likes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chapters/:chapterId/comments` | Add comment |
| PUT | `/comments/:commentId` | Update comment |
| DELETE | `/comments/:commentId` | Delete comment |
| PUT | `/books/:bookId/like` | Like/unlike book |
| PUT | `/chapters/:chapterId/like` | Like/unlike chapter |
| PUT | `/comments/:commentId/like` | Like/unlike comment |
| GET | `/chapters/:chapterId/comments` | Get all comments |
| GET | `/chapters/:chapterId/comments/filter` | Get comments with filter |

### User Management (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/users/:id/role` | Change user role (admin/reader) |

---

## 🔐 Middleware

- **authenticateToken**: Verifies JWT tokens
- **authorizeRole**: Restricts access based on user role

---

## 📄 License

MIT