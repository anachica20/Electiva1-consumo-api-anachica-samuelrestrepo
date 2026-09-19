import 'styles/EstadoMensaje.css'

export interface EstadoMensajeProps {
  type: 'cargando' | 'error' | 'vacio'
  message: string
}

function EstadoMensaje({ type, message }: EstadoMensajeProps) {
  return (
    <div className={`state-message state-message--${type}`}>
      <p>{message}</p>
    </div>
  )
}

export default EstadoMensaje