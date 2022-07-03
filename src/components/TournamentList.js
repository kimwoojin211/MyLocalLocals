import React from "react";
import styles from "../styles/tournamentList.module.css";
import TournamentListItem from "./TournamentListItem";
import ListGroup from "react-bootstrap/ListGroup";

function convertTime(timestamp) {
  const time = new Date(timestamp);
  const splitTime = time.toTimeString().split(" ").slice(2).join();
  const regex = /[A-Z]/g;
  const timezone = splitTime.match(regex).join("");
  const localTime = time.toLocaleTimeString().split(":");
  const hoursMinutes = localTime.slice(0, 2).join(":");
  const combinedTime = hoursMinutes + localTime[2].slice(2);
  return [time.toDateString(), `${combinedTime} ${timezone}`];
}

function TournamentList(props) {
  const { tournaments, onTournamentSelected, selectedTournamentID } = props;
  return (
    <div className={styles.listContainer}>
      <p>Click on a tournament to view events</p>
      <ListGroup className={styles.listWrapper}>
        {tournaments.map((tournament, index) => (
          <TournamentListItem
            tournament={tournament}
            id={index}
            key={index}
            name={tournament.name}
            url={tournament.url}
            images={tournament.images}
            bannerURL={
              tournament.images.length === 0 ? "" : 
                (tournament.images.find((image) => image.ratio > 1) ? tournament.images.find((image) => image.ratio > 1).url
                : tournament.images[0].url)
            }
            thumbnailURL={
              tournament.images.length === 0 ? "" : 
                (tournament.images.find((image) => image.ratio === 1) ? tournament.images.find((image) => image.ratio === 1).url
                : tournament.images[0].url)
            }
            venueName={tournament.venueName}
            venueAddress={tournament.venueAddress}
            addrState={tournament.addrState}
            startTime={convertTime(tournament.startAt * 1000)}
            isRegistrationOpen={tournament.isRegistrationOpen}
            tournamentEvents={tournament.events}
            convertTime={convertTime}
            onTournamentSelected={onTournamentSelected}
            selectedTournamentID={selectedTournamentID}
          />
        ))}
      </ListGroup>
    </div>
  );
}

export default TournamentList;
