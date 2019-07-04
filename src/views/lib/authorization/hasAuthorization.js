import * as ruleTypes from './ruleTypes';

export default () => {
  return {
    [ ruleTypes.IS_SIGNED_IN ]: (authUser, initialized) => {
      if (initialized) {
        return !!authUser;
      }
    },
    [ ruleTypes.IS_NOT_SIGNED_IN ]: (authUser, initialized) => {
      if (initialized) {
        return !authUser;
      }
    }
  }
}
