// only works when client-side rendering
export function fetchStoredEmail(): string {
  let initialEmailValue = '';
  const stringifiedSavedForm = window.localStorage.getItem('saved-login-form');

  if (stringifiedSavedForm) {
    const savedForm = JSON.parse(stringifiedSavedForm);
    initialEmailValue = savedForm.email;
  }

  return initialEmailValue;
}

export function storeEmail(email: string): void {
    const loginForm = JSON.stringify({ email });
        window.localStorage.setItem('saved-login-form', loginForm);
}
