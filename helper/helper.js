export function verifyIsLoggedIn(router) {
  const token = localStorage.getItem("Etoken");
  if (token) {
    router.push("/Dashboard");
  }
}
