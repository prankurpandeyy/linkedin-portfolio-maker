import React from "react";

function page() {
  return (
    <div>
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-gray-100">
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 text-gray-800">
          <h1 className="text-3xl font-bold text-center text-blue-600">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Effective Date: 01-April-2025
          </p>

          <section className="mt-6">
            <h2 className="text-xl font-semibold">1. Introduction</h2>
            <p className="mt-2">
              Welcome to <strong>LinkedIn Portfolio Generator</strong>. We
              respect your privacy and are committed to ensuring transparency
              about how our application interacts with LinkedIn data.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold">2. Information Usage</h2>
            <p className="mt-2">
              Our application does not collect, store, or retain any user data.
              The LinkedIn URL provided by users is used only to fetch public
              profile details dynamically, and the generated portfolio is
              displayed in real-time without storing any data.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold">3. How It Works</h2>
            <ul className="list-disc ml-6 mt-2">
              <li>The user enters their LinkedIn profile URL.</li>
              <li>
                We use LinkedIn's API to fetch public information dynamically.
              </li>
              <li>The AI generates a portfolio based on the extracted data.</li>
              <li>No data is stored on our servers.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold">4. Security & Compliance</h2>
            <p className="mt-2">
              Since no user data is collected or stored, our application ensures
              maximum privacy and compliance with LinkedIn API policies.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold">5. Contact Us</h2>
            <p className="mt-2">
              If you have any questions about this Privacy Policy, feel free to
              contact us at{" "}
              <a href="mailto:pprankur@gmail.com" className="text-blue-500">
                pprankur@gmail.com
              </a>
              .
            </p>
          </section>

          <div className="text-center mt-6">
            <a
              href="/"
              className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
