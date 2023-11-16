export type Impacts = { adpe: number; gwp: number; pe: number };

export type ImpactsDetails = {
    gwp: {
        embedded: {
            value: number,
            min: number,
            max: number,
            warnings: [
                "End of life is not included in the calculation"
            ]
        },
        use: {
            value: number,
            min: number,
            max: number
        },
        unit: "kgCO2eq",
        description: "Total climate change"
    },
    adpe: {
        embedded: {
            value: number,
            min: number,
            max: number,
            warnings: [
                "End of life is not included in the calculation"
            ]
        },
        use: {
            value: number,
            min: number,
            max: number
        },
        unit: "kgSbeq",
        description: "Use of minerals and fossil ressources"
    },
    pe: {
        embedded: {
            value: number,
            min: number,
            max: number,
            warnings: [
                "End of life is not included in the calculation"
            ]
        },
        use: {
            value: number,
            min: number,
            max: number,
            warnings: [
                "Uncertainty from technical characteristics is very important. Results should be interpreted with caution (see min and max values)"
            ]
        },
        unit: "MJ",
        description: "Consumption of primary energy"
    }
}
