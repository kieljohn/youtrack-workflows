var entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.rule = entities.Issue.onChange({
  title: 'Guess client from related emails',
  guard: function(ctx) {
    var issue = ctx.issue;
    //No client has yet been assigned
    return issue.becomesReported && !issue.fields.Client;
  },
  action: function(ctx) {
    var issue = ctx.issue;
    var emails = issue.fields.allEmails;
    
    var clients = ctx.Client.values;
    clients.forEach(function(c) {
      if(c.description !== null && c.description.indexOf("@") === 0 && emails.indexOf(c.description) >= 1) {
        ctx.issue.fields.Client = c.name;
      }
    });
  },
  requirements: {
    //Using @jetbrains/youtrack-workflow-notify-multiple-unregistered-users workflow
    allEmails: {
      name: 'All related emails',
      type: entities.Field.stringType
    },
    //Client field which has the domain of the client in the description
    Client: {
      type: entities.EnumField.fieldType
    }
  }
});
