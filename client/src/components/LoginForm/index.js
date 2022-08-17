import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({setAppState}) => {
  const [login, { error, data }] = useMutation(LOGIN_USER), 
  let navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "turtle@turtle.com",
    password: "password2222"
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormState({
        ...formState,
        [name]: value
    })
