/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextPage } from "next";
import React, { useState } from "react";

import { api } from "~/utils/api";
import { DeviceTypes, type DeviceArgument, type Impacts } from "~/utils/type";

const Home: NextPage = () => {
  const { data: countriesList } = api.countries.getAll.useQuery();
  const RefreshArchetype = api.archetypes.get_mut.useMutation();
  const deviceGetData = api.device.get_mut.useMutation();

  const deviceGetDataPost = api.device.post.useMutation();

  const [deviceType, setDeviceType] = useState<string>(DeviceTypes[0]!.url);
  const deviceArchetype = api.archetypes.get.useQuery({
    type: deviceType,
  });

  const [model, setModel] = useState("compute_low");

  const [location, setLocation] = useState("WOR");
  const [avg_power, setPower] = useState(75);
  const [lifespan, setLifespan] = useState(4);
  const [avg_use_time, setUseTime] = useState(8);

  const [tab, setTab] = useState<DeviceArgument[]>([]);
  const [valTab, setVal] = useState<Impacts[]>([]);

  async function handleChangeType(
    e: React.ChangeEvent<HTMLSelectElement>,
    target: string,
  ) {
    e.preventDefault();
    setDeviceType(target);
    const archetypes = await RefreshArchetype.mutateAsync({
      type: target,
    });

    setModel(archetypes[0]!);
    const deviceApiData = await deviceGetData.mutateAsync({
      type: target,
      model: archetypes[0]!,
    });

    console.log(deviceApiData);
  }

  async function handleChangeModel(
    e: React.ChangeEvent<HTMLSelectElement>,
    target: string,
  ) {
    e.preventDefault();
    setModel(target);
    const deviceApiData = await deviceGetData.mutateAsync({
      type: deviceType,
      model: target,
    });

    console.log(deviceApiData);
  }

  async function handlePost(e: React.SyntheticEvent) {
    e.preventDefault();

    console.log(typeof avg_power);
    console.log(typeof lifespan);
    console.log(typeof avg_use_time);

    const dataDevice = await deviceGetDataPost.mutateAsync({
      type: deviceType,
      model: model,
      avg_power: avg_power,
      years_lifespan: lifespan,
      location: location,
      use_time: avg_use_time,
    });
    console.log(dataDevice);
    const deviceTest: DeviceArgument = {
      type: deviceType,
      model: model,
      avg_power: avg_power,
      years_lifespan: lifespan,
      location: location,
      avg_use_time: avg_use_time,
    };

    tab.push(deviceTest);
  }

  /*function handleAddToTab(e: React.SyntheticEvent) {
    e.preventDefault();
    const deviceTest: DeviceArgument = {
      type: deviceType,
      model: model,
      avg_power: avg_power,
      years_lifespan: lifespan,
      location: location,
      avg_use_time: avg_use_time,
    };

    tab.push(deviceTest);
  }*/

  function handleCalculate(e: React.SyntheticEvent) {
    e.preventDefault();
    tab.forEach(async (device) => {
      const temp = await deviceGetDataPost.mutateAsync({
        type: device.type,
        model: device.model,
        avg_power: device.avg_power,
        years_lifespan: device.years_lifespan,
        location: device.location,
        use_time: device.avg_use_time,
      });
      valTab.push(temp);
    });
  }

  function handleRemoveFromTab(e: React.SyntheticEvent, item: DeviceArgument) {
    e.preventDefault();
    const indexOfItem = tab.indexOf(item);
    setTab(tab.filter((item, index) => index !== indexOfItem));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-5 bg-white text-black">
      <header className="flex h-[100px] w-full items-center self-start bg-[#008A8C] p-10">
        <h1 className="text-2xl text-white">Datavizta</h1>
      </header>
      <section className="flex w-full justify-center gap-5 px-5 pb-5">
        <div className="flex w-2/3 flex-col items-center gap-3">
          <h2 className="w-full rounded-md bg-gray-200 p-5 text-center">
            Configuration d&apos;un appareil
          </h2>
          <fieldset className="flex w-full justify-center gap-10 rounded-md bg-gray-200 p-5">
            <span className="flex items-center gap-2">
              <label>Type</label>

              <select
                onChange={(e) => handleChangeType(e, e.target.value)}
                className="rounded-lg px-2 py-1"
              >
                {DeviceTypes.map((item, index) => {
                  return (
                    <option key={index} value={item.url}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </span>

            <span className="flex items-center gap-2">
              <label>Modèle</label>
              <select
                onChange={(e) => handleChangeModel(e, e.target.value)}
                className="rounded-lg px-2 py-1"
              >
                {deviceArchetype.data?.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </span>
          </fieldset>

          <h2 className="w-full rounded-md bg-gray-200 p-5 text-center">
            Utilisation de l&apos;appareil
          </h2>

          <fieldset className="flex w-full flex-col items-center gap-2 rounded-md bg-gray-200 p-5">
            <fieldset className="flex w-full justify-between gap-2">
              <span className="flex items-center gap-2">
                <label>Localisation</label>
                <select
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-lg px-2 py-1"
                >
                  {countriesList &&
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    Object.keys(countriesList).map((key, index) => {
                      return (
                        <option key={index} value={countriesList[key]}>
                          {key}
                        </option>
                      );
                    })}
                </select>
              </span>

              <span className="flex items-center gap-2">
                <label>Durée de vie (an)</label>
                <input
                  type="number"
                  placeholder="4"
                  className="rounded-lg px-2 py-1"
                  onChange={(e) => setLifespan(parseInt(e.target.value))}
                  defaultValue={lifespan}
                />
              </span>
            </fieldset>

            <fieldset className="flex w-full justify-between gap-2">
              <span className="flex items-center gap-2">
                <label>Heure d&apos;utilisation par jour</label>
                <input
                  type="number"
                  step={0.1}
                  placeholder="8"
                  className="rounded-lg px-2 py-1"
                  onChange={(e) => setUseTime(parseFloat(e.target.value))}
                  defaultValue={avg_use_time}
                />
              </span>

              <span className="flex items-center gap-2">
                <label>Consomation moyenne (W)</label>
                <input
                  type="number"
                  placeholder="75"
                  className="rounded-lg px-2 py-1"
                  onChange={(e) => setPower(parseFloat(e.target.value))}
                  defaultValue={avg_power}
                />
              </span>
            </fieldset>
          </fieldset>
          <button
            className="rounded-lg bg-[#26a5a7] px-4 py-2 text-white"
            onClick={(e) => handlePost(e)}
          >
            Ajouter à l&apos;environnement
          </button>
        </div>
        <aside className="flex w-1/3 flex-col items-center gap-2">
          <h2 className="w-full rounded-md bg-gray-200 p-5 text-center">
            Environnement
          </h2>
          <div className="flex w-full flex-col gap-1">
            {tab.map((item, index) => {
              return (
                <div key={index} className="flex w-full gap-2">
                  <p className="w-full rounded-lg bg-gray-200 px-2 py-1 text-center">
                    {item.type.replace("terminal/", "")} {item.model}
                  </p>
                  <button
                    onClick={(e) => handleRemoveFromTab(e, item)}
                    className="rounded-lg bg-red-500 px-2 py-1"
                  >
                    Suppr
                  </button>
                </div>
              );
            })}
          </div>
          <button
            className="rounded-lg bg-[#26a5a7] px-4 py-2 text-white"
            onClick={(e) => handleCalculate(e)}
          >
            Calcul des valeurs
          </button>
        </aside>
      </section>
      {valTab.map((item, index) => {
        console.log(item);

        return (
          <p key={index}>
            {item.adpe}
            <br />
            {item.gwp}
            <br />
            {item.pe}
          </p>
        );
      })}
    </main>
  );
};

export default Home;
