const AuctionProgress = () => {
    return (
        <>
            <div id="bid" className="mt-5 mb-3">
                <h2>역경매 입찰</h2>
            </div>
            <div>
                {/* {auctionBidData.map((bid) => ( */}
                    <div className="card mb-3" style={{ minWidth: "25%" }} key={null}>
                        <div className="row g-0">
                            <div className="col-md-12">
                                <div className="card-body row align-items-center">
                                    <h3 className="card-title col-sm-1 ms-4 mt-4">닉네임</h3>
                                    <p className="card-title col-sm-2 mt-4">
                                        <small className="text-body-secondary">작성일시</small>
                                    </p>
                                    <h6 className="card-title col-sm-2 mt-4">20,000 원</h6>
                                    <div className="col-sm-2"></div>
                                    <button type="button" className="btn btn-primary col-sm-2 mt-3" onClick={null}>즉시구매</button>
                                    <button type="button" className="btn btn-info col-sm-2 mt-3" onClick={() => null}>1:1 채팅</button>

                                </div>
                            </div>

                            <div className='card-body row'>
                                <div className="alert alert-light col-sm-12" role="alert">
                                    <img src="http://placeholder.com/100" className="img-fluid mx-4" alt="..." />
                                    "상세설명이 없습니다."
                                </div>
                            </div>
                        </div>
                    </div>
                {/* ))} */}
            </div>
        </>
    );
}

export default AuctionProgress;