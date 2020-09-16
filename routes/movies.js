const {Router} = require('express');
const router = Router();
const fs = require('fs');

const moviesFile = fs.readFileSync('./movies.json', 'utf-8')
let movies = JSON.parse(moviesFile)

router.get('/', (req, res)=>{
  res.json('API REST Movies!')
})

//Ver peliculas
router.get('/movies',(req, res)=>{
  res.json(movies)
})


//Agregar peliculas
router.post('/movies', (req, res)=>{
  console.log(req.body);
  
  const{title, director, year, duration, genre, poster}= req.body;

  //Validación
  if(!title || !director || !year || !duration || !genre || !poster){
    res.status(401).json({error: "Debe completar todos los datos"})
  }else{
    const id = movies.length + 1;
   

    let newMovie ={
      id,
      title,
      director,
      year,
      duration,
      genre,
      poster
    }
    movies.push(newMovie)
    const json_movies = JSON.stringify(movies);
    fs.writeFileSync('./movies.json', json_movies,'utf-8');
    res.status(200).json(movies)
  }
})

//Actualizar peliculas
router.put('/movie/:id', (req, res)=>{
  const {title, director, year, duration, genre, poster} = req.body;
  const id = req.params.id

  if(!title || !director || !year || !duration || !genre || !poster || !id){
    res.status(401).json({error: "Debe completar todos los datos y/o especificar el id"})
  }else{
    movies.filter((movie)=>{
      //compamos el id del objeto con el id del parámetro
      if(movie.id == id){
        //Actualizar el objeto
        movie.title = title;
        movie.director = director;
        movie.year = year;
        movie.duration = duration;
        movie.genre = genre;
        movie.poster = poster;
      }
    })

    const json_movies = JSON.stringify(movies);
    fs.writeFileSync('./movies.json', json_movies, 'utf-8');
    res.status(200).json(movies);
  };

});

router.delete('/movie/:id', (req, res)=>{
  const id = req.params.id;

  if(!id){
    res.status(401).json({
      error: "debe especificar el id del elemento a eliminar"
    });
  }else{
    const indexMovie = movies.findIndex(
      (movie) => movie.id ===id);
      movies.splice(indexMovie, 1);

      const json_movies = JSON.stringify(movies);
      fs.writeFileSync('./movies.json', json_movies, 'utf-8');
      
      res.status(200).json(movies)

  }
})

module.exports = router;