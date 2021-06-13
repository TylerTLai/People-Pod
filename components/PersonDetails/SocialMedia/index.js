import { FiFacebook, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";

const SocialMedia = () => {
  return (
    <section className="border-b border-gray-200 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Social Media</h2>
      <ul className="flex flex-col space-y-4 text-gray-400 ">
        <li className="flex items-center hover:text-gray-800">
          <FiFacebook className="mr-20" />
          <a href="#">Facebook</a>
        </li>
        <li className="flex items-center hover:text-gray-800">
          <FiLinkedin className="mr-20" />
          <a href="#">Linkedin</a>
        </li>
        <li className="flex items-center hover:text-gray-800">
          <FiTwitter className="mr-20" />
          <a href="#">Twitter</a>
        </li>
        <li className="flex items-center hover:text-gray-800">
          <FiInstagram className="mr-20" />
          <a href="#">Instagram</a>
        </li>
      </ul>
    </section>
  );
};

export default SocialMedia;
