import React, { Component } from 'react';
import { Button } from 'primereact/button';
import BpmnModeler from 'bpmn-js/dist/bpmn-modeler.development';
import Projectmodel from '../../model/projectmodel';
import '../../App.css'

export default class Bpmn extends Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);

    this.state = {
      bpmnXml: null
    };
  }

  /*
  static getDerivedStateFromProps(props, state) {
    if (props.bpmnXml !== state.bpmnXml) {
      
      console.log('new bpmn');

      return {
        bpmnXml: props.bpmnXml
      };
    }
    return null;
  }
*/

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
      }
    });
  }

  click() {
    console.log(this.state.bpmnXml);
  }

  renderBpmnPanel() {
    return (
      <div className="bpmn-panel">
        <p>panel</p>
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
