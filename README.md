# Simple Banking System

Hey there! This is a full-stack banking app built with Node.js, MySQL, and React.

## What It Does

- **User Roles:**  
  - **Customer:** Sign up, log in, check your balance, and perform deposits/withdrawals.
  - **Banker/Admin:** Log in to view all customer accounts and inspect detailed transaction histories.

- **Key Features:**  
  - **Authentication:** Uses JWT tokens (36-character strings) to secure routes. Sessions are persisted with Redux and localStorage.
  - **Form Validations & Loading States:** User-friendly forms with instant error/success feedback via toast notifications.
  - **Data Display:** Customer and banker dashboards use Material-UI’s DataGrid (for a clean, responsive grid) and Modal components for a polished UI.
  - **Password Toggle:** “Show/Hide” options for password fields make things easy on the eyes.

## Quick Setup

1. **Backend:**  
   - Clone the repo, install dependencies (`npm install`), and configure your `.env` (set your MySQL credentials, JWT secret, etc.).
   - Run with `npm run dev` for development.

2. **Frontend:**  
   - In the frontend folder, install dependencies (`npm install`), set your API URL in a `.env` file if needed (e.g., `VITE_API_URL=http://localhost:4000/api`), and run with `npm run dev`.

## Admin Credentials

To test the banker/admin view, then select while logging in 'Login as Banker':

- **Email:** `admin@abc.com`
- **Password:** `admin123`


### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**  
   Create a `.env` file in the `backend` folder with the following (update with your MySQL credentials):

   ```env
   DB_HOST=your-mysql-host
   DB_PORT=3306
   DB_USER=your-mysql-username
   DB_PASSWORD=your-mysql-password
   DB_NAME=Bank
   JWT_SECRET=your_jwt_secret
   PORT=4000
   NODE_ENV=development
   ```

4. **Run the Backend Server:**

   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to the Frontend Folder:**

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables (if needed):**  
   Create a `.env` file in the `frontend` folder (for example):

   ```env
   VITE_API_URL=http://localhost:4000/api
   ```

4. **Run the Frontend:**

   ```bash
   npm run dev
   ```

---

Your application should now be accessible (e.g., frontend at `http://localhost:3000` and backend at `http://localhost:4000`).

---

**Admin Credentials for Testing:**

- **Email:** `admin@abc.com`
- **Password:** `admin123`

> **Note:**  
> In a production environment, ensure that passwords are hashed (e.g., using bcrypt) instead of stored in plain text.

---

## Future Enhancements

- **Password Security:**  
  Implement password hashing and proper security practices.
- **Role Management:**  
  Add functionality to manage roles from the admin panel.
- **Enhanced Error Handling:**  
  Implement comprehensive error boundaries and logging.
- **Unit & Integration Tests:**  
  Add tests to improve reliability and ease future refactoring.
- **Improved UI/UX:**  
  Refine responsive design and accessibility features further.
