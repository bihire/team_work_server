// const authRoutes = require('./routes/auth');
// const propertyRoutes = require('./routes/property');
// const flagRoutes = require('./routes/flag');
const articleRoutes = require('./routes/article')

module.exports = (app) => {
    // app.use('/api/v1', authRoutes);
    // app.use('/api/v1', propertyRoutes);
    // app.use('/api/v1', flagRoutes);
    app.use('/api/v1', articleRoutes);
};