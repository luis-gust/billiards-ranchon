const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'untitled2',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createRestaurantRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRestaurant', inputVars);
}
createRestaurantRef.operationName = 'CreateRestaurant';
exports.createRestaurantRef = createRestaurantRef;

exports.createRestaurant = function createRestaurant(dcOrVars, vars) {
  return executeMutation(createRestaurantRef(dcOrVars, vars));
};

const getMenuItemsByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMenuItemsByCategory', inputVars);
}
getMenuItemsByCategoryRef.operationName = 'GetMenuItemsByCategory';
exports.getMenuItemsByCategoryRef = getMenuItemsByCategoryRef;

exports.getMenuItemsByCategory = function getMenuItemsByCategory(dcOrVars, vars) {
  return executeQuery(getMenuItemsByCategoryRef(dcOrVars, vars));
};

const updateMenuItemPriceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMenuItemPrice', inputVars);
}
updateMenuItemPriceRef.operationName = 'UpdateMenuItemPrice';
exports.updateMenuItemPriceRef = updateMenuItemPriceRef;

exports.updateMenuItemPrice = function updateMenuItemPrice(dcOrVars, vars) {
  return executeMutation(updateMenuItemPriceRef(dcOrVars, vars));
};

const listSpecialOffersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSpecialOffers');
}
listSpecialOffersRef.operationName = 'ListSpecialOffers';
exports.listSpecialOffersRef = listSpecialOffersRef;

exports.listSpecialOffers = function listSpecialOffers(dc) {
  return executeQuery(listSpecialOffersRef(dc));
};
