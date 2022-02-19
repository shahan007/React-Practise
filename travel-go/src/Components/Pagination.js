const Pagination = ({ currentPage, totalPages, setCurrentPage}) => {
    
    const prevPage = () => {
        setCurrentPage(currentPage - 1)
    }
            

    const nextPage = ()=> {
        console.log(currentPage)
        setCurrentPage(currentPage + 1)        
    }            

    return (
        <div  className="pagination">
            <button 
            className="next-page" 
            onClick={prevPage} disabled={currentPage === 0 ? true : false} 
            title="previous page"
            >
                <i class="fa-solid fa-backward-step"></i>
            </button>
            <span className="pagination-status">
                <span className="pagination-currentpage">{currentPage + 1}</span> 
                / 
                <span className="pagination-totalpage">{totalPages}</span>
            </span>
            <button 
            className="previous-page" 
            onClick={nextPage} disabled={currentPage + 1 === totalPages ? true : false} 
            title="next page"
            >
                <i class="fa-solid fa-forward-step"></i>
            </button>
        </div>
    )
}

export default Pagination;