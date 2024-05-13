import {Link} from 'react-router-dom';
import {PiBookOpenTextLight} from 'react-icons/pi';
import {BiUserCircle, BiShow} from 'react-icons/bi';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineDelete} from 'react-icons/md';
import {useState, useEffect} from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({book}) => {
    const [showModal, setShowModal] = useState(false);
    const [imageUrl, setImageUrl] = useState(null); // State to store image URL

    useEffect(() => {
        const fetchBookCover = async () => {
            const encodedTitle = encodeURIComponent(book.title); // Encode title for safe URL search
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodedTitle}`);
            const data = await response.json();
            if (data.items && data.items.length > 0) {
                const firstItem = data.items[0];
                if (firstItem.volumeInfo && firstItem.volumeInfo.imageLinks) {
                    setImageUrl(firstItem.volumeInfo.imageLinks.thumbnail); // Assuming thumbnail URL is available
                }
            }
        };
        fetchBookCover();
    }, [book.title]); // Run effect only when book title changes

    return (
        <div className='bg-white border rounded-lg shadow-md overflow-hidden h-auto hover:shadow-lg'>
            {imageUrl ? (
                <img
                    className='w-full h-48 object-cover'
                    src={imageUrl}
                    alt={book.title}
                />
            ) : (
                <div className='h-48 flex justify-center items-center bg-gray-200'>
                    {/* Placeholder content while image is loading or unavailable */}
                    <p className='text-gray-500'>Loading cover...</p>
                </div>
            )}
            <div className='p-4'>
                <h2 className='text-2xl font-semibold text-gray-800'>{book.title}</h2>
                <div className='flex justify-between items-center mt-2'>
                    <div className='flex items-center gap-x-2'>
                        <PiBookOpenTextLight className='text-red-500 text-xl'/>
                        <p className='text-gray-600'>{book.publishYear}</p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <BiUserCircle className='text-red-500 text-xl'/>
                        <p className='text-gray-600'>{book.author}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center mt-4'>
                    <BiShow
                        className='text-3xl text-blue-500 hover:text-blue-700 cursor-pointer'
                        onClick={() => setShowModal(true)}
                    />
                    <div className='flex gap-x-2'>
                        <Link to={`/books/details/${book._id}`}>
                            <BsInfoCircle className='text-2xl text-green-500 hover:text-green-700'/>
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                            <AiOutlineEdit className='text-2xl text-yellow-500 hover:text-yellow-700'/>
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                            <MdOutlineDelete className='text-2xl text-red-500 hover:text-red-700'/>
                        </Link>
                    </div>
                </div>
            </div>
            {showModal && (
                <BookModal book={book} onClose={() => setShowModal(false)}/>
            )}
        </div>
    );
};

export default BookSingleCard;
