"use strict";
exports.id = 917;
exports.ids = [917];
exports.modules = {

/***/ 917:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ getApolloClient),
/* harmony export */   "Q": () => (/* binding */ QUERY)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);

const isServer = true;
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState;
let CLIENT;
function getApolloClient(forceNew) {
  if (!CLIENT || forceNew) {
    CLIENT = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloClient({
      ssrMode: isServer,
      uri: "https://api.smash.gg/gql/alpha",
      cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.InMemoryCache().restore(windowApolloState || {}),
      headers: {
        authorization: "Bearer " + "79782256c6e2326f7fe9c77191e68af0"
      }
    });
  }

  return CLIENT;
}
const QUERY = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
query TournamentsByCoordinatesAndGame($coordinates: String!, $radius: String!, $videogames: [ID]!,  $afterDate: Timestamp) {
    tournaments(query: {
      perPage: 500
      sortBy: "startAt asc"
      filter: {
        location: {
          distanceFrom: $coordinates
          distance: $radius
        }
        afterDate: $afterDate
        videogameIds: $videogames
        hasOnlineEvents: false
      }
    }) {
nodes {
        id
        name
        addrState
        venueAddress
        venueName
        city
        countryCode
        startAt
        timezone
        isRegistrationOpen
        url(relative: false)
        streams{
          enabled
          id
          streamId
          streamSource
        }
        images{
          height
          width
          ratio
          url
        }
        events(filter: { videogameId: $videogames }){
          id   
          name       
          startAt
          state
          numEntrants
          entrantSizeMax
          type
          slug
          videogame{
            id
            name
            images{
              id
              url
              height
              width
              ratio
            }
          }
        }
      }
    }
  }
`;

/***/ })

};
;