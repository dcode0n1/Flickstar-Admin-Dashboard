'use server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { publicPaths, protectedPathsPermissions } from "@/constants/middleware-constants";
import { jwtVerify, errors as joseErrors } from 'jose';

export async function middleware(req: NextRequest) {

    const url = req.nextUrl.clone();
    console.log("Middleware triggered for path:", req.nextUrl.pathname);
    let token = req.cookies.get("x-access-token")?.value;
    console.log("Access Token:", token);
    const refreshToken = req.cookies.get("x-refresh-token")?.value;
    console.log("Refresh Token:", refreshToken);

    if (!token) {
        if (!publicPaths.includes(req.nextUrl.pathname)) {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    try {
        // Decode and verify the JWT token
        console.log("Verifying JWT token...");
        console.log("======>" , process.env.JWT_SECRET);
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'flickstar');
        const { payload } = await jwtVerify(token, secret);
        const { permissions, staffId } = payload as { permissions: string[] , staffId :string };
        // Check required permissions
        const requiredPermission = protectedPathsPermissions[req.nextUrl.pathname];
        const response = NextResponse.next();
        // response.headers.set('user', JSON.stringify(staffId));
        response.headers.set('x-permissions', JSON.stringify(permissions));

        if (requiredPermission && (!permissions || !permissions.includes(requiredPermission))) {
            return createForbiddenResponse();
        }

        // Redirect authenticated users away from public pages
        if (publicPaths.includes(req.nextUrl.pathname) && token) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        return response;
    } catch (error: any) {
        console.error('JWT verification failed:', error);

        // If the error is due to token expiration, attempt refresh
        if (error instanceof joseErrors.JWTExpired && refreshToken) {
            console.log("Attempting to refresh token...");

            const refreshed = await refreshAuthToken(refreshToken);
            if (refreshed?.newAccessToken) {
                console.log("Token refreshed successfully.");
                const response = NextResponse.next();
                response.cookies.set("x-access-token", refreshed.newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                });

                return response;
            }
        }

        // Redirect to login if refresh fails
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
}

// Helper function to refresh token
async function refreshAuthToken(refreshToken: string) {
    try {
        const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/revalidate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
            console.error("Refresh token request failed.");
            return null;
        }

        return await refreshResponse.json();
    } catch (err) {
        console.error("Error refreshing token:", err);
        return null;
    }
}


export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};






// Helper function to generate a 403 Forbidden response
function createForbiddenResponse() {
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
        headers: { 'Content-Type': 'text/html' },
    });
}