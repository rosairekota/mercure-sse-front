import { useEffect, useState } from "react";
import { io, Socket } from 'socket.io-client';

export const  useSocket = (url: string) => {
    const [socket, setSocket] = useState<Socket>(io(url));
    useEffect(() => {
        const newSocket = io(url);
        setSocket(newSocket);
        return () => {
            newSocket.close();
        };
    }, [url]);

    return socket!;
}

// import { useEffect, useState } from "react";

// export const useSocket = (url: string) => {
//     const [socket, setSocket] = useState<WebSocket | null>(null);

//     useEffect(() => {
//         const newSocket = new WebSocket(url);
//         setSocket(newSocket);

//         return () => {
//             newSocket.close();
//         };
//     }, [url]);

//     return socket!;
// }