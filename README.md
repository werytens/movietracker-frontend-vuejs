# Movietracker Frontend VueJS

## Project setup
```
npm i
```

### Сreate a config.js file in the src folder
```
// Add keys
const config = {
    API_IMDB_LINK: "https://www.omdbapi.com/?i=",
    API_IMDB_KEY: "",

    API_KINOPOISK_LINK: "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=",
    API_KINOPOISKID_LINK: "https://kinopoiskapiunofficial.tech/api/v2.2/films/",
    API_KINOPOISK_KEY: ""        
}

export default config;
```

## Project start
```
npm run serve
```