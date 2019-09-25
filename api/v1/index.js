// const authRoutes = require('./routes/auth');
import commentRoutes from './routes/comment'
import articleRoutes from './routes/article'
import authRoutes from "./routes/auth"

module.exports = app => {
  // app.use('/api/v1', authRoutes);
  app.use('/api/v1', commentRoutes);
  app.use('/api/v1', articleRoutes);
  app.use("/api/v1", authRoutes);
};
