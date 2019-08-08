import { useState, useEffect } from 'react';

import rules from './validation-rules';

import { validateFormFieldsByName, fetchValidationMessage } from './utils';

export const useFormValidation = ({ name, match = null, required = false }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState([]);

 useEffect(() => {
   if (required && value.length === 0) {
     setError([
       fetchValidationMessage({ name, required: true })
      ]
     )

     return;
   };

   if (rules.name.hasOwnProperty(name)) {
     const rulesetByName = rules.name[name];

     const validationByName = validateFormFieldsByName({ name, ruleset: rulesetByName, value, match });

      (validationByName.length > 0)
        ? setError([...validationByName])
        : setError([])
   }
 }, [value, match, name, required]);

  return [value, setValue, error];
}
