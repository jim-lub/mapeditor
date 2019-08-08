import messages from '../validation-messages';

export const fetchValidationMessage = ({ name = null, type = null, required = null, rule = null, byName = false, byType = false }) => {

  if (required) {

    if (name && _messagesObjectHasProperties({ name, messages, type: 'required' })) {
      return messages.name[name].required;
    }

    return messages.generic.required;
  }

  if (rule) {
    if (name && _messagesObjectHasProperties({ name, messages, type: 'rule', rule })) {
      return messages.name[name].rule[rule];
    }

    if (name && _messagesObjectHasProperties({ name, messages, type: 'invalid' })) {
      return messages.name[name].invalid;
    }

    return messages.generic.invalid;
  }
}

const _messagesObjectHasProperties = ({ name = null, messages: obj, type = null, rule = null }) => {
  if (name && obj.name.hasOwnProperty(name)) {
      const hasType = obj.name[name].hasOwnProperty(type);

      if (hasType && rule) {
        return obj.name[name].rule.hasOwnProperty(rule);
      }

      return hasType;
  }
}
