import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import {
  loginWithEmailPassword,
  startGoogleLogin,
} from '../../redux/actions/authActions';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const { values, handleInputChange } = useForm({
    email: 'a@a.com',
    password: '123456',
  });
  const { email, password } = values;

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(loginWithEmailPassword(email, password));

    // dispatch(loginAction('123-456', 'Andrés'));
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  return (
    <>
      <h3 className='auth__title mb-5'>Login</h3>
      <form onSubmit={handleLogin}>
        <input
          onChange={handleInputChange}
          value={email}
          className='auth__input'
          type='text'
          placeholder='Email'
          name='email'
          autoComplete='off'
        />
        <input
          value={password}
          onChange={handleInputChange}
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
        />
        <button className='btn btn-primary btn-block'>Login</button>
        <div className='auth__social-networks'>
          <p>Login with social networks</p>
          <div onClick={handleGoogleLogin} className='google-btn'>
            <div className='google-icon-wrapper'>
              <img
                className='google-icon'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='google button'
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link className='link' to='/auth/register'>
          Create new account
        </Link>
      </form>
    </>
  );
};

export default LoginScreen;
