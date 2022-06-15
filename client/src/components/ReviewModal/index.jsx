import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Fade, Rating } from "@mui/material";
import { StyledTextField } from "./../../pages/Auth/styles";
import { postRating } from "../../api/productApi";
import { useDispatch } from "react-redux";
import { getProduct } from "../../redux/reducers/ProductSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

export default function ReviewModal({ open, setOpen, productId }) {
  const dispatch = useDispatch();
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const handleClose = () => {
    setRating(0);
    setComment("");
    setOpen(false);
  };

  const handlePostRating = async () => {
    await postRating(productId, rating, comment);
    dispatch(getProduct(productId));
    setRating(0);
    setComment("");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Оставить отзыв товару</DialogTitle>
      <DialogContent>
        <StyledTextField
          name="password"
          multiline
          label="Отзыв"
          variant="standard"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          fullWidth
        />
        <Rating
          sx={{ mt: "20px" }}
          name="simple-controlled"
          value={rating}
          size="large"
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="contained" onClick={handlePostRating}>
          Отправить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
