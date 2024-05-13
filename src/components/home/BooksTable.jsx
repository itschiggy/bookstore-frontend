import {Link} from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineDelete} from 'react-icons/md';

const BooksTable = ({books}) => {
    return (
        <table className='table-auto w-full border border-collapse shadow-md rounded-lg'>  {/* Added table styles */}
            <thead>
            <tr className='bg-gray-100 text-gray-600 font-medium rounded-lg'> {/* Header styling */}
                <th className='px-6 py-3'>No</th>
                <th className='px-6 py-3'>Title</th>
                <th className='px-6 py-3 hidden md:table-cell'>Author</th>
                {/* Responsive hidden column */}
                <th className='px-6 py-3 hidden md:table-cell'>Publish Year</th>
                <th className='px-6 py-3'>Operations</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book, index) => (
                <tr key={book._id} className='text-gray-700 border-b hover:bg-gray-100'> {/* Row styling */}
                    <td className='px-6 py-4 text-center'>{index + 1}</td>
                    <td className='px-6 py-4 text-center'>{book.title}</td>
                    <td className='px-6 py-4 text-center hidden md:table-cell'>
                        {book.author}
                    </td>
                    <td className='px-6 py-4 text-center hidden md:table-cell'>
                        {book.publishYear}
                    </td>
                    <td className='px-6 py-4 text-center flex justify-center gap-2'> {/* Centered icons */}
                        <Link to={`/books/details/${book._id}`}>
                            <BsInfoCircle className='text-2xl text-green-500 hover:text-green-700 cursor-pointer'/>
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                            <AiOutlineEdit className='text-2xl text-yellow-500 hover:text-yellow-700 cursor-pointer'/>
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                            <MdOutlineDelete className='text-2xl text-red-500 hover:text-red-700 cursor-pointer'/>
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default BooksTable;
