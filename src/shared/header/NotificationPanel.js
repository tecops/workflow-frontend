import React, { Component } from 'react';
import {
  Collapse,
  Button,
  CardBody,
  CardHeader,
  Card,
  Table,
  Row
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './notificatinPannel.css';

const TodayDay = 'Today';
const NextWeek = 'Next Week';
const NextMonth = 'Next Month';

const TodayNotification = 0;
const NextWeekNotification = 0;
const NextMonthNotification = 0;

class NotificationPannel extends Component {
  state = {
    // viewToday: true,
    // viewLastWeek: false,
    // viewPevious: false
  };
  notificationData = [
    'notific 01',
    'notific 02',
    'notific 03',
    'notific 04',
    'notific 05',
    'notific 06',
    'notific 01',
    'notific 02',
    'notific 03',
    'notific 04',
    'notific 05',
    'notific 06',
    'notific 07'
  ];
  // toggle() {
  //   this.setState({
  //     collapseToday: !state.collapse
  //   });
  // }

  state = {};

  getNotifications() {
    return this.notificationData.map(notification => (
      <tr key={notification}>
        <td>{notification}</td>
      </tr>
    ));
  }
  render() {
    // const { viewToday, viewYesterday, viewPrevious } = this.state;
    return (
      <React.Fragment>
        <Card id="mainDev">
          {/* <CardHeader></CardHeader>
          <CardBody> */}
          <Table responsive striped id="notificationTable">
            {this.getNotifications()}
          </Table>
          {/* </CardBody> */}
        </Card>
      </React.Fragment>
    );
  }
}

export default NotificationPannel;
