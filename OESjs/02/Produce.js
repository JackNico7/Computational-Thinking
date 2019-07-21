/*******************************************************************************
 * Produce Event Type
 *
 * @copyright Copyright 2019 Brandenburg University of Technology
 * @author Luis Gustavo Nardin
 * @license The MIT License (MIT)
 ******************************************************************************/
var Produce = new cLASS( {
  Name: "Produce",
  supertypeName: "eVENT",
  properties: {
    "enterprise": { range: "Enterprise" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];

      this.enterprise.produceItems();

      return followupEvents;
    }
  }
} );
Produce.priority = 1;

Produce.recurrence = function () {
  return 1;
};

Produce.createNextEvent = function ( e ) {
  return new Produce( {
    occTime: e.occTime + Produce.recurrence(),
    enterprise: e.enterprise
  } );
};