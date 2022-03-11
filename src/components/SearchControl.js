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
      queryPerPage: 10, //allow selectable option for more results (15,20)
      queryCoordinates: "39.787234, -101.316479", // user input
      queryRadius: "50mi", // 10 mi, 15 mi, 20 mi, 25 mi, 30 mi
      queryVideogames: [1 /*, 1386, 33602, 24, 33945, 33990, 17, 3200, 287, 32*/] //selectable games
      }
    };

  handleSearch = (queryVariables) => {
    // setState(["No tournaments"]);
    const {newPerPage, newCoordinates, newRadius, newVideogames} = queryVariables;
    this.setState({
      queryPerPage: newPerPage,
      queryCoordinates: newCoordinates, 
      queryRadius: newRadius, 
      queryVideogames: newVideogames
    });
  }

  render(){
    let queryVariables = {
      perPage: this.state.queryPerPage, 
      coordinates: this.state.queryCoordinates, 
      radius: this.state.queryRadius, 
      videogames: this.state.queryVideogames
    };

    return (
      <>
        <Searchbar 
          onSearch={this.handleSearch}
        />
        <ClientOnly>
          <SmashggResults 
          variables={queryVariables}/>
        </ClientOnly>
        <Map />
      </>
    )
  }
}

export default SearchControl;