import { Alert } from 'react-native';
import { call, put, all, takeLatest, delay } from 'redux-saga/effects';

import api from '../../../services/api';
import { signInSucess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield delay(1000);

    yield put(signInSucess(token, user));
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield delay(1000);

    yield call(api.post, 'users', {
      name,
      email,
      password
    });

    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha na cadastro',
      'Houve um erro no cadastro, verifique seus dados'
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload || payload.auth) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut)
]);
