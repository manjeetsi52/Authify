import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useBioContext } from "../../hooks/UseBioContext";

export const Dashboard = () => {
  const { user, userFromGAuth } = useBioContext();
  const navigate = useNavigate();

  const handleNavigate = async () => {
    sessionStorage.setItem("email", JSON.stringify(user.email));
    navigate("/change-password");
  };

  return (
    <section className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-profile">
          <img
            src={
              user.avatarUrl && user.avatarUrl !== "image"
                ? user.avatarUrl
                : "/user-profile.png"
            }
            alt="Profile"
          />

          <button
            className="dashboard-btn dashboard-btn-outline"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile Image
          </button>
        </div>

        <div className="dashboard-details">
          <div className="dashboard-name">{user.name}</div>

          <div className="dashboard-email">
            <span>{user.email}</span>
            <span className="dashboard-verified">✔ Verified</span>
          </div>

          <div className="dashboard-actions">
            {userFromGAuth ? (
              <button
                className="dashboard-btn dashboard-btn-primary"
                onClick={handleNavigate}
              >
                Set Password
              </button>
            ) : (
              <button
                className="dashboard-btn dashboard-btn-success"
                onClick={handleNavigate}
              >
                Change Password
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
