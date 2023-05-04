// import { withClerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
 
// export default withClerkMiddleware((req: NextRequest) => {
//     console.log("Middleware running")
//     return NextResponse.next();
// });
 
// export const config = {
//   api: {
//     bodyParser: false,
//   },
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next
//      * - static (static files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     "/((?!static|.*\\..*|_next|favicon.ico).*)",
//     "/",
//   ],
// }


import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default withClerkMiddleware(() => {
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};