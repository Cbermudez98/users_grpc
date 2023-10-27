import grpc from "grpc";
import { userImplementation } from "./modules/user.module";
const usersProto: any = grpc.load('user.proto');

const server = new grpc.Server();

server.addService(usersProto.users.UserService.service, userImplementation);

const PORT = 'localhost:50051';
server.bind(PORT, grpc.ServerCredentials.createInsecure());
console.log(`Server is running at ${PORT}`);
server.start();
