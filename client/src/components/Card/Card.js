import './Card.css';
import { FaStar } from 'react-icons/fa6';

/**
 * Renderiza 3 tipos diferentes de um Card generico.
 * @param {Object} product - product_name, price, meters, review, restaurant_name, img_url
 * @param {Object} restaurant - name, review, meters, img_url.
 * @param {string} renderType - tipo de renderizacao
 */
const Card = ({ product = null, restaurant = null, renderType }) => {
  return (
    <div className="box">
      <img
        src={null}
        alt={product != null ? 'imagem do produto' : 'imagem do restaurante'}
        className="card-img"
      />
      <div className="content-box">
        {renderType === 'produto' && (
          <>
            <div className="space">
              <span className="title">{product.product_name}</span>
            </div>
            <div className="space">
              <span>{`${product.meters}m - R$ ${product.price}`}</span>
            </div>
            <div>
              <span className="review">
                <FaStar size={16} /> {product.review}
              </span>
              <span>{` - ${product.restaurant_name}`}</span>
            </div>
          </>
        )}

        {renderType === 'restaurante' && (
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

        {renderType === 'produto-restaurante' && (
          <>
            <div className="space">
              <span className="title">{product.product_name}</span>
            </div>
            <div>
              <span className="review">
                <FaStar size={16} /> {product.review}
              </span>
              <span>{` - ${product.meters}m`}</span>
            </div>
          </>
        )}

        {/*para testes, vai ser apagado posteriormente */}
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
