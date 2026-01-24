import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateRestaurantData {
  restaurant_insert: Restaurant_Key;
}

export interface CreateRestaurantVariables {
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  description?: string | null;
}

export interface GetMenuItemsByCategoryData {
  menuItems: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
  } & MenuItem_Key)[];
}

export interface GetMenuItemsByCategoryVariables {
  categoryId: UUIDString;
}

export interface ListSpecialOffersData {
  specialOffers: ({
    id: UUIDString;
    description?: string | null;
    specialPrice: number;
    menuItem: {
      id: UUIDString;
      name: string;
    } & MenuItem_Key;
  } & SpecialOffer_Key)[];
}

export interface MenuItem_Key {
  id: UUIDString;
  __typename?: 'MenuItem_Key';
}

export interface ModifierGroup_Key {
  id: UUIDString;
  __typename?: 'ModifierGroup_Key';
}

export interface Modifier_Key {
  id: UUIDString;
  __typename?: 'Modifier_Key';
}

export interface Restaurant_Key {
  id: UUIDString;
  __typename?: 'Restaurant_Key';
}

export interface SpecialOffer_Key {
  id: UUIDString;
  __typename?: 'SpecialOffer_Key';
}

export interface UpdateMenuItemPriceData {
  menuItem_update?: MenuItem_Key | null;
}

export interface UpdateMenuItemPriceVariables {
  id: UUIDString;
  price: number;
}

interface CreateRestaurantRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRestaurantVariables): MutationRef<CreateRestaurantData, CreateRestaurantVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRestaurantVariables): MutationRef<CreateRestaurantData, CreateRestaurantVariables>;
  operationName: string;
}
export const createRestaurantRef: CreateRestaurantRef;

export function createRestaurant(vars: CreateRestaurantVariables): MutationPromise<CreateRestaurantData, CreateRestaurantVariables>;
export function createRestaurant(dc: DataConnect, vars: CreateRestaurantVariables): MutationPromise<CreateRestaurantData, CreateRestaurantVariables>;

interface GetMenuItemsByCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMenuItemsByCategoryVariables): QueryRef<GetMenuItemsByCategoryData, GetMenuItemsByCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMenuItemsByCategoryVariables): QueryRef<GetMenuItemsByCategoryData, GetMenuItemsByCategoryVariables>;
  operationName: string;
}
export const getMenuItemsByCategoryRef: GetMenuItemsByCategoryRef;

export function getMenuItemsByCategory(vars: GetMenuItemsByCategoryVariables): QueryPromise<GetMenuItemsByCategoryData, GetMenuItemsByCategoryVariables>;
export function getMenuItemsByCategory(dc: DataConnect, vars: GetMenuItemsByCategoryVariables): QueryPromise<GetMenuItemsByCategoryData, GetMenuItemsByCategoryVariables>;

interface UpdateMenuItemPriceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMenuItemPriceVariables): MutationRef<UpdateMenuItemPriceData, UpdateMenuItemPriceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMenuItemPriceVariables): MutationRef<UpdateMenuItemPriceData, UpdateMenuItemPriceVariables>;
  operationName: string;
}
export const updateMenuItemPriceRef: UpdateMenuItemPriceRef;

export function updateMenuItemPrice(vars: UpdateMenuItemPriceVariables): MutationPromise<UpdateMenuItemPriceData, UpdateMenuItemPriceVariables>;
export function updateMenuItemPrice(dc: DataConnect, vars: UpdateMenuItemPriceVariables): MutationPromise<UpdateMenuItemPriceData, UpdateMenuItemPriceVariables>;

interface ListSpecialOffersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSpecialOffersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListSpecialOffersData, undefined>;
  operationName: string;
}
export const listSpecialOffersRef: ListSpecialOffersRef;

export function listSpecialOffers(): QueryPromise<ListSpecialOffersData, undefined>;
export function listSpecialOffers(dc: DataConnect): QueryPromise<ListSpecialOffersData, undefined>;

