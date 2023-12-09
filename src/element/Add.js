import AddService from '../service/AddService';
import ApiService from '../service/ApiService';
import {useState} from 'react';
import Space from './Space';

const Add = () => {
    let [isOpen, setIsOpen] = useState(false);
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    async function toggle() {
        setIsOpen((isOpen) => !isOpen);
        await wait(6000);
        setIsOpen(false);
    }

    return (  
        <nav className="navbar">
            <div>
                <ApiService
                    isOpen={isOpen}
                    handleClick={toggle}
                />
            </div>
            <div>
                <AddService/>
                {
                    isOpen &&
                    <Space/>
                }
                {
                    isOpen &&
                    <Space/>
                }
            </div>
        </nav>
    );
}
 
export default Add;