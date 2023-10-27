import grpc from "grpc";
import { IUser } from "./models/IUser";

const users: IUser[] = []; 

export const userImplementation = {
    GetUser: (call: any, callback: any) => {
      const userId = call.request.id;
      const user = users.find((u) => u.id === userId);
      if (!user) {
        return callback({
          code: grpc.status.NOT_FOUND,
          details: 'Usuario no encontrado',
        });
      }
      callback(null, { user });
    },
    AddUser: (call: any, callback: any) => {
      const user = call.request;
      console.log("🚀  ~ file: index.ts:23 ~ user:", user);
      user.id = (users.length + 1).toString();
      users.push(user);
      callback(null, {
        message: 'Usuario agregado correctamente',
        user,
      });
    },
  };