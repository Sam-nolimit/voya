import React from 'react';

const useOutsideClick = (ref) => {
  const [outsieClick, setOutsideClick] = React.useState(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOutsideClick(true);
      } else {
        setOutsideClick(false);
      }

      setOutsideClick(null);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return outsieClick;
};

export default useOutsideClick