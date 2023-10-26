import grpc from "grpc";
const usersProto: any = grpc.load('user.proto');
const server = new grpc.Server();

const users: any[] = []; 

server.addService(usersProto.users.UserService.service, {
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
    // Asignar un ID único al usuario (simulación)
    user.id = (users.length + 1).toString();
    users.push(user);

    callback(null, {
      message: 'Usuario agregado correctamente',
      user,
    });
  },
});

const PORT = 'localhost:50051';
server.bind(PORT, grpc.ServerCredentials.createInsecure());
console.log(`Server is running at ${PORT}`);
server.start();
