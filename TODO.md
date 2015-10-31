TODO
===

In-progress
---

* add cookie on sign-on
* make ui menu understand signed-in/signed-out

Backlog
---

* CRUD of User Management
* CRUD of Site Configurations
* write unit tests for $u factory
* write unit tests for report controller
* write unit tests for report factory
* write unit tests for user controller/factory
* write unit tests for site administrator controller/factory
* support SD Admin bootstrap theme in gulpfile build task
* test transformBody in app.js

Done
---

* login screen
* validate email and password on sign-on screen (provided by angular)
* add interceptor logic to handle requests that aren't authenticated anymore
* time series chart
* write unit tests for signon controller
* integrate SD Admin bootstrap theme
* use ui.router for nested routes

Clean-up and Wishlist
---

* set cookie on successful sign-on
* check for auth cookie presence and redirect to sign-on screen
* cache buster for build assets (css, js, etc.)
* automatically source in angular controllers and services as part of `gulp serve`
* format dates on chart
