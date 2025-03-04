import React, { Component, Fragment } from "react";
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

class Navigator extends Component {
  state = { expandedMenu: {} };

  toggle = (groupIndex, menuIndex) => {
    this.setState((prevState) => ({
      expandedMenu: {
        ...prevState.expandedMenu,
        [`${groupIndex}_${menuIndex}`]: !prevState.expandedMenu[`${groupIndex}_${menuIndex}`],
      },
    }));
  };

  isMenuHasSubMenuActive = (location, subMenus, link) => {
    if (subMenus?.some((subMenu) => subMenu.link === location.pathname)) {
      return true;
    }
    return link && location.pathname === link;
  };

  checkActiveMenu = () => {
    const { menus } = this.props;
    const location = window.location;

    for (let i = 0; i < menus.length; i++) {
      const group = menus[i];
      if (group.menus) {
        for (let j = 0; j < group.menus.length; j++) {
          const menu = group.menus[j];
          if (menu.subMenus?.length > 0 && this.isMenuHasSubMenuActive(location, menu.subMenus, null)) {
            this.setState({ expandedMenu: { [`${i}_${j}`]: true } });
            return;
          }
        }
      }
    }
  };

  componentDidMount() {
    this.checkActiveMenu();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.checkActiveMenu();
    }
  }

  render() {
    const { menus, onLinkClick } = this.props;
    const location = window.location;

    return (
      <Fragment>
        <ul className="navigator-menu list-unstyled">
          {menus.map((group, groupIndex) => (
            <Fragment key={groupIndex}>
              <MenuGroup name={group.name}>
                {group.menus?.map((menu, menuIndex) => {
                  const isActive = this.isMenuHasSubMenuActive(location, menu.subMenus, menu.link);
                  const isSubMenuOpen = this.state.expandedMenu[`${groupIndex}_${menuIndex}`];
                  return (
                    <Menu key={menuIndex} active={isActive} name={menu.name} link={menu.link} hasSubMenu={menu.subMenus} onClick={() => this.toggle(groupIndex, menuIndex)} onLinkClick={onLinkClick}>
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
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
