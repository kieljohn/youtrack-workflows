var entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.rule = entities.Issue.onChange({
  title: 'Set visibility for client',
  guard: function(ctx) {
    var issue = ctx.issue;
    var client = issue.fields.Client;
    if(client === null) {
      return false;
    }
    var group = entities.UserGroup.findByName(client.name);
    return (issue.becomesReported || issue.isChanged('Client')) && group !== null;
  },
  action: function(ctx) {
    var issue = ctx.issue;
    //Find a group with the same name as the client and add visibility
    var group = entities.UserGroup.findByName(ctx.Client.name);
    if(group !== null) {
   		issue.permittedGroups.add(group);
    }
  },
  requirements: {
    Client: {
      type: entities.EnumField.fieldType
    }
  }
});
