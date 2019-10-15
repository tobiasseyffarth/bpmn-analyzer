import React, { Component } from 'react';
import './App.css';
import Menu from './view/menu/menu';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Menu></Menu>
            </div>
        );
    }
}
