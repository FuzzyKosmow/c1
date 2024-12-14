import React, { useRef } from "react";
import {
  activateVoucher,
  deactivateVoucher,
  deleteVoucher,
} from "@/services/api/admin/voucher-op";
import LOGO from "@/assets/logo.svg";
import PRINT_ICON from "@/assets/icons/print.svg";
import Image from "next/image";
const VoucherTable = ({ vouchers, reloadVouchers, loading }) => {
  const printRef = useRef();

  const handleAction = async (voucherCode, action) => {
    try {
      if (action === "activate") {
        await activateVoucher(voucherCode);
      } else if (action === "deactivate") {
        await deactivateVoucher(voucherCode);
      } else if (action === "delete") {
        await deleteVoucher(voucherCode);
      }
      reloadVouchers();
    } catch (error) {
      console.error(`Failed to ${action} voucher:`, error);
    }
  };

  const handlePrint = (voucher) => {
    const printContents = `
    <div style="text-align: center; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 400px; margin: auto;">
     
      <h1 style="font-size: 24px; margin-bottom: 20px;">Voucher</h1>
      <p style="margin: 5px 0;"><strong>Code:</strong> ${voucher.code}</p>
      <p style="margin: 5px 0;"><strong>Name:</strong> ${voucher.name}</p>
      <p style="margin: 5px 0;"><strong>Discount:</strong> ${
        voucher.discountPercentage
      }%</p>
      <p style="margin: 5px 0;"><strong>Expiry Date:</strong> ${new Date(
        voucher.expiryDate
      ).toLocaleDateString()}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> ${
        voucher.isActive ? "Active" : "Inactive"
      }</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
      <p style="font-size: 14px; color: #555;">Thank you for using our service!</p>
    </div>
  `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
    <html>
      <head>
        <title>Print Voucher</title>
      </head>
      <body onload="window.print(); window.close();">
        ${printContents}
      </body>
    </html>
  `);
    printWindow.document.close();
  };

  if (loading) {
    return <div>Loading vouchers...</div>;
  }

  return (
    <table className="table-auto w-full bg-white shadow-md rounded">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-2">Code</th>
          <th className="p-2">Name</th>
          <th className="p-2">Discount %</th>
          <th className="p-2">Expiry</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {vouchers.map((voucher) => (
          <tr key={voucher.code} className="border-t">
            <td className="p-2">{voucher.code}</td>
            <td className="p-2">{voucher.name}</td>
            <td className="p-2">{voucher.discountPercentage}%</td>
            <td className="p-2">
              {new Date(voucher.expiryDate).toLocaleDateString()}
            </td>
            <td className="p-2">{voucher.isActive ? "Active" : "Inactive"}</td>
            <td className="p-2">
              <div className="flex space-x-2">
                {voucher.isActive ? (
                  <button
                    onClick={() => handleAction(voucher.code, "deactivate")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction(voucher.code, "activate")}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Activate
                  </button>
                )}
                <button
                  onClick={() => handleAction(voucher.code, "delete")}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handlePrint(voucher)}
                  className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                >
                  <Image src={PRINT_ICON} alt="Print" width={20} height={20} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VoucherTable;
