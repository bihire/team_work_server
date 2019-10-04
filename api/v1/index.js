// const authRoutes = require('./routes/auth');
import commentRoutes from './routes/comment'
import articleRoutes from './routes/article'
import authRoutes from "./routes/auth"
import articleFlagRoutes from "./routes/articleFlag"
import adminRoutes from "./routes/admin"
import app from '../../app'


app.use('/api/v1/flags', articleFlagRoutes);
app.use('/api/v1/articles', commentRoutes);
app.use('/api/v1', articleRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
