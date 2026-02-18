/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'bold',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2rem',
              },
              h2: {
                fontSize: '1rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
