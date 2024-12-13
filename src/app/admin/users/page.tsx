"use client";
import { useEffect, useState } from "react";

import useAuthStore from "@/stores/auth.store";
import IconButton from "@/components/IconButton";
import EDIT_ICON from "../../../assets/icons/edit-02.svg";
import DELETE_ICON from "../../../assets/icons/trash-01.svg";
import PRINT_ICON from "../../../assets/icons/printer.svg";
import {
  getUsersAdmin,
  updateUserAdmin,
  deleteUserAdmin,
} from "@/services/api/admin/user-op";
import Pagination from "@/components/Pagination";
export default function UserManagement() {
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [users, setUsers] = useState([] as UserInfo[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [page, limit]);
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };
  const fetchUsers = async () => {
    const data = await getUsersAdmin({ page, limit });
    setTotalPage(Math.ceil(data.total / limit));
    setUsers(data.users);
  };

  const openModal = (user: UserInfo | null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    await fetchUsers(); // Refresh users after save
  };
  const handleConfirmDelete = async () => {
    if (deleteUserId) {
      await deleteUserAdmin(deleteUserId);
      setDeleteUserId(null);
      fetchUsers(); // Refresh the user list after deletion
    }
  };
  const handleCancelDelete = () => {
    setDeleteUserId(null);
  };
  const handleDeleteUser = (userId: string) => {
    setDeleteUserId(userId);
  };

  const shortenedId = (id: string) => {
    const maxLength = 10;
    return id.length > maxLength ? `${id.substr(0, maxLength)}...` : id;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Users</h1>
      <button
        className="bg-black-500 text-white px-4 py-2 rounded mb-4 float-right mr-4"
        onClick={() => {
          const csv = users.map((user) => {
            return `${user.id},${user.fullName},${user.email},${user.role},${user.totalOrders},${user.totalValue}`;
          });
          const csvString = csv.join("\n");
          const blob = new Blob([csvString], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "users.csv";
          a.click();
        }}
      >
        Export to CSV
      </button>

      <button
        className="bg-black-500 text-white px-4 py-2 rounded float-right mr-3"
        onClick={() => {
          window.print();
        }}
      >
        Print
      </button>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">ID</th>
            <th className="border border-gray-200 px-4 py-2">Username</th>
            <th className="border border-gray-200 px-4 py-2">Email</th>
            <th className="border border-gray-200 px-4 py-2">Role</th>
            <th className="border border-gray-200 px-4 py-2">Total Order</th>
            <th className="border border-gray-200 px-4 py-2">Total Value</th>
            <th className="border border-gray-200 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={deleteUserId === user.id ? "bg-red-100" : ""}
            >
              <td className="border border-gray-200 px-4 py-2">
                {shortenedId(user.id)}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {user.fullName}
              </td>
              <td className="border border-gray-200 px-4 py-2">{user.email}</td>
              <td className="border border-gray-200 px-4 py-2">{user.role}</td>
              <td className="border border-gray-200 px-4 py-2">
                {user.totalOrders}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {user.totalValue}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <IconButton
                  icon={EDIT_ICON}
                  alt="edit"
                  onClick={() => openModal(user)}
                />
                <IconButton
                  icon={DELETE_ICON}
                  alt="delete"
                  onClick={() => handleDeleteUser(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={(page) => setPage(page)}
          onItemsPerPageChange={handleLimitChange}
          itemsPerPage={limit}
        />
      </div>
      {deleteUserId && (
        <DeleteWarningModal
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this user?"
        />
      )}
      {isModalOpen && <UserModal user={selectedUser} onClose={closeModal} />}
    </div>
  );
}

const UserModal = ({
  user,
  onClose,
}: {
  user: UserInfo | null;
  onClose: () => void;
}) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setPhoneNumber(user.phoneNumber || "");
      setAddress(user.address || "");
      setDistrict(user.district || "");
      setProvince(user.province || "");
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const updateUserDTO = {
      fullName,
      district,
      province,
      phoneNumber,
      address,
    };

    console.log("user id", user.id);

    const res = await updateUserAdmin(user.id, updateUserDTO);
    if (res) {
      onClose();
    }

    onClose();
  };
  // Close on background click. May be annoying for users.
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if ((e.target as Element).classList.contains("modal-background")) {
      // onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center modal-background bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-4 w-96">
        <h2 className="text-xl font-bold mb-4">
          {user ? "Edit" : "Create"} User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="w-full border border-gray-200 p-2"
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="w-full border border-gray-200 p-2"
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="address">
              Address
            </label>
            <input
              className="w-full border border-gray-200 p-2"
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="district">
              District
            </label>
            <input
              className="w-full border border-gray-200 p-2"
              type="text"
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="province">
              Province
            </label>
            <input
              className="w-full border border-gray-200 p-2"
              type="text"
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              {user ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteWarningModal = ({
  onClose,
  onConfirm,
  message,
}: {
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center modal-background bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="bg-white p-4 w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p className="mb-4">{message || "This action cannot be undone."}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
