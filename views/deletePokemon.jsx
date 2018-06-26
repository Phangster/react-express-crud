var React = require('react');
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {
    // var pokemonChosen = this.props.pokemonToDelete.map((pokemonId)=>{
    //   return(
    //     //object to delete
    //     )
    // })
    return(
      <html>
        <head>
          <title>Welcome To Pokedex!</title>
          <style></style>
        </head>
        <body>
          <form method='POST' action='/pokemon/delete'>
            <input type="integer" name="id"/>
            <input type="hidden" name="_method" value="DELETE"/>
            <div>
              <label>Delete Pokemon</label>
              <input type='Submit' value='Submit'/>
            </div>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Home;