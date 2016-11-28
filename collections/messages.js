Messages = new Mongo.Collection('messages');

Schema = new SimpleSchema({
    text: {
        type: String,
        label: "Message content"
    },
    from: {
        type: String,
        label: "The ID of the sender"
    },
    to: {
        type: String,
        label: "The ID of the recipient",
    },
    timestamp: {
        type: Date,
        label: "The time at message sent",
    },
    readstatus: {
      type: Boolean,
      label: "To check whether the user have read the data"
    },
    messageType: {
      type : String,
      label : "To check whether the message is to group or to a person"
    }
});

Messages.attachSchema(Schema);
