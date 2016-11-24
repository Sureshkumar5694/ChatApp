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
    }
});

Messages.attachSchema(Schema);
