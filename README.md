# React Redux Universal Hot Example 


---

## About

This application was originally cloned from [erikras/react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example). We have demonstrated the use of 3 features of Electrode Stand alone modules:

* [Electrode Server Side Rendering component caching](electrode-io/electrode-react-ssr-caching)
* [Electrode Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine)
* [Electrode Above the fold only server render](https://github.com/electrode-io/above-the-fold-only-server-render)

## Installation

```
npm install
```

## Running Server in Production Mode

```
npm run build
npm run start
```

## Electrode Server Side Rendering component caching

[electrode-react-ssr-caching](https://github.com/electrode-io/electrode-react-ssr-caching) module supports profiling React Server Side Rendering time and component caching to help you speed up SSR.

It supports 2 types of caching:

* Simple - Component Props become the cache key. This is useful for cases like Header and Footer where the number of variations of props data is minimal which will make sure the cache size stays small.
* Template - Components Props are first tokenized and then the generated template html is cached. The idea is akin to generating logic-less handlebars template from your React components and then use string replace to process the template with different props. This is useful for cases like displaying Product information in a Carousel where you have millions of products in the repository.

To demonstrate functionality,

* Added component `src/components/SSRCachingSimpleType.js` to demostrate Simple strategy. 
* Added component `src/components/SSRCachingTemplateType.js` to demostrate Template strategy. 
* To enable caching using `electrode-react-ssr-caching` we need to do the below configuration:

```
const cacheConfig = {
  components: {
    SSRCachingTemplateType: {
      strategy: "template",
      enable: true
    },
    SSRCachingSimpleType: {
      strategy: "simple",
      enable: true
    }
  }
};

SSRCaching.enableCaching();
SSRCaching.setCachingConfig(cacheConfig);
```

The above configuration is done in `src/server.js`.

To read more, go to [electrode-react-ssr-caching](https://github.com/electrode-io/electrode-react-ssr-caching)


## <a name="redux-router-engine"></a>Electrode Redux Router Engine ##

[Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine) handles async data for React Server Side Rendering using [react-router], Redux, and the [Redux Server Rendering] pattern.

The wiring is done in the following way:

```
Creation of REDUX store which returns a promise eventually resolving to a constructed redux store

function createReduxStore(req, match) {
  let initialState = {count : 100};
  let rootReducer = (s, a) => s
  store = createStore(rootReducer, initialState);

  return Promise.all([
      // DO ASYNC THUNK ACTIONS HERE : store.dispatch(boostrapApp())
      Promise.resolve({})
    ]).then(() => {
      return store;
  });
}
```

```
Initialization of ReduxRouterEngine with routes and createReduxStore function

const engine = new ReduxRouterEngine({ routes, createReduxStore});

```

```
Render the html for the given request

 engine.render(req)
    .then( (result) => {
      // send full HTML with result back using res
    });
```
