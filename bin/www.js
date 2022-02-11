const app = require('../index');
const syncdb = require('./sync-db');

syncDb().then(_=> {
    console.log('Sync database');
    app.listen(3000, function(){
        console.log('Server is running');
    });
})

