// 
// Import all libraries to be used in my system
//Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
import * as server from "../../../schema/v/code/server.js";
//
//Access the library needed for saving data to a database from Javascript
import * as quest from "../../../schema/v/code/questionnaire.js";
//
//Import the registration library.
//Access the registration services from the registration class
import { registration } from "../../../registration/v/code/registration.js";
//
//Access the user class to use it as a data type for holding the
//user credentials
import { user } from "../../../outlook/v/code/app.js";
import { view } from "../../../outlook/v/code/view.js";
// 
// 
export class triple_m extends view.page{
    
} 