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
    },
    "purchaseFrom": {
      range: "Enterprise",
      label: "Enterprises to purchase from",
      minCard: 0,
      maxCard: Infinity
    }
  },

  methods: {
    "decideOrder": function () {
      return rand.uniformInt( this.purchaseMin, this.purchaseMax );
    },
    "decideEnterprise": function () {
      var i, e, enterprise, minPrice = Infinity;

      // Select the Enterprise selling the cheapest
      for ( i = 0; i < this.purchaseFrom.length; i += 1 ) {
        e = this.purchaseFrom[ i ];

        if ( minPrice > e.itemPrice ) {
          minPrice = e.itemPrice;
          enterprise = e;
        }
      }

      return enterprise;
    },
    "replaceEnterprise": function ( e ) {
      var enterprise;
      var enterprises = cLASS[ "Enterprise" ].instances;
      var enterprisesKeys = Object.keys( enterprises );
      var index = this.purchaseFrom.indexOf( e );

      if ( ( index > -1 ) &&
        ( enterprisesKeys.length > ( sim.v.nmrToPurchaseFrom + 1 ) ) ) {
        this.purchaseFrom.splice( index, 1 );

        do {
          enterprise = enterprises[ enterprisesKeys[ rand.uniformInt( 0,
            enterprisesKeys.length - 1 ) ] ];
        } while ( ( this.purchaseFrom.includes( enterprise ) ||
          enterprise === e ) );

        this.purchaseFrom.push( enterprise );
      }
    }
  }
} );