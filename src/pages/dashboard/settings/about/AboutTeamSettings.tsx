import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApis } from "../../../../apis/userApi/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import LoadingSpinner from "../../../../components/UI/LoadingSpinner";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

// Section type interface
interface AccordionSection {
  id: string;
  title: string;
  isOpen: boolean;
}

const TeamSettings = () => {
  const selectedStore = useSelector(
    (state: RootState) => state.globalState?.selectedStore || null
  );

  const sectionName = "team";
  const [loading, setLoading] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
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

  // Accordion state - all sections closed initially
  const [sections, setSections] = useState<AccordionSection[]>([
    { id: "general", title: "General Settings", isOpen: false },
    { id: "members", title: "Team Members", isOpen: false }
  ]);

  // Individual team member accordion state - all closed initially
  const [openMembers, setOpenMembers] = useState<number[]>([]);

  // Toggle section visibility
  const toggleSection = (sectionId: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, isOpen: !section.isOpen } 
          : section
      )
    );
  };

  // Toggle team member visibility
  const toggleMember = (index: number) => {
    setOpenMembers(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Get section open state
  const isSectionOpen = (sectionId: string): boolean => {
    return sections.find(section => section.id === sectionId)?.isOpen || false;
  };

  // Get team member open state
  const isMemberOpen = (index: number): boolean => {
    return openMembers.includes(index);
  };

  // Fetch settings from the API
  useEffect(() => {
    if (!selectedStore) return;

    setLoading(true);
    UserApis.getStoreSettings(selectedStore, sectionName)
      .then((response) => {
        if (response?.data) {
          const settings = response.data?.team.aboutSettings;
          setHeaderTitle(settings.header_title);
          
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
    const newMember = {
      name: "",
      position: "",
      image: null,
      xHandle: "",
      linkedinHandle: "",
      instagramHandle: ""
    };
    
    setTeamMembers([...teamMembers, newMember]);
    
    // Auto-open the newly added member
    const newIndex = teamMembers.length;
    setOpenMembers(prev => [...prev, newIndex]);
  };

  const handleRemoveTeamMember = (index: number) => {
    const updatedTeamMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedTeamMembers);
    
    // Update open members state
    setOpenMembers(prev => 
      prev.filter(i => i !== index)
        .map(i => i > index ? i - 1 : i)
    );
  };

  // Section header component
  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    <div 
      className="flex justify-between items-center py-3 px-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
      onClick={() => toggleSection(id)}
    >
      <h5 className="font-semibold">{title}</h5>
      <div className="text-gray-600">
        {isSectionOpen(id) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  // Team member header component
  const MemberHeader = ({ index, name }: { index: number; name: string }) => (
    <div 
      className="flex justify-between items-center py-2 px-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => toggleMember(index)}
    >
      <div className="font-medium">
        {name ? `${name} - Member ${index + 1}` : `Team Member ${index + 1}`}
      </div>
      <div className="text-gray-600">
        {isMemberOpen(index) ? <FaChevronUp /> : <FaChevronDown />}
      </div>
    </div>
  );

  return (
    <div className="bg-white mt-4 rounded-[14px] p-6 shadow-lg">
      <h4 className="text-[#000000] text-[18px] font-bold pb-6">
        Team Section Settings
      </h4>

      <div className="space-y-5">
        {/* General Settings Section */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="general" title="General Settings" />
          
          {isSectionOpen("general") && (
            <div className="p-4 transition-all duration-300 ease-in-out">
              <label className="block font-semibold mb-1">Team Section Title:</label>
              <input
                type="text"
                value={headerTitle}
                onChange={(e) => setHeaderTitle(e.target.value)}
                className="w-full h-12 border rounded-md p-2"
              />
            </div>
          )}
        </div>

        {/* Team Members Section */}
        <div className="border rounded-lg overflow-hidden">
          <SectionHeader id="members" title="Team Members" />
          
          {isSectionOpen("members") && (
            <div className="p-4 space-y-4 transition-all duration-300 ease-in-out">
              {teamMembers.map((member, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <MemberHeader index={index} name={member.name} />
                  
                  {isMemberOpen(index) && (
                    <div className="p-4 space-y-3 transition-all duration-300 ease-in-out">
                      {/* Name */}
                      <div>
                        <label className="block font-semibold mb-1">Name:</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "name", e.target.value)
                          }
                          className="w-full h-10 border rounded-md p-2"
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Position */}
                      <div>
                        <label className="block font-semibold mb-1">Position:</label>
                        <input
                          type="text"
                          value={member.position}
                          onChange={(e) =>
                            handleTeamMemberChange(index, "position", e.target.value)
                          }
                          className="w-full h-10 border rounded-md p-2"
                          placeholder="CEO & Founder"
                        />
                      </div>

                      {/* Member Photo */}
                      <div>
                        <label className="block font-semibold mb-1">Team Member Photo:</label>
                        <ImageUpload 
                          image={member.image} 
                          setImage={(imageUrl) => handleTeamMemberImageChange(index, imageUrl)}
                          index={index}
                        />
                      </div>

                      {/* Social Media Handles */}
                      <div>
                        <label className="block font-semibold mb-2">Social Media:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {/* X Handle */}
                          <div>
                            <label className="block text-sm mb-1">X (Twitter) Handle:</label>
                            <input
                              type="text"
                              value={member.xHandle}
                              onChange={(e) =>
                                handleTeamMemberChange(index, "xHandle", e.target.value)
                              }
                              className="w-full h-10 border rounded-md p-2"
                              placeholder="@username"
                            />
                          </div>

                          {/* LinkedIn Handle */}
                          <div>
                            <label className="block text-sm mb-1">LinkedIn Handle:</label>
                            <input
                              type="text"
                              value={member.linkedinHandle}
                              onChange={(e) =>
                                handleTeamMemberChange(index, "linkedinHandle", e.target.value)
                              }
                              className="w-full h-10 border rounded-md p-2"
                              placeholder="username"
                            />
                          </div>

                          {/* Instagram Handle */}
                          <div>
                            <label className="block text-sm mb-1">Instagram Handle:</label>
                            <input
                              type="text"
                              value={member.instagramHandle}
                              onChange={(e) =>
                                handleTeamMemberChange(index, "instagramHandle", e.target.value)
                              }
                              className="w-full h-10 border rounded-md p-2"
                              placeholder="username"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      {teamMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTeamMember(index)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md mt-2"
                        >
                          Remove Team Member
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Add Team Member Button */}
              <button
                type="button"
                onClick={handleAddTeamMember}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full"
              >
                Add Team Member
              </button>
            </div>
          )}
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