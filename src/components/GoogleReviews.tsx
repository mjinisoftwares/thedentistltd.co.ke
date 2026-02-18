'use client'

import Script from 'next/script'

export default function ReviewsWidget() {
  return (
    <>
      <section className="container bg-gradient-to-br from-primary/5 via-primary-20 to-secondary/30 dark:bg-secondary/50 border-t border-border mx-auto pt-16">
        <div className="relative  z-10 mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold lg:text-4xl text-foreground mb-4">
            What Our Clients Says About Us
          </h2>

          <p className="text-base text-muted-foreground">
            Read what our clients have to say about their experience with us.
          </p>
        </div>

        {/* ✅ Featurable Widget Mount Point */}
        <div id="featurable-5a433aab-1a36-4363-8405-a336c1cdcf23" data-featurable-async />
      </section>

      {/* ✅ External Script */}
      <Script
        src="https://featurable.com/assets/v2/carousel_default.min.js"
        strategy="lazyOnload"
        charSet="UTF-8"
      />
    </>
  )
}
