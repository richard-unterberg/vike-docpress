const GetStartedPage = () => {
  return (
    <div>
      <h1>Get Started</h1>
      <p>
        Welcome to the Solid DocPress documentation! This guide will help you get started with using Solid DocPress to
        create your own documentation site.
      </p>
      <h2>Installation</h2>
      <p>To install Solid DocPress, run the following command:</p>
      <pre>
        <code>npm install solid-docpress</code>
      </pre>
      <h2>Creating a Documentation Site</h2>
      <p>To create a new documentation site, run the following command:</p>
      <pre>
        <code>npx solid-docpress init my-docs</code>
      </pre>
      <p>
        This will create a new directory called "my-docs" with the necessary files and structure for your documentation
        site.
      </p>
      <h2>Running the Development Server</h2>
      <p>To start the development server, navigate to your documentation directory and run:</p>
      <pre>
        <code>npm run dev</code>
      </pre>
      <p>
        This will start the development server and you can view your documentation site at{' '}
        <a href="http://localhost:3000">http://localhost:3000</a>.
      </p>
    </div>
  )
}

export default GetStartedPage