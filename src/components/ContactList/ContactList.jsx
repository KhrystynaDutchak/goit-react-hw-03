import Contact from "../Contact/Contact";
import css from './ContactList.module.css';

export default function ContactList({ list, onDelete }){
    return(
        <ul className={css.list}>
            {list.map((item, key) => {
                return <Contact key={key} contact={item} onDelete={onDelete}/>;
            })}
        </ul>
        
    )
}