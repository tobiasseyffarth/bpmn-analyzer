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
    const file = await FileIO.getFile();
    const input = await FileIO.readFile(file);
    this.setState({ bpmnXml: input }, () => {
      // console.log(this.state.bpmnXml);
    });
  }

  showGraph() {
    Projectmodel.setGraph('neues graph');
    console.log(Projectmodel.getGraph());
  }

  logBpmn() {
    Projectmodel.setBpmn('neues BPMN');
    console.log(Projectmodel.getBpmn());
    let i = 5;
    console.log(i);
  }

  render() {
    return (
      <div>
        <div className="menu">
          <Button className="menu-button" style={{ marginRight: 10 }} label="Open Bpmn" onClick={this.openBpmn} />
          <Button label="Show Graph" className="menu-button" style={{ marginRight: 10 }} onClick={this.showGraph} />
          <Button label="View Bpmn in console" className="menu-button" style={{ marginRight: 10 }} onClick={this.logBpmn} />
        </div>
        <Bpmn
          bpmnXml={this.state.bpmnXml}
        />
      </div>
    );
  }
}
