import './Card.css';
import { FaStar } from 'react-icons/fa6';

import { calculateDistance } from '../../../../components/gps/calculoDist';

const Card = ({ product = null  , restaurant = null, renderType}) => {
  console.log("Dados no Card:", product);

  return (
    <div className="box">
      <img
        src={product?.imagem || restaurant?.img_url || null}
        alt={product != null ? 'imagem do produto' : 'imagem do restaurante'}
        className="card-img"
      />
      <div className="content-box">
        {renderType === 'lojas' && product && (
          <>
            <div className="space">
              <span className="title">{product.nome}</span>
            </div>
            <div className="space">
              <span>{`Distancia-km  `}</span>
            </div>
            <div>
              <span className="review">
                <FaStar size={16} /> {product.nota}
              </span>
              <span>{` - ${product.quantidade_avaliacao}`}</span>
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
