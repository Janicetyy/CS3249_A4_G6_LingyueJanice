import SimpleSchema from 'simpl-schema';

export const Tsdschema = new SimpleSchema({
  roomId: String,
  date: Date,
  datapoint: {type: Array},
  "datapoint.$": Object,
  "datapoint.$.hour": Number,
  "datapoint.$.more": Array,
  "datapoint.$.more.$": Object,
  "datapoint.$.more.$.min": Number,
  "datapoint.$.more.$.temp":String
});
