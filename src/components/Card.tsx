interface CardProps {
  title: string;
  value: string | number;
  icon: string;
  bgColor: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, bgColor }) => {
  return (
    <div className="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {value}
          </h2>
        </div>
        <div
          className={`${bgColor} text-white text-2xl p-3 rounded-full shadow`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Card;
