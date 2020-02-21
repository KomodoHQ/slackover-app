# Slackover 

Slackover is a live chat client, with notification integration. Think [Slack](https://slack.com/intl/en-gb/) crossed with [Pushover](https://pushover.net/).

## What's Already In The Box?

What we've written so far is a very quick proof of concept chat application (written in [React](https://reactjs.org/) and powered by [Firebase](https://firebase.google.com/)). It includes:

 - Authentication via email and password, using [Firebase Authentication](https://firebase.google.com/docs/auth) and [Firebase React Web UI](https://github.com/firebase/firebaseui-web-react)
 - Sending and Receiving messages using [Firebase Firestore](https://firebase.google.com/docs/firestore/)
 - A cloud function integration point, powered by [Firebase Functions](https://firebase.google.com/docs/functions) to be able to integrate with third parties such as Pushover or Twilio - which automatically parses commands entered into the chat panel.

## What's Missing & The Challenge!

The challenge for today is to help us build upon this proof of concept, in any sensible way. So whats missing? **Everything!**. 

Some ideas for what you could do:

 - Making the web app more useable, presentable and eye catching.
 - Starting a new app from scratch such as a desktop app using [Electron](https://www.electronjs.org/)
 - Adding features like Channels, user profiles, photo uploads
 - Create a cloud function integration to integrate a notification service. Some examples of what you might want to send a message to:
   - Email (maybe integrate a SMTP mailer service like [Mailgun](https://www.mailgun.com/))
   - SMS (something like [Twilio](https://www.twilio.com/)
   - Push Notifications (how about [Pushover](https://pushover.net/))
   - Twitter ([check out their API](https://developer.twitter.com/en/docs])
   - Slack ([check out their API](https://api.slack.com/))
 - Add [Giphy support](https://developers.giphy.com/) to send gifs to other users
 - Add [location support](https://developers.google.com/maps/documentation) to send locations with a map preview to other users
 - Create a new way of sending messages to the chat - for example an [Alexa Skill](https://developer.amazon.com/en-GB/docs/alexa/ask-overviews/build-skills-with-the-alexa-skills-kit.html)
 - Add some automated tests, using [Jest](https://jestjs.io/), [React testing library](https://github.com/testing-library/react-testing-library) or [Cypress](https://www.cypress.io/)
 - Improve the code quality - maybe integrate tools such as [CodeClimate](https://codeclimate.com/)
 - Setup a CI / CD pipline

Really, it's up to you what you would like to do to help improve the project. 

## Where do I start?

1. Fork this project into your own [GitHub](https://github.com/) repo.
2. Register for your own free [Firebase account](https://firebase.google.com/) and Register a web app (dont forget to copy your keys).
3. Replace the appropriate keys for your firebase account in `src/api/index.js`.
4. (Optional) - If you want to work on the backend to add a notification service, follow the instructions to setup the [Firebase CLI](https://firebase.google.com/docs/functions/get-started) and login.
5. Enable the [Firebase authentication](https://firebase.google.com/) module using email and password.
6. Create a [Firebase firestore](https://firebase.google.com/) called `messages`. To do this you can add a test message using the data properties as shown in `src/store/store.js`.
7. Make sure you have installed [node 12 LTS](https://nodejs.org/en/download/) and [yarn](https://yarnpkg.com/).
8. Open the project folder, and type `yarn && yarn start`. Test you can register and login.
9. You will need to add a missing database index at this stage. Open the browser developer console, and follow the provided link to add the composite index.
10. Test you can send and receive messages.
11. Get cracking with your awesome new feature!
12. If you get to a point where you're happy with what you've build, open a Pull Request back to us, and we can review what you've done!

## Helpful Resources

 - [Firebase API reference](https://firebase.google.com/docs/reference)
 - [React docs](https://reactjs.org/docs/)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.