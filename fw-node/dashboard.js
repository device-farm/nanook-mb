module.exports = async config => {

    let dashboard = {
        client: "dashboard-client",
        events: {
            registerChanged: {}
        },
        api: {
            dashboard: {
                async getRegisters() {
                    return config.controller.registers;
                }
            }
        }
    }

    Object.values(config.controller.registers).forEach(register => {
        register.watch(() => {            
            if (dashboard.events.registerChanged instanceof Function) {
                dashboard.events.registerChanged(register);
            }
        })
    });

    return dashboard;
}