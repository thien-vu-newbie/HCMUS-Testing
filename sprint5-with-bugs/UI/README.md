# GUI Testing

## How to create Percy account and set up Percy Project

Create a Browserstack account

Log in to Percy account using Browserstack

Create a new Project

Export Percy token into session terminal

Now Session is ready

## How to test using Cypress (Percy is optional, will be more useful after expanding the testing parts)

Preconditions: The app must be running (run the app then init database like in the README at project root)

Create .env in sprint5-with-bugs/API

copy .env.exmample content into that .env file

In this directory, run `npm install --legacy-peer-deps`

2 ways to test: `npm run test:percy` for headless mode Percy capture, `npx cypress open` for direct browser testing (this won't use Percy)


