import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
                    <ListItemText primary="Home" />
                </ListItem>
                {user && (
                    <>
                        <ListItem button component={Link} to="/add-note" onClick={handleDrawerToggle}>
                            <ListItemText primary="Add Note" />
                        </ListItem>
                        <ListItem button component={Link} to="/view-notes" onClick={handleDrawerToggle}>
                            <ListItemText primary="View Notes" />
                        </ListItem>
                    </>
                )}
                {user ? (
                    <ListItem button onClick={() => { logout(); handleDrawerToggle(); }}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                ) : (
                    <>
                        <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
                            <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button component={Link} to="/register" onClick={handleDrawerToggle}>
                            <ListItemText primary="Register" />
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <Drawer
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                >
                    {drawerContent}
                </Drawer>

                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAYF7eqS9_Ca3rgaT3iEem_nQ1Y5SLayw07Q&s" alt="Notes App Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Notes App
                </Typography>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    {user && (
                        <>
                            <Button color="inherit" component={Link} to="/add-note">
                                Add Note
                            </Button>
                            <Button color="inherit" component={Link} to="/view-notes">
                                View Notes
                            </Button>
                        </>
                    )}
                    {user ? (
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
