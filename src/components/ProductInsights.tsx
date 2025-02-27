// "use client"
// import React from 'react';
// import dynamic from 'next/dynamic';
// import { ApexOptions } from 'apexcharts';
// import CardWrapper from './Card';

// const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// export default function OrdersInsight(): React.ReactElement {
//     const chartOptions: ApexOptions = {
//         chart: {
//             type: 'bar',
//             height: 350,
//             stacked: false,
//         },
//         series: [
//             {
//                 name: 'Physical Product',
//                 data: [17, 0, 78, 1, 0, 0, 1, 0, 0, 0, 0, 0],
//                 color: '#008FFB',
//             },
//             {
//                 name: 'Digital Product',
//                 data: [2, 0, 16, 0, 1, 0, 1, 0, 0, 0, 0, 0],
//                 color: '#00E396',
//             },
//             {
//                 name: 'Total Product',
//                 data: [19, 0, 94, 1, 1, 0, 2, 0, 0, 0, 0, 0],
//                 color: '#FEB019',
//             },
//             {
//                 name: 'Total Sell',
//                 data: [21, 43, 63, 44, 39, 0, 52, 0, 0, 0, 0, 0],
//                 color: '#FF4560',
//             },
//         ],
//         xaxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//         },
//         legend: {
//             position: 'top',
//             horizontalAlign: 'left',
//             offsetY: 10,
//             offsetX: 10,
//         },
//         grid: {
//             show: true,
//             borderColor: '#e0e0e0',
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 dataLabels: {
//                     position: 'top',
//                 },
//             },
//         },
//         dataLabels: {
//             enabled: true,
//             style: {
//                 fontSize: '10px',
//                 colors: ["#333"],
//             },
//         },
//     };

//     return (
//         <CardWrapper name="Orders Insight">
//             <div className="grid grid-cols-4 bg-gray-200 border-b border-t border-dashed border-gray-200">
//                 <div className="text-center border-r border-dashed border-gray-300 py-4">
//                     <h5 className="text-2xl font-bold text-gray-800">540</h5>
//                     <p className="text-sm text-gray-500">Physical Products</p>
//                 </div>
//                 <div className="text-center border-r border-dashed border-gray-300 py-4">
//                     <h5 className="text-2xl font-bold text-gray-800">87</h5>
//                     <p className="text-sm text-gray-500">Digital Products</p>
//                 </div>
//                 <div className="text-center border-r border-dashed border-gray-300 py-4">
//                     <h5 className="text-2xl font-bold text-gray-800">627</h5>
//                     <p className="text-sm text-gray-500">Total Products</p>
//                 </div>
//                 <div className="text-center py-4">
//                     <h5 className="text-2xl font-bold text-gray-800">432</h5>
//                     <p className="text-sm text-gray-500">Total Sell</p>
//                 </div>
//             </div>
//             <div className="mt-6">
//                 <ApexChart
//                     options={chartOptions}
//                     series={chartOptions.series}
//                     type="bar"
//                     height={365}
//                 />
//             </div>
//         </CardWrapper>
//     );
// };
