import React from "react";
import { NavLink } from "react-router-dom";
import { navLinkType } from "../types";
import { listItem, activeListItem } from "../styles/styles";

interface SidebarNavItemProps {
  link: navLinkType;
  closeSideBar: () => void;
}

const SidebarNavItem = ({ link, closeSideBar }: SidebarNavItemProps) => {
  return (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) => {
          return isActive ? `${listItem} ${activeListItem}` : `${listItem} `;
        }}
        onClick={closeSideBar}
      >
        {<link.icon className="text-[18px]" />}
        <span>{link.title}</span>
      </NavLink>
    </li>
  );
};

export default SidebarNavItem;
