import validationRules from './validationRules';

export default (fieldName, value, options) => {
  if (fieldName && validationRules.name.hasOwnProperty(fieldName)) {
    const rules = validationRules.name[fieldName];

    const validateRules = Object.entries(rules)
      .map(([validationType, validationFunction]) =>
        (!validationFunction(value, options))
          ? { fieldName, value, error: validationType }
          : null
      );

    const filterErrors = validateRules.filter((err) => err);

    if (filterErrors.length > 0) {
      return {
        errors: filterErrors
      };
    }

    return null;
  }
}
