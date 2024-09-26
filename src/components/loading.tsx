import { useEffect, useState } from 'react';

export type LoadingProps = {
  delay?: number;
};

const Loading: React.FC<LoadingProps> = ({ delay = 200 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return show ? <div>loading...</div> : null;
};

export default Loading;
