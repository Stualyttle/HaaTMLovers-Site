import { NextPageContext } from 'next';
import Layouts from '@lyttledev-dashboard/layouts';
import { Component } from '@lyttledev-dashboard/components';

export interface ErrorPageProps {
  code: number;
  message: string;
}

function ErrorPage({ code, message }: ErrorPageProps) {
  return (
    <Layouts.Default>
      <Component.Title>Error!</Component.Title>
      <p>
        {code
          ? `An error ${code} occurred on server`
          : 'An error occurred on client'}
      </p>
    </Layouts.Default>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorPageProps => {
  let code = 404;
  if (res && res.statusCode) code = res.statusCode;
  if (err && err.statusCode) code = err.statusCode;

  let message = 'Page was not found';
  if (res && res.statusMessage) message = res.statusMessage;
  if (err && err.message) message = err.message;

  return { code, message };
};

export default ErrorPage;
