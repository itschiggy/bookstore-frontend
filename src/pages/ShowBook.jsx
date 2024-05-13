import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [id]); // Added dependency for id

    return (
        <div className='flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100'>
            <BackButton/>
            <h1 className='text-3xl text-center font-bold mb-8'>Book Details</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className='shadow-md rounded-lg bg-white p-8 flex flex-col w-full max-w-[600px]'>
                    <ul className='list-disc pl-4'>
                        <li className='text-gray-700 mb-2'>
                            <span className='font-bold'>ID:</span> {book._id}
                        </li>
                        <li className='text-gray-700 mb-2'>
                            <span className='font-bold'>Title:</span> {book.title}
                        </li>
                        <li className='text-gray-700 mb-2'>
                            <span className='font-bold'>Author:</span> {book.author}
                        </li>
                        <li className='text-gray-700 mb-2'>
                            <span className='font-bold'>Publish Year:</span> {book.publishYear}
                        </li>
                        <li className='text-gray-700 mb-2'>
                            <span className='font-bold'>Created At:</span> {new Date(book.createdAt).toLocaleString()}
                        </li>
                        <li className='text-gray-700'>
                            <span className='font-bold'>Last Updated:</span> {new Date(book.updatedAt).toLocaleString()}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShowBook;
