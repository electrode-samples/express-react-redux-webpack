import React from 'react';
import { connect } from 'react-redux';

class SSRCachingSimpleTypeWrapper extends React.Component {
  render() {
    const count = this.props.count;

    const elements = [];

    for (let ii = 0; ii < count; ii++) {
      elements.push(<SSRCachingSimpleType key={ii} navEntry={'NavEntry' + ii}/>);
    }

    return (
      <div>
        {elements}
      </div>
    );
  }
}

SSRCachingSimpleTypeWrapper.propTypes = {
  count: React.PropTypes.number
};

class SSRCachingSimpleType extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.navEntry}</p>
      </div>
    );
  }
}

SSRCachingSimpleType.propTypes = {
  navEntry: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  count: state.count
});

export default connect(
  mapStateToProps
)(SSRCachingSimpleTypeWrapper);
