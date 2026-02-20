'use client'

import React from 'react'

interface GoogleMapProps {
  className?: string
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ className }) => {
  return (
    <div className={`container overflow-hidden rounded-2xl border shadow-sm ${className || ''}`}>
      <div className="relative w-full h-[400px] md:h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d319.21984246717824!2d36.064070007357785!3d-0.29051971154039713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18298db626d9338b%3A0x2c12e5121714b839!2sThe%20Dentist%20Ltd!5e0!3m2!1sen!2ske!4v1771583091064!5m2!1sen!2ske"
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
