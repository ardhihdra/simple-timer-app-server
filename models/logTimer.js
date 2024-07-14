const { model, Schema } = require('mongoose');
const Abstract= require('./abstract');

// basically an inverter that send data
const schema = new Schema(
  {
    startTime: {
      type: Date,
      required: [true, 'Start time is required']
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required']
    },
    duration: {
      type: Number,
    },
    notes: {
      type: String
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    }
  },
  { timestamps: true }
);


class MongooseModel extends Abstract {
  constructor() {
    super();
    this.defineModel();
  }

  defineModel = () => {
    this.model = model('LogTimer', schema);
  };
}

const inst = new MongooseModel();
module.exports = inst;
