export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("authUser"))
  if (obj && obj.token && obj.tokenType) {
    return { Authorization: `${obj.tokenType} ${obj.token}` }
  } else {
    return {}
  }
}
