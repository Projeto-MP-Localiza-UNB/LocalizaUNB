import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './ModalItem.css';
import { FaStar } from 'react-icons/fa6';
import { IoMailOpenOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

/**
 * Componente do item modal usado para exibir detalhes de um produto ou de uma loja em um modal.
 * @param {Object} product Objeto representando os detalhes do produto/loja a ser exibido no modal
 * @param {boolean} open Indica se o modal está aberto ou fechado
 * @param {function} onCloseModal Função para fechar o modal
 * @returns
 */

/**
 * Componente de modal para exibir detalhes de um item.
 *
 * @component
 * @param {Object} props - As propriedades do componente.
 * @param {Object} props.product - O objeto de produto a ser exibido no modal.
 * @param {boolean} props.open - Indica se o modal está aberto ou fechado.
 * @param {Function} props.onCloseModal - Função de callback para fechar o modal.
 * @returns {JSX.Element} O componente de modal com os detalhes do item.
 */
const ModalItem = ({ product = null, open, onCloseModal }) => {
  const hasProducts = product && product.produtos && product.produtos.length > 0;
  console.log('Dados da loja:', product);
  console.log('Produtos:', product.produtos);

  return (
    <div>
      <Modal
        center
        open={open}
        onClose={onCloseModal}
        classNames={{
          overlay: 'modal-overlay',
          modal: 'modal-produto',
        }}
      >
        <img
          src={
            product.imagem && product.imagem.length > 0 && product.imagem.length <= 50
              ? `http://localhost:5000${product.imagem}`
              : product.imagem
          }
          alt={'imagem do restaurante'}
          className="produto-img"
        />

        <h1>
          {product.nome}
          <span className='review'>
            <FaStar size={16} />
            {product.nota}
          </span>
        </h1>

        <div className="cardapio">
          
          <h2>Produtos à venda:</h2>
          <ul>
            {hasProducts ? (
              product.produtos.map((produto) => (
                <li key={produto.id}>
                  <strong>{produto.nome}</strong> - {produto.descricao}
                  
                </li>
              ))
            ) : (
              <p>Nenhum produto disponível.</p>
            )}
          </ul>
        </div>

        <div>
          <Link
            className="contato"
            to="#"
            onClick={(e) => {
              window.location.href = 'mailto:' + product.email;
              e.preventDefault();
            }}
          >
            <IoMailOpenOutline size={16} /> Entre em contato com a loja
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default ModalItem;
