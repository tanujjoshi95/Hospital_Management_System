import Users from "./users.json";
export function userAuth(username, password) {
  const user = Users.find(
    (data) => data.username === username && data.password === password
  );
  if (!user) {
    return { response: false, message: "Invalid Login" };
  }
  return { response: true, id: user.id };
}
