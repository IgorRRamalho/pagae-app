declare module 'react-twemoji' {
    import { ReactNode } from 'react';
  
    interface TwemojiProps {
      children: ReactNode;
      options?: {
        base?: string;
        ext?: '.png' | '.svg';
        size?: string;
        className?: string;
      };
    }
  
    const Twemoji: React.FC<TwemojiProps>;
    export default Twemoji;
  }
  