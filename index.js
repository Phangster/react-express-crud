const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override');
var path = require('path');
const bodyparser = require('body-parser');
const targetUrl = 'http://localhost:3000'

const FILE = 'pokedex.json';

// Init express app
const app = express();

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets handlebars to be the default view engine
app.set('view engine', 'jsx');

// Middleware
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))


// HOME PAGE and SORT BY NAME
app.get('/', (req, res) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let context;
        if (req.query.sortby == "name") {
            let sortedPokemon = obj.pokemon.sort(function(a, b) {
                var nameA = a.name.toUpperCase();
                var nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            context = { "pokeList": sortedPokemon }
        } else {
            context = { "pokeList": obj.pokemon }
        }
        res.render('homePagePokemon', context);
    });
});


// Giving the user information
app.get('/pokemon/:id/edit', (req, res) => {
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log('Error');
        }
        let pokemon = obj.pokemon;
        var found = false;
        pokemon.forEach((poky) => {
            if (req.params.id === String(poky.id)) {
                found = true
            }
        })

        if( found ){
          let context = { pokemon: pokemon };
          res.render('editPokemon', context);
        }else{
            res.send('Not Found');
        }
    });
});

// User will send the information to change
// app.post('/pokemon/edit', (req, res) => {
//   jsonfile.readFile(FILE, (err, obj) => {
//     let pokemon = obj.pokemon;
//     let matchingPokemon;
//     obj.pokemon.forEach((poky)=>{
//       if(String(poky.id) === req.body.id){
//         matchingPokemon = poky;
//       }
//     });

//     if (matchingPokemon) {
//       console.log('matched');
//       let context = { pokemon : pokemon };
//       res.render('formForEditPokemon', context)
//       }
//   });
// });

// System updates the changes
app.put('/pokemon/:id/edit', (req, res) => {
  let chosenId = req.params.id
    jsonfile.readFile(FILE, (err, obj) => {
        let pokemon = obj.pokemon;
        pokemon.forEach((poky) => {
            if (chosenId === req.body.id) {
                let newPokemonAdded = {
                    "id": req.body['id'],
                    "num": req.body['num'],
                    "name": req.body['name'],
                    "img": req.body['img'],
                    "height": req.body['height'],
                    "weight": req.body['weight'],
                    "candy": "",
                    "candy_count": "",
                    "egg": "",
                    "avg_spawns": "",
                    "spawn_time": ""
                }
                pokemon.push(newPokemonAdded);
                jsonfile.writeFile(FILE, obj, (err) => {
                  res.redirect(targetUrl);
                })
            }
        })
    })
})

app.get('/pokemon/delete', (req, res) => {
    res.render('deletePokemon');
})

// System deletes the pokemon
app.delete('/pokemon/delete', (req, res) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokemon = obj.pokemon;
        pokemon.forEach((poky) => {
            if (req.body.id === pokemon.id) {
                pokemon.id.splice(poky, 1);
                res.redirect(targetUrl);
            }
        })
        jsonfile.writeFile(FILE, obj, (err) => {})
    })
})

//GET POKEMON BY ID 
app.get('/:id', (req, res) => {
    let inputId = req.params.id;
    jsonfile.readFile(FILE, (err, obj) => {
        let pokemon = obj.pokemon;
        pokemon.map((char) => {
            if (char.id === parseInt(inputId)) {
                let context = { pokemon: char };
                res.render('Identity-search', context);
            }
        });
    });
});

//CREATING A NEW POKEMON
app.get('/pokemon/new', (req, res) => {
    res.render('newPokemon');
});

//FORM FOR NEW POKEMON ADDED
app.post('/pokemon/new', (req, res) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokemon = obj.pokemon;
        let newPokemonAdded = {
            "id": req.body['id'],
            "num": req.body['num'],
            "name": req.body['name'],
            "img": req.body['img'],
            "height": req.body['height'],
            "weight": req.body['weight'],
            "candy": "",
            "candy_count": "",
            "egg": "",
            "avg_spawns": "",
            "spawn_time": ""
        }
        pokemon.push(newPokemonAdded);
        jsonfile.writeFile(FILE, obj, (err) => {})
        res.redirect('/');
    })
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));