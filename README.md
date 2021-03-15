# Description - Weather Dashboard

This is an original application to search weather information for both current day, as well as a five-day forecast.

## Features
* Shows current weather conditions including the date, temperature, humjidity, wind speed and UV index, as well as a user-friendly icon relative to the conditions
    * UV index is responsive and color coded depending on whether conditions are 'favorable', 'moderate' or 'severe'
* Shows a five-day forecast including the date, temperature and humidity, as well as another icon to denote the overall conditions for the day
* Maintains a list of the previous eight searches

## Technical details
* Utilized vanilla JavaScript and jQuery throughout to both provide functionality as well as build DOM elements
* Utilized Moment.js for assistance with date elements
* Styling is a combination of Bootstrap and custom CSS

### Challenges
* I had difficulties with the sidebar at first, but was able to find some researches through cunning use of google-fu that helped with finding code. 
* I utilized Postman for assistance with analyzing the different results from multiple API URLs and implimenting the different properties into my code
* Because of the different elements involved, I had difficulty with some responsiveness. I was able to do some research through Bootstrap documentation to impliment *some* responsiveness, but plan to improve this aspect over time
* In the time given, and to be able to create a MVP, searches are limited to city name only. For the most part, this seems to be serviceable, however, cities with multiple names are an issue, and some cities return as not found even when spelled correctly (such as Maui). In time, I plan to improve the search capabilities
* Duplicate cities in the history - I have tried a few methods but haven't been successful as of yet. Stay tuned

## Credits
Many thanks to the below individuals who provided input and suggestions
* Mim Armand
* Stephen Simone
* Kat Poulos
* Mark Artim
* Katie Martinez - Photo & input on colors
* And last, but not least - *Grogu*
        
<img src="./assets/images/grogu.png">

If any additional issues are found, or if there are any suggestions for improvement, please send an email to site developer Chris Martinez at cbmartinez42@gmail.com

---

### <ins>Installation</ins>
1.  Clone or download .zip file from Github to your local computer
2.  Open index.html via your preferred browser or code/text editor

#### <ins>Cloning</ins>
1. From Github, select the "Code" button, choose either HTTPS or SSH as appropriate
2. Click the copy button <img src="./assets/images/copy-button.PNG"> to add it to your clipboard
3. In your preferred command line (terminal, bash, etc), navigate to the folder you'd like to download the repository into
4. Type `git clone [pasted url from clipboard]` and press enter
5. Access the content with your code editor by either typing `code .` in your command line or by using your editor's `File > Open Folder` in your code editor menu. If only viewing in a browser, simply double click index.html to open in your default browser


#### <ins>Zip file</ins>
1. From Github, select the "Code" button, then select "Download ZIP"
2. Choose which folder to download the repository into via the dialog box that appears
3. After downloading, open the .zip file and select "Extract All" from the top of the window that appears
4. Access the content with your code editor by selecting `File > Open Folder` in your code editor menu. If only viewing in a browser, simply double click index.html to open in your default browser

[https://cbmartinez42.github.io/weather-dashboard/](https://cbmartinez42.github.io/weather-dashboard/)

---

This application is covered under [GNU General Public License v3.0](./LICENSE)

## Screenshot below:

<img src="./assets/images/weather-dashboard.gif">

