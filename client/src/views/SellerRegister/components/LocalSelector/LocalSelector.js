import { useRef, useState } from 'react';

import GPS from '../../../../components/gps/GPS';

import './LocalSelector.css';
import cross from '../../assets/cross.png';
import GPSService from '../../../../components/gps/GPSService';

export default function LocalSelector({ open, setOpen, setFormData }) {
  const [lastMarker, setLastMarker] = useState(null);
  const [marker, setMarker] = useState(null);
  const dialog = useRef();

  function finish() {
    marker?.setMap(null);
    setMarker(lastMarker);
    setOpen(false);
  }

  return (
    <>
      {open ? (
        <div className="local-selector-container">
          <dialog ref={dialog}>
            <p>
              As informação não serão salvas! <br />
              Deseja continuar?
            </p>
            <div className="dialog-buttons-container">
              <button onClick={() => dialog.current.close()}>Cancelar</button>
              <button
                style={{ backgroundColor: '#008940' }}
                onClick={() => finish()}
              >
                Sim
              </button>
            </div>
          </dialog>
          <div className="gps-wrapper">
            <button
              onClick={() => {
                if (marker !== lastMarker) {
                  dialog.current.showModal();
                } else {
                  finish();
                }
              }}
              className="close-button"
            >
              <img src={cross} alt="Fechar" />
            </button>
            <GPS marker={marker} setMarker={setMarker} />
            <div className="confirm-local-container">
              <button
                className="confirm-local"
                style={{ display: marker ? 'initial' : 'none' }}
                onClick={() => {
                  setFormData((data) => ({
                    ...data,
                    local: GPSService.getMarkerPosition(marker),
                  }));
                  marker?.setMap(null);
                  setLastMarker(marker);
                  setOpen(false);
                }}
              >
                Confirmar localização
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
