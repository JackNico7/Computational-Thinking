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
      var enterprises = Object.keys( cLASS[ "Enterprise" ].instances );
      var enterprise, quantity;

      if ( rand.uniform() < this.consumer.purchaseProb ) {

        // Whom to purchase from
        enterprise = enterprises[ rand.uniformInt( 0,
          enterprises.length - 1 ) ];

        // Quantity to purchase
        quantity = this.consumer.decideOrder();

        followupEvents.push( new Purchase( {
          occTime: this.occTime + 1,
          enterprise: enterprise,
          quantity: quantity
        } ) );
      }

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