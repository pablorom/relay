/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app/globals.css',
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}

export default config
