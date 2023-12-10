import React, { useState } from 'react';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./ModalProduto.css"
import { FaStar } from 'react-icons/fa6';

const ModalProduto = ({ product = null, open, onCloseModal}) => {
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

export default ModalProduto;