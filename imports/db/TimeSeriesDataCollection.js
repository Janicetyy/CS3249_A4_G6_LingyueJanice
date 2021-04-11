import { Mongo } from 'meteor/mongo';
//import SimpleSchema from 'simpl-schema'; 
//import Tsdschema from '/imports/db/TimeSeriesDataDocSchema'

const TSDCollection = new Mongo.Collection('tsdp');

//TSDCollection.attachSchema(Tsdschema);
//TSDCollection.schema = Tsdschema;
export {TSDCollection};