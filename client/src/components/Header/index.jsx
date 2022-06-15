import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../theme";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { StyledBadge } from "./styles";
import { getBasket } from "../../redux/reducers/ProductSlice";
import { logoutUser } from "../../redux/reducers/UserSlice";

const pages = [{ title: "Каталог", link: "/catalog" }];
const settings = ["Темная тема", "Выйти"];

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.user);
  const basketProductsCount = useSelector(
    (store) => store.products.basketProductsCount
  );

  useEffect(() => {
    dispatch(getBasket());
  }, []);

  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    if (link) navigate(link);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Темная тема") {
      colorMode.toggleColorMode();
    }
    if (setting === 'Выйти') {
      dispatch(logoutUser())
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar
      enableColorOnDark
      sx={{ backgroundImage: "none" }}
      position="static"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            MEOW
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => handleCloseNavMenu(page.link)}
                >
                  <Typography
                    sx={{ color: "text.secondary" }}
                    textAlign="center"
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => handleCloseNavMenu(page.link)}
                sx={{ my: 2, color: "text.secondary", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
            {user && (
              <Button
                sx={{ my: 2, color: "text.secondary", display: "block" }}
                onClick={() => navigate("/company")}
              >
                Найти компанию
              </Button>
            )}
            {user?.role?.value === "ADMIN" && (
              <Button
                onClick={() => navigate("/dashboard")}
                sx={{ my: 2, color: "text.secondary", display: "block" }}
              >
                Панель администратора
              </Button>
            )}
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }} alignItems="center" display="flex">
              <IconButton
                onClick={() => navigate("/cart")}
                sx={{ my: 2, color: "text.secondary", display: "block" }}
              >
                <StyledBadge badgeContent={basketProductsCount}>
                  <ShoppingCartIcon color="action" />
                </StyledBadge>
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                  <Avatar
                    alt={user.login.toUpperCase()}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                    {setting === "Темная тема" && (
                      <>
                        {theme.palette.mode === "dark" ? (
                          <DarkModeIcon sx={{ marginLeft: "10px" }} />
                        ) : (
                          <LightModeIcon sx={{ marginLeft: "10px" }} />
                        )}
                      </>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                sx={{ my: 2, color: "text.secondary", display: "block" }}
              >
                Войти
              </Button>
              /
              <Button
                onClick={() => navigate("/registration")}
                sx={{ my: 2, color: "text.secondary", display: "block" }}
              >
                Зарегистрироваться
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
