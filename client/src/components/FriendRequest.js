import "./FriendRequest.css";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function FriendRequest({ profile_pic_url, name, dog_id, onClick, onHandleFriend }) {

  return (
    
    <div className="FriendRequest__main">
      <div className="FriendRequest__user" onClick={onClick}>
        <Avatar
          src={profile_pic_url}
          sx={{ height: "50px", width: "50px" }}
        />
        <p>{name}</p>
      </div>
      <div className="FriendRequest__buttons">
        <Button
          className="accept"
          color="success"
          sx={{ borderRadius: 30 }}
          variant="outlined"
          onClick={() => onHandleFriend('confirm', dog_id)}
        >
          <CheckIcon color="success" />
        </Button>
        <Button
          className="decline"
          color="error"
          sx={{ borderRadius: 30 }}
          variant="outlined"
          onClick={() => onHandleFriend('delete', dog_id)}
        >
          <CloseIcon color="error" />
        </Button>
      </div>
    </div>
  );
}

export default FriendRequest;
