import childProcess from 'child_process'
import io from 'socket.io-client'
import ss from 'socket.io-stream'

const socket = io.connect('https://freshpi.codeandcamlabs.com/', {
  transports: ['websocket', 'polling']
})
const { spawn } = childProcess
const { stdout, stderr } = spawn(`raspivid -t 0 -fps 30 -b 2000000 -w 1920 -h 1080 -o -`, { shell: true })
const stream = ss.createStream()

ss(socket).emit('stream', stream)
stdout.pipe(stream)

socket.on('connect_error', (err) => {
  console.error(err)
})
