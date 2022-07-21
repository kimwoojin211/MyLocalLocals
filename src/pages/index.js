import React, { useState } from "react";
import Geocode from "react-geocode";
import Head from "next/head";
import getConfig from "next/config";
import { useLazyQuery } from "@apollo/client";
import { QUERY } from "../../data/Client";
import { LoadScript } from "@react-google-maps/api";
import Searchbar from "../components/Searchbar";
import Map from "../components/Map";
import TournamentList from "../components/TournamentList";

const { publicRuntimeConfig } = getConfig();
const API_KEY = publicRuntimeConfig.GoogleMapsAPIKey;
const libraries = ["places"];
Geocode.setApiKey(API_KEY);


function haversine_distance(mk1, mk2) {
      var R = 3958.8; // Radius of the Earth in miles
      var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
      var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
      var difflat = rlat2-rlat1; // Radian difference (latitudes)
      var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)

      var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
      return (Math.round(d*10).toFixed(1)/10);
    }

    


function Home() {
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchCoordinates, setSearchCoordinates] = useState(null);
  const [selectedTournamentID, setSelectedTournamentID] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState({});
  const [getTournaments, { data, loading, error }] = useLazyQuery(QUERY, {
    ssr: false,
  });

  const filteredDataWithDistance = () => {
  if(searchCoordinates && 
      data &&
      data.tournaments &&
      data.tournaments.nodes &&
      data.tournaments.nodes.length > 0){
        // const dataNoOnlineOrFinished = {...data, events: data.tournaments.nodes.filter(node => !((node.events.filter(ev => !ev.isOnline)).isEmpty()))}
        // const dataNoOnline = data.tournaments.nodes.map(tournamentNode => ({...tournamentNode, events: tournamentNode.events.filter(tournamentEvent => {!tournamentEvent.isOnline})}));
        // console.log("~!~~!#~!~!datanoonline" + dataNoOnline);

        const dataRemoveFinishedTournaments = data.tournaments.nodes.filter(tournamentNode => {tournamentNode.state !== "COMPLETED" && tournamentNode.state !== "INVALID"});

        const dataRemoveNoOffline = data.tournaments.nodes.filter(tournamentNode => tournamentNode.hasOfflineEvents);
        
        // const dataRemoveOnlineAndFinished = data.tournaments.nodes.filter(tournamentNode => {tournamentNode.state !== "COMPLETED" && tournamentNode.state !== "INVALID" && tournamentNode.hasOfflineEvents});
        
        //const datata = dataRemoveNoOffline.map(tournamentNode => (tournamentNode.events.map(tournamentEvent => tournamentEvent.state === "COMPLETED")))
        //**const datata = dataRemoveNoOffline.map(tournamentNode => (tournamentNode.events.map(tournamentEvent => tournamentEvent.state === "COMPLETED"))).map(tournament => (tournament.includes(false)));
        
        const eventsRemaining = dataRemoveNoOffline.map(tournamentNode => (tournamentNode.events.map(tournamentEvent => tournamentEvent.state === "COMPLETED"))).map(tournament => (tournament.includes(false)));
        
        
        // const datataSet = [...new Set(datata)];
        // // const datataSet2 = dataRemoveNoOffline.filter(tournamentNode => tournamentNode.events)

        // const datataSet2 = dataRemoveNoOffline.filter((tournamentNode,index) => datata[index]===true)
        // const datataFilter= datata.filter((item,index) => datata.indexOf(item)=== index);
        // //datata.includes(false).

        const dataRemoveTournamentsAllEventsCompleted =  dataRemoveNoOffline.filter((tournamentNode,index) => eventsRemaining[index]===true)

        const dataRemoveOnlineAndInvalidEvents = dataRemoveTournamentsAllEventsCompleted.map(tournamentNode => ({...tournamentNode, events: tournamentNode.events.filter(tournamentEvent => !tournamentEvent.isOnline && tournamentEvent.state !== "INVALID")}));

        const dataRemoveTournamentsNoEvents = dataRemoveOnlineAndInvalidEvents.filter(tournamentNode => tournamentNode.events.length>0);
        
        const dataWithDistance = dataRemoveTournamentsNoEvents.map(tournamentNode => (
                                    {...tournamentNode, 
                                      distance: haversine_distance(
                                        {lat:tournamentNode.lat,lng:tournamentNode.lng},
                                        {lat:searchCoordinates[0],lng:searchCoordinates[1]})
                                    }));

        console.log('~!~~!#~!~!datadistance ' + dataWithDistance);

        return dataWithDistance;
  }
}
  filteredDataWithDistance();

  const handleSearchSubmit = (queryVariables) => {
    if (errorMessage) {
      setErrorMessage(null);
    }
    if (!hasSearched) {
      setHasSearched(true);
    }
    if (Object.keys(selectedTournament).length > 0) {
      setSelectedTournament({});
    }
    setSearchCoordinates(queryVariables.searchCoordinates);
    getTournaments({
      variables: {
        coordinates: `${queryVariables.searchCoordinates[0]}, ${queryVariables.searchCoordinates[1]}`,
        radius: queryVariables.searchRadius,
        videogames: queryVariables.searchVideogames,
        afterDate: queryVariables.searchAfterDate,
        beforeDate: queryVariables.searchBeforeDate
      },
    });
  };

  const handleSearchError = (searchError) => {
    setErrorMessage(`${searchError}.`);
    if (!hasSearched) {
      setHasSearched(true);
    }
  };

  const handleTournamentSelected = (
    tournamentId,
    tournamentAddress,
    tournamentName,
    tournamentThumbnail
  ) => {
    if (tournamentId === selectedTournamentID) {
      setSelectedTournamentID(null);
      setSelectedTournament({});
    } else {
      setSelectedTournamentID(tournamentId);
      Geocode.fromAddress(tournamentAddress).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setSelectedTournament({
          tournamentName: tournamentName,
          tournamentAddress: tournamentAddress,
          selectedCoordinates: [lat, lng],
          thumbnailURL: tournamentThumbnail,
        });
      });
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>My Local Locals (beta)</title>
      </Head>

      <main>
        <div className="pageContainer col">
          <h1 className="title">
            My Local Locals <span>(beta)</span>
          </h1>

          <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
            <div
              className="searchContainer"
              style={{ margin: hasSearched ? "0 0 0.5rem 0" : "auto" }}
            >
              <Searchbar
                onSearchSubmit={handleSearchSubmit}
                onSearchError={handleSearchError}
              />
            </div>
            {hasSearched ? (
              (() => {
                if (loading) {
                  return <h2 className="loadingMessage">Loading Data...</h2>;
                } else if (
                  error ||
                  errorMessage ||
                  (data &&
                    data.tournaments &&
                    data.tournaments.nodes &&
                    data.tournaments.nodes.length === 0)
                ) {
                  return (
                    <div className="errorMessageWrapper">
                      <p>
                        {`${data &&
                        data.tournaments &&
                        data.tournaments.nodes &&
                        data.tournaments.nodes.length === 0
                          ? "No Tournaments found. "
                          : "An error has occurred. "} Please try again.`}
                      </p>
                    </div>
                  );
                } else if (
                  data &&
                  data.tournaments &&
                  data.tournaments.nodes &&
                  data.tournaments.nodes.length > 0
                ) {
                  return (
                    <div
                      className="resultsContainer"
                      style={{ display: hasSearched ? "flex" : "none" }}
                    >
                      <TournamentList
                        // tournaments={data.tournaments.nodes}
                        tournaments={filteredDataWithDistance()}
                        onTournamentSelected={handleTournamentSelected}
                        selectedTournamentID={selectedTournamentID}
                      />

                      <Map
                        searchedCoordinates={searchCoordinates}
                        selectedTournament={selectedTournament}
                      />
                    </div>
                  );
                }
              })()
            ) : (
              <React.Fragment />
            )}
          </LoadScript>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Home;
