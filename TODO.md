TODO
===

In-progress
---



Backlog
---

* tests for report controller
* tests for report factory
* tests for site administrator factory
* tests for site administrator controller
* tests for AuthFactory
* tests transformBody in signon-ctrl.js
* tests to utils-factory find()
* angular validation on config editor

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
* tests for users controller
* tests for users factory
* validation for email on users table
* fix chart going off the screen on smaller browser windows
* CRUD of Site Configurations
* fixed refresh on editor edge case
* support SD Admin bootstrap theme in gulpfile build task
* fix request bug when you first signon and don't do a refresh

Clean-up and Wishlist
---

* cache buster for build assets (css, js, etc.)
* automatically source in angular controllers and services as part of `gulp serve`
* format dates on chart
* make charts mobile frendly
* updating the current user should also update the UI
