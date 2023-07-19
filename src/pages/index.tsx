import { Layout } from '@lyttledev-dashboard/layouts';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

function Page() {
  const defaultTxt = 'Click anywhere!';
  const ref = useRef<any>(null);
  const [task, setTask] = useState('');
  const [content, setContent] = useState(defaultTxt);
  const [preContent, setPreContent] = useState('');
  const [postContent, setPostContent] = useState('');
  const [showRender, setShowRender] = useState(false);

  const setInput = (text: string) => {
    ref.current.innerText = text;
    setContent(text);
  };

  const onClick = () => {
    ref?.current?.focus();
    console.log(ref.current);
    ref.current;
    if (content === defaultTxt) {
      setInput('');
      setTask('Type !');
    }
  };

  useEffect(() => {
    switch (content.toLowerCase()) {
      case '!':
        setInput('!');
        setTask('now press tab');
        return;

      case '!\t':
        setInput('');
        setPreContent(
          '<!doctype html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '    <title>',
        );
        setPostContent(
          '</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '\n' +
            '</body>\n' +
            '</html>',
        );
        setTask('Fill in the title: "Hello World"');
        return;

      case 'hello world':
        setInput('');
        setPreContent(
          '<!doctype html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '    <title>Hello World</title>\n' +
            '</head>\n' +
            '<body>\n',
        );
        setPostContent('\n' + '</body>\n' + '</html>');
        setTask('Now lets try making our first element. Type <h1>');
        return;

      case '<h1>':
        setInput('');
        setPreContent(
          '<!doctype html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '    <title>Hello World</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <h1>',
        );
        setPostContent('</h1>\n' + '</body>\n' + '</html>');
        setTask(
          'As you see it auto closed. Now lets type a title: "My first app"',
        );
        return;

      case 'my first app':
        setInput('');
        setPreContent(
          '<!doctype html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '    <title>Hello World</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <h1>My first app ',
        );
        setPostContent('</h1>\n' + '</body>\n' + '</html>');
        setTask('Now lets try adding a link. type "<a>"');
        return;

      case '<a>':
        setInput('');
        setPreContent(
          '<!doctype html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '    <title>Hello World</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <h1>My first app <a ',
        );
        setPostContent('></a></h1>\n' + '</body>\n' + '</html>');
        setTask('Now adding the link, type "href="https://google.com"');
        return;

      case 'href="https://google.com"':
        setInput('');
        setPreContent(
          '<!doctype html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '    <title>Hello World</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <h1>My first app <a href="https://google.com">',
        );
        setPostContent('</a></h1>\n' + '</body>\n' + '</html>');
        setTask('Cool! Now let\'s add the text. Type ">Google.com</a>"');
        return;

      case 'google.com':
        setInput('');
        setInput('');
        setPreContent(
          '<!doctype html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '    <title>Hello World</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '    <h1>My first app <a href="https://google.com">Google.com</a><h1>',
        );
        setPostContent('\n' + '</body>\n' + '</html>');
        setTask('Observe the result!');
        setShowRender(true);
        return;
    }
  }, [content]);

  const onChange = (e: any) => {
    const value = ref.current.innerText;
    setContent(value);
    console.log(value);
  };

  const onKeyDown = (e: any) => {
    setContent(ref.current.innerText);
    // onChange(e);
    if (e.key == 'Tab') {
      e.preventDefault();
      setContent(e.target.innerText + '\t');
    }
  };

  const focusAgain = () => {
    ref?.current?.focus();
  };

  return (
    <section className={styles.view}>
      <h1 className={styles.task}>{task}</h1>
      <pre className={styles.editor}>
        <code>
          {preContent}
          <span
            ref={ref}
            onClick={onClick}
            onFocus={onClick}
            onBlur={focusAgain}
            contentEditable={true}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyDown}
          >
            {defaultTxt}
          </span>
          {postContent}
        </code>
      </pre>
      {showRender && <iframe src={'/result'} className={styles.frame} />}
    </section>
  );
}

Page.getLayout = Layout.getDefault;

export default Page;
