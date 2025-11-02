import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useBioContext } from "../../hooks/UseBioContext";

export const Dashboard = () => {
  const { user, userFromGAuth } = useBioContext()
  // console.log('userfromgaout ',userFromGAuth)
  const navigate = useNavigate();
  console.log("user from dashboard", user);

  const handleNavigate = async () => {
    await sessionStorage.setItem("email", JSON.stringify(user.email));
    navigate("/change-password");
  };
  return (
    <>
      <section className="dashboard">
        <div className="container">
          <div className="profile-image">
            <img
              src={
                user.avatarUrl !== "image" && user.avatarUrl
                  ? user.avatarUrl
                  : `user-profile.png`
              }
              alt="profile image"
              width={300}
              height={400}
            />
            <button onClick={() => navigate("/edit-profile")}>
              edit image
            </button>
            {/* <img src="user-profile.png" alt="" /> */}
          </div>
          <div className="details">
            <div className="name">
              <p>{user.name}</p>
            </div>
            <div className="email-verified">
              <div className="email">
                <p> {user.email}</p>
              </div>
              <div className="verified">
                <p>You are verified</p>
              </div>
            </div>
            <div className="buttons">
              {userFromGAuth ? (
                <button className="change-password" onClick={handleNavigate}>
                  Set Password
                </button>
              ) : (
                <button className="set-password" onClick={handleNavigate}>
                  Change Password
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
