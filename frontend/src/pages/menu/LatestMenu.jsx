import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';

const LatestMenu = () => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestMenu = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/menu/latest');
                console.log(response.data); 
                setMenu(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch menu');
                setLoading(false);
            }
        };
        fetchLatestMenu();
    }, []);

    if (loading) return <div className="flex justify-center items-center">
        <LoadingSpinner/>
    </div>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!menu) return <p className="text-center text-gray-500">No menu available</p>;

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6 px-6">
            <div className="bg-white p-8 rounded-lg shadow-md border-r-4 border-l-4 w-full max-w-lg mt-20">
                <h1 className="text-2xl font-bold mb-6 text-blue-800">Latest Menu</h1>
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-500 ">{`Menu for ${menu.month}/${menu.year}`}</h2>
                    <p className="whitespace-pre-line text-red-700 font-semibold">{menu.menu}</p>
                    {menu.pdfPath && (
                        <div className="mt-4 text-center">
                            <a
                                href={`http://localhost:8080/public/menus/${menu.pdfPath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={`menu_${menu.month}_${menu.year}.pdf`}
                                className="inline-block font-semibold hover:opacity-85 bg-amber-500 text-white px-4 py-2 rounded-full hover:bg-amber-600 transition-colors duration-200"
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
