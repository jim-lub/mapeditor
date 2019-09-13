import React, { useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import styles from './customscrollbars.module.css'

const CustomScrollbars = ({ onScroll, forwardedRef, style, children }) => {
  const refSetter = useCallback(
    scrollbarsRef => {
      if (scrollbarsRef) {
        forwardedRef(scrollbarsRef.view);
      } else {
        forwardedRef(null);
      }
    },
    [forwardedRef]
  );

  return (
    <Scrollbars
      ref={refSetter}
      style={{ ...style, overflow: "hidden" }}
      onScroll={onScroll}
      renderTrackHorizontal={props => <div {...props} className={styles.horizontalTrack}/>}
      renderTrackVertical={props => <div {...props} className={styles.verticalTrack}/>}
      renderThumbHorizontal={props => <div {...props} className={styles.horizontalThumb}/>}
      renderThumbVertical={props => <div {...props} className={styles.verticalThumb}/>}
      renderView={props => <div {...props} className={styles.view}/>}
    >
      { children }
    </Scrollbars>
  )
}

export default React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
));
