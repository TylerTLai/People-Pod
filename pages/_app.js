import "tailwindcss/tailwind.css";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";
import { Provider as NextAuthProvider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ReduxProvider store={store}>
        <div className="text-gray-800">
          <Component {...pageProps} />
        </div>
      </ReduxProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
