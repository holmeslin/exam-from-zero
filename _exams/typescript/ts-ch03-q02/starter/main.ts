type User = {
  name: string;
  email?: string;
};

// 有 email 就印出大寫的 email，沒有就印出「沒有填 email」
function showEmail(user: User) {
  console.log(user.email.toUpperCase());
}

showEmail({ name: "小明", email: "ming@example.com" });
showEmail({ name: "小華" });
