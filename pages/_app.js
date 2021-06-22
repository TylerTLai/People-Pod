import "tailwindcss/tailwind.css";
import { ModalContext } from "../context/ModalContext";
import { useState } from 'react';

function MyApp({ Component, pageProps }) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{isOpen, setIsOpen} }>
        <div className="text-gray-800">
          <Component {...pageProps} />
        </div>
      </ModalContext.Provider>
  );
}

export default MyApp;
