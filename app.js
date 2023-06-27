const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = 'localhost'
const MYSQL_DB_USER = 'root'
const MYSQL_DB_PASSWORD = '123456'
const MYSQL_DB_NAME = 'botprueba'
const MYSQL_DB_PORT = '3306'

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const flowSecundario = addKeyword('1').addAnswer('aqui encontraras solucion a tu problema', {
            media: 'https://i.imgur.com/XV7wLI5.png',
})

const flowPagos = addKeyword(['pagos']).addAnswer(
    [
        'A continuación te mostrare algunas opciones de los problemas de pagos mas comunes',
        ' *1* Para problemas de bloqueos',
        ],
         null,
         null,
        [flowSecundario]
    )


const flowTransmision = addKeyword(['transmision']).addAnswer([
    '🚀 a continuacion te comparto los problemas mas frecuentes en las transmisiones',
    {
      media: {
        url: 'https://file.io/J4wKbUEBQrm8',
        type: 'video/mp4',
    },
  },
])

const flowProblemas = addKeyword(['problemas']).addAnswer(
        [
            '📄 Aquí encontras algunas respuestas a los problemas mas comunes ',
            'https://www.tiktok.com/@zafiroagencyoficial/video/7219044555331521798?lang=es',
        ],
        null,
        null,
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenida a ____ Agency mi nombre es Orion tu asistente virtual')
    .addAnswer(
        [
            'te comparto las siguientes opciones por favor escribe en que te puedo ayudar',
            '👉 *pagos* para ver la informacion acerca de pagos',
            '👉 *transmision*  para ver la informacion acerca de las transmisiones',
            '👉 *problemas* para solucionar problemas de la app',
        ],
        null,
        null,
        [flowProblemas, flowTransmision, flowPagos]
    )

const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb()
}

main()
