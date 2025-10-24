import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';
import night from './assets/earth-night.jpg';
import sky from './assets/night-sky.png';
import './index.css';

import adac from './assets/logos/adac.png';
import almosafer from './assets/logos/almosafer.png';
import amplitudes from './assets/logos/amplitudes.png';
import blanco from './assets/logos/Blanco.gif';
import brickell from './assets/logos/brickell.png';
import citystate from './assets/logos/citystate.jpg';
import clarityNord from './assets/logos/clarity_nordics.png';
import clarity from './assets/logos/clarity.png';
import geotur from './assets/logos/geotur.jpg';
import globetrotter from './assets/logos/globetrotter.png';
import kuoni from './assets/logos/kuoni.png';
import sharaf from './assets/logos/sharaf.png';
import sotc from './assets/logos/sotc.png';
import travelpath from './assets/logos/travelpath.png';
import weco from './assets/logos/weco.png';
import worldlink from './assets/logos/worldlink.png';
import worldtravel from './assets/logos/worldtravel.png';
import turners from './assets/logos/xl_turners.png';
import oneGlobal from './assets/logos/one-global.png';
import tripbiz from './assets/logos/tripbiz.webp';
import gordian from './assets/logos/gordian.webp';

const World = () => {
  const [countries, setCountries] = useState({ features: [] });
  const [score, setScore] = useState(0);
  const [found, setFound] = useState([]);
  const [cheater, setCheater] = useState(false);
  const [right, setRight] = useState(0);

  const partners = [
    {
      id: 1,
      country: 'DE',
      name: 'ADAC',
      city: 'Frankfurt',
      img: adac,
      countryname: 'Germany',
    },
    {
      id: 2,
      country: 'SA',
      name: 'Almosafer',
      city: 'Riyadh',
      img: almosafer,
      countryname: 'Saudi Arabia',
    },
    {
      id: 3,
      country: 'CL',
      name: 'Blanco Viajes',
      city: 'Santiago',
      img: blanco,
      countryname: 'Chile',
    },
    {
      id: 4,
      country: 'BR',
      name: 'Brickell Brazil',
      city: 'Rio De Janeiro',
      img: brickell,
      countryname: 'Brazil',
    },
    {
      id: 5,
      country: 'MX',
      name: 'Brickell Mexico',
      city: 'Mexico City',
      img: brickell,
      countryname: 'Mexico',
    },
    {
      id: 6,
      country: 'SG',
      name: 'Citystate Singapore',
      city: 'Singapore',
      img: citystate,
      countryname: 'Singapore',
    },
    {
      id: 7,
      country: 'GB',
      name: 'Clarity',
      city: 'Manchester',
      img: clarity,
      countryname: 'United Kingdom',
    },
    {
      id: 8,
      country: 'SE',
      name: 'Clarity NORDICS',
      city: 'Stockholm',
      img: clarityNord,
      countryname: 'Sweden',
    },
    {
      id: 9,
      country: 'ES',
      name: 'Geotur ',
      city: 'Madrid',
      img: geotur,
      countryname: 'Spain',
    },
    {
      id: 10,
      country: 'AU',
      name: 'Globetrotter ',
      city: 'Melbourne',
      img: globetrotter,
      countryname: 'Australia',
    },
    {
      id: 11,
      country: 'CH',
      name: 'Kuoni ',
      city: 'Zurich',
      img: kuoni,
      countryname: 'Switzerland',
    },
    {
      id: 12,
      country: 'AE',
      name: 'Sharaf ',
      city: 'Dubai',
      img: sharaf,
      countryname: 'UAE',
    },
    {
      id: 13,
      country: 'IN',
      name: 'SOTC ',
      city: 'Mumbai',
      img: sotc,
      countryname: 'India',
    },
    {
      id: 14,
      country: 'CA',
      name: 'Travelpath ',
      city: 'Ontario',
      img: travelpath,
      countryname: 'Canada',
    },
    {
      id: 15,
      country: 'CZ',
      name: 'Weco Czech',
      city: 'Prague',
      img: weco,
      countryname: 'Czech',
    },
    {
      id: 16,
      country: 'HU',
      name: 'Weco Hungary',
      city: 'Budapest',
      img: weco,
      countryname: 'Hungary',
    },
    {
      id: 17,
      country: 'PL',
      name: 'Weco Poland',
      city: 'Warsaw',
      img: weco,
      countryname: 'Poland',
    },
    {
      id: 18,
      country: 'RO',
      name: 'Weco Romania',
      city: 'Bucharest',
      img: weco,
      countryname: 'Romania',
    },
    {
      id: 19,
      country: 'LK',
      name: 'Worldlink ',
      city: 'Colombo',
      img: worldlink,
      countryname: 'Sri Lanka',
    },
    {
      id: 2,
      country: 'US',
      name: 'World Travel, Inc',
      city: 'Exton, PA',
      img: worldtravel,
      countryname: 'USA',
    },
    {
      id: 21,
      country: 'US',
      name: 'Gordian Travel',
      city: 'Upper Black Eddy, PA',
      img: gordian,
      countryname: 'USA',
    },
    {
      id: 22,
      country: 'ZA',
      name: 'XL Turners',
      city: 'Durban',
      img: turners,
      countryname: 'South Africa',
    },
    {
      id: 23,
      country: 'CN',
      name: 'TripBiz',
      city: 'Shanghai',
      img: tripbiz,
      countryname: 'China',
    },
    {
      id: 24,
      country: 'JP',
      name: 'TripBiz',
      city: 'Tokyo',
      img: tripbiz,
      countryname: 'Japan',
    },
    {
      id: 25,
      country: 'CN',
      name: 'TripBiz',
      city: 'Hong Kong',
      img: tripbiz,
      countryname: 'Hong Kong',
    },
  ];

  const cheated = () => {
    partners.map(partner => {
      setCheater(true);

      const check = found.find(el => partner.country === el);
      console.log(check);
      if (!check) {
        setFound(prevFound => [...prevFound, partner.country]);
      }
    });
  };

  const ClickCountry = clicked => {
    if (!found.find(element => element === clicked.properties.ISO_A2)) {
      setFound(prevFound => [...prevFound, clicked.properties.ISO_A2]);
      let count = 0;
      let rightCheck = 0;
      partners.map(partner => {
        if (partner.country === clicked.properties.ISO_A2) {
          count = count + 1;
          rightCheck = 1;
        }
      });
      setScore(prevScore => prevScore + count);
      setRight(prevRight => prevRight + rightCheck);
    }
  };

  useEffect(() => {
    fetch('/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  const resetScore = () => {
    setScore(0);
    setFound([]);
    setCheater(false);
  };

  const renderPartner = partner => {
    return (
      <div
        className='card'
        key={partner.id}
      >
        <div className='card-img'>
          <img src={partner.img} />
        </div>
        <div className='card-info'>
          <div className='card-partner'>{partner.name}</div>
          <div className='card-details'>
            {partner.city}, {partner.countryname}
          </div>
        </div>
      </div>
    );
  };

  const foundPartners = found.map(element => {
    const partner = partners.filter(partner => partner.country === element);
    return partner;
  });

  return (
    <>
      <div className='flex-container'>
        <div className='results'>
          <div className='content'>
            <div className='heading'>
              <h1 onClick={cheated}>Spin the globe and find our partners</h1>
              {cheater && <h1 style={{ color: 'red' }}>YOU CHEATED!</h1>}
            </div>
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th>Count</th>
                    <th>Correct</th>
                    <th>Wrong</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{found.length}</td>
                    <td>{score}</td>
                    <td>{found.length - right}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='results-total'>
              {score > 0 && (
                <>
                  You have found {score} partner{score > 1 && `s`}
                </>
              )}
            </div>
            <div className='found-partners'>
              {foundPartners.flat().map(partner => renderPartner(partner))}
            </div>
            <div className='footer'>
              <img
                src={oneGlobal}
                onClick={resetScore}
                className='reset'
              ></img>
            </div>
          </div>
        </div>
        <div className='globe'>
          <Globe
            globeImageUrl={night}
            backgroundImageUrl={sky}
            lineHoverPrecision={0}
            polygonsData={countries.features.filter(
              d => d.properties.ISO_A2 !== 'AQ'
            )}
            polygonAltitude={d => {
              const t = found.find(element => element === d.properties.ISO_A2);
              if (t) {
                return 0.12;
              } else {
                return 0.06;
              }
            }}
            polygonCapColor={d => {
              const t = found.find(element => element === d.properties.ISO_A2);
              if (t && partners.find(partner => partner.country === t)) {
                return 'green';
              } else if (t) {
                return 'red';
              } else {
                return '#137f8d';
              }
            }}
            polygonSideColor={() => '#1c2426'}
            polygonStrokeColor={() => '#1c2426'}
            polygonLabel={({ properties: d }) => (
              <div>
                <div>
                  <b>{d.ADMIN}</b>
                </div>
              </div>
            )}
            onPolygonClick={ClickCountry}
            polygonsTransitionDuration={300}
            width={'2960'}
            height='100vh'
            showAtmosphere={true}
            atmosphereColor={'lightskyblue'}
            atmosphereAltitude={0.15}
          />
        </div>
      </div>
    </>
  );
};

createRoot(document.getElementById('root')).render(<World />);
