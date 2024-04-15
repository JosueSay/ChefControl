
CREATE TABLE TiposQuejas (
    id_tipo_queja SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);
INSERT INTO TiposQuejas (nombre) VALUES 
('Comida fría'),
('Tiempo de espera largo'),
('Mal servicio');


CREATE TABLE Quejas (
    id_queja SERIAL PRIMARY KEY,
    id_cliente INT,
    id_tipo_queja INT,
    id_alimento INT,
    id_usuario INT,
    motivo TEXT,
    clasificacion VARCHAR(100),
    fecha_hora TIMESTAMP
);

INSERT INTO Quejas (id_cliente, id_tipo_queja, id_alimento, id_usuario, motivo, clasificacion, fecha_hora) VALUES 
(1, 1, 2, 3, 'La comida estaba fría cuando la recibí.', 'Servicio', '2024-04-13 13:30:00'),
(2, 2, 1, 2, 'Esperé más de 30 minutos para que me atendieran.', 'Tiempo de espera', '2024-04-13 14:45:00'),
(3, 3, 3, 1, 'El mesero fue muy grosero al atenderme.', 'Servicio', '2024-04-13 12:15:00');


CREATE TABLE Clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    direccion VARCHAR(255),
    nit VARCHAR(20)
);
INSERT INTO Clientes (nombre, direccion, nit) VALUES 
('Juan Pérez', 'Calle 123, Ciudad', '123456-7'),
('María López', 'Av. Principal 456, Pueblo', '987654-3'),
('Pedro González', 'Calle Central 789, Villa', '456789-1');


CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    id_tipo_usuario INT,
    nombre VARCHAR(100),
    contrasenia VARCHAR(255)
);

INSERT INTO Usuarios (id_tipo_usuario, nombre, contrasenia) VALUES 
(1, 'usuario1', 'password1'),
(2, 'usuario2', 'password2'),
(1, 'usuario3', 'password3');

 
CREATE TABLE TiposUsuarios (
    id_tipo_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

INSERT INTO TiposUsuarios (nombre) VALUES 
('Administrador'),
('Empleado');

CREATE TABLE Encuestas (
    id_encuesta SERIAL PRIMARY KEY,
    id_cliente INT,
    id_usuario INT,
    calificacion_amabilidad INT,
    calificacion_exactitud INT,
    fecha_hora TIMESTAMP
);


INSERT INTO Encuestas (id_cliente, id_usuario, calificacion_amabilidad, calificacion_exactitud, fecha_hora) VALUES 
(1, 1, 4, 5, '2024-04-13 10:00:00'),
(2, 2, 3, 4, '2024-04-13 11:30:00'),
(3, 3, 5, 3, '2024-04-13 09:45:00');

CREATE TABLE Detalles_Facturas (
    id_detalle_factura SERIAL PRIMARY KEY,
    id_factura INT,
    id_alimento INT,
    cantidad DECIMAL(10, 2),
    subtotal DECIMAL(10, 2)
);

INSERT INTO Detalles_Facturas (id_factura, id_alimento, cantidad, subtotal) VALUES 
(1, 1, 2, 25.50),
(1, 3, 1, 12.00),
(2, 2, 1, 15.75);


CREATE TABLE Facturas (
    id_factura SERIAL PRIMARY KEY,
    id_cliente INT,
    id_cuenta INT,
    monto_total DECIMAL(10, 2),
    subtotal DECIMAL(10, 2)
);

INSERT INTO Facturas (id_cliente, id_cuenta, monto_total, subtotal) VALUES 
(1, 1, 40.50, 37.50),
(2, 2, 15.75, 15.75),
(3, 3, 27.00, 27.00);


CREATE TABLE Cuentas (
    id_cuenta SERIAL PRIMARY KEY,
    id_usuario INT,
	id_mesa INT,
    estado VARCHAR(50),
    fecha_hora_apertura TIMESTAMP,
    fecha_hora_cierre TIMESTAMP,
    total_cuenta DECIMAL(10, 2)
);

INSERT INTO Cuentas (id_usuario, estado, fecha_hora_apertura, fecha_hora_cierre, total_cuenta) VALUES 
(1, 'Abierta', '2024-04-13 08:00:00', NULL, 40.50),
(2, 'Cerrada', '2024-04-13 12:30:00', '2024-04-13 14:00:00', 15.75),
(3, 'Abierta', '2024-04-13 10:45:00', NULL, 27.00);


CREATE TABLE TiposConsumos (
    id_tipo_consumo SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

INSERT INTO TiposConsumos (nombre) VALUES 
('Almuerzo'),
('Cena'),
('Merienda'),
('Propina');


CREATE TABLE TiposPagos (
    id_tipo_pago SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

INSERT INTO TiposPagos (nombre) VALUES 
('Efectivo'),
('Tarjeta de crédito'),
('Tarjeta de débito');



CREATE TABLE Pagos (
    id_pago SERIAL PRIMARY KEY,
    id_tipo_pago INT,
    id_tipo_consumo INT,
    id_cuenta INT,
    monto DECIMAL(10, 2)
);

INSERT INTO Pagos (id_tipo_pago, id_tipo_consumo, id_cuenta, monto) VALUES 
(1, 1, 1, 40.50),
(2, 3, 2, 15.75),
(3, 2, 3, 27.00);

CREATE TABLE Pedidos (
   id_pedido SERIAL PRIMARY KEY,
   id_cuenta INT,
   id_alimento INT,
   id_tipo_consumo INT,
   cantidad INT
);

INSERT INTO Pedidos (id_cuenta, id_alimento, id_tipo_consumo, cantidad) VALUES 
(1, 1, 1, 2),
(1, 3, 1, 1),
(2, 2, 2, 1);


CREATE TABLE Mesas (
    id_mesa SERIAL PRIMARY KEY,
    id_area INT,
    id_estado_mesa INT,
    capacidad INT,
    mobilidad VARCHAR(50)
);

INSERT INTO Mesas (id_area, id_estado_mesa, capacidad, mobilidad) VALUES 
(1, 1, 4, 'Fija'),
(2, 2, 6, 'Móvil'),
(3, 1, 2, 'Fija');


CREATE TABLE EstadosMesas (
    id_estado_mesa SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

INSERT INTO EstadosMesas (nombre) VALUES 
('Disponible'),
('Ocupada'),
('Reservada');

CREATE TABLE Areas (
    id_area SERIAL PRIMARY KEY,
    id_tipo_cliente INT,
    id_tipo_area INT,
    id_restaurante INT
);

INSERT INTO Areas (id_tipo_cliente, id_tipo_area, id_restaurante) VALUES 
(1, 1, 1),
(2, 2, 1),
(1, 3, 1);

CREATE TABLE Restaurante (
    id_restaurante SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    direccion VARCHAR(255)
);

INSERT INTO Restaurante (nombre, direccion) VALUES 
('La Parrilla', 'Calle Principal #123, Ciudad'),
('El Sabor de la Costa', 'Avenida Central #456, Pueblo'),
('La Bodega del Chef', 'Calle de los Sabores #789, Villa');

CREATE TABLE TiposAreas (
    id_tipo_area SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

INSERT INTO TiposAreas (nombre) VALUES 
('Salón'),
('Terraza'),
('Bar');

CREATE TABLE TiposClientes (
    id_tipo_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

INSERT INTO TiposClientes (nombre) VALUES 
('Fumador'),
('No Fumador');

CREATE TABLE Alimentos (
   id_alimento SERIAL PRIMARY KEY,
   id_tipo_alimento INT,
   nombre TEXT, 
   descripcion TEXT,
   precio DECIMAL(10,2)
);

INSERT INTO Alimentos (id_tipo_alimento, nombre, descripcion, precio) VALUES 
(1, 'Ensalada César', 'Lechuga, crutones, queso parmesano y aderezo César.', 12.50),
(2, 'Filete de Salmón', 'Filete de salmón a la parrilla con salsa de mantequilla y limón.', 18.75),
(3, 'Tarta de Chocolate', 'Tarta de chocolate con salsa de frutos rojos.', 9.00);


CREATE TABLE TiposAlimentos (
   id_tipo_alimento SERIAL PRIMARY KEY,
   nombre VARCHAR(100)
);
INSERT INTO TiposAlimentos (nombre) VALUES 
('Entrada'),
('Plato Principal'),
('Postre'),
('Bebidas');

ALTER TABLE Quejas
ADD CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
ADD CONSTRAINT fk_tipo_queja FOREIGN KEY (id_tipo_queja) REFERENCES TiposQuejas(id_tipo_queja),
ADD CONSTRAINT fk_alimento FOREIGN KEY (id_alimento) REFERENCES Alimentos(id_alimento),
ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario);

ALTER TABLE Usuarios
ADD CONSTRAINT fk_tipo_usuario FOREIGN KEY (id_tipo_usuario) REFERENCES TiposUsuarios(id_tipo_usuario);

ALTER TABLE Encuestas
ADD CONSTRAINT fk_cliente_encuestas FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
ADD CONSTRAINT fk_usuario_encuestas FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario);

ALTER TABLE Detalles_Facturas
ADD CONSTRAINT fk_factura_detalle_factura FOREIGN KEY (id_factura) REFERENCES Facturas(id_factura),
ADD CONSTRAINT fk_alimento_detalle_factura FOREIGN KEY (id_alimento) REFERENCES Alimentos(id_alimento);

ALTER TABLE Facturas
ADD CONSTRAINT fk_cliente_factura FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
ADD CONSTRAINT fk_cuenta_factura FOREIGN KEY (id_cuenta) REFERENCES Cuentas(id_cuenta);

ALTER TABLE Cuentas
ADD CONSTRAINT fk_usuario_cuenta FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario), 
ADD CONSTRAINT fk_mesa_pedido FOREIGN KEY (id_mesa) REFERENCES Mesas(id_mesa);

ALTER TABLE Pagos
ADD CONSTRAINT fk_tipo_pago_pago FOREIGN KEY (id_tipo_pago) REFERENCES TiposPagos(id_tipo_pago),
ADD CONSTRAINT fk_tipo_consumo_pago FOREIGN KEY (id_tipo_consumo) REFERENCES TiposConsumos(id_tipo_consumo),
ADD CONSTRAINT fk_cuenta_pago FOREIGN KEY (id_cuenta) REFERENCES Cuentas(id_cuenta);

ALTER TABLE Pedidos
ADD CONSTRAINT fk_cuenta_pedido FOREIGN KEY (id_cuenta) REFERENCES Cuentas(id_cuenta),
ADD CONSTRAINT fk_alimento_pedido FOREIGN KEY (id_alimento) REFERENCES Alimentos(id_alimento),
ADD CONSTRAINT fk_tipo_consumo_pedido FOREIGN KEY (id_tipo_consumo) REFERENCES TiposConsumos(id_tipo_consumo);

ALTER TABLE Mesas
ADD CONSTRAINT fk_area_mesa FOREIGN KEY (id_area) REFERENCES Areas(id_area),
ADD CONSTRAINT fk_estado_mesa FOREIGN KEY (id_estado_mesa) REFERENCES EstadosMesas(id_estado_mesa);

ALTER TABLE Areas
ADD CONSTRAINT fk_tipo_cliente_area FOREIGN KEY (id_tipo_cliente) REFERENCES TiposClientes(id_tipo_cliente),
ADD CONSTRAINT fk_tipo_area_area FOREIGN KEY (id_tipo_area) REFERENCES TiposAreas(id_tipo_area),
ADD CONSTRAINT fk_restaurante_area FOREIGN KEY (id_restaurante) REFERENCES Restaurante(id_restaurante);

ALTER TABLE Alimentos
ADD CONSTRAINT fk_tipo_alimento_alimento FOREIGN KEY (id_tipo_alimento) REFERENCES TiposAlimentos(id_tipo_alimento);

