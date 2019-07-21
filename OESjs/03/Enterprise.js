/******************************************************************************
 * Enterprise Object Type
 *
 * @copyright Copyright 2019 Brandenburg University of Technology
 * @author Luis Gustavo Nardin
 * @license The MIT License (MIT)
*******************************************************************************/
var Enterprise = new cLASS( {
  Name: "Enterprise",
  shortLabel: "Enterprise",
  supertypeName: "oBJECT",

  properties: {
    "inventoryLevel": {
      range: "NonNegativeInteger",
      label: "Inventory Level",
      shortLabel: "inventory"
    },
    "productionRateMin": {
      range: "NonNegativeInteger",
      label: "Min Prod Rate"
    },
    "productionRateMax": {
      range: "NonNegativeInteger",
      label: "Max Prod Rate"
    }
  },

  methods: {
    "produceItems": function () {
      this.inventoryLevel += rand.uniformInt( this.productionRateMin,
        this.productionRateMax );
    }
  }
} );
