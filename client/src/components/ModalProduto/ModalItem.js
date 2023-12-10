import React from 'react';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./ModalItem.css"
import { FaStar } from 'react-icons/fa6';

/**
 * Componente do item modal usado para exibir detalhes de um produto ou de uma loja em um modal.
 * @param {Object} product Objeto representando os detalhes do produto/loja a ser exibido no modal
 * @param {boolean} open Indica se o modal está aberto ou fechado
 * @param {function} onCloseModal Função para fechar o modal
 * @returns
*/

const ModalItem = ({ product = null, open, onCloseModal}) => {
  return (
    <div>
      <Modal 
        center
        open={open} 
        onClose={onCloseModal}
        classNames={{
          overlay: 'modal-overlay',
          modal: 'modal-produto',
        }}>
      <img
        src={product.img}
        alt={'imagem do produto'}
        className="produto-img"
      />
        <h1>{product.nome}</h1>
        <span className="review">
          <FaStar size={16} /> {product.nota}
        </span>
        <p>
          {product.descricao}
        </p>
      </Modal>
    </div>
  );
}

export default ModalItem;