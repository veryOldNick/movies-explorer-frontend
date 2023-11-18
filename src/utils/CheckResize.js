import { useState, useEffect } from 'react';

export const useResize = () => {
	const [width, setWidth] = useState({ width: 0 });

  useEffect(() => {
    const handleResize = () => setWidth({ width: window.innerWidth });

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

