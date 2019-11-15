/*******************************************************************************
*   Webworker don't have access to the DOM and the window object. Make sure that
*   any required utilities are imported directly from the source file instead of
*   the utils folder and don't need access to the window object. Failing to do
*   so will silently terminate the worker.
*******************************************************************************/
import { validateSegment } from './validateSegment';

import * as taskTypes from './types';

export default ({
  [ taskTypes.validateSegment ]: validateSegment
})
