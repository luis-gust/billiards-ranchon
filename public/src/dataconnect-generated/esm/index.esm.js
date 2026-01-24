import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'untitled2',
  location: 'us-east4'
};

export const createRestaurantRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRestaurant', inputVars);
}
createRestaurantRef.operationName = 'CreateRestaurant';

export function createRestaurant(dcOrVars, vars) {
  return executeMutation(createRestaurantRef(dcOrVars, vars));
}

export const getMenuItemsByCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMenuItemsByCategory', inputVars);
}
getMenuItemsByCategoryRef.operationName = 'GetMenuItemsByCategory';

export function getMenuItemsByCategory(dcOrVars, vars) {
  return executeQuery(getMenuItemsByCategoryRef(dcOrVars, vars));
}

export const updateMenuItemPriceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMenuItemPrice', inputVars);
}
updateMenuItemPriceRef.operationName = 'UpdateMenuItemPrice';

export function updateMenuItemPrice(dcOrVars, vars) {
  return executeMutation(updateMenuItemPriceRef(dcOrVars, vars));
}

export const listSpecialOffersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListSpecialOffers');
}
listSpecialOffersRef.operationName = 'ListSpecialOffers';

export function listSpecialOffers(dc) {
  return executeQuery(listSpecialOffersRef(dc));
}

