"use client";
import SHOPPING_CART_ICON from "@/assets/icons/shopping-cart-01.svg";
import DOLLAR_ICON from "@/assets/icons/currency-dollar-circle.svg";
import USER_ICON from "@/assets/icons/users-03.svg";
import GLOBE_ICON from "@/assets/icons/globe-01.svg";
import Image from "next/image";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/auth.store";

interface DashboardStats {
  revenue: string;
  orders: number;
  customers: number;
  siteVisits: number;
  salesDistribution: { name: string; value: number }[];
  earnings: { name: string; earnings: number }[];
  topProducts: {
    name: string;
    sales: number;
    stock: number;
    earnings: string;
  }[];
}

// Black 500, Black 300, Black 100, Neu  200
const COLORS = ["#1C1C1C", "#333", "#666", "#999"];

export default function Dashboard() {
  const [activeIndex, setActiveIndex] = useState(null); // State to track hovered bar
  const [data, setStatData] = useState<DashboardStats>({
    revenue: "0",
    orders: 0,
    customers: 0,
    siteVisits: 0,
    salesDistribution: [],
    earnings: [],
    topProducts: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = useAuthStore.getState().token;
      const res = await fetch("http://localhost:5100/api/siteInfo/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
      console.log(res);
      setStatData(res);
    };
    fetchData();
  }, []);
  const handleMouseEnter = (index) => {
    setActiveIndex(index); // Update state with the index of hovered bar
  };

  const handleMouseLeave = () => {
    setActiveIndex(null); // Reset hover state when mouse leaves
  };

  const formatRevenue = (value) => {
    // Input : $98,226,000.00
    // Desired output:  98.226M
    let number = Number(value.replace(/[^0-9.-]+/g, ""));
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixNum = 0;
    while (number >= 1000) {
      number /= 1000;
      suffixNum++;
    }

    return `${number.toFixed(3)}${suffixes[suffixNum]}`;
  };
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Header Summary */}
      <div className="grid grid-cols-4 gap-4">
        <InfoCard
          title="Revenue"
          value={formatRevenue(data.revenue)}
          icon={DOLLAR_ICON}
        />
        <InfoCard
          title="Orders"
          value={data.orders}
          icon={SHOPPING_CART_ICON}
        />
        <InfoCard title="Customers" value={data.customers} icon={USER_ICON} />
        <InfoCard
          title="Site Visits"
          value={data.siteVisits}
          icon={GLOBE_ICON}
        />
      </div>

      {/* Graphs Section */}
      {/*  First grahp take 70% of width */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        {/* Average Earnings */}

        <div className="bg-white p-4 shadow rounded-lg col-span-2">
          <h3 className="text-lg font-semibold">Average Earnings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.earnings}>
              <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
              <YAxis />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  borderRadius: "8px",
                  border: "none",
                }}
                labelStyle={{ color: "#fff", fontWeight: "bold" }}
                itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="earnings">
                {data.earnings.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === activeIndex ? "#1C1C1C" : "#f1f1f1"}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Distribution */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Sales Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.salesDistribution}
                dataKey="value"
                outerRadius={100}
                label
              >
                {data.salesDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products Section */}
      <div className="mt-8 bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Top Products</h3>

        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Sales</th>
              <th>Stock</th>
              <th>Earnings</th>
            </tr>
          </thead>
          <tbody>
            {data.topProducts.map((product, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td>{product.name}</td>
                <td>{product.sales}</td>
                <td>{product.stock}</td>
                <td>{product.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// InfoCard Component for summary data
function InfoCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 shadow rounded-lg flex items-center">
      {/* Add rounded corner, nto full rounded */}
      <div className="bg-black-500 p-2 rounded-md mr-4">
        <Image src={icon} width={40} height={40} alt="icon" />
      </div>
      <div>
        <p className="text-3xl font-semibold">{value}</p>
        <h3 className=" text-base">{title}</h3>
      </div>
    </div>
  );
}
