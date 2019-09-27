// const authRoutes = require('./routes/auth');
import commentRoutes from './routes/comment'
import articleRoutes from './routes/article'
import authRoutes from "./routes/auth"
import articleFlagRoutes from "./routes/articleFlag"
import adminRoutes from "./routes/admin"

module.exports = app => {
  app.use('/api/v1', articleFlagRoutes);
  app.use('/api/v1', commentRoutes);
  app.use('/api/v1', articleRoutes);
  app.use("/api/v1", authRoutes);
  app.use("/api/v1", adminRoutes);
};
