import { useNavigate } from "react-router-dom";
import style from "../../css/user.module.css";

export const User = (props) => {
  const navigate = useNavigate();

  const { id, name, email } = props.user;
  const toUserPost = () => {
    navigate("/api/user/post/" + id);
  };

  return (
    <div className={style.userContainer}>
      <div className={style.info}>
        <h2>{name}</h2>
        <div>
          <p>email: {email}</p>
        </div>
        <div>
          <button onClick={toUserPost}>post</button>
        </div>
      </div>
    </div>
  );
};
