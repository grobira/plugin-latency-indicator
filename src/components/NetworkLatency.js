import * as React from 'react';
import axios from "axios";
import WifiIndicator from 'react-wifi-indicator';

// Used for the custom redux state
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions as LatencyStatusAction, } from '../states/LatencyState';

import { withTheme, Notifications, NotificationType } from '@twilio/flex-ui';

//CHANGEME: Update this to the URL you wish to do pings tests against
//          this will be called within the checkLatency() function below
const url = "http://localhost:3000";

// This is leverage in our axios called to the website to convert the time
// in the response
const axiosTiming = (instance) => {
  instance.interceptors.request.use((request) => {
    request.ts = Date.now();
    return request;
  });

  instance.interceptors.response.use((response) => {
    const timeInMs = Number(Date.now() - response.config.ts).toFixed();
    response.latency = timeInMs;
    return response;
  });
};
axiosTiming(axios);

class NetworkLatency extends React.Component {

  // getting props
  constructor(props) {
    super(props);
  }

  // Ping the URL below and then store that as the ping value
  // We will also set the redux state with that value
  checkLatency = () => {
    let ping = this.props.ping;
    axios.get(url)
    .then(response => {
      ping = response.latency;
      console.error(ping);
      this.props.setLatencyStatus({ 
        ping: ping,
      });
    })
    .catch((error) => {
      console.log(error);
    });
    // Evaluating based on the ping (in miliseconds), set the redux state and we will use this to manipulate the color/icon
    //TODO: remove the console.errors they are there just for testing
    if (ping >= 25) {
      console.error(`Ping = ${ping}ms - this is considered red`);

      // Generate a random ID we will use for the alert
      // Registering the notification with the ID being the Agent's full name and alert string as content
      let alertID = `ID:${Math.floor(Math.random() * 1000)}`;
      Notifications.registerNotification({
        id: alertID,
        closeButton: true,
        content: "Weak Network Connection Detected",
        type: NotificationType.warning,
        timeout: 8000,
      });
      // Fire off the Notification we just registered
      Notifications.showNotification(alertID);
      // Delete the alert, the alert will still show in the UI but this gives the ability
      // register a new notification if we wish
      Notifications.registeredNotifications.delete(alertID);

      // You could also consider a browser specific alert pop up - from "//" for the alert to test
      // Alert that we've detected a weak network connections
      // alert("Weak Network Connection Detected");

      this.props.setLatencyStatus({ 
        latencyStatus: 'WEAK',
        latencyText: `Latency ${ping}ms - Weak Connection`,
        latencyColor: '2px solid red'
      });
    } else if (ping >= 7 ) {
      console.error(`Ping = ${ping}ms - this is considered orange`);
      this.props.setLatencyStatus({ 
        latencyStatus: 'OKAY',
        latencyText: `Latency ${ping}ms - Average Connection`,
        latencyColor: '2px solid orange'
      });
    } else {
      console.error(`Ping = ${ping}ms - this is considered green`);
      this.props.setLatencyStatus({ 
        latencyStatus: 'EXCELLENT',
        latencyText: `Latency ${ping}ms - Execellent Connection`,
        latencyColor: '2px solid green'
      });
    }
  }

  //TODO: Remove this is just for testing to allow a onClick to disable the ping
  turnOffPing = () => {
    clearInterval(this.props.intervalID);
  }

  // Mount and set the interval on how often to do a ping/latency test
  componentWillMount() {
    this.checkLatency();

    this.props.setLatencyStatus({ 
      intervalID: setInterval(this.checkLatency.bind(this), 10000)
    });
  }

  // Clear the interval upon unmount of the component
  componentWillUnmount() {

    clearInterval(this.props.intervalID);
  }

  render() {
    // Pulling redux state to use for the return/render
    let latencyStatus = this.props.latencyStatus;
    let latencyText = this.props.latencyText;
    let latencyColor = this.props.latencyColor;

    return (
      <WifiIndicator 
        strength={latencyStatus}
        style={{
          height: 20,
          borderRadius: 10,
          border: latencyColor,
          padding: 4,
        }}
        title={latencyText}
      />
    );
  }
}

// Mapping State to Props
const mapStateToProps = (state) => {

  // We will use this for ping/latency
  const customReduxStore = state?.['network-latency'].networkLatency;
  const ping = customReduxStore.ping;
  const intervalID = customReduxStore.intervalID;
  const latencyStatus = customReduxStore.latencyStatus;
  const latencyText = customReduxStore.latencyText;
  const latencyColor = customReduxStore.latencyColor;

  return {
    ping,
    intervalID,
    latencyStatus,
    latencyText,
    latencyColor
  };
};

// Mapping dispatch to props as I will leverage the setBargeCoachStatus
// to change the properties on the redux store, referenced above with this.props.setBargeCoachStatus
const mapDispatchToProps = (dispatch) => ({
  setLatencyStatus: bindActionCreators(LatencyStatusAction.setLatencyStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(NetworkLatency));