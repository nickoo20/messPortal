import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoAddCircle } from 'react-icons/io5';

const LatestMenu = () => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const fetchLatestMenu = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/menu/latest');
                setMenu(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch menu');
                setLoading(false);
            }
        };
        fetchLatestMenu();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!menu) {
        return <p className="text-center text-gray-500">No menu available</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-md border-r-4 border-yellow-300 p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Latest Menu</h1>
                    {currentUser?.studentRep && (
                        <Link to={'/student/dashboard/add-menu'} className="p-2 hover:rounded-full hover:bg-gray-100 md:w-auto">
                            <div className="flex items-center justify-end gap-2">
                                <IoAddCircle size={40} className="text-green-700" />
                            </div>
                        </Link>
                    )}
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-500">{`Menu for ${menu.month}/${menu.year}`}</h2>
                    <p className="whitespace-pre-line text-red-700 font-semibold leading-normal">{menu.menu}</p>
                    {menu.pdfPath && (
                        <div className="mt-4 text-center">
                            <a
                                href={`http://localhost:8080/public/menus/${menu.pdfPath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={`menu_${menu.month}_${menu.year}.pdf`}
                                className="inline-block font-semibold bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition-colors duration-200"
                            >
                                Download PDF
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LatestMenu;
