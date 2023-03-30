import actions from "../actions/index";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import Chip from "@mui/material/Chip";
import { connect } from "react-redux";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import styled, { keyframes } from "styled-components";
import Toolbar from "@mui/material/Toolbar";
import { SetStateAction, useState } from "react";
import { AppState } from "../config/types";

const fadeInAnimation = keyframes`
 0% { opacity: 0; }
 100% { opacity: 1; }
`;

const DrawerContent = styled.div`
  padding: 16px;
  margin-bottom: -9px;
`;
const FilterContainer = styled.div`
  animation-name: ${fadeInAnimation};
  animation-duration: 0.64s;
  animation-timing-function: ease;
`;
const FilterOptionsContainer = styled.div`
  flex: 1;
`;
const FilterMenuContainer = styled.div`
  padding: 16px;
  margin-right: -16px;
`;

const Filter = (props: {
  chooseFilterTheme: any;
  filter: any;
  selectOption: any;
  screenType: any;
  uninitializeFilter: any;
  unselectOption: any;
}) => {
  const {
    chooseFilterTheme,
    filter,
    selectOption,
    screenType,
    uninitializeFilter,
    unselectOption,
  } = props;
  const { filterOptions, filterThemes, initialized, selection, theme } = filter;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const menuOpen = Boolean(anchorElMenu);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAbout = () => {
    handleCloseMenu();
    uninitializeFilter();
  };
  const handleAddOption = (searchTerm: string) => {
    selectOption(searchTerm);
    handleCloseOptions();
  };
  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };
  const handleOpenMenu = (event: any) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleOpenOptions = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };
  const handleDelete = (searchTerm: string) => {
    unselectOption(searchTerm);
  };
  const handleSelectTheme = (theme: string) => {
    chooseFilterTheme(theme);
    handleCloseMenu();
  };

  return initialized && 1 ? (
    <FilterContainer>
      <AppBar color="secondary">
        <Toolbar>
          <FilterOptionsContainer>
            {(screenType === "mobile" && selection.length) ||
            selection.length > 5 ? (
              <Chip
                key="mobile options"
                label={`${selection.length} options selected`}
                onClick={handleOpenDrawer}
                onDelete={handleOpenDrawer}
                deleteIcon={<SettingsIcon />}
                size="medium"
                style={{
                  marginRight: 9,
                }}
                color="primary"
              />
            ) : (
              selection.map((searchTerm: string) => (
                <Chip
                  key={searchTerm}
                  label={searchTerm}
                  onClick={() => handleDelete(searchTerm)}
                  onDelete={() => handleDelete(searchTerm)}
                  size="medium"
                  color="primary"
                  style={{
                    marginRight: 9,
                  }}
                />
              ))
            )}
            <Chip
              label={`Add ${theme}`}
              onClick={(event) => handleOpenOptions(event)}
              onDelete={(event) => handleOpenOptions(event)}
              deleteIcon={<AddIcon />}
              disabled={selection.length >= filterOptions.length}
              color="primary"
              size="medium"
              variant="outlined"
            />
            <Menu
              id="add-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseOptions}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {filterOptions.map(
                (searchTerm: string) =>
                  selection.indexOf(searchTerm) < 0 && (
                    <MenuItem
                      key={searchTerm}
                      onClick={() => handleAddOption(searchTerm)}
                    >
                      {searchTerm}
                    </MenuItem>
                  )
              )}
            </Menu>
          </FilterOptionsContainer>
          <FilterMenuContainer onClick={(event) => handleOpenMenu(event)}>
            <MenuIcon color="primary" />
          </FilterMenuContainer>
          <Menu
            id="otions-menu"
            anchorEl={anchorElMenu}
            open={menuOpen}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {filterThemes.map((filterTheme: string) => (
              <MenuItem
                key={filterTheme}
                onClick={() => handleSelectTheme(filterTheme)}
                selected={theme === filterTheme}
              >
                {filterTheme}
              </MenuItem>
            ))}
            <Divider />
            <MenuItem key={"about"} onClick={handleAbout}>
              about
            </MenuItem>
          </Menu>{" "}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerContent>
          {selection.map((searchTerm: string) => (
            <Chip
              key={searchTerm}
              label={searchTerm}
              onClick={() => handleDelete(searchTerm)}
              onDelete={() => handleDelete(searchTerm)}
              size="medium"
              color="primary"
              style={{
                marginRight: 9,
                marginBottom: 9,
              }}
            />
          ))}
          <Chip
            label={`Add ${theme}`}
            onClick={handleOpenOptions}
            onDelete={handleOpenOptions}
            deleteIcon={<AddIcon />}
            disabled={selection.length >= filterOptions.length}
            size="medium"
            style={{
              marginBottom: 9,
            }}
          />
        </DrawerContent>
      </Drawer>
    </FilterContainer>
  ) : null;
};

function mapStateToProps(state: AppState) {
  return {
    filter: state.filter,
    imageShown: state.imageShown,
    screenType: state.screenType,
  };
}

const mapDispatchToProps = {
  chooseFilterTheme: actions.chooseFilterTheme,
  selectOption: actions.selectOption,
  uninitializeFilter: actions.uninitializeFilter,
  unselectOption: actions.unselectOption,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
