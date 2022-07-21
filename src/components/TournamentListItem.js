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
            onClick={() =>
              props.onTournamentSelected(
                props.id,
                props.venueAddress,
                props.name,
                props.thumbnailURL
              )
            }
          >
            <div className={styles.itemIndexAndName}>
              <h3 className={styles.itemIndex}>{props.id + 1}.</h3>
              <h3 className={styles.tournamentName}>{props.name}</h3>
            </div>

            <div className={styles.tournamentInfoContainer}>
              <span className={styles.tournamentDistance}>{props.distance}mi</span>
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
                  <p>
                    <span>{props.startTime[0]}</span>
                    <span>{props.startTime[1]}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.smashGG}>
              <Button variant="danger" href={props.tournament.url}>
                Start.gg
              </Button>
              <p className={styles.registration}>
                Registration{" "}
                <span style={{ color: props.tournament.isRegistrationOpen ? "lightgreen": "red"}}>
                  {props.tournament.isRegistrationOpen ? "Open" : "Closed"}
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
