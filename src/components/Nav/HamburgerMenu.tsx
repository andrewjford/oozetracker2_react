import React, { useState } from "react";
import { MenuItem, IconButton, Menu } from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

const HamburgerMenu = (props: any) => {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Add Expense",
      href: "/expenses/new"
    },
    {
      label: "Categories",
      href: "/categories"
    },
    {
      label: "Monthly Totals",
      href: "/monthly"
    }
  ];

  const menuItemsDisplay = menuItems.map(menuItem => {
    return (
      <MenuItem onClick={handleClose}>
        <Link to={menuItem.href} className={classes.link}>
          {menuItem.label}
        </Link>
      </MenuItem>
    );
  });

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.link}
        color="inherit"
        aria-label="menu"
        onClick={openMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="hamburger-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItemsDisplay}
      </Menu>
    </div>
  );
};

export { HamburgerMenu };
