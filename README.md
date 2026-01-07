# Hexamridi.tech

## Overview

**Hexamridi.tech** is a **security-aware full-stack web platform** designed for delivering **digital products and subscription-based services**.  
The platform is built using modern web technologies with a strong emphasis on **authentication, authorization, backend integrity, and defensive system design**.

Hexamridi is intended to demonstrate how a real-world SaaS-style system can be implemented with **security-first architecture**, where access control and data protection are enforced at multiple layers of the stack.

---

## Purpose of the Project

The purpose of Hexamridi.tech is to:

- provide a production-style full-stack application example
- demonstrate secure authentication and authorization flows
- implement role-based access control (RBAC)
- integrate secure payment and subscription handling
- enforce database-level security using Row Level Security (RLS)
- serve as a foundation for scalable and maintainable SaaS systems

The project is suitable for learning, academic review, portfolio evaluation, and further extension into a production environment.

---

## Core Features

- User authentication and session management
- Role-based access control (user / admin separation)
- Secure admin dashboard
- Digital product management and delivery
- Subscription-based payments via Stripe
- Backend authorization enforced at database level
- Environment-based configuration for development and production

---

## System Architecture

Hexamridi follows a **layered full-stack architecture** with clear separation of responsibilities.

### Frontend Layer

- Built with **Next.js (App Router)** and **TypeScript**
- Component-driven user interface
- Client-side validation for forms and user input
- No trust placed in client-side authorization logic
- Secure handling of user session state

### Backend Layer

- Powered by **Supabase**
  - PostgreSQL database
  - Authentication services
  - Authorization logic
- REST-style API interactions
- Server-side permission checks
- Role-based access enforcement

### Database Layer

- PostgreSQL relational database
- Structured schemas with explicit relationships
- **Row Level Security (RLS)** policies to enforce access control
- Minimal-privilege access patterns
- Database acts as the final authority for permissions

### Payments Layer

- Integrated with **Stripe**
- Secure checkout and subscription handling
- Webhook-based event processing
- No sensitive payment logic handled on the client

---

## Security Design Principles

Security is treated as a **core requirement** of the system.

Key principles applied:

- Defense in depth across frontend, backend, and database
- Authentication and authorization enforced at multiple layers
- Database-level access control using PostgreSQL RLS
- No reliance on client-side role or permission checks
- Secure handling of secrets and environment variables
- Awareness of common web vulnerabilities (OWASP Top 10)

The platform is designed with **bug-bounty-style threat modeling** in mind, particularly focusing on:

- authentication bypass attempts
- privilege escalation paths
- API misuse and logic flaws
- improper access control scenarios

---

## Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Component-based UI architecture

### Backend
- Supabase
- PostgreSQL
- REST APIs
- Authentication and authorization services

### Payments
- Stripe (checkout sessions, subscriptions, webhooks)

### Security & Tooling
- PostgreSQL Row Level Security (RLS)
- Secure environment configuration
- Manual testing using tools such as:
  - curl (API request testing)
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
