como instalarlo:
descargarlo de este repositorio como archivo comprimido(.rar .zip etc) y descomprimir (carpeta www en laragon)

Preparar el Entorno en la PC En la PC asegúrate de que: MySQL esté instalado y un servidor MySQL esté en ejecución (puede usar laragon xammp u otro como servidor local). en laragon en la configuracion general de la app activar la creacion automatica de host virtuales y en servicios y puertos activar el ssl 443

como inicializar la base de datos y como acceder en caso de que haya un usuario administrador. acceder a la consola de laragon hice uso de estas credenciales de usuario Iniciar sesion: mysql -u root -p
2 enter y entra

Crear la base de datos asistencias en el servidor MySQL antes de importar yo la llame asistencias; CREATE DATABASE asistencias;

luego hacer exit para poder hacer el el import del sql

Importar la Base de Datos en el proyecto En el proyecto, usa el comando para importar el archivo SQL: mysql -u root -p asistencias < asistencias.sql Esto restaurará los datos y la estructura de la base de datos.

Configurar el Proyecto Web el modelo intentaba ser mvc por lo que adentro de la carpeta raiz abra otras carpetas para separar la logica de los archivos (el retirar esas carpetas hara que deba cambiar todas las rutas en cada archivo)

Asegúrate de copiar también el proyecto desde C:\laragon\www\ASISTENCIAS a la carpeta raíz del servidor web Verifica que el archivo de configuración de conexión (conexion.php) apunte al servidor MySQL correcto.

resumen del sistema: solo registra alumnos asistencias notas y usuarios

muestra gran parte de la informacion guardada

muestra condicion de final de cursada correctamente

puede hacer todas las funciones de la seccion alumnos

falto modificiar algunas cosas en las asistencias y en las notas

y algunos archivos en el directorio no hacen nada como el de instituciones




resumen del sistema:
solo registra alumnos asistencias  notas  y usuarios

muestra gran parte de la informacion guardada
 
 muestra condicion  de final de cursada correctamente

puede hacer todas las funciones de la seccion alumnos

falto modificiar algunas cosas en las asistencias y en las notas

y algunos archivos en el directorio no hacen nada  como el de instituciones




------------usuario
inicia en el campus y da la opcion de iniciar sesion  si no dispone de uno puede registrar uno propio
 y al iniciar sesion con el  usuario vera su nombre pero  no hara basicamente nada  mas que saber quien esta iniciado   

y al registrar  e iniciar no necesita saber mis credenciales ya que puede crear las suyas 


-------------alumnos
registrar alumno 
modificar alumno
eliminar alumno por matricula

y eliminar al curso en caso de que quiera empezar un nuevo año lectivo(no archiva nada se pierde los registros)

----------------------asistencias
se puede listar alumnos en las asistencias y ver sus asistencias en caso de que se haya registrado alguna  
ademas puse otro boton de poder modificar las asistencias que de momento acepta valores negativo al viasualizar el total de asistencias

tambien esta la fecha a eleccion del usuario--- Poder seleccionar una fecha para la asistencia  

y el cumpleaños 


-------------------------notas
en notas se puede guardar editar en la misma seccion de los registros
 y ver las notas de todos los alumnos aunque no tengan ,con n/a

 funciona el calculo de ver condicion   

Se puede ver 5 campos para 
dias de clases  ///  regular notas y asistencias /// y promocion notas y asistencias  

y un boton verificar informacion   que envia la consulta al servidor en base a los parametros elejidos por el usuario del sistema y devuelve en texto la condicion de cada alumno con su nombre completo



---------visual
muchas funciones en todos los apartados le falta claridad visual

ademas los togglePanel  tienen un delay al empezar la pagina para desplegarse y mezcla de alert con visualizacion de    <!-- Mensajes de error o éxito (Contenedor de Mensajes) -->




 

