require('dotenv').config();
 const express = require('express');
 const mongoose = require ('mongoose');
 const cors = require('cors');
 const cookieParser = require('cookie-parser'); 


 const app=express();

 app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow requests from React app
  credentials: true                // Allow cookies/headers if needed
}));

  app.use(express.json());
  app.use(cookieParser());

  // Router import
const authRoutes = require('./routes/auth');


  // app.use ka use karke router ko mount
app.use('/api/auth', authRoutes);

//import todoRouter

const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todofolders', todoRoutes);


//import subtodoRuters
const subtodoRoutes = require('./routes/subtodoRoutes');
app.use('/api/subtodos', subtodoRoutes);



 const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(()=> console.log('Connected to MongoDB'))
.catch((err)=>console.log('Connection error:' ,err));
 app.get('/', (req, res) => {
  res.send('Hello World! This is my todo backend.');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
