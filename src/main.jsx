import { createRoot } from 'react-dom/client';
import React, { useState, useEffect, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { scaleSequentialSqrt } from 'https://esm.sh/d3-scale';
import { interpolateYlOrRd } from 'https://esm.sh/d3-scale-chromatic';
import night from './assets/earth-night.jpg';
import sky from './assets/night-sky.png';
import './index.css';

const World = () => {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();
  const [score, setScore] = useState(0);
  const [found, setFound] = useState({ countries: [] });
  const partners = [
    { country: 'GB', partner: 'Andrew', img: '' },
    { country: 'US', partner: 'Paul' },
  ];

  const ClickCountry = clicked => {
    // console.log(clicked.properties.ISO_A2)
    partners.map(partner => {
      // partner.country == clicked.properties.ISO_A2 ? setScore++ : false
      // console.log(partner.country)
      if (partner.country === clicked.properties.ISO_A2) {
        console.log('Increase the score');
        setScore(score + 1);
      }
    });
  };

  useEffect(() => {
    // load data
    // fetch('./datasets/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(setCountries);
    fetch(
      'https://raw.githubusercontent.com/vasturiano/react-globe.gl/refs/heads/master/example/datasets/ne_110m_admin_0_countries.geojson'
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
  };

  return (
    <>
      <div className='flex-container'>
        <div className='results'>
          <h1>{score}</h1>
          <button onClick={resetScore}>Reset</button>
        </div>
        <div className='globe'>
          <Globe
            globeImageUrl={night}
            backgroundImageUrl={sky}
            lineHoverPrecision={0}
            polygonsData={countries.features.filter(
              d => d.properties.ISO_A2 !== 'AQ'
            )}
            polygonAltitude={d => (d === hoverD ? 0.12 : 0.06)}
            polygonCapColor={d =>
              d === hoverD ? 'steelblue' : colorScale(getVal(d))
            }
            polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
            polygonStrokeColor={() => '#111'}
            polygonLabel={({ properties: d }) => (
              <div>
                <div>
                  <b>
                    {d.ADMIN} ({d.ISO_A2}):
                  </b>
                </div>
                <div>
                  GDP: <i>{d.GDP_MD_EST}</i> M$
                </div>
                <div>
                  Population: <i>{d.POP_EST}</i>
                </div>
              </div>
            )}
            onPolygonHover={setHoverD}
            onPolygonClick={ClickCountry}
            polygonsTransitionDuration={300}
          />
        </div>
      </div>
    </>
  );
};

createRoot(document.getElementById('root')).render(<World />);
