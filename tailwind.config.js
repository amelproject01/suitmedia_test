/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
    './src/**/*.{html,js}',
    './public/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

const nextConfig = {
  eslist: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig