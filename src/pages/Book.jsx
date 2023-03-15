import Container from '../components/Container';
import { useParams } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import ErrorAlert from '../components/ErrorAlert';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Book = () => {
    const params = useParams();

    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchBookData = async() => {
        const url = `https://api.matgargano.com/api/books/${params.id}`;
        setLoading(true);
        setError(false);
        try {
            const request = await fetch(url);
            const response = await request.json();
            setBook(response);
        } catch(e) {
            setError('Error: ' + e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBookData();
    }, [params.id]);

    return (
        <Container>
            {error && <ErrorAlert>{error}</ErrorAlert>}
            {!error && loading && <div className="max-w-[230px]"><Skeleton count="10" /></div>}
            {!error && !loading &&
                <>
                    <div >
                       <div className="pb-8"> 
                            <ul>
                                <li>
                                    <Link to="/books" className="text-base italic bg-gray-300 hover:bg-gray-200 active:bg-gray-400 border border-gray-300 rounded-lg border-2 p-2">
                                        &larr; Back to Book Selection 
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            {/* ORIGINAL PLACEMENT OF TITLE
                            <div className="flex justify-center">
                                <h4 className="font-bold text-4xl my-auto">{book.title} </h4>
                            </div> */}
                            <div className="container mx-auto flex justify-center items-center">
                                <img src={book.imageURL} alt="book cover" className="m-10"/>
                                <div className="text-center">
                                    <h4 className="mb-8 max-w-sm my-auto font-bold text-4xl">{book.title} </h4>
                                    <p className="leading-loose py-5 tracking-wider">
                                    Author: <strong>{book.author}</strong> <br/>
                                    Publisher: <strong>{book.publisher}</strong> <br/>
                                    Year of Release: <strong>{book.year}</strong> <br/>
                                    Country of Origin: <strong>{book.country}</strong> <br/>
                                    Number of Pages: <strong>{book.pages}</strong> <br/>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </Container>
    )
}

export default Book;