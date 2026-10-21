// 要測的元件（不用改）
import { useEffect, useState } from "react";

export type UserListProps = {
  loadUsers: () => Promise<string[]>;
};

export default function UserList({ loadUsers }: UserListProps) {
  const [users, setUsers] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers()
      .then(setUsers)
      .catch(() => setError("載入失敗"));
  }, [loadUsers]);

  if (error !== null) {
    return <p>{error}</p>;
  }
  if (users === null) {
    return <p>載入中…</p>;
  }
  return (
    <ul>
      {users.map((user) => (
        <li key={user}>{user}</li>
      ))}
    </ul>
  );
}
