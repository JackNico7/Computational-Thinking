/*******************************************************************************
 * Decide Purchase Event Type
 *
 * @copyright Copyright 2019 Brandenburg University of Technology
 * @author Luis Gustavo Nardin
 * @license The MIT License (MIT)
 ******************************************************************************/
var DecidePurchase = new cLASS( {
  Name: "DecidePurchase",
  supertypeName: "eVENT",
  properties: {
    "consumer": { range: "Consumer" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];

      // Quantity to purchase
      var quantity = this.consumer.decideOrder();

      // Whom to purchase from
      var enterprise = cLASS[ "Enterprise" ].instances[ "1" ];

      followupEvents.push( new Purchase( {
        occTime: this.occTime + 1,
        enterprise: enterprise,
        quantity: quantity
      } ) );

      return followupEvents;
    }
  }
} );
DecidePurchase.priority = 0;

DecidePurchase.recurrence = function () {
  return 1;
};

DecidePurchase.createNextEvent = function ( e ) {
  return new DecidePurchase( {
    occTime: e.occTime + DecidePurchase.recurrence(),
    consumer: e.consumer
  } );
};