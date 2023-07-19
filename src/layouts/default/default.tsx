import { Layout } from '@lyttledev-dashboard/layouts';
import React from 'react';

export interface DefaultProps {
  children: React.ReactNode;
}

export function Default({ children }: DefaultProps) {
  return <Layout.Base>{children}</Layout.Base>;
}

export function getDefault(page: React.ReactNode) {
  return <Default>{page}</Default>;
}
