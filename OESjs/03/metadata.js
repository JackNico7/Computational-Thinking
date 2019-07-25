/*******************************************************************************
 * Purchasing Simulation Model metadata
 *
 * @copyright Copyright 2019 Brandenburg University of Technology
 * @author Luis Gustavo Nardin
 * @license The MIT License (MIT)
 ******************************************************************************/
var sim = sim || {};
sim.model = sim.model || {};
sim.scenario = sim.scenario || {};
sim.config = sim.config || {};

var oes = oes || {};
oes.ui = oes.ui || {};
oes.ui.explanation = {};

/*******************************************************************************
 * Simulation Model
 ******************************************************************************/
sim.model.name = "03-PurchasingModel";
sim.model.title = "Purchasing Model (3)";
sim.model.systemNarrative =
  "<p>The model represents a simple purchase order transaction of a single type of item between Enterprises and Consumers.<br/> On each day, Enterprises produce a quantity of a single type of item and update the unit item price, and Consumers decide whether to order new items. If so, they decide which Enterprise to purchase from the Enterprise with the lowest item price in its list of preferred Enterprises and the quantity of items to purchase.<br/> If the ordered quantity of items is in stock, the Enterprise delivers the items to the Consumer. Otherwise, the Enterprise delivers the quantity of products it has in stock and registers the remaining quantity as lost sales.</p>";
sim.model.shortDescription =
  "<p>The 03-PurchasingModel model implements multiple Enterprises that produce and sell one single type of item and multiple Consumers that purchase items from the Enterprises. On each day, the Enterprises generate a <b>Produce event</b> to produce a finite quantity of items and the Consumers generate a <b>DecidePurchase event</b> that may generate a <b>Purchase event</b> with <b>a configured probability</b> to order a specific quantity of items from one Enterprise. If the ordered quantity is in stock, the Enterprise delivers the quantity items to the Consumer and the order is fulfilled. Otherwise, the Enterprise delivers the quantity of items in stock to the Consumer (i.e., order is partially fulfilled) and registers the non-fulfilled quantity as lost sales.</p>";
sim.model.source = "";
sim.model.license = "CC BY-NC";
sim.model.creator = "Luis Gustavo Nardin";
sim.model.created = "2019-06-01";
sim.model.modified = "2019-07-25";