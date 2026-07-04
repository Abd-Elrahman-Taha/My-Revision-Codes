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

const activityData = [
  {
    id: 1,
    title: "New order received",
    description: "Order #1024 was placed.",
    time: "2 min ago",
    color: "bg-green-500",
  },
  {
    id: 2,
    title: "Product updated",
    description: "Powder Canister stock updated.",
    time: "20 min ago",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "New customer",
    description: "Ahmed created an account.",
    time: "1 hour ago",
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Order delivered",
    description: "Order #1012 delivered successfully.",
    time: "3 hours ago",
    color: "bg-orange-500",
  },
];
const customers = [
  {
    name: "Ahmed Ali",
    email: "ahmed@email.com",
  },
  {
    name: "Sarah",
    email: "sarah@email.com",
  },
  {
    name: "John",
    email: "john@email.com",
  },
];
const topProducts = [
   {
    id: 1,
    name: "Chanel Coco Noir Eau De",
    sold: 320,
    revenue: "$41,596.80",
  },{
    id: 2,
    name: "Annibale Colombo Sofa",
    sold: 95,
    revenue: "$237,405",
  },
 
  {
    id: 3,
    name: "Annibale Colombo Bed",
    sold: 68,
    revenue: "$129,199.32",
  },
  {
    id: 4,
    name: "Bedside Table African Cherry",
    sold: 54,
    revenue: "$16,199.46",
  },
];
const orderStatus = [
  {
    title: "Pending",
    count: 18,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Processing",
    count: 42,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Shipped",
    count: 37,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Delivered",
    count: 216,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Cancelled",
    count: 4,
    color: "bg-red-100 text-red-700",
  },
];
const today = new Date();

const events = [
  {
    title: "Summer Sale Starts",
    date: "Jul 10",
  },
  {
    title: "New Products Release",
    date: "Jul 15",
  },
  {
    title: "Flash Sale",
    date: "Jul 20",
  },
];

const Dashboard = () => {
  return (
    <main className="body min-h-screen bg-slate-100 p-6">

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
     {/* Monthly Goal + Calendar */}
<div className="mt-6 grid gap-6 lg:grid-cols-2">

  {/* ================= Monthly Goal ================= */}
  <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold">
          Monthly Goal
        </h2>

        <p className="text-slate-500 text-xl">
          $32,000 of $50,000
        </p>
      </div>

      <span className="text-2xl font-bold text-[#72470a]">
        64%
      </span>
    </div>

    <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full bg-[#72470a] transition-all duration-700"
        style={{ width: "64%" }}
      />
    </div>

    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
      <div className="rounded-xl bg-slate-100 p-4">
        <p className="text-slate-500">Remaining</p>
        <p className="mt-1 text-2xl font-bold">$18K</p>
      </div>

      <div className="rounded-xl bg-slate-100 p-4">
        <p className="text-slate-500">Days Left</p>
        <p className="mt-1 text-2xl font-bold">12</p>
      </div>

      <div className="rounded-xl bg-slate-100 p-4">
        <p className="text-slate-500">Target</p>
        <p className="mt-1 text-2xl font-bold">$50K</p>
      </div>
    </div>

    <div className="mt-6 rounded-xl border border-[#72470a]/20 bg-[#72470a]/5 p-4">
      <p className="text-slate-500">
        Estimated End of Month
      </p>

      <h3 className="mt-2 text-3xl font-bold text-[#72470a]">
        $49,800
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        Only <span className="font-semibold">$200</span> away from the target.
      </p>
    </div>

    <div className="mt-6">
      <h3 className="mb-4 font-semibold">
        Weekly Progress
      </h3>

      <div className="space-y-4">
        {[
          { week: "Week 1", value: 85 },
          { week: "Week 2", value: 60 },
          { week: "Week 3", value: 45 },
          { week: "Week 4", value: 20 },
        ].map((item) => (
          <div key={item.week}>
            <div className="mb-2 flex justify-between text-sm">
              <span>{item.week}</span>
              <span>{item.value}%</span>
            </div>

            <div className="h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-[#72470a]"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ================= Calendar ================= */}
  <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <h2 className="mb-6 text-3xl font-bold">
      Calendar
    </h2>

    <div className="rounded-2xl bg-[#72470a] p-6 text-white">
      <p className="text-sm opacity-80">
        Today
      </p>

      <h3 className="mt-2 text-6xl font-bold">
        {today.getDate()}
      </h3>

      <p className="mt-2 text-xl">
        {today.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          year: "numeric",
        })}
      </p>

      <p className="mt-2 text-lg opacity-80">
        {today.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>

    <h3 className="mt-8 mb-4 text-xl font-semibold">
      Upcoming Events
    </h3>

    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.title}
          className="flex items-center justify-between rounded-xl border p-4"
        >
          <div>
            <p className="font-semibold">
              {event.title}
            </p>

            <p className="text-sm text-slate-500">
              Promotion
            </p>
          </div>

          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
            {event.date}
          </span>
        </div>
      ))}
    </div>
  </div>

</div>
    <div className="mt-8 grid gap-6 lg:grid-cols-2">

  {/* Recent Activity */}
  <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <h2 className="mb-6 text-xl font-bold">
      Recent Activity
    </h2>

    <div className="space-y-6">
      {activityData.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-4"
        >
          <div
            className={`mt-1 h-4 w-4 rounded-full ${activity.color}`}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {activity.title}
              </h3>

              <span className="text-sm text-slate-400">
                {activity.time}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              {activity.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* New Customers */}
  <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <h2 className="mb-6 text-xl font-bold">
      New Customers
    </h2>

    <div className="space-y-5">
      {customers.map((customer) => (
        <div
          key={customer.email}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#72470a] font-bold text-white">
              {customer.name[0]}
            </div>

            <div>
              <p className="font-semibold">
                {customer.name}
              </p>

              <p className="text-sm text-slate-500">
                {customer.email}
              </p>
            </div>
          </div>

          <span className="text-sm text-green-600">
            New
          </span>
        </div>
      ))}
    </div>
  </div>
</div>
{/* Order Status */}
<div className="mt-8">
  <h2 className="products mb-6 text-xl font-bold">
    Order Status
  </h2>

  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
    {orderStatus.map((status) => (
      <div
        key={status.title}
        className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
      >
        <p className="text-slate-500">
          {status.title}
        </p>

        <div
          className={`mt-4 inline-flex rounded-full px-4 py-2 text-2xl font-bold ${status.color}`}
        >
          {status.count}
        </div>
      </div>
    ))}
  </div>
</div>
<div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl mt-6">
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-xl font-bold">
      Top Selling Products
    </h2>

    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
      This Month
    </span>
  </div>

  <div className="space-y-6">
    {topProducts.map((product) => (
      <div key={product.id}>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">
              {product.name}
            </h3>

            <p className="text-sm text-slate-500">
              {product.revenue}
            </p>
          </div>

          <span className="font-bold text-[#72470a]">
            {product.sold}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#72470a] transition-all duration-700"
            style={{
              width: `${product.sold}%`,
            }}
          />
        </div>
      </div>
    ))}
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