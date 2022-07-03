import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import Head from 'next/head';
import getConfig from 'next/config';
import {useQuery,useLazyQuery} from "@apollo/client";
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


// { variables: { 
//             coordinates: '33.899297, -117.967907',
//             radius:'50mi',
//             videogames:[1, 1386, 33602],
//             afterDate: Math.floor(Date.now()/1000)
//             } }


function Home(){
  // const [geolocationAddress,setGeoLocationAddress] = useState('');
  // const [searchAddress,setSearchAddress] = useState('');
  // const [queryCoordinates,setQueryCoordinates] = useState([,]);
  // const [queryRadius,setQueryRadius] = useState('');
  // const [queryVideogames,setQueryVideogames] = useState([1,1386,33602]);
  // const [queryAfterDate,setQueryAfterDate] = useState(Math.floor(Date.now()/1000));
  const [hasSearched,setHasSearched] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  // const [searchVariables, setSearchVariables] = useState({});
  // console.log(`~~~~~~~~~~searchVariables ${JSON.stringify(searchVariables)} `);
  const [searchCoordinates, setSearchCoordinates] = useState(null);
  const [selectedTournamentID, setSelectedTournamentID] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState({});
  const [getTournaments, {data, loading, error}] = useLazyQuery(QUERY, {
    ssr:false
    // , variables: { 
    //         coordinates: '33.899297, -117.967907',
    //         radius:'50mi',
    //         videogames:[1, 1386, 33602],
    //         afterDate: Math.floor(Date.now()/1000)
    //         }
  });
  
  // const {data, loading, error} = Object.keys(searchVariables).length>0 ? useQuery(QUERY, {variables: searchVariables}) : {undefined,undefined,undefined}; 
  // const {data, loading, error} = Object.keys(searchVariables).length>0? useQuery(QUERY, {variables: searchVariables}) : {undefined,undefined,undefined}; 
  // const {data, loading, error} = useQuery(QUERY, {variables: searchVariables});

  // console.log(`data: ${JSON.stringify(data)}~~~~~~~loading: ${loading}~~~~~~~~~~~error: ${error}`);

  
    // console.log(`selectedTournamentID = ${selectedTournamentID}`);

    //Geolocation - asking for user's current location and inputting it to search bar
  //   function componentDidMount() {
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
    if(errorMessage){
      setErrorMessage(null);
    }

    if(!hasSearched){
      setHasSearched(true);
    }

    if(Object.keys(selectedTournament).length > 0){
      setSelectedTournament({})
    }

    setSearchCoordinates(queryVariables.searchCoordinates);
    // setSearchVariables({...searchVariables,
    //   coordinates: queryVariables.searchCoordinates && `${queryVariables.searchCoordinates[0]}, ${queryVariables.searchCoordinates[1]}`,
    //   radius: queryVariables.searchRadius, 
    //   videogames: queryVariables.searchVideogames,
    //   afterDate: queryVariables.searchAfterDate
    //   });
    // getTournaments();
    getTournaments({variables:{
      coordinates: `${queryVariables.searchCoordinates[0]}, ${queryVariables.searchCoordinates[1]}`,
      radius: queryVariables.searchRadius, 
      videogames: queryVariables.searchVideogames,
      afterDate: queryVariables.searchAfterDate
    }});
    // getTournaments({variables: { 
    //         coordinates: '33.899297, -117.967907',
    //         radius:'50mi',
    //         videogames:[1, 1386, 33602],
    //         afterDate: Math.floor(Date.now()/1000)
    //         }});

      // console.log(`data: ${JSON.stringify(data)}~~~~~~~loading: ${loading}~~~~~~~~~~~error: ${error}`);
  }


    // const handleSearchSubmit = (queryVariables) => {
    //   console.log(`~~~~~queryVariables ${JSON.stringify(queryVariables)} `);
    //   if(!hasSearched){
    //     setHasSearched(true);
    //   }
    //   if(queryVariables.error){
    //     setErrorMessage(error);
    //     setSearchVariables({});
    //   }
    //   else{
    //     setSearchVariables({...searchVariables,
    //                     coordinates: queryVariables.searchCoordinates && `${queryVariables.searchCoordinates[0]}, ${queryVariables.searchCoordinates[1]}`,
    //                     radius: queryVariables.searchRadius, 
    //                     videogames: queryVariables.searchVideogames,
    //                     afterDate: queryVariables.searchAfterDate
    //     });
    //   }
    //   console.log(`variables::::: ${JSON.stringify(searchVariables)}`
    // }

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

    const handleSearchError = (searchError) => {
      setErrorMessage(`${searchError}.`);
      if(!hasSearched){
        setHasSearched(true);
      }
    }

    const handleTournamentSelected = (tournamentId,tournamentAddress,tournamentName,tournamentThumbnail) => {
      console.log('tournamentID: ' + tournamentId);
      console.log('tournamentaddress: ' + tournamentAddress);
      if(tournamentId===selectedTournamentID){
        setSelectedTournamentID(null);
        setSelectedTournament({});
      }
      else{
        setSelectedTournamentID(tournamentId);
        Geocode.fromAddress(tournamentAddress).then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setSelectedTournament({
            tournamentName: tournamentName,
            tournamentAddress: tournamentAddress,
            selectedCoordinates: [lat,lng],
            thumbnailURL: tournamentThumbnail
            });
          // setSelectedTournamentCoords([lat,lng]);
        })
      }
    }

    
    // if (loading) return <p>Loading ...</p>;
    
    // else if (error || errorMessage){
    //   console.log(`${error? error: errorMessage}`);
    // }
    
    // else if (data) return <p>{JSON.stringify(data)}</p>

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
      <React.Fragment> 
        <Head>
          <title>My Local Locals (beta)</title>
        </Head>

        <main>
      
          <div className="container col">
            <h1 className="title">My Local Locals <span>(beta)</span></h1>

            <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}> 
              <div className='searchContainer'
                style={{ margin:(hasSearched ? '0 0 1rem 0': 'auto')}}> 
                <Searchbar 
                  onSearchSubmit={handleSearchSubmit}
                  onSearchError={handleSearchError}
                  // hasSearched={hasSearched}
                  // getTournaments={getTournaments}
                  // onSearchChange={this.handleSearchChange}
                  // variables={queryVariables}
                  // searchAddress={this.state.searchAddress}
                  // geolocationAddress={this.state.geolocationAddress}
                />
              </div>
              { 
              hasSearched ? (() => { 
                if(loading){
                  return <h2 className="loadingMessage">Loading Data...</h2>;
                }
                else if(error || errorMessage || (data && data.tournaments.nodes && data.tournaments.nodes.length === 0 )){
                    return (
                      <div className="errorMessageWrapper">
                        <p>{(data && data.tournaments && data.tournaments.nodes && data.tournaments.nodes.length === 0) ? "No Tournaments found." : "An error has occurred."} Please try again.</p>
                      </div>);
                    }
                else if(data && data.tournaments && data.tournaments.nodes && data.tournaments.nodes.length > 0){
                  return(
                    <div className='resultsContainer' style={{display: (hasSearched ? 'flex': 'none')}}>
                          <TournamentList
                            tournaments={data.tournaments.nodes} 
                            convertTime={convertTime} 
                            onTournamentSelected={handleTournamentSelected}
                            selectedTournamentID={selectedTournamentID} 
                            />

                          <Map 
                            searchedCoordinates={searchCoordinates}
                            selectedTournament={selectedTournament}
                          />
                      </div>
                    )
                  }
                        {/* <p>{() => {
                          if(errorMessage){ return errorMessage; }
                          else if(data && data.tournaments && data.tournaments.nodes && data.tournaments.length === 0){
                            return "No Tournaments found. Please try again.";
                          }
                          else{ 
                            console.log(error); 
                            return "An error has occured. Please try again."};
                        }} 
                        </p>*/}
                })() : <React.Fragment/>}

              {/* 
              <div className='contentContainer' style={{display:this.state.hasSearched ? 'flex': 'none'}}>
                <div className='resultsContainer'>
                  {result}
                </div>
                {map}
              </div>*/}
            </LoadScript> 
            </div>
        </main>
      </React.Fragment>
    )
  }
// }

export default Home;
