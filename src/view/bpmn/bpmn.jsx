import React, { Component } from 'react';
import { ListBox } from 'primereact/listbox';
import BpmnModeler from 'bpmn-js/dist/bpmn-modeler.development';
import * as processQuery from './../../controller/processquery';
import Projectmodel from '../../model/projectmodel';
import '../../App.css'

export default class Bpmn extends Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
    this.renderBpmnProps = this.renderBpmnProps.bind(this);
    this.clearBpmnProps = this.clearBpmnProps.bind(this);

    this.state = {
      bpmnXml: null,
      elementId: null,
      elementType: null,
      elementName: null,
      preds: [],
      sucs: [],
      inputs: [],
      outputs: [],
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
    this.bpmnModeler.importXML(xml, function (err) {
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

  clearBpmnProps() {
    this.setState( {
      bpmnXml: null,
      elementId: null,
      elementType: null,
      elementName: null,
      preds: [],
      sucs: [],
      inputs: [],
      outputs: [], }
    );
  }

  renderBpmnProps(element) {
    const businessObject = element.businessObject;
    const type = element.type.toLowerCase();

    this.clearBpmnProps();

    this.setState({ elementId: businessObject.id });
    this.setState({ elementName: businessObject.name });
    this.setState({ elementType: type });

    const pred = processQuery.getPredecessor(businessObject);
    const suc = processQuery.getSuccessor(businessObject);
    const dataInput = processQuery.getDataInput(businessObject, this.bpmnModeler);
    const dataOutput = processQuery.getDataOutput(businessObject, this.bpmnModeler);

    // get Preds
    if (pred !== null) {
      let resultPreds = [];
      pred.forEach(item => {
        if (item.name !== undefined) {
          resultPreds.push({ 'label': item.name });
        } else {
          resultPreds.push({ 'label': item.id });
        }
      });

      if (resultPreds !== null) {
        this.setState({ preds: resultPreds });
      } else {
        this.setState({ preds: [] });
      }
    }

    // get Sucs
    if (suc !== null) {
      let resultSucs = [];
      suc.forEach(item => {
        if (item.name !== undefined) {
          resultSucs.push({ 'label': item.name });
        } else {
          resultSucs.push({ 'label': item.id });
        }
      });

      if (resultSucs !== null) {
        this.setState({ sucs: resultSucs });
      } else {
        this.setState({ sucs: [] });
      }
    }

    //get input
    if (dataInput !== null) {
      let inputs = [];
      dataInput.forEach(item => {
        if (item.name !== undefined) {
          inputs.push({ 'label': item.name });
        } else {
          inputs.push({ 'label': item.id });
        }
      });

      if (inputs !== null) {
        this.setState({ inputs: inputs });
      } else {
        this.setState({ inputs: [] });
      }
    }

    //get output
    if (dataOutput !== null) {
      let outputs = [];
      dataOutput.forEach(item => {
        if (item.name !== undefined) {
          outputs.push({ 'label': item.name });
        } else {
          outputs.push({ 'label': item.id });
        }
      });

      if (outputs !== null) {
        this.setState({ outputs: outputs });
      } else {
        this.setState({ outputs: [] });
      }
    }
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
          <div>
            <label>Predecessor flow node</label>
            <ListBox
              style={{ width: '250px' }}
              options={this.state.preds}
            />
          </div>
          <div>
            <label>Succesor flow node</label>
            <ListBox
              style={{ width: '250px' }}
              options={this.state.sucs}
            />
          </div>
          <div>
            <label>Input elements</label>
            <ListBox
              style={{ width: '250px' }}
              options={this.state.inputs}
            />
          </div>
          <div>
            <label>Output elements</label>
            <ListBox
              style={{ width: '250px' }}
              options={this.state.outputs}
            />
          </div>
        </div>
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
