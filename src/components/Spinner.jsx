const Spinner = () => {
    return (<div
        className='animate-spin rounded-full border-gray-200 border border-dashed w-10 h-10 flex justify-center items-center'>
        <div className='h-3 w-3 bg-sky-500 rounded-full animate-bounce'/>
    </div>);
};

export default Spinner;
