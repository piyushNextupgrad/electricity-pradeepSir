export function verifyIsLoggedIn(router) {
  const token = localStorage.getItem("Etoken");
  if (token) {
  } else {
    router.push("/");
  }
}
