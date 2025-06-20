'use client'

import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white font-mono">
      <h1 className="text-4xl font-bold mb-6 text-lime-400">Privacy Policy</h1>

      <p className="mb-4">
        At Hex Amridi, accessible from hexamridi.tech, we take your privacy seriously. This Privacy Policy describes how we
        collect, use, and protect your personal data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Email address (if submitted by user)</li>
        <li>Browser and device information</li>
        <li>IP address and general location</li>
        <li>Activity logs and analytics (e.g., page views)</li>
        <li>Purchase data (via Stripe)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300">2. How We Use Your Information</h2>
      <p className="mb-4">
        We may use your data to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Provide and improve our services</li>
        <li>Process transactions and send receipts</li>
        <li>Respond to inquiries</li>
        <li>Analyze usage trends to enhance the user experience</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300">3. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services like Stripe, Supabase, and Google Analytics. These services may collect data under
        their own privacy policies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300">4. Cookies</h2>
      <p className="mb-4">
        We may use cookies to remember your preferences and to help us understand site traffic and interaction patterns.
        You can disable cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300">5. Data Protection</h2>
      <p className="mb-4">
        We use secure methods to protect your data. However, no system is 100% secure, and we cannot guarantee absolute
        protection.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300">6. Your Rights</h2>
      <p className="mb-4">
        You have the right to request access to, correction, or deletion of your personal data by contacting us at
        info@hexamridi.tech.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300">7. Updates</h2>
      <p className="mb-4">
        This Privacy Policy may be updated from time to time. All updates will be posted on this page.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300">8. Contact</h2>
      <p className="mb-4">
        For questions about this Privacy Policy, contact us at:
        <br />
        Email: info@hexamridi.tech
      </p>
    </div>
  )
}