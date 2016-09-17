import React from 'react';

export class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello <a href="https://github.com/electrode-io">Electrode</a></h1>
        <h2>Demonstration Components</h2>
        <ul>
          <li className="aboveFold">
            <a href="/above-the-fold">
              Above the Fold Render
            </a>
            <p>Increase your App's performance by using a skip prop</p>
          </li>
          <li className="ssr simple">
            <a href="/ssrcachingsimpletype">
              SSR Caching - Simple
            </a>
            <p>Component Props become the cache key. This is useful for cases like Header and Footer where the number of variations of props data is minimal which will make sure the cache size stays small.</p>
          </li>
          <li className="ssr caching">
            <a href="/ssrcachingtemplatetype">
              SSR Caching- Template Type
            </a>
            <p>Components Props are first tokenized and then the generated template html is cached. The idea is akin to generating logic-less handlebars template from your React components and then use string replace to process the template with different props. This is useful for cases like displaying Product information in a Carousel where you have millions of products in the repository.</p>
          </li>
        </ul>
      </div>
    );
  }
}
