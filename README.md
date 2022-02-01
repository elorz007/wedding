# Setup
brew install npm
npm install
npm install -g grunt-cli

# Run (live reload)
grunt
touch index.html
open preview/index.html

# Package for distribution
grunt dist