import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import Map from './Map';
import SmashggResults from './SmashggResults';
import ClientOnly from './ClientOnly';

class SearchControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: {},
      // queryPerPage: 10, //allow selectable option for more results (15,20)
      // queryLocation: null, // user input
      queryCoordinates: "", // user input
      queryRadius: "10mi", // 10 mi, 15 mi, 20 mi, 25 mi, 30 mi
      queryVideogames: [ 1, 1386, 33602,/* 24, 33945, 33990, 17, 3200, 287, 32*/], //selectable games
      queryAfterDate: Date.now(),
      queryBeforeDate: null,
      initialSearch: false
      }
    };

  handleSearch = (queryVariables) => {
    // const {/* newPerPage, newLocation*/ newCoordinates, newRadius, newVideogames, newAfterDate, newBeforeDate} = queryVariables;
    this.setState({
      /*queryPerPage: newPerPage,
      queryLocation: newLocation,*/
      queryCoordinates: queryVariables.newCoordinates,
      queryRadius: queryVariables.newRadius, 
      queryVideogames: queryVariables.newVideogames,
      queryAfterDate: queryVariables.newAfterDate,
      queryBeforeDate: queryVariables.newBeforeDate,
      // initialSearch: true
    });
  }

  //Geolocation - asking for user's current location and inputting it to search bar
  componentDidMount() {
    const success = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);
      this.setState({
        queryCoordinates:`${position.coords.latitude}, ${position.coords.longitude}`
      });
      console.log(JSON.stringify(this.state));
    };
    
    if (navigator.geolocation) {
      console.log('GeoLocation is Available!');
      navigator.geolocation.getCurrentPosition(success,
      // navigator.geolocation.getCurrentPosition(function(position) {
      //   console.log("Latitude is :", position.coords.latitude);
      //   console.log("Longitude is :", position.coords.longitude);
        // return `${position.coords.latitude}, ${position.coords.longitude}`;
        // const latitude = position.coords.latitude;
        // const longitude = position.coords.longitude;
        // useCurrentLocation(position.coords.latitude,position.coords.longitude);
        // this.setState({coordinates:`${position.coords.latitude}, ${position.coords.longitude}`})
      // },
      () => console.log(`Geolocation permission has been blocked. If you'd like to use your current location, please click 'Use Current Location'`));
      // console.log(test());
      // this.setState({ queryCoordinates: ``});
    } else {
    console.log(`Geolocation not available`);
  }
}
  //updates coordinate state with current location coordinates
  // useCurrentLocation(latitude, longitude){
  //   this.setState({ queryCoordinates: `${latitude}, ${longitude}`});
  // }

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

    return (
      <>
        <Searchbar 
          onSearch={this.handleSearch}
          variables={queryVariables}
        />
        <ClientOnly /*display={this.state.initialSearch ? 'flex': 'none'}*/>
          <SmashggResults 
          variables={queryVariables}
          />
        </ClientOnly>
        {/* <Map /> */}
      </>
    )
  }
}

export default SearchControl;