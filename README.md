
# tom-ui

## Requirements

List of requirements used in the project and installation instructions when
necessary.

- `node` v6.2.x
- `eslint`, `babel-eslint` and `eslint-plugin-react` node modules installed
  globally

## Installation on Mac OS X

```shell
npm i
```

## Run the project

```shell
npm run serve
```

Then just have open [http://localhost:8080/](http://localhost:8080)

## Tests

```shell
npm test
```

If you want the test to run everytime you modify a file:

```shell
npm run test:watch
```

## Commands

- `npm run build`: Build the project.
- `npm run coverage`: Get the project code coverage. Open
`.coverage/lcov-report/index.html` in your browser to get the full coverage
report details.
- `npm run lint`: Lint the project and look for syntax and coding style errors.
- `npm run serve`: Start the Webpack development server.
- `npm run test`: Run the tests.
- `npm run test:watch`: Run the tests after each file modification.
