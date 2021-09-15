
import { Actions as LatencyStatusAction, initialState } from '../states/LatencyStatus';


export const registerEvent = (manager) => {
    manager.voiceClient.on('connect', (connection) => {

        connection.on('warning', (warningName, warningData) => handleBadConnection(manager, warningName, warningData))

        connection.on('warning-cleared', () => handleBackToStableConnection(manager))

        connection.on('sample', (rtcSample) => handleNetworkStatusSample(manager, rtcSample))
    })

    manager.voiceClient.on('disconnect', () => {
        manager.store.dispatch(LatencyStatusAction.setLatencyStatus(initialState))
    })
}


const handleBadConnection = (manager, warningName, warningData) => {
    console.log("Warning Bad Connection", warningName, warningData)
    manager.store.dispatch(LatencyStatusAction.setLatencyStatus({
        latencyStatus: 'WEAK',
        latencyText: `Weak Connection`,
        latencyColor: '2px solid red'
    }))
}

const handleBackToStableConnection = (manager) => {
    manager.store.dispatch(LatencyStatusAction.setLatencyStatus({
        latencyStatus: 'OKAY',
        latencyText: `Average Connection`,
        latencyColor: '2px solid orange'
    }))
}

const handleNetworkStatusSample = (manager, rtcSample) => {
    //Evaluate the rtcSample generated every second to trigger your own custom threshold logic that drives UI behavior
    if (rtcSample.jitter <= 1 && rtcSample.packetsLost <= 1) {
        manager.store.dispatch(LatencyStatusAction.setLatencyStatus({
            latencyStatus: 'EXCELLENT',
            latencyText: `Execellent Connection`,
            latencyColor: '2px solid green'
        }))
    } else {
        manager.store.dispatch(LatencyStatusAction.setLatencyStatus({
            latencyStatus: 'OKAY',
            latencyText: `Average Connection`,
            latencyColor: '2px solid orange'
        }))
    }
    console.log(rtcSample.jitter, rtcSample.packetsLost)
}