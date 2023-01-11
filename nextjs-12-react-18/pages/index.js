import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <LargeDom></LargeDom>
      </main>
    </div>
  );
}

function LargeDom({ assets }) {
  const components = [];

  for (let i = 0; i <= 1000; i++) {
    components.push(<HeavyComponent />);
  }

  return <div>{components}</div>;
}

function HeavyComponent() {
  return (
    <>
      <ul>
        <li>
          <a href="#">Link</a>
        </li>
        <li>
          <a href="#">Link</a>
        </li>
        <li>
          <a href="#">Link</a>
        </li>
        <li>
          <a href="#">Link</a>
        </li>
        <li>
          <a href="#">Link</a>
        </li>
      </ul>
      <article>
        <h1>Title</h1>
        <p>Content</p>
        <div>
          <div>
            <div>
              <div>
                <div>12345</div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      test: "hi",
    }, // will be passed to the page component as props
  };
}
