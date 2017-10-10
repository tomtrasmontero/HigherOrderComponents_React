import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    // context are like props but it allows to be able to skip the component
    // heirarchy and can be accessed by all component.  Needs to declared
    // contextTypes to be able to access it.
    // *** static *** defines a class level property for Authentication component
    // can be access as Authentication.contextTypes
    static contextTypes = {
      router: React.PropTypes.object
    }

    // will check if user is authenticated or else push to home
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    // this is called when a component recieves a prop or about to render
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      // ...this.props makes sure that any props passed in component,
      // it will still be included in the Authentication component being
      // passed
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
