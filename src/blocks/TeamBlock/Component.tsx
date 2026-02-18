'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import type { TeamBlock as TeamBlockProps, Team } from '@/payload-types'
import Image from 'next/image'

type Props = TeamBlockProps

export const TeamBlockComponent: React.FC<Props> = ({
  badge = 'Team',
  title,
  description,
  limit = 6,
}) => {
  const [members, setMembers] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true)
        // Payload 3.0 pluralizes collection slugs by default for REST endpoints
        const res = await fetch(`/api/teams?limit=${limit}&depth=1`)
        if (!res.ok) throw new Error('Failed to fetch team members')
        const data = await res.json()
        setMembers(data.docs || [])
      } catch (err) {
        console.error('Failed to load team members:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMembers()
  }, [limit])

  if (!isLoading && members.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-50 py-16 md:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-5xl border-t px-6">
        <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">
          {badge}
        </span>

        <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24">
          <div className="sm:w-2/5">
            <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          </div>

          <div className="mt-6 sm:mt-0">
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="mt-12 md:mt-24">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => {
              const image = member.image
              const imageUrl = typeof image === 'object' && image?.url ? image.url : ''

              const socialLink =
                member.linkedin ||
                member.facebook ||
                member.instagram ||
                (member.email ? `mailto:${member.email}` : '#')

              return (
                <div key={member.id} className="group overflow-hidden">
                  <div className="relative h-96 w-full overflow-hidden rounded-md transition-all duration-500 group-hover:h-[22.5rem] group-hover:rounded-xl">
                    {imageUrl ? (
                      <Image
                        className="h-full w-full object-cover object-top grayscale transition-all duration-500 hover:grayscale-0"
                        src={imageUrl}
                        alt={member.name || 'Team member'}
                        width={826}
                        height={1239}
                      />
                    ) : (
                      <div className="h-full w-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                    <div className="flex justify-between">
                      <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                        {member.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">_0{index + 1}</span>
                    </div>

                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {member.position}
                      </span>

                      <Link
                        href={socialLink}
                        className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        {member.linkedin
                          ? 'LinkedIn'
                          : member.facebook
                            ? 'Facebook'
                            : member.instagram
                              ? 'Instagram'
                              : member.email
                                ? 'Email'
                                : 'Profile'}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
