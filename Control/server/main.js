import { Meteor } from "meteor/meteor";
import { pg } from "meteor/numtel:pg";

// Importante borrar los console.log al finalizar y asegurarnos que funciona correctamente la pagina, dejar los console.error

Meteor.startup(() => {
	const settings = Meteor.settings.postgres;

	if (!settings) {
		console.error('Error al obtener settings.json');
		return;
	}

	// Connection to PostgreSQL database
	try {
		pg.connect(settings);
		console.log('Conectado a PostgreSQL');
	}catch{
		console.error('Error en la conexion a PostgreSQL');
	}
});
