import { Inngest } from "inngest";
import dbConnect from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

export const syncUserCreation = inngest.createFunction( // Corrected here
   { id: 'sync-user-from-clerk' },
   { event: 'clerk/user.created' },
   async ({ event, step }) => {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
         _id: id,
         name: `${first_name} ${last_name}`,
         email: email_addresses[0]?.email_address || "",
         imageUrl: image_url || "",
      }
      await dbConnect();
      await User.create(userData);
      return { success: true };
   }
)
export const syncUserUpdation = inngest.createFuntion(
   { id: 'sync-user-update-from-clerk' },
   { event: 'clerk/user.updated' },
   async ({ event, step }) => {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
         name: `${first_name} ${last_name}`,
         email: email_addresses[0]?.email_address || "",
         imageUrl: image_url || "",
      }
      await dbConnect();
      await User.findByIdAndUpdate(id, userData);
      return { success: true };
   }
)

export const syncUserDeletion = inngest.createFuntion(
   { id: 'sync-user-deletion-from-clerk' },
   { event: 'clerk/user.deleted' },
   async ({ event, step }) => {
      const { id } = event.data;
      await dbConnect();
      await User.findByIdAndDelete(id);
      return { success: true };
   }
)