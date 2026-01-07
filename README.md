# Hexamridi.tech

## Overview

**Hexamridi.tech** is a **security-aware e-commerce platform** designed for selling **technology and privacy-focused products**, including computer accessories, electronic gadgets, and security tools intended for research and personal protection.

The platform combines **modern full-stack web development** with a **defensive backend architecture**, ensuring that authentication, authorization, and data access are handled securely at every layer.

Hexamridi is built to demonstrate how a real-world online store can be implemented with **security-first principles**, rather than treating security as an afterthought.

---

## Purpose of the Platform

Hexamridi.tech is designed to:

- sell physical technology products (keyboards, gadgets, computer accessories)
- offer security-related tools for researchers and privacy-conscious users
- provide a clean and secure shopping experience
- demonstrate secure full-stack e-commerce architecture
- serve as a foundation for further expansion of security-focused products

The platform is suitable for portfolio evaluation, academic review, and real-world deployment.

---

## Product Categories

Hexamridi.tech supports multiple product categories, including:

### Consumer Technology
- Mechanical and custom keyboards
- Computer accessories
- General electronic gadgets
- Limited-quantity tech products

### Security & Privacy Tools
- Wi-Fi scanning devices for security research and analysis
- NFC blockers designed to prevent unauthorized NFC/RFID access
- Privacy-oriented hardware intended for defensive and ethical use

All security-related products are intended for **legitimate research, testing, and personal protection purposes only**.

---

## Core Features

- Secure user authentication and session handling
- User accounts for order tracking and checkout
- Admin dashboard for managing products and inventory
- Product listing and detail pages
- Secure checkout flow
- Backend authorization for admin-only operations
- Environment-based configuration for development and production

---

## System Architecture

Hexamridi follows a **modern full-stack architecture** with clear separation of responsibilities.

### Frontend Layer

- Built with **Next.js (App Router)** and **TypeScript**
- Component-driven UI architecture
- Responsive layout for desktop and mobile
- Client-side form validation
- No trust placed in client-side authorization logic

### Backend Layer

- Powered by **Supabase**
  - PostgreSQL database
  - Authentication services
  - Authorization logic
- REST-style API interactions
- Server-side validation of permissions
- Clear separation between user and admin functionality

### Database Layer

- PostgreSQL relational database
- Structured schemas for users, products, and orders
- **Row Level Security (RLS)** to enforce access control
- Database acts as the final authority for permissions

### Payments Layer

- Integrated with **Stripe**
- Secure checkout sessions
- No sensitive payment data stored on the application server
- Payment logic handled entirely by Stripe

---


## Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Component-based UI design

### Backend
- Supabase
- PostgreSQL
- REST APIs
- Authentication and authorization services

### Payments
- Stripe (secure checkout)

### Security & Tooling
- PostgreSQL Row Level Security (RLS)
- Secure environment configuration
- Manual testing using tools such as:
  - curl (HTTP and API request testing)
  - browser developer tools
- Linux-based development environments

---


###Getting Started
Prerequisites

Node.js (LTS recommended)

npm, pnpm, or yarn

Supabase project

Stripe account (for payment features)

Installation

Clone the repository:

git clone https://github.com/Rememberwhy/gadget-shop.git
cd gadget-shop


###Install dependencies:

npm install

Environment Variables

Create a .env.local file in the root directory:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

Running the Application

Start the development server:

npm run dev


###The application will be available at:

http://localhost:3000
