export const connectWebSocket = (onMessage: (msg: any) => void): WebSocket => {
    const ws = new WebSocket('ws://localhost:4000'); // Replace with your server URL
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
  
    ws.onerror = (error) => console.error('WebSocket error:', error);
    ws.onclose = () => console.log('WebSocket closed');
  
    return ws;
  };
  