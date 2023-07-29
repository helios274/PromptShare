import { Nav } from "@components/Nav";
import { ToastContainer } from "react-toastify";
import Provider from "@components/Provider";

import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@components/Footer";

export const metadata = {
  title: "PromptShare",
  description: "Unleash AI's creativity with captivating prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicons/favicon.ico" />
      </head>
      <body className="gradient-blue-radial">
        <Provider>
          <div className="main">
            <main className="app">
              <Nav />
              <ToastContainer />
              {children}
              <Footer />
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
