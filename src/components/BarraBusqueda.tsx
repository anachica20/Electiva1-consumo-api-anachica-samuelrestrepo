import '../styles/BarraBusqueda.css'

interface BarraBusquedaProps {
  valor: string
  onChange: (valor: string) => void
}

const BarraBusqueda = ({ valor, onChange }: BarraBusquedaProps) => {
  return (
    <div className="barra-busqueda">
      <input
        type="text"
        placeholder="Buscar personaje..."
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default BarraBusqueda