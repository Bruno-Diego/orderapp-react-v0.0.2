import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export const checkUser = async () => {
  const user = await currentUser();

  // console.log(user)
  // console.log(user?.emailAddresses[0].emailAddress)
  
  // Check for current logged in clerk user
  if (!user) {
    return null;
  }

  // Check if the user is already in the database
  const loggedInUser = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });
  // console.log(loggedInUser)
  
  // If user is in database, return user
  if (loggedInUser) {
    console.log("User found in the database!")
    return loggedInUser;
  }
  
  // If not in database, create new user
  console.log("User not found in the database! Creating...")


  const newUser = await prisma.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      address: "Si prega di fornire un indirizzo valido per la consegna.",
    },
  });
  // console.log("New user: "+ newUser)

  return newUser;
};