// components/BreedCard.tsx
import React from 'react';
import { Dog } from 'lucide-react';
import { BreedCardProps } from '../../types';

const BreedCard: React.FC<BreedCardProps> = ({ breed, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
        <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <Dog size={24} className="text-blue-500" />
                <span>{breed.attributes.name}</span>
            </h3>
            {breed.attributes.hypoallergenic && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          Hypoallergenic
        </span>
            )}
        </div>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {breed.attributes.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 p-3 rounded">
                <strong className="text-gray-700">Lifespan:</strong>
                <br />
                {breed.attributes.life.min} - {breed.attributes.life.max} years
            </div>

            <div className="bg-gray-50 p-3 rounded">
                <strong className="text-gray-700">Male Weight:</strong>
                <br />
                {breed.attributes.male_weight.min} - {breed.attributes.male_weight.max} kg
            </div>

            <div className="bg-gray-50 p-3 rounded sm:col-span-2">
                <strong className="text-gray-700">Female Weight:</strong>
                <br />
                {breed.attributes.female_weight.min} - {breed.attributes.female_weight.max} kg
            </div>
        </div>
    </div>
);

export default BreedCard;