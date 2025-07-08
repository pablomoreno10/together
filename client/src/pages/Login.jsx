import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      <div className="w-full md:w-1/2 text-pewter items-center justify-center p-6 flex">
        <blockquote className="text-xl leading-relaxed max-w-md italic text-center md:text-left">
          “It is not the critic who counts; not the man who points out how the strong
          man stumbles, or where the doer of deeds could have done them better.
          The credit belongs to the man who is actually in the arena, whose face is
          marred by dust and sweat and blood; who strives valiantly; who errs, who
          comes short again and again, because there is no effort without error and
          shortcoming; but who does actually strive to do the deeds; who knows
          great enthusiasms, the great devotions; who spends himself in a worthy
          cause; who at the best knows in the end the triumph of high achievement,
          and who at the worst, if he fails, at least fails while daring greatly, so that
          his place shall never be with those cold and timid souls who neither know
          victory nor defeat.”
          <br />
          <span className="block mt-4 text-sm font-semibold text-wine">
            — Theodore Roosevelt
          </span>
        </blockquote>
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 rounded shadow border-4 border-double border-wine" >
          <h2 className="text-3xl font-bold text-espresso mb-6 text-center">Log In</h2>

          {error && <p className="text-sm text-red-500 mb-4 text-center">{error}</p>}

          <input
            type="email"
            placeholder="Rutgers Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-pewter rounded mb-4 text-espresso placeholder:text-pewter focus:outline-none focus:ring-2 focus:ring-wine"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-pewter rounded mb-4 text-espresso placeholder:text-pewter focus:outline-none focus:ring-2 focus:ring-wine"
          />
          <button
            type="submit"
            className="w-full bg-wine hover:bg-espresso text-white py-2 rounded transition duration-200"
          >
            Log In
          </button>

          <p className="text-sm text-center mt-4 text-pewter">
            Don’t have an account?{' '}
            <a href="/register" className="text-wine font-semibold hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
