import React, { Component } from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom'


class Home extends Component {
  state = {
  }

  componentWillMount() {
    if(this.props.location)
    {
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
    // PROVARE A PASSARES OLO IL TOKEN, ANCHE SE PER ORA NON FUNZIONA
    fetch(url, {
      headers: {
        'Authorization': auth
      }
    })
    .then(function(c) {
      console.log(c);
      return c.json();
    }).then((data) => {
        console.log(data);
        if(contatore < 50)
          this.test(data.pagination.cursor, contatore+1);
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="Home">
        <a href="https://id.twitch.tv/oauth2/authorize?client_id=oi0awbi2gt2yki6iwz1u29uqorltat&redirect_uri=http://localhost:3000/&response_type=token&scope=user:read:email">Accedi con Twitch</a>
      </div>
    );
  }
}

export default withRouter(Home);
