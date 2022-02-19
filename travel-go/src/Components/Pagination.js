const Pagination = ({ currentPage, totalPages, setCurrentPage}) => {
    
    const prevPage = () => {
        setCurrentPage(currentPage - 1)
    }
            

    const nextPage = ()=> {        
        setCurrentPage(currentPage + 1)        
    }            

    return (
        <div  className="pagination">
            <button 
            className="next-page btn" 
            onClick={prevPage} disabled={currentPage === 0 ? true : false} 
            title="previous page"
            >
                <i className="fa-solid fa-backward-step"></i>
            </button>
            <span className="pagination-status">
                <span className="pagination-currentpage">{currentPage + 1}</span> 
                / 
                <span className="pagination-totalpage">{totalPages}</span>
            </span>
            <button 
            className="previous-page btn" 
            onClick={nextPage} disabled={currentPage + 1 === totalPages ? true : false} 
            title="next page"
            >
                <i className="fa-solid fa-forward-step"></i>
            </button>
        </div>
    )
}

export default Pagination;