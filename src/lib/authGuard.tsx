// // lib/withAuth.js
// import { parseCookies } from 'nookies';

// export function withAuth(getServerSidePropsFunc) {
//     return async (context) => {
//         const cookies = parseCookies(context);

//         if (!cookies['YOUR_COOKIE_NAME']) {
//             // Redirect to login if the cookie is not found
//             return {
//                 redirect: {
//                     destination: '/login', // Replace with your login page or any other page
//                     permanent: false,
//                 },
//             };
//         }

//         // Run the page's getServerSideProps if it has one
//         if (getServerSidePropsFunc) {
//             return await getServerSidePropsFunc(context);
//         }

//         return { props: {} };
//     };
// }
