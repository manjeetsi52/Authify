import { useState } from "react";
import axios from "axios";
import "./EditImage.css";
import { toast } from "sonner";
import API_BASE_URL from "../../utils/apiBaseUrl";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useBioContext } from "../../hooks/UseBioContext";

export const EditImage = () => {
  const { user,setUser } =useBioContext()
  const navigate = useNavigate();
  const [preview, setPreview] = useState(
    user.avatarUrl !== "image" && user.avatarUrl
      ? user.avatarUrl
      : `user-profile.png`
  );
  const [file, setFile] = useState(null);
  // console.log("user from edit image", user);
  const handleFileChange = (e) => {
    console.log("e.target.files", e.target.files[0]);
    const selectedFile = e.target.files[0];
    if (selectedFile.size > 3 * 1024 * 1024) {
      toast.error("Image size must be less than 3mb!");
      return;
    }
    setFile(selectedFile);
    // URL.createObjectURL() temporarily converts your local file into a browser-readable link so you can preview it immediately.
    setPreview(URL.createObjectURL(selectedFile)); // show preview instantly
  };

  const handleSave = async (e) => {
    e.preventDefault(); // prevent form reload

    if (!file) return toast.error("Please select an image first!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", user.email); // use actual user ID
    //     for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    try {
      const res = await axios.post(`${API_BASE_URL}/update-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        toast.success("Image updated successfully!");
        console.log(res.data);
        // release the memory
        URL.revokeObjectURL(preview);
        //update the state for state sync
        setUser((prev)=>({...prev,avatarUrl:res.data.avatarUrl}))
        navigate('/dashboard')
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Error updating image");
    }
  };

  return (
    <section className="edit-image-section">
      <div className="edit-image-page">
        <h2>Edit Profile Image</h2>

        <div className="preview-wrap">
          <img src={preview} alt="Preview" className="preview-image" />
        </div>

        <form onSubmit={handleSave}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            name="image"
            className="file-input"
          />

          <div className="controls">
            <button type="submit" className="btn btn-primary" disabled={!file}>
              Save 
            </button>

            <button
              onClick={() => {
                setFile(null);
                setPreview(user.avatarUrl);
                URL.revokeObjectURL(preview);
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="back-button-parent">
          <button onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack id="back-button" />
          </button>
        </div>
      </div>
    </section>
  );
};
