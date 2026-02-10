import { useState } from "react";
import axios from "axios";
import "./EditImage.css";
import { toast } from "sonner";
import API_BASE_URL from "../../utils/apiBaseUrl";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useBioContext } from "../../hooks/UseBioContext";

export const EditImage = () => {
  const { user, setUser } = useBioContext();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(
    user.avatarUrl && user.avatarUrl !== "image"
      ? user.avatarUrl
      : "/user-profile.png"
  );
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 3 * 1024 * 1024) {
      toast.error("Image size must be less than 3MB!");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image first!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", user.email);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/update-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 200) {
        toast.success("Profile image updated!");
        URL.revokeObjectURL(preview);
        setUser((prev) => ({ ...prev, avatarUrl: res.data.avatarUrl }));
        navigate("/dashboard");
      }
    } catch {
      toast.error("Error updating image");
    }
  };

  return (
    <section className="edit-image">
      <div className="edit-image-card">
        <button className="edit-image-back" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </button>

        <h2>Edit Profile Image</h2>

        <div className="edit-image-preview">
          <img src={preview} alt="Preview" />
        </div>

        <form onSubmit={handleSave} className="edit-image-form">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="edit-image-file"
          />

          <div className="edit-image-actions">
            <button
              type="submit"
              disabled={!file}
              className="edit-image-btn edit-image-btn-primary"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setPreview(user.avatarUrl);
              }}
              className="edit-image-btn edit-image-btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
