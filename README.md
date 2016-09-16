# React Redux Universal Hot Example

- This repo is a sample Express Universal app with the following Electrode modules:
- [Electrode React SSR Caching](https://github.com/electrode-io/electrode-react-ssr-caching)
- [Electrode Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine)
- [Electrode Above the Fold Rendering](https://github.com/electrode-io/above-the-fold-only-server-render)

---

## About

This application was originally cloned from [erikras/react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example). We have demonstrated the use of 3 features of Electrode Stand Alone modules:

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
---
## <a name="electrode-react-ssr-caching"></a>Electrode Server Side Rendering Component Caching ##

[Electrode-react-ssr-caching](https://github.com/electrode-io/electrode-react-ssr-caching) module supports profiling React Server Side Rendering time and component caching to help you speed up SSR.

It supports 2 types of caching:

* Simple - Component Props become the cache key. This is useful for cases like Header and Footer, where the number of variations of props data is minimal which will make sure the cache size stays small.
* Template - Components Props are first tokenized and then the generated template html is cached. The idea is akin to generating logic-less handlebars template from your React components and then use string replace to process the template with different props. This is useful for cases like displaying Product information in a Carousel where you have millions of products in the repository.

To demonstrate functionality, there is:

* An added component `client/components/SSRCachingSimpleType.jsx` to demostrate Simple strategy.
* An added component `client/components/SSRCachingTemplateType.jsx` to demostrate Template strategy.
* To enable caching using `electrode-react-ssr-caching`, we need to do the below configuration:

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

The above configuration is done in `server/index.js`.

To read more, go to [electrode-react-ssr-caching](https://github.com/electrode-io/electrode-react-ssr-caching)

---
## <a name="redux-router-engine"></a>Electrode Redux Router Engine ##

[Redux Router Engine](https://github.com/electrode-io/electrode-redux-router-engine) handles async data for React Server Side Rendering using [react-router], Redux, and the [Redux Server Rendering] pattern.

The wiring is done in the following way:

```javascript
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

```javascript
Initialization of ReduxRouterEngine with routes and createReduxStore function

const engine = new ReduxRouterEngine({ routes, createReduxStore});

```

```javascript
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

Let's explore passing `skip prop`; there is an example in
`<your-electrode-app>/components/above-fold-simple.jsx`. On the Home page, click the link to render the `localhost:3000/above-the-fold` page.

The best way to demo this existing component is actually going to be in your `node_modules.`

Navigate to `<your-electrode-app>/node_modules/above-the-fold-only-server-render/lib/components/above-the-fold-only-server-render.js` line 29:

```javascript
var SHOW_TIMEOUT = 50;
```

When we use this module at [WalmartLabs](www.walmartlabs.com), it's all about optimization. You are going to change line 29 to slow down the SHOW_TIMEOUT so you can see the component wrapper in action:
Change this to:

```javascript
var SHOW_TIMEOUT = 3000;
```

We need to import the AboveTheFoldOnlyServerRender component from it's node module. Navigate to the `<electrode-boilerplate-universal-react-node>/client/components/above-the-fold.jsx`.

Add the code below `import React from "react"` in line 1:

```javascript
import {AboveTheFoldOnlyServerRender} from "above-the-fold-only-server-render";
```

Run the commands below and test it out in your app:

```bash
  npm run build && npm run start
```

The code in the <h3> tags that are above and below the <AboveTheFoldOnlyServerRender skip={true}> + </AboveTheFoldOnlyServerRender> will render first:

```javascript
import React from "react";
import {AboveTheFoldOnlyServerRender} from "above-the-fold-only-server-render";

export class AboveFold extends React.Component {

  render() {
    return (
      <div>
        <h3>Above-the-fold-only-server-render: Increase Your Performance</h3>
        <AboveTheFoldOnlyServerRender skip={true}>
            <div className="renderMessage" style={{color: "blue"}}>
              <p>This will skip server rendering if the 'AboveTheFoldOnlyServerRender'
                lines are present, or uncommented out.</p>
              <p>This will be rendered on the server and visible if the 'AboveTheFoldOnlyServerRender'
                lines are commented out.</p>
              <p>Try manually toggling this component to see it in action</p>
              <p>
                <a href="https://github.com/electrode-io/above-the-fold-only-server-render"
                  target="_blank">Read more about this module and see our live demo
                </a>
              </p>
            </div>
        </AboveTheFoldOnlyServerRender>
        <h3>This is below the 'Above the fold closing tag'</h3>
      </div>
    );
  }
}
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

To learn more about this essential stand alone module  visit the `above-the-fold-only-server-render` [Github repo](https://github.com/electrode-io/above-the-fold-only-server-render).
