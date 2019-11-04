import React, { Component } from 'react';
import { Button } from 'primereact/button';
import BpmnModeler from 'bpmn-js/dist/bpmn-modeler.development';
import * as processQuery from './../../controller/processquery';
import Projectmodel from '../../model/projectmodel';
import '../../App.css'

export default class Bpmn extends Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.renderBpmnProps = this.renderBpmnProps.bind(this);

    this.state = {
      bpmnXml: null,
      elementId: null,
      elementType: null,
      elementName: null
    };
  }

  componentWillReceiveProps(props) {
    if (props.bpmnXml !== this.state.bpmnXml) {
      this.setState({ bpmnXml: props.bpmnXml }, () => {
        this.renderBpmn(props.bpmnXml);
      }
      );
    }

  }

  componentDidMount() {
    this.bpmnModeler = new BpmnModeler({
      container: '#canvas'
    });
    this.onMount();
    this.hookBpmnEventBus();
  }

  onMount() {
    if (this.state.bpmnXml !== null) {
      this.renderBpmn(this.state.bpmnXml);
    }
  }

  hookBpmnEventBus() {
    const eventBus = this.bpmnModeler.get('eventBus');
    eventBus.on('element.click', e => this.renderBpmnProps(e.element));
  }

  renderBpmn(xml) {
    console.log('render bpmn');
    let _this = this;
    this.bpmnModeler.importXML(xml, function(err) {
      if (err) {
        console.log('error rendering', err);
      } else {
        const canvas = _this.bpmnModeler.get('canvas');
        canvas.zoom('fit-viewport');
        Projectmodel.setBpmn(_this.bpmnModeler._definitions.rootElements[0]);
      }
    });
  }

  click() {
    console.log(this.state.bpmnXml);
  }

  renderBpmnProps(element) {
    const businessObject = element.businessObject;
    const type = element.type.toLowerCase();

    this.setState({elementId: businessObject.id});
    this.setState({elementName: businessObject.name});
    this.setState({elementType: type});

    if (type.includes('task')) {
      console.log('contains task');
      const pred = processQuery.getPredecessor(businessObject);
      const suc = processQuery.getSuccessor(businessObject);
      const dataInput = processQuery.getDataInput(businessObject);
      const dataOutput = processQuery.getDataOutput(businessObject);

      console.clear();

      console.log('pred', pred);
      console.log('sucs', suc);
      console.log('input', dataInput);
      console.log('output', dataOutput);
      
    }

    console.log(element);
  }

  renderBpmnPanel() {
    return (
      <div className="bpmn-panel">
        <div>
          <div className="bpmn-properties">
            <label>Name: {this.state.elementName}</label>
          </div>
          <div className="bpmn-properties">
            <label>Id: {this.state.elementId}</label>
          </div> 
          <div className="bpmn-properties">
            <label>Type: {this.state.elementType}</label>
          </div>
        </div>
        <Button
          label="Show Graph"
          className="menu-button"
          style={{ marginRight: 10 }}
          onClick={this.click}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <section className="bpmn-container">
          <div className="bpmn-viewer" id="canvas" />
          {this.renderBpmnPanel()}
        </section>
      </div>
    );
  }
}
