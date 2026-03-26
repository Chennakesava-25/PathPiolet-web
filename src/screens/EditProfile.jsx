import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/apiService";

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}"),
  );
  const [formData, setFormData] = useState({
    username: user.username || "",
    phone: user.phone || "",
    age: user.age || "",
    education_level: user.education_level || "",
    interested_field: user.interested_field || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadOption, setUploadOption] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Camera state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await userService.updateProfile(user.id, formData);
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      navigate("/profile");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset file input so same file can be re-selected
    e.target.value = "";
    setUploadOption(false);

    // Show immediate preview
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    const formDataObj = new FormData();
    formDataObj.append("photo", file);

    try {
      const response = await userService.uploadProfilePhoto(
        user.id,
        formDataObj,
      );
      if (response.data && response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setPreviewUrl(null); // Clear preview, use server URL now
      }
    } catch (err) {
      console.error("Upload error:", err);
      const errorMsg = err.response?.data?.error || "Failed to upload photo. Make sure the backend server is running.";
      alert(errorMsg);
      setPreviewUrl(null);
    }
  };

  const handleRemovePhoto = async () => {
    setUploadOption(false);
    try {
      const response = await userService.removeProfilePhoto(user.id);
      if (response.data && response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setPreviewUrl(null);
        alert("Profile photo removed!");
      }
    } catch (err) {
      alert("Failed to remove photo");
    }
  };

  // Camera Functions
  const startCamera = async () => {
    setUploadOption(false);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Failed to access camera. Please check permissions or use a secure context (HTTPS/localhost).");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  React.useEffect(() => {
    if (isCameraOpen && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraOpen, stream]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "camera_photo.jpg", { type: "image/jpeg" });
          // Fake event object to reuse handlePhotoUpload
          handlePhotoUpload({ target: { files: [file] } });
          stopCamera();
        }
      }, "image/jpeg", 0.9);
    }
  };

  const renderInputCard = (
    label,
    name,
    type = "text",
    placeholder,
    disabled = false,
  ) => (
    <div
      style={{
        background: "#F8FAFC",
        borderRadius: "16px",
        padding: "16px 20px",
        marginBottom: "16px",
        border: "none",
        width: "100%",
      }}
    >
      <label
        style={{
          display: "block",
          fontSize: "0.85rem",
          fontWeight: "700",
          color: "#64748B",
          marginBottom: "4px",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={disabled ? user.email : formData[name]}
        onChange={
          !disabled
            ? (e) => setFormData({ ...formData, [name]: e.target.value })
            : undefined
        }
        disabled={disabled}
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
          fontSize: "1rem",
          color: disabled ? "#64748B" : "#1E293B",
          outline: "none",
          fontFamily: "var(--font-main)",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        padding: "0",
        maxWidth: "600px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 20px",
          borderBottom: "1px solid #F1F5F9",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "#1C3E8A",
            fontSize: "1.2rem",
          }}
        >
          ←
        </button>
        <h1 style={{ fontSize: "1.2rem", color: "#1C3E8A", fontWeight: "800" }}>
          Edit Profile
        </h1>
        <button
          onClick={handleSubmit}
          style={{
            background: "none",
            border: "none",
            color: "#1C3E8A",
            fontWeight: "700",
            fontSize: "1rem",
          }}
        >
          Save
        </button>
      </header>

      {/* Profile Picture Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 20px 24px",
          position: "relative",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#818CF8",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              fontWeight: "600",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : user.profile_picture ? (
              <img
                src={
                  user.profile_picture.startsWith("http")
                    ? user.profile_picture
                    : `http://localhost:5001${user.profile_picture}`
                }
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              (user.username || "U").charAt(0).toUpperCase()
            )}
          </div>
          <button
            onClick={() => setUploadOption(!uploadOption)}
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              background: "#1C3E8A",
              color: "white",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid white",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            📷
          </button>
        </div>
        <p
          onClick={() => setUploadOption(!uploadOption)}
          style={{
            color: "#64748B",
            fontSize: "0.85rem",
            marginTop: "12px",
            cursor: "pointer",
          }}
        >
          Tap to change profile picture
        </p>

        {/* Upload Options Menu */}
        {uploadOption && (
          <div
            style={{
              position: "absolute",
              top: "150px",
              background: "white",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              zIndex: 10,
              overflow: "hidden",
              width: "200px",
            }}
          >
            <button
              onClick={() => fileInputRef.current.click()}
              style={{
                width: "100%",
                padding: "12px",
                textAlign: "left",
                background: "none",
                borderBottom: "1px solid #F1F5F9",
                color: "#1E293B",
              }}
            >
              Choose from Gallery
            </button>
            <button
              onClick={startCamera}
              style={{
                width: "100%",
                padding: "12px",
                textAlign: "left",
                background: "none",
                borderBottom: "1px solid #F1F5F9",
                color: "#1E293B",
              }}
            >
              Take Photo
            </button>
            <button
              onClick={handleRemovePhoto}
              style={{
                width: "100%",
                padding: "12px",
                textAlign: "left",
                background: "none",
                color: "#EF4444",
              }}
            >
              Remove Photo
            </button>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handlePhotoUpload}
        />
        <input
          type="file"
          ref={cameraInputRef}
          style={{ display: "none" }}
          accept="image/*"
          capture="environment"
          onChange={handlePhotoUpload}
        />
      </div>

      {/* Form Fields */}
      <div style={{ padding: "0 20px 40px" }}>
        {renderInputCard("Full Name", "username", "text", "Enter full name")}
        {renderInputCard("Phone Number", "phone", "tel", "Enter phone number")}
        {renderInputCard("Age", "age", "number", "Enter age")}
        {renderInputCard(
          "Email (cannot be changed)",
          "email",
          "email",
          "",
          true,
        )}
        {renderInputCard(
          "Education Level",
          "education_level",
          "text",
          "e.g. 12th Standard",
        )}
        {renderInputCard(
          "Interested Field",
          "interested_field",
          "text",
          "e.g. Computer Science",
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "32px",
          }}
        >
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "16px",
              background: "#1C3E8A",
              color: "white",
              fontWeight: "700",
              fontSize: "1rem",
              boxShadow: "0 4px 12px rgba(28, 62, 138, 0.3)",
            }}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={() => navigate(-1)}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "16px",
              background: "transparent",
              color: "#64748B",
              fontWeight: "700",
              fontSize: "1rem",
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Camera UI Overlay */}
      {isCameraOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", maxWidth: "600px", borderRadius: "16px", objectFit: "cover" }}
          ></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <div style={{ marginTop: "24px", display: "flex", gap: "20px" }}>
            <button
              onClick={capturePhoto}
              style={{
                background: "#10B981",
                color: "white",
                padding: "14px 32px",
                borderRadius: "30px",
                border: "none",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(16, 185, 129, 0.4)",
              }}
            >
              📷 Capture
            </button>
            <button
              onClick={stopCamera}
              style={{
                background: "#EF4444",
                color: "white",
                padding: "14px 32px",
                borderRadius: "30px",
                border: "none",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
