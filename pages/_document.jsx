import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="dns-prefetch" href="https://fonts.gstatic.com/" />
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
                    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css" />
                </Head>
                <body>
                    <Main />
                    {/* <script type="text/javascript" src="/js/main.min.js"></script> */}
                    <NextScript />
                </body>
            </Html>
        )
    }
}
