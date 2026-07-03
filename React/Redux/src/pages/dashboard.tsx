import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaBoxOpen,
} from "react-icons/fa";

const salesData = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1900 },
  { month: "Mar", sales: 1500 },
  { month: "Apr", sales: 2800 },
  { month: "May", sales: 2400 },
  { month: "Jun", sales: 3200 },
];

const ordersData = [
  { day: "Mon", orders: 25 },
  { day: "Tue", orders: 35 },
  { day: "Wed", orders: 28 },
  { day: "Thu", orders: 42 },
  { day: "Fri", orders: 50 },
  { day: "Sat", orders: 38 },
];

const pieData = [
  { name: "Electronics", value: 45 },
  { name: "Fashion", value: 30 },
  { name: "Beauty", value: 15 },
  { name: "Sports", value: 10 },
];

const colors = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
];

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-slate-100 p-6">

      {/* Header */}

      <div className="mb-8">
        <h1 className="products text-4xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back Boss! Here's what's happening today.
        </p>
      </div>

      {/* Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Revenue</p>

              <h2 className="mt-2 text-3xl font-bold">
                $48,320
              </h2>
            </div>

            <div className="rounded-xl bg-green-100 p-4 text-green-600">
              <FaDollarSign size={26} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Orders</p>

              <h2 className="mt-2 text-3xl font-bold">
                1,248
              </h2>
            </div>

            <div className="rounded-xl bg-blue-100 p-4 text-[#2563eb]">
              <FaShoppingCart size={26} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Customers</p>

              <h2 className="mt-2 text-3xl font-bold">
                893
              </h2>
            </div>

            <div className="rounded-xl bg-purple-100 p-4 text-purple-600">
              <FaUsers size={26} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Products</p>

              <h2 className="mt-2 text-3xl font-bold">
                128
              </h2>
            </div>

            <div className="rounded-xl bg-orange-100 p-4 text-orange-600">
              <FaBoxOpen size={26} />
            </div>
          </div>
        </div>

      </div>

      {/* Charts */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

          <h2 className="mb-6 text-xl font-bold">
            Monthly Revenue
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8A735A"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

          <h2 className="mb-6 text-xl font-bold">
            Categories
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={colors[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Orders */}

      <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

        <h2 className="mb-6 text-xl font-bold">
          Weekly Orders
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={ordersData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="orders"
              fill="#72470a"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </main>
  );
};

export default Dashboard;