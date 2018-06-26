var React = require('react');

class Home extends React.Component {
  render() {
      var url = "/pokemon/" + this.props.pokemon.id + "/edit";

      return(
          <html>

          <head>
            <title>Welcome To Pokedex!</title>
          </head>

          <style>
            
          </style>


          <body>
            <form method="POST" action={url}> 
            <input type="hidden" name="_method" value="PUT"/>
              <ul>                
                <li>
                  <input type="text" name="id" value={this.props.pokemon.id} placeholder="id"/>
                </li>
                <li>
                  <input type="text" name="num" value={this.props.pokemon.num} placeholder="num"/>
                </li>
                <li>
                  <input type="text" name="name" value={this.props.pokemon.name} placeholder="name"/>
                </li>
                <li>
                  <input type="text" name="img" value={this.props.pokemon.img} placeholder="img"/>
                </li>
                <li>
                  <input type="text" name="height" value={this.props.pokemon.height} placeholder="height"/>
                </li>
                <li>
                  <input type="text" name="weight" value={this.props.pokemon.weight} placeholder="weight"/>
                </li>
                <li>
                  <input type="submit" value="Create"/>
                </li>
              </ul>       
            </form>
          </body>
          
          </html>
    );
  }
}

module.exports = Home;