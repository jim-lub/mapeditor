import { useState, useEffect } from 'react';

export default ({ loading = false, error = null, onSuccess = null, onFailure = null }) => {
  const [status, setStatus] = useState(null); // null > request > success / failure

  const onRequest = () => {
    setStatus('REQUEST');
  };

  useEffect(() => {
    if (!status) {
      return;
    }

    if (status === 'REQUEST' && loading) {
      return;
    }

    if (status === 'REQUEST' && !loading) {
      if (error) {
        if (onFailure) onFailure();
        setStatus('FAILURE');
      } else {
        if(onSuccess) onSuccess();
        setStatus('SUCCESS');
      }
    }
  }, [status, loading, error, onSuccess, onFailure]);

  return [status, onRequest];
};
