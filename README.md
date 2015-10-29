Torbit FE Challenge Server
===

Prerequisites
---

* [Node.js](https://nodejs.org) (install with [homebrew](http://brew.sh/) on mac `brew install node`)
* Gulp `npm install -g gulp`
* Bower `npm install -g bower`

Getting Started
---

* `git clone https://github.com/buwilliams/torbit-fe.git`
* `cd torbit-fe`
* `npm install && bower install`
* `gulp serve` (or for production: `gulp build && gulp serve:prod`)
* Open browser [http://localhost:9000](http://localhost:9000)

Architecture
---

The application consists of five main features:

1. Foundation - project layout/organization (by feature) and build script (gulpfile.js)
1. Testing Framework - Karama with Jasmine
1. Features (login, report, site configuration, and user management)
