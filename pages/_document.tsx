import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="noindex" />
          {/* <link
            href="https://fonts.googleapis.com/css?family=Lora:400,400i,700|Inter:300,400,500,600,700,800,900"
            rel="stylesheet"
          /> */}
          <link
            href="https://fonts.googleapis.com/css?family=Lora:400,400i,700|Muli:300,400,500,600,700,800,900"
            rel="stylesheet"
          />
          <link
            rel="apple-touch-icon"
            href="/public/apple-touch-icon.png"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
