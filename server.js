const app = require('./app')

/// Port ///
const port = 3000;

app.listen(port, () => {
    console.log(`App runing on port ${port}`);
});