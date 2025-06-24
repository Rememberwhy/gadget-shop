'use client'

import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-lime-400 p-4 sm:p-8 font-mono flex items-start justify-center">
      <div className="w-full max-w-screen-md mt-20">
        <h1 className="text-2xl font-bold mb-6 text-center">კონფიდენციალურობის პოლიტიკა</h1>

        <p className="mb-4 text-left">
          Hex Amridi, რომლის მისამართია hexamridi.tech, სერიოზულად უდგება თქვენს კონფიდენციალურობას. ეს კონფიდენციალურობის პოლიტიკა განმარტავს, როგორ ვაგროვებთ, ვიყენებთ და ვიცავთ თქვენს პერსონალურ მონაცემებს.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">1. ინფორმაცია, რომელსაც ვაგროვებთ</h2>
        <ul className="list-disc list-inside mb-4 text-left">
          <li>ელფოსტა (მომხმარებლის მიერ მიწოდების შემთხვევაში)</li>
          <li>ბრაუზერისა და მოწყობილობის მონაცემები</li>
          <li>IP მისამართი და ზოგადი მდებარეობა</li>
          <li>აქტივობის ლოგები და ანალიტიკა (მაგალითად, გვერდების ნახვები)</li>
          <li>გადახდის მონაცემები (Stripe-ის მეშვეობით)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">2. როგორ ვიყენებთ თქვენს ინფორმაციას</h2>
        <p className="mb-4 text-left">
          თქვენი მონაცემები შესაძლოა გამოყენებულ იქნეს შემდეგ მიზნებისთვის:
        </p>
        <ul className="list-disc list-inside mb-4 text-left">
          <li>სერვისების მიწოდება და გაუმჯობესება</li>
          <li>ტრანზაქციების დამუშავება და ქვითრების გაგზავნა</li>
          <li>მომხმარებლის შეკითხვებზე პასუხის გაცემა</li>
          <li>გამოყენების ტენდენციების ანალიზი გამოცდილების გასაუმჯობესებლად</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">3. მესამე მხარის სერვისები</h2>
        <p className="mb-4 text-left">
          შესაძლოა ვიყენებდეთ მესამე მხარის სერვისებს, როგორიცაა Stripe, Supabase და Google Analytics. ისინი შესაძლოა აგროვებდნენ მონაცემებს საკუთარი კონფიდენციალურობის პოლიტიკის შესაბამისად.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">4. ქუქი ფაილები (Cookies)</h2>
        <p className="mb-4 text-left">
          შესაძლოა ვიყენებდეთ ქუქი ფაილებს თქვენი პრეფერენციების დასამახსოვრებლად და საიტის ტრაფიკისა და ურთიერთქმედების ანალიზისთვის. შეგიძლიათ ქუქი ფაილების გამორთვა თქვენი ბრაუზერის პარამეტრებიდან.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">5. მონაცემების დაცვა</h2>
        <p className="mb-4 text-left">
          ვიყენებთ უსაფრთხო მეთოდებს თქვენი მონაცემების დასაცავად. თუმცა, არცერთი სისტემა არ არის 100%-ით დაცული და ჩვენ არ შეგვიძლია სრული უსაფრთხოების გარანტია.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">6. თქვენი უფლებები</h2>
        <p className="mb-4 text-left">
          თქვენ გაქვთ უფლება მოითხოვოთ წვდომა, კორექცია ან თქვენი პერსონალური მონაცემების წაშლა, დაგვიკავშირდეთ ელ. ფოსტაზე: info@hexamridi.tech
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">7. განახლებები</h2>
        <p className="mb-4 text-left">
          ეს კონფიდენციალურობის პოლიტიკა შესაძლოა დროდადრო განახლდეს. ყველა განახლება გამოქვეყნდება ამ გვერდზე.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-lime-300 text-center">8. კონტაქტი</h2>
        <p className="mb-4 text-left">
          კონფიდენციალურობის პოლიტიკასთან დაკავშირებული კითხვებისთვის, დაგვიკავშირდით:
          <br />
          ელ. ფოსტა: life.pro.ubuntu@gmail.com
        </p>
      </div>
    </main>
  )
}
