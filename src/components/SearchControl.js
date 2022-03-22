import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import Map from './Map';
import SmashggResults from './SmashggResults';
import ClientOnly from './ClientOnly';
import TournamentList from './TournamentList';
import getConfig from 'next/config';
import Geocode from 'react-geocode';
import Header from './Header';
import { LoadScript } from '@react-google-maps/api';

const { publicRuntimeConfig } = getConfig();
const API_KEY = publicRuntimeConfig.GoogleMapsAPIKey;
const libraries= ["places"];
Geocode.setApiKey(API_KEY);
class SearchControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: {},
      // queryPerPage: 10, //allow selectable option for more results (15,20)
      // queryLocation: null, // user input
      geolocationAddress:"",
      searchAddress:"",
      queryCoordinates: [0,0], // user input
      queryRadius: "50mi", // 10 mi, 15 mi, 20 mi, 25 mi, 30 mi
      queryVideogames: [ 1, 1386, 33602,/* 24, 33945, 33990, 17, 3200, 287, 32*/], //selectable games
      queryAfterDate: Math.floor(Date.now()/1000),
      hasSearched: false,
      currentPage: 0,
      error: false,
      selectedTournamentID: null,
      selectedTournamentCoordinates: null
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
      selectedTournamentID: null,
      selectedTournamentCoordinates: null,
      hasSearched: true
    });
  }

  handleSearchChange = newAddress => {
    this.setState({searchAddress:newAddress.newAddress});
  };

  handleSelectedTournament = (tournamentId,address) => {
    console.log(tournamentId);
    if(tournamentId===this.state.selectedTournamentID){
      this.setState({selectedTournamentID:null})
      this.setState({selectedTournamentCoordinates:null})
    }
    else{
      this.setState({selectedTournamentID:tournamentId});
      Geocode.fromAddress(address).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({selectedTournamentCoordinates: [lat,lng] });
      })
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
      coordinates: `${this.state.queryCoordinates[0]}, ${this.state.queryCoordinates[1]}`, 
      radius: this.state.queryRadius, 
      videogames: this.state.queryVideogames,
      afterDate: this.state.queryAfterDate,
    };


  
    // console.log(`render queryvariables: ${JSON.stringify(this.state)}`);

    let result = null;

    if(this.state.hasSearched){
      result = <SmashggResults 
            variables={queryVariables}
            onTournamentSelected={this.handleSelectedTournament}
            selectedTournamentID={this.state.selectedTournamentID}
            currentPage={this.state.currentPage}
            />
    }
    else{
      result = <p>Enter your location in the search bar above!</p>
    }

    return (
      <React.Fragment>
        <Header/>
        <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
          <div className='searchContainer' style={{ margin:this.state.hasSearched ? '0 0 1.5rem 0': 'auto'}}>
            <Searchbar 
              onSearchSubmit={this.handleSearchSubmit}
              onSearchChange={this.handleSearchChange}
              variables={queryVariables}
              searchAddress={this.state.searchAddress}
              geolocationAddress={this.state.geolocationAddress}
            />
          </div>
          <div className='contentContainer' style={{
            display:this.state.hasSearched ? 'flex': 'none'}}>
            <ClientOnly className='resultsContainer'>
              {result}
            </ClientOnly>
            <Map 
              searchedCoordinates={this.state.queryCoordinates}
              tournamentCoordinates={this.state.selectedTournamentCoordinates}
              />
          </div>
        {/* <div className='contentContainer'>
          <SmashggResults 
            variables={queryVariables}
            onTournamentSelected={this.handleSelectedTournament}
            selectedTournamentID={this.state.selectedTournamentID}/>
          <Map />
        </div> */}
        </LoadScript>
      </React.Fragment>
    )
  }
}

export default SearchControl;