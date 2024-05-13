import {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishYear(response.data.publishYear);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error fetching book details', {variant: 'error'});
                console.log(error);
            });
    }, [id]); // Added dependency for id

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Book Edited successfully', {variant: 'success'});
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error editing book', {variant: 'error'});
                console.log(error);
            });
    };

    return (
        <div className='flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100'>
            <BackButton/>
            <h1 className='text-3xl text-center font-bold mb-8'>Edit Book</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className='shadow-md rounded-lg bg-white p-8 flex flex-col w-full max-w-[600px]'>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='title' className='text-xl text-gray-700 mb-2'>Title</label>
                        <input
                            type='text'
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-opacity-50'
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='author' className='text-xl text-gray-700 mb-2'>Author</label>
                        <input
                            type='text'
                            id='author'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-opacity-50'
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='publishYear' className='text-xl text-gray-700 mb-2'>Publish Year</label>
                        <input
                            type='number'
                            id='publishYear'
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-opacity-50'
                        />
                    </div>
                    <button
                        className='bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-sky-200 focus:ring-opacity-50 w-full'
                        onClick={handleEditBook}
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBook;
