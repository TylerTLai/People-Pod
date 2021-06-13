import { FiSmartphone, FiMail, FiMapPin } from "react-icons/fi";

const Contacts = () => {
  return (
    <section className="border-b border-gray-200 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Contacts</h2>
      <ul className="flex flex-col space-y-4 text-gray-400">
        <li className="flex items-center hover:text-gray-800">
          <FiSmartphone className="mr-2" />
          <p className="mr-20">Phone</p>
          <p>123-456-7890</p>
        </li>
        <li className="flex items-center hover:text-gray-800">
          <FiMail className="mr-2" />
          <p className="mr-20">Email</p>
          <p>tony@stark.com</p>
        </li>
        <li className="flex items-center hover:text-gray-800">
          <FiMapPin className="mr-2" />
          <p className="mr-20">Address</p>
          <p>908 Walkers Ridge Way, Los Angeles, California, 90017</p>
        </li>
      </ul>
    </section>
  );
};

export default Contacts;
