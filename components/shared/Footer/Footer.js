import SvgFacebook from "../Icons/Facebook";
import SvgInstagram from "../Icons/Instagram";
import SvgLinkedin from "../Icons/Linkedin";
import SvgTwitter from "../Icons/Twitter";

const Footer = () => {
  return (
    <footer className="text-gray-300 bg-gray-900 pt-5 pb-10 px-5 border-t-2 border-gray-100">
      <div>
        <nav className="flex justify-center text-sm tracking-wide space-x-4 py-5 sm:text-lg sm:space-x-24">
          <a href="#" className="hover:text-white transition duration-200 ease-in-out">
            Features
          </a>
          <a href="#" className="hover:text-white transition duration-200 ease-in-out">
            Pricing
          </a>
          <a href="#" className="hover:text-white transition duration-200 ease-in-out">
            About
          </a>
          <a href="#" className="hover:text-white transition duration-200 ease-in-out">
            Contact
          </a>
        </nav>
        <span className="flex justify-center space-x-8 py-5">
          <a className="hover:text-white transition duration-200 ease-in-out hover:cursor-pointer">
            <SvgFacebook width={22} height={22} />
          </a>
          <a className="hover:text-white transition duration-200 ease-in-out hover:cursor-pointer">
            <SvgTwitter width={22} height={22} />
          </a>
          <a className="hover:text-white transition duration-200 ease-in-out hover:cursor-pointer">
            <SvgInstagram width={22} height={22} />
          </a>
          <a className="hover:text-white transition duration-200 ease-in-out hover:cursor-pointer">
            <SvgLinkedin width={22} height={22} />
          </a>
        </span>
      </div>

      <div className="flex justify-center pt-5">
        <p className="text-xs tracking-widest uppercase">© PeoplePod 2021</p>
      </div>
    </footer>
  );
};

export default Footer;
