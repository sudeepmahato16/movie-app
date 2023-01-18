import { maxWidth } from "./../styles/styles";
import FooterImg from "./../assets/footer-bg.jpg";
import Logo from "./Logo";
import { footerLinks } from "./../constants/constants";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const Footer = () => {
  const { theme } = useGlobalContext();
  return (
    <footer
      style={{
        backgroundImage: `${
          theme === "Dark"
            ? "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,.2))"
            : "linear-gradient(rgba(256,256, 256, 0.6), rgba(256,256, 256, 0.6))"
        }, url(${FooterImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="dark:bg-black py-16 w-full"
    >
      <div className={`${maxWidth} flex flex-col items-center gap-14 `}>
        <Logo classes="mr-20" />
        <div className="grid grid-cols-3 items-center justify-start font-medium text-black dark:text-gray-300 capitalize md:gap-x-16 md:gap-y-4 gap-4  ">
          {footerLinks.map((title, index) => {
            return (
              <Link
                to="/"
                key={index}
                className="dark:hover:text-primary  hover:underline  transition-all duration-300 text-[15.25px] font-nunito"
              >
                {title}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
