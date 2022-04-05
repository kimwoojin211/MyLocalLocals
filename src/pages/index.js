import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import Head from 'next/head';
import getConfig from 'next/config';
import {useQuery} from "@apollo/client";
import {QUERY} from '../../data/Client';
import { LoadScript } from '@react-google-maps/api';
import Searchbar from '../components/Searchbar';
import Map from '../components/Map';
import SmashggResults from '../components/SmashggResults';
import Header from '../components/Header';
import TournamentList from '../components/TournamentList';

const { publicRuntimeConfig } = getConfig();
const API_KEY = publicRuntimeConfig.GoogleMapsAPIKey;
const libraries= ["places"];
Geocode.setApiKey(API_KEY);

function convertTime(timestamp){
  const time = new Date(timestamp);
  const splitTime = time.toTimeString().split(' ').slice(2).join();
  const regex = /[A-Z]/g;
  const timezone = splitTime.match(regex).join('');
  const localTime = time.toLocaleTimeString().split(':');
  const hoursMinutes = localTime.slice(0,2).join(':');
  const combinedTime = hoursMinutes + localTime[2].slice(2);
  return `${time.toDateString()} ${combinedTime} ${timezone}`;
}

function Home(){
      // constructor(props) {
      //   super(props);
      //   this.state = {
      //     geolocationAddress:"",
      //     searchAddress:"",
      //     queryCoordinates: [0,0],
      //     queryRadius: "50mi", 
      //     queryVideogames: [1, 1386, 33602] ,
      //     queryAfterDate: Math.floor(Date.now()/1000),
      //     hasSearched: false,
      //     error: false,
      //     selectedTournamentID: null,
      //     selectedTournamentCoordinates: null
      //     }
      // };
  // const [geolocationAddress,setGeoLocationAddress] = useState('');
  // const [searchAddress,setSearchAddress] = useState('');
  // const [queryCoordinates,setQueryCoordinates] = useState([,]);
  // const [queryRadius,setQueryRadius] = useState('');
  // const [queryVideogames,setQueryVideogames] = useState([1,1386,33602]);
  // const [queryAfterDate,setQueryAfterDate] = useState(Math.floor(Date.now()/1000));
  const [hasSearched,setHasSearched] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const [searchVariables, setSearchVariables] = useState({});

  const {data, loading, error} = useQuery(QUERY, {variables: searchVariables}); 
  console.log(`data: ${JSON.stringify(data)}~~~~~~~loading: ${loading}~~~~~~~~~~~error ${error}~~~~~~~~~~searchVariables ${JSON.stringify(searchVariables)} `)

  //   //Geolocation - asking for user's current location and inputting it to search bar
  //   componentDidMount() {
  //     const success = position => {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
  //       console.log(position, latitude, longitude);
  //       Geocode.fromLatLng(latitude, longitude).then((response) =>{
  //         const reverseGeocodeResults = response.results[0];
  //         console.log(`reverseGeocode raw: ${JSON.stringify(reverseGeocodeResults)}`);
  //         const address = response.results[0].formatted_address;
  //         console.log(address);
  //         this.setState({
  //           geolocationAddress: address,
  //           searchAddress: address
  //         })
  //         },
  //           (error) => {
  //           console.error(error);
  //           }
  //         );
  //       console.log(JSON.stringify(this.state));
  //     };
      
  //     if (navigator.geolocation) {
  //       console.log('GeoLocation is Available!');
  //       navigator.geolocation.getCurrentPosition(success,
  //       () => console.log(`Geolocation permission has been blocked. If you'd like to use your current location, please click 'Use Current Location'`));
  //     } else {
  //     console.log(`Geolocation not available`);
  //   }
  // }
    const handleSearchSubmit = (queryVariables) => {
      setHasSearched(true);
      if(queryVariables.searchError){
        setErrorMessage(queryVariables.errorMessage);
      }
      else{
        setSearchVariables({...searchVariables,
                        coordinates: queryVariables.searchCoordinates,
                        radius: queryVariables.searchRadius, 
                        videogames: queryVariables.searchVideogames,
                        afterDate: queryVariables.searchAfterDate
        });
        console.log(`variables::::: ${JSON.stringify(searchVariables)}`)
      }

    }
//     handleSearchSubmit = (queryVariables) => {
//       if(queryVariables.error){
//         this.setState({hasSearched:true,error: queryVariables.error})
//       }
//       else{
//         this.setState({
//           queryCoordinates: queryVariables.newCoordinates,
//           queryRadius: queryVariables.newRadius, 
//           queryVideogames: queryVariables.newVideogames,
//           queryAfterDate: queryVariables.newAfterDate,
//           selectedTournamentID: null,
//           selectedTournamentCoordinates: null,
//           hasSearched: true,
//           error: queryVariables.error
//         });
//       }
//     }

//     handleSearchChange = newAddress => {
//       this.setState({searchAddress:newAddress.newAddress});
//     };

//     handleSelectedTournament = (tournamentId,address) => {
//       console.log(tournamentId);
//       if(tournamentId===this.state.selectedTournamentID){
//         this.setState({selectedTournamentID:null})
//         this.setState({selectedTournamentCoordinates:null})
//       }
//       else{
//         this.setState({selectedTournamentID:tournamentId});
//         Geocode.fromAddress(address).then((response) => {
//           const { lat, lng } = response.results[0].geometry.location;
//           this.setState({selectedTournamentCoordinates: [lat,lng] });
//         })
//       }
//     }




  // render(){
    // let queryVariables = {
    //   coordinates: `${this.state.queryCoordinates[0]}, ${this.state.queryCoordinates[1]}`, 
    //   radius: this.state.queryRadius, 
    //   videogames: this.state.queryVideogames,
    //   afterDate: this.state.queryAfterDate,
    // };
    // let result = null;
    // let map = null;

    // if(this.state.error || this.state.queryVideogames.length===0){
    //   result = <div class='container-fluid'><p style={{margin:'auto'}}>Error. Please try again.</p></div>
    //   map = <div style={{display:'none'}}></div>
    // }
    // else if(this.state.hasSearched){
    //   result = <SmashggResults 
    //         variables={queryVariables}
    //         onTournamentSelected={this.handleSelectedTournament}
    //         selectedTournamentID={this.state.selectedTournamentID}
    //         currentPage={this.state.currentPage}
    //         />
    //   map = <Map 
    //           searchedCoordinates={this.state.queryCoordinates}
    //           tournamentCoordinates={this.state.selectedTournamentCoordinates}
    //           />
    // }
    // else{
    //   result = <p>Enter your location in the search bar above!</p>
    //   map = <div style={{display:'none'}}></div>
    // }

    return (
      <div className="pageContainer"> 
        <Head>
          <title>My Local Locals (beta)</title>
        </Head>

        <main>
          <h1 className="title">My Local Locals (beta)</h1>

          <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}> 
            {/* <div className='searchContainer'
              style={{ margin:(hasSearched ? '0 0 1.5rem 0': 'auto')}}>  */}
              <Searchbar 
                onSearchSubmit={handleSearchSubmit}
                hasSearched={hasSearched}
                // onSearchChange={this.handleSearchChange}
                // variables={queryVariables}
                // searchAddress={this.state.searchAddress}
                // geolocationAddress={this.state.geolocationAddress}
              />
            {/* </div> */}
            { hasSearched ? (() => { 
                if(error){
                  return <h2>No Tournaments found. Please try another location.</h2>;
                }
                else if(loading){
                  return <h2>Loading Data...</h2>;
                }
                else{
                  return( 
                    <div className='contentContainer' style={{display: (hasSearched ? 'flex': 'none')}}>
                        <TournamentList
                          tournaments={data.tournaments.nodes} 
                          convertTime={convertTime} 
                          // onTournamentSelected={onTournamentSelected}
                          // selectedTournamentID={selectedTournamentID} 
                          />
                        <Map 
                          searchedCoordinates={searchVariables.coordinates}
                          // tournamentCoordinates={selectedTournamentCoordinates}
                        />
                    </div>
                  )
                }
              })() : <p></p>}
            {/* 
            <div className='contentContainer' style={{display:this.state.hasSearched ? 'flex': 'none'}}>
              <div className='resultsContainer'>
                {result}
              </div>
              {map}
            </div>*/}
          </LoadScript> 
        </main>
      </div>
    )
  }
// }

export default Home;
