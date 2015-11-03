Torbit FE Challenge Server
===

Prerequisites
---

* [Node.js](https://nodejs.org) (install with [homebrew](http://brew.sh/) on mac `brew install node`)
* Gulp `npm install -g gulp`
* Bower `npm install -g bower`
* Karma `npm install -g karma-cli`

Getting Started
---

* `git clone https://github.com/buwilliams/torbit-fe.git`
* `cd torbit-fe`
* `npm install && bower install`
* `gulp serve` (or for production: `gulp build && gulp serve:prod`)
* Open browser [http://localhost:9000](http://localhost:9000)

To run unit tests:

* From the root project directory run: `karma start`

Features
---

* Uses the high-quality SB Admin bootstrap theme
* Unit Tests for Controllers and Services
* URL Routes using ui.router
* Production ready build tool using Gulp
* Authentication and custom request logic to support backend
* Sign-in/Sign out screen
* Charts screen to view Time Series Report data
* User Management screen
* Site Configuration screen

Architecture
---

The application consists of three main parts:

1. Foundation - project layout/organization (by feature) and build script (gulpfile.js)
1. Testing Framework - Karma with Jasmine
1. Features (Sign-on, Charts, User Management, and Site Configuration)

Project Tracking
---

You can view the progress on the [TODO.md](https://github.com/buwilliams/torbit-fe/blob/master/TODO.md) page.
