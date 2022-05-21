# axios
## install axios
```
npm i axios axios-auth-refresh
```
create axios.js
1. Create axios instance
```js
// Create axios instance.
const axiosInstance = axios.create({
  // default axios settings go here
  // baseURL: process.env.BACKEND_BASE_URL,  #becuse for confing on next.config.js and traefik
  withCredentials: true,
  headers: {
    common: {
      'Accept-Language': 'ir',
    },
  },
});
```
2. Setup auth Interceptors
```js

export const setupInterceptors = (store) => {


  createAuthRefreshInterceptor(axiosInstance, (failedRequest) => {
    return axiosInstance
    // TokenRefreshSerializer ,220,221
      .post('/api/auth/refresh/', { // <- Send refresh token to backend to get a new access token
        user_id: store.getState().authReducer?.username,
        refresh: store.getState().authReducer?.refreshToken,
      })
      .then((resp) => { // Get backend response
        // TokenRefreshSerializer ,237
        const { access_tok: accessToken } = resp.data; // get access token in backend response
        const bearer = `${
          process.env.JWT_AUTH_HEADER ?? 'Bearer'
        } ${accessToken}`;
        console.log(accessToken);
        axiosInstance.defaults.headers.Authorization = bearer; // set access token in default axios headers

       
        failedRequest.response.config.headers.Authorization = bearer; // set access token in failed request headers
        return Promise.resolve();
      })
    }
  );
};

```
3. After setting up redux, add these lines to `_app.js`
```js
function MyApp({ Component, pageProps }) {
  ...
  const store = useStore();
  setupInterceptors(store);

  ...
  return...
}
```

# Redux
```commandline
npm i @reduxjs/toolkit redux-thunk redux next-redux-wrapper
```

## Redux explanation
Redux consists of a state, a set of reducers, and a set of actions.

Reducers recieve an action, then figure out how the state should change based on action.type, and add the data from action.payload to the state.

## Simple configuration
In order to use redux we need to create a store that contains all the redux data, i.e. state, reducers, actions...

We first combine all our reducers:
```js
const combinedReducers = combineReducers({
    
});
```


We need to add a HYDRATE action which is used when next js wants to inject data into redux:
```js
const rootReducer = (state, action) => {
  if (action.type === HYDRATE) { // If action is hydrate
    const nextState = {
      ...state,
      ...action.payload, // Add action.payload to state
    };
    return nextState;
  }
  return combinedReducers(state, action); // Otherwise use the combined reducers
};
```

We need to create a redux store
```js
store = createStore(rootReducer, initialState, applyMiddleware(thunk));
```

Then we need to use a wrapper to register redux context to react:
```js
`lib/store.js`

export const wrapper = createWrapper(makeStore, { storeKey: 'key' });

`pages/_app.js`

import { wrapper } from '../lib/store'
...

export default wrapper.withRedux(MyApp)
```
Wrapper wraps the component inside the tags(context) which is used to load redux(it works like layout but with context instead of styles).
