/*******************************************************************************
 * Consumer Object Type
 *
 * @copyright Copyright 2019 Brandenburg University of Technology
 * @author Luis Gustavo Nardin
 * @license The MIT License (MIT)
 ******************************************************************************/
var Consumer = new cLASS( {
  Name: "Consumer",
  shortLabel: "Consumer",
  supertypeName: "oBJECT",

  properties: {
    "purchaseProb": {
      range: "Decimal",
      label: "Purchase Prob"
    },
    "purchaseMin": {
      range: "NonNegativeInteger",
      label: "Min Items Purchase"
    },
    "purchaseMax": {
      range: "NonNegativeInteger",
      label: "Max Items Purchase"
    }
  },

  methods: {
    "decideOrder": function () {
      return rand.uniformInt( this.itemPurchaseMin, this.itemPurchaseMax );
    }
  }
} );