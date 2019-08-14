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

\*All scripts come from the [Electron-React-Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) that this project is built from\*

## Install

First, clone the repo via git:

```bash
git clone https://github.com/tomrule007/grinding.git
```

And then install the dependencies with [yarn](https://yarnpkg.com/).

```bash
$ cd grinding
$ yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

## Building & Running

\*Another way to test the app before building the package.

```bash
$ yarn build
$ yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
$ yarn package
```

## For more Script Information

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)
