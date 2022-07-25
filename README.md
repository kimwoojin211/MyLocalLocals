# _My Local Locals_

#### _A web application designed to help competitive platform fighting game players find tournaments local to their area, or whatever address they'd like to search_

#### By **Woo Jin Kim (@w00j__)**

## Technologies Used

* _Javascript_
* _React.js_
* _Next.js_
* _ApolloClient_
* _GraphQL_
* _SmashGG API_
* _Google Maps API_
* _react-dom_
* _react-geocode_
* _react-scripts_
* _react-datepicker_
* _google-map-react_
* _@react-google-maps/api_
* _bootstrap_
* _Server Side Rendering_


## Setup/Installation Requirements

* _TBA_

## Planned Updates

* _Refactor current code_
* ~~Add more responsive styling~~ _(& more styling in general)_
* _Reformat displayed tournament start times to account for user's local time zone_
* _Add more games to options_ **Multiversus, NASB, RoA added!**
* ~~Allow user to choose to view tournaments after a specified date~~
* _Add an option to view results as cards instead of a list_
* ~~Allow user to sort by date or by distance~~
* _Configure map to allow user to select a location by clicking on the map_
* ~~Add an infobox on map per user query or user selection~~
* _Add map to mobile view_
* _Add disclaimer(s) and "how to" directions_
* _Make formula for non-US addresses_
* _Format Error, Loading messages_

## Known Bugs/Issues

* ~~If user enters an invalid address after a successful query, program uses previous address instead of returning an error~~
* ~~Not optimally designed for mobile viewing~~
* ~~Basic styling, not consistent throughout components~~ Work in Progress
* _PropTypes not defined_
* _Tournaments may have ended, but are still displayed in list. This may be because the tournament hasn't properly finished and closed their system, causing start.gg to think it's still ongoing._
* _Clicking on a tournament won't always show both the searched address marker and the selected tournament marker within the map window._


## References

* Credits to [meleemajors.com](https://meleemajors.com) for being a big inspiration for this project when I thought "This is cool. I wonder if there's anything like this on the local level". And credits to [Kris "Toph" Aldenderfer](https://twitter.com/toph_bbq) for showcasing meleemajors in his content.

* Credits to [start.gg](https://start.gg) for providing the backbone of this project that is the data.

* Credits to [this Google Cloud blog post](https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api) for the Haversine formula to calculate distance between 2 coordinates.

* Credits to many different guides particularly on configuring Next.js, Apollo Client, and Google Maps API

* Credits to everyone in the gaming communities keeping their respective scenes alive and fostering a positive environment.

## License

_MIT_

## Contact Information

_Woo Jin Kim (kimwoojin211@gmail.com)_

Copyright (c) 2022 Woo Jin Kim