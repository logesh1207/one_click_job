declare module 'react-timeago' {
  import * as React from 'react';

  interface Formatter {
    (
      value: number,
      unit: string,
      suffix: string,
      epochSeconds: number,
      nextFormatter: Formatter
    ): React.ReactNode;
  }

  interface ReactTimeAgoProps {
    date: string | number | Date;
    formatter?: Formatter;
    component?: React.ElementType;
    [key: string]: any;
  }

  const ReactTimeAgo: React.FC<ReactTimeAgoProps>;

  export default ReactTimeAgo;
}
