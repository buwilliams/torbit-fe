TODO
===

In-progress
---

* tests for users controller
* tests for users factory

Backlog
---

* CRUD of Site Configurations
* tests for report controller
* tests for report factory
* tests for site administrator factory
* tests for site administrator controller
* tests for AuthFactory
* tests for users controller
* tests transformBody in app.js
* support SD Admin bootstrap theme in gulpfile build task
* tests to utils-factory find()

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
* CRUD of User Management
* validation for email on users table
* fix chart going off the screen on smaller browser windows

Clean-up and Wishlist
---

* cache buster for build assets (css, js, etc.)
* automatically source in angular controllers and services as part of `gulp serve`
* format dates on chart
* make charts mobile frendly
* updating the current user should also update the UI
