"""
Script that scrapes Jaimini's box website to retrieve
when was the last One Piece chapter released to then ask you if
you want to read the chapter in your browser or download it
"""

from bs4 import BeautifulSoup
import requests
import webbrowser
from os import getcwd

url = 'https://jaiminisbox.com/reader/series/one-piece-2/' #website with chapters
r = requests.get(url).text
soup = BeautifulSoup(r, 'lxml')

#the first <div> tag with class 'element' is the latest chapter
#there are 3 anchor tags <a> with 'href' attributes within the div 
#links respectively redirect to:download, reading  and the uploader's profile

chapter = soup.find('div', class_='element')
chapter_title = chapter.find('div', class_='title').text
chapter_date = chapter.find('div', class_='meta_r').text 

print('the latest one piece chapter is...\n')
print(chapter_title)
print(chapter_date+'(yyyy/mm/dd)\n')

links = chapter.find_all('a') #list of len 3 with links inside <a> tags

#convert links' content into strings to use split() to get the urls as strings

for i in range(len(links)):
    links[i] = str(links[i])
    links[i] = links[i].split('"')

#the 3 items in links are now lists where the second element for each are urls
#print(links)
#visually: [[htmlstuff, url, htmlstuff], [idem], [idem]]
#This format has been consistently used, which allows to hardcode this
#without the use of regular expressions for 'http*'

action = input('would you like to download or read the chapter [d/r]?')


if action == 'd':
    d_url = links[0][1]
    print('Downloading...')
    r2 = requests.get(d_url)
    chapter_zip = open('%s' %chapter_title, 'wb')
    chapter_zip.write(r2.content)
    chapter_zip.close()
    print('Zip file in:', getcwd())
elif action == 'r':
    r_url = links[1][1]
    webbrowser.open(r_url)
else:
    print('that was neither d nor r, quitting...')

