import React, { useEffect, useState } from 'react';
import axios from 'axios';

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});

function groupByAId(data) {
    return data.reduce((acc, item) => {
        if (!acc[item.aId]) {
            acc[item.aId] = [];
        }
        acc[item.aId].push(item);
        return acc;
    }, {});
}


const AuctionProgressInfoComponent = () => {
    const [myBidInfo,setMyBidInfo] = useState([]);
    const fetchData = async () => {
        try{
            const response = await axiosConnect.get(`/mypage/auctionbid`)
            if(response.data){
                setMyBidInfo(groupByAId(response.data));
            }
            
        }catch(err){
            console.error(err);
        }
        console.log(myBidInfo)
    }
    
    useEffect(()=>{
        fetchData()
    },[]);
    
    return (
        <>
            <div id="bid" className="mt-5 mb-3">
                <h2>경매 입찰 내역</h2>
            </div>
            <div>
                <div>
                    {Object.keys(myBidInfo).map(aId => (
                        <div className="card mt-3 p-3" key={aId}>
                            {/* 입찰한 책에대한 부분 */}
                            <h4> 경매 제목 : {myBidInfo[aId][0].auctionTitle}</h4>
                            필요한 정보가 더 있다면 myBidInfo[aId][0].key값 쓰면 됨<br />
                            없으면 API서버 mypage 모델 myAuctionBid 함수를 수정
                            {/* 여러번 입찰 했다면 아래 메세지가 여러개 나옴 */}
                            {myBidInfo[aId].map(bid => (
                                <div key={bid.bidId}>
                                    <div className="card mb-3" style={{ minWidth: "25%" }} key={null}>
                                        <div className="row g-0">
                                            <div className="col-md-12">
                                                <div className="card-body row align-items-center">
                                                    <h3 className="card-title col-sm-1 ms-4 mt-4">{bid.nickname}</h3>
                                                    <p className="card-title col-sm-2 mt-4">
                                                        <small className="text-body-secondary">{bid.bidCreateAt}</small>
                                                    </p>
                                                    <h6 className="card-title col-sm-2 mt-4">{bid.bidPrice} 원</h6>
                                                    <div className="col-sm-2"></div>
                                                    <button type="button" className="btn btn-primary col-sm-2 mt-3" onClick={null}>즉시구매</button>
                                                    <button type="button" className="btn btn-info col-sm-2 mt-3" onClick={() => null}>1:1 채팅</button>

                                                </div>
                                            </div>

                                            <div className='card-body row'>
                                                <div className="alert alert-light col-sm-12" role="alert">
                                                    <img src={bid.bidImgSrc?"":"http://placeholder.com/100"} className="img-fluid mx-4" alt="..." />
                                                    {bid.bidContext}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {/* <div className="card mb-3" style={{ minWidth: "25%" }} key={null}>
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
                </div> 위에 사용된 코드 원형 */}
            </div>
        </>
    );
}

export default AuctionProgressInfoComponent;