import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import group from './group_errors_reducer';

export default combineReducers({
  session,
	group,
});
