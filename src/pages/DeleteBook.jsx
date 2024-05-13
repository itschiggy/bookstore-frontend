import {useState} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book Deleted successfully', {variant: 'success'});
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error deleting book', {variant: 'error'});
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton/>
            <h1 className='text-3xl my-4'>Delete Book</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className='shadow-md rounded-lg bg-white p-8 flex flex-col w-full max-w-[600px] mx-auto'>
                    <h3 className='text-2xl text-center font-bold mb-4'>
                        Confirm Book Deletion
                    </h3>
                    <p className='text-gray-700 text-center'>
                        Are you sure you want to delete this book? This action cannot be undone.
                    </p>
                    <div className='flex justify-center mt-8'>
                        <button
                            className='bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-sky-500 focus:ring-opacity-50 mr-4'
                            onClick={() => navigate('/')} // Redirect on cancel
                        >
                            Cancel
                        </button>
                        <button
                            className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50'
                            onClick={handleDeleteBook}
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteBook;
