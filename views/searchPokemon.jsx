var React = require('react');
var DefaultLayout = require('./layouts/default');

class Home extends React.Component {
  render() {
    var poke = this.props.pokemon;
    return (
      <html>

        <head>
          <title>Welcome To Pokedex!</title>
          <style></style>
        </head>

        <body>
          <ul>
            <li>
              <p>name: {poke.name}</p>
              <p>id: {poke.id}</p>
              <p><img src={poke.img}/></p>
            </li>          
          </ul>  
        </body>

      </html>
    );
  }
}

module.exports = Home;