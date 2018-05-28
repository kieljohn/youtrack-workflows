var entities = require('@jetbrains/youtrack-scripting-api/entities');

exports.rule = entities.Issue.onChange({
  title: 'Set default visibility',
  guard: function(ctx) {
    var issue = ctx.issue;
    return issue.becomesReported;
  },
  action: function(ctx) {
    ctx.issue.permittedGroup = ctx.vivaitTeam;
  },
  requirements: {
    vivaitTeam: {
      type: entities.UserGroup,
      name: 'Viva IT'
    }
  }
});
