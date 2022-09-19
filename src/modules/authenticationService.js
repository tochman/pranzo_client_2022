import JtockAuth from 'j-tockauth'
const auth = new JtockAuth({
  host: "http://127.0.0.1:3000",
  prefixUrl: "/api/v1",
  debug: false
})

const getHeaders = () => {
  const headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
  return { ...headers }
}

const AuthenticationService =  {
  
  async validateToken() {
    try {
      const headers = getHeaders()
      let response = await auth.validateToken(headers)
      store.dispatch({
        type: 'AUTHENTICATE',
        payload: response.data.name,
      })
    } catch (error) {}
  },
}

export default AuthenticationService