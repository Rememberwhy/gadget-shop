'use client'

import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-lime-400 p-4 sm:p-8 font-mono flex items-start justify-center">
      <div className="w-full max-w-screen-md mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4 text-left">
          Hex Amridi, located at hexamridi.tech, takes your privacy seriously. 
          This Privacy Policy explains how we collect, use, and protect your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">1. Information We Collect</h2>
        <ul className="list-disc list-inside mb-4 text-left">
          <li>Email address (if provided by the user)</li>
          <li>Browser and device data</li>
          <li>IP address and general location</li>
          <li>Activity logs and analytics (e.g., page views)</li>
          <li>Payment details (via Stripe)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">2. How We Use Your Information</h2>
        <p className="mb-4 text-left">
          Your data may be used for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4 text-left">
          <li>Providing and improving our services</li>
          <li>Processing transactions and sending receipts</li>
          <li>Responding to customer enquiries</li>
          <li>Analysing usage trends to enhance user experience</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">3. Third-Party Services</h2>
        <p className="mb-4 text-left">
          We may use third-party services such as Stripe, Supabase, and Google Analytics. 
          These providers may collect data in accordance with their own privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">4. Cookies</h2>
        <p className="mb-4 text-left">
          We may use cookies to remember your preferences and to analyse site traffic and interactions. 
          You can disable cookies in your browser settings if you prefer.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">5. Data Protection</h2>
        <p className="mb-4 text-left">
          We use secure methods to protect your information. However, no system is 100% secure, 
          and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">6. Your Rights</h2>
        <p className="mb-4 text-left">
          You have the right to request access to, correction of, or deletion of your personal data. 
          Please contact us at: info@hexamridi.tech
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">7. Updates</h2>
        <p className="mb-4 text-left">
          This Privacy Policy may be updated from time to time. All updates will be posted on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">8. Contact</h2>
        <p className="mb-4 text-left">
          For questions regarding this Privacy Policy, please contact us at:
          <br />
          Email: life.pro.ubuntu@gmail.com
        </p>
      </div>
    </main>
  )
}
