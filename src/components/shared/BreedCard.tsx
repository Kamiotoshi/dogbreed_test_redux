// components/BreedCard.tsx
import React from 'react';
import { Dog, ExternalLink } from 'lucide-react';
import { BreedCardProps } from '../../types';

const BreedCard: React.FC<BreedCardProps> = ({ breed, className = '' }) => {
    const handleLearnMore = () => {
        const searchUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(breed.attributes.name)}_dog`;
        window.open(searchUrl, '_blank', 'noopener,noreferrer');
    };

    const handleGoogleSearch = () => {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(breed.attributes.name)}+dog+breed+images`;
        window.open(searchUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 ${className}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                    <Dog size={24} className="text-blue-500" />
                    <span>{breed.attributes.name}</span>
                </h3>
                {breed.attributes.hypoallergenic && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                        Hypoallergenic
                    </span>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {breed.attributes.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                    <strong className="text-gray-700">Lifespan:</strong>
                    <br />
                    <span className="text-blue-600 font-semibold">
                        {breed.attributes.life.min} - {breed.attributes.life.max} years
                    </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                    <strong className="text-gray-700">Male Weight:</strong>
                    <br />
                    <span className="text-blue-600 font-semibold">
                        {breed.attributes.male_weight.min} - {breed.attributes.male_weight.max} kg
                    </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg sm:col-span-2">
                    <strong className="text-gray-700">Female Weight:</strong>
                    <br />
                    <span className="text-blue-600 font-semibold">
                        {breed.attributes.female_weight.min} - {breed.attributes.female_weight.max} kg
                    </span>
                </div>
            </div>

            {/*/!* Action Buttons *!/*/}
            {/*<div className="flex flex-col sm:flex-row gap-2">*/}
            {/*    <button*/}
            {/*        onClick={handleLearnMore}*/}
            {/*        className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium cursor-pointer"*/}
            {/*    >*/}
            {/*        <span>Learn More</span>*/}
            {/*    </button>*/}

            {/*    <button*/}
            {/*        onClick={handleGoogleSearch}*/}
            {/*        className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 font-medium border border-gray-300 cursor-pointer"*/}
            {/*    >*/}
            {/*        <ExternalLink size={18} />*/}
            {/*        <span>View Images</span>*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
};

export default BreedCard;