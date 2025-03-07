import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./Navigator.scss";

const MenuGroup = ({ name, children }) => (
  <li className="menu-group">
    <div className="menu-group-name">
      <FormattedMessage id={name} />
    </div>
    <ul className="menu-list list-unstyled">{children}</ul>
  </li>
);

const Menu = ({ name, active, link, children, onClick, hasSubMenu, onLinkClick }) => (
  <li className={`menu${hasSubMenu ? " has-sub-menu" : ""}${active ? " active" : ""}`}>
    {hasSubMenu ? (
      <Fragment>
        <span className="menu-link collapsed" onClick={onClick}>
          <FormattedMessage id={name} />
          <div className="icon-right">
            <i className="far fa-angle-right" />
          </div>
        </span>
        <div>
          <ul className="sub-menu-list list-unstyled">{children}</ul>
        </div>
      </Fragment>
    ) : (
      <Link to={link} className="menu-link" onClick={onLinkClick}>
        <FormattedMessage id={name} />
      </Link>
    )}
  </li>
);

const SubMenu = ({ name, link, onLinkClick }) => {
  const location = useLocation();
  const isActive = location.pathname === link ? "active" : "";

  return (
    <li className={`sub-menu ${isActive}`}>
      <Link to={link} className="sub-menu-link" onClick={onLinkClick}>
        <FormattedMessage id={name} />
      </Link>
    </li>
  );
};

const Navigator = ({ menus, onLinkClick }) => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState({});

  const toggle = (groupIndex, menuIndex) => {
    setExpandedMenu((prevExpanded) => ({
      ...prevExpanded,
      [`${groupIndex}_${menuIndex}`]: !prevExpanded[`${groupIndex}_${menuIndex}`],
    }));
  };

  const isMenuHasSubMenuActive = (subMenus, link) => {
    if (subMenus?.some((subMenu) => subMenu.link === location.pathname)) {
      return true;
    }
    return link && location.pathname === link;
  };

  useEffect(() => {
    const updatedExpandedMenu = {};
    menus.forEach((group, groupIndex) => {
      group.menus?.forEach((menu, menuIndex) => {
        if (menu.subMenus?.length > 0 && isMenuHasSubMenuActive(menu.subMenus, null)) {
          updatedExpandedMenu[`${groupIndex}_${menuIndex}`] = true;
        }
      });
    });
    setExpandedMenu(updatedExpandedMenu);
  }, [location.pathname, menus]);

  return (
    <Fragment>
      <ul className="navigator-menu list-unstyled">
        {menus.map((group, groupIndex) => (
          <Fragment key={groupIndex}>
            <MenuGroup name={group.name}>
              {group.menus?.map((menu, menuIndex) => {
                const isActive = isMenuHasSubMenuActive(menu.subMenus, menu.link);
                const isSubMenuOpen = expandedMenu[`${groupIndex}_${menuIndex}`];
                return (
                  <Menu key={menuIndex} active={isActive} name={menu.name} link={menu.link} hasSubMenu={menu.subMenus} onClick={() => toggle(groupIndex, menuIndex)} onLinkClick={onLinkClick}>
                    {menu.subMenus?.map((subMenu, subMenuIndex) => (
                      <SubMenu key={subMenuIndex} name={subMenu.name} link={subMenu.link} onLinkClick={onLinkClick} />
                    ))}
                  </Menu>
                );
              })}
            </MenuGroup>
          </Fragment>
        ))}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
