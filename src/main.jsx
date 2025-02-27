import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { scaleSequentialSqrt } from 'https://esm.sh/d3-scale';
import { interpolateYlOrRd } from 'https://esm.sh/d3-scale-chromatic';
import night from './assets/earth-night.jpg';
import sky from './assets/night-sky.png';
import './index.css';

import adac from './assets/logos/adac.png';
import almosafer from './assets/logos/almosafer.jpg';
import amplitudes from './assets/logos/amplitudes.png';
import blanco from './assets/logos/Blanco.jpg';
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
import weco from './assets/logos/weco.svg';
import worldlink from './assets/logos/worldlink.png';
import worldtravel from './assets/logos/worldtravel.png';
import turners from './assets/logos/xl_turners.png';

const World = () => {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [score, setScore] = useState(0);
  const [found, setFound] = useState([]);

  const partners = [
    { country: 'DE', name: 'ADAC', city: 'Frankfurt', img: adac, countryname: 'Germany' },
    { country: 'SA', name: 'Almosafer', city: 'Riyadh', img: almosafer, countryname: 'Saudi Arabia' },
    { country: 'FRA', name: 'Amplitudes ', city: 'Toulouse', img: amplitudes, countryname: 'France' },
    { country: 'CL', name: 'Blanco Viajes', city: 'Santiago', img: blanco, countryname: 'Chile' },
    { country: 'BR', name: 'Brickell Brazi', city: 'Rio De Janeiro', img: brickell, countryname: 'Brazil' },
    { country: 'MX', name: 'Brickell Mexico', city: 'Mexico City', img: brickell, countryname: 'Mexico' },
    { country: 'MY', name: 'Citystate Singapore', city: 'Singapore', img: citystate, countryname: 'Singapore' },
    { country: 'GB', name: 'Clarity', city: 'Manchester', img: clarity, countryname: 'United Kingdom' },
    { country: 'SE', name: 'Clarity NORDICS', city: 'Stockholm', img: clarityNord, countryname: 'Sweden' },
    { country: 'ES', name: 'Geotur ', city: 'Madrid', img: geotur, countryname: 'Spain' },
    { country: 'AU', name: 'Globetrotter ', city: 'Melbourne', img: globetrotter, countryname: 'Australia' },
    { country: 'CH', name: 'Kuoni ', city: 'Zurich', img: kuoni, countryname: 'Switzerland' },
    { country: 'AE', name: 'Sharaf ', city: 'Dubai', img: sharaf, countryname: 'UAE' },
    { country: 'IN', name: 'SOTC ', city: 'Mumbai', img: sotc, countryname: 'India' },
    { country: 'CA', name: 'Travelpath ', city: 'Ontario', img: travelpath, countryname: 'Canada' },
    { country: 'CZ', name: 'Weco Czech', city: 'Prague', img: weco, countryname: 'Czech' },
    { country: 'HU', name: 'Weco Hungary', city: 'Budapest', img: weco, countryname: 'Hungary' },
    { country: 'PL', name: 'Weco Poland', city: 'Warsaw', img: weco, countryname: 'Poland' },
    { country: 'RO', name: 'Weco Romania', city: 'Bucharest', img: weco, countryname: 'Romania' },
    { country: 'LK', name: 'Worldlink ', city: 'Colombo', img: worldlink, countryname: 'Sri Lanka' },
    { country: 'US', name: 'World Travel, Inc', city: 'Exton, PA', img: worldtravel, countryname: 'USA' },
    { country: 'ZA', name: 'XL Turners', city: 'Durban', img: turners, countryname: 'South Africa' }
  ];

  const ClickCountry = clicked => {
    if (!found.find(element => element === clicked.properties.ISO_A2)) {
      setFound(prevFound => [...prevFound, clicked.properties.ISO_A2])
      partners.map(partner => {
        if (partner.country === clicked.properties.ISO_A2) {
          setScore(prevScore => prevScore + 1);
        }
      });
    }
  };

  useEffect(() => {
    fetch(
      '/ne_110m_admin_0_countries.geojson'
    )
      .then(res => res.json())
      .then(setCountries);
  }, []);

  const colorScale = scaleSequentialSqrt(interpolateYlOrRd);

  // GDP per capita (avoiding countries with small pop)
  const getVal = feat =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );
  colorScale.domain([0, maxVal]);

  const resetScore = () => {
    setScore(0);
    setFound([]);
  };

  return (
    <>
      <div className='flex-container'>
        <div className='results'>
          <div className='content'>
            <div className='heading'>
              <h1>Spin the globe and find our partners</h1>
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
                    <td>{found.length-score}</td>
                  </tr>
                </tbody>
              </table>
              
            </div>
            <div className='found-partners'>
              { score > 0 && <>
              You have found {score} partners
              </> }
              { found.map(element => {
                const partner = partners.find(partner => partner.country === element)
                if (partner) {
                  return (
                    <>
                    <div className='card'>
                      <div className='card-img'><img src={partner.img} /></div>
                      <div className='card-info'>
                        <div className='card-partner'>{partner.name}</div>
                        <div className='card-details'>{partner.city}, {partner.countryname}</div>
                      </div>
                    </div>
                    </>
                  )
                }
              })}
              {/* { partners.map(partner => {
                return (
                  <div className='card'>
                    <div className='card-img'><img src={partner.img} /></div>
                    <div className='card-info'>
                      <div className='card-partner'>{partner.name}</div>
                      <div className='card-details'>{partner.city}, {partner.country}</div>
                    </div>
                  </div>
                )
              }) } */}
            </div>
            <div className='footer'>
            <button onClick={resetScore}>Reset</button>
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
            // polygonAltitude={d => (d === hoverD ? 0.12 : 0.06)}
            polygonAltitude={d => {
              const t = found.find(element => element === d.properties.ISO_A2)
              if (t) {
                return 0.12
              } else {
                return 0.06
              }
            }}
            // polygonCapColor={d =>
            //   d === hoverD ? 'steelblue' : colorScale(getVal(d))
            // }
            polygonCapColor={d => {
              const t = found.find(element => element === d.properties.ISO_A2)
              if (t && partners.find(partner => partner.country === t)) {
                return 'green'
              } else if (t) {
                return 'red'
              } else {
                return 'steelblue' 
              }
            }}
            polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
            polygonStrokeColor={() => '#111'}
            polygonLabel={({ properties: d }) => (
              <div>
                <div>
                  <b>
                    {/* {d.ADMIN} ({d.ISO_A2}): */}
                    {d.ADMIN}
                  </b>
                </div>
                {/* <div>
                  GDP: <i>{d.GDP_MD_EST}</i> M$
                </div>
                <div>
                  Population: <i>{d.POP_EST}</i>
                </div> */}
              </div>
            )}
            // onPolygonHover={setHoverD}
            onPolygonClick={ClickCountry}
            polygonsTransitionDuration={300}
            width={'2100'}
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
