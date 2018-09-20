# Meme Space
> Create memes out of carefully, already selected funny images from the internet! Add memes that others have created into your favorites, or remove them!

Created with a Ruby on Rails API backend and a Javascript React frontend, Meme Space allows you to select an image and add text above and/or below it to add the memes page; don't forget to add some hashtags (without needing to put # in front of the word(s). By adding hashtags you can filter the memes that match your query! Add the memes to your favorites, or remove them! Just have fun!!!

Ruby on Rails API back end repo available here: https://github.com/Ms-Alex/meme-generator-backend

<p align="center">
  <img src="https://media.giphy.com/media/NlqufY4YrJDQjGm9Iy/giphy.gif" alt="meme space still video">
</p>

## Installation

OS X & Linux:

front end: 
```sh
npm install
```

back end:
```sh
bundle install
```

## Usage example

Before entering Meme Space, you must "login" with a username:

<p align="center">
  <img src="https://media.giphy.com/media/2zowjB768FUGI6KH39/giphy.gif" alt="meme space demo 1">
</p>


View all memes, and add one to your favorites:

<p align="center">
  <img src="https://media.giphy.com/media/82ODfdM3LmZ2UuHI2D/giphy.gif" alt="meme space demo 2">
</p>


View your favorites. Remove a meme if you don't like it anymore:

<p align="center">
  <img src="https://media.giphy.com/media/ONIKUk8qnKjgfgXxp2/giphy.gif" alt="meme space demo 3">
</p>


Add a meme: 

<p align="center">
  <img src="https://media.giphy.com/media/1TDwJLAcH7yTP5yYUl/giphy.gif" alt="meme space demo 4">
</p>


View all your memes:

<p align="center">
  <img src="https://media.giphy.com/media/X9GIFMdzrqIJJea4bu/giphy.gif" alt="meme space demo 5">
</p>


## Development setup

front end:
```sh
npm start
```

back end:
```sh
rails db:create
rails db:migrate
rails s -p 4000
```

## Release History

* 0.1.0
    * The first proper release

## Meta

Alexandra Hernandez – ms.hernandeza1@gmail.com

[https://github.com/Ms-Alex/github-link]

## Contributing

1. Fork it (<https://github.com/Ms-Alex/meme-generator-frontend/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request