# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMenuItemsByCategory*](#getmenuitemsbycategory)
  - [*ListSpecialOffers*](#listspecialoffers)
- [**Mutations**](#mutations)
  - [*CreateRestaurant*](#createrestaurant)
  - [*UpdateMenuItemPrice*](#updatemenuitemprice)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMenuItemsByCategory
You can execute the `GetMenuItemsByCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](index.d.ts):
```typescript
getMenuItemsByCategory(vars: GetMenuItemsByCategoryVariables): QueryPromise<GetMenuItemsByCategoryData, GetMenuItemsByCategoryVariables>;

interface GetMenuItemsByCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMenuItemsByCategoryVariables): QueryRef<GetMenuItemsByCategoryData, GetMenuItemsByCategoryVariables>;
}
export const getMenuItemsByCategoryRef: GetMenuItemsByCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMenuItemsByCategory(dc: DataConnect, vars: GetMenuItemsByCategoryVariables): QueryPromise<GetMenuItemsByCategoryData, GetMenuItemsByCategoryVariables>;

interface GetMenuItemsByCategoryRef {
  ...
  (dc: DataConnect, vars: GetMenuItemsByCategoryVariables): QueryRef<GetMenuItemsByCategoryData, GetMenuItemsByCategoryVariables>;
}
export const getMenuItemsByCategoryRef: GetMenuItemsByCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMenuItemsByCategoryRef:
```typescript
const name = getMenuItemsByCategoryRef.operationName;
console.log(name);
```

### Variables
The `GetMenuItemsByCategory` query requires an argument of type `GetMenuItemsByCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](index.d.ts). It has the following fields:

```typescript
export interface GetMenuItemsByCategoryVariables {
  categoryId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMenuItemsByCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMenuItemsByCategoryData`, which is defined in [dataconnect-generated/index.d.ts](index.d.ts). It has the following fields:
```typescript
export interface GetMenuItemsByCategoryData {
  menuItems: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
  } & MenuItem_Key)[];
}
```
### Using `GetMenuItemsByCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMenuItemsByCategory, GetMenuItemsByCategoryVariables } from '@dataconnect/generated';

// The `GetMenuItemsByCategory` query requires an argument of type `GetMenuItemsByCategoryVariables`:
const getMenuItemsByCategoryVars: GetMenuItemsByCategoryVariables = {
  categoryId: ..., 
};

// Call the `getMenuItemsByCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMenuItemsByCategory(getMenuItemsByCategoryVars);
// Variables can be defined inline as well.
const { data } = await getMenuItemsByCategory({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMenuItemsByCategory(dataConnect, getMenuItemsByCategoryVars);

console.log(data.menuItems);

// Or, you can use the `Promise` API.
getMenuItemsByCategory(getMenuItemsByCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.menuItems);
});
```

### Using `GetMenuItemsByCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMenuItemsByCategoryRef, GetMenuItemsByCategoryVariables } from '@dataconnect/generated';

// The `GetMenuItemsByCategory` query requires an argument of type `GetMenuItemsByCategoryVariables`:
const getMenuItemsByCategoryVars: GetMenuItemsByCategoryVariables = {
  categoryId: ..., 
};

// Call the `getMenuItemsByCategoryRef()` function to get a reference to the query.
const ref = getMenuItemsByCategoryRef(getMenuItemsByCategoryVars);
// Variables can be defined inline as well.
const ref = getMenuItemsByCategoryRef({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMenuItemsByCategoryRef(dataConnect, getMenuItemsByCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.menuItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.menuItems);
});
```

## ListSpecialOffers
You can execute the `ListSpecialOffers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](index.d.ts):
```typescript
listSpecialOffers(): QueryPromise<ListSpecialOffersData, undefined>;

interface ListSpecialOffersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListSpecialOffersData, undefined>;
}
export const listSpecialOffersRef: ListSpecialOffersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listSpecialOffers(dc: DataConnect): QueryPromise<ListSpecialOffersData, undefined>;

interface ListSpecialOffersRef {
  ...
  (dc: DataConnect): QueryRef<ListSpecialOffersData, undefined>;
}
export const listSpecialOffersRef: ListSpecialOffersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listSpecialOffersRef:
```typescript
const name = listSpecialOffersRef.operationName;
console.log(name);
```

### Variables
The `ListSpecialOffers` query has no variables.
### Return Type
Recall that executing the `ListSpecialOffers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListSpecialOffersData`, which is defined in [dataconnect-generated/index.d.ts](index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListSpecialOffers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listSpecialOffers } from '@dataconnect/generated';


// Call the `listSpecialOffers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listSpecialOffers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listSpecialOffers(dataConnect);

console.log(data.specialOffers);

// Or, you can use the `Promise` API.
listSpecialOffers().then((response) => {
  const data = response.data;
  console.log(data.specialOffers);
});
```

### Using `ListSpecialOffers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listSpecialOffersRef } from '@dataconnect/generated';


// Call the `listSpecialOffersRef()` function to get a reference to the query.
const ref = listSpecialOffersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listSpecialOffersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.specialOffers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.specialOffers);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateRestaurant
You can execute the `CreateRestaurant` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](index.d.ts):
```typescript
createRestaurant(vars: CreateRestaurantVariables): MutationPromise<CreateRestaurantData, CreateRestaurantVariables>;

interface CreateRestaurantRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRestaurantVariables): MutationRef<CreateRestaurantData, CreateRestaurantVariables>;
}
export const createRestaurantRef: CreateRestaurantRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRestaurant(dc: DataConnect, vars: CreateRestaurantVariables): MutationPromise<CreateRestaurantData, CreateRestaurantVariables>;

interface CreateRestaurantRef {
  ...
  (dc: DataConnect, vars: CreateRestaurantVariables): MutationRef<CreateRestaurantData, CreateRestaurantVariables>;
}
export const createRestaurantRef: CreateRestaurantRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRestaurantRef:
```typescript
const name = createRestaurantRef.operationName;
console.log(name);
```

### Variables
The `CreateRestaurant` mutation requires an argument of type `CreateRestaurantVariables`, which is defined in [dataconnect-generated/index.d.ts](index.d.ts). It has the following fields:

```typescript
export interface CreateRestaurantVariables {
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateRestaurant` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRestaurantData`, which is defined in [dataconnect-generated/index.d.ts](index.d.ts). It has the following fields:
```typescript
export interface CreateRestaurantData {
  restaurant_insert: Restaurant_Key;
}
```
### Using `CreateRestaurant`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRestaurant, CreateRestaurantVariables } from '@dataconnect/generated';

// The `CreateRestaurant` mutation requires an argument of type `CreateRestaurantVariables`:
const createRestaurantVars: CreateRestaurantVariables = {
  name: ..., 
  email: ..., // optional
  phone: ..., // optional
  address: ..., // optional
  description: ..., // optional
};

// Call the `createRestaurant()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRestaurant(createRestaurantVars);
// Variables can be defined inline as well.
const { data } = await createRestaurant({ name: ..., email: ..., phone: ..., address: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRestaurant(dataConnect, createRestaurantVars);

console.log(data.restaurant_insert);

// Or, you can use the `Promise` API.
createRestaurant(createRestaurantVars).then((response) => {
  const data = response.data;
  console.log(data.restaurant_insert);
});
```

### Using `CreateRestaurant`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRestaurantRef, CreateRestaurantVariables } from '@dataconnect/generated';

// The `CreateRestaurant` mutation requires an argument of type `CreateRestaurantVariables`:
const createRestaurantVars: CreateRestaurantVariables = {
  name: ..., 
  email: ..., // optional
  phone: ..., // optional
  address: ..., // optional
  description: ..., // optional
};

// Call the `createRestaurantRef()` function to get a reference to the mutation.
const ref = createRestaurantRef(createRestaurantVars);
// Variables can be defined inline as well.
const ref = createRestaurantRef({ name: ..., email: ..., phone: ..., address: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRestaurantRef(dataConnect, createRestaurantVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.restaurant_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.restaurant_insert);
});
```

## UpdateMenuItemPrice
You can execute the `UpdateMenuItemPrice` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](index.d.ts):
```typescript
updateMenuItemPrice(vars: UpdateMenuItemPriceVariables): MutationPromise<UpdateMenuItemPriceData, UpdateMenuItemPriceVariables>;

interface UpdateMenuItemPriceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMenuItemPriceVariables): MutationRef<UpdateMenuItemPriceData, UpdateMenuItemPriceVariables>;
}
export const updateMenuItemPriceRef: UpdateMenuItemPriceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMenuItemPrice(dc: DataConnect, vars: UpdateMenuItemPriceVariables): MutationPromise<UpdateMenuItemPriceData, UpdateMenuItemPriceVariables>;

interface UpdateMenuItemPriceRef {
  ...
  (dc: DataConnect, vars: UpdateMenuItemPriceVariables): MutationRef<UpdateMenuItemPriceData, UpdateMenuItemPriceVariables>;
}
export const updateMenuItemPriceRef: UpdateMenuItemPriceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMenuItemPriceRef:
```typescript
const name = updateMenuItemPriceRef.operationName;
console.log(name);
```

### Variables
The `UpdateMenuItemPrice` mutation requires an argument of type `UpdateMenuItemPriceVariables`, which is defined in [dataconnect-generated/index.d.ts](index.d.ts). It has the following fields:

```typescript
export interface UpdateMenuItemPriceVariables {
  id: UUIDString;
  price: number;
}
```
### Return Type
Recall that executing the `UpdateMenuItemPrice` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMenuItemPriceData`, which is defined in [dataconnect-generated/index.d.ts](index.d.ts). It has the following fields:
```typescript
export interface UpdateMenuItemPriceData {
  menuItem_update?: MenuItem_Key | null;
}
```
### Using `UpdateMenuItemPrice`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMenuItemPrice, UpdateMenuItemPriceVariables } from '@dataconnect/generated';

// The `UpdateMenuItemPrice` mutation requires an argument of type `UpdateMenuItemPriceVariables`:
const updateMenuItemPriceVars: UpdateMenuItemPriceVariables = {
  id: ..., 
  price: ..., 
};

// Call the `updateMenuItemPrice()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMenuItemPrice(updateMenuItemPriceVars);
// Variables can be defined inline as well.
const { data } = await updateMenuItemPrice({ id: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMenuItemPrice(dataConnect, updateMenuItemPriceVars);

console.log(data.menuItem_update);

// Or, you can use the `Promise` API.
updateMenuItemPrice(updateMenuItemPriceVars).then((response) => {
  const data = response.data;
  console.log(data.menuItem_update);
});
```

### Using `UpdateMenuItemPrice`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMenuItemPriceRef, UpdateMenuItemPriceVariables } from '@dataconnect/generated';

// The `UpdateMenuItemPrice` mutation requires an argument of type `UpdateMenuItemPriceVariables`:
const updateMenuItemPriceVars: UpdateMenuItemPriceVariables = {
  id: ..., 
  price: ..., 
};

// Call the `updateMenuItemPriceRef()` function to get a reference to the mutation.
const ref = updateMenuItemPriceRef(updateMenuItemPriceVars);
// Variables can be defined inline as well.
const ref = updateMenuItemPriceRef({ id: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMenuItemPriceRef(dataConnect, updateMenuItemPriceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.menuItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.menuItem_update);
});
```

