/******************************************************************************
 * Purchasing Simulation Model
 *
 * @copyright Copyright 2019 Brandenburg University of Technology
 * @author Luis Gustavo Nardin
 * @license The MIT License (MIT)
*******************************************************************************/
/*******************************************************************************
 * Simulation Parameters
 ******************************************************************************/
sim.scenario.simulationEndTime = 100;
sim.scenario.idCounter = 1000; // optional
//sim.scenario.randomSeed = 1234; // optional
/*******************************************************************************
 * Simulation Configuration
 ******************************************************************************/
//sim.config.stepDuration = 1;  // optional
sim.config.runInMainThread = true; // optional
//sim.config.createLog = false;  // optional
//sim.config.visualize = false;  // optional
//sim.config.userInteractive = false;  // optional
/*******************************************************************************
 * Simulation Model
 ******************************************************************************/
sim.model.time = "discrete";
sim.model.timeUnit = "D"; // days
sim.model.timeIncrement = 1; // optional

/* Object, Event, and Activity types */
sim.model.objectTypes = [ "Enterprise", "Consumer" ];
sim.model.eventTypes = [ "DecidePurchase", "Purchase", "Produce" ];
sim.model.activityTypes = [];

/* Global Variables */
sim.model.v.nmrOfEnterprises = {
  range: "NonNegativeInteger",
  initialValue: 5,
  label: "Number Enterprises",
  hint: "The number of enterprises"
};
sim.model.v.productionRateMin = {
  range: "NonNegativeInteger",
  initialValue: 50,
  label: "Min Prod Rate",
  hint: "Minimum number of items to produce per day"
};
sim.model.v.productionRateMax = {
  range: "NonNegativeInteger",
  initialValue: 200,
  label: "Max Prod Rate",
  hint: "Maximum number of items to produce per day"
};
sim.model.v.nmrOfConsumers = {
  range: "NonNegativeInteger",
  initialValue: 100,
  label: "Number Consumers",
  hint: "The number of consumers"
};
sim.model.v.nmrToPurchaseFrom = {
  range: "NonNegativeInteger",
  initialValue: 5,
  label: "Enterprises to Purchase",
  hint: "Number of Enterprises to purchase items from"
};
sim.model.v.purchaseProb = {
  range: "Decimal",
  initialValue: 0.5,
  decimalPlaces: 2,
  label: "Prob Purchase Items"
};
sim.model.v.purchaseMin = {
  range: "NonNegativeInteger",
  initialValue: 5,
  label: "Min Items Purchase",
  hint: "Minimum number of items to purchase"
};
sim.model.v.purchaseMax = {
  range: "NonNegativeInteger",
  initialValue: 15,
  label: "Max Items Purchase",
  hint: "Maximum number of items to purchase"
};
/* Global Functions */

/*******************************************************************************
 * Define Initial State
 ******************************************************************************/
// Initial Objects
sim.scenario.initialState.objects = {};

//Initial Events
sim.scenario.initialState.events = [];

//Initial Functions
sim.scenario.setupInitialState = function () {
  var i, j, objId, enterprises, enterprisesKeys, consumer;

  for ( i = 1; i <= sim.v.nmrOfEnterprises; i += 1 ) {
    objId = i;
    sim.addObject( new Enterprise( {
      id: objId,
      name: "enterprise" + i,
      inventoryLevel: 0,
      productionRateMin: sim.v.productionRateMin,
      productionRateMax: sim.v.productionRateMax,
      itemPrice: rand.uniform(),
      itemsOrdered: 0,
      itemsDelivered: 0
    } ) );

    sim.scheduleEvent( new Produce( {
      occTime: 1,
      enterprise: objId
    } ) );
  }

  for ( ; i <= sim.v.nmrOfEnterprises + sim.v.nmrOfConsumers; i += 1 ) {

    enterprises = cLASS[ "Enterprise" ].instances;
    enterprisesKeys = Object.keys( enterprises );
    rand.shuffleArray( enterprisesKeys );

    objId = i;
    consumer = new Consumer( {
      id: objId,
      name: "consumer" + ( i - sim.v.nmrOfEnterprises + 1 ),
      purchaseProb: sim.v.purchaseProb,
      purchaseMin: sim.v.purchaseMin,
      purchaseMax: sim.v.purchaseMax,
      purchaseFrom: []
    } );

    for ( j = 0;
      j < Math.min( sim.v.nmrToPurchaseFrom, sim.v.nmrOfEnterprises );
      j += 1 ) {
      consumer.purchaseFrom.push( enterprises[ enterprisesKeys[ j ] ] );
    }
    sim.addObject( consumer );

    sim.scheduleEvent( new DecidePurchase( {
      occTime: 1,
      consumer: objId
    } ) );
  }
};
/*******************************************************************************
 * Define Output Statistics Variables
 ******************************************************************************/
sim.model.statistics = {
  "itemsOrdered": {
    range: "NonNegativeInteger",
    label: "Total Orders",
    initialValue: 0
  },
  "itemsDelivered": {
    range: "NonNegativeInteger",
    label: "Total Deliveries",
    initialValue: 0
  },
  "lostSales": {
    range: "NonNegativeInteger",
    label: "Total Lost Sales",
    initialValue: 0
  },
  "minInventory": {
    objectType: "Enterprise",
    objectIdRef: 1,
    property: "inventoryLevel",
    aggregationFunction: "min",
    label: "Min Inv Enterprise[1]"
  },
  "maxInventory": {
    objectType: "Enterprise",
    objectIdRef: 1,
    property: "inventoryLevel",
    aggregationFunction: "max",
    label: "Max Inv Enterprise[1]"
  },
  "percSales": {
    range: "Decimal",
    label: "% Sales",
    initialValue: 0,
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    expression: function () {
      var totalOrdered = 0;
      var totalDelivered = 0;
      var enterprises = cLASS[ "Enterprise" ].instances;
      Object.keys( enterprises ).forEach( function ( objId ) {
        totalOrdered += enterprises[ objId ].nmrItemsOrdered;
        totalDelivered += enterprises[ objId ].nmrItemsDelivered;
      } );

      return ( totalDelivered / totalOrdered ) * 100;
    }
  },
  "percLostSales": {
    range: "Decimal",
    label: "% Lost Sales",
    initialValue: 0,
    showTimeSeries: true,
    computeOnlyAtEnd: false,
    expression: function () {
      var totalOrdered = 0;
      var totalDelivered = 0;
      var enterprises = cLASS[ "Enterprise" ].instances;
      Object.keys( enterprises ).forEach( function ( objId ) {
        totalOrdered += enterprises[ objId ].nmrItemsOrdered;
        totalDelivered += enterprises[ objId ].nmrItemsDelivered;
      } );

      return ( ( totalOrdered - totalDelivered ) / totalOrdered ) * 100;
    }
  }
};