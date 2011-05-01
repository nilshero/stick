# Stick

Stick is a modular JSGI middleware composition layer and application framework
based on [RingoJS](http://ringojs.org/).

## Overview

Stick provides an `Application` object that can be used to compose web
applications out of JSGI middleware components. Middleware can in turn
define methods or properties on the application object to make itself
configurable to the outside world.

Currently Stick comes with the following middleware modules:

 * basicauth
 * error
 * etag
 * gzip
 * method
 * mount
 * notfound
 * params
 * profiler
 * responselog
 * route
 * session
 * static
 * upload

 Check out the demo applications and documentation to learn more.

## Running

Use the `ringo-admin` command to to install Stick:

    $ ringo-admin install hns/stick

Alternatively, you can manually copy or symlink the stick directory into
the `packages` directory of your ringojs installation.

To start the stick demo application, run `stick/demo.js` with the `ringo` command
in the ringo directory (where build.xml is), add `packages` to module search path:

    $ ringo -m packages stick/demo.js

Then point your browser to <http://localhost:8080/>.

## License

Stick is distributed under the MIT license.
