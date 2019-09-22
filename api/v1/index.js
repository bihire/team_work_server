// const authRoutes = require('./routes/auth');
// const propertyRoutes = require('./routes/property');
import articleRoutes from './routes/article'
import authRoutes from "./routes/auth"

module.exports = app => {
  // app.use('/api/v1', authRoutes);
  // app.use('/api/v1', propertyRoutes);
  app.use('/api/v1', articleRoutes);
  app.use("/api/v1", authRoutes);
};
