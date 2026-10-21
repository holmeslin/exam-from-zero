type User = {
  name: string;
  email?: string;
};

function showEmail(user: User) {
  console.log(user.email?.toUpperCase() ?? "沒有填 email");
}

showEmail({ name: "小明", email: "ming@example.com" });
showEmail({ name: "小華" });
