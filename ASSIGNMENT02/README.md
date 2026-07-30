# Spanish-English Translation Application

## Live Link:
Render: https://comp2068jsframeworks-1-miyb.onrender.com/

## Brief Description:
This application was designed to help users memorize spanish-english translation and allow them to customize which words they want to store in their library.  

<!-- brief description of features -->

## Feature #1 - Search Field:
I added a search feature where users are able bto find their words faster without having to manually scroll and look, especially if there are many saved entries. I used the MongoDB regex, options, and or to search every single property of the entries to find the exact or similar search.

Credit: https://www.mongodb.com/docs/manual/reference/operator/query/regex/


## Feature #2 - English-to-Spanish (mexican) Webpage Translation:
I implemented the application with two buttons in top navigation; English and Spanish (Mexicano). Webpage's language is set to english but if user hits the Spanish button, all content will be displayed in spanish instead of english (minus english translation). Same works with english, all will be switched to english, minus the spanish translations. This helps both english and spanish speakers feel more at ease when using this application.

Credit: Google Translate + my api for translations

## Feature #3 - Auto Translate with User Input (API):
In my application, when a user enters a word or phrase they want to store, the app will auto suggest a translation. (ex. Hello, suggestion: Hola).
    NPM Packages: axios and node-fetch?

API used: Microsoft, Translator
Credit: Azure, Microsoft, Translator

<!-- may not do.. -->
## Feature #4 - Flashcard/Test:
I added a feature to allow users to test themselves to help memorizes the translations better


## References:
Also all commented throughout my code, but here is a list as well of websites / videos I referred to while building this project:
* https://github.com/eduardojaime/COMP2068JavaScriptFrameworks/tree/master/lesson08 (referred to Jesus's lesson08 code many times)
* https://github.com/eduardojaime/COMP2068JavaScriptFrameworks/tree/master/lesson09 (referred to Jesus's lesson09 code many times)
* https://www.mongodb.com/docs/manual/reference/operator/query/regex/ (referred to the regex for search frag)
