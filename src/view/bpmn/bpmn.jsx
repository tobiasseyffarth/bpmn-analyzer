import React, { Component } from 'react';
import { Button } from 'primereact/button';
import BpmnModeler from 'bpmn-js/dist/bpmn-modeler.development';
import Projectmodel from '../../model/projectmodel';
import '../../App.css'

export default class Bpmn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bpmnXml: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.bpmnXml !== state.bpmnXml) {
      return {
        bpmnXml: props.bpmnXml
      };
    }
    return null;
  }

  componentDidMount() {
    this.bpmnModeler = new BpmnModeler();

    // comments
    
    // new comment after revert

    /*
    this.bpmnModeler = new BpmnModeler({
      container: '#canvas',
      height: '350px',
    });
    */

    this.onMount();
    this.hookBpmnEventBus();
  }

  onMount() {
    if (Projectmodel.getBpmn() !== null) {
      this.renderBpmn(Projectmodel.getBpmn());
    }
  }

  hookBpmnEventBus() {

  }

  renderBpmn(xml) {
    console.log('render bpmn');
  }

  render() {
    return (
      <div>
        <section className="bpmn-container">
          <div className="bpmn-viewer">
            <p>viewer</p>
          </div>
          <div className="bpmn-panel">
            <p>panel</p>
          </div>
        </section>
      </div>
    );
  }
}
