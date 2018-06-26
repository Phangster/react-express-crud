var React = require('react');

class Home extends React.Component {
  render() {
    const pokemonListofelements = this.props.pokeList.map((pokemon) => {
      return(
        <li>
          <p>Name: {pokemon.name}</p>
          <p>Id: {pokemon.id}</p>
          <p><img src={pokemon.img}/></p>
        </li>
        );
    });
    
      return (
            <html>
            <head>
              <title>Welcome To Pokedex!</title>
            <style></style>
            </head>
            <body>
              <form method='GET' action='/'>
                <input type="hidden" name="sortby" value="name"/>
                <div>
                  <label>Sort By Name</label>
                  <input type='Submit' value='Submit'/>
                </div>
              </form>
              <ul>{pokemonListofelements}</ul>
            </body>
            </html>
    );
  }
}

module.exports = Home;