import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="https://id.twitch.tv/oauth2/authorize?client_id=oi0awbi2gt2yki6iwz1u29uqorltat&redirect_uri=http://localhost:3000/&response_type=token&scope=user:read:email">Accedi con Twitch</a>
      </div>
    );
  }

  componentWillMount() {
    // CAPIRE PERCHè NON MI TROVA L'HASH PRE PRENDERE IL TOKEN E VEDERE SE PASSANDOLO POSSO FARE 800 RICHIESTE AL POSTO DELLE 30 CONCESSE SENZA TOKEN
    console.log(this.props);
    if(this.props.location)
    {
      console.log("this.props.location ",this.props.location);
      this.access_info = queryString.parse(this.props.location.hash);
      if(this.access_info.access_token !== undefined)
      {
        let auth = "Bearer " +  this.access_info.access_token;
        console.log(auth);
        this.test("",0,auth);
      }
    }
  }

  test(pagination, contatore, auth) {
    let url = "https://api.twitch.tv/helix/streams?first=100";
    url += (pagination) ? "&after=" + pagination : "";
    fetch(url, {
      headers: {
        'Client-ID': "upk8rrcojp2raiw9pd2edhi0bvhze5",
        'Authorization': auth
      }
    })
    .then(function(c) {
      return c.json();
    }).then((data) => {
        console.log(data);
        if(contatore < 50)
          this.test(data.pagination.cursor, contatore+1);
    }).catch((error) => {
      console.log(error);
    });
  }
}

export default App;
