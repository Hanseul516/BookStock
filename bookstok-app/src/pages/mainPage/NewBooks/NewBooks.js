import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import './NewBooks.css';
import ProgressBar from './progressbar';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});

function NewBooks() {
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        const axiosConnect = axios.create({
            baseURL: 'http://localhost:12345/api',
            withCredentials: true
        });

        const newBookFetcher = async () => {
            try {
                const response = await axiosConnect.get('test/mainpagetest');
                setBookData(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        newBookFetcher();
    }, []);

    const isDesktop = useMediaQuery({ minWidth: 992 });
    const isTablet = useMediaQuery({ minWidth: 576, maxWidth: 991 });
    const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 575 });

    const getSliderSettings = () => {
        if (isDesktop) {
            return {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 4,
                slidesToScroll: 2
            };
        } else if (isTablet) {
            return {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 1
            };
        } else if (isMobile) {
            return {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
            };
        }
    };

    const calculateProgress = (currentPrice, auctionPrice) => {
        if (auctionPrice === 0) {
            return 0; // Handle division by zero
        }
        return ((currentPrice / auctionPrice) * 100).toFixed(2);
    };

    return (
        <>
            <h2 className='newBookTitle'>새로 올라온 도서</h2>
            <div className="book-slider-container">
                {bookData.length > 0 ? (
                    <Slider {...getSliderSettings()}>
                        {bookData.map((book) => (
                            <Link to={`/trading?id=${book.auctionId}`} className="tradingLink card-link">
                                <div key={book.index} className="book-slide">
                                    <div className="d-flex flex-column align-items-center newBooks-card">
                                        <img src={book.bookImgSrc} alt={book.bookTitle} />
                                        <h4 className='bookTitle-text'>{book.bookTitle}</h4>
                                        <p className='bookAuthor-text'>{book.bookAuthor}</p>
                                        <p className="auctionPrice-text"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-emoji-neutral" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z" />
                                        </svg> {book.auctionPrice}원</p>
                                        <p className="presentPrice-text"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                                        </svg> 9000원</p>
                                        <ProgressBar
                                            now={calculateProgress(book.currentPrice, book.auctionPrice)}
                                            label={`${calculateProgress(book.currentPrice, book.auctionPrice)}%`}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                ) : (
                    <p> </p>
                )}
            </div>
        </>
    );
}

export default NewBooks;
