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
      <body className="gradient-blue-radial">
        <Provider>
          <div className="main">
            <main className="app">
              <Nav />
              <ToastContainer />
              {children}
            </main>
          </div>
        </Provider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;