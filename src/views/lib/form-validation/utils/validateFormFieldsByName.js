import { fetchValidationMessage } from '../utils';

export const validateFormFieldsByName = ({ name, ruleset, value, match }) => {
  return Object.entries(ruleset)
   .map(([ruleName, ruleFunc]) =>
     (!ruleFunc({ value, match }))
       ? fetchValidationMessage({ name, rule: ruleName })
       : null
   )
   .filter(err => err);
}
