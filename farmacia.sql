CREATE DATABASE farmacia1;

USE farmacia1;

CREATE TABLE medicamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_comercial VARCHAR(100) NOT NULL,
  nombre_generico VARCHAR(100),
  descripcion TEXT,
  laboratorio VARCHAR(100),
  concentracion VARCHAR(50),
  forma_farmaceutica VARCHAR(50),
  precio_compra DECIMAL(10,2) NOT NULL,
  precio_venta DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  fecha_vencimiento DATE,
  proveedor_id INT,
  FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  fecha_vencimiento DATE
);
 
CREATE TABLE proveedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_empresa VARCHAR(100) NOT NULL,
  contacto VARCHAR(100),
  telefono VARCHAR(15),
  direccion VARCHAR(255)
);


CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100),
  dni VARCHAR(8) UNIQUE,
  telefono VARCHAR(15),
  direccion VARCHAR(255)
);

CREATE TABLE empleados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100),
  dni VARCHAR(8) UNIQUE,
  cargo VARCHAR(50),
  telefono VARCHAR(15),
  fecha_ingreso DATE
);

CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2),
  cliente_id INT,
  empleado_id INT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (empleado_id) REFERENCES empleados(id)
);

CREATE TABLE detalle_venta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT,
  medicamento_id INT,
  cantidad INT,
  precio_unitario DECIMAL(10,2),
  subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  FOREIGN KEY (venta_id) REFERENCES ventas(id),
  FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id)
);