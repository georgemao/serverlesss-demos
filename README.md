This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview
This project demostrates a reference design for a Serverless web application. The design uses the following implementations:

### Front End deployed to S3. Served via CloudFront
- ReactJS & [Amplify React SDK](https://aws-amplify.github.io/docs/js/react): UI/UX
- Cognito: Security (Userpools, Federation via Google, Amazon, Facebook, and SAML)
- [Amplify Framework](https://aws.amazon.com/amplify/framework/): Development Framework
- [Amplify API](https://aws-amplify.github.io/docs/js/api): API Library

### API Tier
- AppSync (GraphQL API)
- Lambda (Business Logic)

### Data Tier
DynamoDB (Data Storage)

## Steps to Build & Deploy the base application
[Build & Deploy](build.md).

## Steps to add realtime streaming features
[Build & Deploy](realtime.md).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
