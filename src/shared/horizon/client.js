import Horizon from '@horizon/client'

const client = Horizon()

// Async attempt to connect to our Horizon server.
client.connect()

// Stream the status of our client connection.
client.status().subscribe(({ type }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`==> 🌅  Current status: ${type}`)
  }
})

export default client
