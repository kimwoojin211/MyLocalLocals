import React from "react";
import styles from "../styles/tournamentListItem.module.css";
import Button from "react-bootstrap/Button";
import TournamentEvents from "./TournamentEvents";
import ListGroup from "react-bootstrap/ListGroup";

function TournamentListItem(props) {
  const streetEndIndex = props.venueAddress.indexOf(", ");
  const cityAndStateEndIndex = props.venueAddress.indexOf(props.addrState);
  return (
    <ListGroup.Item className={styles.listItemContainer}>
      <div className={styles.listBackground} style={{ backgroundImage: `url(${props.bannerURL})` }}>
        <div className={styles.overlay}>
          <div
            className={styles.tournamentContainer}
            onClick={(event) =>
              (event.target.localName !== "a" &&
              props.onTournamentSelected(
                props.id,
                props.name,
                props.venueAddress,
                props.lat,
                props.lng,
                props.distance,
                props.thumbnailURL
              ))
            }
          >
            <div className={styles.itemIndexAndName}>
              <h3 className={styles.itemIndex}>{props.id + 1}.</h3>
              <h3 className={styles.tournamentName}>{props.name}</h3>
            </div>

            <div className={styles.tournamentInfoContainer}>
              <span 
              className={styles.tournamentDistance} 
              style={{ color: props.distance<=10 ? 'lightgreen': (props.distance<=50 ? 'yellow' : 'orange')}}>{props.distance}mi</span>
              <div className={styles.tournamentDetailsContainer}>
                <div className={styles.tournamentDetails}>
                  <p>Address: </p>
                  <p>
                    <span>{props.venueAddress.slice(0, streetEndIndex)},</span>
                    <span>
                      {props.venueAddress.slice(streetEndIndex + 2,cityAndStateEndIndex + 2)}
                    </span>
                  </p>
                </div>
                <div className={styles.tournamentDetails}>
                  <p>Starts at:</p>
                  <p className={props.startTime*1000 < Date.now() ? styles.startTime__active:styles.startTime}>
                    <span>{props.convertTime(props.startTime*1000)[0]}</span>
                    <span>{props.convertTime(props.startTime*1000)[1]}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.startGG}>
              <Button variant="danger" href={props.tournament.url} target="_blank" rel="noreferrer noopener">
                Start.gg
              </Button>
              <p className={styles.registration}>
                {props.startTime*1000 < Date.now() ? "Tournament":"Registration"}{" "}
                <span style={{ color: props.startTime*1000 < Date.now() ? "yellow" : (props.tournament.isRegistrationOpen ? "lightgreen": "red")}}>
                  {props.startTime*1000 < Date.now() ? "Started" : (props.tournament.isRegistrationOpen ? "Open" : "Closed")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.eventListWrapper}
        style={{
          display: props.selectedTournamentID === props.id ? "flex" : "none",
        }}
      >
        {props.tournamentEvents.map((tournamentEvent, index) => (
          <TournamentEvents
            name={tournamentEvent.name}
            startTime={props.convertTime(tournamentEvent.startAt * 1000)}
            numEntrants={tournamentEvent.numEntrants}
            gameImage={tournamentEvent.videogame.images[0].url}
            eventURL={tournamentEvent.slug}
          />
        ))}
      </div>
    </ListGroup.Item>
  );
}

export default TournamentListItem;
