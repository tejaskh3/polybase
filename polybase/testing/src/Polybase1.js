import React, { useState, useEffect } from 'react';
import { Polybase } from '@polybase/client';
import { Auth } from '@polybase/auth';
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth';

const auth = new Auth();
const db = new Polybase({
  defaultNamespace: 'tejas-varma-project1'
});

const PolybaseComponent = () => {

  const [person, setPerson] = useState({ firstName: '', email: '', age: '' });
  const [people, setPeople] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.firstName && person.email && person.age) {
      const newPerson = { ...person, id: new Date().getTime().toString() };
      setPeople([...people, newPerson]);
      setPerson({ firstName: '', email: '', age: '' });
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const deploySchema = await db.applySchema(`
          @public
          collection User {
            id: string;
            name: string;
            rating: number;


            constructor (id: string, name: string, rating: number) {
              this.id = id;
              this.name = name;
              this.rating = rating;
            }
          }
        `);
        console.log('Deployed');
        let name = "tejas"
        const dbData = await db
          .collection('User')
          // .create([name, 'misthy', 7]);
          .record(name).get();
          console.log(dbData);
        console.log('testing');
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  return (
    <div>
      <form className='form'>
          <div className='form-control'>
            <label htmlFor='firstName'>Name : </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={person.firstName}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>Email : </label>
            <input
              type='email'
              id='email'
              name='email'
              value={person.email}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='age'>Age : </label>
            <input
              type='number'
              id='age'
              name='age'
              value={person.age}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='btn' onClick={handleSubmit}>
            add person
          </button>
        </form>
        {people?
          people.map((person)=>{
 return (  <>
 <h1>{person.firstName}</h1>
            <h1>{person.email}</h1>
            <h1>{person.age}</h1>
            </>)
          }):<h1>nth</h1>
        }
    </div>
  );
};

export default PolybaseComponent;
