import type { User, UserForm } from '../interfaces/index';

const BASE_URL = '/api/user';

export async function createUser(userForm: UserForm) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(userForm),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    return response.json();
  } else {
    throw await response.json();
  }
}

export async function fetchCurrentUser(): Promise<User | null> {
  return await (await fetch(`${BASE_URL}/current`)).json();
}
