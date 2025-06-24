'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

const scripts = [
  {
    name: 'WI-FI სკანერი',
    slug: 'wifi-deauther',
    icon: '/script-icons/deauth.png',
    price: 45.0,
    content:
      'ეს კოდი ამოწმებს და ტესტავს თქვენს Wi-Fi-ს, ამის მეშვეობით თქვენ აღმოაჩენთ რამდენად დაცულია თქვენ ინტერნეტი და თქვენი უსაფრთხოება. მოყვება დაყენების და გამართვის ყველანაირი ინსტრუქცია. თანამედროვე ტექნოლოგიებზე მორგებული დამცველი ჰექსამრიდისგან! ',
    features: [
      'უახლოესი ქსელების მონიტორინგი',
      'სიგნალის სიძლიერისა და არხების ანალიზი',
      'იდეალურია ტესტირებისთვის, პენტესტინგისთვის და უსაფრთხოების ანალიზისთვის',
    ],
  },
  {
    name: 'NFC ბრონი  მაქსიმალური დაცვა უნებართვო შეღწევისგან!',
    slug: 'nfc-clone',
    icon: '/script-icons/nfcscript.png',
    price:  39.99,
    content: 'NFC ბრონი არის უსაფრთხოების სკრიპტი, რომელიც შექმნილია იმისთვის, რომ დაიცვას თქვენი მოწყობილობა ან NFC ბარათი არასანქცირებული წვდომისა და მავნე შეტევებისგან. იგი სკანირებს მიმდებარე სიგნალებს, ამოიცნობს საეჭვო კავშირს და ავტომატურად ბლოკავს არასასურველ ქმედებებს.',
    features: [
      'იცავს პირად მონაცემებს',
      'აძლიერებს NFC უსაფრთხოებას',
      'გამოგადგებათ როგორც პირადი, ასევე პროფესიონალური უსაფრთხოებისთვის',
    ],
  },
  {
    name: 'ვირუსებისგან წმენდა და მონიტორინგი',
    slug: 'bt-sniffer',
    icon: '/script-icons/blue.png',
    price:  10,
    content: 'ეს სკრიპტი სკანირებს სისტემას მავნე ფაილებისა და საეჭვო პროცესების დასადგენად. იგი ავტომატურად ასუფთავებს მოწყობილობას ვირუსებისგან და აწარმოებს მუდმივ მონიტორინგს სისტემის უსაფრთხოების გასაუმჯობესებლად.',
    features: ['სწრაფი ანალიზი', 'ვირუსული ელემენტების ამოღება', 'უწყვეტი მონიტორინგი და გაფრთხილებაs'],
  },

    {
        name: 'მონაცაემების გაჟონვის დეტექტორი',
        slug: 'cred-dumper',
        icon: '/script-icons/credential.png',
        price: 25.99,
        content: 'ეს სკრიპტი მონიტორინგს უწევს თქვენს სისტემას და ამოიცნობს მგრძნობიარე მონაცემების გაჟონვას. იგი ავტომატურად აფრთხილებს, თუ რაიმე საეჭვო აქტივობა დაფიქსირდა, რაც ხელს შეუწყობს თქვენი მონაცემების უსაფრთხოების დაცვას.',
        features: [
        'რეალურ დროში მონიტორინგი',
        'სენსიტიური მონაცემების გადაცემის დაფიქსირება',
        'შეტყობინება და ავტომატური შეჩერება',
        'მონაცემთა უსაფრთხოების გაძლიერება',
        ],
    },
]

export default function ScriptPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = use(props.params)
  const script = scripts.find(s => s.slug === slug)
  const { addToCart } = useCart()
  const router = useRouter()

  if (!script) return notFound()

  const handleBuy = () => {
    addToCart({
      id: script.slug,
      name: script.name,
      price: script.price, // price in GEL, will be stored in tetri
      image: script.icon,
      quantity: 1,
    })
    router.push('/checkout')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <Image
          src={script.icon}
          alt={script.name}
          width={150}
          height={150}
          className="rounded-xl border border-gray-700 shadow-lg"
        />

        <div className="flex-1 text-white">
          <h1 className="text-2xl font-bold text-lime-400 mb-3">{script.name}</h1>
          <p className="text-gray-300 mb-6 text-2lg">{script.content}</p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              {script.features.map((feature, i) => (
                <li key={i} className="text-lg text-gray-200">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="text-2xl font-semibold text-lime-300">
              ₾{script.price.toFixed(2)}
            </span>
            <button
              onClick={handleBuy}
              className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-6 rounded shadow hover:shadow-lg transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
