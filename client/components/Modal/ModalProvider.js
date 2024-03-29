import React, { Component, createContext } from 'react';

export const ModalContext = createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {},
});

export default class ModalProvider extends Component {
  showModal = (component, props = {}) => {
    this.setState({
      component,
      props,
    });
  };

  hideModal = () => {
    this.setState({
      component: null,
      props: {},
    });
  };
  
  state = {
    component: null,
    props: {},
    showModal: this.showModal,
    hideModal: this.hideModal,
  };
  
  render() {
    return (
      <ModalContext.Provider value={this.state}>
        {this.state.component}
        {this.props.children}
      </ModalContext.Provider>
    );
  }
}
