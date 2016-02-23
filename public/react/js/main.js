require.config({
  paths: {
    "react" : "lib/react.min"
  }
});

require(['react', 'jsx!components/Timer'], function (React, Timer) {
});
