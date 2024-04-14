import { useState, useEffect } from 'react';
import './App.css';
import ContactList from './assets/components/ContactList/ContactList';
import SearchBox from './assets/components/SearchBox/SearchBox';
import ContactForm from './assets/components/ContactForm/ContactForm';

function App() {
  const initialContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const getStoredContacts = () => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : initialContacts;
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(getStoredContacts());

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (!storedContacts) {
      setContacts(initialContacts);
    } else {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(()=> {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContact = (newContact) => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter(contact => contact.id !== id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact}/>
      <SearchBox searchTerm={searchTerm} onSearch={handleSearch}  />
      <ContactList list={filteredContacts} onDelete={handleDeleteContact}/>
    </div>
  )
}

export default App;
