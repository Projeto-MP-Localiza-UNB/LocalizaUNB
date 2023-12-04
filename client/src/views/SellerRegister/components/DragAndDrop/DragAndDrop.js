/* eslint-disable default-case */
import { useEffect, useRef, useState } from 'react';
import './DragAndDrop.css';

import cross from '../../assets/cross.png';
import upload from '../../assets/upload.png';
import ok from '../../assets/icons8-ok.svg';

function conditionalRendering(type, status) {
  switch (type) {
    case 'icon':
      switch (status) {
        case 'invalid':
          return cross;
        case 'ok':
          return ok;
        default:
          return upload;
      }
    case 'border':
      switch (status) {
        case 'invalid':
          return '4px solid red';
        case 'ok':
          return '4px solid green';
        default:
          return;
      }
  }
}

export default function DragAndDrop({ setData }) {
  const [src, setSrc] = useState(null);
  const [dropFieldDimensions, setDropFieldDimensions] = useState({
    width: null,
    height: null,
  });
  const [status, setStatus] = useState(undefined);
  const drop = useRef();
  const reader = new FileReader();

  useEffect(() => {
    setDropFieldDimensions({
      width: drop.current.parentElement.clientWidth,
      height: drop.current.parentElement.clientHeight,
    });
  }, [drop]);

  reader.onloadend = (e) => {
    setData(e.target.result);
    setSrc(e.target.result);
  };

  function validateDrop(file) {
    if (
      file.length > 1 ||
      !file[0].type.includes('image') ||
      !file[0].kind === 'file'
    ) {
      setStatus('invalid');
    } else {
      setStatus('ok');
    }
  }

  return (
    <>
      <div
        className="drop-field"
        style={{
          border: conditionalRendering('border', status),
          width: dropFieldDimensions.width + 'px',
          height: dropFieldDimensions.height + 'px',
          backgroundColor: src ? 'rgba(0,0,0,0.75)' : '',
        }}
        ref={drop}
        onDragOver={(e) => {
          e.preventDefault();
          validateDrop(e.dataTransfer.items);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setStatus(undefined);
        }}
        onDrop={(e) => {
          e.preventDefault();
          switch (status) {
            case 'ok':
              reader.readAsDataURL(e.dataTransfer.items[0].getAsFile());
              drop.current.classList.add('pulse');
              setTimeout(() => {
                drop.current.classList.remove('pulse');
              }, 800);
              break;
            case 'invalid':
              drop.current.classList.add('shake');
              setTimeout(() => {
                drop.current.classList.remove('shake');
              }, 300);
              break;
          }
          setStatus(undefined);
        }}
      >
        <img
          style={{
            height: src ? '100%' : '',
            width: src ? '100%' : '',
          }}
          src={src || conditionalRendering('icon', status)}
          alt="Ícone de upload"
        />
        <label className="drag-and-drop-label">Imagem da loja</label>
        <input
          className="drag-and-drop-input"
          type="file"
          id="store-image"
          name="store-image"
          accept="image/*"
          onChange={(e) => {
            e.preventDefault();
            if (e.target.files.length) reader.readAsDataURL(e.target?.files[0]);
          }}
        />
      </div>
    </>
  );
}
