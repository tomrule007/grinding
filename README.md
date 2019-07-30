## Grinding ~ Record your time working towards something.

by Thomas Herzog

---

I am building this app as a way for me to track my weekly progress on becoming a Frontend JavaScript React Developer. I get discouraged if I don't see progress and I wanted a way to show myself I am putting in the work. Relying only on git commits or completed projects to show my effort gives me a warped image in my head.

It is easy to spend many hours on something while seemly getting nowhere progress wise, but that doesn't mean I didn't put in the effort. Talking to other developers I've realized sometimes seemly simple bugs or unknown information just take a while to track and shouldn't be seen as a lack of effort or being lazy. There are also times spent reading or researching that don't lead to a lot of physical results but are an essential part of the learning process.

My hope is this app will let me see I'm putting in the effort and hopefully point me in the direction of which tasks and workflows lead to the best results so I can make sure I'm using my time wisely.

I don't want to be grinding forever.

**Minimum Viable Product (MVP)**

- Single Start/Stop button records timestamps to log file.

**Other Desireable features**

- clock to show current time spent
- graph display to show the total time spent over days
- average time
- hashtags to show where time was spent by category
- use d3 for graphs to make easily exportable to other webpages

---

### `npm run dev`

starts react dev mode and electron dev mode

---

## Issues

**Debian Sandbox Error** on 'npm start' prevents electron from starting up

```
$ npm start

> electron-quick-start@1.0.0 start /home/thomas/JS/electron-quick-start
> electron .

[25637:0730/094022.048291:FATAL:setuid_sandbox_host.cc(157)] The SUID sandbox helper binary was found, but is not configured correctly. Rather than run without sandboxing I'm aborting now. You need to make sure that /home/thomas/JS/electron-quick-start/node_modules/electron/dist/chrome-sandbox is owned by root and has mode 4755.
```

**solution**

```
$ cd node_modules/electron/dist/
$ sudo chown root chrome-sandbox
$ sudo chmod 4755 chrome-sandbox
```

[source](https://www.bountysource.com/issues/73344311-the-suid-sandbox-helper-binary-was-found-but-is-not-configured-correctly)

---

## Resources

- https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3
- https://www.codementor.io/randyfindley/how-to-build-an-electron-app-using-create-react-app-and-electron-builder-ss1k0sfer
- https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
