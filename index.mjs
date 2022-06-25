import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import bodyParser from 'body-parser';
import bindRoutes from './routes.mjs';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3004';
// Initialise Express instance
const app = express();

// Set CORS headers
app.use(cors());

// Set the Express view engine to expect EJS templates
app.set('view engine', 'ejs');
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Expose the files stored in the public folder
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('images'));
// Bind route definitions to the Express application
bindRoutes(app);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);
