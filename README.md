<a  href="https://www.twilio.com">
<img  src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg"  alt="Twilio"  width="250"  />
</a>

# Twilio Flex Plugin - Network Latency Indicator

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

This plugin is designed to show your users their network health and alert them if we detect that they are seeing increased latency.  As you may know, Flex and many other parts of the Twilio can drastically impact the users experience.  By providing a visual queue, this will help the user know when there may be an application issue or something specific to their network.  Hopefully saving your developers time when attempting to debug a real issue vs environment related challenges.

This Icon is visible at the top of the Flex Header Panel and will change based on their ping/latency
![Plugin Demo](TBD)

## Pre-req

To deploy this plugin, you will need:

- An active Twilio account with Flex provisioned. Refer to the [Flex Quickstart](https://www.twilio.com/docs/flex/quickstart/flex-basics#sign-up-for-or-sign-in-to-twilio-and-create-a-new-flex-project") to create one.
- npm version 5.0.0 or later installed (type `npm -v` in your terminal to check)
- Node.js version 10.12.0 or later installed (type `node -v` in your terminal to check)
- [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli) along with the [Flex CLI Plugin](https://www.twilio.com/docs/twilio-cli/plugins#available-plugins) and the [Serverless Plugin](https://www.twilio.com/docs/twilio-cli/plugins#available-plugins). Run the following commands to install them:
  ```
  # Install the Twilio CLI
  npm install twilio-cli -g
  ```
- A GitHub account

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Navigate to the primary plugin folder and run NPM install for the plugin
```bash
cd plugin-anetwork-latency
npm install
```

From the public folder, create the appConfig.js
```bash
cd public
rename appConfig.example.js to appConfig.js
```

Site Tested
```bash
cd components
within NetworkLatency.js -
 //CHANGEME: Update this to the URL you wish to do pings tests against
 //          this will be called within the checkLatency() function below
const url = "http://localhost:3000"; 

**Future enhancements will be to query and API for standard latency checks but for the alpha release, I have the endpoint as a variable you can change
```

## Development

In order to develop locally, you can use the Webpack Dev Server by running (from the root plugin directory):

```bash
Twilio flex:plugins:start
```

This will automatically start up the Webpack Dev Server and open the browser for you. Your app will run on `http://localhost:3000`. If you want to change that you can do this by setting the `PORT` environment variable:

When you make changes to your code, the browser window will be automatically refreshed.

## Deploy

When you are ready to deploy your plugin, in your terminal run:
```
Run: 
twilio flex:plugins:deploy --major --changelog "Notes for this version" --description "Functionality of the plugin"
```
For more details on deploying your plugin, refer to the [deploying your plugin guide](https://www.twilio.com/docs/flex/plugins#deploying-your-plugin).

## View your plugin in the Plugins Dashboard

After running the suggested next step with a meaningful name and description, navigate to the [Plugins Dashboard](https://flex.twilio.com/admin/) to review your recently deployed and released plugin. Confirm that the latest version is enabled for your contact center.

You are all set to test the Agent Assitance feature on your Flex instance!


---

## Changelog

### 1.0.0

**June 10th, 2021**

- Initial Release of the Network Latency Indicator Plugin


## Disclaimer
This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Twilio bears no responsibility to support the use or implementation of this software.