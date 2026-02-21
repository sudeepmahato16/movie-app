import { NavLink } from "react-router-dom";
import { INavLink } from "@/types";
import { listItem, activeListItem } from "@/styles";
import { cn } from "@/utils/helper";

interface SidebarNavItemProps {
  link: INavLink;
  closeSideBar: () => void;
  badge?: number;
}

const SidebarNavItem = ({ link, closeSideBar, badge }: SidebarNavItemProps) => {
  return (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) => {
          return cn(listItem, isActive && activeListItem);
        }}
        onClick={closeSideBar}
      >
        {<link.icon className="text-[18px]" />}
        <span>{link.title}</span>
        {badge ? (
          <span className="ml-auto text-[10px] bg-yellow-400 text-black rounded-full px-[5px] py-[1px] font-bold leading-none">
            {badge}
          </span>
        ) : null}
      </NavLink>
    </li>
  );
};

export default SidebarNavItem;
