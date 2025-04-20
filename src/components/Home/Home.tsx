import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Home() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Users Joined',
        data: [100, 200, 150, 300, 250],
        backgroundColor: '#0d6efd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="container py-4">
        <h2 className="mb-4 fw-bold">Welcome to the Admin Dashboard</h2>

        <div className="row g-4 mb-4">
          {[
            { icon: 'users', title: 'Total Users', value: '1,245', sub: 'Active: 1,102', color: 'primary' },
            { icon: 'tasks', title: 'Pending Tasks', value: '58', sub: 'Today: 12 new', color: 'warning' },
            { icon: 'chart-line', title: 'Monthly Growth', value: '+18%', sub: 'Compared to last month', color: 'success' },
            { icon: 'clock', title: 'Active Sessions', value: '340', sub: 'Last 24 hours', color: 'danger' },
          ].map((stat, i) => (
            <div className="col-md-3" key={i}>
              <div className="bg-white shadow-sm p-3 rounded text-center border h-100">
                <i className={`fa fa-${stat.icon} fa-2x text-${stat.color} mb-2`}></i>
                <h5>{stat.title}</h5>
                <h3 className={`text-${stat.color}`}>{stat.value}</h3>
                <p className="text-muted">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-sm p-4 rounded border mb-4">
          <h5 className="mb-3">Overview</h5>
          <p className="text-muted">User registrations over the past months.</p>
          <Bar data={data} options={options} height={100} />
        </div>
      </div>
    </div>
  );
}
