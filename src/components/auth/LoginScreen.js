import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import useForm from '../../hooks/useForm';
import {
  loginWithEmailPassword,
  startGoogleLogin,
} from '../../redux/actions/authActions';
import {
  removeErrorAction,
  setErrorAction,
} from '../../redux/actions/uiActions';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading, msgError } = useSelector((state) => state.ui);

  const { values, handleInputChange } = useForm({
    email: 'a@a.com',
    password: '123456',
  });
  const { email, password } = values;

  const handleLogin = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(loginWithEmailPassword(email, password));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (!validator.isEmail(email) || !email) {
      dispatch(setErrorAction('Introduce un email válido'));
      return false;
    } else if (!password) {
      dispatch(setErrorAction('Introduce la contraseña.'));
    }
    dispatch(removeErrorAction());

    return true;
  };

  return (
    <>
      <h3 className='auth__title mb-5'>Login</h3>
      <form onSubmit={handleLogin}>
        {msgError && <div className='auth__alert-error'>{msgError}</div>}

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
        <button disabled={loading} className='btn btn-primary btn-block'>
          {loading ? 'Entrando..' : 'Login'}
        </button>
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
