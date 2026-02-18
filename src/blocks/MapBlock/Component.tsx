'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps'
import type { MapBlock as MapBlockProps } from '@/payload-types'
import { Search, MapPin, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

export const MapBlockComponent: React.FC<MapBlockProps> = ({
  mapId = 'bf51a910020fa25a',
  defaultLat = 22.54992,
  defaultLng = 0,
  defaultZoom,
  height: heightProp,
}) => {
  const height = heightProp || '500px'
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null)
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number }>({
    lat: defaultLat,
    lng: defaultLng,
  })

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

  return (
    <section className="relative w-full border-y border-border overflow-hidden">
      <APIProvider apiKey={API_KEY}>
        <div style={{ height }}>
          <Map
            mapId={mapId}
            defaultZoom={defaultZoom ?? 12}
            defaultCenter={{ lat: defaultLat, lng: defaultLng }}
            gestureHandling="greedy"
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

          {/* Search Control */}
          <MapControl position={ControlPosition.TOP_LEFT}>
            <div className="m-4 w-[calc(100vw-2rem)] max-w-sm rounded-2xl bg-background/95 p-1.5 shadow-2xl backdrop-blur-md border border-border/50">
              <PlaceAutocomplete
                onPlaceSelect={(place) => {
                  setSelectedPlace(place)
                  if (place?.geometry?.location) {
                    setMarkerPosition({
                      lat: place.geometry.location.lat(),
                      lng: place.geometry.location.lng(),
                    })
                  }
                }}
              />
            </div>
          </MapControl>

          {/* Location Info / Directions */}
          {selectedPlace && (
            <MapControl position={ControlPosition.BOTTOM_LEFT}>
              <div className="m-4 max-w-xs rounded-2xl bg-background/95 p-4 shadow-2xl backdrop-blur-md border border-border animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h3 className="font-bold text-sm">{selectedPlace.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {selectedPlace.formatted_address}
                </p>
                <Button
                  size="sm"
                  className="mt-3 w-full gap-2 rounded-xl h-9"
                  onClick={() => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${markerPosition.lat},${markerPosition.lng}`
                    window.open(url, '_blank')
                  }}
                >
                  <Navigation className="size-3" />
                  Get Directions
                </Button>
              </div>
            </MapControl>
          )}

          <MapHandler place={selectedPlace} />
        </div>
      </APIProvider>
    </section>
  )
}

/* ----------------------------------------
   Map Handler
----------------------------------------- */

const MapHandler: React.FC<{ place: google.maps.places.PlaceResult | null }> = ({ place }) => {
  const map = useMap()

  useEffect(() => {
    if (!map || !place) return

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport)
    } else if (place.geometry?.location) {
      map.panTo(place.geometry.location)
      map.setZoom(15)
    }
  }, [map, place])

  return null
}

/* ----------------------------------------
   Autocomplete Input
----------------------------------------- */

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void
}

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({ onPlaceSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const places = useMapsLibrary('places')
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    if (!places || !inputRef.current) return

    const instance = new places.Autocomplete(inputRef.current, {
      fields: ['geometry', 'name', 'formatted_address'],
    })

    setAutocomplete(instance)
  }, [places])

  useEffect(() => {
    if (!autocomplete) return

    autocomplete.addListener('place_changed', () => {
      onPlaceSelect(autocomplete.getPlace())
    })
  }, [autocomplete, onPlaceSelect])

  return (
    <div className="relative flex items-center group">
      <Search className="absolute left-3 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <input
        ref={inputRef}
        placeholder="Search for a place..."
        className="h-10 w-full rounded-xl bg-transparent pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground/60"
      />
    </div>
  )
}
