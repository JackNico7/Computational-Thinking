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

/* Global Functions */

/*******************************************************************************
 * Define Initial State
 ******************************************************************************/
// Initial Objects
sim.scenario.initialState.objects = {
  "1": {
    typeName: "Enterprise",
    name: "enterprise",
    inventoryLevel: 0,
    productionRateMin: 5,
    productionRateMax: 15,
  },
  "2": {
    typeName: "Consumer",
    name: "consumer",
    purchaseMin: 5,
    purchaseMax: 15
  }
};

//Initial Events
sim.scenario.initialState.events = [
  {
    typeName: "Produce",
    occTime: 1,
    enterprise: 1
  },
  {
    typeName: "DecidePurchase",
    occTime: 1,
    consumer: 2
  }
];

//Initial Functions
sim.scenario.setupInitialState = function () { };
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
  }
};