import { useState, useEffect } from 'react';

import rules from './validation-rules';
import messages from './validation-messages';

export const useFormValidation = ({ name, required = false }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState([]);

 useEffect(() => {
   if (required && value.length === 0) {
     setError([
       getValidationMessage({ name, required: true })
      ]
     )

     return;
   };

   if (rules.name[name]) {
     const rulesetByName = rules.name[name];
     const match = 'null';

     const validationByName = validateFormFieldsByName({ name, ruleset: rulesetByName, value, match });

      (validationByName.length > 0)
        ? setError([...validationByName])
        : setError([])
   }
 }, [value, name, required]);

 // useEffect(() => {
 //   const arr = (error) ? error.filter(err => err) : null;
 //
 //   if (arr.length > 0) console.log(error);
 // }, [error]);

  return [value, setValue, error];
}

const validateFormFieldsByName = ({ name, ruleset, value, match }) => {
  return Object.entries(ruleset)
   .map(([ruleName, ruleFunc]) =>
     (!ruleFunc({ value, match }))
       ? getValidationMessage({ name, rule: ruleName })
       : null
   )
   .filter(err => err);
}

const getValidationMessage = ({ name = null, type = null, required = null, rule = null, byName = false, byType = false }) => {

  if (required) {

    if (name && messagesObjectHasProperties({ name, messages, type: 'required' })) {
      return messages.name[name].required;
    }

    return messages.generic.required;
  }

  if (rule) {
    if (name && messagesObjectHasProperties({ name, messages, type: 'rule', rule })) {
      return messages.name[name].rule[rule];
    }

    if (name && messagesObjectHasProperties({ name, messages, type: 'invalid' })) {
      return messages.name[name].invalid;
    }

    return messages.generic.invalid;
  }
}

const messagesObjectHasProperties = ({ name = null, messages: obj, type = null, rule = null }) => {
  if (name && obj.name.hasOwnProperty(name)) {
      const hasType = obj.name[name].hasOwnProperty(type);

      if (hasType && rule) {
        return obj.name[name].rule.hasOwnProperty(rule);
      }

      return hasType;
  }
}
