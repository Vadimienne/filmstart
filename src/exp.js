/*handleInput(event) {
  let url = "https://www.metaweather.com/api/location/search/?query=";
  let value = event.target.value;
  let query = url + value;

  let myHeaders = new Headers();
  fetch(query, { method: 'GET',
             headers: myHeaders,
             mode: 'cors',
             cache: 'default' })
    .then(async (response) => {
      let resp = await response.text();
      resp = JSON.parse(resp);

      for (var i in resp) {
        console.log(i, resp[i].title);
      }

      if (response.status == 200) {
        let newList = resp.map((city) => <li>{city.title}</li>);
        this.setState({citiesList: newList});
        $(this.refs.searchField).autocomplete({source:newList});
      }
      else {
        alert("Error");
      }

    })
    .catch(() => {console.log(3)});

  /*var request = new XMLHttpRequest();
  request.open('GET', query, true);

  request.onload = function() {
    let resp = JSON.parse(request.responseText);
    for (var i in resp) {
      console.log(i, resp[i].title);
    }
    //console.log(resp.foreach);
    console.log(3);
  }

  request.send();*/
}*/


render() {
  return(
    <div className="main_module">
      <input className="searchField" ref="searchField" onChange={this.handleInput}></input>
      <ul>Suggestions: {this.state.citiesList}</ul>
      <button type="submit">Ok</button>
      <Link to="/long">WeatherLong</Link>
      <Link to="/detailed">WeatherDetailed</Link>
    </div>
  );
}



<YMap center={[this.state.lon, this.state.lat]} zoom={10}>
  <Marker lat={this.state.lat} lon={this.state.lon} />
</YMap>
