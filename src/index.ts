import { server } from "./server/Server";

server.listen(process.env.PORT || 3000, () => console.log(`App rodando na porta: http://localhost:${process.env.PORT}`));