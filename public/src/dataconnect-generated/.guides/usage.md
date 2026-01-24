# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createRestaurant, getMenuItemsByCategory, updateMenuItemPrice, listSpecialOffers } from '@dataconnect/generated';


// Operation CreateRestaurant:  For variables, look at type CreateRestaurantVars in ../index.d.ts
const { data } = await CreateRestaurant(dataConnect, createRestaurantVars);

// Operation GetMenuItemsByCategory:  For variables, look at type GetMenuItemsByCategoryVars in ../index.d.ts
const { data } = await GetMenuItemsByCategory(dataConnect, getMenuItemsByCategoryVars);

// Operation UpdateMenuItemPrice:  For variables, look at type UpdateMenuItemPriceVars in ../index.d.ts
const { data } = await UpdateMenuItemPrice(dataConnect, updateMenuItemPriceVars);

// Operation ListSpecialOffers: 
const { data } = await ListSpecialOffers(dataConnect);


```