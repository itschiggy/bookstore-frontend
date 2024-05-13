import {AiOutlineClose} from 'react-icons/ai';
import {PiBookOpenTextLight, PiBookOpenText} from 'react-icons/pi';
import {BiUserCircle} from 'react-icons/bi';

const BookModal = ({book, onClose}) => {
    return (
        <div
            className='fixed bg-gray-900 bg-opacity-75 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[700px] max-w-full h-auto bg-white rounded-lg p-8 shadow-md flex flex-col relative' // Added shadow effect
            >
                <AiOutlineClose
                    className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <div className='flex flex-col justify-between h-full'>
                    {/* Book Title & Description Section */}
                    <div className='flex items-center gap-4'>
                        <PiBookOpenText className='text-red-500 text-5xl'/>
                        <div className='flex flex-col'>
                            <h2 className='text-2xl font-semibold text-gray-800'>{book.title}</h2>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 mt-4'> {/* Added gap for spacing */}
                        <div className='flex items-center gap-2'>
                            <PiBookOpenTextLight className='text-red-500 text-2xl'/>
                            <p className='text-gray-600'>{book.publishYear}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <BiUserCircle className='text-red-500 text-2xl'/>
                            <p className='text-gray-600'>{book.author}</p>
                        </div>
                    </div>
                    {/* Additional Feature: Book Rating Section (replace with your data source) */}
                    <div className='mt-4 flex items-center gap-2'>
                        <p className='text-gray-700 text-base'>Rating:</p>
                        <span className='text-yellow-500 text-xl font-bold'>4.5</span>
                        <span className='text-gray-500 text-base'>out of 5</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookModal;
