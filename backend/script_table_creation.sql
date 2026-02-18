-- Script para crear y poblar las tablas de la base de datos

-- Eliminar tablas si existen (para reiniciar)
DROP TABLE IF EXISTS its CASCADE;
DROP TABLE IF EXISTS road_segment CASCADE;

-- Crear tabla de segmentos de carretera
CREATE TABLE road_segment (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    length DOUBLE PRECISION NOT NULL CHECK (length > 0),
    condition VARCHAR(255) NOT NULL
);

-- Crear tabla de equipos ITS
CREATE TABLE its (
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    instalation_date DATE NOT NULL,
    road_segment_id BIGINT,
    CONSTRAINT fk_road_segment FOREIGN KEY (road_segment_id) REFERENCES road_segment(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo en road_segment
INSERT INTO road_segment (name, location, length, condition) VALUES
('Autopista Norte', 'Bogotá - Km 0 a Km 15', 15.5, 'Excelente'),
('Avenida 68', 'Bogotá - Calle 13 a Calle 170', 22.3, 'Bueno'),
('Vía Medellín - Bogotá', 'Tramo La Ceja - Santuario', 35.7, 'Regular'),
('Carretera Central', 'Cali - Palmira', 28.0, 'Excelente'),
('Autopista Sur', 'Bogotá - Km 0 a Km 10', 10.2, 'Bueno');

-- Insertar datos de ejemplo en its (equipos de tráfico)
INSERT INTO its (type, location, status, instalation_date, road_segment_id) VALUES
-- Equipos para Autopista Norte (id=1)
('Cámara CCTV', 'Km 5 Norte', 'Activo', '2023-01-15', 1),
('Sensor de Velocidad', 'Km 10 Norte', 'Activo', '2023-02-20', 1),
('Panel de Información Variable', 'Km 12 Norte', 'En Mantenimiento', '2023-03-10', 1),

-- Equipos para Avenida 68 (id=2)
('Semáforo Inteligente', 'Calle 80 con Av. 68', 'Activo', '2023-04-05', 2),
('Cámara CCTV', 'Calle 100 con Av. 68', 'Activo', '2023-05-12', 2),
('Sensor de Conteo', 'Calle 127 con Av. 68', 'Activo', '2023-06-18', 2),

-- Equipos para Vía Medellín - Bogotá (id=3)
('Estación Meteorológica', 'La Ceja - Km 2', 'Activo', '2023-07-22', 3),
('Cámara CCTV', 'Santuario - Entrada', 'Inactivo', '2023-08-14', 3),

-- Equipos para Carretera Central (id=4)
('Panel de Información Variable', 'Palmira - Entrada', 'Activo', '2024-01-10', 4),
('Sensor de Velocidad', 'Cali - Km 5', 'Activo', '2024-02-15', 4),
('Cámara CCTV', 'Rozo - Centro', 'Activo', '2024-03-20', 4),

-- Equipos para Autopista Sur (id=5)
('Sensor de Conteo', 'Km 3 Sur', 'Activo', '2024-04-25', 5),
('Cámara CCTV', 'Km 8 Sur', 'En Mantenimiento', '2024-05-30', 5);

-- Consultas de verificación
SELECT * FROM road_segment;
SELECT * FROM its;

-- Consulta para ver los equipos por segmento
SELECT 
    rs.name AS segmento,
    rs.location AS ubicacion_segmento,
    COUNT(i.id) AS total_equipos,
    STRING_AGG(i.type, ', ') AS tipos_equipos
FROM road_segment rs
LEFT JOIN its i ON rs.id = i.road_segment_id
GROUP BY rs.id, rs.name, rs.location
ORDER BY rs.name;