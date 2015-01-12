Package.describe({
    summary: "Meteorite package for adding handwritten script fonts to Meteor apps (not cursive fonts)."
});

Package.on_use(function (api) {
    api.add_files('AlexBrush-Regular.ttf', "client");
    api.add_files('fonts-calligraphy.css', "client");
});
