
## Step 0: Prereqs

1. [Install Node](https://nodejs.org/en/download/) for your OS
2. Install npx for Node. npx is a package runner for npm. Recent versions of node will include npx. Check by running `npx` in your command prompt.

```
npm install -g npx (sudo if necessary)
```
3. Install the Amplify CLI

```
npm install -g @aws-amplify/cli (sudo if necessary)
```

4. Configure the Amplify CLI. Open a command prompt and type `amplify configure`. Follow the instructions.

## Step 1: Install React dependencies

Make sure you are in a workspace folder

1. Bootstrap your React project

```
npx create-react-app serverless-demos
```

2. Install all React dependencies
```
npm install --save aws-amplify aws-amplify-react aws-appsync graphql-tag react-router-dom semantic-ui-react chart.js react-chartjs-2
```

## Step 2: Deploy the backend (Cognito IDP, Appsync API and Data tier) via CloudFormation

1. Open the CloudFormation console and deploy the provided file `deploy.yml`. There will be 3 parameters you must specify: `APIName`, `APIKey`, `CognitoDomain`.

2. When complete, goto the CloudFormation `outputs` tab and reference all of the values. You will use them later.

## Step 3: Amplify to bootstrap your project && Auto Generate GraphQL queries from the schema

1. In a command line run `amplify init`. This will run through a series of questions. Just accept all defaults. Make sure you use the following values

- Visual Studio Code
- javascript
- react
- src

2. Auto generate the GraphQL queries from the deployed Schema
```
amplify add codegen --apiId [AppSyncApiId from the outputs or from the Appsync console]
```

You should now have a new folder `/src/graphql` and a new file `/src/aws-exports.js`.

## Step 4: Deploy the React UI components

## Step 5: Test

## Step 6: Build

## Step 7: Deploy
