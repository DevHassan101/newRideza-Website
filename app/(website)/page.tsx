// import prisma from "../../lib/db";

// export default async function Home() {
//   const users = await prisma.user.findMany();
//   return (
//     <main style={{ padding: 20 }}>
//       <h1 className="text-2xl font-bold">Hello, World!</h1>
//       <p>Found {users.length} users</p>

//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.username}
//             <p>{user.useremail}</p>
//             <p>{user.userpassword}</p>
//             <strong>{user.createdAt.toLocaleDateString()}</strong>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }

import HomeAbout from "./components/home/HomeAbout";
import HeroBanner from "./components/home/HomeBanner";
import HomeServices from "./components/home/HomeServices";
import HomeTestimonial from "./components/home/HomeTestimonial";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <HomeServices />
      <HomeAbout />
      <HomeTestimonial />
    </>
  );
}
