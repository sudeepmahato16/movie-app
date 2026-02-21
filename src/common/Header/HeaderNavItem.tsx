import { NavLink } from "react-router-dom";
import { textColor } from "../../styles";
import { cn } from "../../utils/helper";

interface HeaderProps {
  link: { title: string; path: string };
  isNotFoundPage: boolean;
  showBg: boolean;
  badge?: number;
}

const HeaderNavItem = ({ link, showBg, isNotFoundPage, badge }: HeaderProps) => {
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
        <span className="flex items-center gap-1">
          {link.title}
          {badge ? (
            <span className="text-[10px] bg-yellow-400 text-black rounded-full px-[5px] py-[1px] font-bold leading-none">
              {badge}
            </span>
          ) : null}
        </span>
      </NavLink>
    </li>
  );
};

export default HeaderNavItem;
