Groups = new Mongo.Collection('groups');

Schema = new SimpleSchema({
  name: {
      type: String,
      label: "group name"
  }
});

Groups.attachSchema(Schema);
