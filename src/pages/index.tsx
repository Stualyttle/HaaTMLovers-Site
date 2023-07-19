import { Layout } from '@lyttledev-dashboard/layouts';

function Page() {
  return (
    <>
      <p>Hello!</p>
    </>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
