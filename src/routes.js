import React from 'react';
import { Route, IndexRoute} from 'react-router';
import { Home } from './components/home';
import SSRCachingTemplateType from './components/SSRCachingTemplateType';
import SSRCachingSimpleType from './components/SSRCachingSimpleType';
import { AboveFold } from './components/above-the-fold';


export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/">
      <IndexRoute component={Home} />
      <Route path="above-the-fold" component={AboveFold} />
      <Route path="ssrcachingtemplatetype" component={SSRCachingTemplateType} />
      <Route path="ssrcachingsimpletype" component={SSRCachingSimpleType} />
    </Route>
  );
};
