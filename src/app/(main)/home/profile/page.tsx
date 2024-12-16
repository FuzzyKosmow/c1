"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserInfo } from "@/services/api/auth/getCurrentUserInfo";
import PencilSquareIcon from "@/assets/icons/pencil-square.svg";
import CheckIcon from "@/assets/icons/check-icon.svg";
import Image from "next/image";
import { updateUserInfo } from "@/services/api/auth/updateUser";
import useAuthStore from "@/stores/auth.store";
import { toast } from "react-toastify";
const ProfilePanel: React.FC = () => {
  const router = useRouter();
  const successToast = () => toast.success("Profile updated successfully!");
  const errorToast = () => toast.error("Error updating profile!");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    province: "",
    district: "",
    address: "",
  });

  useEffect(() => {
    getCurrentUserInfo()
      .then((res) => {
        console.log("User info:", res);
        setUserInfo(res);
        setFormData({
          fullName: res.fullName || "",
          phoneNumber: res.phoneNumber || "",
          province: res.province || "",
          district: res.district || "",
          address: res.address || "",
        });
      })
      .catch((err) => {
        router.push("/sign-in");
      });
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSaveClick = (field: string) => {
    console.log(`Updated ${field}:`, formData[field]);
    setIsEditing({ ...isEditing, [field]: false });
  };
  const handleSubmit = () => {
    updateUserInfo(userInfo.id, formData)
      .then((res) => {
        successToast();
      })
      .catch((err) => {
        errorToast();
      });
  };
  const handleLogout = () => {
    useAuthStore.getState().clearToken();
    router.push("/sign-in");
  };
  return (
    <div className="w-2/3 mx-auto p-8 shadow-md rounded-lg font-sans mt-12 bg-white flex flex-col gap-8">
      {/* Log out button left aligned */}
      <div>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700"
        >
          Log Out
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Your Profile
        </h1>
      </div>

      {/* Name and Phone Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={!isEditing.fullName}
              className={`mt-1 block w-full p-3 border ${
                isEditing.fullName ? "border-blue-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            <button
              type="button"
              onClick={() =>
                isEditing.fullName
                  ? handleSaveClick("fullName")
                  : handleEditClick("fullName")
              }
              className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 hover:text-gray-700"
            >
              {isEditing.fullName ? (
                <Image
                  src={CheckIcon}
                  alt="Check Icon"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={PencilSquareIcon}
                  alt="Pencil Square Icon"
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing.phoneNumber}
              className={`mt-1 block w-full p-3 border ${
                isEditing.phoneNumber ? "border-blue-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            <button
              type="button"
              onClick={() =>
                isEditing.phoneNumber
                  ? handleSaveClick("phoneNumber")
                  : handleEditClick("phoneNumber")
              }
              className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 hover:text-gray-700"
            >
              {isEditing.phoneNumber ? (
                <Image
                  src={CheckIcon}
                  alt="Check Icon"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={PencilSquareIcon}
                  alt="Pencil Square Icon"
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Province and District */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Province
          </label>
          <div className="relative">
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              disabled={!isEditing.province}
              className={`mt-1 block w-full p-3 border ${
                isEditing.province ? "border-blue-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            <button
              type="button"
              onClick={() =>
                isEditing.province
                  ? handleSaveClick("province")
                  : handleEditClick("province")
              }
              className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 hover:text-gray-700"
            >
              {isEditing.province ? (
                <Image
                  src={CheckIcon}
                  alt="Check Icon"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={PencilSquareIcon}
                  alt="Pencil Square Icon"
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            District
          </label>
          <div className="relative">
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              disabled={!isEditing.district}
              className={`mt-1 block w-full p-3 border ${
                isEditing.district ? "border-blue-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            <button
              type="button"
              onClick={() =>
                isEditing.district
                  ? handleSaveClick("district")
                  : handleEditClick("district")
              }
              className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 hover:text-gray-700"
            >
              {isEditing.district ? (
                <Image
                  src={CheckIcon}
                  alt="Check Icon"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={PencilSquareIcon}
                  alt="Pencil Square Icon"
                  width={20}
                  height={20}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <div className="relative">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            disabled={!isEditing.address}
            className={`mt-1 block w-full p-3 border ${
              isEditing.address ? "border-blue-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          />
          <button
            type="button"
            onClick={() =>
              isEditing.address
                ? handleSaveClick("address")
                : handleEditClick("address")
            }
            className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-500 hover:text-gray-700"
          >
            {isEditing.address ? (
              <Image src={CheckIcon} alt="Check Icon" width={20} height={20} />
            ) : (
              <Image
                src={PencilSquareIcon}
                alt="Pencil Square Icon"
                width={20}
                height={20}
              />
            )}
          </button>
        </div>
      </div>

      {/* Email and Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={userInfo?.email || ""}
            disabled
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:ring-none focus:border-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={userInfo?.role || ""}
            disabled
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:ring-none focus:border-none"
          />
        </div>
      </div>

      {/* Save All Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-3 text-white bg-black-500 rounded-md hover:bg-gray-600"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
};

export default ProfilePanel;
