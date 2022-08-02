# Welcome to Cooper Node Starter Kit

Please go through the full readme to get the context of the codebase and it's superpowers.

## Getting Started

**Setup your app:**

This will allow to set your project name, url and description on package.json and remove existing .git directory

```
npm run setup
```

**Build project:**

```
npm run build:client
```

**Start as developer:**

```
npm run start-dev:watch
```

Start server:

```
npm start
```

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


  - [Linting](#linting)
  - [Testing](#testing)
    - [Unit Tests](#unit-tests)
    - [React Unit Tests](#react-unit-tests)
    - [Behavioral Tests](#behavioral-tests)
    - [Pact Tests](#pact-tests)
    - [Functional Tests](#functional-tests)
    - [Smoke Tests](#smoke-tests)
  - [Setting Your Environment](#setting-your-environment)
  - [Running on IE Virtual Box](#running-on-ie-virtual-box)
- [Code Conventions](#code-conventions)
  - [Use Functional Components](#use-functional-components)
  - [Break into Subcomponents](#break-into-subcomponents)
  - [Embed CSS with Component](#embed-css-with-component)
  - [Naming Conventions](#naming-conventions)
  - [Always use Action Creators](#always-use-action-creators)
  - [Prop Types](#prop-types)
  - [Using Redux Containers](#using-redux-containers)
- [Style Guide](#style-guide)
  - [Colors](#colors)
  - [Typography](#typography)
  - [Buttons](#buttons)
  - [Breakpoints](#breakpoints)
  - [Icons](#icons)
- [Nifty Scripts](#nifty-scripts)
- [Feature Flags](#feature-flags)
- [Localization](#localization)
  - [Server](#server)
  - [Client](#client)
  - [Interpolation](#interpolation)
  - [Testing](#testing-1)
- [Logging](#logging)
  - [Server](#server-1)
  - [Client](#client-1)
- [How to not run CI on a Commit](#how-to-not-run-ci-on-a-commit)
- [Dev Accounts](#dev-accounts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Linting

Javascript is a weird language.  It allows you to do basically anything you want, but that means you can write the same functionality in many different ways.  Linting allows us to maintain a set of conventions so all of our JS code is consistent throughout the project.

We use eslint for this. All of the conventions we have adopted are located in the `.eslintrc.json` file, but the most important ones are below:

* Always use semicolons
* Use an indentation of 2
* Use single quotes for strings
* Do not use `var`; use `const` and `let` instead

We also extend the `airbnb` javascript style guide for react and have defined our own for node.

You can run the linter with the following command.  Running all tests also runs the linter as its first task.

```
npm run lint
```

## Testing

Every good project has tests!  Here we outline our different test suites including why we have them and how to run them.

Our testing tech stack includes:

* Jest: Defines how tests are written
* Enzyme: Partial rendering of pages for React
* JSDOM: Emulate a fake browser environment

You can run all the unit tests with linting using the following command.  Always run this before pushing code!

```
npm test
```

### Unit Tests

Our unit tests test individual functions in isolation to ensure they have the correct functionality.  Run them with:

```
npm run test:unit
```

Unit tests go in the `test/unit` folder.  The folder the test ends up in should mirror where it is in the actual source.  Additionally, all tests should end in `.spec.js`.

### React Unit Tests

Unit tests for react components go here.  They are separate from regular unit tests because some components require a fake browser which JSDOM provides.  Run them with:

```
npm run test:react
```

We use these tests to primary test three things:

* That the component renders (aka. doesn't crash)
* That critical props are rendered correctly (for instance, lists)
* That branched rendering logic is accurate

These tests go in the `test/unit/client/javascripts/components` folder, and the files must end in `.spec.jsx`.

The `test/setup.js` file is used to configure JSDOM.  If you need to change any browser configuration stuff, go there.

### Server Unit Tests

Unit tests for server go here. Run them with:

```
npm run test:app
```

We use these tests to primary test three things:

* Test server utils and functions
* Test external api calls

These tests go in the `test/unit/app` folder, and the files must end in `.spec.jsx`.

### Functional Tests

Functional tests validate the integration point between the frontend client and the node server.  External APIs and dependencies are stubbed out.

These tests go in the `test/functional` folder.  They run using testcafe by running the entire app with a fake session.

There are 3 modes of running functional tests

* Headless
* Browser
* CI

#### Headless

This mode runs the functional test without a functional UI and instead uses `chrome driver` to run the tests in the shell.

```
npm run test:functional
```

#### Browser

This mode runs the functional testby opening a browser session

```
npm run test:functional:watch
```

#### CI

This mode runs the functional test in the build pipeline it's optimized for sandbox environments

```
npm run test:functional:ci
```

Take look at `test/functional/journeys/sample.spec.js` for a sample functional test

Please refer to [testcafe](https://devexpress.github.io/testcafe/documentation/test-api/) documentation on writing functional tests

## Setting Your Environment

To unset all environment variables:

```
source unset_env.sh
```

To source a particular environment:

```
source env/qa.sh
```

# Code Conventions

To help keep our velocity high, we have some code conventions.  These allow the codebase to be self-consistent so new people looking through the code do not get lost and can be comfortable modifying the code.

Please follow these conventions whenever possible!

## Use Functional Components

When applicable, use functional components rather than extending `React.Component`.  Only extend `React.Component` when the React lifecycle methods (like `componentDidMount`) is needed.

**DO:**

```js
const MyComponent = ({prop1, prop2}) =>
  <div>
  </div>;
```

**DO NOT:**

```js
class MyComponent extends React.Component {
  render() {
    return <div></div>;
  }
}
```

*Note: ESLint should enforce this for you.*

## Break into Subcomponents

When a component becomes sufficiently complex, break it into smaller subcomponents.  This is in contract to using render functions.  Subcomponents that are *specific to the master component* can be put in the same folder.  For an example of this, see the LoanProgess component.

Breaking into smaller subcomponents allows each file to be smaller and therefore simpler to both digest and modify.  It is also more semantic and creates higher reusability throughout the code.

**DO:**

```js
const MyComponent = () =>
  <div class='my-component'>
    <MySubComponent />
    <MySubComponent />
  </div>;
```

**DO NOT:**

```js
const MyComponent = () =>
  <div class='my-component'>
    {renderSubComponent()}
    {renderSubComponent()}
  </div>;

const renderSubComponent = () => <span></span>;
```

## Embed CSS with Component

Put the CSS of a component with the component's folder *rather than* in the `styles` folder.  We prefer this over the typical SASS-partials pattern since it makes components more independent and organized.

## Naming Conventions

* All non-component files are named in kebab-case.  For example, `loan-progress.js`.
* All components are folders named in CapitalCamelCase.  Inside the folder are the following:
 * The component itself (`MyComponent.jsx`).  Note the extension is `*.jsx`; this indicates the file contains JSX syntax.
 * The index file (`index.js`).  This simply outputs the component.
 * *Potentially* a redux container file (`MyComponent.container.js`).
 * *Potentially* a CSS file (`MyComponent.style.scss`).

## Always use Action Creators

Always use an action creator when dispatching an action.  This makes the code more flexible and refactoring redux actions easier.

**DO:**

```js
dispatch(showModal());
```

**DO NOT:**

```js
dispatch({ type: SHOW_MODAL });
```

## Prop Types

Always use prop types when a component has props, including redux-connected components.  Additionally, avoid using `PropTypes.object`!  We prefer using `PropTypes.shape` so we know what the object looks like.  Remember that the purpose of prop types is to *document how to use a component*, not to catch type errors at runtime.

We store complex custom prop types in `client/javascripts/utils/proptypes-mapper`.

**DO:**

```js
MyComponent.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number
    name: PropTypes.string
  })
};
```

**DO NOT:**

```js
MyComponent.propTypes = {
  info: PropTypes.object
};
```

## Using Redux Containers

Often, components need to access Redux state.  To do so, the component either needs to be connected to the store or receive a prop from a parent component that is itself connected.  But when do you choose which strategy to use for the component you are writing?

As a goal, we want to minimize the number of connected containers in our project.  To help with this, follow the below general guidelines:

* Page components, like `App`, should be connected to the store since they are the highest-level component for a given page and can therefore pass parts of its state to children as props.
* Reusable interactive components should be connected to state.  An example is `Accordions`.
* Reusable business-oriented components should be connected to state.  If a component only makes sense in the context of some business state and it is reused, then it should be connected in order to minimize confusion of its use.
* Most other components should **not** be connected to state.

# Style Guide

We use [this style guide](http://coop-style.herokuapp.com/index.html).  It shows what colors things should be, how buttons and notifications should look, and so on.  Never hardcode your own colors.  Always refer to the style guide.

Our style guide is (supposed to be) encoded into our codebase via SASS mixins.  In the `client/styles` folder are a bunch of partials meant to represent different parts of the guide.  Here we show how we expect these mixins to be used.

## Colors

All color mixins are defined in the `_palette.scss` partial.  In order to define a color in your CSS, use the following:

```css
@import '~styles/palette';

.class {
  @include color-primary(PROP_NAME, SHADE);
}
```

The `PROP_NAME` is the name of some property, such as `color`, `background-color`, and so forth.  `SHADE` is one of the shades defined on the style guide.  If, for instance, you need the White 40% of the primary color, `SHADE` would be `white40`.  By default, `SHADE` will be `baseline`.

```css
@include color-primary(color, white40);
```

In the palette, you will see a variety of different mixins for each of the primary color groups along with some specific colors used periodically throughout our site.

## Typography

All typography mixins are in the `_typography.scss` partial.  To use it, do:

```css
@import '~styles/typography';

.header {
  @include typography-h1;
}
```

The set has two types of mixins.

Generic mixins are available for defining the font family, size, and weight.  If, for example, all you want is to make something have the "lg" font size, then include `typography-lg`.  All the current font settings as defined by the style guide are at the top of the typography file.

Presets are also provided and come straight from the style guide, with each row being represented by a preset of the appropriate name.  Custom presets can be created as needed, but most styles should conform directly to the style guide.

Some presets have variations which are provided as arguments to the mixin.  For example, "h1" headers can have either the Sentinel font or be blue in color.

```css
.class {
  @include typography-h1;                   // Default header
  @include typography-h1(serif);            // Sentinel header
  @include typography-h1(sans, secondary);  // Blue header
  @include typography-h1(serif, secondary); // Sentinel blue header
}
```

## Breakpoints

We use breakpoints as defined by Foundation Sites.  The exact values are:

* Small: < 576px
* Medium: 576px - 767px
* Large: 768px - 1023px
* XLarge: > 1024px

Mobile is considered Small (less than the Medium breakpoint).

In order to use screen-specific CSS, use the `breakpoints` partial:

```js
@import 'breakpoints';

.class-name {
  @include breakpoints-small {
    padding: 0;
  }
}
```

# Nifty Scripts

These scripts can be very helpful.

**Create a component:**

This creates a component skeleton along with a test.

```
npm run components:create NameOfComponent
npm run components:create Component/SubComponent
```

# Feature Flags

Front-end components can be easily toggled with the `FeatureFlag` component.  Simply specify the name of the flag, and the feature will be visible if the flag is set to `true` on the backend.

```js
<FeatureFlag flag='nameOfFlag'>
  <MyComponent />
</FeatureFlag>
```

If the flag does not exist, the feature will be hidden by default.

# Localization

ALL static text content should be extracted to `static_content` folders and files.  To add static content, simply add a key to the object and put the text.

In order to summon static content, use our localization methods.

## Server

In server code, we have a method for fetching static content.

```js
const L = require('../utils/localization');

L.t('Overview.path.to.content');
```

## Client

In client code, we have a method for fetching static content as well as a `Locale` component.

```js
import L from 'client/javascripts/utils/localization';
import Locale from 'client/javascripts/components/Locale';

<Header title={L.t('Overview.path.to.content')} />;
<Locale path='Overview.path.to.content' />
```

In general, use the component when defining text as a child of some other component, and use the function when the text is being passed as a prop to another component.  The `<Locale />` component is nice because it will also render simple HTML tags if the tags are specified in the static content files.

## Interpolation

The localization supports interpolation.  Say you have the following data file:

```js
export default {
  field: 'I have ${apples} apples.'
}
```

You can substitute the variable by using a values object:

```js
L.t('Page.field', { apples: 5 });
<Locale path='Page.field' values={{ apples: 5 }} />
```

# Logging

Logging is a wonderful thing. It's what allows us to have paper.  Oh, sorry, I meant paper**work**.  Paperwork, because you're probably using logging to debug a production issue, and you'll probably need to write a post mortem or something.  You have my sympathy.

Here is how to add logging to our app.  Currently, we only support log levels of `info` and `error`.

## Server

A logger object exists on the request context.  Use the logger helper util to use the context and log a message:

```js
const { log } = require('../utils/helpers');

// ...

log(req.context, 'some string');
```

To use this logger in deeper layers of the code, you need to pass the context object down.  To notify airbrake, you need to add an additonal statement:

```js
const airbrake = require('../service/airbrake');

// ...

airbrake.notify('stuff');
```

## Client

Client-side logging is done through redux.

We have two types of client-side logging.
1. **Info** - Redux queues info logs and sends them periodically to the server. In order to add a log message to queue, you need to dispatch a redux action.

2. **Error** - Redux instantly sends error logs to the server. _(No queues here)_

**_Note:_** _Be judicious when using error logs, as too much of it may hit the performance of the app_

Here is an example of how to log with redux-saga:

```js
import { logger } from 'client/javascripts/actions';
import { LogTypes } from 'client/javascripts/constants';
import { createLogDetails } from 'client/javascripts/utils/logger';

const funky = function*() {
  yield put(logger.info({ // or logger.error
    type: LogTypes.SAGA,
    where: 'funky',
    message: 'Hey, the user drank a coffee'
  };

  // OR

  yield put(logger.info(createLogDetails('funky', LogTypes.SAGA, options)));
}
```

The action creator takes in an `options` object with the following possible parameters, none of which are required:

```
{
  type: saga or component
  where: method or function the exception occurred in
  message: string describing the problem
  response: {
    status: HTTP status code
    data: Server response object
  }
  stack: a stack trace
}
```

There is also a `Log` component that helps with logging at a component level.

```js
// Info Log
<Log info={info} where='SomeComponent' >
  <Thingy />
</Log>

// Error Log
<Log error={error} info={info} where='SomeComponent' >
  <Thingy />
</Log>
```

All info logs on the client are stored into a queue and pushed to the server every so often and upon page close.  You can manually push to the server by dispatching the `FLUSH_LOG_QUEUE` action.

