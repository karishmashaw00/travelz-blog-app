import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button, Typography, Tab, Tabs, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from "react-hot-toast";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  // Global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State
  const [value, setValue] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const getMenuItems = (isLogin) => {
    if (isLogin) {
      return [
        { label: "Blogs", path: "/blogs" },
        { label: "My Blogs", path: "/my-blogs" },
        { label: "Create Blog", path: "/create-blog" },
        { label: "Logout", path: "#", onClick: handleLogout },
      ];
    } else {
      return [
        { label: "Blogs", path: "/blogs" },
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];
    }
  };

  const menuItems = getMenuItems(isLogin);

  const list = () => (
    <Box
      sx={{ width: 250, height: '100%', backgroundColor: '#3d5afe',display:"flex",
        flexDirection:'row',
        justifyContent:'center',padding:'5px' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem 
            button 
            key={item.label} 
            component={item.onClick ? 'div' : Link} 
            to={item.onClick ? undefined : item.path}
            onClick={item.onClick}
          >
            <ListItemText primary={item.label} sx={{ color: 'white' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h4' className='cursor-pointer' onClick={() => navigate("/")} sx={{ flexGrow: 1 }}>
            Travelz Blog
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: 'auto' }}>
            {isLogin && (
              <>
                <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
                  <Tab label="Blogs" component={Link} to="/blogs" />
                  <Tab label="My Blogs" component={Link} to="/my-blogs" />
                  <Tab label="Create Blog" component={Link} to="/create-blog" />
                </Tabs>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {!isLogin && (
              <>
              <Button sx={{ margin: 1, color: "white" }} component={Link} to="/blogs">Blog</Button>
                <Button sx={{ margin: 1, color: "white" }} component={Link} to="/login">Login</Button>
                <Button sx={{ margin: 1, color: "white" }} component={Link} to="/register">Register</Button>
              </>
            )}
            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>Logout</Button>
            )}
          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: '#3d5afe' }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        {list()}
      </Drawer>
    </>
  )
}

export default Header;