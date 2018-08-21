# one-piece-scraper
Jaimini's Box is a scanlation website that provides high quality scans of a manga I follow called 'One Piece'.

I made personal webscraping tools to retrieve their latest release in order to have fast access to the reading link. I initially made a CLI program variant with python3, but later created a chrome browser extension. Specifically, the urls to read and download the latest chapter are retrieved.

## Use the extension
* Clone this repo
* Open your chrome extensions (chrome://extensions) and activate dev tools
* Load unpacked extension and select the 'chrome-extension-variant' folder
* You should have a clickable extension near your omnibox

## Use the python3 version
* Clone this repo and go to its directory
* Install required python3 modules (pip3 install -r requirements.txt)
* Run scraper.py with python3
* Follow prompt instructions to read or download chapter (downloaded in same folder as scraper.py)
