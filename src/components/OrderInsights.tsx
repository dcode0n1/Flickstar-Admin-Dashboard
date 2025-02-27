// "use client"
// import React from 'react';
// import dynamic from 'next/dynamic';
// import { ApexOptions } from 'apexcharts';
// import CardWrapper from '@/components/ui/cardBox';

// const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// export default function OrdersInsight(): React.ReactElement {
//     const chartOptions: ApexOptions = {
//         chart: {
//             type: 'line',
//             height: 350,
//             toolbar: {
//                 show: true,
//             },
//         },
//         colors: ['#9400ff', '#13c56b', '#f6c000'],
//         series: [
//             {
//                 name: 'Total Orders',
//                 data: [200, 180, 150, 130, 110, 90],
//             },
//             {
//                 name: 'Digital Orders',
//                 data: [100, 90, 80, 70, 60, 50],
//             },
//             {
//                 name: 'Physical Orders',
//                 data: [150, 140, 130, 120, 110, 100],
//             },
//         ],
//         xaxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         },
//         yaxis: {
//             title: {
//                 text: 'Number of Orders',
//             },
//         },
//         stroke: {
//             curve: 'smooth',
//         },
//         markers: {
//             size: 5,
//         },
//         legend: {
//             position: 'top',
//         },
//     };

//     return (
//         <CardWrapper tableName="Orders Insight" viewBtn={false}>
//             <div className="grid grid-cols-3 bg-gray-200  border-b border-t border-dashed border-gray-200">
//                 <div className="text-center border-r border-dashed border-gray-300  py-4">
//                     <h5 className="text-2xl font-bold  text-gray-800">540</h5>
//                     <p className="text-sm text-gray-500">Total Orders</p>
//                 </div>
//                 <div className="text-center border-r border-dashed border-gray-300 py-4">
//                     <h5 className="text-2xl font-bold text-gray-800">453</h5>
//                     <p className="text-sm text-gray-500">Physical Orders</p>
//                 </div>
//                 <div className="text-center py-4">
//                     <h5 className="text-2xl font-bold text-gray-800">87</h5>
//                     <p className="text-sm text-gray-500">Digital Orders</p>
//                 </div>
//             </div>
//             <div className="mt-6">
//                 <ApexChart
//                     options={chartOptions}
//                     series={chartOptions.series}
//                     type="line"
//                     height={365}
//                 />
//             </div>
//         </CardWrapper >
//     );
// };
