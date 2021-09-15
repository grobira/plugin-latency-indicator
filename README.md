# Latency Indicator plugin for Twilio Flex

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

This repo were forked from [plugin-latency-indicator](aestellwag/plugin-latency-indicator), but here I changed the strategy from pooling ping information from a Twilio Function to listen to events emitted from connection while on a Voice Client. So different from the forked plugin, this one only gather and show the latency/internet results while on a voice call. The reason behind this, is that I only want to know the quality of the internet when on a call, so the agent can receive this feedback in real time and understand whats is happening to his calls. Also pooling ping from Functions has a drawback of needing to implement that Functions, which will also count towards the Function concurrent limit, of course is not a heavy process, but since a few customer already had issues with Functions limit, I think having a strategy that doesn't rely on Function would be better.

Rigth now, the status of the indicator will listen to connections events. - For `warning` events indicator will show red signal and a notification about weak connection. - For `warning-cleared` events indicator will change to orange status. Demonstrating that connection has been stable for a while. - For `sample` events, which are emitted with a few seconds interval while on a call, we evaluate `jitter` and `packetsLost` attributes, if the results are good, indicator will be green, if don't it will be stay on orange.

The `sample` event is advisable to configure as you want, rigth now the behavior is to demo this feature, but in a real case scenario you will probably want to have green, orange and red signal handled inside this events. The values for the thresholds can change for different cases, is up to whatever would use this to configure as the need.

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd

# If you use npm
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex@beta
```

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.
