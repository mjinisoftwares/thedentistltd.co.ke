'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phone = '254729396862' // without +
  const message = encodeURIComponent(
    'Hello The Dentist LTD, I would like to book a dental appointment.',
  )

  const whatsappURL = `https://wa.me/${phone}?text=${message}`

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-white shadow-lg hover:bg-green-600 transition-all"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  )
}
