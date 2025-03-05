// // 'use server';
// // import { NextResponse } from 'next/server';
// // import type { NextRequest } from 'next/server';
// // import { publicPaths, protectedPathsPermissions } from "@/constants/middleware-constants";
// // import { jwtVerify } from 'jose';

// // export async function middleware(req: NextRequest) {
// //     const url = req.nextUrl.clone();
// //     const token = req.cookies.get("x-access-token")?.value;

// //     // If there's no token and the user is not on a public page, redirect to login
// //     if (!token) {
// //         if (!publicPaths.includes(req.nextUrl.pathname)) {
// //             url.pathname = '/login';
// //             return NextResponse.redirect(url);
// //         }
// //         return NextResponse.next();
// //     }
// //     try {
// //         // Decode and verify the JWT token
// //         const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'oonzoo01');
// //         const { payload } = await jwtVerify(token, secret);
// //         const { permissions } = payload as { permissions: string[] };
// //         // Check if the path requires a specific permission
// //         const requiredPermission = protectedPathsPermissions[req.nextUrl.pathname];
// //         console.log("=====>", requiredPermission)
// //         // If the route is protected and the user lacks the required permission, redirect to dashboard
// //         if (requiredPermission && (!permissions || !permissions.includes(requiredPermission))) {
// //             url.pathname = '/dashboard';
// //             return NextResponse.redirect(url);
// //         }
// //         // Redirect authenticated users away from public pages
// //         if (publicPaths.includes(req.nextUrl.pathname) && token) {
// //             return NextResponse.redirect(new URL("/dashboard", req.url));
// //         }
// //         // Allow the request to proceed
// //         return NextResponse.next();
// //     } catch (error) {
// //         console.error('JWT verification failed:', error);
// //         url.pathname = '/login';
// //         return NextResponse.redirect(url);
// //     }
// // }

// // export const config = {
// //     matcher: [
// //         '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
// //         '/(api|trpc)(.*)',
// //     ],
// // };



// 'use server';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { publicPaths, protectedPathsPermissions } from "@/constants/middleware-constants";
// import { jwtVerify } from 'jose';

// export async function middleware(req: NextRequest) {
//     const url = req.nextUrl.clone();
//     const token = req.cookies.get("x-access-token")?.value;

//     if (!token) {
//         if (!publicPaths.includes(req.nextUrl.pathname)) {
//             url.pathname = '/login';
//             return NextResponse.redirect(url);
//         }
//         return NextResponse.next();
//     }

//     try {
//         const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'oonzoo01');
//         const { payload } = await jwtVerify(token, secret);
//         const { permissions } = payload as { permissions: string[] };

//         // Create response with headers
//         const response = NextResponse.next();

//         // Set permissions in a custom header
//         response.headers.set('x-permissions', JSON.stringify(permissions));

//         // Check route permissions
//         const requiredPermission = protectedPathsPermissions[req.nextUrl.pathname];
//         if (requiredPermission && (!permissions || !permissions.includes(requiredPermission))) {
//             url.pathname = '/dashboard';
//             return NextResponse.redirect(url);
//         }

//         if (publicPaths.includes(req.nextUrl.pathname) && token) {
//             return NextResponse.redirect(new URL("/dashboard", req.url));
//         }

//         return response;
//     } catch (error) {
//         console.error('JWT verification failed:', error);
//         url.pathname = '/login';
//         return NextResponse.redirect(url);
//     }
// }

// export const config = {
//     matcher: [
//         '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//         '/(api|trpc)(.*)',
//     ],
// };





'use server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { publicPaths, protectedPathsPermissions } from "@/constants/middleware-constants";
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const token = req.cookies.get("x-access-token")?.value;
    // If there's no token and the user is not on a public page, redirect to login
    if (!token) {
        if (!publicPaths.includes(req.nextUrl.pathname)) {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }
    try {
        // Decode and verify the JWT token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'flickstar');
        const { payload } = await jwtVerify(token, secret);
        const { permissions } = payload as { permissions: string[] };
        // Check if the path requires a specific permission
        const requiredPermission = protectedPathsPermissions[req.nextUrl.pathname]
        const response = NextResponse.next();
        response.headers.set('x-permissions', JSON.stringify(permissions));
        if (requiredPermission && (!permissions || !permissions.includes(requiredPermission))) {
            // url.pathname = '/dashboard';
            // return NextResponse.redirect(url);
            const html = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>403 Forbidden</title>
                        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
                        <style>
                            html,body{width:100%;height:100%;margin:0}
                            *{font-family:'Press Start 2P',cursive;box-sizing:border-box}
                            #app{padding:1rem;background:black;display:flex;height:100%;justify-content:center;align-items:center;color:#54FE55;text-shadow:0 0 10px;font-size:6rem;flex-direction:column}
                            .txt{font-size:1.8rem}
                            .blink{animation:blink 1s infinite}
                            @keyframes blink{0%,49%{opacity:0}50%,100%{opacity:1}}
                            .button{margin-top:2rem;background:#54FE55;border:none;padding:1rem 2rem;font-size:1rem;color:black;cursor:pointer;font-family:'Press Start 2P',cursive}
                            .button:hover{background:#1a4f1a;color:#54FE55}
                        </style>
                    </head>
                    <body>
                        <div id="app">
                            <div>403</div>
                            <div class="txt">Forbidden<span class="blink">_</span></div>
                            <button class="button" onclick="window.history.back()">Go Back</button>
                        </div>
                    </body>
                    </html>
                    `;
            return new NextResponse(html, {
                status: 403,
                statusText: 'Forbidden',
                headers: {
                    'Content-Type': 'text/html'
                }
            });
        }
        // Redirect authenticated users away from public pages
        if (publicPaths.includes(req.nextUrl.pathname) && token) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
        // Allow the request to proceed
        return response
    } catch (error) {
        console.error('JWT verification failed:', error);
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};