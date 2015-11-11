var express = require('express')
    app = new express();

    app.use(express.static(__dirname + '/public'));
    app.listen(process.env.PORT || 3000);
