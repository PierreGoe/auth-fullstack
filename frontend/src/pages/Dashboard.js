import { useState, useEffect } from 'react';
import { api } from '../conf';
import { toast } from 'react-toastify';

export function Dashboard() {
  const [userTracker, setUserTracker] = useState([]);

  const [form, setForm] = useState({
    idProduit: '',
    store: '',
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    api.get('http://localhost:5050/tracker').then(({ data }) => {
      setUserTracker(data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newForm = { ...form };
    const newValue = type === 'checkbox' ? checked : value;
    newForm[name] = newValue;
    setForm(newForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let backendUrl = '';
    if (form.store === 'castorama') {
      backendUrl = '/tracker/castorama';
    }
    api
      .post(backendUrl, form)
      .then(({ data }) => {
        toast(`You're now logged in, ${data} <3`);
      })
      .catch((e) => {
        toast.error('Achtung!' + e);
      });
  };

  return (
    <>
      <h1>Crée un filtre</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='Search'>
          <input
            type='text'
            id='idProduit'
            name='idProduit'
            onChange={handleChange}
            placeholder='idProduit'
          />
          <select id='store' name='store' onChange={handleChange}>
            <option value=''>--Please choose an store--</option>
            <option value='castorama'>Castorama</option>
            <option value='leroyMerlin'>Leroy Merlin</option>
          </select>
          <input type='submit' value='go' />
        </label>
      </form>
      <h1>Mes Filtre</h1>
      <ul>
        {userTracker.map((row) => {
          return <li>{row.reference}</li>;
        })}
      </ul>
    </>
  );
}
