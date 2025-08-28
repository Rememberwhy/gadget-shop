'use client'

import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-lime-400 p-4 sm:p-8 font-mono flex items-start justify-center">
      <div className="w-full max-w-screen-md mt-20">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>

        <p className="mb-4 text-left">
          Welcome to <strong>Hexamridi.tech</strong>. By accessing or using this website, you agree to these terms. 
          If you do not agree with any part of them, please do not use our services.
        </p>

        <h2 className="text-2xl text-lime-300 mt-8 mb-2 text-center">1. For Educational Purposes Only</h2>
        <p className="mb-4 text-left">
          All tools, scripts, and resources provided on this website are intended solely for ethical hacking, 
          academic learning, and raising cybersecurity awareness. The platform is designed for learning about 
          security in a legal and controlled environment.
        </p>

        <h2 className="text-2xl text-lime-300 mt-8 mb-2 text-center">2. Legal Responsibility</h2>
        <p className="mb-4 text-left">
          Any misuse of materials — including unauthorised access, system disruption, or malicious activity — 
          is strictly prohibited. Users are responsible for complying with the laws of their own country. 
          Hexamridi and its operators accept no liability for the misuse of these tools.
        </p>

        <h2 className="text-2xl text-lime-300 mt-8 mb-2 text-center">3. Applicable Law</h2>
        <p className="mb-4 text-left">
          Under applicable law, unauthorised access to computer systems, data breaches, or infrastructure 
          disruption may result in fines or imprisonment. We do not support illegal activities and actively 
          promote the growth of ethical cybersecurity practices.
        </p>

        <h2 className="text-2xl text-lime-300 mt-8 mb-2 text-center">4. Awareness and Educational Mission</h2>
        <p className="mb-4 text-left">
          Our mission is to raise awareness of cybersecurity and help prepare future professionals for responsible 
          digital behaviour. By using this platform, you are supporting a community working towards a safer 
          digital environment.
        </p>

        <h2 className="text-2xl text-lime-300 mt-8 mb-2 text-center">5. Disclaimer of Liability</h2>
        <p className="mb-4 text-left">
          By using our website or downloading tools, you agree to release Hexamridi.tech and its team from 
          any liability regarding the use, outcomes, or consequences of these resources.
        </p>

        <h2 className="text-2xl text-lime-300 mt-8 mb-2 text-center">6. Updates and Changes</h2>
        <p className="mb-4 text-left">
          We reserve the right to update or modify these terms at any time. It is your responsibility to 
          review this page periodically for changes.
        </p>

        <p className="mt-8 text-left">
          If you have any questions or concerns, please <Link href="/contact" className="text-lime-400 underline">contact us</Link>.
        </p>
      </div>
    </main>
  )
}
