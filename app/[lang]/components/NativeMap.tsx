"use client"

import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context/SectionContext';
import type {CircleLayer, FillLayer, HeatmapLayer, LineLayer} from 'react-map-gl';
import { FeatureCollection, Polygon } from 'geojson';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { isMap } from 'util/types';
import { allDataInterface, createLayer, easingFunctions, generateBounds, generateLegends, mapInterface, mapLayerInterface, mapPartInterface } from '@/app/mapHelpers';
import { env } from 'node:process';

export default function MapContainer({lang: lang, accessKey: accessKey} : {lang: string, accessKey : string}) {
    const { section, setState } = useContext(Context);
    const [allData, setAllData] = useState(require('./mapData.json') as allDataInterface);

    mapboxgl.accessToken = accessKey;

    const mapContainer : any = useRef(null);
    const map : any = useRef(null);
    const mapOverlay = useRef(null);
    const [lng, setLng] = useState(34.85);
    const [lat, setLat] = useState(31.05);
    const [zoom, setZoom] = useState(1);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [showLegend, setShowLegend] = useState(false);

    function handleMap() {
        let coordinates : any = []

            allData.data[section - 1].parts.map((item : mapPartInterface, index : number) => {
                if (item.source.geometry.type == 'Point' && (item.source.properties.place_name != undefined || item.source.properties.place_name != undefined)) {
                    let name;
                    if (item.source.properties.place_name != undefined)
                        name = 'place_name'
                    else
                        name = 'name'

                    let id = allData.data[section - 1].id;
                    map.current.addLayer({
                        'id': `${id}-${index}-point`,
                        'type': 'symbol',
                        'source': `${id}-${index}`,
                        'layout': {
                        'icon-image': 'custom-marker',
                        // get the title name from the source's "title" property
                        'text-field': ['get', name],
                        'text-font': [
                        'Open Sans Semibold',
                        'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                        }
                    });
                }

                let layer : mapLayerInterface = createLayer(item, index, allData.data[section - 1].id, allData.data[section - 1].defaultColor);
                map.current.addLayer(layer);

                // Checking for different structures of the coordinates field
                console.log(item.source.geometry.coordinates, typeof item.source.geometry.coordinates[0], 'dig', section)

                if (typeof item.source.geometry.coordinates[0] === 'number') {
                    console.log('jenounoe')
                    coordinates.push(item.source.geometry.coordinates)
                } else {
                    item.source.geometry.coordinates.map((coordinate, cIndex) => {
                        console.log(typeof coordinate[0])
                        if (typeof coordinate[0] === 'number')
                            coordinates.push(coordinate);
                        else if (typeof coordinate[0] === 'object'){
                            console.log(coordinate[0]);
                            console.log('abovee')
                            coordinate.map((subCoordinate, ccIndex) => {
                                coordinates.push(subCoordinate);
                            })
                        }
                    })
                }

                console.log(layer);
            });

            let bounds = generateBounds(coordinates);

            let animationOptions = {
                pitch: 0,
                bearing: 0,
                duration: 1000
            }

            if (typeof allData.data[section - 1].position.bearing == 'number')
                animationOptions.bearing = allData.data[section - 1].position.bearing as number
            if (typeof allData.data[section - 1].position.pitch == 'number')
                animationOptions.pitch = allData.data[section - 1].position.pitch as number

            map.current.fitBounds(bounds.coordinates, animationOptions);
            console.log(`section ${section} bounds: `)
            console.log(bounds);
            // map.current.flyTo(bounds.position);

            setIsMapLoaded(true);

            // Adding captions
            // define layer names
            let legend_data = generateLegends(allData.data[section - 1], lang);
                
            // create legend
            if (legend_data.layers.length > 0)
                    setShowLegend(true);
            else
                setShowLegend(false);

            if (mapOverlay.current != undefined) {
                const legend = mapOverlay.current as any;
                    
                legend.innerHTML = '';

                legend_data.layers.forEach((layer, i) => {
                    const color = legend_data.colors[i];
                    const item = document.createElement('div');
                    const key = document.createElement('span');
                    item.className = 'legend-parent'
                    key.className = 'legend-key';
                    key.style.backgroundColor = color;
                        
                    const value = document.createElement('span');
                    value.innerHTML = `${layer}`;
                    item.appendChild(key);
                    item.appendChild(value);
                    legend.appendChild(item);
                })
            }
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current != undefined ? mapContainer.current : "",
            style: 'mapbox://styles/theo-fuchs/clo495o1h00kz01qmb2q5dc5u',
            center: [lng, lat],
            zoom: zoom
        });

        // map.current.scrollZoom.disable();
        
        map.current.on('load', () => {
            map.current.resize();

            console.log("LOADED!");
            allData.data.map((item : mapInterface, index : number) => {
                item.parts.map((part: mapPartInterface, partIndex: number) => {
                    map.current.addSource(`${item.id}-${partIndex}`, {
                        type: 'geojson',
                        // Use a URL for the value for the `data` property.
                        // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
                        data: {...part.source, id: `${item.id}-${partIndex}`}
                    });
                })
            });

            handleMap()
        })
    });

    useEffect(() => {
        // Removing all other layers
        if (isMapLoaded) {
            allData.data.map((item : any, index : any) => {
                item.parts.map((part : any, partIndex : any) => {
                    if (map.current.getLayer(`${item.id}-${partIndex}`)) map.current.removeLayer(`${item.id}-${partIndex}`);
                    if (map.current.getLayer(`${item.id}-${partIndex}-point`)) map.current.removeLayer(`${item.id}-${partIndex}-point`);
                })
                
            });

            map.current.flyTo(allData.data[section - 1].position);

            handleMap();
        }
    }, [section])
    
    return (
        <div id="map-container" className='bg-sky-100s fixed top-20 z-0 left-0 md:right-0 md:left-auto h-screen md:w-3/5 w-screen'>
            <div style={{height: '100%'}} ref={mapContainer} className="map-container" />
            <div ref={mapOverlay} className={showLegend ? 'map-overlay' : 'map-overlay hidden'} id="legend"></div>
        </div>
    )
}