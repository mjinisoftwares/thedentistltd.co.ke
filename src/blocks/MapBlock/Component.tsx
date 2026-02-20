'use client'

import React, { useEffect, useState } from 'react'
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import type { MapBlock as MapBlockProps } from '@/payload-types'
import { MapPin } from 'lucide-react'

export const MapBlockComponent: React.FC<MapBlockProps> = ({
  mapId = 'bf51a910020fa25a',
  defaultLat = -0.291398,
  defaultLng = 36.06421,
  defaultZoom = 16,
  height: heightProp,
}) => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  const height = heightProp || '500px'
  const [isMounted, setIsMounted] = useState(false)

  const markerPosition = {
    lat: defaultLat,
    lng: defaultLng,
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!API_KEY) {
    return (
      <div
        className="flex items-center justify-center bg-muted text-muted-foreground border-y"
        style={{ height }}
      >
        <p className="flex items-center gap-2">
          <MapPin className="size-5" />
          Google Maps API Key is missing.
        </p>
      </div>
    )
  }

  if (!isMounted) {
    return <div style={{ height }} className="bg-muted border-y" />
  }

  return (
    <section className="relative w-full border-y border-border overflow-hidden">
      <APIProvider apiKey={API_KEY}>
        <div style={{ height }}>
          <Map
            mapId={mapId}
            defaultZoom={defaultZoom ?? 15}
            defaultCenter={markerPosition}
            gestureHandling="none"
            disableDefaultUI
            className="w-full h-full grayscale-[0.2] contrast-[1.1]"
          >
            {/* Main Marker */}
            <AdvancedMarker position={markerPosition}>
              <div className="relative flex items-center justify-center">
                <div className="absolute size-10 animate-ping rounded-full bg-primary/20" />
                <div className="relative flex size-12 items-center justify-center rounded-full border-4 border-background bg-primary shadow-xl">
                  <MapPin className="size-6 text-primary-foreground fill-primary-foreground/20" />
                </div>
              </div>
            </AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
    </section>
  )
}
