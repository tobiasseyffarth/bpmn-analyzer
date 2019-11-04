import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Bpmn from '../bpmn/bpmn';
import * as FileIO from '../../controller/fileio';
import Projectmodel from '../../model/projectmodel';
import '../../App.css'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';


export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.openBpmn = this.openBpmn.bind(this);

    this.state = {
      bpmnXml: null
    };
  }

  componentDidMount() {

  }

  async openBpmn() {
    const file = await FileIO.getFile('.bpmn');
    const input = await FileIO.readFile(file);
    this.setState({ bpmnXml: input });
  }

  showGraph() {
    Projectmodel.setGraph('neuer graph');
    console.log(Projectmodel.getGraph());
  }

  logBpmn() {
    console.clear();
    const bpmn = Projectmodel.getBpmn();

    if (bpmn !== null || bpmn !== undefined) {
      console.log(bpmn);
    } else {
      console.log('no bpmn model available');
    }
  }

  render() {
    return (
      <div>
        <div className="menu">
          <Button
            className="menu-button"
            style={{ marginRight: 10 }} 
            label="Open Bpmn" 
            onClick={this.openBpmn}
            tooltip="Open BPMN file and render it."
          />
          <Button
            label="Show Graph" 
            className="menu-button"
            style={{ marginRight: 10 }} 
            onClick={this.showGraph}
          />
          <Button
            label="View Bpmn in console" 
            className="menu-button" 
            style={{ marginRight: 10 }} 
            onClick={this.logBpmn} 
            tooltip="Prints the process object in the console."
          />
        </div>
        <Bpmn
          bpmnXml={ this.state.bpmnXml }
        />
      </div>
    );
  }
}
