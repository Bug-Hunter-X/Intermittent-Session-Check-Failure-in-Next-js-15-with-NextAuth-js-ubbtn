```javascript
// pages/about.js
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

export default async function About({ session }) {
  // Ensure session is passed as a prop for better reliability
  if (!session) {
    return <p>Access denied. Please login.</p>;
  }

  return <p>Welcome, {session.user.name}!</p>;
}

//getServerSideProps for about page
export async function getServerSideProps(context){
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    if (!session){
        return{
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    return {
        props: { session }
    }
}
```