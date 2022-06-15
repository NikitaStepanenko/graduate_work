import React, { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { PET_LIST } from "../../constants";

const ProductsCategories = ({ selectCategory, categories }) => {
  const [openedCategory, setOpenedCategory] = useState(null);

  const handleOpenCategory = (category) => {
    if (openedCategory === category) return setOpenedCategory(null);
    setOpenedCategory(category);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "primary.theme" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={() => handleOpenCategory(null)}>
        <ListItemText
          primary={"Все товары"}
          onClick={() => selectCategory(null)}
        />
      </ListItemButton>
      {categories.map((pet) => (
        <div key={pet.id}>
          <ListItemButton onClick={() => handleOpenCategory(pet.name)}>
            <ListItemText primary={pet.name} />
            {openedCategory === pet.name ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openedCategory === pet.name}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {pet?.subCategories?.map((subCategory) => (
                <ListItemButton
                  onClick={() => selectCategory(subCategory.id)}
                  key={subCategory.name}
                  sx={{ pl: 4 }}
                >
                  <ListItemText primary={subCategory.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default ProductsCategories;
