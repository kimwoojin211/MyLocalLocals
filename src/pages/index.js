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

function Home() {
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchCoordinates, setSearchCoordinates] = useState(null);
  const [selectedTournamentID, setSelectedTournamentID] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState({});
  const [getTournaments, { data, loading, error }] = useLazyQuery(QUERY, {
    ssr: false,
  });

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
              style={{ margin: hasSearched ? "0 0 1rem 0" : "auto" }}
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
                        tournaments={data.tournaments.nodes}
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
