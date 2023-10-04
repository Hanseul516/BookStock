import React, { useEffect, useState } from "react";
import BookResearch from './bookInfo';
import axios from "axios";
import { useNavigate } from "react-router";
import './index.css'
import CategoryModal from "../../../components/Category/CategoryModal";
import Button from 'react-bootstrap/Button';

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});

const BookSignUp = () => {
    const [product, setProduct] = useState({
        auctionTitle: '',
        auctionContext: '',
        auctionPrice: '',
        uId: '',
        bookImgSrc: '',
        bookTitle: '',
        bookAuthor: '',
        bookPub: '',
        auctionEnd: '',
    });
    const [selectedDays, setSelectedDays] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigation = useNavigate();

    const infoCallback = (book) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            bookImgSrc: book.IMAGE ? `http://localhost:12345/images/auctionimg/${book.IMAGE}` : '',
            bookTitle: book.TITLE,
            bookAuthor: book.AUTHOR,
            bookPub: book.PUBLISHER,
            bookPubDate: book.PUBDATE
        }));
    }

    useEffect(() => {
        console.log(product);
    }, [product]);

    const handleChange = (e, name) => {
        const { value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    useEffect(() => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + selectedDays);
        const formattedDate = currentDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        setProduct((prevProduct) => ({
            ...prevProduct,
            auctionEnd: selectedDays
        }));
    }, [selectedDays]);

    const handleSetAuctionEnd = (days) => {
        setSelectedDays(days);
    };

    const renderAuctionEnd = () => {
        if (selectedDays !== null) {
            return (
                <div className="selected-auction-end">
                    {selectedDays}일 후 마감
                </div>
            );
        }
        return null;
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        var newAuctionId;

            try {
                // 이미지를 서버에 전송
                const formData = new FormData();
                formData.append('image', product.bookImgSrc);

                console.log("Before Image Upload:", product.bookImgSrc);

                const imageResponse = await axiosConnect.post('/upload/auction', {
                    image: product.bookImgSrc // 이미지 URL을 전송
                });

                console.log("After Image Upload:", imageResponse.data);

                // 이미지 업로드 후 서버 응답에서 얻은 이미지 경로를 product에 업데이트
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    bookImgSrc: imageResponse.data.bookImgSrc
                }));

                // 경매 등록 요청
                const response = await axiosConnect.post('/auctions', product, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                newAuctionId = response.data.id;
                console.log(response.data.id);
            } catch (error) {
                console.error('책 등록 전송 실패:', error);
            }

            window.alert("경매 등록이 완료되었습니다.");
            navigation(`/trading?id=${newAuctionId}`);

            setProduct({
                auctionTitle: '',
                auctionContext: '',
                auctionPrice: '',
                uId: '',
                auctionEnd: '',
            });
            setSelectedDays(null);
        };

        return (
            <>
                <div className="book-sign-up-container">
                    <h2>도서 역경매 등록</h2>

<<<<<<< HEAD
                    <div className="row">
                        <div className="col-md-6">
                            <BookResearch aucToInfo={infoCallback} className="book-research" />
                        </div>
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit} className="book-sign-up-form">
                                <div className="auctionTitle">
                                    <label htmlFor="auctionTitle">게시글 제목</label>
                                    <input
                                        type="text"
                                        className="form-control formTitle"
                                        id="auctionTitle"
                                        name="auctionTitle"
                                        onChange={(e) => handleChange(e, "auctionTitle")}
                                        placeholder="게시글 제목을 입력하세요"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="auctionContext">상세정보</label>
                                    <textarea
                                        className="form-control formContext"
                                        id="auctionContext"
                                        name="auctionContext"
                                        onChange={(e) => handleChange(e, "auctionContext")}
                                        placeholder="상세정보를 입력하세요"
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="auctionPrice">경매시작가</label>
                                    <input
                                        type="number"
                                        className="form-control formPrice"
                                        id="auctionPrice"
                                        name="auctionPrice"
                                        onChange={(e) => handleChange(e, "auctionPrice")}
                                        placeholder="원하는 경매시작 가격을 입력하세요"
                                    />
                                </div>
                                <div className="exDateBtn-group">
                                    <label>마감기한</label>
                                    <div>{renderAuctionEnd()}</div>
                                    <div className="d-flex flex-wrap align-items-center">
                                        <button
                                            type="button"
                                            className="btn btn-secondary mb-2 me-2"
                                            onClick={() => handleSetAuctionEnd(1)}
                                        >
                                            1일
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary mb-2 me-2"
                                            onClick={() => handleSetAuctionEnd(3)}
                                        >
                                            3일
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary mb-2 me-2"
                                            onClick={() => handleSetAuctionEnd(7)}
                                        >
                                            7일
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary mb-2 me-2"
                                            onClick={() => handleSetAuctionEnd(30)}
                                        >
                                            30일
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary mb-2 me-2"
                                            onClick={() => handleSetAuctionEnd(60)}
                                        >
                                            60일
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div className="d-grid col-11 mx-auto ">
                        <button type="submit"
                            className="btn btn-sign-up btn-lg mt-4 mb-5 signupBtn"
                            onClick={() => handleSubmit()}>
                            등록하기
                        </button>
                    </div>
                </div>
            </>
        );
    }
=======
        setProduct({
            auctionTitle: '',
            auctionContext: '',
            auctionPrice: '',
            uId: '',
            auctionEnd: '',
        });
        setSelectedDays(null);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category); // 선택한 카테고리 업데이트
        setShowModal(false); // 모달을 닫습니다.
    };

    return (
        <>
            <div className="book-sign-up-container">
                <h2>도서 역경매 등록</h2>

                <div className="row">
                    <div className="col-md-6">
                        <BookResearch aucToInfo={infoCallback} className="book-research" />
                    </div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} className="book-sign-up-form">
                            <div className="auctionTitle">
                                <label htmlFor="auctionTitle">게시글 제목</label>
                                <input
                                    type="text"
                                    className="form-control formTitle"
                                    id="auctionTitle"
                                    name="auctionTitle"
                                    onChange={(e) => handleChange(e, "auctionTitle")}
                                    placeholder="게시글 제목을 입력하세요"
                                />
                            </div>
                            <div>
                                <label htmlFor="auctionContext">상세정보</label>
                                <textarea
                                    className="form-control formContext"
                                    id="auctionContext"
                                    name="auctionContext"
                                    onChange={(e) => handleChange(e, "auctionContext")}
                                    placeholder="상세정보를 입력하세요"
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="auctionPrice">경매시작가</label>
                                <input
                                    type="number"
                                    className="form-control formPrice"
                                    id="auctionPrice"
                                    name="auctionPrice"
                                    onChange={(e) => handleChange(e, "auctionPrice")}
                                    placeholder="원하는 경매시작 가격을 입력하세요"
                                />
                            </div>
                            <label>도서 카테고리</label>
                            <div>
                                <button type="button" className="btn btn-secondary mb-2 me-2" onClick={() => setShowModal(true)}>
                                    {selectedCategory ? selectedCategory : "카테고리 선택하기"}
                                </button>
                                <CategoryModal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    onCategorySelect={handleCategorySelect}
                                    selectedCategory={selectedCategory}
                                />
                            </div>
                            <div className="exDateBtn-group">
                                <label>마감기한</label>
                                <div>{renderAuctionEnd()}</div>
                                <div className="d-flex flex-wrap align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-secondary mb-2 me-2"
                                        onClick={() => handleSetAuctionEnd(1)}
                                    >
                                        1일
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary mb-2 me-2"
                                        onClick={() => handleSetAuctionEnd(3)}
                                    >
                                        3일
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary mb-2 me-2"
                                        onClick={() => handleSetAuctionEnd(7)}
                                    >
                                        7일
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary mb-2 me-2"
                                        onClick={() => handleSetAuctionEnd(30)}
                                    >
                                        30일
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary mb-2 me-2"
                                        onClick={() => handleSetAuctionEnd(60)}
                                    >
                                        60일
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="d-grid col-11 mx-auto ">
                    <button type="submit"
                        className="btn btn-sign-up btn-lg mt-4 mb-5 signupBtn"
                        onClick={() => handleSubmit()}>
                        등록하기
                    </button>
                </div>
            </div>
        </>
    );
}
>>>>>>> ef7cba61ef3a1eda6cbc3c6cb53bf98a6a9b6b3e

    export default BookSignUp;
