import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import useForm from '../../hooks/useForm';
import { registerWithEmailPasswordName } from '../../redux/actions/authActions';
import {
  removeErrorAction,
  setErrorAction,
} from '../../redux/actions/uiActions';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError, loading } = useSelector((state) => state.ui);

  const { values, handleInputChange } = useForm({
    name: 'Andrés',
    email: 'a@a.com',
    password: '123456',
    password2: '123456',
  });

  const { name, email, password, password2 } = values;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(registerWithEmailPasswordName(email, password, name));
    }
  };

  const isFormValid = () => {
    if (!name.trim()) {
      dispatch(setErrorAction('Name is required.'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setErrorAction('El email es necesario'));

      return false;
    } else if (!password.trim() || password.length < 5) {
      dispatch(
        setErrorAction(
          'Debe introducir una contraseña con al menos 5 caracteres'
        )
      );

      return false;
    } else if (!password2.trim()) {
      dispatch(setErrorAction('Debe validar la contraseña'));

      return false;
    } else if (password.trim() !== password2.trim()) {
      dispatch(setErrorAction('Las contraseñas deben coincidir'));

      return false;
    }

    dispatch(removeErrorAction());

    return true;
  };

  return (
    <>
      <h3 className='auth__title mb-5'>Register</h3>
      <form
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={handleRegister}
      >
        {msgError && <div className='auth__alert-error'>{msgError}</div>}

        <input
          onChange={handleInputChange}
          value={name}
          className='auth__input'
          type='text'
          placeholder='Name'
          name='name'
          autoComplete='off'
        />

        <input
          onChange={handleInputChange}
          value={email}
          className='auth__input'
          type='email'
          placeholder='Email'
          name='email'
          autoComplete='off'
        />
        <input
          onChange={handleInputChange}
          value={password}
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
        />
        <input
          onChange={handleInputChange}
          value={password2}
          className='auth__input'
          type='password'
          placeholder='Confirm Password'
          name='password2'
        />
        <button disabled={loading} className='btn btn-primary btn-block mb-5'>
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <Link className='link' to='/auth/login'>
          Already registered?
        </Link>
      </form>
    </>
  );
};

export default RegisterScreen;
