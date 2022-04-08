# 🍿 Online Movie Database
Online Movie Database is the place to keep you up to date with movies. It showcases movies that are popular at the moment and shows movies that are soon to be seen in cinemas.

<img width="1440" alt="Schermafbeelding 2022-04-07 om 21 54 24" src="https://user-images.githubusercontent.com/66092262/162285388-187a52d2-c424-40a3-855f-963ed16edd3a.png">

[Live demo here](https://onlinemoviedata.herokuapp.com/)

## 📔 Table of contents
* [Install]()
* [Features]()
* [Activity Diagram]()
* [API Documentation]()
* [License]()

## ⚙️ Install
### clone on your device
``` bash
$ git clone https://github.com/jody29/Online_Movie_Database.git
```
### open the folder
```bash
$ cd Online_Movie_Database
```

### install dependencies
```bash
$ npm install
```

### start appliction
```bash
$ npm start
```

Application will run on PORT 8000. See the application on http://localhost:8000

## 📋 Features
| To do                        | Done? |
| :--------------------------- | :---- |
| showcase movies              | ✅    |
| filter on year               | ✅    |
| show details of movie        | ✅    |
| show similar movies          | ✅    |
| application is installable   | ✅    |
| application can be used offline | ✅    |


<!-- ...you should implement an explanation of client- server rendering choices 🍽 -->

## 📈 Activity Diagram
### Server side
![activity_diagram_Tekengebied 1](https://user-images.githubusercontent.com/66092262/162439124-e50cef9f-0370-4aa2-85cf-3698b7e54084.png)
### Service worker
![activitydiagram_sw](https://user-images.githubusercontent.com/66092262/162444883-80566d61-e420-47ef-a6cd-e20dd0d6cfa4.png)

## 🔧 Optimizations
### Caching headers set  
```js
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60)
    next()
})
```
### Made images smaller
#### before
`<img src="https://image.tmdb.org/t/p/w500/<%= movie.poster_path %>" alt="Movie poster of <%= movie.original_title %>">`
#### after
`<img src="https://image.tmdb.org/t/p/w200/<%= movie.poster_path %>" alt="Movie poster of <%= movie.original_title %>">`


## 📥 API Documentation
For this project I used The Movie Database APIE. The documentation for this API can be found here:
[Documenation](https://developers.themoviedb.org/3/getting-started/introduction)

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

## License
MIT
