module.exports = {
  plugins: [
    require('flowbite/plugin')
  ],

  content: ["./node_modules/flowbite/**/*.js",
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js"
  ], 
  theme: {
    extend: {
      colors: {
        primary: "#0096BB",
        grayRaven: "#6C757D",
        yellowSea: "#F39530",
      },
    },
  },


};