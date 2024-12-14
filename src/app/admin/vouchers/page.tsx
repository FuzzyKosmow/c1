"use client";
import React, { useEffect, useState } from "react";
import VoucherTable from "@/components/Admin/Vouchers/VoucherTable";
import AddVoucherModal from "@/components/Admin/Vouchers/AddVoucherModal";

import { addVoucher } from "@/services/api/admin/voucher-op";
import { getVouchersFromAdmin } from "@/services/api/admin/voucher-op";
const AdminVoucherPanel = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadVouchers();
  }, []);

  const loadVouchers = async () => {
    setLoading(true);
    try {
      const response = await getVouchersFromAdmin();

      setVouchers(response);
    } catch (error) {
      console.error("Failed to fetch vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVoucher = async (voucherData) => {
    try {
      await addVoucher(voucherData);
      setShowAddModal(false);
      loadVouchers(); // Refresh vouchers
    } catch (error) {
      console.error("Failed to add voucher:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Manage Vouchers</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-black-500 text-white px-4 py-2 rounded"
        >
          Add Voucher
        </button>
      </div>

      <VoucherTable
        vouchers={vouchers}
        reloadVouchers={loadVouchers}
        loading={loading}
      />

      {showAddModal && (
        <AddVoucherModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddVoucher}
        />
      )}
    </div>
  );
};

export default AdminVoucherPanel;
