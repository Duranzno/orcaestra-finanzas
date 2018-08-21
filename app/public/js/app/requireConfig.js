requirejs.config({
  // "baseUrl": "js/lib",
  "paths": {
    "app": "/public/js/app",
    "jquery": [
      "https://code.jquery.com/jquery-3.3.1.min",
      "/public/js/lib/jquery-3.3.1.slim.min",
    ],
    "bootstrap": [
      "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.bundle.min",
      "/public/js/lib/bootstrap.bundle.min",
    ],
    "datatables.net": [
      "/public/js/lib/datatables.min"
    ],
    "feather-icons": [
      "https://unpkg.com/feather-icons@4.7.3/dist/feather.min",
      "/public/js/lib/feather.min"
    ],
    "bootstrap-datepicker": [
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min",
      "/public/js/lib/bootstrap-datepicker.min"
    ]
  },
  "shims": {
    'bootstrap': {
      deps: ['jquery']
    },
    'bootstrap-datepicker': {
      deps: ['jquery', 'bootstrap'],
      exports: "$.fn.datepicker"

    },
    'datatables.net': {
      deps: ['bootstrap', 'jquery']
    },
  }
});

// Load the main app module to start the app
requirejs(["/public/js/app.js"]);
