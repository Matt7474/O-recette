import { useState } from 'react';
import logo from '../../assets/logo.png';
import { useUserStore } from '../../store/store';
import { fetchData } from '../../api/api';

export default function Header() {
  const [, setLoginError] = useState<null | string>(null);
  const { user, login, logout } = useUserStore();

  const checkCredencials = async (email: string, password: string) => {
    try {
      const response = await fetchData<{
        pseudo: string;
        token: string;
        isLogged: boolean;
      }>('https://orecipesapi.onrender.com/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoginError(null);
      login(response.pseudo, response.token);
    } catch {
      setLoginError('Erreur lors de la connexion');
    }
  };
  console.log(user, login, logout);

  return (
    <>
      <div className="flex mb-12 items-center pl-4 justify-between h-20 pt-6">
        <div>
          <img src={logo} alt="logo" className="w-20" />
        </div>
        <div className="flex align-center">
          <form
            action={(formData) => {
              const email = formData.get('email') as string;
              const password = formData.get('password') as string;
              checkCredencials(email, password);
            }}
            className="flex gap-2"
          >
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path
                    d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                    fill="#c03232"
                  >
                    <title>Email</title>
                  </path>
                </g>
              </svg>
              <input type="email" placeholder="mail@site.com" required />
            </label>

            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z">
                    <title>password</title>
                  </path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minLength={1}
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                // title="Must be more than  characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>
            <button type="submit" className="btn btn-info text-stone-50 btn-">
              OK
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
