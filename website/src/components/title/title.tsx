import Head from 'next/head';

interface TitleProps {
  children?: React.ReactNode;
}

export function Title({ children }: TitleProps) {
  return <Head>{children}</Head>;
}
