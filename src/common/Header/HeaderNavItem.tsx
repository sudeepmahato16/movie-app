import { NavLink } from "react-router-dom";
import { textColor } from "../../styles";
import { cn } from "../../utils/helper";

interface HeaderProps {
  link: { title: string; path: string };
  isNotFoundPage: boolean;
  showBg: boolean;
}

const HeaderNavItem = ({ link, showBg, isNotFoundPage }: HeaderProps) => {
  return (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) => {
          return cn(
            "nav-link",
            isActive
              ? ` active ${showBg ? textColor : `text-secColor`}`
              : ` ${
                  isNotFoundPage || showBg
                    ? "text-[#444] dark:text-gray-300 dark:hover:text-secColor hover:text-black"
                    : "text-gray-300 hover:text-secColor"
                }`
          );
        }}
        end
      >
        {link.title}
      </NavLink>
    </li>
  );
};

export default HeaderNavItem;
