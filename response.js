module.exports = {
    fail: (args) => {
        args.response.status(args.status || 400).send({
            success: false,
            error: args.info || 'Error en el servidor'
        })
    },
    success: (args) => {
        args.response.status(args.status || 200).send({
            success: true,
            body: args.body || {}
        })
    }
}