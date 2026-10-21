export type HasId = { id: number };
export type HasTimestamps = { createdAt: string; updatedAt: string };

export type Post = HasId & HasTimestamps & {
  title: string;
};

export function createPost(id: number, title: string, now: string): Post {
  return { id, title, createdAt: now, updatedAt: now };
}

export function touch(post: Post, now: string): Post {
  return { ...post, updatedAt: now };
}
