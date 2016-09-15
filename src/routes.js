import React from 'react';
import {Route} from 'react-router';
import SSRCachingTemplateType from './components/SSRCachingTemplateType';
import SSRCachingSimpleType from './components/SSRCachingSimpleType';
import Html from './helpers/Html';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/">
      <Route path="ssrcachingtemplatetype" component={SSRCachingTemplateType} />
      <Route path="ssrcachingsimpletype" component={SSRCachingSimpleType} />
    </Route>
  );
};
