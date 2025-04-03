import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";

// Interface for image upload component
interface ImageUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
  index?: number;
}

// Interface for team member
interface TeamMember {
  name: string;
  position: string;
  image: string | null;
  xHandle: string;
  linkedinHandle: string;
  instagramHandle: string;
}

const TeamSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "team";
  const [loading, setLoading] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Our Team");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      name: "",
      position: "",
      image: null,
      xHandle: "",
      linkedinHandle: "",
      instagramHandle: ""
    },
  ]);

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        console.log(response.data);

        if (response?.data) {
          const settings = response.data?.team.aboutSettings;
          setHeaderTitle(settings.header_title || "Our Team");
          
          // Set team members if available
          if (settings.members && settings.members.length > 0) {
            setTeamMembers(settings.members);
          }
        }
      })
      .catch(() => {
        // Silent error handling
      })
      .finally(() => setLoading(false));
  }, [selectedStore]);

  const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage }) => {
    const [uploadLoading, setUploadLoading] = useState(false);

    const handleImageChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadLoading(true);

        try {
          // Create a FormData object
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "urban_image");

          // Upload to Cloudinary
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dngyazspl/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json();
          if (result.secure_url) {
            setImage(result.secure_url);
          }
        } catch (error) {
          console.error("Error uploading image", error);
          toast.error("Error uploading image. Please try again.");
        } finally {
          setUploadLoading(false);
        }
      }
    };

    return (
      <div className="flex justify-center text-center mb-3">
        <label className="flex w-full bg-[#FBFBFF] border border-[#D8D8E2] flex-col items-center justify-center rounded-[5px] cursor-pointer relative">
          <div className="flex flex-col items-center justify-center h-[120px] w-full">
            {image ? (
              <img
                src={image}
                alt="Team Member"
                className="max-h-[110px] max-w-full object-contain"
              />
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <h4 className="text-[#9D9D9D] text-[12px] font-[400]">
                    Upload Team Member Photo
                  </h4>
                  <h4 className="text-[#9D9D9D] text-[10px] font-[400]">
                    Recommended size 400px by 400px
                  </h4>
                </div>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            className="hidden mb-2 text-sm text-[#6C757D] font-medium"
            onChange={handleImageChange}
          />
        </label>
        {uploadLoading && <div className="absolute"><LoadingSpinner /></div>}
      </div>
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await UserApis.updateSettings(
        selectedStore,
        sectionName,
        {
          aboutSettings: {
            header_title: headerTitle,
            members: teamMembers,
          },
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Team settings updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating team settings. Please try again.");
    }
    setLoading(false);
  };

  const handleTeamMemberChange = (index: number, field: string, value: string) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index] = {
      ...updatedTeamMembers[index],
      [field]: value
    };
    setTeamMembers(updatedTeamMembers);
  };

  const handleTeamMemberImageChange = (index: number, imageUrl: string | null) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index] = {
      ...updatedTeamMembers[index],
      image: imageUrl
    };
    setTeamMembers(updatedTeamMembers);
  };

  const handleAddTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      {
        name: "",
        position: "",
        image: null,
        xHandle: "",
        linkedinHandle: "",
        instagramHandle: ""
      },
    ]);
  };

  const handleRemoveTeamMember = (index: number) => {
    const updatedTeamMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedTeamMembers);
  };

  return (
    <div className="bg-white mt-4 rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-4">
        Team Section Settings
      </h4>

      <div>
        {/* Header Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Team Section Title:</label>
          <input
            type="text"
            value={headerTitle}
            onChange={(e) => setHeaderTitle(e.target.value)}
            className="w-full h-12 border rounded-md p-2"
          />
        </div>

        {/* Team Members Section */}
        <div>
          <h4 className="text-lg font-bold mb-2">Team Members:</h4>
          {teamMembers.map((member, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4">
              {/* Member Number */}
              <div className="bg-gray-100 px-3 py-1 mb-3 inline-block rounded-md">
                <span className="font-medium">Team Member {index + 1}</span>
              </div>
              
              {/* Name */}
              <label className="block font-semibold mb-1">Name:</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) =>
                  handleTeamMemberChange(index, "name", e.target.value)
                }
                className="w-full h-10 border rounded-md p-2 mb-3"
                placeholder="John Doe"
              />

              {/* position */}
              <label className="block font-semibold mb-1">Position:</label>
              <input
                type="text"
                value={member.position}
                onChange={(e) =>
                  handleTeamMemberChange(index, "position", e.target.value)
                }
                className="w-full h-10 border rounded-md p-2 mb-3"
                placeholder="CEO & Founder"
              />

              {/* Member Photo */}
              <label className="block font-semibold mb-1">Team Member Photo:</label>
              <ImageUpload 
                image={member.image} 
                setImage={(imageUrl) => handleTeamMemberImageChange(index, imageUrl)}
                index={index}
              />

              {/* Social Media Handles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                {/* X Handle */}
                <div>
                  <label className="block font-semibold mb-1">X (Twitter) Handle:</label>
                  <input
                    type="text"
                    value={member.xHandle}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "xHandle", e.target.value)
                    }
                    className="w-full h-10 border rounded-md p-2 mb-3"
                    placeholder="@username"
                  />
                </div>

                {/* LinkedIn Handle */}
                <div>
                  <label className="block font-semibold mb-1">LinkedIn Handle:</label>
                  <input
                    type="text"
                    value={member.linkedinHandle}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "linkedinHandle", e.target.value)
                    }
                    className="w-full h-10 border rounded-md p-2 mb-3"
                    placeholder="username"
                  />
                </div>

                {/* Instagram Handle */}
                <div>
                  <label className="block font-semibold mb-1">Instagram Handle:</label>
                  <input
                    type="text"
                    value={member.instagramHandle}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "instagramHandle", e.target.value)
                    }
                    className="w-full h-10 border rounded-md p-2 mb-3"
                    placeholder="username"
                  />
                </div>
              </div>

              {/* Remove Button */}
              {teamMembers.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTeamMember(index)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                >
                  Remove Team Member
                </button>
              )}
            </div>
          ))}

          {/* Add Team Member Button */}
          <button
            type="button"
            onClick={handleAddTeamMember}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Add Team Member
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`text-white py-2 px-6 rounded-md mt-6 w-full ${
            loading ? "bg-green-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default TeamSettings;