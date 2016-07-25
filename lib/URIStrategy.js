/**
 * Pieter Colpaert © Ghent University - iMinds 
 * Combines connection rules, trips and services to an unsorted stream of connections
 */
var moment = require('moment-timezone');

var URIStrategy = function (baseUris) {
  var defaultBaseUris = {
    stops : 'http://example.org/stops/',
    connections : 'http://example.org/connections/',
    trips : 'http://example.org/trips/',
    routes : 'http://example.org/routes/'
  };
  if (!baseUris) {
    baseUris = defaultBaseUris;
  } else {
    if (typeof baseUris.stops !== 'string') {
      baseUris.stops = defaultBaseUris.stops;
    }
    if (typeof baseUris.trips !== 'string') {
      baseUris.trips = defaultBaseUris.trips;
    }
    if (typeof baseUris.routes !== 'string') {
      baseUris.routes = defaultBaseUris.routes;
    }
    if (typeof baseUris.connections !== 'string') {
      baseUris.connections = defaultBaseUris.connections;
    }
  }
  this._baseUris = baseUris;
  
};

/**
 * Returns a persistent identifier for a connection
 */
URIStrategy.prototype.getId = function (connection) {
  //URI strategy for the iRail GTFS implemented here:
  //Remove the platform from the departureStop and arrivalStop
  connection.departureStop = connection.departureStop.substr(0,7);
  connection.arrivalStop = connection.arrivalStop.substr(0,7);
  return this._baseUris.connections + encodeURIComponent(connection.departureStop) + '/' + encodeURIComponent(connection.departureTime.toISOString().substr(0,10).replace(/[-:]/g,'')) + '/' + encodeURIComponent(connection.route);
};

URIStrategy.prototype.getStopId = function (id) {
  //Remove the platform from the departureStop and arrivalStop
  return this._baseUris.stops + encodeURIComponent(id.substr(0,7));
};

URIStrategy.prototype.getTripId = function (connection) {
  return this._baseUris.trips + encodeURIComponent(connection.trip);
}

URIStrategy.prototype.getRouteId = function (connection) {
  return this._baseUris.routes + encodeURIComponent(connection.route);
}

module.exports = URIStrategy;
