import React from 'react';
import { connect } from 'react-redux';

class SSRCachingTemplateTypeWrapper extends React.Component {
  render() {
    const count = this.props.count;
    const elements = [];

    for (let ii = 0; ii < count; ii++) {
      elements.push(<SSRCachingTemplateType key={ii} name={'name' + ii} title={'title' + ii} rating={'rating' + ii}/>);
    }

    return (
      <div>
        { elements }
      </div>
    );
  }
}

SSRCachingTemplateTypeWrapper.propTypes = {
  count: React.PropTypes.number
};

class SSRCachingTemplateType extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name} and {this.props.title} and {this.props.rating}</p>
      </div>
    );
  }
}

SSRCachingTemplateType.propTypes = {
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  rating: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  count: state.count
});

export default connect(
  mapStateToProps
)(SSRCachingTemplateTypeWrapper);
