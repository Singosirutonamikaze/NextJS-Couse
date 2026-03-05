import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const { topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <svg
          viewBox={`0 0 ${revenue.length * 30} 350`}
          className="mt-0 w-full rounded-md bg-white p-4"
          height={350}
          aria-label="Revenue bar chart"
        >
          {revenue.map((month, i) => {
            const barHeight = Math.round((350 / topLabel) * month.revenue);
            return (
              <g key={month.month} transform={`translate(${i * 30}, 0)`}>
                <rect
                  x="4"
                  y={350 - barHeight}
                  width="22"
                  height={barHeight}
                  rx="3"
                  className="fill-blue-300"
                />
                <text
                  x="15"
                  y="345"
                  textAnchor="middle"
                  className="fill-gray-400 text-[9px]"
                  fontSize={9}
                >
                  {month.month}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
