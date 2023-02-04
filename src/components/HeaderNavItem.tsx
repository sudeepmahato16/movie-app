import React from "react";
import { NavLink } from "react-router-dom";
import { textColor } from "../styles/styles";

interface Props {
  link: { title: string; path: string };
  isPageNotFound: boolean;
  showBg: boolean;
}
 
const HeaderNavItem = ({ link, showBg, isPageNotFound }: Props) => {
  return (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) => {
          return isActive
            ? `nav-link active ${showBg ? textColor : `text-secColor`}`
            : `nav-link ${
                isPageNotFound || showBg
                  ? "text-[#444] dark:text-gray-300 dark:hover:text-secColor hover:text-black"
                  : "text-gray-300 hover:text-secColor"
              }`;
        }}
        end
      >
        {link.title}
      </NavLink>
    </li>
  );
};

export default React.memo(HeaderNavItem);
