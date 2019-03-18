### DOCS ###
mkdir -p src/components src/styles test
npm init
###
#add React to our project
###
npm i react react-dom --save
###
#The env preset implicitly includes babel-preset-es2015, babel-preset-es2016, babel-preset-es2017, and babel-preset-latest together, which means you can run ES6, ES7, and ES8 code. Babel doesn’t know what to do with React & JSX.
###
npm i @babel/cli @babel/core @babel/preset-env @babel/preset-react --save-dev
###
#having tests for the things we build. We will be using Jest with Enzyme for this project. 
###
npm i jest enzyme enzyme-adapter-react-16 react-test-renderer --save-dev
###
#webpack will allow us to modularize our code and easily bundle it into a single file for production.
#
npm i webpack --save-dev
###
#Before webpack will work properly, we need to set it up to work with ES6 and JSX.
###
npm i babel-loader --save-dev
###
#we’re going to chain style loaders together so our styles are applied immediately to the DOM.
###
npm i css-loader style-loader --save-dev
###
#This is also going to take the index.html file and drop it into our build folder
###
npm i html-webpack-plugin --save-dev
###
#the directory we put our build in is cleaned out of any former files every time we run a build
###
npm i clean-webpack-plugin --save-dev
###
#webpack-cli is going to be used to run our commands from our package.json file
###
npm i webpack-cli webpack-dev-server --save-dev
###
#run dev server
npm start
###
#So let’s create separate build files for our production and development environments and tell webpack how to handle that
###
npm i webpack-merge --save-dev
npm start
###
#This will output an optimized version of your code into the /dist folder.
###
npm run build


