module.exports = {
  plugins: [
    require('flowbite/plugin')
  ],

  content: ["./node_modules/flowbite/**/*.js",
            './src/**/*.{js,jsx,ts,tsx}',  
            "./node_modules/flowbite/**/*.js"
    ]
  

};