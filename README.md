# Socket.IO Course

Real-time bidirectional communication tutorial covering Socket.IO fundamentals.

Youtube link: https://youtu.be/ZKEqqIO7n-k?si=fTHHQQE69l6dqMau

## Installation

```bash
# Server
cd server
npm install

# Client
cd client
npm install
```

## Running

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2-4 - Client
cd client
npm run dev
```

Server: `http://localhost:3000`
Clients: `http://localhost:5173`, `http://localhost:5174`, `http://localhost:5175`

## Features

- **Basic Connection** - WebSocket connections and socket IDs
- **Custom Events** - Emit and handle custom events with multiple parameters
- **Messaging** - Send messages to all clients or specific rooms
- **Rooms** - Join rooms and send targeted messages
- **Namespaces** - Logical separation with `/user` namespace
- **Authentication** - Token-based auth with middleware
- **Volatile Events** - High-frequency events that drop when disconnected
- **Admin UI** - Monitor connections at https://admin.socket.io

## Key Patterns

### Broadcasting
```javascript
socket.broadcast.emit("event", data)  // All except sender
io.emit("event", data)                // All including sender
socket.to(room).emit("event", data)   // Specific room
```

### Rooms
```javascript
socket.join(room)                     // Join room
socket.leave(room)                    // Leave room
```

### Volatile Events
```javascript
socket.volatile.emit('ping', count)   // Drops if disconnected
```

### Keyboard Shortcuts
- `c` - Connect
- `d` - Disconnect

## Admin UI

1. Visit https://admin.socket.io
2. Server URL: `http://localhost:3000`
3. Leave auth empty
