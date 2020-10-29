import React, { Component } from "react";
import EmployeeNavigation from "../EmployeeNavigation";
import {Accordion,Card} from 'react-bootstrap';
import FoodMenu from './FoodMenu';

class MenuView extends Component {
  constructor(props) {
    super(props);
    this.state = { munes: [] };
  }

  render() {
    return (
      <div>
        <EmployeeNavigation />
        <h3>Let's rendering food</h3>
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Food Category
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Hello! I'm the body
              <FoodMenu />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Drink Category
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default MenuView;
