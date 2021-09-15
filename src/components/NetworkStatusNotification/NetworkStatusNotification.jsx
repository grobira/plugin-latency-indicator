
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WifiIndicator from 'react-wifi-indicator';
import { Actions as LatencyStatusAction, } from '../../states/LatencyStatus';
import { withTheme, Notifications, NotificationType } from '@twilio/flex-ui';




class NetworkStatusNotification extends React.Component {

    notificateWeakSatus() {
        const alertID = "weakStatus"
        Notifications.registerNotification({
            id: alertID,
            closeButton: true,
            content: "Network Connection Issues Detected",
            type: NotificationType.warning,
            timeout: 8000,
          });
          // Fire off the Notification we just registered
          Notifications.showNotification(alertID);
          Notifications.registeredNotifications.delete(alertID);
      }

    render() {
        // Pulling redux state to use for the return/render
        let latencyStatus = this.props.latencyStatus;
        let latencyText = this.props.latencyText;
        let latencyColor = this.props.latencyColor;

        if(latencyStatus === "WEAK"){
          this.notificateWeakSatus()
        }

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
    const latencyStatus = customReduxStore.latencyStatus;
    const latencyText = customReduxStore.latencyText;
    const latencyColor = customReduxStore.latencyColor;

    return {
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


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(NetworkStatusNotification));