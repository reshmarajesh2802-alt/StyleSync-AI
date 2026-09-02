# 💎 StyleSync AI — Week 3 & Week 4 Deliverables Report

This document contains the complete documentation, GitHub repository links, API test results, and deployment configuration for **StyleSync AI**, ready for submission on Notion.

---

## 🔗 GitHub Repository Links
- **Monorepo / Full-Stack GitHub Repository**: [https://github.com/reshmarajesh2802-alt/StyleSync-AI](https://github.com/reshmarajesh2802-alt/StyleSync-AI)
- **Backend Code Location**: `https://github.com/reshmarajesh2802-alt/StyleSync-AI/tree/main/server`
- **Frontend Code Location**: `https://github.com/reshmarajesh2802-alt/StyleSync-AI/tree/main/client`

---

## 🧪 Postman & API Endpoints Verification (Week 3 & Week 4 Tasks)

| API # | Method | Endpoint | Description | Status Code | Test Status |
|-------|--------|----------|-------------|-------------|-------------|
| **API 1** | `POST` | `/api/auth/signup` | User Signup (Customer / Admin creation) | `201 Created` | ✅ PASS |
| **API 1** | `POST` | `/api/auth/signup` | Duplicate User Email validation | `409 Conflict` | ✅ PASS |
| **API 2** | `POST` | `/api/auth/signin` | User Signin (JWT Token issuance) | `200 OK` | ✅ PASS |
| **API 2** | `POST` | `/api/auth/signin` | Invalid Password authentication | `401 Unauthorized` | ✅ PASS |
| **API 3** | `GET` | `/api/auth/profile` | Protected User Profile (Bearer token) | `200 OK` / `401` | ✅ PASS |
| **API 4** | `GET` | `/api/auth/check-user` | Authenticated User Check | `200 OK` | ✅ PASS |
| **API 5** | `GET` | `/api/auth/check-admin` | Admin Authorization Check | `200 OK` / `403` | ✅ PASS |
| **API 6** | `GET` | `/api/products` | Boutique Garment Catalog & Category Filters | `200 OK` | ✅ PASS |
| **API 7** | `POST` | `/api/products` | Create Product (Admin Only) | `201 Created` | ✅ PASS |
| **API 8** | `POST` | `/api/stylist/recommend` | Gemini AI Virtual Stylist Recommendation | `200 OK` | ✅ PASS |
| **API 9** | `POST` | `/api/orders` | Customer Order Placement & Checkout | `201 Created` | ✅ PASS |
| **API 10**| `GET` | `/api/admin/metrics` | Boutique Dashboard Metrics & Revenue | `200 OK` | ✅ PASS |

---

## 🚀 Live Cloud Deployment Setup (Vercel & Render)

### Option A: Vercel Deployment (Recommended)
1. Import GitHub Repository: `https://github.com/reshmarajesh2802-alt/StyleSync-AI`
2. Vercel automatically detects `vercel.json` configuration at the root.
3. Configure Environment Variables in Vercel Dashboard:
   - `JWT_SECRET`: `stylesync_jwt_super_secret_key_2026`
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API Key
4. Click **Deploy**.

### Option B: Render / Netlify
- **Backend Service (Render Web Service)**: Build command `npm install` in `/server`, start command `npm start`.
- **Frontend Site (Vercel / Netlify Static)**: Build command `npm run build` in `/client`, output folder `dist`.

---

## 🔑 Demo Test Credentials
- **Customer User Account**: `customer@stylesync.ai` | Password: `Customer@123`
- **Boutique Admin Account**: `admin@stylesync.ai` | Password: `Admin@123`
