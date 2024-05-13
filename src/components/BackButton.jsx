import {Link} from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs';

const BackButton = ({destination = '/'}) => {
    return (<Link to={destination} className='flex items-center px-4 py-2 rounded-full hover:bg-gray-200'>
        <BsArrowLeft className='text-xl mr-2 text-gray-700'/>
        <span className='text-gray-700 font-medium'>Back</span>
    </Link>);
};

export default BackButton;
