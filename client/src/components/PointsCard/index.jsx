import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { declineMeeting } from "../../api/pointApi";

const PointCard = ({ point, userPoint, decline, accept }) => {
  return (
    <Box>
      {userPoint && <Divider />}
      <Box
        display="flex"
        sx={{ pt: userPoint && "15px", mb: "10px" }}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" alignItems="center">
            {point.id === userPoint?.id && (
              <CheckCircleIcon
                sx={{ color: "green", height: "15px", width: "15px", mr: '5px' }}
              />
            )}
            <Typography>
              {point.city}, {point.address}
            </Typography>
          </Box>
          <Typography variant="secondaryText">
            {point?.users?.length}{" "}
            {[2, 3, 4].includes(point?.users?.length) ? "человека" : "человек"},{" "}
            {new Date(point.date).toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
              hour12: false,
            })}
          </Typography>
        </Box>
        {point.id === userPoint?.id ? (
          <IconButton
            onClick={() => decline(point)}
            aria-label="delete"
            sx={{ mr: "-8px" }}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => accept(point)}
            aria-label="delete"
            sx={{ mr: "-8px" }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default PointCard;
