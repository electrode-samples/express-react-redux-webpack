# React Redux Universal Hot Example

- This repo is a sample Electrode app with the following Electrode modules:
- [Electrode React SSR Caching](https://github.com/electrode-io/electrode-react-ssr-caching)
- [Electrode Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine)
- [Electrode Above the Fold Rendering](https://github.com/electrode-io/above-the-fold-only-server-render)

---

## About

This application was originally cloned from [erikras/react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example). We have demonstrated the use of 3 features of Electrode Stand alone modules:

* [Electrode Server Side Rendering component caching](https://github.com/electrode-io/electrode-react-ssr-caching)
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

## <a name="electrode-react-ssr-caching"></a>Electrode Server Side Rendering Component Caching ##
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
---
## <a name="above-the-fold"></a>Electrode Above the Fold Server Rendering
[Above the Fold Server Rendering](https://github.com/electrode-io/above-the-fold-only-server-render) is a React component for optionally skipping server side rendering of components outside above-the-fold (or outside of the viewport). This component helps render your components on the server that are above the fold and the remaining components on the client.

[Above-the-fold-only-server-render](https://github.com/electrode-io/above-the-fold-only-server-render) helps increase performance both by decreasing the load on renderToString and sending the end user a smaller amount of markup.

By default, the [above-the-fold-only-server-render](https://github.com/electrode-io/above-the-fold-only-server-render) component is an exercise in simplicity; it does nothing and only returns the child component.

### Install
- Add the `above-the-fold-only-server-render` component:

```bash
npm install above-the-fold-only-server-render --save
```

You can tell the component to skip server side rendering either by passing a `prop` `skip={true}` or by setting up `skipServerRender` in your app context and passing the component a `contextKey` `prop`.

You can skip server side rendering by passing a `skip prop`, like `<your-electrode-app>/components/above-fold-simple.jsx`. You can comment out the `<AboveTheFoldOnlyServerRender skip={true}>` (skip prop) and closing tag to see how the `above-the-fold-only-server-render` component is working underneath:

```js

const YourComponent = () => {
  return (
    //comment out '<AboveTheFoldOnlyServerRender skip={true}>' tags to toggle SSR of this component'
    <AboveTheFoldOnlyServerRender skip={true}>
      <div>This will not be server side rendered.</div>
    </AboveTheFoldOnlyServerRender>
  );
};

```

You can also skip server side rendering by `setting context in your app and passing a contextKey prop`. Here is an example:

```js

const YourComponent = () => {
    return (
      <AboveTheFoldOnlyServerRender contextKey="aboveTheFoldOnlyServerRender.SomeComponent">
        <div>This will not be server side rendered based on the context.</div>
      </AboveTheFoldOnlyServerRender>
    );
};

class YourApp extends React.Component {
  getChildContext() {
    return {
      aboveTheFoldOnlyServerRender: {
        YourComponent: true
      }
    };
  }

  render() {
    return (
      <YourComponent />
    );
  }
}

YourApp.childContextTypes = {
  aboveTheFoldOnlyServerRender: React.PropTypes.shape({
    AnotherComponent: React.PropTypes.bool
  })
};
```

Navigate to `<your-electrode-app>/client/components/above-the-fold.jsx.` Following the instructions on how to manipulate the skip prop by directly commenting and uncommenting the `above-the-fold-only-server-render` [component](https://github.com/electrode-io/above-the-fold-only-server-render).

```javascript
import React from "react";
import styles from "../styles/base.css";

export class AboveFold extends React.Component {

  render() {
    return (
      // <AboveTheFoldOnlyServerRender skip={true}>
        <div className="renderMessage" style={{color: 'blue'}}>
          <h3>Above-the-fold-only-server-render: Increase Your Performance</h3>
          <p>This will skip server rendering if the 'AboveTheFoldOnlyServerRender' lines are present, or uncommented out.</p>
          <p>This will be rendered on the server and visible if the 'AboveTheFoldOnlyServerRender' lines are commented out.</p>
          <p>Try manually toggling this component to see it in action</p>
          <p><a href="https://github.com/electrode-io/above-the-fold-only-server-render" target="_blank">Read more about this module and see our live demo</a></p>
        </div>
      //  </AboveTheFoldOnlyServerRender>
    );
  }
}
```
