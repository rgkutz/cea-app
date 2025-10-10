import React, { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    // Datos personales
    nombre: '',
    edad: '',
    genero: '',
    ciudad: '',
    
    // Habilidades
    cooking: 'not_able',
    cleaning: 'not_able', 
    shopping: 'not_able',
    transportation: 'not_able',
    hygiene: 'not_able',
    health: 'not_able',
    money: 'not_able',
    social: 'not_able'
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // REEMPLAZA ESTA URL CON LA QUE OBTUVISTE DE GOOGLE APPS SCRIPT
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXXXXXXXX/exec'

  const ciudadesMisiones = [
    'Posadas', 'Candelaria', 'Garupá', 'Puerto Iguazú', 'Eldorado', 
    'Oberá', 'Apóstoles', 'Leandro N. Alem', 'San Javier', 'Colonia Wanda',
    'Puerto Rico', 'Jardín América', 'Aristóbulo del Valle', 'Campo Grande',
    'San Pedro', 'Bernardo de Irigoyen', 'El Soberbio', 'San Vicente',
    'Panambí', 'Colonia Aurora', 'Dos de Mayo', 'Campo Viera', 'Itacaruaré',
    'San Antonio', 'Alba Posse', '25 de Mayo', 'Colonia Polana', 'Cerro Corá',
    'Gobernador Roca', 'Santo Pipó', 'Hipólito Yrigoyen', 'General Alvear',
    'Caa Yarí', 'Azara', 'Concepción de la Sierra', 'Santa María', 'Loreto',
    'San Ignacio', 'Corpus', 'Gobernador López', 'Fachinal', 'Garuhapé',
    'Mbopicuá', 'Piray Kilómetro 18', 'Puerto Esperanza', 'Ruiz de Montoya',
    'Santiago de Liniers', 'Tres Capones', 'Villa Bonita'
  ]

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateSkill = (skill, value) => {
    setFormData(prev => ({
      ...prev,
      [skill]: value
    }))
  }

  const handleSubmit = async () => {
    // Validación básica
    if (!formData.edad || !formData.genero || !formData.ciudad) {
      alert('❌ Por favor completa los campos obligatorios: Edad, Género y Ciudad')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setMessage('✅ Datos guardados correctamente en la base de datos')
        alert('✅ Evaluación guardada exitosamente!\nLos datos se han almacenado correctamente.')
        
        // Resetear formulario
        setFormData({
          nombre: '',
          edad: '',
          genero: '',
          ciudad: '',
          cooking: 'not_able',
          cleaning: 'not_able', 
          shopping: 'not_able',
          transportation: 'not_able',
          hygiene: 'not_able',
          health: 'not_able',
          money: 'not_able',
          social: 'not_able'
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('❌ Error al guardar los datos. Intenta nuevamente.')
      alert('❌ Error al guardar. Revisa tu conexión e intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🧩 TEA Assessment Tool</h1>
        <p>Herramienta de evaluación para personas con TEA</p>
      </header>

      <main className="main">
        <div className="assessment-card">
          <h2>📋 Datos Personales</h2>
          
          {/* Nombre */}
          <div className="form-group">
            <label>Nombre (opcional)</label>
            <input 
              type="text" 
              placeholder="Ingresa el nombre"
              value={formData.nombre}
              onChange={(e) => updateField('nombre', e.target.value)}
              className="form-input"
            />
          </div>

          {/* Edad */}
          <div className="form-group">
            <label>Edad *</label>
            <input 
              type="number" 
              placeholder="Ej: 15"
              value={formData.edad}
              onChange={(e) => updateField('edad', e.target.value)}
              className="form-input"
              min="1"
              max="120"
              required
            />
          </div>

          {/* Género */}
          <div className="form-group">
            <label>Género *</label>
            <select 
              value={formData.genero}
              onChange={(e) => updateField('genero', e.target.value)}
              className="form-select"
              required
            >
              <option value="">Seleccionar género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="no_binario">No binario</option>
              <option value="prefiero_no_decir">Prefiero no decir</option>
            </select>
          </div>

          {/* Ciudad */}
          <div className="form-group">
            <label>Ciudad (Misiones) *</label>
            <select 
              value={formData.ciudad}
              onChange={(e) => updateField('ciudad', e.target.value)}
              className="form-select"
              required
            >
              <option value="">Seleccionar ciudad</option>
              {ciudadesMisiones.map(ciudad => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>
          </div>

          <h2>💪 Habilidades de Vida Diaria</h2>
          <p className="subtitle">Selecciona el nivel de independencia para cada área</p>
          
          {/* Cocina */}
          <div className="skill-card">
            <h3>🍳 Cocina</h3>
            <p>Preparar comidas sencillas</p>
            <div className="skill-options">
              <button 
                className={formData.cooking === 'independent' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.cooking === 'independent' ? '#10B981' : '#E5E7EB' }}
                onClick={() => updateSkill('cooking', 'independent')}
              >
                Independiente
              </button>
              <button 
                className={formData.cooking === 'with_help' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.cooking === 'with_help' ? '#3B82F6' : '#E5E7EB' }}
                onClick={() => updateSkill('cooking', 'with_help')}
              >
                Con ayuda
              </button>
              <button 
                className={formData.cooking === 'not_able' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.cooking === 'not_able' ? '#EF4444' : '#E5E7EB' }}
                onClick={() => updateSkill('cooking', 'not_able')}
              >
                No realiza
              </button>
            </div>
          </div>

          {/* Limpieza */}
          <div className="skill-card">
            <h3>🧹 Limpieza</h3>
            <p>Tareas del hogar</p>
            <div className="skill-options">
              <button 
                className={formData.cleaning === 'independent' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.cleaning === 'independent' ? '#10B981' : '#E5E7EB' }}
                onClick={() => updateSkill('cleaning', 'independent')}
              >
                Independiente
              </button>
              <button 
                className={formData.cleaning === 'with_help' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.cleaning === 'with_help' ? '#3B82F6' : '#E5E7EB' }}
                onClick={() => updateSkill('cleaning', 'with_help')}
              >
                Con ayuda
              </button>
              <button 
                className={formData.cleaning === 'not_able' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.cleaning === 'not_able' ? '#EF4444' : '#E5E7EB' }}
                onClick={() => updateSkill('cleaning', 'not_able')}
              >
                No realiza
              </button>
            </div>
          </div>

          {/* Compras */}
          <div className="skill-card">
            <h3>🛒 Compras</h3>
            <p>Supermercado, almacén</p>
            <div className="skill-options">
              <button 
                className={formData.shopping === 'independent' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.shopping === 'independent' ? '#10B981' : '#E5E7EB' }}
                onClick={() => updateSkill('shopping', 'independent')}
              >
                Independiente
              </button>
              <button 
                className={formData.shopping === 'with_help' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.shopping === 'with_help' ? '#3B82F6' : '#E5E7EB' }}
                onClick={() => updateSkill('shopping', 'with_help')}
              >
                Con ayuda
              </button>
              <button 
                className={formData.shopping === 'not_able' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.shopping === 'not_able' ? '#EF4444' : '#E5E7EB' }}
                onClick={() => updateSkill('shopping', 'not_able')}
              >
                No realiza
              </button>
            </div>
          </div>

          {/* Transporte Público */}
          <div className="skill-card">
            <h3>🚌 Transporte Público</h3>
            <p>Usar colectivos, subte, taxis</p>
            <div className="skill-options">
              <button 
                className={formData.transportation === 'independent' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.transportation === 'independent' ? '#10B981' : '#E5E7EB' }}
                onClick={() => updateSkill('transportation', 'independent')}
              >
                Independiente
              </button>
              <button 
                className={formData.transportation === 'with_help' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.transportation === 'with_help' ? '#3B82F6' : '#E5E7EB' }}
                onClick={() => updateSkill('transportation', 'with_help')}
              >
                Con ayuda
              </button>
              <button 
                className={formData.transportation === 'not_able' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.transportation === 'not_able' ? '#EF4444' : '#E5E7EB' }}
                onClick={() => updateSkill('transportation', 'not_able')}
              >
                No realiza
              </button>
            </div>
          </div>

          {/* Higiene Personal */}
          <div className="skill-card">
            <h3>🚿 Higiene Personal</h3>
            <p>Baño, vestirse, cuidado personal</p>
            <div className="skill-options">
              <button 
                className={formData.hygiene === 'independent' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.hygiene === 'independent' ? '#10B981' : '#E5E7EB' }}
                onClick={() => updateSkill('hygiene', 'independent')}
              >
                Independiente
              </button>
              <button 
                className={formData.hygiene === 'with_help' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.hygiene === 'with_help' ? '#3B82F6' : '#E5E7EB' }}
                onClick={() => updateSkill('hygiene', 'with_help')}
              >
                Con ayuda
              </button>
              <button 
                className={formData.hygiene === 'not_able' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.hygiene === 'not_able' ? '#EF4444' : '#E5E7EB' }}
                onClick={() => updateSkill('hygiene', 'not_able')}
              >
                No realiza
              </button>
            </div>
          </div>

          {/* Gestión de Salud */}
          <div className="skill-card">
            <h3>🏥 Gestión de Salud</h3>
            <p>Medicación, citas médicas</p>
            <div className="skill-options">
              <button 
                className={formData.health === 'independent' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.health === 'independent' ? '#10B981' : '#E5E7EB' }}
                onClick={() => updateSkill('health', 'independent')}
              >
                Independiente
              </button>
              <button 
                className={formData.health === 'with_help' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.health === 'with_help' ? '#3B82F6' : '#E5E7EB' }}
                onClick={() => updateSkill('health', 'with_help')}
              >
                Con ayuda
              </button>
              <button 
                className={formData.health === 'not_able' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.health === 'not_able' ? '#EF4444' : '#E5E7EB' }}
                onClick={() => updateSkill('health', 'not_able')}
              >
                No realiza
              </button>
            </div>
          </div>

          {/* Manejo de Dinero */}
          <div className="skill-card">
            <h3>💰 Manejo de Dinero</h3>
            <p>Compras, presupuesto, pagos</p>
            <div className="skill-options">
              <button 
                className={formData.money === 'independent' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.money === 'independent' ? '#10B981' : '#E5E7EB' }}
                onClick={() => updateSkill('money', 'independent')}
              >
                Independiente
              </button>
              <button 
                className={formData.money === 'with_help' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.money === 'with_help' ? '#3B82F6' : '#E5E7EB' }}
                onClick={() => updateSkill('money', 'with_help')}
              >
                Con ayuda
              </button>
              <button 
                className={formData.money === 'not_able' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.money === 'not_able' ? '#EF4444' : '#E5E7EB' }}
                onClick={() => updateSkill('money', 'not_able')}
              >
                No realiza
              </button>
            </div>
          </div>

          {/* Habilidades Sociales */}
          <div className="skill-card">
            <h3>👥 Habilidades Sociales</h3>
            <p>Conversar, hacer amigos, relaciones</p>
            <div className="skill-options">
              <button 
                className={formData.social === 'independent' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.social === 'independent' ? '#10B981' : '#E5E7EB' }}
                onClick={() => updateSkill('social', 'independent')}
              >
                Independiente
              </button>
              <button 
                className={formData.social === 'with_help' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.social === 'with_help' ? '#3B82F6' : '#E5E7EB' }}
                onClick={() => updateSkill('social', 'with_help')}
              >
                Con ayuda
              </button>
              <button 
                className={formData.social === 'not_able' ? 'skill-btn active' : 'skill-btn'}
                style={{ backgroundColor: formData.social === 'not_able' ? '#EF4444' : '#E5E7EB' }}
                onClick={() => updateSkill('social', 'not_able')}
              >
                No realiza
              </button>
            </div>
          </div>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button 
            className="save-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '⏳ Guardando...' : '💾 Guardar Evaluación'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default App