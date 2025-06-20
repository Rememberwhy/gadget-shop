export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-black text-lime-400 p-8 font-mono">
      <div className="max-w-3xl mx-auto mt-20">
        <h1 className="text-4xl font-bold mb-6 text-center">Disclaimer</h1>

        <p className="mb-4">
          The content, tools, and scripts available on <strong>hexamridi.tech</strong> are provided solely for <strong>educational, ethical, and research purposes</strong>.
        </p>

        <p className="mb-4">
          Our mission is to support the development of cybersecurity skills, raise awareness about digital safety, and help build a more secure internet — especially within Georgia. We operate with the goal of empowering students, security researchers, and future professionals in the ethical use of technology.
        </p>

        <p className="mb-4">
          <strong>We do not condone or support illegal activity of any kind.</strong> The materials here are to be used only in authorized, controlled environments (e.g., test labs, CTFs, educational systems). Any use for hacking without permission, cybercrime, or unauthorized access is strictly forbidden.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Georgian Cybercrime Law</h2>

        <p className="mb-4">
          According to the <strong>Criminal Code of Georgia (Chapter 15¹ – Cybercrime)</strong>:
        </p>
        <ul className="list-disc list-inside mb-4 text-lime-300">
          <li><strong>Article 284:</strong> Illegal access to a computer system is punishable by law.</li>
          <li><strong>Article 285:</strong> Interference with data or systems (deletion, modification, blocking) is a criminal offense.</li>
          <li><strong>Article 286:</strong> Illegal interception of data transmission is prohibited.</li>
          <li><strong>Article 286¹:</strong> Distribution or use of malicious software and hacking tools is considered a crime.</li>
        </ul>

        <p className="mb-4">
          Anyone using this website or its contents in violation of Georgian or international law is fully responsible for their actions and may face legal consequences.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4"> Responsibility & Legal Release</h2>

        <p className="mb-4">
          By accessing or using this website, you agree to use its contents <strong>only in legal and ethical ways</strong>. You also acknowledge and accept that:
        </p>
        <ul className="list-disc list-inside mb-4 text-lime-300">
          <li><strong>Hexamridi.tech</strong> and its contributors are not liable for any misuse of information, tools, or content provided.</li>
          <li>We explicitly <strong>disclaim any responsibility or legal liability</strong> for how users choose to use the scripts or software featured on this site.</li>
          <li>The responsibility for using knowledge from this site lies 100% with the individual user.</li>
        </ul>

        <p className="mb-4">
          This website is not responsible for any damage, criminal activity, or unauthorized access that may occur due to improper use of its content.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4"> Our Vision</h2>
        <p className="mb-4">
          Our purpose is to build a safer digital world by educating users, promoting ethical cybersecurity, and helping secure Georgia’s cyberspace. We aim to encourage youth, students, and professionals to develop real-world skills to protect themselves and their communities.
        </p>

        <p className="mt-8 italic text-sm text-center text-lime-400">
          Knowledge is power. Use it to protect — never to harm.
        </p>
      </div>
    </main>
  )
}
