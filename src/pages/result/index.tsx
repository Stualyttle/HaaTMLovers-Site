import { Layout } from '@lyttledev-dashboard/layouts';

function Page() {
  return (
    <h1>
      My first app <a href={'https://google.com'}>Google.com</a>
    </h1>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
