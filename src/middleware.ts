import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware();

// Match against pages that require authentication
// Leave this out if you want authentication on every page in your application
export const config = { matcher: ['/','/new-listing','/new-listing/:ID*','/new-company','/jobs/:ID*','/jobs/:jobId*','/show/:jobId*',] };