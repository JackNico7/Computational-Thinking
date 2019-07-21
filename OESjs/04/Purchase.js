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
    "consumer": { range: "Consumer" },
    "enterprise": { range: "Enterprise" },
    "quantity": { range: "NonNegativeInteger" }
  },
  methods: {
    "onEvent": function () {
      var followupEvents = [];

      this.enterprise.nmrItemsOrdered = this.quantity;
      sim.stat.itemsOrdered += this.quantity;

      if ( this.enterprise.inventoryLevel >= this.quantity ) {
        this.enterprise.inventoryLevel -= this.quantity;
        this.enterprise.nmrItemsDelivered = this.quantity;

        sim.stat.itemsDelivered += this.quantity;
      } else {
        sim.stat.itemsDelivered += this.enterprise.inventoryLevel;
        sim.stat.lostSales += this.quantity -
          this.enterprise.inventoryLevel;

        this.enterprise.nmrItemsDelivered = this.enterprise.inventoryLevel;
        this.enterprise.inventoryLevel = 0;

        // Replace enterprise that did not fulfill order
        this.consumer.replaceEnterprise( this.enterprise );
      }

      return followupEvents;
    }
  }
} );
Purchase.priority = 2;