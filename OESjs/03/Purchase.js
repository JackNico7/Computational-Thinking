/*******************************************************************************
 * Purchase Event Type
 *
 * @copyright Copyright 2019 Brandenburg University of Technology
 * @author Luis Gustavo Nardin
 * @license The MIT License (MIT)
 ******************************************************************************/
var Purchase = new cLASS( {
  Name: "Purchase",
  supertypeName: "eVENT",
  properties: {
    "enterprise": { range: "Enterprise" },
    "quantity": { range: "NonNegativeInteger" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];

      sim.stat.itemsOrdered += this.quantity;

      if ( this.enterprise.inventoryLevel >= this.quantity ) {
        this.enterprise.inventoryLevel -= this.quantity;

        sim.stat.itemsDelivered += this.quantity;
      } else {
        // Update statistics
        sim.stat.lostSales += this.quantity - this.enterprise.inventoryLevel;
        sim.stat.itemsDelivered += this.enterprise.inventoryLevel;

        this.enterprise.inventoryLevel = 0;
      }

      return followupEvents;
    }
  }
} );
Purchase.priority = 0;