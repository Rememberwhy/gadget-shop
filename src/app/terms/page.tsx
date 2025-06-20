'use client'

import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-white font-mono">
      <h1 className="text-4xl font-bold mb-6 text-lime-400">Terms of Service</h1>

      <p className="mb-4">
        Welcome to <strong>Hexamridi.tech</strong>. By accessing or using this site, you agree to be bound by these terms and conditions. If you disagree with any part of the terms, please do not use our services.
      </p>

      <h2 className="text-2xl text-lime-300 mt-8 mb-2">1. Educational Use Only</h2>
      <p className="mb-4">
        All tools, scripts, and resources provided on Hexamridi.tech are intended solely for ethical hacking, academic study, and cybersecurity awareness purposes. The platform is designed to help users learn about security in a controlled and lawful environment.
      </p>

      <h2 className="text-2xl text-lime-300 mt-8 mb-2">2. Legal Disclaimer</h2>
      <p className="mb-4">
        Any misuse of the materials provided, including but not limited to unauthorized access, disruption of systems, or malicious activities, is strictly prohibited. Users are solely responsible for complying with their local laws. Hexamridi and its operators are not liable for any misuse of the tools shared.
      </p>

      <h2 className="text-2xl text-lime-300 mt-8 mb-2">3. Georgian Cybercrime Law Notice</h2>
      <p className="mb-4">
        Under Georgian law, unauthorized access to computer systems, data breaches, or disruption of digital infrastructure is punishable by fines and imprisonment. We do not support or endorse criminal activities and actively work to promote ethical cybersecurity practices in Georgia.
      </p>

      <h2 className="text-2xl text-lime-300 mt-8 mb-2">4. Awareness & Education Mission</h2>
      <p className="mb-4">
        Our mission is to build cybersecurity awareness, especially in Georgia, and to train future professionals in responsible digital behavior. By using this platform, you support a community that seeks to create a safer digital space.
      </p>

      <h2 className="text-2xl text-lime-300 mt-8 mb-2">5. Release of Responsibility</h2>
      <p className="mb-4">
        By using our website or downloading our tools, you agree to release Hexamridi.tech and its team from any responsibility or liability regarding the use, outcome, or impact of these resources.
      </p>

      <h2 className="text-2xl text-lime-300 mt-8 mb-2">6. Updates and Changes</h2>
      <p className="mb-4">
        We reserve the right to update or change these terms at any time. It is your responsibility to check this page periodically for updates.
      </p>

      <p className="mt-8">
        If you have any questions or concerns, please <Link href="contact" className="text-lime-400">contact us</Link>.
      </p>
    </main>
  )
}
