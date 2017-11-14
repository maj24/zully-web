# Zully Web #

## Stack
* ReactJS

## Setup ##
### Requirements ###
* NodeJS -> 6.9.5

### Install ###
* ` $ git clone https://bitbucket.org/yellowme/brandon-web`
* ` $ cd zully-web`
* ` $ npm install`

### Run ###
* ` $  npm start`

### Run Testing ###
* ` $  nmp run test`

### Run Production ###
* ` $  npm run build`

APP should be available at http://localhost:3000

# FONTCUSTOM #
For compile svg assets.

## Install ##
### On Mac ###
* `$ brew install fontforge --with-python`
* `$ brew install eot-utils`
* `$ gem install fontcustom`

### On Linux ###
* `$ sudo apt-get install fontforge`
* `$ wget http://people.mozilla.com/~jkew/woff/woff-code-latest.zip`
* `$ unzip woff-code-latest.zip -d sfnt2woff && cd sfnt2woff && make && sudo mv sfnt2woff /usr/local/bin/`
* `$ gem install fontcustom `

### Add assets in svg format###
* ` /src/assets/vectors/`

### Compile Assets ###
* `$ fontcustom compile`

More info in: [https://github.com/FontCustom/fontcustom](https://github.com/FontCustom/fontcustom)
