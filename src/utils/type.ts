export type Device = { url: string; name: string };

export const DeviceTypes: Device[] = [
  { url: "server", name: "Serveur" },
  { url: "terminal/laptop", name: "Ordinateur Portable" },
  { url: "terminal/desktop", name: "Ordinateur de bureau" },
  { url: "terminal/smartphone", name: "Smartphone" },
  { url: "terminal/tablet", name: "Tablette" },
  { url: "terminal/television", name: "Télévision" },
  { url: "terminal/box", name: "Box" },
];

export type Impacts = { adpe: number; gwp: number; pe: number };

export type ImpactsDetails = {
  gwp: {
    embedded: {
      value: number;
      min: number;
      max: number;
      warnings: ["End of life is not included in the calculation"];
    };
    use: {
      value: number;
      min: number;
      max: number;
    };
    unit: "kgCO2eq";
    description: "Total climate change";
  };
  adpe: {
    embedded: {
      value: number;
      min: number;
      max: number;
      warnings: ["End of life is not included in the calculation"];
    };
    use: {
      value: number;
      min: number;
      max: number;
    };
    unit: "kgSbeq";
    description: "Use of minerals and fossil ressources";
  };
  pe: {
    embedded: {
      value: number;
      min: number;
      max: number;
      warnings: ["End of life is not included in the calculation"];
    };
    use: {
      value: number;
      min: number;
      max: number;
      warnings: [
        "Uncertainty from technical characteristics is very important. Results should be interpreted with caution (see min and max values)",
      ];
    };
    unit: "MJ";
    description: "Consumption of primary energy";
  };
};


export type DeviceArgument = {
  type: string,
  model: string,
  location: string,
  years_lifespan: number,
  avg_use_time: number,
  avg_power: number
}