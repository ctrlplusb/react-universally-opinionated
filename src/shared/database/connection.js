import Horizon from '@horizon/client'

const hz = Horizon()
hz.connect()

hz.status().subscribe(({ type }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`==> 🌅  Current status: ${type}`)
  }
})

export default hz
