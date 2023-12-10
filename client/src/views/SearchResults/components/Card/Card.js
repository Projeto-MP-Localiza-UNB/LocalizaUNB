import './Card.css';
import { FaStar } from 'react-icons/fa6';


const Card = ({ product = null  , restaurant = null, renderType}) => {
  console.log("Dados no Card:", product);

  return (
    <div className="box">
      <img
        src={`http://localhost:5000${restaurant?.imagem || product?.img_url || null}`}

        alt={restaurant != null ? 'imagem do restaurante' : 'imagem do produto'}
        className="card-img"
      />
      <div className="content-box">
        {renderType === 'lojas' && restaurant && (
          <>
            <div className="space">
              <span className="title">{restaurant.nome}</span>
            </div>
            <div className="space">
              <span>{`Distancia-km  `}</span>
            </div>
            <div>
              <span className="review">
                <FaStar size={16} /> {restaurant.nota}
              </span>
              <span>{` - ${restaurant.quantidade_avaliacao}`}</span>
            </div>
          </>
        )}

        {renderType === 'restaurante' && restaurant && (
          <>
            <div className="space">
              <span className="title">{restaurant.name}</span>
            </div>
            <div>
              <span className="review">
                <FaStar size={16} /> {restaurant.review}
              </span>
              <span>{` - ${restaurant.meters}m`}</span>
            </div>
          </>
        )}

        {renderType === 'produto-restaurante' && product && (
          <>
            <div className="space">
              <span className="title">{product.nome}</span>
            </div>
            <div>
              <span className="review">
                <FaStar size={16} /> {product.avaliacao}
              </span>
              <span>{` - ${product.quantidade_avaliacao}m`}</span>
            </div>
          </>
        )}

        {renderType === 'teste' && (
          <>
            <div className="space">
              <span className="title">{'Nome do produto'}</span>
            </div>
            <div>
              <span className="review">
                <FaStar size={16} /> {'X,X'}
              </span>
              <span>{` - R$ XX,XX`}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
