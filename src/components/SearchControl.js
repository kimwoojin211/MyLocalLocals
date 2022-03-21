import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import Map from './Map';
import SmashggResults from './SmashggResults';
import ClientOnly from './ClientOnly';
import TournamentList from './TournamentList';
import getConfig from 'next/config';
import Geocode from 'react-geocode';
import Header from './Header';

const { publicRuntimeConfig } = getConfig();
class SearchControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: {},
      // queryPerPage: 10, //allow selectable option for more results (15,20)
      // queryLocation: null, // user input
      geolocationAddress:"",
      searchAddress:"",
      queryCoordinates: "", // user input
      queryRadius: "50mi", // 10 mi, 15 mi, 20 mi, 25 mi, 30 mi
      queryVideogames: [ 1, 1386, 33602,/* 24, 33945, 33990, 17, 3200, 287, 32*/], //selectable games
      queryAfterDate: Math.floor(Date.now()/1000),
      queryBeforeDate: null,
      isSearching: false,
      currentPage: 1,
      error: false,
      selectedTournamentID: null
      }
    };

  handleSearchSubmit = (queryVariables) => {
    // const {/* newPerPage, newLocation*/ newCoordinates, newRadius, newVideogames, newAfterDate, newBeforeDate} = queryVariables;
    console.log(`${JSON.stringify(queryVariables)}`);
    this.setState({
      /*queryPerPage: newPerPage,
      queryLocation: newLocation,*/
      queryCoordinates: queryVariables.newCoordinates,
      queryRadius: queryVariables.newRadius, 
      queryVideogames: queryVariables.newVideogames,
      queryAfterDate: queryVariables.newAfterDate,
      // queryBeforeDate: queryVariables.newBeforeDate,
      isSearching: true
    });
  }

  handleSearchChange = newAddress => {
    this.setState({searchAddress:newAddress.newAddress});
  };

  handleSelectedTournament = (id) => {
    console.log(id);
    if(id===this.state.selectedTournamentID){
      this.setState({selectedTournamentID:null})
    }
    else{
      this.setState({selectedTournamentID:id});
    }
  }

  //Geolocation - asking for user's current location and inputting it to search bar
  componentDidMount() {
    const success = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(position, latitude, longitude);
      Geocode.fromLatLng(latitude, longitude).then((response) =>{
        const reverseGeocodeResults = response.results[0];
        console.log(`reverseGeocode raw: ${JSON.stringify(reverseGeocodeResults)}`);
        const address = response.results[0].formatted_address;
        console.log(address);
        this.setState({
          geolocationAddress: address,
          searchAddress: address
        })
        },
          (error) => {
          console.error(error);
          }
        );
      // this.setState({
        // queryCoordinates:`${position.coords.latitude}, ${position.coords.longitude}`
      // });
      console.log(JSON.stringify(this.state));
    };
    
    if (navigator.geolocation) {
      console.log('GeoLocation is Available!');
      navigator.geolocation.getCurrentPosition(success,
      () => console.log(`Geolocation permission has been blocked. If you'd like to use your current location, please click 'Use Current Location'`));
      // console.log(test());
      // this.setState({ queryCoordinates: ``});
    } else {
    console.log(`Geolocation not available`);
  }
}


  render(){
    let queryVariables = {
      // perPage: this.state.queryPerPage, 
      // location: this.state.queryLocation,
      coordinates: this.state.queryCoordinates, 
      radius: this.state.queryRadius, 
      videogames: this.state.queryVideogames,
      afterDate: this.state.queryAfterDate,
      beforeDate: this.state.queryBeforeDate
    };


  
    // console.log(`render queryvariables: ${JSON.stringify(this.state)}`);

    let result = null;

    if(this.state.isSearching){
      result = <SmashggResults variables={queryVariables}/>
    }
    else{
      result = <p>Enter your location in the search bar above!</p>
    }

    return (
      <div className='pageContainer'>
        <Header/>
        <Searchbar 
          onSearchSubmit={this.handleSearchSubmit}
          onSearchChange={this.handleSearchChange}
          variables={queryVariables}
          searchAddress={this.state.searchAddress}
        />
        {/* <ClientOnly>
          {result}
        </ClientOnly> */}
        <div className='contentContainer'>
          <SmashggResults 
            onTournamentSelected={this.handleSelectedTournament}
            selectedTournamentID={this.state.selectedTournamentID}/>
          <Map />
        </div>
      </div>
    )
  }
}

export default SearchControl;