# 🔐 Next.js Authentication System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19.2-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?style=for-the-badge&logo=tailwind-css)

A modern, secure, and fully-featured authentication system built with Next.js, featuring email verification, password reset, and a clean Google-inspired UI.

[Features](#-features) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack) • [API Routes](#-api-routes) • [Environment Variables](#-environment-variables)

</div>

---

## ✨ Features

- 🔑 **User Authentication** - Secure login and registration system
- ✉️ **Email Verification** - Email verification with secure tokens
- 🔒 **Password Reset** - Forgot password and reset functionality
- 🎨 **Modern UI** - Clean, Google-inspired user interface
- 🛡️ **Security** - JWT tokens, password hashing with bcrypt
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🚀 **Fast Performance** - Built with Next.js 16 App Router
- 🎯 **Type Safety** - Full TypeScript support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- SMTP credentials for email sending (Mailtrap, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/auth-nextjs-youtube.git
   cd auth-nextjs-youtube
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   TOKEN_SECRET=your_jwt_secret_key
   DOMAIN=http://localhost:3000
   
   # SMTP Configuration (for email sending)
   SMTP_HOST=sandbox.smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Hot Toast** - Beautiful toast notifications
- **Axios** - HTTP client

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - Database with Mongoose
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email sending

### Security
- 🔐 Password hashing with bcrypt
- 🎫 JWT token-based authentication
- 🔒 Secure token generation for email verification
- ⏰ Token expiration (1 hour)
- 🛡️ Protected routes with middleware

## 📁 Project Structure

```
auth-nextjs-youtube/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── login/          # Login API route
│   │       ├── signup/         # Signup API route
│   │       ├── logout/         # Logout API route
│   │       ├── me/              # Get current user API route
│   │       ├── verifyemail/     # Email verification API route
│   │       ├── forgotpassword/   # Forgot password API route
│   │       └── resetpassword/   # Reset password API route
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── profile/                 # Profile page
│   ├── verifyemail/             # Email verification page
│   ├── forgotpassword/          # Forgot password page
│   ├── resetpassword/           # Reset password page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── dbConfig/
│   └── dbConfig.ts              # MongoDB connection
├── helpers/
│   ├── getDataFromToken.ts      # JWT token helper
│   └── mailer.ts                # Email sending helper
├── models/
│   └── userModel.js             # User schema
├── middleware.ts                # Route protection middleware
└── package.json
```

## 🔌 API Routes

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/signup` | Register a new user |
| `POST` | `/api/users/login` | Login user |
| `GET` | `/api/users/logout` | Logout user |
| `GET` | `/api/users/me` | Get current user data |

### Email & Password

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/verifyemail` | Verify user email |
| `POST` | `/api/users/forgotpassword` | Send password reset email |
| `POST` | `/api/users/resetpassword` | Reset user password |

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
MONGO_URI=mongodb://localhost:27017/your_database_name
# or
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Secret
TOKEN_SECRET=your_super_secret_jwt_key_minimum_32_characters

# Application Domain
DOMAIN=http://localhost:3000

# SMTP Configuration (Email)
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

> ⚠️ **Important**: Never commit your `.env.local` file to version control!

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Features Breakdown

### User Registration
- ✅ Username, email, and password validation
- ✅ Automatic email verification link sent
- ✅ Password hashing with bcrypt
- ✅ Duplicate user detection

### User Login
- ✅ Email and password authentication
- ✅ JWT token generation
- ✅ Secure HTTP-only cookies
- ✅ Error handling

### Email Verification
- ✅ Secure token generation
- ✅ Email with verification link
- ✅ Token expiration (1 hour)
- ✅ One-time use tokens

### Password Reset
- ✅ Forgot password functionality
- ✅ Secure reset token generation
- ✅ Email with reset link
- ✅ Password validation
- ✅ Token expiration

### Profile Management
- ✅ View user profile
- ✅ User information display
- ✅ Verification status
- ✅ Secure logout

## 🔒 Security Features

- 🔐 **Password Hashing**: All passwords are hashed using bcrypt
- 🎫 **JWT Tokens**: Secure authentication tokens
- 🔑 **Token Expiration**: All tokens expire after 1 hour
- 🛡️ **Route Protection**: Middleware protects private routes
- ✉️ **Email Verification**: Prevents unauthorized account creation
- 🔒 **Secure Cookies**: HTTP-only cookies for token storage

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Make sure to:
- Set all environment variables
- Configure MongoDB connection
- Set up SMTP for email sending
- Update `DOMAIN` variable with your production URL

## 📱 Screenshots

> Add screenshots of your application here

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [MongoDB](https://www.mongodb.com/) - The database
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

Made with ❤️ using Next.js

</div>

