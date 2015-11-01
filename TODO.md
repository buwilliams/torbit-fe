TODO
===

In-progress
---

* CRUD of User Management

Backlog
---

* CRUD of Site Configurations
* tests for report controller
* tests for report factory
* tests for user controller/factory
* tests for site administrator controller/factory
* tests for AuthFactory
* tests transformBody in app.js
* support SD Admin bootstrap theme in gulpfile build task

Done
---

* login screen
* validate email and password on sign-on screen (provided by angular)
* add interceptor logic to handle requests that aren't authenticated anymore
* time series chart
* write unit tests for signon controller
* integrate SD Admin bootstrap theme
* use ui.router for nested routes
* write unit tests for $u factory
* add localStorage for sign-on
* make ui menu understand signed-in/signed-out
* fixed broken tests caused by ui.router and $u throws

Clean-up and Wishlist
---

* set cookie on successful sign-on
* check for auth cookie presence and redirect to sign-on screen
* cache buster for build assets (css, js, etc.)
* automatically source in angular controllers and services as part of `gulp serve`
* format dates on chart
