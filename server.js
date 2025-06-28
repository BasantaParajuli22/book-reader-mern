//@ts-check
import express from 'express';
import 'dotenv/config'
import { connectToMongo } from "./src/config/mongooseConfig.js";
import { checkAndSeedDatabase } from './src/utils/seedUtils.js';
import bookRouter from './src/routes/bookRoutes.js';
import chapterRouter from './src/routes/chapterRoutes.js';
import authRouter from './src/routes/authRoutes.js';
import userRouter from './src/routes/userRoutes.js';
import checkAndInitializeAdmin from './src/utils/adminInitializer.js';


const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use( ('/api'), bookRouter);
app.use( ('/api'), chapterRouter);
app.use( ('/api'), authRouter);
app.use( ('/api'), userRouter);

async function startServer() {
    try {
        
        // Connect to database first
        await connectToMongo();
        console.log('✅ Connected to MongoDB'); 
        // Run once to populate your database
        await checkAndSeedDatabase();
        await checkAndInitializeAdmin();

        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
            console.log(` API available at: http://localhost:${PORT}/api`);
        });
        
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
