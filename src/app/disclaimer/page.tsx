'use client'

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-black text-lime-400 p-4 sm:p-8 font-mono flex items-start justify-center">
      <div className="w-full max-w-screen-md mt-20">
        <h1 className="text-4xl font-bold mb-6 text-center">Disclaimer</h1>

        <p className="mb-4 text-left">
          The content, tools, and scripts available on <strong>hexamridi.tech</strong> are provided strictly for 
          <strong> educational, ethical, and research purposes</strong>.
        </p>

        <p className="mb-4 text-left">
          Our mission is to support the development of cybersecurity skills, raise awareness of digital safety, 
          and contribute to building a safer internet. We work to provide students, security researchers, and 
          future professionals with the opportunity to apply knowledge ethically.
        </p>

        <p className="mb-4 text-left">
          <strong>We do not endorse or support any illegal activity.</strong> All materials are intended to be used 
          only in authorised and controlled environments (e.g., labs, CTF competitions, or educational systems). 
          Any hacking activity without permission, committing cybercrime, or unauthorised access is strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-center">Cybercrime Law</h2>

        <p className="mb-4 text-left">
          Under applicable <strong>criminal law</strong>, the following are considered offences:
        </p>
        <ul className="list-disc list-inside mb-4 text-lime-300 text-left">
          <li><strong>Unauthorised access</strong> to a computer system is punishable by law.</li>
          <li><strong>Interference</strong> with data or systems (deletion, alteration, blocking) is a criminal act.</li>
          <li><strong>Illegal interception</strong> of data transmission is prohibited.</li>
          <li><strong>Distribution or use of malicious software or hacking tools</strong> is considered an offence.</li>
        </ul>

        <p className="mb-4 text-left">
          Using this website or its content in violation of national or international laws is the sole responsibility 
          of the user and may lead to legal consequences.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-center">Liability and Legal Disclaimer</h2>

        <p className="mb-4 text-left">
          By accessing or using this website, you agree to use the content <strong>only legally and ethically</strong>. 
          You also acknowledge and agree that:
        </p>
        <ul className="list-disc list-inside mb-4 text-lime-300 text-left">
          <li><strong>Hexamridi.tech</strong> and its authors are not responsible for any misuse of the content.</li>
          <li>We expressly disclaim <strong>any liability or legal responsibility</strong> regarding how users apply 
              the scripts or programs.</li>
          <li>Each user bears full responsibility for the use of knowledge shared on this website.</li>
        </ul>

        <p className="mb-4 text-left">
          This website accepts no responsibility for any damage, unlawful activity, or unauthorised access resulting 
          from misuse of the content.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-center">Our Vision</h2>
        <p className="mb-4 text-left">
          Our goal is to build a safer digital world by educating users, promoting ethical cybersecurity, 
          and protecting the digital space. We aim to empower young people, students, and professionals 
          to develop real skills to protect themselves and their communities.
        </p>

        <p className="mt-8 italic text-sm text-center text-lime-400">
          Knowledge is power. Use it for defence — never for harm.
        </p>
      </div>
    </main>
  )
}
